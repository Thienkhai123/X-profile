import React from 'react'
import PropTypes from 'prop-types'
import SheepLoading from './SheepLoading'
import MouseLoading from './MouseLoading'
import BearLoading from './BearLoading'

const UserRoleLoading = ({ role }) => {
  switch (parseInt(role)) {
    case 0: // 0 là role cừu
      return <SheepLoading />
    case 1: // 1 là role chuột
      return <MouseLoading />
    case 2: // 2 là role gấu
      return <BearLoading />
    default:
      return <SheepLoading />
  }
}

UserRoleLoading.propTypes = {}

export default UserRoleLoading
