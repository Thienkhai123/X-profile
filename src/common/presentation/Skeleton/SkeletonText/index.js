import React from 'react'
import PropTypes from 'prop-types'

const SkeletonText = (props) => {
  const { width, height, bg, margin, rounded } = props
  return (
    <div
      className={`${width} ${height} ${bg} ${margin} ${rounded} animate-pulse`}
    />
  )
}

SkeletonText.propTypes = {
  /**
   * Custom width with tailwindcss className
   * learn more: https://tailwindcss.com/docs/width
   */
  width: PropTypes.string,
  height: PropTypes.string,
  bg: PropTypes.string,
  margin: PropTypes.string,
  rounded: PropTypes.string
}

SkeletonText.defaultProps = {
  width: 'w-48',
  height: 'h-2.5',
  bg: 'bg-slate-200',
  margin: '',
  rounded: 'rounded-[12px]'
}
export default SkeletonText
