import PropTypes from 'prop-types'

const AccountCourseIcon = (props) => {
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
        d="M14 2.5V4.5H20V17.5C20 18.61 19.11 19.5 18 19.5H2C0.89 19.5 0 18.61 0 17.5V4.5H6V2.5C6 1.39 6.89 0.5 8 0.5H12C13.11 0.5 14 1.39 14 2.5ZM12 2.5H8V4.5H12V2.5ZM18 17.5H2V6.5H18V17.5ZM14.5 11.5L7 16.5V7.5L14.5 11.5Z"
        fill="#666666"
      />
    </svg>
  )
}

AccountCourseIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

AccountCourseIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '#666666',
  stroke: '#DB2E24',
  style: {}
}

export default AccountCourseIcon
