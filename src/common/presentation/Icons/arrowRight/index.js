import PropTypes from 'prop-types'

const ArrowRightIcon = (props) => {
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
        d="M17.9592 7.29289C18.3498 6.90237 18.9829 6.90237 19.3734 7.29289L27.3734 15.2929C27.764 15.6834 27.764 16.3166 27.3734 16.7071L19.3734 24.7071C18.9829 25.0976 18.3498 25.0976 17.9592 24.7071C17.5687 24.3166 17.5687 23.6834 17.9592 23.2929L24.2521 17H5.33301C4.78072 17 4.33301 16.5523 4.33301 16C4.33301 15.4477 4.78072 15 5.33301 15H24.2521L17.9592 8.70711C17.5687 8.31658 17.5687 7.68342 17.9592 7.29289Z"
        fill={fill}
      />
    </svg>
  )
}

ArrowRightIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

ArrowRightIcon.defaultProps = {
  viewBox: '0 0 32 32',
  width: '32',
  height: '32',
  fill: 'black',
  stroke: 'black',
  style: {}
}

export default ArrowRightIcon
