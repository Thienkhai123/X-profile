import PropTypes from 'prop-types'

const LogOutIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
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
        d="M5 3H19C20.1 3 21 3.9 21 5V19C21 20.1 20.1 21 19 21H5C3.89 21 3 20.1 3 19V15H5V19H19V5H5V9H3V5C3 3.9 3.89 3 5 3ZM11.5 17L10.09 15.59L12.67 13H3V11H12.67L10.09 8.41L11.5 7L16.5 12L11.5 17Z"
        fill="#666666"
      />
    </svg>
  )
}

LogOutIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

LogOutIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default LogOutIcon
