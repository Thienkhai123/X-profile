import React from 'react'
import PropTypes from 'prop-types'

const Ellipse2 = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
    >
      <circle opacity="0.5" cx="84.5" cy="214.5" r="214.5" fill="#F9D2CA" />
    </svg>
  )
}

Ellipse2.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Ellipse2.defaultProps = {
  viewBox: '0 0 299 243',
  width: '299',
  height: '243',
  style: {}
}

export default Ellipse2
