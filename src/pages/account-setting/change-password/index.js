import { useEffect, useState } from 'react'
import Head from 'next/head'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUserProfileCandidates } from 'store/app/userSlice'
import AccountView from 'common/presentation/Pages/account-setting/AccountView'
import useTrans from 'common/hooks/useTrans'
import ChangePasswordEdit from 'common/presentation/Pages/account-setting/ChangePasswordEdit'
import BreadCrumbsDynamic from 'common/presentation/BreadCrumbsDynamic'
import Image from 'next/image'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
const listBreadCrumbs = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'X-Profile'
  }
]
const JobSavedPage = () => {
  const dispatch = useDispatch()
  const portfolio = useSelector(selectUserProfileCandidates)
  const trans = useTrans()
  const { ACCOUNT_SETTING } = trans
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.USER.UPDATEPROFILE)
  )
  return (
    <>
      {loading && <LoadingRole />}

      <div className="flex-1 pb-[84px] xl:pt-[44px] bg-white xl:bg-inherit">
        <Head>
          <title>Đổi mật khẩu - X-Profile</title>
        </Head>

        <div className="px-4 xl:px-0 xl:flex hidden xl:w-[1140px] w-full justify-between mx-auto items-center relative ">
          <p className="xl:text-p28-bold text-p18-bold ">Thiết lập tài khoản</p>
        </div>

        <div className="flex flex-col xl:flex-row relative xl:w-[1140px] w-full xl:gap-[20px] mx-auto xl:mt-6 items-stretch">
          <div className="px-4 xl:px-0 sidebar">
            <AccountView
              {...portfolio}
              connect={ACCOUNT_SETTING?.society}
              actionList={ACCOUNT_SETTING?.accountAction}
            />
          </div>

          <div className=" xl:px-0 xl:w-2/3  w-full">
            <div className=" bg-white p-6 xl:p-8 rounded-[12px]">
              <ChangePasswordEdit />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobSavedPage
