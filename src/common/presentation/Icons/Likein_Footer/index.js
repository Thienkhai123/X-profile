import React from 'react'
import PropTypes from 'prop-types'

const LikeinFooter = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_2628_14539)">
        <path
          d="M18 4H6C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4Z"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 11V16"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 8V8.01"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 16V11"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 16V13C16 12.4696 15.7893 11.9609 15.4142 11.5858C15.0391 11.2107 14.5304 11 14 11C13.4696 11 12.9609 11.2107 12.5858 11.5858C12.2107 11.9609 12 12.4696 12 13"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2628_14539">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

LikeinFooter.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
LikeinFooter.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default LikeinFooter
