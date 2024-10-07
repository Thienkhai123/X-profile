import PropTypes from 'prop-types'

const CrossIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke, scale } = props
  return (
    <svg
      viewBox={viewBox}
      // style={style}
      width={width}
      height={height}
      fill="none"
      style={{
        transform: `scale(${scale})`
      }}
    >
      <path
        d="M1 1L13 13"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 13L13 0.999999"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CrossIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

CrossIcon.defaultProps = {
  viewBox: '0 0 14 14',
  width: '14',
  height: '14',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default CrossIcon
