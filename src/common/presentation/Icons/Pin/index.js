import React from 'react'
import PropTypes from 'prop-types'

const PinIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Pin">
        <path
          id="Union"
          d="M18.465 8.2246L15.7968 5.55378C13.9728 3.728 13.0608 2.81511 12.0813 3.03122C11.1018 3.24732 10.6577 4.45939 9.76947 6.88352L9.1683 8.52424C8.93151 9.1705 8.81312 9.49363 8.6001 9.74357C8.50452 9.85572 8.39577 9.95592 8.27621 10.042C8.00975 10.2338 7.67826 10.3252 7.01527 10.508C5.52094 10.92 4.77378 11.1259 4.49222 11.6148C4.37051 11.8261 4.30717 12.0661 4.30871 12.31C4.31227 12.8743 4.86027 13.4228 5.95626 14.5199L7.22938 15.7945L3.2011 19.8266C2.93297 20.095 2.93297 20.5302 3.2011 20.7986C3.46924 21.067 3.90398 21.067 4.17211 20.7986L8.20052 16.7663L9.51992 18.087C10.6229 19.1911 11.1744 19.7431 11.742 19.7439C11.9812 19.7443 12.2163 19.6821 12.4241 19.5635C12.9172 19.2821 13.1243 18.5295 13.5385 17.0242C13.7206 16.3623 13.8117 16.0314 14.0028 15.7651C14.0864 15.6485 14.1835 15.5421 14.292 15.4482C14.5398 15.2336 14.8608 15.113 15.5029 14.8718L17.1625 14.2482C19.5599 13.3475 20.7586 12.8971 20.9698 11.9202C21.1811 10.9433 20.2757 10.0371 18.465 8.2246Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

PinIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
PinIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '#294F9B',
  stroke: '',
  style: {}
}

export default PinIcon
