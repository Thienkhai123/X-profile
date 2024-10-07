import PropTypes from 'prop-types'

const UnreadIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M24.6564 9.2467C25.0724 9.60991 25.1152 10.2416 24.752 10.6577L14.2758 22.6577C14.0859 22.8752 13.8113 23 13.5225 23C13.2338 23 12.9591 22.8752 12.7692 22.6577L8.57873 17.8577C8.21551 17.4416 8.25834 16.8099 8.67439 16.4467C9.09043 16.0835 9.72215 16.1263 10.0854 16.5424L13.5225 20.4795L23.2454 9.34236C23.6086 8.92631 24.2403 8.88348 24.6564 9.2467Z"
        fill={fill}
      />
    </svg>
  )
}

UnreadIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

UnreadIcon.defaultProps = {
  viewBox: '0 0 32 32',
  width: '32',
  height: '32',
  style: {},
  fill: '#378711'
}

export default UnreadIcon
