import React from 'react'
import PropTypes from 'prop-types'

const Polygon = (props) => {
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
        d="M13.2028 0.541737L74.074 49.8689L0.91986 77.9213L13.2028 0.541737Z"
        fill="#ECB14E"
      />
    </svg>
  )
}

Polygon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Polygon.defaultProps = {
  viewBox: '0 0 75 78',
  width: '75',
  height: '78',
  style: {}
}

export default Polygon
