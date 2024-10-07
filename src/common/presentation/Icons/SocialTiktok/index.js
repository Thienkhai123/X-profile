import PropTypes from 'prop-types'

const SocialTiktokIcon = (props) => {
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
        style={{
          transform: `scale(${scale})`,
          fill: fill,
          fillOpacity: 1,
          fillRule: 'evenodd'
        }}
        d="M 12.003906 0 C 18.628906 0 24.007812 5.371094 24.007812 12.003906 C 24.007812 18.628906 18.636719 24.007812 12.003906 24.007812 C 5.378906 24.007812 0 18.636719 0 12.003906 C 0 5.378906 5.371094 0 12.003906 0 Z M 14.601562 5.355469 C 14.828125 7.242188 15.878906 8.367188 17.699219 8.484375 L 17.699219 10.597656 C 16.640625 10.699219 15.710938 10.355469 14.632812 9.707031 L 14.632812 13.667969 C 14.632812 18.707031 9.136719 20.277344 6.933594 16.667969 C 5.515625 14.351562 6.386719 10.269531 10.9375 10.109375 L 10.9375 12.347656 C 10.59375 12.40625 10.226562 12.492188 9.886719 12.609375 C 8.871094 12.945312 8.300781 13.59375 8.460938 14.726562 C 8.769531 16.894531 12.746094 17.535156 12.414062 13.300781 L 12.414062 5.363281 L 14.609375 5.363281 Z M 14.601562 5.355469 "
      />
    </svg>
  )
}

SocialTiktokIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}

SocialTiktokIcon.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {},
  fill: '#666666'
}

export default SocialTiktokIcon
