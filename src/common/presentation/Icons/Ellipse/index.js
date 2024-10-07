import React from 'react'
import PropTypes from 'prop-types'

const Ellipse = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
    >
      <circle cx="33" cy="33.1148" r="32.459" fill="#F5C1B3" />
    </svg>
  )
}

Ellipse.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Ellipse.defaultProps = {
  viewBox: '0 0 66 66',
  width: '66',
  height: '66',
  style: {}
}

export default Ellipse
