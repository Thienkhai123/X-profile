import PropTypes from 'prop-types'

const EditIcon = (props) => {
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
        d="M9.41574 2.66841H4.1559C2.41295 2.66841 1 4.08136 1 5.82432V16.3441C1 18.0871 2.41295 19.5 4.1559 19.5H14.6756C16.4185 19.5 17.8315 18.0871 17.8315 16.3441L17.8315 11.0842M6.25984 14.2401L10.0872 13.4689C10.2904 13.4279 10.477 13.3279 10.6235 13.1813L19.1915 4.60858C19.6023 4.19756 19.602 3.53132 19.1909 3.12065L17.3759 1.30769C16.9649 0.897192 16.299 0.897471 15.8884 1.30832L7.31949 9.8819C7.17325 10.0282 7.0734 10.2144 7.03243 10.4172L6.25984 14.2401Z"
        stroke={stroke}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

EditIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  stroke: PropTypes.string
}

EditIcon.defaultProps = {
  viewBox: '0 0 21 21',
  stroke: '#666666',
  width: '21',
  height: '21',
  fill: '',
  style: {}
}

export default EditIcon
