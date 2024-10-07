import React from 'react'
import PropTypes from 'prop-types'

const YoutubeFooter = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0ZM17.0008 7.87466C17.5516 8.0258 17.9853 8.47111 18.1325 9.03661C18.4 10.0615 18.4 12.2 18.4 12.2C18.4 12.2 18.4 14.3384 18.1325 15.3634C17.9853 15.9289 17.5516 16.3742 17.0008 16.5254C16.0027 16.8 12 16.8 12 16.8C12 16.8 7.99731 16.8 6.99913 16.5254C6.44836 16.3742 6.01462 15.9289 5.86742 15.3634C5.6 14.3384 5.6 12.2 5.6 12.2C5.6 12.2 5.6 10.0615 5.86742 9.03661C6.01462 8.47111 6.44836 8.0258 6.99913 7.87466C7.99731 7.6 12 7.6 12 7.6C12 7.6 16.0027 7.6 17.0008 7.87466Z"
        fill="#666666"
      />
      <path
        d="M10.7998 14.4004V10.4004L13.9998 12.4005L10.7998 14.4004Z"
        fill="#666666"
      />
    </svg>
  )
}

YoutubeFooter.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
YoutubeFooter.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

export default YoutubeFooter
