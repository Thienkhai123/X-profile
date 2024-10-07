import PropTypes from 'prop-types'

const SmileCircleIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Smile Circle">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M15 27C21.6274 27 27 21.6274 27 15C27 8.37258 21.6274 3 15 3C8.37258 3 3 8.37258 3 15C3 21.6274 8.37258 27 15 27ZM10.677 19.2641C10.973 18.8647 11.5366 18.781 11.9359 19.077C12.8099 19.7248 13.8649 20.1 15 20.1C16.1351 20.1 17.1901 19.7248 18.0641 19.077C18.4634 18.781 19.027 18.8647 19.323 19.2641C19.619 19.6634 19.5353 20.227 19.1359 20.523C17.969 21.388 16.542 21.9 15 21.9C13.458 21.9 12.031 21.388 10.8641 20.523C10.4647 20.227 10.381 19.6634 10.677 19.2641ZM19.8 13.2C19.8 14.1941 19.2627 15 18.6 15C17.9373 15 17.4 14.1941 17.4 13.2C17.4 12.2059 17.9373 11.4 18.6 11.4C19.2627 11.4 19.8 12.2059 19.8 13.2ZM11.4 15C12.0627 15 12.6 14.1941 12.6 13.2C12.6 12.2059 12.0627 11.4 11.4 11.4C10.7373 11.4 10.2 12.2059 10.2 13.2C10.2 14.1941 10.7373 15 11.4 15Z"
          fill="white"
        />
      </g>
    </svg>
  )
}

SmileCircleIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

SmileCircleIcon.defaultProps = {
  viewBox: '0 0 30 30',
  width: '30',
  height: '30',
  style: {},
  fill: '#fff'
}

export default SmileCircleIcon
