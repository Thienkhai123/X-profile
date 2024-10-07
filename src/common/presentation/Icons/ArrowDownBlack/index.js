import React from 'react'
import PropTypes from 'prop-types'

const VectorDownBlack = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      width={width}
      style={style}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M29.1453 28.9044L0.874023 0.632812H57.4046L29.1453 28.9044Z"
        fill="#271E3A"
      />
    </svg>
  )
}

VectorDownBlack.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

VectorDownBlack.defaultProps = {
  viewBox: '0 0 58 29',
  width: '58',
  height: '29',
  style: {}
}

export default VectorDownBlack
