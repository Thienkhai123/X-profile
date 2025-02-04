import React from 'react'
import PropTypes from 'prop-types'

const Dot = (props) => {
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
        d="M4 2C4 3.10457 3.10457 4 2 4C0.89543 4 0 3.10457 0 2C0 0.89543 0.89543 0 2 0C3.10457 0 4 0.89543 4 2Z"
        fill={fill}
      />
      <path
        d="M11 2C11 3.10457 10.1046 4 9 4C7.89543 4 7 3.10457 7 2C7 0.89543 7.89543 0 9 0C10.1046 0 11 0.89543 11 2Z"
        fill={fill}
      />
      <path
        d="M18 2C18 3.10457 17.1046 4 16 4C14.8954 4 14 3.10457 14 2C14 0.89543 14.8954 0 16 0C17.1046 0 18 0.89543 18 2Z"
        fill={fill}
      />
    </svg>
  )
}

Dot.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
Dot.defaultProps = {
  viewBox: '0 0 18 4',
  width: '18',
  height: '4',
  fill: 'black',
  stroke: '',
  style: {}
}

export default Dot
