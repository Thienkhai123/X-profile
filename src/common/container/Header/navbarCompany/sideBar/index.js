import React, { useRef } from 'react'
import NavbarList from '../navbarList'
import NavbarButton from '../navbarButton'
import Header from '../navbarHeader'
import XProfileIcon from 'common/presentation/Icons'
import NavbarForm from '../navbarForm'
import NavbarInfo from '../navbarInfo'
import Link from 'next/link'
import NavbarButtonMobile from '../navbarButtonMobile'
import { Divider } from 'common/presentation'
import Button from 'common/presentation/Button'
import { useSelector } from 'react-redux'
import { selectTemplateForDnd } from 'store/app/portfolioSlice'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useRouter } from 'next/router'

const SideBar = (props) => {
  const {
    convertNavbar,
    isLogin,
    auth,
    handleSubmit,
    info,
    setHiddenNav,
    toggle,
    logoInfor
  } = props
  const { setting } = info || {}
  const ref = useRef(null)
  const router = useRouter()
  const { characterId } = setting || {}
  const templateForDnd = useSelector(selectTemplateForDnd)
  const closeSideBar = () => {
    if (toggle) {
      setHiddenNav(false)
      document.body.style = 'auto'
    }
  }

  useOnClickOutside(ref, closeSideBar)
  return (
    <div
      ref={ref}
      className="absolute bg-white  w-full h-screen flex flex-col items-center gap-8 p-4 pb-40 z-10"
    >
      <div>
        <div>
          <ul className={`flex flex-col gap-6 items-center  mt-14`}>
            {convertNavbar?.map((element, index) => {
              const {
                title,
                navbarList,
                href,
                passHref,
                ownedCompany,
                hrefList
              } = element
              if (index === 6) {
                if (isLogin) {
                  return (
                    <li key={index} className="">
                      <a
                        target={passHref ? '_blank' : '_self'}
                        href={
                          ownedCompany
                            ? `/profile-company/${companyId}/edit`
                            : href
                        }
                        rel="noopener noreferrer"
                      >
                        <div
                          className={`xl:flex xl:justify-center hover:cursor-pointer`}
                        >
                          <p
                            className={`${
                              hrefList.includes(router.pathname) &&
                              ' text-button'
                            } text-p16-bold leading-8 text-black hover:duration-50  hover:text-button`}
                          >
                            {title}
                          </p>
                        </div>
                      </a>
                    </li>
                  )
                }
              } else {
                return (
                  <li key={index} className="">
                    <a
                      target={passHref ? '_blank' : '_self'}
                      href={
                        ownedCompany
                          ? `/profile-company/${companyId}/edit`
                          : href
                      }
                      rel="noopener noreferrer"
                    >
                      <div
                        className={`xl:flex xl:justify-center hover:cursor-pointer`}
                      >
                        <p
                          className={`${
                            hrefList.includes(router.pathname) && ' text-button'
                          } text-p16-bold leading-8 text-black hover:duration-50  hover:text-button`}
                        >
                          {title}
                        </p>
                      </div>
                    </a>
                  </li>
                )
              }
            })}
          </ul>
        </div>
      </div>
      {/* <Divider /> */}
      <div
        className={`flex items-center justify-center xl:justify-center w-full md:w-auto py-20`}
      >
        {isLogin ? (
          // <div className="flex">
          //   <Header info={info} handleSubmit={handleSubmit} />
          // </div>
          // <NavbarButtonMobile auth={auth} />
          <div
            onClick={() => {
              window.open('/logout', '_self')
            }}
            className="flex gap-4 items-center"
          >
            <XProfileIcon name="exitNoFill" />
            <p className="text-p16-bold">Đăng xuất</p>
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

SideBar.propTypes = {}

export default SideBar
