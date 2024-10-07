import React from 'react'
import PropTypes from 'prop-types'

const Instagram = (props) => {
  const { style, width, height } = props
  return (
    <svg
      viewBox="0 0 28.87 28.87"
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <defs>
        <linearGradient
          id="a"
          x1="-1.84"
          x2="32.16"
          y1="30.47"
          y2="-3.03"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stopColor="#fed576" />
          <stop offset=".26" stopColor="#f47133" />
          <stop offset=".61" stopColor="#bc3081" />
          <stop offset="1" stopColor="#4c63d2" />
        </linearGradient>
      </defs>
      <g dataname="Layer 2">
        <g dataname="Layer 1">
          <rect
            width="28.87"
            height="28.87"
            fill="url(#a)"
            rx="6.48"
            ry="6.48"
          />
          <g dataname="&lt;Group&gt;">
            <path
              fill="#fff"
              d="M10 5h9c.2.1.5.1.7.2a4.78 4.78 0 0 1 3.8 3.3 8 8 0 0 1 .3 1.5v8.8a6.94 6.94 0 0 1-1.2 3.1 5.51 5.51 0 0 1-4.5 1.9h-7.5a5.49 5.49 0 0 1-3.7-1.2A5.51 5.51 0 0 1 5 18.14v-7a7.57 7.57 0 0 1 .1-1.5 4.9 4.9 0 0 1 3.8-4.3zm-3.1 9.5v3.9a3.42 3.42 0 0 0 3.7 3.7q3.9.15 7.8 0c2.3 0 3.6-1.4 3.7-3.7q.15-3.9 0-7.8a3.52 3.52 0 0 0-3.7-3.7q-3.9-.15-7.8 0a3.42 3.42 0 0 0-3.7 3.7z"
              dataname="&lt;Compound Path&gt;"
            />
            <path
              fill="#fff"
              d="M9.64 14.54a4.91 4.91 0 0 1 4.9-4.9 5 5 0 0 1 4.9 4.9 4.91 4.91 0 0 1-4.9 4.9 5 5 0 0 1-4.9-4.9zm4.9-3.1a3.05 3.05 0 1 0 3 3 3 3 0 0 0-3-3z"
              dataname="&lt;Compound Path&gt;"
            />
            <path
              fill="#fff"
              d="M18.34 9.44a1.16 1.16 0 0 1 1.2-1.2 1.29 1.29 0 0 1 1.2 1.2 1.2 1.2 0 0 1-2.4 0z"
              dataname="&lt;Path&gt;"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

Instagram.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Instagram.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default Instagram
