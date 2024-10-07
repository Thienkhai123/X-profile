import React from 'react'
import PropTypes from 'prop-types'

const Upload = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#F7BB3A" />
      <path
        d="M19.2 15.2403V17.9403C19.2 18.1653 19.1193 18.3566 18.9577 18.5141C18.7962 18.6716 18.6 18.7503 18.3693 18.7503H5.63082C5.40005 18.7503 5.20389 18.6716 5.04236 18.5141C4.88082 18.3566 4.80005 18.1653 4.80005 17.9403V15.2403C4.80005 15.0153 4.88082 14.8241 5.04236 14.6666C5.20389 14.5091 5.40005 14.4303 5.63082 14.4303H8.70789C9.08029 14.4303 9.39711 14.6786 9.6482 14.9536C9.73249 15.0459 9.82846 15.1302 9.93611 15.2066C10.2217 15.4091 10.5404 15.5103 10.8924 15.5103H13.1077C13.4597 15.5103 13.7784 15.4091 14.064 15.2066C14.1716 15.1302 14.2676 15.0459 14.3519 14.9536C14.603 14.6786 14.9198 14.4303 15.2922 14.4303H18.3693C18.6 14.4303 18.7962 14.5091 18.9577 14.6666C19.1193 14.8241 19.2 15.0153 19.2 15.2403ZM16.2748 8.0928C16.1767 8.3178 16.0065 8.4303 15.7642 8.4303H13.5488V12.2103C13.5488 12.3566 13.494 12.4831 13.3844 12.59C13.2748 12.6969 13.1449 12.7503 12.9949 12.7503H10.7796C10.6296 12.7503 10.4998 12.6969 10.3901 12.59C10.2805 12.4831 10.2257 12.3566 10.2257 12.2103V8.4303H8.01033C7.76802 8.4303 7.59783 8.3178 7.49976 8.0928C7.40168 7.87343 7.44206 7.67937 7.62091 7.51062L11.4978 3.73062C11.6017 3.62374 11.7315 3.5703 11.8873 3.5703C12.043 3.5703 12.1728 3.62374 12.2767 3.73062L16.1536 7.51062C16.3324 7.67937 16.3728 7.87343 16.2748 8.0928Z"
        stroke="#333333"
        strokeLinejoin="round"
      />
    </svg>
  )
}

Upload.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
Upload.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default Upload
