import React from 'react'
import PropTypes from 'prop-types'

const PopupHoverSkill = (props) => {
  const { width, height, viewBox, style } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g filter="url(#filter0_d_4618_140271)">
        <mask id="path-1-inside-1_4618_140271" fill="white">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M211.232 47C211.735 44.747 212 42.4045 212 40C212 22.3269 197.673 8 180 8C162.327 8 148 22.3269 148 40C148 42.4045 148.265 44.747 148.768 47H40C31.1634 47 24 54.1634 24 63V116C24 124.837 31.1635 132 40 132H172L180 144L188 132H319C327.837 132 335 124.837 335 116V63C335 54.1634 327.837 47 319 47H211.232Z"
          />
        </mask>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M211.232 47C211.735 44.747 212 42.4045 212 40C212 22.3269 197.673 8 180 8C162.327 8 148 22.3269 148 40C148 42.4045 148.265 44.747 148.768 47H40C31.1634 47 24 54.1634 24 63V116C24 124.837 31.1635 132 40 132H172L180 144L188 132H319C327.837 132 335 124.837 335 116V63C335 54.1634 327.837 47 319 47H211.232Z"
          fill="white"
        />
        <path
          d="M211.232 47L210.256 46.7822L209.984 48H211.232V47ZM148.768 47V48H150.016L149.744 46.7822L148.768 47ZM172 132L172.832 131.445L172.535 131H172V132ZM180 144L179.168 144.555L180 145.803L180.832 144.555L180 144ZM188 132V131H187.465L187.168 131.445L188 132ZM211 40C211 42.3307 210.743 44.6003 210.256 46.7822L212.208 47.2178C212.727 44.8938 213 42.4782 213 40H211ZM180 9C197.121 9 211 22.8792 211 40H213C213 21.7746 198.225 7 180 7V9ZM149 40C149 22.8792 162.879 9 180 9V7C161.775 7 147 21.7746 147 40H149ZM149.744 46.7822C149.257 44.6003 149 42.3307 149 40H147C147 42.4782 147.273 44.8938 147.792 47.2178L149.744 46.7822ZM148.768 46H40V48H148.768V46ZM40 46C30.6112 46 23 53.6112 23 63H25C25 54.7157 31.7157 48 40 48V46ZM23 63V116H25V63H23ZM23 116C23 125.389 30.6112 133 40 133V131C31.7157 131 25 124.284 25 116H23ZM40 133H172V131H40V133ZM171.168 132.555L179.168 144.555L180.832 143.445L172.832 131.445L171.168 132.555ZM180.832 144.555L188.832 132.555L187.168 131.445L179.168 143.445L180.832 144.555ZM188 133H319V131H188V133ZM319 133C328.389 133 336 125.389 336 116H334C334 124.284 327.284 131 319 131V133ZM336 116V63H334V116H336ZM336 63C336 53.6112 328.389 46 319 46V48C327.284 48 334 54.7157 334 63H336ZM319 46H211.232V48H319V46Z"
          fill="#E6E6E6"
          mask="url(#path-1-inside-1_4618_140271)"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_4618_140271"
          x="0"
          y="0"
          width="359"
          height="184"
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
          <feOffset dy="16" />
          <feGaussianBlur stdDeviation="12" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_4618_140271"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_4618_140271"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

PopupHoverSkill.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
PopupHoverSkill.defaultProps = {
  viewBox: '0 0 359 184',
  width: '359',
  height: '184',
  fill: '',
  style: {}
}

export default PopupHoverSkill
