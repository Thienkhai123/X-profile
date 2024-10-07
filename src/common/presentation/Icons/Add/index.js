import PropTypes from 'prop-types'

const AddIcon = (props) => {
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
        d="M1.34277 7L12.6565 7"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7 12.6567L7 1.34303"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

AddIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

AddIcon.defaultProps = {
  viewBox: '0 0 14 14',
  width: '14',
  height: '14',
  stroke: '#666666',
  style: {}
}

export default AddIcon
