import PropTypes from 'prop-types'

const GrowVectorIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path d="M12 12L0 12L6 0L12 12Z" fill={fill} />
    </svg>
  )
}

GrowVectorIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

GrowVectorIcon.defaultProps = {
  viewBox: '0 0 12 12',
  width: '12',
  height: '12',
  style: {},
  fill: '#378711'
}

export default GrowVectorIcon
