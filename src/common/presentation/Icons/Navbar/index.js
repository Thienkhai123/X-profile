import React from 'react'
import PropTypes from 'prop-types'

const Navbar = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      fill="none"
      strokeWidth="1.5"
      stroke="currentColor"
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
      />
    </svg>
  )
}

Navbar.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Navbar.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default Navbar
