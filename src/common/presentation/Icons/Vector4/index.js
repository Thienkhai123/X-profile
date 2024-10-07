import React from 'react'
import PropTypes from 'prop-types'

const Vector4 = (props) => {
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
        d="M7 13L1 7L7 1"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

Vector4.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Vector4.defaultProps = {
  viewBox: '0 0 8 14',
  width: '8',
  height: '14',
  style: {}
}

export default Vector4
