import React from 'react'
import PropTypes from 'prop-types'

const FlagXProfile = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      width={width}
      height={height}
      style={style}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d_1700_27276)">
        <path d="M4 0H44V64L24 52L4 64V0Z" fill="#294F9B" />
        <path d="M4 0H44V64L24 52L4 64V0Z" fill="#294F9B" />
        <path
          d="M25.7144 43.4376L29.8568 42.3633C30.109 42.2979 30.2851 42.0705 30.2851 41.8103V32.011L25.7144 32V36.5616L26.748 36.8297C26.8109 36.846 26.8548 36.9027 26.8548 36.9677V38.4393C26.8548 38.5043 26.8109 38.561 26.748 38.5773L25.7144 38.8454"
          fill="white"
        />
        <path
          d="M18.1431 33.0742C17.891 33.1397 17.7148 33.367 17.7148 33.6273V41.8103C17.7148 42.0705 17.8909 42.2979 18.1431 42.3633L22.2856 43.4376V38.8454L21.252 38.5773C21.1891 38.561 21.1452 38.5043 21.1452 38.4393V36.9677C21.1452 36.9027 21.1891 36.846 21.252 36.8297L22.2856 36.5616V32L18.1431 33.0742Z"
          fill="white"
        />
        <path
          d="M31.4292 38.8787V32.0117L35.5717 33.086C35.8238 33.1514 36 33.3788 36 33.639V37.2514C36 37.5116 35.8239 37.739 35.5717 37.8044L31.4292 38.8787Z"
          fill="white"
        />
        <path
          d="M16.1425 33.0744L12 32V36.7247L13.4301 37.707L12 38.6893V43.4376L16.1425 42.3633C16.3946 42.2979 16.5708 42.0705 16.5708 41.8103V33.6274C16.5708 33.3672 16.3946 33.1398 16.1425 33.0744Z"
          fill="white"
        />
        <path
          d="M16.5707 38.6909V36.7266L15.1406 37.7088L16.5707 38.6909Z"
          fill="#ECB14E"
        />
        <path
          d="M17.7148 38.7028V36.7383L19.1449 37.7205L17.7148 38.7028Z"
          fill="#ECB14E"
        />
        <path
          d="M30.2853 34.5781C29.8114 34.5781 29.4272 34.9618 29.4272 35.4351C29.4272 35.9085 29.8114 36.2921 30.2853 36.2921V34.5781Z"
          fill="#F5C1B3"
        />
        <path
          d="M31.4292 34.5781C31.9031 34.5781 32.2872 34.9618 32.2872 35.4351C32.2872 35.9085 31.9031 36.2921 31.4292 36.2921V34.5781Z"
          fill="#F5C1B3"
        />
        <path
          d="M25.1441 38.2728H22.856L23.1245 37.2397C23.1408 37.1768 23.1977 37.1328 23.2628 37.1328H24.7372C24.8023 37.1328 24.8591 37.1767 24.8755 37.2397L25.1441 38.2728Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_1700_27276"
          x="0"
          y="-2"
          width="48"
          height="72"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.16 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_1700_27276"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_1700_27276"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

FlagXProfile.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
FlagXProfile.defaultProps = {
  width: '48',
  height: '70',
  viewBox: '0 0 48 70',
  fill: '#666666',
  style: {}
}

export default FlagXProfile
