import PropTypes from 'prop-types'

const indentIncreaseIcon = (props) => {
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
        d="M21.6 4.80078H2.5M21.6 9.60078H13.2M21.6 19.2008H2.5M10.5 8.00073L5.5 16.0007L2.5 12.0007M21.6 14.4008H10.5"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

indentIncreaseIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

indentIncreaseIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default indentIncreaseIcon
