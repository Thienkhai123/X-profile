import PropTypes from 'prop-types'

const DocumentQuizIcon = (props) => {
  const { viewBox, style, width, height, fill } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Document">
        <g id="Vector">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.66797 8.33333V31.6667C6.66797 34.4281 8.90655 36.6667 11.668 36.6667H28.3346C31.0961 36.6667 33.3346 34.4281 33.3346 31.6667V15C33.3346 12.2386 31.0961 10 28.3346 10H8.33464C7.41416 10 6.66797 9.25381 6.66797 8.33333ZM12.0846 20C12.0846 19.3096 12.6443 18.75 13.3346 18.75H26.668C27.3583 18.75 27.918 19.3096 27.918 20C27.918 20.6904 27.3583 21.25 26.668 21.25H13.3346C12.6443 21.25 12.0846 20.6904 12.0846 20ZM12.0846 25.8333C12.0846 25.143 12.6443 24.5833 13.3346 24.5833H22.5013C23.1917 24.5833 23.7513 25.143 23.7513 25.8333C23.7513 26.5237 23.1917 27.0833 22.5013 27.0833H13.3346C12.6443 27.0833 12.0846 26.5237 12.0846 25.8333Z"
            fill={fill}
          />
          <path
            d="M7.34928 6.81183C7.93008 7.07231 8.33464 7.65558 8.33464 8.33333H28.3346C28.9101 8.33333 29.4686 8.40626 30.0013 8.54336V7.17673C30.0013 5.14824 28.2047 3.59003 26.1966 3.8769L8.20063 6.44775C7.87984 6.49358 7.58915 6.6229 7.34928 6.81183Z"
            fill={fill}
          />
        </g>
      </g>
    </svg>
  )
}

DocumentQuizIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

DocumentQuizIcon.defaultProps = {
  viewBox: '0 0 40 40',
  width: '40',
  height: '40',
  style: {},
  fill: '#fff'
}

export default DocumentQuizIcon
