import React from 'react'
import PropTypes from 'prop-types'

const ProcessbarTooltip = (props) => {
  const { viewBox, style, width = '195', height } = props

  return (
    <svg viewBox={viewBox} style={style} width={width} height="24" fill="none">
      <path d="M9.67647 0H195V24H0L9.67647 17.4286V0Z" style={style} />
    </svg>
  )
}

ProcessbarTooltip.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}
ProcessbarTooltip.defaulrProps = {
  viewBox: '0 0 195 24',
  width: '195',
  height: '24',
  style: {}
}

export default ProcessbarTooltip
