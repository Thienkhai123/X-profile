import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const SubHeaderButton = (props) => {
  const { title = 'Trở về', href = '/' } = props
  return (
    <a href={href}>
      <div className="flex items-center justify-center bg-grey-4 rounded-lg gap-2 py-3 px-8 cursor-pointer max-w-[153px] max-h-[48px]">
        <XProfileIcon name="arrowLeft" />
        <p className="text-neutral text-p18-bold ">{title}</p>
      </div>
    </a>
  )
}

SubHeaderButton.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string
}

export default SubHeaderButton
