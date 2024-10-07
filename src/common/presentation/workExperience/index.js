import React from 'react'
import PropTypes from 'prop-types'

const WorkExperience = (props) => {
  const {
    skillName = 'UI/UX Designer',
    company = 'Công ty ABC',
    description = 'a',
    time = '04/2023 - Hiện tại'
  } = props
  return (
    <div className="flex flex-col justify-center gap-[8px] w-full">
      <div className="flex justify-between w-full items-center">
        <div>
          <p className="text-p20-bold text-neutral">{skillName}</p>
        </div>
        <div>
          <p className="text-p16 text-neutral">{time}</p>
        </div>
      </div>
      <div>
        <p className="text-p18 text-neutral">{company}</p>
      </div>
      <div>
        <p className="text-p16 text-grey-1">{description}</p>
      </div>
    </div>
  )
}

WorkExperience.propTypes = {}
WorkExperience.defaultProps = {}

export default WorkExperience
