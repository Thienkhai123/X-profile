import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const Trend = (props) => {
  const { title, description, src, showIcon } = props
  return (
    <div>
      <div className="flex justify-center mb-[20px]">
        <Image width={56} height={56} src={src} alt="" />
      </div>
      <div className="text-center">
        <p className="sm:text-p16 text-p12 text-grey-1 font-normal">{title}</p>
      </div>
      <div className="flex items-center justify-center gap-[8px]">
        {showIcon && (
          <div className="-rotate-90	">
            <XProfileIcon name="arrowVector" />
          </div>
        )}
        <p className="text-p18-bold text-blue-boild text-center">
          {description}
        </p>
      </div>
    </div>
  )
}

Trend.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  src: PropTypes.string,
  showIcon: PropTypes.bool
}
Trend.defaultProps = {
  title: '',
  description: '',
  src: '',
  showIcon: false
}

export default Trend
