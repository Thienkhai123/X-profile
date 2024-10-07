import PropTypes from 'prop-types'

const ShareIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill={fill}
    >
      <path
        d="M10.9551 1.18341L15.9329 5.60815C16.8635 6.43533 17.3288 6.84892 17.5002 7.3373C17.6508 7.76617 17.6508 8.23355 17.5002 8.66242C17.3288 9.1508 16.8635 9.56439 15.9329 10.3916L10.9551 14.8163C10.5328 15.1917 10.3216 15.3794 10.1423 15.3861C9.98647 15.3919 9.83686 15.3247 9.73771 15.2044C9.62358 15.0659 9.62358 14.7834 9.62358 14.2184V11.4284C7.19549 11.4284 4.63093 12.2083 2.75831 13.5926C1.78342 14.3133 1.29595 14.6737 1.11029 14.6595C0.929316 14.6456 0.814463 14.575 0.720563 14.4196C0.624232 14.2603 0.709317 13.7624 0.879485 12.7666C1.98446 6.30042 6.43443 4.57129 9.62358 4.57129V1.78134C9.62358 1.21632 9.62358 0.933813 9.73771 0.79531C9.83686 0.674984 9.98647 0.6078 10.1423 0.613632C10.3216 0.620344 10.5328 0.808032 10.9551 1.18341Z"
        fill={stroke}
      />
    </svg>
  )
}

ShareIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

ShareIcon.defaultProps = {
  viewBox: '0 0 18 16',
  width: '18',
  height: '16',
  fill: 'none',
  stroke: 'black',
  style: {}
}

export default ShareIcon
