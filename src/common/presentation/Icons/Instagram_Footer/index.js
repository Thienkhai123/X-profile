import React from 'react'
import PropTypes from 'prop-types'

const InstagramFooter = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_2628_14546)">
        <path
          d="M16 4H8C5.79086 4 4 5.79086 4 8V16C4 18.2091 5.79086 20 8 20H16C18.2091 20 20 18.2091 20 16V8C20 5.79086 18.2091 4 16 4Z"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.5 7.5V7.501"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2628_14546">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

InstagramFooter.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
InstagramFooter.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default InstagramFooter
