import PropTypes from 'prop-types'

const QuestionIcon = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M10.0003 18.3327C14.6027 18.3327 18.3337 14.6017 18.3337 9.99935C18.3337 5.39698 14.6027 1.66602 10.0003 1.66602C5.39795 1.66602 1.66699 5.39698 1.66699 9.99935C1.66699 14.6017 5.39795 18.3327 10.0003 18.3327Z"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5752 7.49852C7.77112 6.94158 8.15782 6.47194 8.66682 6.1728C9.17583 5.87365 9.77427 5.7643 10.3562 5.86411C10.9381 5.96393 11.4659 6.26646 11.8461 6.71813C12.2263 7.1698 12.4344 7.74146 12.4335 8.33185C12.4335 9.99852 9.93353 10.8319 9.93353 10.8319"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.166H10.0083"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

QuestionIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

QuestionIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {}
}

export default QuestionIcon
