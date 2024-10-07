import { unwrapResult } from '@reduxjs/toolkit'
import AccountStepMobile from 'common/presentation/AccountStepMobile'

import XProfileIcon from 'common/presentation/Icons'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  selectUserProfile,
  updateProfile,
  getProfile,
  selectRoleIdUser
} from 'store/app/userSlice'
import { uploadImage } from 'store/helper/serviceHelper'

const ICONS = {
  facebook: 'socialFacebook',
  twitter: 'socialTwitter',
  zalo: 'socialZalo',
  youtube: 'socialYoutube',
  telegram: 'socialTelegram',
  blog: 'socialFacebook',
  tiktok: 'socialTiktok'
}

const AccountView = (props) => {
  const { connect, actionList, sidebarRef } = props
  const userProfile = useSelector(selectUserProfile)
  const roleId = useSelector(selectRoleIdUser)
  const { src, alt, avatarUrl, altAvt, name, setting } = userProfile || {}
  const { jobName, socials } = setting || {}
  const [choosedStepId, setChooseStepId] = useState(0)

  const router = useRouter()

  const dispatch = useDispatch()

  const handleUploadAvatar = async (file) => {
    const { size } = file[0]
    if (size > 512000000) {
      toast(
        AlertError({
          title: 'Không tải được ảnh lên!',
          description: 'Kích thước file tối đa 5MB'
        }),
        {
          toastId: 'upload-avatar-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      return false
    }
    try {
      const result = await uploadImage(file[0], 1024)

      if (result) {
        const payload = {
          avatarUrl: result?.successMessage
        }

        updateUser(payload)
      }
    } catch (err) {
      toast(
        AlertError({
          title: 'Có lỗi xảy ra!',
          description: 'Không tải được ảnh lên'
        }),
        {
          toastId: 'upload-avatar-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const updateUser = async (payload) => {
    const updateUserProfile = await dispatch(updateProfile(payload))
    const { data } = unwrapResult(updateUserProfile)

    if (data) {
      toast(
        AlertSuccess({
          title: 'Cập nhật thành công',
          description: 'Thông tin của bạn đã được ghi nhận.'
        }),
        {
          toastId: 'update-user-portfolio-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      dispatch(getProfile())
    } else {
      toast(
        AlertError({
          title: 'Có lỗi xảy ra!',
          description: 'Vui lòng thử lại sau'
        }),
        {
          toastId: 'upload-avatar-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const handleChoose = async (id) => {
    setChooseStepId(id)
  }

  if (!userProfile) {
    return <></>
  }
  // let sidebar = document.getElementsByClassName('sidebar')[0]
  // let sidebar_content = document.getElementsByClassName('content-wrapper')[0]
  // let sidebarTop = sidebar_content.offsetTop
  // let sidebarHeight = sidebar_content.clientHeight
  // let sidebarBottom = sidebarHeight - sidebarTop
  // let lastScrollTop = window.scrollY
  // let wasScrollingDown = true
  // let initialSidebarTop = sidebar_content.position().top
  // window.onscroll = () => {
  // let scrollTop = window.scrollY // current scroll position

  // let viewportHeight = window.innerHeight //viewport height
  // let contentHeight = sidebar_content?.getBoundingClientRect().height // current content height
  // let sidebarTop = sidebar?.getBoundingClientRect().top + window.pageYOffset //distance from top to sidebar
  // let sidebarHeight = sidebar_content.offsetHeight
  // let windowBottom = scrollTop + viewportHeight

  // if (scrollTop >= contentHeight - viewportHeight + sidebarTop) {
  //   sidebar_content.style.transform = `translateY(-${
  //     contentHeight - viewportHeight + sidebarTop
  //   }px)`
  //   sidebar_content.style.position = 'fixed'
  // } else {
  //   sidebar_content.style.transform = ''
  //   sidebar_content.style.position = ''
  // }
  // }

  return (
    <div className="w-full sticky top-1">
      <div
        id="sideBar"
        className=" hidden xl:block content-wrapper  rounded-borderStep pb-6 xl:pb-0  bg-white xl:w-[360px] w-full "
        // style={{ top: `${top}px` }}
      >
        {/* <div className="relative ">
          {avatarUrl && (
            <div className="relative group rounded-full border-[4px] border-white bg-white xl:w-[177px] w-[134px] h-[134px] xl:h-[177px] object-cover mx-auto -mt-[100px] overflow-hidden ">
              <Image
                // width={177}
                // height={177}
                layout="fill"
                src={avatarUrl}
                alt={altAvt}
                objectFit="cover"
                priority={true}
                className="rounded-full"
              />
              <input
                type="file"
                id="imgAvatar"
                name="img"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleUploadAvatar(e.target.files)}
              />
              <div className="absolute bottom-0 w-full transition-all duration-200  group-hover:h-1/2 h-0 bg-[#3a3533c7]">
                <div className="absolute hidden group-hover:block bottom-3 left-[45%] cursor-pointer">
                  <label
                    className="cursor-pointer"
                    htmlFor="imgAvatar"
                    // onClick={() => handleEditMode()}
                  >
                    <XProfileIcon name="upload" />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div> */}
        {/* <div className="xl:pt-[32px] pt-3 px-auto text-center mb-[36px] w-full">
          <div className="group relative text-center h-full">
            <span
              className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -translate-y-1/2  opacity-0 m-4 mx-auto w-full py-2"
            >
              {name}
            </span>

            <p className="text-blue-light w-full break-words xl:text-h3 text-p18-bold line-clamp-1 ">
              {name}
            </p>
          </div>

          <p className="mt-[8px] text-neutral text-p18 truncate px-4">
            {jobName}
          </p>
          <div className="flex justify-center mt-[20px] gap-[8px]">
            {socials?.map((el, ind) => {
              return (
                <Link href={el.url} key={ind}>
                  <a target="_blank" rel="noopener noreferrer">
                    <XProfileIcon name={ICONS[el.type]} />
                  </a>
                </Link>
              )
            })}
          </div>
        </div> */}

        <div className=" p-8  ">
          {actionList.map((action, index) => {
            const { title, id, icon, href } = action
            if (parseInt(roleId) !== 2 || (id !== 3 && id !== 4)) {
              return (
                <Link key={id} href={href}>
                  <div
                    className={`${
                      router.pathname.includes(href) &&
                      'bg-[#F5F6F7] text-button-2'
                    } flex items-center  gap-4 hover:bg-[#F5F6F7] cursor-pointer px-6 py-4 rounded-borderStep mb-3 transition-all`}
                  >
                    <div>
                      <XProfileIcon
                        name={icon || 'upload'}
                        fill={
                          router.pathname.includes(href) ? '#294F9B' : '#000000'
                        }
                      />
                    </div>
                    <p
                      className={` ${
                        router.pathname.includes(href)
                          ? ' text-button-2 text-p18-bold'
                          : 'text-neutral text-p18 '
                      }`}
                    >
                      {title}
                    </p>
                  </div>
                </Link>
              )
            }
          })}
        </div>
      </div>
      <div className="xl:hidden ">
        <AccountStepMobile
          style="shadow-none bg-transparent border-b py-6 "
          SETTING_STEP={actionList}
          handleChoose={handleChoose}
          choosedStepId={choosedStepId}
          styleEleText=" text-p14"
          showIcon={false}
          widthEle="fit-content"
        />
      </div>
    </div>
  )
}

export default AccountView
