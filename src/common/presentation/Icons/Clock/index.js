import PropTypes from 'prop-types'

const ClockIcon = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_467_2615)">
        <path
          d="M7.99967 14.6673C11.6816 14.6673 14.6663 11.6825 14.6663 8.00065C14.6663 4.31875 11.6816 1.33398 7.99967 1.33398C4.31778 1.33398 1.33301 4.31875 1.33301 8.00065C1.33301 11.6825 4.31778 14.6673 7.99967 14.6673Z"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8 4V8L10.6667 9.33333"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_467_2615">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

ClockIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

ClockIcon.defaultProps = {
  viewBox: '0 0 16 16',
  width: '16',
  height: '16',
  style: {},
  stroke: '#666666'
}

export default ClockIcon
