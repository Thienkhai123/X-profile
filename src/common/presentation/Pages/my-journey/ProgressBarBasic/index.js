import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
const ProgressBarBasic = (props) => {
  const {
    percentValue = 10,
    color = 'bg-button',
    height = 4,
    background = 'bg-grey-4'
  } = props

  return (
    <div
      className={`${background} w-full h-1   rounded-full transition-all   flex items-center`}
      style={{ height: height }}
    >
      <div
        className={`${color} transition-all text-p16  text-neutral text-center relative rounded-full `}
        style={{
          width: `${percentValue}%`,
          padding: percentValue > 0 ? height / 2 : 0
        }}
      ></div>
    </div>
  )
}

ProgressBarBasic.propTypes = {}
ProgressBarBasic.defaultProps = {}

export default ProgressBarBasic
