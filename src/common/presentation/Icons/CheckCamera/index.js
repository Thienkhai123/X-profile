import PropTypes from 'prop-types'

const CheckCameraIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <rect
        x="0.75"
        y="0.75"
        width="38.5"
        height="38.5"
        rx="7.25"
        fill="#378711"
        stroke="#378711"
        strokeWidth="1.5"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M30.8234 11.5584C31.3434 12.0124 31.397 12.802 30.943 13.3221L17.8477 28.3221C17.6103 28.594 17.267 28.75 16.9061 28.75C16.5451 28.75 16.2018 28.594 15.9644 28.3221L10.7263 22.3221C10.2723 21.802 10.3259 21.0124 10.8459 20.5584C11.366 20.1044 12.1556 20.1579 12.6096 20.6779L16.9061 25.5993L29.0597 11.6779C29.5137 11.1579 30.3033 11.1044 30.8234 11.5584Z"
        fill="white"
      />
    </svg>
  )
}

CheckCameraIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

CheckCameraIcon.defaultProps = {
  viewBox: '0 0 40 40',
  width: '40',
  height: '40',
  style: {},
  fill: 'black'
}

export default CheckCameraIcon
