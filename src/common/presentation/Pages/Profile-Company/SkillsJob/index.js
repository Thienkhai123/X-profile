import React from 'react'
import PropTypes from 'prop-types'

const SkillJob = (props) => {
  const { title, description } = props
  return (
    <div>
      <div className="w-auto mb-2 text-center xl:text-start">
        <p className=" sm:text-h2 text-p18-bold text-neutral">{title}</p>
      </div>
      <div className="w-auto text-center xl:text-start max-w-[636px]">
        <p className=" sm:text-p18 text-p14 md:text-neutral text-grey-1">
          {description}
        </p>
      </div>
    </div>
  )
}

SkillJob.propTypes = { title: PropTypes.string, description: PropTypes.string }
SkillJob.defaultProps = {
  title: 'Kỹ năng chung cần thiết',
  description:
    'These are the most common general skills listed in job postings for Salesforce Business Analyst roles.'
}

export default SkillJob
