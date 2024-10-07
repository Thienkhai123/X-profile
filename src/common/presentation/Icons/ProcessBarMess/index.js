import React from 'react'
import PropTypes from 'prop-types'

const ProcessBarMess = (props) => {
  const { viewBox, style, width, height } = props
  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path d="M0 0H81V40L74.6 28.8H0V0Z" style={style} />
    </svg>
  )
}

ProcessBarMess.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
ProcessBarMess.defaultProps = {
  viewBox: '0 0 81 40',
  width: '81',
  height: '40',
  style: {}
}

export default ProcessBarMess
