import React from 'react'
import PropTypes from 'prop-types'

const ArrowBlueLight = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <circle cx="10" cy="10" r="8" fill={stroke} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 12C10.1707 12 10.3413 11.944 10.4713 11.8326L13.8045 8.97554C14.0652 8.75212 14.0652 8.39099 13.8045 8.16757C13.5439 7.94414 13.1225 7.94414 12.8619 8.16757L10 10.6206L7.13812 8.16757C6.87746 7.94414 6.45615 7.94414 6.19549 8.16757C5.93484 8.39099 5.93484 8.75212 6.19549 8.97554L9.52869 11.8326C9.65868 11.944 9.82934 12 10 12Z"
        fill={fill}
      />
      <path
        d="M10 12C10.1707 12 10.3413 11.944 10.4713 11.8326L13.8045 8.97554C14.0652 8.75212 14.0652 8.39099 13.8045 8.16757C13.5439 7.94414 13.1225 7.94414 12.8619 8.16757L10 10.6206L7.13812 8.16757C6.87746 7.94414 6.45615 7.94414 6.19549 8.16757C5.93484 8.39099 5.93484 8.75212 6.19549 8.97554L9.52869 11.8326C9.65868 11.944 9.82934 12 10 12"
        stroke={fill}
        strokeWidth="0.5"
      />
    </svg>
  )
}

ArrowBlueLight.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
ArrowBlueLight.defaultProps = {
  viewBox: '0 0 22 22',
  width: '22',
  height: '22',
  fill: 'white',
  stroke: '#294F9B',
  style: {}
}

export default ArrowBlueLight
