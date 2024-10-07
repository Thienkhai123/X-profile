import PropTypes from 'prop-types'

const LocationIcon = (props) => {
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
        d="M8.5 15.3327C8.5 15.3327 14.5 11.3327 14.5 6.66602C14.5 5.07472 13.8679 3.54859 12.7426 2.42337C11.6174 1.29816 10.0913 0.666016 8.5 0.666016C6.9087 0.666016 5.38258 1.29816 4.25736 2.42337C3.13214 3.54859 2.5 5.07472 2.5 6.66602C2.5 11.3327 8.5 15.3327 8.5 15.3327Z"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 8.66602C9.60457 8.66602 10.5 7.77059 10.5 6.66602C10.5 5.56145 9.60457 4.66602 8.5 4.66602C7.39543 4.66602 6.5 5.56145 6.5 6.66602C6.5 7.77059 7.39543 8.66602 8.5 8.66602Z"
        stroke="#666666"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

LocationIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

LocationIcon.defaultProps = {
  viewBox: '0 0 17 16',
  width: '17',
  height: '16',
  style: {}
}

export default LocationIcon
