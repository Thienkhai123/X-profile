import PropTypes from 'prop-types'

const ArrowRaiseIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M5.83025 6.50979C5.03726 7.30391 4.27877 8.06466 3.51952 8.82578C2.86963 9.47567 2.21974 10.1246 1.56985 10.7725C1.35726 10.9835 1.1008 11.0488 0.811724 10.9637C0.522648 10.8786 0.350552 10.6735 0.286812 10.3836C0.225323 10.1017 0.33293 9.87035 0.530147 9.67126C1.43149 8.77041 2.33209 7.86932 3.23194 6.96797C3.89908 6.30108 4.56672 5.63457 5.23485 4.96843C5.60117 4.60474 6.02522 4.60287 6.39004 4.9628C6.89695 5.46272 7.40049 5.96639 7.90066 6.4738C7.95727 6.53079 7.99289 6.6084 8.03301 6.66839L12.2458 2.45185C12.1858 2.4481 12.1281 2.44173 12.07 2.44135C11.5825 2.44135 11.0951 2.44623 10.6077 2.43835C10.2856 2.43348 10.043 2.27713 9.91069 1.98431C9.78434 1.7046 9.82633 1.43315 10.0232 1.19469C10.0938 1.10631 10.1838 1.03533 10.2861 0.987224C10.3885 0.939119 10.5006 0.915174 10.6137 0.917236C11.7805 0.914611 12.9503 0.912362 14.1186 0.918361C14.5599 0.92061 14.8865 1.2558 14.888 1.69635C14.8917 2.85866 14.8917 4.02096 14.888 5.18327C14.888 5.62494 14.5419 5.97064 14.1227 5.96689C13.7036 5.96314 13.3804 5.63319 13.3729 5.19039C13.3657 4.71572 13.371 4.24068 13.371 3.76563V3.56879L13.3027 3.52455C13.2603 3.59136 13.2129 3.6549 13.161 3.71464C11.6693 5.20914 10.1764 6.70251 8.6824 8.19476C8.29359 8.58282 7.87329 8.58357 7.48598 8.19814C6.97731 7.69172 6.46952 7.18368 5.96261 6.67402C5.91911 6.63015 5.88425 6.57616 5.83025 6.50979Z"
        fill={fill}
      />
    </svg>
  )
}

ArrowRaiseIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

ArrowRaiseIcon.defaultProps = {
  viewBox: '0 0 15 11',
  width: '15',
  height: '11',
  style: {},
  fill: '#04CE00'
}

export default ArrowRaiseIcon
