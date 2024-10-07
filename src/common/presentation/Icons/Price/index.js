import PropTypes from 'prop-types'

const PriceIcon = (props) => {
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
        d="M7 14C5.13023 14 3.37236 13.2719 2.05023 11.9498C0.728109 10.6276 0 8.86977 0 7C0 5.13023 0.728137 3.37239 2.05023 2.05023C3.37233 0.728082 5.13023 0 7 0C8.86977 0 10.6276 0.728109 11.9498 2.05023C13.2719 3.37236 14 5.13023 14 7C14 8.86977 13.2719 10.6276 11.9498 11.9498C10.6277 13.2719 8.86977 14 7 14ZM7 0.875C3.62266 0.875 0.875 3.62266 0.875 7C0.875 10.3773 3.62266 13.125 7 13.125C10.3773 13.125 13.125 10.3773 13.125 7C13.125 3.62266 10.3773 0.875 7 0.875Z"
        fill={fill}
      />
      <path
        d="M7 6.5625C6.39691 6.5625 5.90625 6.07184 5.90625 5.46875C5.90625 4.86566 6.39691 4.375 7 4.375C7.60309 4.375 8.09375 4.86566 8.09375 5.46875C8.09375 5.71036 8.28961 5.90625 8.53125 5.90625C8.77289 5.90625 8.96875 5.71036 8.96875 5.46875C8.96875 4.53357 8.3131 3.74916 7.4375 3.5496V3.0625C7.4375 2.82089 7.24164 2.625 7 2.625C6.75836 2.625 6.5625 2.82089 6.5625 3.0625V3.5496C5.6869 3.74916 5.03125 4.53357 5.03125 5.46875C5.03125 6.55432 5.91443 7.4375 7 7.4375C7.60309 7.4375 8.09375 7.92816 8.09375 8.53125C8.09375 9.13434 7.60309 9.625 7 9.625C6.39691 9.625 5.90625 9.13434 5.90625 8.53125C5.90625 8.28964 5.71039 8.09375 5.46875 8.09375C5.22711 8.09375 5.03125 8.28964 5.03125 8.53125C5.03125 9.46643 5.6869 10.2508 6.5625 10.4504V10.9375C6.5625 11.1791 6.75836 11.375 7 11.375C7.24164 11.375 7.4375 11.1791 7.4375 10.9375V10.4504C8.3131 10.2508 8.96875 9.46643 8.96875 8.53125C8.96875 7.44568 8.08557 6.5625 7 6.5625Z"
        fill={fill}
      />
    </svg>
  )
}

PriceIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  style: PropTypes.object
}

PriceIcon.defaultProps = {
  viewBox: '0 0 14 14',
  width: '14',
  height: '14',
  fill: '#294F9B',
  style: {}
}

export default PriceIcon
