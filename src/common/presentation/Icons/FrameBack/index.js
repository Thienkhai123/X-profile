import PropTypes from 'prop-types'

const FrameBack = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      style={style}
      width={width}
      height={height}
      viewBox={viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M113.387 197.974L154.437 156.923V239.025L113.387 197.974Z"
        fill="#271E3A"
      />
      <path
        d="M177.802 197.974L218.853 156.923V239.025L177.802 197.974Z"
        fill="#271E3A"
      />
      <path
        d="M242.217 197.974L283.268 156.923V239.025L242.217 197.974Z"
        fill="#271E3A"
      />
    </svg>
  )
}

FrameBack.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

FrameBack.defaultProps = {
  viewBox: '0 0 396 396',
  width: '396',
  height: '396',
  stroke: '#666666',
  style: {}
}

export default FrameBack
