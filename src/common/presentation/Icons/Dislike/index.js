import React from 'react'
import PropTypes from 'prop-types'

const Dislike = (props) => {
  const { viewBox, style, width, height, fill, stroke } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M20.5 14V3M3 11L6.23786 3.59918C6.3971 3.23519 6.75672 3 7.15402 3H16C16.5523 3 17 3.44771 17 4V13.5858C17 13.851 16.8946 14.1054 16.7071 14.2929L11.1562 19.8438C10.7938 20.2062 10.2062 20.2062 9.84381 19.8438V19.8438C9.62849 19.6285 9.5325 19.3212 9.58698 19.0216L10.5 14H4C3.44772 14 3 13.5523 3 13V11Z"
        stroke={stroke}
        strokeWidth="1.5"
      />
    </svg>
  )
}

Dislike.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  stroke: PropTypes.string,
  style: PropTypes.object
}
Dislike.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  fill: '',
  stroke: '#666666',
  style: {}
}

export default Dislike
