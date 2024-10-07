import React from 'react'
import PropTypes from 'prop-types'

const TikTokFooter = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_2628_14551)">
        <path
          d="M9 12C8.20888 12 7.43552 12.2346 6.77772 12.6741C6.11992 13.1136 5.60723 13.7384 5.30448 14.4693C5.00173 15.2002 4.92252 16.0044 5.07686 16.7804C5.2312 17.5563 5.61216 18.269 6.17157 18.8284C6.73098 19.3878 7.44372 19.7688 8.21964 19.9231C8.99556 20.0775 9.79983 19.9983 10.5307 19.6955C11.2616 19.3928 11.8864 18.8801 12.3259 18.2223C12.7654 17.5645 13 16.7911 13 16V4C13 5.32608 13.5268 6.59785 14.4645 7.53553C15.4022 8.47322 16.6739 9 18 9"
          stroke="#E6E6E6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_2628_14551">
          <rect width="24" height="24" fill={fill} />
        </clipPath>
      </defs>
    </svg>
  )
}

TikTokFooter.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
TikTokFooter.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#E6E6E6'
}

export default TikTokFooter
