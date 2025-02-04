import PropTypes from 'prop-types'

const BusinessIcon = (props) => {
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
        d="M20 7H16V5L14 3H10L8 5V7H4C2.9 7 2 7.9 2 9V14C2 14.75 2.4 15.38 3 15.73V19C3 20.11 3.89 21 5 21H19C20.11 21 21 20.11 21 19V15.72C21.59 15.37 22 14.73 22 14V9C22 7.9 21.1 7 20 7ZM10 5H14V7H10V5ZM20 9H4V14H9V11H15V14H20V9ZM13 15H11V13H13V15ZM5 19H19V16H15V17H9V16H5V19Z"
        fill={fill}
      />
    </svg>
  )
}

BusinessIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

BusinessIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '#666666',
  stroke: '#DB2E24',
  style: {}
}

export default BusinessIcon
