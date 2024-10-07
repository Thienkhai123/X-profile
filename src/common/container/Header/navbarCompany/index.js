import { useRouter } from 'next/router'
import React, { Fragment, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectRoleIdUser } from 'store/app/userSlice'
import NavbarBetaContent from './navbarBetaContent'
import NavbarTop from './navbarTop'
import NavbarTopCompany from './navbarTopCompany'
import SideBar from './sideBar'

const NavbarCompany = (props) => {
  const { typeNavbar, NAVIGATION, isLogin, info } = props
  const {
    NAVIGATION_CONFIG,
    SETTING_CONFIG,
    NAVIGATION_COMPANY_CONFIG,
    NAVIGATION_CAREER_PATH_CONFIG
  } = NAVIGATION
  const { logo, auth } = SETTING_CONFIG
  const [toggle, setToggle] = useState(false)
  const [searchSuggest, setSearchSuggest] = useState(false)
  const roleId = useSelector(selectRoleIdUser)

  const router = useRouter()

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

  return (
    <Fragment>
      {/* <NavbarBetaContent /> */}
      <div id="main-header-company" className={`w-full h-full `}>
        <nav
          className={`relative z-[200]  border-gray-200  bg-white xl:shadow-shadow2 shadow-[0_4px_8px_rgba(0,0,0,0.02)]  w-full`}
        >
          {parseInt(roleId) !== 2 ? (
            <NavbarTop
              toggle={toggle}
              setToggle={setToggle}
              searchSuggest={searchSuggest}
              setSearchSuggest={setSearchSuggest}
              info={info}
              logoInfor={logo}
              convertNavbar={NAVIGATION_CONFIG}
              auth={auth}
              type={typeNavbar}
              isLogin={isLogin}
              handleSubmit={handleSubmit}
            />
          ) : (
            <NavbarTopCompany
              toggle={toggle}
              setToggle={setToggle}
              info={info}
              logoInfor={logo}
              convertNavbar={NAVIGATION_COMPANY_CONFIG}
              auth={auth}
              type={typeNavbar}
              isLogin={isLogin}
              handleSubmit={handleSubmit}
            />
          )}
        </nav>
        <div
          className={`block xl:hidden bg-white w-full relative z-[1000]
        ${
          toggle
            ? 'duration-300 translate-x-auto '
            : 'duration-300 -translate-x-full'
        }
        `}
        >
          <SideBar
            setHiddenNav={setToggle}
            toggle={toggle}
            convertNavbar={NAVIGATION_CAREER_PATH_CONFIG}
            isLogin={isLogin}
            auth={auth}
            handleSubmit={handleSubmit}
            info={info}
            logoInfor={logo}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default NavbarCompany
