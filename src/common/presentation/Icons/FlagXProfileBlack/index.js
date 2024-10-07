import React from 'react'
import PropTypes from 'prop-types'

const FlagXProfileBlack = (props) => {
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
      <g filter="url(#filter0_d_506_557)">
        <path
          d="M4 -0.167969H44V63.832L24 51.832L4 63.832V-0.167969Z"
          fill="black"
        />
        <path
          d="M4 -0.167969H44V63.832L24 51.832L4 63.832V-0.167969Z"
          fill="black"
        />
        <path
          d="M25.7146 43.2097L29.8571 42.1411C30.1092 42.076 30.2854 41.8498 30.2854 41.5909V31.843L25.7146 31.832V36.3698L26.7483 36.6365C26.8112 36.6527 26.8551 36.7091 26.8551 36.7737V38.2376C26.8551 38.3023 26.8112 38.3587 26.7483 38.3749L25.7146 38.6416"
          fill="white"
        />
        <path
          d="M18.1434 32.9006C17.8913 32.9657 17.7151 33.1919 17.7151 33.4508V41.5909C17.7151 41.8498 17.8911 42.076 18.1434 42.1411L22.2859 43.2097V38.6416L21.2522 38.3749C21.1893 38.3587 21.1454 38.3023 21.1454 38.2376V36.7737C21.1454 36.7091 21.1893 36.6527 21.2522 36.6365L22.2859 36.3698V31.832L18.1434 32.9006Z"
          fill="white"
        />
        <path
          d="M31.4292 38.6738V31.8428L35.5717 32.9114C35.8238 32.9765 36 33.2027 36 33.4615V37.055C36 37.3139 35.8239 37.5401 35.5717 37.6051L31.4292 38.6738Z"
          fill="white"
        />
        <path
          d="M16.1425 32.9027L12 31.834V36.534L13.4301 37.5111L12 38.4882V43.2117L16.1425 42.143C16.3946 42.078 16.5708 41.8518 16.5708 41.5929V33.4529C16.5708 33.194 16.3946 32.9678 16.1425 32.9027Z"
          fill="white"
        />
        <path
          d="M16.5707 38.4883V36.5342L15.1406 37.5113L16.5707 38.4883Z"
          fill="#ECB14E"
        />
        <path
          d="M17.7151 38.5001V36.5459L19.1452 37.523L17.7151 38.5001Z"
          fill="#ECB14E"
        />
        <path
          d="M30.285 34.3965C29.8111 34.3965 29.427 34.7781 29.427 35.249C29.427 35.7199 29.8111 36.1015 30.285 36.1015V34.3965Z"
          fill="#F5C1B3"
        />
        <path
          d="M31.4292 34.3965C31.9031 34.3965 32.2872 34.7781 32.2872 35.249C32.2872 35.7199 31.9031 36.1015 31.4292 36.1015V34.3965Z"
          fill="#F5C1B3"
        />
        <path
          d="M25.1443 38.0725H22.8562L23.1248 37.0448C23.1411 36.9822 23.198 36.9385 23.2631 36.9385H24.7375C24.8025 36.9385 24.8593 36.9821 24.8757 37.0448L25.1443 38.0725Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_506_557"
          x="0"
          y="-2.16797"
          width="48"
          height="72"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
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
            result="effect1_dropShadow_506_557"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_506_557"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

FlagXProfileBlack.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
FlagXProfileBlack.defaultProps = {
  width: '48',
  height: '70',
  viewBox: '0 0 48 70',
  fill: '#666666',
  style: {}
}

export default FlagXProfileBlack
