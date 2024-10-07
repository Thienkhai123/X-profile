import React from 'react'
import PropTypes from 'prop-types'

const ArrowBlueLightTop = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <circle
        cx="8"
        cy="8"
        r="8"
        transform="matrix(1 0 0 -1 2 18)"
        fill={stroke}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10 8C9.82934 8 9.65868 8.056 9.52869 8.16742L6.19549 11.0245C5.93484 11.2479 5.93484 11.609 6.19549 11.8324C6.45615 12.0559 6.87746 12.0559 7.13812 11.8324L10 9.37938L12.8619 11.8324C13.1225 12.0559 13.5439 12.0559 13.8045 11.8324C14.0652 11.609 14.0652 11.2479 13.8045 11.0245L10.4713 8.16742C10.3413 8.056 10.1707 8 10 8Z"
        fill={fill}
      />
      <path
        d="M10 8C9.82934 8 9.65868 8.056 9.52869 8.16742L6.19549 11.0245C5.93484 11.2479 5.93484 11.609 6.19549 11.8324C6.45615 12.0559 6.87746 12.0559 7.13812 11.8324L10 9.37938L12.8619 11.8324C13.1225 12.0559 13.5439 12.0559 13.8045 11.8324C14.0652 11.609 14.0652 11.2479 13.8045 11.0245L10.4713 8.16742C10.3413 8.056 10.1707 8 10 8"
        stroke={fill}
        strokeWidth="0.5"
      />
    </svg>
  )
}

ArrowBlueLightTop.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
ArrowBlueLightTop.defaultProps = {
  viewBox: '0 0 22 22',
  width: '22',
  height: '22',
  fill: 'white',
  stroke: '#294F9B',
  style: {}
}

export default ArrowBlueLightTop
