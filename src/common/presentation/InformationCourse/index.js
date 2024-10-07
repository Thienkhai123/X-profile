import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'

const InformationCourse = (props) => {
  const { title, description, name = 'starProductGuid' } = props
  return (
    <div className="w-[380px] flex gap-[24px] justify-center">
      <div className="h-[56px] w-[56px] rounded-[24px] flex justify-center items-center border border-grey-4">
        <XProfileIcon name={name} />
      </div>
      <div className="flex flex-col gap-[4px] min-w-[188px] max-w-[210px]">
        <p className="text-p16-bold leading-[28px] text-black">{title}</p>
        <p className="text-p16 leading-[28px] text-black">{description}</p>
      </div>
    </div>
  )
}

InformationCourse.propTypes = {
  title: PropTypes.string,
  description: PropTypes.any
}
InformationCourse.defaultProps = {
  title: 'Giảng viên',
  description: ''
}

export default InformationCourse
