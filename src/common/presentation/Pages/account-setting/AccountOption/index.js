import React, { Fragment, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import Link from 'next/link'
import { Divider } from 'common/presentation/Divider'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const AccountOption = (props) => {
  const { handleClickAccount = () => {}, roleId = null, info } = props
  const trans = useTrans()
  const { NOTIFICATION } = trans
  const accountRef = useRef(null)
  useOnClickOutside(accountRef, handleClickAccount)
  const { avatarUrl, name } = info || {}
  return (
    <div
      ref={accountRef}
      className=" absolute animate-fadeIn border border-grey-4 opacity-0 flex flex-col  gap-4 right-10 top-20 z-20   p-6 transition ease-in-out duration-700 rounded-2xl  bg-white shadow-[0_16px_24px_rgba(0,0,0,0.04)]"
    >
      <div className="flex flex-col items-center justify-center gap-2">
        <div className="rounded-full border border-grey-4 bg-white w-[80px] h-[80px]  mx-auto  overflow-hidden flex justify-center items-center relative">
          {/* {avatarUrl && ( */}
          <Image
            layout="fill"
            src={
              avatarUrl !== null && avatarUrl !== ''
                ? avatarUrl
                : parseInt(roleId) === 0
                ? '/images/DefaultAvatarCuu.png'
                : parseInt(roleId) === 1
                ? '/images/DefaultAvatarChuot.png'
                : parseInt(roleId) === 2
                ? '/images/DefaultAvatarGau.png'
                : '/images/DefaultAvatarCuu.png'
            }
            alt=""
            objectFit="cover"
            priority={true}
            quality={100}
          />
          {/* )} */}
        </div>
        <p className="text-p20-bold text-center max-w-[236px] line-clamp-2 overflow-ellipsis ">
          {name}
        </p>
      </div>
      <div className="px-6">
        <Divider />
      </div>
      <a
        href={'/account-setting/information'}
        className="text-p18 text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
      >
        <XProfileIcon name="userCard" />
        Hồ sơ công khai
      </a>
      <a
        href={'/account-setting/personal-information'}
        className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
      >
        <XProfileIcon name="userRounded" />
        Thông tin cá nhân
      </a>
      <a
        href={'/account-setting/change-password'}
        className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
      >
        <XProfileIcon name="keyMini" />
        Đổi mật khẩu
      </a>

      {parseInt(roleId) !== 2 && (
        <Fragment>
          <a
            href={'/account-setting/job-saved'}
            className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
          >
            <XProfileIcon name="bookmark" />
            Việc làm đã lưu
          </a>
          <a
            href={'/account-setting/applicationHistory'}
            className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
          >
            <XProfileIcon name="documentAdd" />
            Lịch sử ứng tuyển
          </a>
        </Fragment>
      )}
      <a
        href={'/account-setting/courses'}
        className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath"
      >
        <XProfileIcon name="bookBookmark" />
        Khoá học của tôi
      </a>
      <div className="px-6">
        <Divider />
      </div>
      <Link href={'/logout'}>
        <a className="text-p18 transition-all text-neutral px-6 py-3 hover:bg-light-nude rounded-lg flex items-center gap-4 min-w-[284px] cursor-careerPath">
          <XProfileIcon name="exit" />
          Đăng xuất
        </a>
      </Link>
    </div>
  )
}

export default AccountOption
