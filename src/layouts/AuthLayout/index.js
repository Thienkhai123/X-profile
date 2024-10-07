import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getProfile,
  selectUserProfile,
  updateProfile
} from 'store/app/userSlice'
import NavbarCompany from 'common/container/Header/navbarCompany'
import Footer from 'common/container/Footer/footerCompany'
import { useRouter } from 'next/router'
import {
  ACCESS_TOKEN,
  COMPANY_ROUTES,
  GUEST_ROUTES,
  USER_ROUTES
} from 'common/config/app.constants'
import { ROLE_STORAGE, SURVEY_STORAGE } from 'common/config/app.constants'
import { toast } from 'react-toastify'
import useTrans from 'common/hooks/useTrans'
import { unwrapResult } from '@reduxjs/toolkit'
import Footer_Profile from 'common/container/Footer/Footer_Profile'
import { getCompanyProfile, selectProfileCompany } from 'store/app/companySlice'
import { getUserPortfolio } from 'store/app/portfolioSlice'
import localforage from 'localforage'
import { getAllNotification } from 'store/app/notification'
import { firebaseCloudMessaging } from '../../../firebase'
import FloatFeedback from 'common/presentation/FloatFeedback'

const AuthLayout = (props) => {
  const { component: Component } = props
  const trans = useTrans()
  const { HEADER, FOOTER, FOOTER_PROFILE } = trans
  const { pathname, push, query } = useRouter()
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)
  const profileCompany = useSelector(selectProfileCompany)
  const [mounted, setMounted] = useState(false)
  const [checkFirst, setCheckFirst] = useState(false)

  if (mounted) {
    firebaseCloudMessaging.onMessageListener()
  }
  const { profile, addressBooks } = profileCompany

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const fetchData = await dispatch(getProfile())
        const { data } = unwrapResult(fetchData)
        const userRoleId = data?.setting?.characterId
        if (userRoleId !== 2) {
          await dispatch(getUserPortfolio())
        }
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
      setCheckFirst(true)
    }

    checkAuthentication()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (query?.companyId !== undefined && isNaN(parseInt(query?.companyId))) {
      dispatch(
        getCompanyProfile({
          id: query?.companyId
        })
      )
    }
  }, [dispatch, query])

  useEffect(() => {
    firebaseCloudMessaging.init()
    const setToken = async () => {
      const token = await firebaseCloudMessaging.tokenInlocalforage()
      if (token) {
        setMounted(true)

        // not working
      }
    }
    setToken()
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/firebase-messaging-sw.js')
        .then((reg) => console.debug('Service worker registered sucessfully'))
    }
  }, [])

  if (!checkFirst) {
    return <Fragment></Fragment>
  }

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
      {COMPANY_ROUTES.includes(pathname) && (
        <Footer_Profile
          addressBooks={addressBooks}
          src={profile?.avatarUrl}
          address={profile?.address}
          wardName={profile?.wardName}
          districtName={profile?.districtName}
          cityName={profile?.cityName}
          firstPhone={profile?.meta ? profile?.meta?.contactPhone1 : null}
          secondPhone={profile?.meta ? profile?.meta?.contactPhone2 : null}
          email={profile?.meta ? profile?.meta?.contactEmail : null}
          titleAddress={FOOTER_PROFILE.titleAddress}
          titleEmail={FOOTER_PROFILE.titleEmail}
          titlePhone={FOOTER_PROFILE.titlePhone}
          socialConnect={profile?.meta?.socials}
        />
      )}
      {!GUEST_ROUTES.includes(pathname) && <Footer FOOTER={FOOTER} />}
    </div>
  )
}

export default AuthLayout
