import React from 'react'
import PropTypes from 'prop-types'
import MealfitIcon from '../Icons'
import Image from 'next/image'
import { useState } from 'react'
import XProfileIcon from '../Icons'
const SideBarWrapper = (props) => {
  const { nameIcon = 'cancel', showIcon, title = '', children } = props
  const [showSidebar, setShowSidebar] = useState(false)

  return (
    <div>
      <button
        className="flex items-start justify-center gap-1"
        onClick={() => {
          setShowSidebar(!showSidebar)
        }}
      >
        {showIcon && (
          <XProfileIcon name={nameIcon} color="#666" width="30" height="30" />
        )}
        <p className="texr-p14 text-grey-1 mt-1">{title}</p>
      </button>
      <div
        className={`top-0 z-50 left-0  bg-white transition-all overflow-y-auto  fixed h-full ease-in-out duration-300 ${
          showSidebar
            ? 'right-[calc(0%)]  z-[99999] opacity-100'
            : '-right-[calc(100%)] -z-[99999] opacity-0'
        }`}
      >
        {showSidebar && (
          <div className="overflow-y-scroll">
            <div
              onClick={() => {
                setShowSidebar(false)
              }}
              className="flex justify-end my-[18px] mr-[18px]"
            >
              <XProfileIcon name="cancel" width={15} height={15} color="#666" />
            </div>
            {children}
          </div>
        )}
      </div>
    </div>
  )
}

SideBarWrapper.propTypes = {
  nameIcon: PropTypes.string,
  showIcon: PropTypes.bool,
  title: PropTypes.string
}
SideBarWrapper.defaultProps = {
  nameIcon: 'plus',
  showIcon: false
}

export default SideBarWrapper
