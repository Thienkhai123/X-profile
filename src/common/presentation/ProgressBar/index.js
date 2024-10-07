import React from 'react'
import PropTypes from 'prop-types'
import { getPercentage } from 'store/helper/functionHelper'

const PropressBar = (props) => {
  const {
    backgroundOut = 'bg-blue-light',
    background,
    percentValue,
    type,
    height,
    skillMatchingPercentage
  } = props

  return (
    <div className="w-full flex">
      <div
        className={`${
          type === '' ? `${height}` : `${height} rounded-2xl `
        }  ${backgroundOut} bg-no-repeat overflow-hidden`}
        style={{ width: `${percentValue}%` }}
      >
        <div
          className={`${
            type === '' ? `${height}` : `${height} rounded-2xl`
          } ${background} `}
          style={{
            width: `${getPercentage(skillMatchingPercentage, percentValue)}%`
          }}
        ></div>
      </div>
    </div>
  )
}

PropressBar.propTypes = {
  type: PropTypes.any,
  background: PropTypes.string,
  percentValue: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string
}
PropressBar.defaultProps = {
  type: '',
  background: 'bg-blue-main',
  percentValue: 0,
  height: 'h-[12px]'
}

export default PropressBar
