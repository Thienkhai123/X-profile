import React from 'react'
import PropTypes from 'prop-types'

const CheckVideo = (props) => {
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
        d="M14.6668 7.9987C14.6668 11.6806 11.6821 14.6654 8.00016 14.6654C4.31826 14.6654 1.3335 11.6806 1.3335 7.9987C1.3335 4.3168 4.31826 1.33203 8.00016 1.33203C11.6821 1.33203 14.6668 4.3168 14.6668 7.9987ZM10.687 5.97848C10.8823 6.17374 10.8823 6.49032 10.687 6.68558L7.35372 10.0189C7.15845 10.2142 6.84187 10.2142 6.64661 10.0189L5.31328 8.68559C5.11801 8.49032 5.11801 8.17374 5.31328 7.97848C5.50854 7.78322 5.82512 7.78322 6.02038 7.97848L7.00016 8.95826L8.49005 7.46837L9.97994 5.97848C10.1752 5.78322 10.4918 5.78322 10.687 5.97848Z"
        fill={fill}
      />
    </svg>
  )
}

CheckVideo.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
CheckVideo.defaultProps = {
  viewBox: '0 0 16 16',
  width: '16',
  height: '16',
  style: {},
  fill: 'black'
}

export default CheckVideo
