import PropTypes from 'prop-types'

const InformationIcon = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g clipPath="url(#clip0_1177_3538)">
        <path
          d="M8 0.998047C3.60594 0.998047 0 4.60398 0 8.99805C0 13.3921 3.60594 16.998 8 16.998C12.3941 16.998 16 13.3921 16 8.99805C16 4.60398 12.3941 0.998047 8 0.998047ZM8.9375 12.748C8.9375 13.2649 8.51681 13.6855 8 13.6855C7.48319 13.6855 7.0625 13.2649 7.0625 12.748V8.06055C7.0625 7.54373 7.48319 7.12305 8 7.12305C8.51681 7.12305 8.9375 7.54373 8.9375 8.06055V12.748ZM8 6.18555C7.48319 6.18555 7.0625 5.76486 7.0625 5.24805C7.0625 4.73123 7.48319 4.31055 8 4.31055C8.51681 4.31055 8.9375 4.73123 8.9375 5.24805C8.9375 5.76486 8.51681 6.18555 8 6.18555Z"
          fill="#666666"
        />
      </g>
      <defs>
        <clipPath id="clip0_1177_3538">
          <rect
            width="16"
            height="16"
            fill="white"
            transform="translate(0 0.998047)"
          />
        </clipPath>
      </defs>
    </svg>
  )
}

InformationIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

InformationIcon.defaultProps = {
  viewBox: '0 0 16 17',
  width: '16',
  height: '17',
  style: {}
}

export default InformationIcon
