import React from 'react'
import PropTypes from 'prop-types'

const Vector2 = (props) => {
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
        opacity="0.3"
        d="M0.0375236 255.332L239.641 0.0233621L340.084 334.037L0.0375236 255.332Z"
        fill="#ECB14E"
      />
    </svg>
  )
}

Vector2.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Vector2.defaultProps = {
  viewBox: '0 0 294 335',
  width: '294',
  height: '335',
  style: {}
}

export default Vector2
