import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ACCESS_TOKEN, ROLE_STORAGE } from 'common/config/app.constants'
import BearLoading from './BearLoading'
import MouseLoading from './MouseLoading'
import SheepLoading from './SheepLoading'
import { useSelector } from 'react-redux'
import { selectRoleIdUser } from 'store/app/userSlice'
import UserRoleLoading from './UserRoleLoading'

const LoadingRoleBlock = () => {
  const roleFromLocalStorage = localStorage.getItem(ROLE_STORAGE)
  return (
    <div
      className="absolute top-0 left-0 right-0 bottom-0 w-full h-auto z-[9999] overflow-hidden  flex flex-col items-center justify-center"
      style={{
        background: 'rgba(255, 255, 255, 0.4)'
      }}
    >
      <div className="bg-opacity-0 scale-50">
        <UserRoleLoading role={roleFromLocalStorage} />
      </div>
      {/* <h2 className="text-center text-slate-500 text-xl font-semibold">
        Loading...
      </h2> */}
    </div>
  )
}

LoadingRoleBlock.propTypes = {}

export default LoadingRoleBlock
