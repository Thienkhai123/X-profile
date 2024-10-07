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
import HeaderComapny from '../navbarHeaderCompany'
import MenuEditOption from 'common/presentation/Pages/account-setting/MenuEditOption'

const NavbarTopCompany = (props) => {
  const {
    type,
    convertNavbar,
    info,
    auth,
    isLogin,
    handleSubmit,
    logoInfor,
    toggle,
    setToggle
  } = props
  const roleId = useSelector(selectRoleIdUser)
  const notificationsData = useSelector(selectAllNotifications)
  const notiNotSeen = notificationsData?.filter((noti) => !noti?.isRead)
  const [showMenuEdit, setShowMenuEdit] = useState({
    show: false,
    disable: false
  })
  const { ownedCompany } = info || {}

  const [showAccountSetting, setShowAccountSetting] = useState({
    show: false,
    disable: false
  })
  const handleShowMenuEdit = () => {
    setShowMenuEdit({
      show: true,
      disable: true
    })
    document.body.style.overflow = 'hidden'
  }
  const handleCloseMenuEdit = async () => {
    document.body.style.overflow = 'auto'
    setShowMenuEdit({
      ...showMenuEdit,
      show: false
    })
    await delay(300)
    setShowMenuEdit({
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

  return (
    <div className="xl:flex  xl:items-center relative flex-wrap w-full justify-between xl:max-w-[1440px] mx-auto   pt-4 pb-4 px-4 xl:px-10">
      {showAccountSetting.show && (
        <AccountOption
          info={info}
          roleId={roleId}
          handleClickAccount={handleCloseAccount}
        />
      )}

      <div className="flex items-center flex-wrap md:w-auto w-full ">
        <div className="xl:flex grid grid-cols-3 w-full xl:w-auto items-center   xl:mr-4">
          <button
            className={`xl:hidden block ${toggle ? 'hidden' : 'block'}`}
            onClick={() => {
              setToggle(true)
              document.body.style.overflow = 'hidden'
            }}
          >
            <XProfileIcon name="navbar" />
          </button>
          <div className="flex justify-center w-full">
            <Link href={logoInfor.href} aria-label="Xprofile-home">
              <div className="hidden xl:block hover:cursor-pointer">
                <XProfileIcon name={logoInfor.logo} width="194" height="28" />
              </div>
            </Link>
            <div className="flex xl:hidden justify-center  w-full  ">
              <Link href={logoInfor.href} aria-label="Xprofile-home">
                <div
                  className={`w-[52px] h-[24px] ${toggle ? 'hidden' : 'block'}`}
                >
                  <Image
                    width={152}
                    height={72}
                    src="/images/logoMobile.png"
                    alt=""
                  />
                </div>
              </Link>
            </div>
          </div>
        </div>

        <ul
          className={`hidden xl:flex  items-center rounded-lg border border-gray-100 md:flex-row xl:space-x-4 md:mt-0 md:text-p14 md:font-medium md:border-0`}
        >
          {convertNavbar.map((element, index) => {
            return (
              <li key={index} className="pt-5 pb-5 xl:pt-0 xl:pb-0 ">
                <NavbarList
                  element={element}
                  type={type}
                  company={ownedCompany}
                />
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
            <HeaderComapny
              info={info}
              handleSubmit={handleSubmit}
              handleClickMenuEdit={handleShowMenuEdit}
              handleClickAccount={handleShowAccount}
              isDisableMenuEdit={showMenuEdit.disable}
              isDisableAccount={showAccountSetting.disable}
              roleId={roleId}
            />
          </div>
        ) : (
          <div>
            <NavbarButton auth={auth} />
          </div>
        )}
      </div>
    </div>
  )
}

export default NavbarTopCompany

NavbarTopCompany.propTypes = {
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

NavbarTopCompany.defaultProps = {
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
