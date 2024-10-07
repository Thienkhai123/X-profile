import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkillJob from 'common/presentation/Pages/Profile-Company/SkillsJob'
import PropressBarJob from 'common/presentation/Pages/Profile-Company/PropressBarJob'

const SkillAdvenced = (props) => {
  const {
    skillNecessary,
    roleId = 0,
    title = '',
    description = '',
    imageBoss
  } = props
  const [tooltip, setTooltip] = useState(0)

  return (
    <div className="xl:w-[1140px]">
      <div className="">
        <div className="mb-14">
          <SkillJob title={title} description={description} />
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1  gap-x-14 md:gap-y-8 gap-y-4 ">
          {Array.from(skillNecessary)?.map((element, ind) => {
            const {
              name,
              percentage,
              skillMatchingPercentage,
              departmentPositionSkillId
            } = element
            return (
              <div key={ind}>
                <PropressBarJob
                  background={roleId === 1 ? 'bg-button' : 'bg-pink-dark'}
                  title={name}
                  percentValue={percentage}
                  tooltip={tooltip}
                  setTooltip={setTooltip}
                  skillMatchingPercentage={skillMatchingPercentage}
                  roleId={roleId}
                  ind={ind}
                  id={departmentPositionSkillId}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

SkillAdvenced.propTypes = {
  imageBoss: PropTypes.string,
  skillNecessary: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      percentage: PropTypes.number,
      skillMatchingPercentage: PropTypes.number
    })
  )
}
SkillAdvenced.defaultProps = {
  imageBoss: '/images/bearBossDepartment.webp',
  skillNecessary: []
}

export default SkillAdvenced
