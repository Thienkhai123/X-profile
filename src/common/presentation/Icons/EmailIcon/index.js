import React from 'react'
import PropTypes from 'prop-types'

const EmailIcon = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <path
        d="M16.666 3.33337H3.33268C2.41602 3.33337 1.66602 4.08337 1.66602 5.00004V15C1.66602 15.9167 2.41602 16.6667 3.33268 16.6667H16.666C17.5827 16.6667 18.3327 15.9167 18.3327 15V5.00004C18.3327 4.08337 17.5827 3.33337 16.666 3.33337Z"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.3327 5L9.99935 10.8333L1.66602 5"
        stroke={fill}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

EmailIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
EmailIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {},
  fill: '#666666'
}

export default EmailIcon
