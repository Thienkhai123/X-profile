import PropTypes from 'prop-types'

const EyeIcon = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M12 4.00195C5 4.00195 1 12.002 1 12.002C1 12.002 5 20.002 12 20.002C19 20.002 23 12.002 23 12.002C23 12.002 19 4.00195 12 4.00195Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12 15.002C13.6569 15.002 15 13.6588 15 12.002C15 10.3451 13.6569 9.00195 12 9.00195C10.3431 9.00195 9 10.3451 9 12.002C9 13.6588 10.3431 15.002 12 15.002Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

EyeIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

EyeIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  stroke: 'black'
}

export default EyeIcon
