import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import { ROLE_STORAGE } from 'common/config/app.constants'
import RoleButton from '../navbarRole'

const NavbarButton = (props) => {
  const { type, auth, handleShowRole = () => {}, isDisableRole, roleId } = props
  const { login, register } = auth
  const [role, setRole] = useState(0)
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
        <div className="xl:mr-4 w-full xl:w-auto">
          <Button
            title={login.title}
            width="xl:w-[163px] w-full"
            background="bg-grey-4"
            rounded="rounded-lg"
            height="h-auto xl:h-12"
            padding=" py-4 px-8"
            onClick={() => {
              if (parseInt(role) !== 2) {
                window.location.href = login.href
              } else {
                window.open(process.env.NEXT_PUBLIC_LMS + 'User/Login')
              }
            }}
          />
        </div>
        <div className="xl:mr-4 xl:mt-0 mt-5 w-full xl:w-auto">
          <Button
            title={register.title}
            width="xl:w-[163px] w-full"
            background="bg-button"
            rounded="rounded-lg"
            height="h-auto xl:h-12"
            padding=" py-4 px-8"
            onClick={() => {
              if (parseInt(role) !== 2) {
                window.location.href = register.href
              } else {
                window.open(process.env.NEXT_PUBLIC_LMS + 'User/Register')
              }
            }}
          />
        </div>
        <div
          onClick={() => {
            if (!isDisableRole) {
              handleShowRole()
            }
          }}
          className=" xl:mt-0 mt-5 w-full xl:w-auto hidden xl:block"
        >
          <RoleButton />
        </div>
      </div>
    )
  }
}

export default NavbarButton

NavbarButton.propTypes = {}

NavbarButton.defaultProps = {}
