import React, { useState } from 'react'
import PropTypes from 'prop-types'
import NavbarButton from '../navbarButton'
import NavbarList from '../navbarList'
import Header from '../navbarHeader'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import NotificationPanel from 'common/presentation/Pages/account-setting/NotificationPanel'
import AccountOption from 'common/presentation/Pages/account-setting/AccountOption'
import { delay } from 'store/helper/functionHelper'
import Image from 'next/image'
import NavbarNotification from '../navbarNotification'
import NavbarForm from '../navbarForm'

import { useSelector } from 'react-redux'
import { selectRoleIdUser } from 'store/app/userSlice'
import { selectAllNotifications } from 'store/app/notification'
import NavbarFormMobile from '../navbarFormMobile'
import SearchSuggestMobile from '../searchSuggestMobile'
import RoleOption from 'common/presentation/Pages/account-setting/RoleOption'

const NavbarTop = (props) => {
  const {
    type,
    convertNavbar,
    info,
    auth,
    isLogin,
    handleSubmit,
    logoInfor,
    toggle,
    setToggle,
    searchSuggest,
    setSearchSuggest
  } = props
  const roleId = useSelector(selectRoleIdUser)
  const notificationsData = useSelector(selectAllNotifications)
  const notiNotSeen = notificationsData?.filter((noti) => !noti?.isRead)
  const [showNotification, setShowNotification] = useState({
    show: false,
    disable: false
  })

  const [showAccountSetting, setShowAccountSetting] = useState({
    show: false,
    disable: false
  })
  const [showRoleSetting, setShowRoleSetting] = useState({
    show: false,
    disable: false
  })
  const handleShowNotification = () => {
    setShowNotification({
      show: true,
      disable: true
    })
    document.body.style.overflow = 'hidden'
  }
  const handleCloseNotification = async () => {
    document.body.style.overflow = 'auto'
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

  const handleShowAccount = () => {
    setShowAccountSetting({
      show: true,
      disable: true
    })
  }
  const handleCloseAccount = async () => {
    setShowAccountSetting({
      ...showAccountSetting,
      show: false
    })
    await delay(300)
    setShowAccountSetting({
      show: false,
      disable: false
    })
  }

  const handleShowRole = () => {
    setShowRoleSetting({
      show: true,
      disable: true
    })
  }
  const handleCloseRole = async () => {
    setShowRoleSetting({
      ...showRoleSetting,
      show: false
    })
    await delay(300)
    setShowRoleSetting({
      show: false,
      disable: false
    })
  }
  const handleToggleMenu = () => {
    if (!toggle) {
      setToggle(true)
      document.body.style.overflow = 'hidden'
    }
  }
  return (
    <div
      className={` ${
        toggle && 'fixed'
      } xl:flex xl:items-center relative flex-wrap w-full justify-between xl:max-w-[1440px] mx-auto   pt-4 pb-4 px-4 xl:px-10`}
    >
      {showNotification.show && (
        <NotificationPanel handleClickNotification={handleCloseNotification} />
      )}
      {showAccountSetting.show && (
        <AccountOption
          info={info}
          roleId={roleId}
          handleClickAccount={handleCloseAccount}
        />
      )}
      {showRoleSetting.show && (
        <RoleOption roleId={roleId} handleClickRole={handleCloseRole} />
      )}
      <div className="flex items-center flex-wrap md:w-auto w-full ">
        <div className="xl:flex grid grid-cols-3 w-full xl:w-auto items-center   xl:mr-4">
          {/* <button
            className={`xl:hidden block `}
            onClick={() => {
              setToggle(true)
              document.body.style.overflow = 'hidden'
            }}
          >
            <XProfileIcon name="navbar" />
          </button> */}
          <button
            onClick={() => {
              handleToggleMenu()
            }}
            className={`${
              toggle && 'pointer-events-none'
            } xl:hidden flex items-center justify-center top-0 right-0  relative w-8 h-8 text-white focus:outline-none `}
          >
            <div className=" w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
              <span
                className={`absolute h-0.5 w-5 bg-black rounded-full transform transition duration-300 ease ${
                  toggle ? 'rotate-45 ' : '-translate-y-1.5'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 bg-black transform rounded-full transition-all duration-200 ease ${
                  toggle ? 'w-0 opacity-50' : 'w-5  opacity-100'
                }`}
              ></span>
              <span
                className={`absolute h-0.5 w-5 bg-black transform rounded-full transition duration-300 ease ${
                  toggle ? '-rotate-45 ' : 'translate-y-1.5'
                }`}
              ></span>
            </div>
          </button>
          <div className="flex justify-center w-full">
            <a href={logoInfor.href} aria-label="Xprofile-home">
              <div className="hidden xl:block hover:cursor-pointer">
                <XProfileIcon name={logoInfor.logo} width="194" height="28" />
              </div>
            </a>
            <div className="flex xl:hidden justify-center  w-full  ">
              <Link href={logoInfor.href} aria-label="Xprofile-home">
                <div className={`w-[52px] h-[24px]`}>
                  <Image
                    width={152}
                    height={72}
                    placeholder="blur"
                    blurDataURL="/images/logoMobile.png"
                    src="/images/logoMobile.png"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
          {isLogin && (
            <div
              className={`flex items-center justify-end  gap-2 xl:hidden mr-3 ml-3 cursor-pointer`}
              // onClick={() => {
              //   if (!isDisableNotify) {
              //     handleClickNotification()
              //   }
              // }}
            >
              {/* <XProfileIcon name="searchNavBar" /> */}
              <NavbarFormMobile
                placehoder="Business Analyst"
                handleSubmit={handleSubmit}
                setSearchSuggest={setSearchSuggest}
              />

              <div
                className=" cursor-pointer"
                onClick={() => {
                  if (!showNotification.disable) {
                    handleShowNotification()
                  }
                }}
              >
                <NavbarNotification quantity={notiNotSeen?.length || 0} />
              </div>
            </div>
          )}
        </div>

        <ul
          className={`hidden xl:flex  items-center rounded-lg border border-gray-100 md:flex-row xl:space-x-4 md:mt-0 md:text-p14 md:font-medium md:border-0`}
        >
          {convertNavbar.map((element, index) => {
            return (
              <li key={index} className="pt-5 pb-5 xl:pt-0 xl:pb-0 ">
                <NavbarList element={element} type={type} />
              </li>
            )
          })}
        </ul>
      </div>
      <div
        className={`hidden xl:flex items-center justify-end xl:justify-center w-full md:w-auto `}
      >
        {isLogin ? (
          <div className="flex">
            <Header
              info={info}
              handleSubmit={handleSubmit}
              handleClickNotification={handleShowNotification}
              handleClickAccount={handleShowAccount}
              isDisableNotify={showNotification.disable}
              isDisableAccount={showAccountSetting.disable}
              roleId={roleId}
            />
          </div>
        ) : (
          <div>
            <NavbarButton
              auth={auth}
              roleId={roleId}
              handleShowRole={handleShowRole}
              isDisableRole={showRoleSetting.disable}
            />
          </div>
        )}
      </div>
      {searchSuggest && <SearchSuggestMobile />}
    </div>
  )
}

export default NavbarTop

NavbarTop.propTypes = {
  logoInfor: PropTypes.shape({
    backgroundColor: PropTypes.string,
    image: PropTypes.string,
    companyName: PropTypes.string,
    href: PropTypes.string,
    account: PropTypes.bool
  }),
  NAVIGATION_CONFIG: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.arrayOf(
        PropTypes.shape({
          fillRule: PropTypes.string,
          d: PropTypes.string,
          clipRrule: PropTypes.string
        })
      ),
      children: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          href: PropTypes.string
        })
      )
    })
  ),
  theme: PropTypes.shape({
    theme: PropTypes.string
  }),
  buttonTitle: PropTypes.shape({
    login: PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.string,
      backgroundColor: PropTypes.string,
      hover: PropTypes.string,
      colorText: PropTypes.string
    }),
    logout: PropTypes.shape({
      title: PropTypes.string,
      href: PropTypes.string,
      icon: PropTypes.string,
      backgroundColor: PropTypes.string,
      hover: PropTypes.string,
      colorText: PropTypes.string
    })
  })
}

