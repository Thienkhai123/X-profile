import PropTypes from 'prop-types'

const FrameZoomOut = (props) => {
  const { viewBox, style, width, height, stroke } = props
  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={style}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M198.333 255.843C230.566 255.843 256.696 229.713 256.696 197.479C256.696 165.246 230.566 139.115 198.333 139.115C166.1 139.115 139.97 165.246 139.97 197.479C139.97 229.713 166.1 255.843 198.333 255.843Z"
        stroke="#271E3A"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M223 197.479H173.667"
        stroke="#271E3A"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}

FrameZoomOut.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

FrameZoomOut.defaultProps = {
  viewBox: '0 0 396 396',
  width: '396',
  height: '396',
  stroke: '#666666',
  style: {}
}

export default FrameZoomOut
