import React, { Fragment } from 'react'
import NavbarInfo from '../navbarInfo'
import NavbarForm from '../navbarForm'
import NavbarLanguage from '../navbarLanguage'
import NavbarNotification from '../navbarNotification'
import PropTypes, { element } from 'prop-types'
import NotificationPanel from 'common/presentation/Pages/account-setting/NotificationPanel'
import NavbarList from '../navbarList'
import Button from 'common/presentation/Button'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { selectTemplateForDnd } from 'store/app/portfolioSlice'
import { selectAllNotifications } from 'store/app/notification'
import Image from 'next/image'

const Header = (props) => {
  const {
    info,
    handleSubmit,
    handleClickNotification = () => {},
    handleClickAccount = () => {},
    isDisableNotify = false,
    isDisableAccount = false,
    roleId
  } = props
  const { avatarUrl, setting } = info
  const { characterId } = setting || {}
  const router = useRouter()
  const templateForDnd = useSelector(selectTemplateForDnd)
  const notificationsData = useSelector(selectAllNotifications)
  const notiNotSeen = notificationsData?.filter((noti) => !noti?.isRead)

  return (
    <Fragment>
      <div className="hidden xl:flex xl:justify-between justify-end flex-wrap items-center ">
        <div className={`flex items-center`}>
          {/* {router.pathname.includes('/my-journey') ? ( */}
          <div className="mr-6 transition-all">
            <div className="w-[329px] relative flex items-center h-[48px] gap-1 p-1 rounded-full border border-grey-4">
              <div className="absolute -top-4 -right-6">
                <Image
                  src={'/images/comingSoon.svg'}
                  width={87}
                  height={26}
                  quality={100}
                  alt=""
                />
              </div>
              <div
                onClick={() => {
                  window.location.href = '/applicant-profile'
                }}
                className={`px-4 py-[5px] rounded-full transition-all ${
                  router.pathname.includes('/applicant-profile')
                    ? parseInt(roleId) === 0
                      ? 'bg-[#F7E0DB]'
                      : 'bg-[#FBECCA]'
                    : 'bg-white hover:bg-light-blue'
                } h-full flex items-center justify-center cursor-pointer`}
              >
                <p className="text-p16 leading-7 text-black whitespace-nowrap">
                  {/* {templateForDnd?.filter((el) => el?.isActive)?.length > 0
                    ? 'Hồ sơ năng lực'
                    : 'Tạo hồ sơ năng lực'} */}
                  Hồ sơ năng lực
                </p>
              </div>
              <div
                onClick={() => {
                  window.location.href = '/my-journey'
                }}
                className={`px-4 py-[5px] rounded-full transition-all ${
                  router.pathname.includes('/my-journey')
                    ? parseInt(roleId) === 0
                      ? 'bg-[#F7E0DB]'
                      : 'bg-[#FBECCA]'
                    : 'bg-white hover:bg-light-blue'
                } h-full flex items-center justify-center cursor-pointer`}
              >
                <p className="text-p16 leading-7 text-black whitespace-nowrap">
                  Hành trình của tôi
                </p>
              </div>
            </div>
          </div>

          {/* <div className="mr-6  transition-all">
               {parseInt(roleId) !== 2 && templateForDnd && (
              <div className=" w-full ">
                  <Button
                     title={`${
                       templateForDnd?.filter((el) => el?.isActive)?.length > 0
                         : 'Tạo hồ sơ năng lực'
                     }`}
                     width=" w-full"
                     rounded="rounded-[12px]"
                     height="h-auto"
                     padding=" py-[8px] px-[16px]"
                     margin="mt-0"
                     onClick={() => {
                       router.push('/applicant-profile')
                     }}
                   />
                 </div>
               )}
             </div> */}
          {/* )} */}
          <div className="mr-3">
            <NavbarForm
              placehoder="Business Analyst"
              handleSubmit={handleSubmit}
            />
          </div>
          <div
            className="mr-6 cursor-pointer"
            onClick={() => {
              if (!isDisableNotify) {
                handleClickNotification()
              }
            }}
          >
            <NavbarNotification quantity={notiNotSeen?.length || 0} />
          </div>
          <div
            onClick={() => {
              if (!isDisableAccount) {
                handleClickAccount()
              }
            }}
          >
            <NavbarInfo image={avatarUrl} characterId={characterId} />
          </div>
        </div>
      </div>
    </Fragment>
  )
}
Header.propTypes = {
  handleSubmit: PropTypes.func,
  info: PropTypes.shape({
    image: PropTypes.string
  })
}
Header.defaultProps = {
  handleSubmit: () => {},
  info: {
    image: '/images/avatar.png'
  }
}

export default Header