NavbarTop.defaultProps = {
  logoInfor: {
    backgroundColor: 'bg-gray-900',
    image:
      'https://saigonmio.com/wp-content/uploads/2021/06/mio_logo_176x80.png',
    companyName: 'Sai gon MIO',
    href: '#'
  },
  buttonTitle: {
    login: {
      title: 'Đăng nhập',
      href: '#',
      icon: '',
      backgroundColor: 'bg-blue-500',
      hover: 'bg-blue-400',
      colorText: 'text-white'
    },
    logout: {
      title: 'Đăng xuất',
      href: '#',
      icon: '',
      backgroundColor: 'bg-blue-500',
      hover: 'bg-blue-400',
      colorText: 'text-white'
    }
  },
  theme: {
    backgroundColor: 'bg-gray-800'
  },
  NAVIGATION_CONFIG: [
    {
      id: 'applications',
      title: 'Trang chủ',
      translate: 'APPLICATIONS',
      type: 'group',
      href: '#',
      icon: [
        {
          fillRule: 'evenodd',
          d: 'M12 14l9-5-9-5-9 5 9 5z',
          clipRrule: 'evenodd'
        },
        {
          fillRule: 'evenodd',
          d: 'M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z',
          clipRrule: 'evenodd'
        },
        {
          fillRule: 'evenodd',
          d: 'M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222',
          clipRrule: 'evenodd'
        }
      ],
      children: []
    }
  ],
  isLogin: true
}
