import PropTypes from 'prop-types'

const ArrowToeic = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5694 10.7245C19.839 10.9941 19.8026 11.3999 19.4881 11.631L12.4881 16.7738C12.2072 16.9802 11.7928 16.9802 11.5119 16.7738L4.51191 11.631C4.19741 11.3999 4.16099 10.9941 4.43056 10.7245C4.70013 10.4549 5.1736 10.4237 5.48809 10.6548L12 15.439L18.5119 10.6548C18.8264 10.4237 19.2999 10.4549 19.5694 10.7245Z"
        fill="#999999"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19.5694 7.29592C19.839 7.56549 19.8026 7.97132 19.4881 8.20238L12.4881 13.3452C12.2072 13.5516 11.7928 13.5516 11.5119 13.3452L4.51191 8.20238C4.19741 7.97132 4.16099 7.56549 4.43056 7.29592C4.70013 7.02635 5.1736 6.99514 5.48809 7.22619L12 12.0105L18.5119 7.22619C18.8264 6.99514 19.2999 7.02635 19.5694 7.29592Z"
        fill="#999999"
      />
    </svg>
  )
}

ArrowToeic.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

ArrowToeic.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#999999'
}

export default ArrowToeic
