import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkillJob from 'common/presentation/Pages/Profile-Company/SkillsJob'
import PropressBarJob from 'common/presentation/Pages/Profile-Company/PropressBarJob'

const SkillSoft = (props) => {
  const {
    skillProfessional,
    roleId = 0,
    title = '',
    description = '',
    imageRole0,
    imageRole1,
    onClickDelete = () => {}
  } = props
  const [tooltip, setTooltip] = useState(0)
  return (
    <div className="xl:w-[1140px]">
      <div className="">
        <div className="md:block hidden mb-14">
          <SkillJob title={title} description={description} />
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1  gap-x-14 md:gap-y-8 gap-y-4">
          {Array?.from(skillProfessional)?.map((element, ind) => {
            const { name, percentage, skillMatchingPercentage } = element || {}
            return (
              <div key={ind}>
                <PropressBarJob
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                  ind={ind}
                  title={name}
                  skillMatchingPercentage={skillMatchingPercentage}
                  percentValue={percentage}
                  background={roleId === 1 ? 'bg-yellow-main' : 'bg-pink-dark'}
                  id={element?.departmentPositionSkillId}
                  roleId={roleId}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

SkillSoft.propTypes = {
  imageRole0: PropTypes.string,
  imageRole1: PropTypes.string,
  skillProfessional: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number,
      skillMatchingPercentage: PropTypes.number
    })
  )
}
SkillSoft.defaultProps = {
  imageRole0: '/images/mouseDepartment.png',
  imageRole1: '/images/sheepDepartment.png',
  skillProfessional: []
}

export default SkillSoft
