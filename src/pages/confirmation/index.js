import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'
import Image from 'next/image'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
  getInformationCompany,
  selectInformationCompany,
  userConfirmation
} from 'store/app/companySlice'
import { authService } from 'store/helper/authService'
import { getProfile, selectUserProfile } from 'store/app/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import NavbarCompany from 'common/container/Header/navbarCompany'
import useTrans from 'common/hooks/useTrans'
import FooterCompany from 'common/container/Footer/footerCompany'
import { getUserPortfolio } from 'store/app/portfolioSlice'
import AcceptedSection from 'common/presentation/Confirmation/AcceptedSection'
import FailedSection from 'common/presentation/Confirmation/FailedSection'
import RejectedSection from 'common/presentation/Confirmation/RejectedSection'
import ConfirmationSection from 'common/presentation/Confirmation/ConfirmationSection'

const Confirmation = (props) => {
  const dispatch = useDispatch()
  const trans = useTrans()
  const { HEADER, FOOTER } = trans
  const accessToken = authService.getAccessToken()
  const DUMP_DATA_CONFIRMATION_TYPE = [
    {
      name: 'Xác nhận thử việc',
      id: 0
    },
    {
      name: 'Xác nhận chính thức',
      id: 1
    },
    {
      name: 'Xác nhận khác',
      id: 2
    },
    {
      name: 'Từ chối',
      id: 3
    }
  ]
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.COMPANY.USERCONFIRMATION) ||
      selectLoading(state, APP_TYPES.COMPANY.INFORMATIONCOMPANY)
  )
  const { query } = useRouter()
  const [state, setState] = useState({
    confirmToken: '',
    rejectToken: '',
    isRejected: false,
    isAccept: false,
    isFailedAPI: false,
    currentTypeNameConfirmation: 'Xác nhận thử việc',
    currentIdConfirmation: 0
  })
  const profileCompany = useSelector(selectInformationCompany)
  const userProfile = useSelector(selectUserProfile)

  const handleChooseTypeConfirmation = (item) => {
    setState({
      ...state,
      currentTypeNameConfirmation: item?.name,
      currentIdConfirmation: item?.id
    })
  }
  // const handleClickDenied = async () => {
  //   const payload = {
  //     companyId: state?.companyId,
  //     email: query?.email,
  //     token: state?.rejectToken,
  //     companyUserConfirmType: 3 // 3 là enum từ chối
  //   }
  //   const rejectedCompany = await dispatch(userConfirmation(payload))
  //   const res = unwrapResult(rejectedCompany)
  //   if (res?.isSuccess) {
  //     setState({
  //       ...state,
  //       isRejected: true
  //     })
  //   } else {
  //     setState({
  //       ...state,
  //       isFailedAPI: true
  //     })
  //   }
  // }

  const handleClickAccept = async () => {
    const payload = {
      companyId: state?.companyId,
      email: query?.email,
      token:
        state?.currentIdConfirmation === 3
          ? state?.rejectToken
          : state?.confirmToken,
      companyUserConfirmType: state?.currentIdConfirmation
    }
    const acceptCompany = await dispatch(userConfirmation(payload))
    const res = unwrapResult(acceptCompany)
    setState({
      ...state,
      isAccept: res?.isSuccess && state?.currentIdConfirmation !== 3,
      isRejected: res?.isSuccess && state?.currentIdConfirmation === 3,
      isFailedAPI: !res?.isSuccess
    })
  }
  const handleClickRedirectHomePage = () => {
    window.location.replace('/')
  }
  const handleClickRedirectSignInPage = () => {
    window.location.replace('/sign-in')
  }

  const fetchInitData = () => {
    if (query) {
      const data = query?.token?.split('::') || []
      setState({
        ...state,
        confirmToken: data[0],
        companyId: parseInt(data[1]),
        rejectToken: data[2]
      })
      const companyId = data && parseInt(data[1])
      dispatch(getInformationCompany(companyId))
      // dispatch(getProfile())
    }
  }

  useEffect(() => {
    dispatch(getProfile())
    return () => {}
  }, [dispatch])

  useEffect(() => {
    if (accessToken && userProfile?.email && query?.email) {
      const isEqualEmail = userProfile?.email === query?.email
      if (!isEqualEmail) {
        window.location.replace('/404')
      } else {
        fetchInitData()
      }
    } else if (!accessToken) {
      fetchInitData()
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, userProfile])

  return (
    <div className="min-h-[100vh] relative flex flex-col">
      <NavbarCompany
        typeNavbar="top"
        NAVIGATION={HEADER}
        isLogin={userProfile}
        info={userProfile}
      />
      {loading && <LoadingRole />}
      <div className="flex-1 flex justify-center">
        {!state?.isAccept && !state?.isRejected && !state?.isFailedAPI && (
          <ConfirmationSection
            handleChooseTypeConfirmation={handleChooseTypeConfirmation}
            dataListTypeConfirmation={DUMP_DATA_CONFIRMATION_TYPE}
            currentTypeNameConfirmation={state?.currentTypeNameConfirmation}
            profileCompany={profileCompany}
            // handleClickDenied={handleClickDenied}
            handleClickAccept={handleClickAccept}
          />
        )}
        {state?.isRejected && (
          <RejectedSection
            handleClickRedirectHomePage={handleClickRedirectHomePage}
          />
        )}
        {state?.isAccept && (
          <AcceptedSection
            profileCompany={profileCompany}
            handleClickRedirectHomePage={handleClickRedirectHomePage}
          />
        )}
        {state?.isFailedAPI && (
          <>
            <FailedSection
              accessToken={accessToken}
              handleClickRedirectHomePage={handleClickRedirectHomePage}
              handleClickRedirectSignInPage={handleClickRedirectSignInPage}
            />
          </>
        )}
      </div>
      <FooterCompany FOOTER={FOOTER} />
    </div>
  )
}

Confirmation.propTypes = {}

export default Confirmation
