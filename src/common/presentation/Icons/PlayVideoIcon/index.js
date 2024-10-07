import React from 'react'
import PropTypes from 'prop-types'

const PlayVideoIcon = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.00016 14.6654C11.6821 14.6654 14.6668 11.6806 14.6668 7.9987C14.6668 4.3168 11.6821 1.33203 8.00016 1.33203C4.31826 1.33203 1.3335 4.3168 1.3335 7.9987C1.3335 11.6806 4.31826 14.6654 8.00016 14.6654ZM7.12916 10.5626L10.276 8.70468C10.7971 8.39697 10.7971 7.60042 10.276 7.29272L7.12916 5.43482C6.62263 5.13577 6.00016 5.52501 6.00016 6.1408V9.85659C6.00016 10.4724 6.62264 10.8616 7.12916 10.5626Z"
        fill={fill}
      />
    </svg>
  )
}

PlayVideoIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
PlayVideoIcon.defaultProps = {
  viewBox: '0 0 16 16',
  width: '16',
  height: '16',
  style: {},
  fill: '#666666'
}

export default PlayVideoIcon
