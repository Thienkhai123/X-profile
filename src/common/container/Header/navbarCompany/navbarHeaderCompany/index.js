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
import XProfileIcon from 'common/presentation/Icons'
import { selectIsOwner } from 'store/app/helperSlice'
import { ACCESS_TOKEN } from 'common/config/app.constants'

const HeaderComapny = (props) => {
  const {
    info,
    handleSubmit,
    handleClickMenuEdit = () => {},
    handleClickAccount = () => {},
    isDisableMenuEdit = false,
    isDisableAccount = false,
    roleId
  } = props
  const { avatarUrl, setting } = info
  const { characterId } = setting || {}
  const router = useRouter()
  const isOwner = useSelector(selectIsOwner)

  const redirectToAdmin = () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    window.open(process.env.NEXT_PUBLIC_LMS + 'user?token=' + token)
  }

  return (
    <Fragment>
      <div className="hidden xl:flex xl:justify-between justify-end flex-wrap items-center ">
        <div className={`flex  items-center`}>
          <div className="mr-8 xl:ml-8 transition-all">
            {parseInt(roleId) === 2 && (
              <div className=" w-full ">
                <Button
                  title="Đến trang quản lý tuyển dụng"
                  width=" w-full"
                  rounded="rounded-lg"
                  height="h-11"
                  padding=" py-4 px-8"
                  margin="mt-0"
                  textWeight="text-p18-bold"
                  onClick={() => redirectToAdmin()}
                />
              </div>
            )}
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
HeaderComapny.propTypes = {
  handleSubmit: PropTypes.func,
  info: PropTypes.shape({
    image: PropTypes.string
  })
}
HeaderComapny.defaultProps = {
  handleSubmit: () => {},
  info: {
    image: '/images/avatar.png'
  }
}

export default HeaderComapny
