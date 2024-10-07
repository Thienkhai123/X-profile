import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkillJob from '../SkillsJob'
import SkillsPositionAddItems from '../SkillsPositionAddItems'
import PropressBarJob from '../../edit-mode-company/position/professional-skills/PropressBarJob'

const btnProps = {
  title: 'Tạo mới',
  margin: 'mt-4',
  background: 'bg-blue-button',
  color: 'text-white',
  width: 'w-[158px]',
  rounded: 'rounded-[8px]',
  padding: 'py-2',
  textWeight: 'sm:text-p18-bold text-p14-bold'
}

const SkillAdvanceEdit = (props) => {
  const {
    roleId = 0,
    title = '',
    description = '',
    imageBoss,
    skillList = [],
    onClickSave = () => {},
    companySkillIds = [],
    onClickSaveSkill = () => {},
    errors,
    handleResetErrors
  } = props
  return (
    <div id="companyProfessionalSkills" className="xl:w-[1140px]">
      <div className="">
        <div className="md:block hidden mb-14">
          <SkillJob title={title} description={description} />
        </div>
        <div className="">
          <div className="grid xl:grid-cols-2 grid-cols-1  gap-x-14 md:gap-y-8 gap-y-4">
            {Array.from(companySkillIds)?.map((element, ind) => {
              const {
                name,
                percentage,
                skillMatchingPercentage,
                departmentPositionSkillId,
                isDisplayChart
              } = element
              return (
                <div key={ind}>
                  <PropressBarJob
                    background={roleId === 1 ? 'bg-button' : 'bg-pink-dark'}
                    title={name}
                    percentValue={percentage}
                    skillMatchingPercentage={skillMatchingPercentage}
                    roleId={roleId}
                    ind={ind}
                    id={departmentPositionSkillId}
                    isDisplayChart={isDisplayChart}
                  />
                </div>
              )
            })}
          </div>
          <SkillsPositionAddItems
            id="companyProfessionalSkills"
            isError={errors?.companyProfessionalSkills}
            errors={errors}
            handleResetErrors={handleResetErrors}
            buttonProps={btnProps}
            hoverBg="bg-blue-hover"
            skillList={skillList}
            titleModal="Kỹ năng chuyên môn"
            type={1}
            handleUpdateAdvance={onClickSave}
            companySkillIds={companySkillIds}
            onClickSaveSkillAdvance={onClickSaveSkill}
          />
        </div>
      </div>
    </div>
  )
}

SkillAdvanceEdit.propTypes = {
  imageBoss: PropTypes.string
}
SkillAdvanceEdit.defaultProps = {
  imageBoss: '/images/bearBossDepartment.webp'
}

export default SkillAdvanceEdit
