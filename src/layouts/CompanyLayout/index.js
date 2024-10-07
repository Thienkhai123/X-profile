import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfile,
  selectUserProfile,
  updateProfile
} from 'store/app/userSlice'
import NavbarCompany from 'common/container/Header/navbarCompany'
import { useRouter } from 'next/router'
import { GUEST_ROUTES, USER_ROUTES } from 'common/config/app.constants'
import { ROLE_STORAGE, SURVEY_STORAGE } from 'common/config/app.constants'
import { toast } from 'react-toastify'
import useTrans from 'common/hooks/useTrans'
import { unwrapResult } from '@reduxjs/toolkit'
import { hasEditPermission, selectProfileCompany } from 'store/app/companySlice'
import localforage from 'localforage'
import { getAllNotification } from 'store/app/notification'
import { firebaseCloudMessaging } from '../../../firebase'
import FloatFeedback from 'common/presentation/FloatFeedback'
import { updateIsOwner } from 'store/app/helperSlice'

const CompanyLayout = (props) => {
  const { component: Component } = props
  const trans = useTrans()
  const { HEADER, FOOTER, FOOTER_PROFILE } = trans
  const { pathname, push, query } = useRouter()
  const { companyId, departmentId, departmentPositionId } = query
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)
  const profileCompany = useSelector(selectProfileCompany)
  const [mounted, setMounted] = useState(false)

  if (mounted) {
    firebaseCloudMessaging.onMessageListener()
  }

  const { profile } = profileCompany

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const fetchData = await dispatch(getProfile())
        const { data } = unwrapResult(fetchData)
        const userRoleId = data?.setting?.characterId
        localStorage.setItem(ROLE_STORAGE, userRoleId)
        const local_fcm_token = await localforage.getItem('fcm_token')

        if (!data?.fcmToken || data.fcmToken !== local_fcm_token) {
          dispatch(updateProfile({ fcmToken: local_fcm_token }))
        }
        dispatch(getAllNotification({ page: 1 }))
        if (data) {
          const { setting } = data
          if (!setting) {
            push('/role')
          } else {
            if (!GUEST_ROUTES.includes(pathname)) {
              const { characterId, homeBlockPosistion } = setting
              if (characterId === null) {
                push('/role')
              } else if (homeBlockPosistion === null && characterId !== 2) {
                push('/survey')
              }
            }
          }
        }
      } catch {
        if (!GUEST_ROUTES.includes(pathname)) {
          if (!localStorage.getItem(ROLE_STORAGE)) {
            toast('Bạn cần chọn nhân vật để tiếp tục!', {
              toastId: 'role_error',
              position: 'bottom-left',
              autoClose: 3000
            })
            push('/role')
          } else if (!localStorage.getItem(SURVEY_STORAGE)) {
            const role = localStorage.getItem(ROLE_STORAGE)
            if (!role || role !== '2') {
              toast('Bạn cần hoàn thành khảo sát để tiếp tục!', {
                toastId: 'survey_error',
                position: 'bottom-left',
                autoClose: 3000
              })
              push('/survey')
            }
          } else {
            if (USER_ROUTES.includes(pathname)) {
              toast('Vui lòng đăng nhập để tiếp tục!', {
                toastId: 'Auth_error',
                position: 'bottom-left',
                autoClose: 3000
              })
              push('/sign-in')
            }
          }
        }
      }
    }

    checkAuthentication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  // useEffect(() => {
  //   if (query?.companyId !== undefined) {
  //     dispatch(
  //       getCompanyProfile({
  //         id: query?.companyId
  //       })
  //     )
  //   }
  // }, [dispatch, query])

  useEffect(() => {
    const checkOwner = async () => {
      if (companyId && (departmentId || departmentPositionId)) {
        const res = await dispatch(hasEditPermission({ companyId }))
        if (res?.payload?.isSuccess) {
          dispatch(updateIsOwner(true))
        }
      }
    }
    checkOwner()
  }, [companyId])

  if (userProfile !== null && Object?.keys(userProfile)?.length === 0) {
    return <Fragment></Fragment>
  }

  return (
    <div className="min-h-[100vh] relative flex flex-col">
      <div className="">
        <FloatFeedback />
      </div>
      <NavbarCompany
        typeNavbar="top"
        NAVIGATION={HEADER}
        isLogin={userProfile}
        info={userProfile}
      />
      <Component {...props} component={null} />

      {/* {!GUEST_ROUTES.includes(pathname) && (
        <FooterEditCompany FOOTER={FOOTER} FOOTER_PROFILE={FOOTER_PROFILE} />
      )} */}
    </div>
  )
}

export default CompanyLayout
