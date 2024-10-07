import PropTypes from 'prop-types'

const CalendarIcon = (props) => {
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
        d="M5.42857 6.25H14.5M4.80952 1.25V2.75018M15 1.25V2.75M18 5.75L18 15.7501C18 17.4069 16.6569 18.7501 15 18.7501H5C3.34315 18.7501 2 17.4069 2 15.7501V5.75C2 4.09315 3.34315 2.75 5 2.75H15C16.6569 2.75 18 4.09315 18 5.75Z"
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

CalendarIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

CalendarIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  fill: '',
  stroke: '#666666',
  style: {}
}

export default CalendarIcon
