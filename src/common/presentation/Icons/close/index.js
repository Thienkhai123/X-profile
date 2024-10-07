import PropTypes from 'prop-types'

const CloseIcon = (props) => {
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
        d="M24.7071 7.29289C25.0976 7.68342 25.0976 8.31658 24.7071 8.70711L8.70711 24.7071C8.31658 25.0976 7.68342 25.0976 7.29289 24.7071C6.90237 24.3166 6.90237 23.6834 7.29289 23.2929L23.2929 7.29289C23.6834 6.90237 24.3166 6.90237 24.7071 7.29289Z"
        fill="black"
      />

      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.29289 7.29289C7.68342 6.90237 8.31658 6.90237 8.70711 7.29289L24.7071 23.2929C25.0976 23.6834 25.0976 24.3166 24.7071 24.7071C24.3166 25.0976 23.6834 25.0976 23.2929 24.7071L7.29289 8.70711C6.90237 8.31658 6.90237 7.68342 7.29289 7.29289Z"
        fill="black"
      />
    </svg>
  )
}

CloseIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

CloseIcon.defaultProps = {
  viewBox: '0 0 32 32',
  width: '32',
  height: '32',
  fill: 'black',
  stroke: 'black',
  style: {}
}

export default CloseIcon
