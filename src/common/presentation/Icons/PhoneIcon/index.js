import React from 'react'
import PropTypes from 'prop-types'

const PhoneIcon = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <path
        d="M14.166 1.66663H5.83268C4.91221 1.66663 4.16602 2.41282 4.16602 3.33329V16.6666C4.16602 17.5871 4.91221 18.3333 5.83268 18.3333H14.166C15.0865 18.3333 15.8327 17.5871 15.8327 16.6666V3.33329C15.8327 2.41282 15.0865 1.66663 14.166 1.66663Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 15H10.0083"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

PhoneIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
PhoneIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {},
  fill: '#666666'
}

export default PhoneIcon
