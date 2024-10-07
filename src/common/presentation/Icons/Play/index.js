import PropTypes from 'prop-types'

const PlayIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 17.1C13.4735 17.1 17.1 13.4736 17.1 9C17.1 4.5265 13.4736 0.899981 9 0.899981C4.5265 0.899981 0.899981 4.5265 0.899981 9C0.899981 13.4735 4.5265 17.1 9 17.1ZM9 18C13.9705 18 18 13.9705 18 9C18 4.0294 13.9705 0 9 0C4.0294 0 0 4.0294 0 9C0 13.9705 4.0294 18 9 18Z"
        fill={fill}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.3396 9.00013L7.20086 6.24102V11.7593L11.3396 9.00013ZM12.1757 8.47597C12.5498 8.72537 12.5498 9.27499 12.1757 9.52439L7.28026 12.7881C6.86161 13.0672 6.30078 12.767 6.30078 12.2638V5.73651C6.30078 5.23334 6.86161 4.93322 7.28026 5.21235L12.1757 8.47597Z"
        fill={fill}
      />
    </svg>
  )
}

PlayIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

PlayIcon.defaultProps = {
  viewBox: '0 0 18 18',
  width: '18',
  height: '18',
  style: {},
  fill: '#333333'
}

export default PlayIcon
