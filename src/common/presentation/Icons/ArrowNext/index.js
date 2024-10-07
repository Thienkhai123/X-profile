import React from 'react'
import PropTypes from 'prop-types'

const ArrowNext = (props) => {
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
        d="M1 9L5 5L1 1"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
ArrowNext.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

ArrowNext.defaultProps = {
  viewBox: '0 0 12 12',
  width: '12',
  height: '12',
  style: {}
}

export default ArrowNext
