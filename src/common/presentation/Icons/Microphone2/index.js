import PropTypes from 'prop-types'

const Microphone2Icon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg viewBox={viewBox} width={width} height={height} fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M6.25 8C6.25 4.82436 8.82436 2.25 12 2.25C15.1756 2.25 17.75 4.82436 17.75 8V11C17.75 14.1756 15.1756 16.75 12 16.75C8.82436 16.75 6.25 14.1756 6.25 11V8ZM7.81597 7.25H9C9.41421 7.25 9.75 7.58579 9.75 8C9.75 8.41421 9.41421 8.75 9 8.75H7.75V10.25H9C9.41421 10.25 9.75 10.5858 9.75 11C9.75 11.4142 9.41421 11.75 9 11.75H7.81597C8.1702 13.7395 9.9087 15.25 12 15.25C14.0913 15.25 15.8298 13.7395 16.184 11.75L13.5 11.75C13.0858 11.75 12.75 11.4142 12.75 11C12.75 10.5858 13.0858 10.25 13.5 10.25L16.25 10.25V8.75H13.5C13.0858 8.75 12.75 8.41421 12.75 8C12.75 7.58579 13.0858 7.25 13.5 7.25H16.184C15.8298 5.26049 14.0913 3.75 12 3.75C9.9087 3.75 8.1702 5.26049 7.81597 7.25ZM4 9.25C4.41421 9.25 4.75 9.58579 4.75 10V11C4.75 15.0041 7.99594 18.25 12 18.25C16.0041 18.25 19.25 15.0041 19.25 11V10C19.25 9.58579 19.5858 9.25 20 9.25C20.4142 9.25 20.75 9.58579 20.75 10V11C20.75 15.5798 17.2314 19.3379 12.75 19.7183V22C12.75 22.4142 12.4142 22.75 12 22.75C11.5858 22.75 11.25 22.4142 11.25 22V19.7183C6.7686 19.3379 3.25 15.5798 3.25 11V10C3.25 9.58579 3.58579 9.25 4 9.25Z"
        fill={fill}
      />
    </svg>
  )
}

Microphone2Icon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

Microphone2Icon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: 'black'
}

export default Microphone2Icon
