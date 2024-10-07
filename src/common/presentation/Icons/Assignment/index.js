import PropTypes from 'prop-types'

const AssignmentIcon = (props) => {
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
        d="M16 2H11.82C11.4 0.84 10.3 0 9 0C7.7 0 6.6 0.84 6.18 2H2C0.9 2 0 2.9 0 4V18C0 19.1 0.9 20 2 20H16C17.1 20 18 19.1 18 18V4C18 2.9 17.1 2 16 2ZM9 1.75C9.22 1.75 9.41 1.85 9.55 2C9.67 2.13 9.75 2.31 9.75 2.5C9.75 2.91 9.41 3.25 9 3.25C8.59 3.25 8.25 2.91 8.25 2.5C8.25 2.31 8.33 2.13 8.45 2C8.59 1.85 8.78 1.75 9 1.75ZM2 4V18H16V4H2ZM9 5C7.35 5 6 6.35 6 8C6 9.65 7.35 11 9 11C10.65 11 12 9.65 12 8C12 6.35 10.65 5 9 5ZM8 8C8 8.55 8.45 9 9 9C9.55 9 10 8.55 10 8C10 7.45 9.55 7 9 7C8.45 7 8 7.45 8 8ZM3 15.47V17H15V15.47C15 12.97 11.03 11.89 9 11.89C6.97 11.89 3 12.96 3 15.47ZM9 13.88C7.69 13.88 6 14.44 5.31 15H12.69C12.01 14.44 10.31 13.88 9 13.88Z"
        fill={fill}
      />
    </svg>
  )
}

AssignmentIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

AssignmentIcon.defaultProps = {
  viewBox: '0 0 18 20',
  width: '18',
  height: '20',
  fill: '#666666',
  stroke: '#DB2E24',
  style: {}
}

export default AssignmentIcon
