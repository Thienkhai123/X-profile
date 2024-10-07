import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PropressBarJob from '../PropressBarJob'
import SkillJob from '../SkillsJob'
import Image from 'next/image'

const SkillSoftViewmode = (props) => {
  const {
    skillProfessional,
    roleId = 0,
    title = '',
    description = '',
    imageRole0,
    imageRole1
  } = props
  const [tooltip, setTooltip] = useState(0)
  return (
    <div className="xl:flex xl:flex-wrap xl:justify-between xl:w-[1140px]">
      <div className="md:hidden block mb-[20px]">
        <SkillJob title={title} description={description} />
      </div>
      {roleId === 1 ? (
        <div className="md:w-auto w-[56.53vw] md:h-auto h-[56vw] mx-auto">
          <Image
            width={455}
            height={440}
            src={imageRole1}
            alt=""
            quality={100}
          />
        </div>
      ) : (
        <div className="md:w-auto w-[56.53vw] md:h-auto h-[56vw] mx-auto">
          <Image
            width={434.32}
            height={386}
            src={imageRole0}
            alt=""
            quality={100}
          />
        </div>
      )}
      <div className="xl:w-[570px]">
        <div className="md:block hidden mb-[20px]">
          <SkillJob title={title} description={description} />
        </div>
        <div className="grid grid-flow-row gap-[24px]">
          {Array?.from(
            skillProfessional?.filter((el) => el?.percentage > 0)
          )?.map((element, ind) => {
            const { name, percentage, skillMatchingPercentage } = element || {}
            if (percentage > 0) {
              return (
                <div key={ind}>
                  <PropressBarJob
                    tooltip={tooltip}
                    setTooltip={setTooltip}
                    ind={ind}
                    title={name}
                    skillMatchingPercentage={skillMatchingPercentage}
                    percentValue={percentage}
                    background={
                      roleId === 1 ? 'bg-yellow-main' : 'bg-pink-dark'
                    }
                    roleId={roleId}
                  />
                </div>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

SkillSoftViewmode.propTypes = {
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
SkillSoftViewmode.defaultProps = {
  imageRole0: '/images/mouseDepartment.png',
  imageRole1: '/images/sheepDepartment.png',
  skillProfessional: []
}

export default SkillSoftViewmode
