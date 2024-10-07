import React from 'react'
import PropTypes from 'prop-types'

const CardInfor = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <rect
        x="0.833008"
        y="3.3335"
        width="18.3333"
        height="13.3333"
        rx="2"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.25893 13.3331V12.5923C9.25893 12.1994 9.10285 11.8226 8.82502 11.5448C8.54719 11.2669 8.17037 11.1108 7.77745 11.1108H4.81449C4.42158 11.1108 4.04476 11.2669 3.76692 11.5448C3.48909 11.8226 3.33301 12.1994 3.33301 12.5923V13.3331"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.29593 9.62947C7.11413 9.62947 7.77742 8.96619 7.77742 8.14799C7.77742 7.32979 7.11413 6.6665 6.29593 6.6665C5.47773 6.6665 4.81445 7.32979 4.81445 8.14799C4.81445 8.96619 5.47773 9.62947 6.29593 9.62947Z"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.083 10H16.2497"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.083 7.5H16.2497"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.083 12.5H16.2497"
        stroke="#294F9B"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CardInfor.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
CardInfor.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {}
}

export default CardInfor
