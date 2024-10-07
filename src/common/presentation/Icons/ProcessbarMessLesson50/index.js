import React from 'react'
import PropTypes from 'prop-types'

const ProcessbarMessLesson50 = (props) => {
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
        d="M68 4C68 1.79086 66.2091 0 64 0H4C1.79086 0 2.44379e-06 1.79086 2.44379e-06 4V32H64C66.2091 32 68 30.2091 68 28V4Z"
        fill={fill}
      />
      <path d="M16 32H0V48L16 32Z" fill={fill} />
    </svg>
  )
}

ProcessbarMessLesson50.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
ProcessbarMessLesson50.defaultProps = {
  viewBox: '0 0 68 48',
  width: '68',
  height: '48',
  style: {}
}

export default ProcessbarMessLesson50
