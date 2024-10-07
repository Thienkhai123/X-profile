import PropTypes from 'prop-types'

const SocialTelegramIcon = (props) => {
  const { viewBox, style, width, height, fill, scale, margin = '' } = props
  return (
    <svg
      viewBox={viewBox}
      style={{
        margin: margin
      }}
      width={width}
      height={height}
      fill="none"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12ZM9.8 17.5L10.0042 14.4411L10.004 14.441L15.5685 9.4195C15.8127 9.20276 15.5151 9.09707 15.1909 9.29366L8.32364 13.6262L5.35734 12.7003C4.71675 12.5042 4.71215 12.064 5.50116 11.7475L17.0602 7.29043C17.5881 7.05075 18.0976 7.41723 17.8961 8.22525L15.9276 17.5015C15.7901 18.1607 15.3919 18.3184 14.84 18.0139L11.8414 15.7985L10.4 17.2C10.3955 17.2044 10.3909 17.2088 10.3864 17.2132C10.2252 17.3701 10.0919 17.5 9.8 17.5Z"
        fill={fill}
        style={{
          transform: `scale(${scale})`
        }}
      />
    </svg>
  )
}

SocialTelegramIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

SocialTelegramIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666'
}

export default SocialTelegramIcon
