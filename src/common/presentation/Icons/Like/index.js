import React from 'react'
import PropTypes from 'prop-types'

const Like = (props) => {
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
        d="M3 9.5V20.5M20.5 12.5L17.2621 19.9008C17.1029 20.2648 16.7433 20.5 16.346 20.5H7.5C6.94772 20.5 6.5 20.0523 6.5 19.5V9.91421C6.5 9.649 6.60536 9.39464 6.79289 9.20711L12.3438 3.65619C12.7062 3.29379 13.2938 3.29379 13.6562 3.65619V3.65619C13.8715 3.87151 13.9675 4.17878 13.913 4.47838L13 9.5H19.5C20.0523 9.5 20.5 9.94772 20.5 10.5V12.5Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  )
}

Like.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
Like.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '',
  stroke: '#666666',
  style: {}
}

export default Like
