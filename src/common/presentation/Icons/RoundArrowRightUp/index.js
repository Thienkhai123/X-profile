import PropTypes from 'prop-types'

const RoundArrowRightUpIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Round Arrow Right Up">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.0005 22C17.5233 22 22.0005 17.5228 22.0005 12C22.0005 6.47715 17.5233 2 12.0005 2C6.47764 2 2.00049 6.47715 2.00049 12C2.00049 17.5228 6.47764 22 12.0005 22ZM9.75049 9C9.75049 8.58579 10.0863 8.25 10.5005 8.25L15.0005 8.25C15.4147 8.25 15.7505 8.58579 15.7505 9L15.7505 13.5C15.7505 13.9142 15.4147 14.25 15.0005 14.25C14.5863 14.25 14.2505 13.9142 14.2505 13.5V10.8107L9.53082 15.5303C9.23793 15.8232 8.76305 15.8232 8.47016 15.5303C8.17726 15.2374 8.17726 14.7626 8.47016 14.4697L13.1898 9.75L10.5005 9.75C10.0863 9.75 9.75049 9.41421 9.75049 9Z"
          fill="#76E6A0"
        />
      </g>
    </svg>
  )
}

RoundArrowRightUpIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

RoundArrowRightUpIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#999999'
}

export default RoundArrowRightUpIcon
