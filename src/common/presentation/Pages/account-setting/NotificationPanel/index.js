import React, { useEffect, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import NotificationItem from './NotificationItem'
import NotificationTab from './NotificationTab'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useSelector } from 'react-redux'
import {
  clickNotification,
  getAllNotification,
  loadMoreNotification,
  removeNotification,
  selectAllNotifications,
  selectIsMaxPageNotification,
  selectNotificationCurrentPage,
  selectNotificationNotRead,
  selectNotificationQuery,
  selectNotificationTotalPage,
  updateCurrentPage,
  updateReadNotification
} from 'store/app/notification'
import { useDispatch } from 'react-redux'
import { useWindowSize } from 'common/hooks/useWindowSize'
import { rule } from 'postcss'

const NotificationPanel = (props) => {
  const { handleClickNotification = () => {} } = props
  const trans = useTrans()
  const { NOTIFICATION } = trans
  const dispatch = useDispatch()

  const notificationsData = useSelector(selectAllNotifications)
  const totalPage = useSelector(selectNotificationTotalPage)
  const currentPage = useSelector(selectNotificationCurrentPage)
  const [tabActive, setTabActive] = useState(0)
  const [elHeight, setElHeight] = useState(0)
  const notiNotSeen = useSelector(selectNotificationNotRead)
  const windowSize = useWindowSize()
  const scrollRef = useRef(null)
  const modalRemoveMobileRef = useRef(null)
  const [modalRemoveMobile, setModalRemoveMobile] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const handleClickTab = (id) => {
    if (id === 0) {
      setTabActive(0)
    } else if (id === 1) {
      setTabActive(1)
    }
  }
  const handleClickMenuDotMobile = (id) => {
    setSelectedId(id)
    setModalRemoveMobile(true)
  }
  const handleCloseModalRemoveMobile = () => {
    setModalRemoveMobile(false), setSelectedId(null)
  }
  useOnClickOutside(modalRemoveMobileRef, handleCloseModalRemoveMobile)

  const handleDeleteNotification = async (id) => {
    await Promise.all([
      dispatch(removeNotification({ userNotificationId: id }))
    ]).then(() => dispatch(getAllNotification({ page: 1 })))
  }

  const handleClickNotificationItem = async (id, url) => {
    if (id) {
      const res = await dispatch(clickNotification({ userNotificationId: id }))
      if (res?.payload?.isSuccess) {
        if (url && url !== '') {
          window.open(url)
        } else {
          handleClickNotification()
          dispatch(getAllNotification({ page: 1 }))
        }
      }
    }
  }

  const notificationRef = useRef(null)
  const clickOutside = () => {
    handleClickNotification()
    dispatch(getAllNotification({ page: 1 }))
  }
  useOnClickOutside(notificationRef, clickOutside)

  const handleClickMore = () => {
    if (totalPage > 1 && currentPage < totalPage) {
      dispatch(loadMoreNotification({ page: currentPage + 1 }))
    }
  }

  useEffect(() => {
    if (notiNotSeen?.length != 0) {
      let ids = notiNotSeen?.map((item) => item?.userNotificationId)
      dispatch(updateReadNotification({ ids }))
    }
    if (notificationRef.current && scrollRef.current) {
      setElHeight(
        window.innerHeight -
          notificationRef.current?.offsetTop -
          scrollRef.current?.offsetTop
      )
    }
  }, [windowSize.width])

  return (
    <div
      ref={notificationRef}
      className=" absolute  xl:right-24 border-grey-4 xl:border pb-2 right-0 xl:top-20 top-0 xl:z-10 z-50 xl:w-[440px]  w-full   transition ease-in-out duration-700 xl:rounded-2xl rounded-t-none  bg-white xl:shadow-[0_16px_24px_rgba(0,0,0,0.04)]"
    >
      <div className="p-6 sticky">
        <div className="flex items-center xl:justify-between justify-center  xl:pb-4 py-2   ">
          <div
            className="xl:hidden absolute left-6"
            onClick={() => clickOutside()}
          >
            <XProfileIcon name="cross" stroke="#333333" />
          </div>
          <p className="text-p20-bold ">Thông báo</p>
          {/* <div className="flex items-center gap-4"> */}
          {/* <div className="hidden xl:block">
              <XProfileIcon name="indentIncrease" />
            </div>

            <div className="hidden xl:block">
              <XProfileIcon name="setting" />
            </div> */}
          {/* </div> */}
        </div>
        <div className=" hidden xl:flex items-center gap-4 mt-6 xl:mt-0">
          {NOTIFICATION?.tabs?.map((tab, index) => {
            const { id, title } = tab
            return (
              <NotificationTab
                key={index}
                id={id}
                title={title}
                handleClickTab={handleClickTab}
                tabActive={tabActive}
              />
            )
          })}
          {/* <button
        className="px-[12px] py-[8px] bg-stoke rounded-[20px]"
        onClick={() => handleClickNotSeen()}
      >
        <p className="text-p14 text-grey-2">Chưa đọc</p>
      </button> */}
        </div>
      </div>
      <div
        ref={scrollRef}
        className={` custom-scrollbar overflow-y-auto xl:max-h-[540px] xl:px-2 px-6  `}
        style={{
          height: elHeight
        }}
      >
        {tabActive === 0 && (
          <div className="h-full">
            {notificationsData?.length !== 0 ? (
              <div>
                {notificationsData?.map((noti, index) => (
                  <NotificationItem
                    key={index}
                    {...noti}
                    handleDeleteNotification={handleDeleteNotification}
                    handleClickMenuDotMobile={handleClickMenuDotMobile}
                    handleClickNotificationItem={handleClickNotificationItem}
                  />
                ))}
                {totalPage > 1 && currentPage < totalPage && (
                  <div
                    onClick={() => handleClickMore()}
                    className="w-full group border-t px-7 hover:bg-blue-main transition-all rounded-b-xl py-3 cursor-pointer"
                  >
                    <p className="mx-auto group-hover:text-white">Xem thêm </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full h-4/5 flex flex-col items-center justify-center">
                <Image
                  alt="empty"
                  width={200}
                  height={200}
                  src={'/images/empty.svg'}
                />
                <p className="text-grey-2 text-p18 mt-10">
                  Hiện chưa có thông báo nào
                </p>
              </div>
            )}
          </div>
        )}

        {tabActive === 1 && (
          <div className="h-full">
            {notiNotSeen?.length !== 0 ? (
              <div>
                {notiNotSeen?.map((noti, index) => (
                  <NotificationItem
                    key={index}
                    {...noti}
                    handleDeleteNotification={handleDeleteNotification}
                  />
                ))}
              </div>
            ) : (
              <div className="w-full h-4/5 flex flex-col items-center justify-center">
                <Image
                  alt="empty"
                  width={200}
                  height={200}
                  src={'/images/empty.svg'}
                />
                <p className="text-grey-2 text-p18 mt-10">
                  Hiện chưa có thông báo nào
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <div
        className={`${
          modalRemoveMobile ? 'z-[10000] bg-black/30' : '-z-50 '
        } w-[100vw] h-[100vh] fixed flex justify-center items-end  left-[calc(0%)] top-[calc(0%)] transition-all duration-500 xl:hidden`}
      >
        <div
          ref={modalRemoveMobileRef}
          className={`w-full h-[340px] bg-white rounded-tl-3xl rounded-tr-3xl transition-all duration-700 ${
            modalRemoveMobile ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="relative py-4 flex justify-center items-center border-b border-grey-4">
            <p className="text-p18-bold py-4"></p>
            <div
              onClick={() => {
                setModalRemoveMobile(!modalRemoveMobile), setSelectedId(null)
              }}
              className="absolute right-6"
            >
              <XProfileIcon name="cross" stroke="#000000" />
            </div>
          </div>
          <div
            onClick={() => {
              handleDeleteNotification(selectedId),
                setModalRemoveMobile(false),
                setSelectedId(null)
            }}
            className="hover:bg-light-nude px-6 py-5"
          >
            <p className="text-p16">Gỡ thông báo này</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationPanel
