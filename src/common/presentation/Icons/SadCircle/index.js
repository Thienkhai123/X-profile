import React from 'react'
import PropTypes from 'prop-types'

const SadCircleIcon = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <g id="Sad Circle">
        <path
          id="Vector"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12.25 22C17.7728 22 22.25 17.5228 22.25 12C22.25 6.47715 17.7728 2 12.25 2C6.72715 2 2.25 6.47715 2.25 12C2.25 17.5228 6.72715 22 12.25 22ZM15.25 12C15.8023 12 16.25 11.3284 16.25 10.5C16.25 9.67157 15.8023 9 15.25 9C14.6977 9 14.25 9.67157 14.25 10.5C14.25 11.3284 14.6977 12 15.25 12ZM10.25 10.5C10.25 11.3284 9.80228 12 9.25 12C8.69772 12 8.25 11.3284 8.25 10.5C8.25 9.67157 8.69772 9 9.25 9C9.80228 9 10.25 9.67157 10.25 10.5ZM8.64747 17.4466C8.89413 17.7794 9.36385 17.8492 9.69661 17.6025C10.425 17.0627 11.3041 16.75 12.25 16.75C13.1959 16.75 14.075 17.0627 14.8034 17.6025C15.1362 17.8492 15.6059 17.7794 15.8525 17.4466C16.0992 17.1138 16.0294 16.6441 15.6966 16.3975C14.7242 15.6767 13.535 15.25 12.25 15.25C10.965 15.25 9.7758 15.6767 8.80339 16.3975C8.47062 16.6441 8.40082 17.1138 8.64747 17.4466Z"
          fill="#F6BB3A"
        />
      </g>
    </svg>
  )
}

SadCircleIcon.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
SadCircleIcon.defaultProps = {
  viewBox: '0 0 25 24',
  width: '25',
  height: '24',
  fill: 'black',
  style: {}
}

export default SadCircleIcon
