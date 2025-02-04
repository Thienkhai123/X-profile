import PropTypes from 'prop-types'

const UserIcon = (props) => {
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
        d="M16.6654 17.5V15.8333C16.6654 14.9493 16.3142 14.1014 15.6891 13.4763C15.0639 12.8512 14.2161 12.5 13.332 12.5H6.66536C5.78131 12.5 4.93346 12.8512 4.30834 13.4763C3.68322 14.1014 3.33203 14.9493 3.33203 15.8333V17.5"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0013 9.16667C11.8423 9.16667 13.3346 7.67428 13.3346 5.83333C13.3346 3.99238 11.8423 2.5 10.0013 2.5C8.16035 2.5 6.66797 3.99238 6.66797 5.83333C6.66797 7.67428 8.16035 9.16667 10.0013 9.16667Z"
        stroke="#333333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

UserIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

UserIcon.defaultProps = {
  viewBox: '0 0 20 20',
  width: '20',
  height: '20',
  style: {}
}

export default UserIcon
