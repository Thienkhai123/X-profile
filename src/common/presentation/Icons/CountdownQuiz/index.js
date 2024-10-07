import PropTypes from 'prop-types'

const CountdownQuizIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Group 1261154217">
        <rect
          id="Rectangle 5842"
          width="56"
          height="56"
          rx="16"
          fill="#294F9B"
        />
        <g id="Group 1261154216">
          <g id="Vector">
            <path
              d="M19.9474 11.9004C19.0114 11.9004 18.2526 12.6592 18.2526 13.5951V14.725C18.2526 15.6609 19.0114 16.4197 19.9474 16.4197H25.5965C26.5325 16.4197 27.2912 15.6609 27.2912 14.725V13.5951C27.2912 12.6592 26.5325 11.9004 25.5965 11.9004H19.9474Z"
              fill="#F5A9A4"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13.5963 15.1508C14.1569 14.5902 14.9104 14.3462 16.0357 14.24C16.3187 14.2132 16.5579 14.4407 16.5579 14.725C16.5579 16.5969 18.0754 18.1144 19.9474 18.1144H25.5965C27.4685 18.1144 28.986 16.5969 28.986 14.725C28.986 14.4407 29.2252 14.2132 29.5082 14.24C30.6335 14.3462 31.387 14.5902 31.9476 15.1508C32.9404 16.1436 32.9404 17.7414 32.9404 20.937V27.716C32.9404 30.9116 32.9404 35.9009 31.9476 36.8936C30.9549 37.8864 29.357 37.8864 26.1614 37.8864H19.3825C16.1868 37.8864 14.589 37.8864 13.5963 36.8936C12.6035 35.9009 12.6035 30.9116 12.6035 27.716V20.937C12.6035 17.7414 12.6035 16.1436 13.5963 15.1508Z"
              fill="#F5A9A4"
            />
          </g>
          <g id="Group 1261154215">
            <path
              id="Rectangle 5841"
              d="M17.5571 25.3308C17.3246 22.9777 19.1731 20.9375 21.5377 20.9375H34.9655C37.0223 20.9375 38.7438 22.4973 38.9461 24.5442L39.9471 34.6762C40.1678 36.9091 40.9978 39.0385 42.3465 40.8317C43.358 42.1766 42.3985 44.0989 40.7156 44.0989H25.0584C23.9746 44.0989 22.9539 43.5894 22.3024 42.7232C20.0232 39.6928 18.6206 36.0944 18.2478 32.3209L17.5571 25.3308Z"
              fill="#FFF0CF"
            />
            <path
              id="Vector 187"
              d="M22.7715 25.459H26.161"
              stroke="#294F9B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              id="Vector 190"
              d="M26.1621 38.3145H31.8112"
              stroke="#294F9B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              id="Vector 188"
              d="M22.7715 28.8477H34.0697"
              stroke="#294F9B"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              id="Vector 189"
              d="M23.9004 32.1992H35.1986"
              stroke="#294F9B"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        </g>
      </g>
    </svg>
  )
}

CountdownQuizIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

CountdownQuizIcon.defaultProps = {
  viewBox: '0 0 56 56',
  width: '56',
  height: '56',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default CountdownQuizIcon
