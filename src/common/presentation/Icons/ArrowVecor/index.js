import React from 'react'
import PropTypes from 'prop-types'

const ArrowVector = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M-5.24537e-07 12L0 -5.24537e-07L12 6L-5.24537e-07 12Z"
        fill={fill}
      />
    </svg>
  )
}

ArrowVector.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

ArrowVector.defaultProps = {
  viewBox: '0 0 12 12',
  width: '12',
  height: '12',
  style: {},
  fill: '#ECB14E'
}

export default ArrowVector
