import React from 'react'
import PropTypes from 'prop-types'

const ArrowBackTest = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.53033 0.46967C7.82322 0.762563 7.82322 1.23744 7.53033 1.53033L2.81066 6.25H17C17.4142 6.25 17.75 6.58579 17.75 7C17.75 7.41421 17.4142 7.75 17 7.75H2.81066L7.53033 12.4697C7.82322 12.7626 7.82322 13.2374 7.53033 13.5303C7.23744 13.8232 6.76256 13.8232 6.46967 13.5303L0.46967 7.53033C0.176777 7.23744 0.176777 6.76256 0.46967 6.46967L6.46967 0.46967C6.76256 0.176777 7.23744 0.176777 7.53033 0.46967Z"
        fill={fill}
      />
    </svg>
  )
}

ArrowBackTest.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
ArrowBackTest.defaultProps = {
  viewBox: '0 0 18 14',
  width: '18',
  height: '14',
  fill: 'black',
  stroke: '',
  style: {}
}

export default ArrowBackTest
