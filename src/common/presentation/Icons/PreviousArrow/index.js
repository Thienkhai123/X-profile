import PropTypes from 'prop-types'

const PreviousArrowIcon = (props) => {
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
        d="M7.48809 0.430571C7.80259 0.700138 7.83901 1.17361 7.56944 1.48811L1.98781 8.00001L7.56944 14.5119C7.83901 14.8264 7.80259 15.2999 7.48809 15.5695C7.1736 15.839 6.70012 15.8026 6.43056 15.4881L0.430558 8.48811C0.189814 8.20724 0.189814 7.79279 0.430558 7.51192L6.43056 0.51192C6.70012 0.197426 7.1736 0.161005 7.48809 0.430571Z"
        fill={stroke}
      />
    </svg>
  )
}

PreviousArrowIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

PreviousArrowIcon.defaultProps = {
  viewBox: '0 0 8 16',
  width: '8',
  height: '16',
  fill: '',
  style: {},
  stroke: 'black'
}

export default PreviousArrowIcon
