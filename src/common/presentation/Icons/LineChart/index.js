import PropTypes from 'prop-types'

const LineChartcon = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M2 102.934L19.2432 86.1119L26.6028 67.1867L37.5373 93.8923L44.8971 81.2755L52.6775 2L72.654 79.5934L87.1634 53.7289L114.92 102.934L123.542 90.5279L128.799 69.9205L144.99 53.7289"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

LineChartcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  stroke: PropTypes.string
}

LineChartcon.defaultProps = {
  viewBox: '0 0 147 105',
  width: '147',
  height: '105',
  style: {},
  stroke: '#F7BB3A'
}

export default LineChartcon
