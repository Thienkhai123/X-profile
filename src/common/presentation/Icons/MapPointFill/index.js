import PropTypes from 'prop-types'

const MapPointFillIcon = (props) => {
  const { viewBox, style, width, height, fill, scale, margin = '' } = props
  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <g id="Map Point">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C7.58172 2 4 6.00258 4 10.5C4 14.9622 6.55332 19.8124 10.5371 21.6744C11.4657 22.1085 12.5343 22.1085 13.4629 21.6744C17.4467 19.8124 20 14.9622 20 10.5C20 6.00258 16.4183 2 12 2ZM12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z"
          fill={fill}
        />
      </g>
    </svg>
  )
}

MapPointFillIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

MapPointFillIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#294F9B'
}

export default MapPointFillIcon
