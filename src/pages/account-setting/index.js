import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUserProfileCandidates } from 'store/app/userSlice'
import AccountView from 'common/presentation/Pages/account-setting/AccountView'
import useTrans from 'common/hooks/useTrans'
import { useRouter } from 'next/router'

const AccountSettingPage = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/account-setting/information'
  }

  return <></>
}

export default AccountSettingPage
