import React from 'react'
import PropTypes from 'prop-types'

const YoutubeFooter2 = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_2628_14535)">
        <path
          d="M17 5H7C4.79086 5 3 6.79086 3 9V15C3 17.2091 4.79086 19 7 19H17C19.2091 19 21 17.2091 21 15V9C21 6.79086 19.2091 5 17 5Z"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M10 9L15 12L10 15V9Z"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2628_14535">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

YoutubeFooter2.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
YoutubeFooter2.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default YoutubeFooter2
