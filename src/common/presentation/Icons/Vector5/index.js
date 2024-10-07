import React from 'react'
import PropTypes from 'prop-types'

const Vector5 = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg width={width} height={height} viewBox={viewBox} fill="none">
      <path
        d="M2 2L8 8L14 2"
        stroke={fill}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

Vector5.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Vector5.defaultProps = {
  viewBox: '0 0 16 10',
  width: '16',
  height: '10',
  style: {}
}

export default Vector5
