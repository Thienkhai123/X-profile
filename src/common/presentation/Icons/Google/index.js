import PropTypes from 'prop-types'

const GoogleIcon = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_911_7413)">
        <path
          d="M23.7663 12.2763C23.7663 11.4605 23.7001 10.6404 23.559 9.83789H12.2402V14.4589H18.722C18.453 15.9492 17.5888 17.2676 16.3233 18.1054V21.1037H20.1903C22.4611 19.0137 23.7663 15.9272 23.7663 12.2763Z"
          fill="#4285F4"
        />
        <path
          d="M12.2391 24.0003C15.4756 24.0003 18.205 22.9377 20.1936 21.1034L16.3266 18.1051C15.2507 18.837 13.8618 19.2515 12.2435 19.2515C9.11291 19.2515 6.45849 17.1394 5.50607 14.2998H1.51562V17.3907C3.55274 21.4429 7.70192 24.0003 12.2391 24.0003Z"
          fill="#34A853"
        />
        <path
          d="M5.50277 14.3007C5.00011 12.8103 5.00011 11.1965 5.50277 9.70618V6.61523H1.51674C-0.185266 10.006 -0.185266 14.0009 1.51674 17.3916L5.50277 14.3007Z"
          fill="#FBBC04"
        />
        <path
          d="M12.2391 4.74966C13.9499 4.7232 15.6034 5.36697 16.8425 6.54867L20.2685 3.12262C18.0991 1.0855 15.2198 -0.034466 12.2391 0.000808666C7.70192 0.000808666 3.55274 2.55822 1.51562 6.61481L5.50166 9.70575C6.44967 6.86173 9.1085 4.74966 12.2391 4.74966Z"
          fill="#EA4335"
        />
      </g>
      <defs>
        <clipPath id="clip0_911_7413">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

GoogleIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

GoogleIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default GoogleIcon
