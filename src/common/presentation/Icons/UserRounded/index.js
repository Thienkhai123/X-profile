import PropTypes from 'prop-types'

const UserRoundedIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill={fill}
    >
      <g id="User Rounded">
        <circle id="Vector" cx="12" cy="6" r="4" fill={fill} />
        <ellipse id="Vector_2" cx="12" cy="17" rx="7" ry="4" fill={fill} />
      </g>
    </svg>
  )
}

UserRoundedIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

UserRoundedIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '#000000',
  style: {},
  stroke: '#DB2E24'
}

export default UserRoundedIcon
