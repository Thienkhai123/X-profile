import React from 'react'
import PropTypes from 'prop-types'

const AddThumb = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.0003 5.3335C16.7367 5.3335 17.3337 5.93045 17.3337 6.66683V25.3335C17.3337 26.0699 16.7367 26.6668 16.0003 26.6668C15.2639 26.6668 14.667 26.0699 14.667 25.3335V6.66683C14.667 5.93045 15.2639 5.3335 16.0003 5.3335Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.33301 15.9998C5.33301 15.2635 5.92996 14.6665 6.66634 14.6665H25.333C26.0694 14.6665 26.6663 15.2635 26.6663 15.9998C26.6663 16.7362 26.0694 17.3332 25.333 17.3332H6.66634C5.92996 17.3332 5.33301 16.7362 5.33301 15.9998Z"
        fill={fill}
      />
    </svg>
  )
}

AddThumb.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.any,
  height: PropTypes.any,
  style: PropTypes.object
}
AddThumb.defaultProps = {
  viewBox: '0 0 32 32',
  width: '32',
  height: '32',
  style: {}
}

export default AddThumb
