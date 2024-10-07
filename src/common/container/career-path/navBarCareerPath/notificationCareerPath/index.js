import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const NotificationCareerPath = (props) => {
  const { quantity } = props

  return (
    <div className="relative w-6 h-6 cursor-pointer transition-all  flex flex-col items-center justify-center">
      <XProfileIcon name="bell" fill="#ffffff" />
      {quantity > 0 && (
        <span className="absolute z-10 text-xs text-white text-center bg-red-500 -right-1 w-[16px] h-[16px]  rounded-full -top-1 animate-shake ">
          {quantity}
        </span>
      )}
    </div>
  )
}

NotificationCareerPath.propTypes = {
  quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}

NotificationCareerPath.defaultProps = {
  quantity: 2
}

export default NotificationCareerPath
