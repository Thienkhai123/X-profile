import PropTypes from 'prop-types'

const SendFeedbackIcon = (props) => {
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
        d="M15.2785 12C15.676 11.9971 15.9972 11.7023 16 11.338V0.666667C16 0.298477 15.6744 0 15.2727 0H2.18182C1.78016 0 1.45455 0.298477 1.45455 0.666667V1.66667L8.72727 7.66667L14.5455 2.86667V10.6667H1.45455V11.338C1.45455 11.7034 1.77743 11.9996 2.176 12H15.2785ZM8.72727 5.87333L3.22473 1.33333H14.2298L8.72727 5.87333ZM0 8H5.81818V9.33333H0V8ZM3.63636 4.66667H0V6H3.63636V4.66667Z"
        fill="#001018"
      />
    </svg>
  )
}

SendFeedbackIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

SendFeedbackIcon.defaultProps = {
  viewBox: '0 0 16 12',
  width: '16',
  height: '12',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default SendFeedbackIcon
