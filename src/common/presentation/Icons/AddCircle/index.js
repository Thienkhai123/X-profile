import PropTypes from 'prop-types'

const AddCircleIcon = (props) => {
  const {
    viewBox,
    style,
    width,
    height,
    fill,
    scale = 1,
    margin = 0,
    stroke
  } = props
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
      <circle cx="12" cy="12" r="10" stroke={stroke} strokeWidth="1.5" />
      <path
        d="M15 12L12 12M12 12L9 12M12 12L12 9M12 12L12 15"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}

AddCircleIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.any,
  fill: PropTypes.string
}

AddCircleIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666',
  stroke: '#294F9B'
}

export default AddCircleIcon
