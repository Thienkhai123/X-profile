import React from 'react'
import PropTypes from 'prop-types'

const ProcessbarMessLesson = (props) => {
  const { viewBox, style, width, height, fill = '#F6BB3A' } = props

  return (
    <svg
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
      fill="none"
    >
      <path
        d="M0 4C0 1.79086 1.79086 0 4 0H64C66.2091 0 68 1.79086 68 4V32H4C1.79086 32 0 30.2091 0 28V4Z"
        fill={fill}
      />
      <path d="M52 32H68V48L52 32Z" fill={fill} />
    </svg>
  )
}

ProcessbarMessLesson.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
ProcessbarMessLesson.defaultProps = {
  viewBox: '0 0 68 48',
  width: '68',
  height: '48',
  style: {}
}

export default ProcessbarMessLesson
