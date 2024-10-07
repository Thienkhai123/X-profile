import React from 'react'
import PropTypes from 'prop-types'

const Vector = (props) => {
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
        d="M12.0746 5.36817C12.749 2.53244 15.6597 0.458989 19.0318 0.458989L49.9842 0.458986C53.3563 0.458986 56.2669 2.50194 56.9413 5.36817L68.2999 54.1551C69.1873 57.9361 65.8153 61.4426 61.3428 61.4426L7.67312 61.4426C3.20065 61.4426 -0.17142 57.9361 0.715978 54.1551L12.0746 5.36817Z"
        fill="#1E377E"
      />
    </svg>
  )
}

Vector.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Vector.defaultProps = {
  viewBox: '0 0 69 62',
  width: '69',
  height: '62',
  style: {}
}

export default Vector
