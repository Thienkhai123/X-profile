import PropTypes from 'prop-types'

const LinkIcon = (props) => {
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
        d="M7.379 10.1907L5.14554 12.4242C4.31141 13.2583 3.83173 14.3933 3.8405 15.5861C3.84926 16.7789 4.31844 17.9208 5.19216 18.7675C6.03884 19.6413 7.18097 20.1104 8.37359 20.1192C9.59342 20.1282 10.7015 19.6755 11.5357 18.8414L13.7692 16.6079M16.622 13.8097L18.8554 11.5762C19.6896 10.7421 20.1692 9.60711 20.1605 8.4143C20.1517 7.22149 19.6825 6.0796 18.8088 5.23287C17.9623 4.38638 16.8204 3.91717 15.6276 3.90841C14.4348 3.89964 13.2997 4.35209 12.4655 5.18625L10.232 7.4197M8.61359 15.3274L15.314 8.62701"
        stroke="#666666"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

LinkIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

LinkIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default LinkIcon
