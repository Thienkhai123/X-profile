import React from 'react'
import PropTypes from 'prop-types'

const PlayVideo = (props) => {
  const { viewBox, style, width, height, fill } = props

  return (
    <svg
      viewBox={viewBox}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M7.00004 13.6654C10.6819 13.6654 13.6667 10.6806 13.6667 6.9987C13.6667 3.3168 10.6819 0.332031 7.00004 0.332031C3.31814 0.332031 0.333374 3.3168 0.333374 6.9987C0.333374 10.6806 3.31814 13.6654 7.00004 13.6654ZM6.12903 9.56257L9.27583 7.70468C9.797 7.39697 9.797 6.60042 9.27583 6.29272L6.12903 4.43482C5.62251 4.13577 5.00004 4.52501 5.00004 5.1408V8.85659C5.00004 9.47238 5.62251 9.86163 6.12903 9.56257Z"
        fill={fill}
      />
    </svg>
  )
}

PlayVideo.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  fill: PropTypes.string
}
PlayVideo.defaultProps = {
  viewBox: '0 0 14 14',
  width: '14',
  height: '14',
  style: {},
  fill: '#666666'
}

export default PlayVideo
