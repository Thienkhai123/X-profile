import React from 'react'
import PropTypes from 'prop-types'

const Vector3 = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
    >
      <path
        d="M11 5.5L6 0.5L1 5.5"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

Vector3.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Vector3.defaultProps = {
  viewBox: '0 0 12 6',
  width: '12',
  height: '6',
  style: {}
}

export default Vector3
