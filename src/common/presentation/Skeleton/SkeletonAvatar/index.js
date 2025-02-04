import React from 'react'
import PropTypes from 'prop-types'

const SkeletonAvatar = props => {
  const { width, height, color } = props
  return (
    <div className='flex items-center animate-pulse'>
      <svg className={`${width} ${height} ${color}`} aria-hidden='true' fill='currentColor' viewBox='0 0 20 20'>
        <path fillRule='evenodd'
              d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z'
              clipRule='evenodd'></path>
      </svg>
    </div>
  )
}

SkeletonAvatar.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
  color: PropTypes.string
}

SkeletonAvatar.defaultProps = {
  width: 'w-14',
  height: 'h-14',
  color: 'text-gray-200'
}


export default SkeletonAvatar
