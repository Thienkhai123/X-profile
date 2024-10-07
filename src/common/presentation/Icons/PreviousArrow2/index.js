import PropTypes from 'prop-types'

const PreviousArrowIcon2 = (props) => {
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
        d="M15.4881 4.43056C15.8026 4.70012 15.839 5.1736 15.5694 5.48809L9.98781 12L15.5694 18.5119C15.839 18.8264 15.8026 19.2999 15.4881 19.5694C15.1736 19.839 14.7001 19.8026 14.4306 19.4881L8.43056 12.4881C8.18981 12.2072 8.18981 11.7928 8.43056 11.5119L14.4306 4.51191C14.7001 4.19741 15.1736 4.16099 15.4881 4.43056Z"
        fill={stroke}
      />
    </svg>
  )
}

PreviousArrowIcon2.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

PreviousArrowIcon2.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '',
  style: {},
  stroke: 'black'
}

export default PreviousArrowIcon2
