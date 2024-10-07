import useOnClickOutside from 'common/hooks/useClickOutSide'
import useTrans from 'common/hooks/useTrans'
import XProfileIcon from 'common/presentation/Icons'
import { useRouter } from 'next/router'
import { Fragment, useEffect, useRef, useState } from 'react'
import { delay } from 'store/helper/functionHelper'
import SearchCareerPath from './searchCareerPath'
import { useSelector } from 'react-redux'
import {
  getAllNotification,
  selectAllNotifications
} from 'store/app/notification'
import NotificationCareerPath from './notificationCareerPath'
import NotificationPanel from 'common/presentation/Pages/account-setting/NotificationPanel'
import { useDispatch } from 'react-redux'
import { firebaseCloudMessaging } from '../../../../../firebase'
import { getProfile, selectUserProfile } from 'store/app/userSlice'
import NavbarFormMobile from 'common/container/Header/navbarCompany/navbarFormMobile'
import SearchSuggestMobile from 'common/container/Header/navbarCompany/searchSuggestMobile'

export const NavBarCareerPath = (props) => {
  const { map } = props
  const { name: nameMap } = map || {}
  const trans = useTrans()
  const { HEADER } = trans
  const { NAVIGATION_CAREER_PATH_CONFIG } = HEADER
  const router = useRouter()
  const dispatch = useDispatch()
  const notificationsData = useSelector(selectAllNotifications)
  const userProfile = useSelector(selectUserProfile)
  const notiNotSeen = notificationsData?.filter((noti) => !noti?.isRead)
  const [showSideBar, setShowSideBar] = useState({
    show: false,
    disable: false
  })
  const [showNotification, setShowNotification] = useState({
    show: false,
    disable: false
  })
  const [mounted, setMounted] = useState(false)
  const [searchSuggest, setSearchSuggest] = useState(false)
  const handleShowNotification = () => {
    setShowNotification({
      show: true,
      disable: true
    })
  }
  const handleCloseNotification = async () => {
    setShowNotification({
      ...showNotification,
      show: false
    })
    await delay(300)
    setShowNotification({
      show: false,
      disable: false
    })
  }
  const handleShowSideBar = () => {
    setShowSideBar({
      show: true,
      disable: true
    })
  }
  const handleCloseSideBar = async () => {
    setShowSideBar({
      ...showSideBar,
      show: false
    })
    await delay(300)
    setShowSideBar({
      show: false,
      disable: false
    })
  }
  const toggleModal = () => {
    setToggle(!toggle)
  }
  const handleSubmit = (value, e) => {
    e.preventDefault()
    if (value) {
      const array = localStorage.getItem('searchRecent')
      const parsed = array ? JSON.parse(array) : []
      const searchRecent = parsed.includes(value) ? parsed : [...parsed, value]
      localStorage.setItem('searchRecent', JSON.stringify(searchRecent))
    }
    window.location.replace('/jobs?keyword=' + value)
  }
  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, handleCloseSideBar)

  if (mounted) {
    firebaseCloudMessaging.onMessageListener()
  }
  useEffect(() => {
    dispatch(getProfile())
    dispatch(getAllNotification({ page: 1 }))
  }, [dispatch])

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
  return (
    <Fragment>
      <div className="  w-full  bg-transparent  fixed z-[60] md:px-10 px-6 md:py-6 py-[10px] pointer-events-none	">
        <div className="w-full items-center flex md:justify-between justify-center mx-auto max-w-[1440px]">
          <button
            onClick={() => {
              if (!showSideBar.disable) {
                handleShowSideBar()
              }
            }}
            className=" md:hidden absolute left-6  flex items-center justify-center  right-0  w-8 h-8 text-white focus:outline-none pointer-events-auto"
          >
            <div className=" w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-5 bg-white rounded-full transform transition duration-300 ease ${
                  showSideBar.show ? 'rotate-45 ' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-white transform rounded-full transition-all duration-200 ease ${
                  showSideBar.show ? 'w-0 opacity-50' : 'w-5  opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-white transform rounded-full transition duration-300 ease ${
                  showSideBar.show ? '-rotate-45 ' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>

          <div className="hidden md:block pointer-events-auto cursor-pointer">
            <div
              onClick={() => {
                window.location.href = '/'
              }}
              className={`${showSideBar.show ? 'hidden' : 'block'}`}
            >
              <XProfileIcon name="logoCareerWhite" />
            </div>
          </div>
          <div
            onClick={() => {
              window.location.href = '/'
            }}
            className="md:hidden"
          >
            <XProfileIcon name="logoMiniWhite" />
          </div>
          <div className="flex items-center md:gap-6 gap-4 md:static absolute right-6">
            {userProfile && (
              <Fragment>
                {/* Search button */}
                <div className=" pointer-events-auto">
                  <SearchCareerPath
                    placehoder="Business Analyst"
                    handleSubmit={handleSubmit}
                  />
                </div>
                {/* <div className="md:hidden pointer-events-auto">
                <NavbarFormMobile
                  placehoder="Business Analyst"
                  handleSubmit={handleSubmit}
                  setSearchSuggest={setSearchSuggest}
                />
              </div> */}

                {/* Notification button */}
                <div
                  className="pointer-events-auto"
                  onClick={() => {
                    if (!showNotification.disable) {
                      handleShowNotification()
                    }
                  }}
                >
                  <NotificationCareerPath quantity={notiNotSeen?.length || 0} />
                  {showNotification.show && (
                    <div className="fixed top-0 left-0  bg-transparent w-screen h-screen z-20">
                      <NotificationPanel
                        handleClickNotification={handleCloseNotification}
                      />
                    </div>
                  )}
                </div>
              </Fragment>
            )}
            {/* hamburger button */}
            <button
              onClick={() => {
                if (!showSideBar.disable) {
                  handleShowSideBar()
                }
              }}
              className=" md:flex hidden items-center justify-center top-0 right-0  relative w-8 h-8 text-white focus:outline-none pointer-events-auto"
            >
              <div className=" w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <span
                  className={`absolute h-0.5 w-5 bg-white rounded-full transform transition duration-300 ease ${
                    showSideBar.show ? 'rotate-45 ' : '-translate-y-1.5'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 bg-white transform rounded-full transition-all duration-200 ease ${
                    showSideBar.show ? 'w-0 opacity-50' : 'w-5  opacity-100'
                  }`}
                ></span>
                <span
                  className={`absolute h-0.5 w-5 bg-white transform rounded-full transition duration-300 ease ${
                    showSideBar.show ? '-rotate-45 ' : 'translate-y-1.5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
        {/* hamburger button */}
      </div>
      <div
        className={` fixed w-screen h-screen z-40
      ${
        showSideBar.show
          ? 'duration-300 visible bg-black bg-opacity-60'
          : 'duration-300 invisible '
      }
      `}
      >
        <div
          ref={showSideBar.show ? wrapperRef : null}
          className={`xl:w-[600px] w-screen  flex flex-col items-center justify-center h-screen ${
            nameMap === 'cs' ? 'bg-[#9B6A51]' : 'bg-[#504B6F]'
          } ${
            showSideBar.show
              ? 'duration-300 translate-x-auto '
              : 'duration-300 -translate-x-full '
          }`}
        >
          <ul className={`flex flex-col gap-6 items-center  `}>
            {NAVIGATION_CAREER_PATH_CONFIG?.map((element, index) => {
              const {
                title,
                navbarList,
                href,
                passHref,
                ownedCompany,
                hrefList
              } = element
              return (
                <li key={index} className="">
                  <a
                    target={passHref ? '_blank' : '_self'}
                    href={
                      ownedCompany ? `/profile-company/${companyId}/edit` : href
                    }
                    rel="noopener noreferrer"
                  >
                    <div
                      className={`xl:flex xl:justify-center hover:cursor-pointer`}
                    >
                      <p
                        className={`${
                          hrefList.includes(router.pathname) && ' text-button'
                        } xl:text-p20-bold text-p16-bold leading-8 text-white hover:duration-50  hover:text-button`}
                      >
                        {title}
                      </p>
                    </div>
                  </a>
                </li>
              )
            })}
          </ul>
          <div
            className={`flex items-center justify-center xl:justify-center w-full md:w-auto pt-20`}
          >
            <div
              onClick={() => {
                window.open('/logout', '_self')
              }}
              className="flex gap-4 items-center"
            >
              <XProfileIcon name="exitNoFill" fill="#fff" />
              <p className="text-p16-bold xl:text-p20-bold text-white">
                Đăng xuất
              </p>
            </div>
          </div>
        </div>
      </div>
      {searchSuggest && <SearchSuggestMobile />}
    </Fragment>
  )
}
