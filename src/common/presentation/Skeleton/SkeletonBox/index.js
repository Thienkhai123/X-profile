import React from 'react'
import PropTypes from 'prop-types'

const SkeletonBox = props => {
  const { width, height, bg, rounded } = props
  return <div className={`${width} ${height} ${bg} ${rounded} animate-pulse`}></div>
}

SkeletonBox.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  bg: PropTypes.string,
  rounded: PropTypes.string

}

SkeletonBox.defaultProps = {
  width: 'w-40',
  height: 'h-40',
  bg: 'bg-slate-200',
  rounded: 'rounded-lg'
}
export default SkeletonBox
