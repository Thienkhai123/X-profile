import PropTypes from 'prop-types'

const ForwardIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke, scale } = props
  return (
    <svg
      viewBox={viewBox}
      // style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Forward">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.2841 5.58231C17.2988 5.59537 17.3135 5.60846 17.3283 5.62159L21.9155 9.69912C22.7715 10.4599 23.481 11.0906 23.9682 11.6631C24.4802 12.2648 24.8448 12.9127 24.8448 13.7143C24.8448 14.5159 24.4802 15.1638 23.9682 15.7655C23.481 16.338 22.7715 16.9687 21.9155 17.7295L17.3283 21.807C17.3135 21.8201 17.2988 21.8332 17.2841 21.8463C16.9134 22.176 16.5673 22.4837 16.2684 22.681C15.9748 22.8749 15.441 23.1564 14.8429 22.8879C14.2449 22.6193 14.1007 22.0333 14.0505 21.6851C13.9994 21.3305 13.9995 20.8674 13.9996 20.3713C13.9996 20.3516 13.9996 20.3319 13.9996 20.3122V18.5196C12.3407 18.6339 10.6597 19.0745 9.18932 19.791C7.46024 20.6335 6.07934 21.8281 5.32992 23.2556C5.14661 23.6047 4.74872 23.7838 4.36583 23.6894C3.98294 23.595 3.71387 23.2515 3.71387 22.8572C3.71387 17.4618 5.29258 13.9487 7.54987 11.7889C9.51741 9.90629 11.9154 9.1338 13.9996 8.97214V7.11641C13.9996 7.09666 13.9996 7.07695 13.9996 7.0573C13.9995 6.56115 13.9994 6.09809 14.0505 5.74352C14.1007 5.39532 14.2449 4.80928 14.8429 4.54072C15.441 4.27217 15.9748 4.55373 16.2684 4.74756C16.5673 4.94494 16.9134 5.25263 17.2841 5.58231ZM15.7174 6.48797C15.8466 6.5987 16.0009 6.73529 16.1894 6.90286L20.7292 10.9382C21.6447 11.752 22.2624 12.3038 22.6626 12.7741C23.047 13.2257 23.1306 13.4895 23.1306 13.7143C23.1306 13.9391 23.047 14.2029 22.6626 14.6545C22.2624 15.1248 21.6447 15.6766 20.7292 16.4904L16.1894 20.5257C16.0009 20.6933 15.8466 20.8299 15.7174 20.9406C15.7143 20.7705 15.7139 20.5644 15.7139 20.3122V17.6327C15.7139 17.1593 15.3301 16.7755 14.8567 16.7755C12.6709 16.7755 10.3995 17.2943 8.43841 18.2499C7.38833 18.7615 6.41078 19.4069 5.58121 20.1792C6.00266 16.6969 7.24806 14.4502 8.73501 13.0275C10.5865 11.256 12.9258 10.6531 14.8567 10.6531C15.3301 10.6531 15.7139 10.2693 15.7139 9.79593V7.11641C15.7139 6.86417 15.7143 6.65812 15.7174 6.48797Z"
          fill="black"
        />
      </g>
    </svg>
  )
}

ForwardIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}

ForwardIcon.defaultProps = {
  viewBox: '0 0 28 28',
  width: '28',
  height: '28',
  fill: '',
  stroke: '#DB2E24',
  style: {}
}

export default ForwardIcon
