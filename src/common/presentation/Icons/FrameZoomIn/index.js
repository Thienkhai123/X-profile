import PropTypes from 'prop-types'

const FrameZoomIn = (props) => {
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
        d="M197.679 255.844C229.912 255.844 256.042 229.714 256.042 197.48C256.042 165.247 229.912 139.116 197.679 139.116C165.446 139.116 139.316 165.247 139.316 197.48C139.316 229.714 165.446 255.844 197.679 255.844Z"
        stroke="#271E3A"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M197.678 172.09V222.87"
        stroke="#271E3A"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
      <path
        d="M223.069 197.479H172.301"
        stroke="#271E3A"
        strokeWidth="12"
        strokeMiterlimit="10"
        strokeLinecap="round"
      />
    </svg>
  )
}

FrameZoomIn.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

FrameZoomIn.defaultProps = {
  viewBox: '0 0 396 396',
  width: '396',
  height: '396',
  stroke: '#666666',
  style: {}
}

export default FrameZoomIn
