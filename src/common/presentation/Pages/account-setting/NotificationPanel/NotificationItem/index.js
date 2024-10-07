import React, { Fragment, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import moment from 'moment'
import 'moment/locale/vi'
import Link from 'next/link'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { delay } from 'store/helper/functionHelper'

moment.locale('vi')

const NotificationItem = (props) => {
  const {
    id,
    notifyType = 0,
    isRead = false,
    content,
    title,
    url,
    userNotificationId,
    createdAt,
    handleDeleteNotification = () => {},
    handleClickMenuDotMobile = () => {},
    handleClickNotificationItem = () => {}
  } = props
  const trans = useTrans()
  const [showOption, setShowOption] = useState({ show: false, disable: false })
  const dateTimeAgo = moment(new Date(createdAt)).fromNow()
  const optionRef = useRef(null)

  const handleClickOption = (e) => {
    e.stopPropagation()
    setShowOption({
      show: true,
      disable: true
    })
  }

  const handleDelete = (userNotificationId, e) => {
    handleDeleteNotification(userNotificationId)
    setShowOption(false)
    e.preventDefault()
  }
  const clickOutside = async () => {
    setShowOption({
      ...showOption,
      show: false
    })
    await delay(300)
    setShowOption({
      show: false,
      disable: false
    })
  }
  useOnClickOutside(optionRef, clickOutside)

  return (
    <Fragment>
      {/* <a href={!showOption.disable && url ? url : '#'}> */}
      <div
        className={`flex items-start justify-between py-2  xl:px-4 cursor-pointer relative xl:hover:bg-[#F5F6F7] rounded-2xl`}
      >
        <div
          onClick={() => handleClickNotificationItem(userNotificationId, url)}
          className="flex items-start gap-5"
        >
          {!isRead && (
            <div className="absolute xl:left-1 -left-4 top-10">
              <div className=" w-2 h-2 rounded-full bg-blue-light"></div>
            </div>
          )}
          <div className="w-[64px] h-[64px]  flex items-center justify-center rounded-full border border-nude">
            <Image
              placeholder="blur"
              blurDataURL="/images/logoMobile.png"
              src="/images/logoMobile.png"
              width={44}
              height={44}
              className=" "
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col gap-1 xl:w-[270px] w-[214px] ">
            <p className="line-clamp-3 break-words text-neutral text-p16-bold ">
              {title}
            </p>
            <p
              dangerouslySetInnerHTML={{ __html: content }}
              className="line-clamp-5 break-words text-neutral xl:text-p16 text-p16"
            >
              {/* {content} */}
            </p>

            {/* {notifyType === 1 && (
                <button className="w-[120px] h-[24px] rounded bg-blue-light">
                  <p className="text-p14 font-bold text-white">View 1 job</p>
                </button>
              )} */}
            <p className="text-p14 text-grey-1">{dateTimeAgo}</p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3 ">
          <div
            className="hidden xl:flex items-center justify-center "
            onClick={(e) => {
              if (!showOption.disable) {
                handleClickOption(e)
              }
            }}
          >
            <XProfileIcon
              name="listMenu"
              stroke={`${!isRead ? '#294F9B' : '#666666'}`}
            />
          </div>
          <div
            className="xl:hidden flex items-center justify-center "
            onClick={(e) => {
              e.preventDefault(), handleClickMenuDotMobile(userNotificationId)
            }}
          >
            <XProfileIcon
              name="listMenu"
              stroke={`${!isRead ? '#294F9B' : '#666666'}`}
            />
          </div>
        </div>

        {showOption.show && (
          <div
            ref={optionRef}
            className="absolute z-50 right-12 border border-grey-4 bg-white px-6 py-3 transition-all rounded-lg shadow-[0_8px_16px_rgba(0,0,0,0.04)]"
            onClick={(e) => handleDelete(userNotificationId, e)}
          >
            <p className="text-p16 text-neutral ">Gỡ thông báo này </p>
          </div>
        )}
      </div>
      {/* </a> */}
    </Fragment>
  )
}

export default NotificationItem
