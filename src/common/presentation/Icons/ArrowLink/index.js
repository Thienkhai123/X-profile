import React from 'react'
import PropTypes from 'prop-types'

const ArrowLink = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M-1.04907e-06 1.04907e-06L12 0L6 12L-1.04907e-06 1.04907e-06Z"
        fill="#317AE8"
      />
    </svg>
  )
}
ArrowLink.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

ArrowLink.defaultProps = {
  viewBox: '0 0 12 12',
  width: '12',
  height: '12',
  style: {}
}

export default ArrowLink
