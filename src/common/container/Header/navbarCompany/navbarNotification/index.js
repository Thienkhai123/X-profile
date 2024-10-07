import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import NotificationPanel from 'common/presentation/Pages/account-setting/NotificationPanel'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const NavbarNotification = (props) => {
  const { quantity } = props

  return (
    <div className="relative w-[40px] h-[40px] rounded-full transition-all hover:bg-light-nude flex flex-col items-center justify-center">
      <XProfileIcon name="bell" />
      {quantity > 0 && (
        <span className="absolute z-10 text-xs text-white text-center bg-red-500 right-0 w-[16px] h-[16px]  rounded-full top-0 animate-shake ">
          {quantity}
        </span>
      )}
    </div>
  )
}

NavbarNotification.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

NavbarNotification.defaultProps = {
  quantity: 2
}

export default NavbarNotification
