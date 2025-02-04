import PropTypes from 'prop-types'

const FileIcon = (props) => {
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
        d="M11.82 2H16C17.1 2 18 2.9 18 4V18C18 19.1 17.1 20 16 20H2C1.86 20 1.73 19.99 1.6 19.97C1.21 19.89 0.86 19.69 0.59 19.42C0.41 19.23 0.26 19.02 0.16 18.78C0.06 18.54 0 18.27 0 18V4C0 3.72 0.06 3.46 0.16 3.23C0.26 2.99 0.41 2.77 0.59 2.59C0.86 2.32 1.21 2.12 1.6 2.04C1.73 2.01 1.86 2 2 2H6.18C6.6 0.84 7.7 0 9 0C10.3 0 11.4 0.84 11.82 2ZM4 8V6H14V8H4ZM14 12V10H4V12H14ZM11 14H4V16H11V14ZM9 1.75C9.41 1.75 9.75 2.09 9.75 2.5C9.75 2.91 9.41 3.25 9 3.25C8.59 3.25 8.25 2.91 8.25 2.5C8.25 2.09 8.59 1.75 9 1.75ZM2 18H16V4H2V18Z"
        fill="#666666"
      />
    </svg>
  )
}

FileIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

FileIcon.defaultProps = {
  viewBox: '0 0 18 20',
  width: '18',
  height: '20',
  fill: '#666666',
  stroke: '#DB2E24',
  style: {}
}

export default FileIcon
