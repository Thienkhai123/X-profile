import PropTypes from 'prop-types'

const CloseCircleIcon = (props) => {
  const { viewBox, style, width, height, fill, scale = 1, margin = 0 } = props
  return (
    <svg
      viewBox={viewBox}
      style={{
        margin: margin
      }}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Close Circle">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.082 12C22.082 17.5228 17.6049 22 12.082 22C6.55918 22 2.08203 17.5228 2.08203 12C2.08203 6.47715 6.55918 2 12.082 2C17.6049 2 22.082 6.47715 22.082 12ZM9.05166 8.96965C9.34455 8.67676 9.81943 8.67676 10.1123 8.96965L12.082 10.9393L14.0517 8.96967C14.3446 8.67678 14.8194 8.67678 15.1123 8.96967C15.4052 9.26256 15.4052 9.73744 15.1123 10.0303L13.1427 12L15.1123 13.9696C15.4052 14.2625 15.4052 14.7374 15.1123 15.0303C14.8194 15.3232 14.3445 15.3232 14.0516 15.0303L12.082 13.0607L10.1123 15.0303C9.81945 15.3232 9.34457 15.3232 9.05168 15.0303C8.75879 14.7374 8.75879 14.2625 9.05168 13.9697L11.0213 12L9.05166 10.0303C8.75877 9.73742 8.75877 9.26254 9.05166 8.96965Z"
          fill="#999999"
        />
      </g>
    </svg>
  )
}

CloseCircleIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.any,
  fill: PropTypes.string
}

CloseCircleIcon.defaultProps = {
  viewBox: '0 0 25 24',
  width: '25',
  height: '24',
  style: {},
  fill: '#666666'
}

export default CloseCircleIcon
