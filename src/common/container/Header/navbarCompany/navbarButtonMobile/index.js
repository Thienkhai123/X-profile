import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import { ROLE_STORAGE } from 'common/config/app.constants'
import { useSelector } from 'react-redux'
import { selectRoleIdUser } from 'store/app/userSlice'
import { selectTemplateForDnd } from 'store/app/portfolioSlice'

const NavbarButtonMobile = (props) => {
  const { type, auth } = props
  const { login, register } = auth
  const [role, setRole] = useState(0)
  const roleId = useSelector(selectRoleIdUser)
  const templateForDnd = useSelector(selectTemplateForDnd)

  useEffect(() => {
    const roleStorage = localStorage.getItem(ROLE_STORAGE)
    if (roleStorage) {
      setRole(roleStorage)
    }
  }, [])
  if (type === 'left') {
    return <div className="flex flex-wrap justify-center mt-3"></div>
  } else {
    return (
      <div className="flex flex-col xl:flex-row flex-wrap xl:justify-center justify-between items-center">
        <div className="xl:mr-2 w-full xl:w-auto">
          {parseInt(roleId) !== 2 && templateForDnd && (
            <div className=" w-full ">
              <Button
                title={`${
                  templateForDnd?.filter((el) => el?.isActive)?.length > 0
                    ? 'Hồ sơ năng lực'
                    : 'Tạo hồ sơ năng lực'
                }`}
                width="xl:w-[120px] w-full"
                rounded="rounded-[8px]"
                height="h-auto"
                padding="xl:py-[10px] py-[12px]"
                margin="mt-0"
                onClick={() => {
                  window.location.replace('/applicant-profile')
                  // window.open('https://employer.xprofile.vn/User/Login')
                }}
              />
            </div>
          )}
        </div>
        <div className="xl:ml-2 xl:mt-0 mt-5 w-full xl:w-auto">
          <Button
            title="Đăng xuất"
            width="xl:w-[120px] w-full"
            background="bg-gray-light"
            rounded="rounded-[8px]"
            height="h-auto"
            padding="xl:py-[10px] py-[12px]"
            onClick={() => {
              window.open('/logout', '_self')
            }}
          />
        </div>
      </div>
    )
  }
}

export default NavbarButtonMobile

NavbarButtonMobile.propTypes = {
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

NavbarButtonMobile.defaultProps = {
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
  }
}
