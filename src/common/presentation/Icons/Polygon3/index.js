import React from 'react'
import PropTypes from 'prop-types'

const Polygon3 = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
    >
      <path
        d="M29 16L-1.39876e-06 -6.51525e-07L58 -5.72205e-06L29 16Z"
        fill={fill}
      />
    </svg>
  )
}

Polygon3.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

Polygon3.defaultProps = {
  viewBox: '0 0 58 16',
  width: '58',
  height: '16',
  style: {},
  fill: '#F5C1B3'
}

export default Polygon3
