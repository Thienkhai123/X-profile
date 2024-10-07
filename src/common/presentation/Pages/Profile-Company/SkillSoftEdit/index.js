import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkillJob from '../SkillsJob'
import SkillsPositionAddItems from '../SkillsPositionAddItems'
import PropressBarJob from '../../edit-mode-company/position/soft-skills/PropressBarJob'

const btnProps = {
  title: 'Tạo mới',
  margin: 'mt-4',
  width: 'w-[158px]',
  rounded: 'rounded-[8px]',
  padding: 'py-2',
  textWeight: 'sm:text-p18-bold text-p14-bold'
}

const SkillSoftEdit = (props) => {
  const {
    roleId = 0,
    title = '',
    description = '',
    imageRole0,
    imageRole1,
    skillList = [],
    onClickSave = () => {},
    companySkillIds = [],
    onClickSaveSkill = () => {},
    handleResetErrors = () => {},
    errors
  } = props
  return (
    <div id="companySoftSkills" className="xl:w-[1140px]">
      <div className="">
        <div className="md:block hidden mb-14">
          <SkillJob title={title} description={description} />
        </div>
        <div className="">
          <div className="grid xl:grid-cols-2 grid-cols-1  gap-x-14 md:gap-y-8 gap-y-4">
            {Array?.from(companySkillIds)?.map((element, ind) => {
              const {
                name,
                percentage,
                skillMatchingPercentage,
                isDisplayChart
              } = element || {}
              return (
                <div key={ind}>
                  <PropressBarJob
                    ind={ind}
                    title={name}
                    skillMatchingPercentage={skillMatchingPercentage}
                    percentValue={percentage}
                    id={element?.departmentPositionSkillId}
                    isDisplayChart={isDisplayChart}
                  />
                </div>
              )
            })}
          </div>
          <SkillsPositionAddItems
            isError={errors?.companySoftSkills}
            id="companySoftSkills"
            errors={errors}
            handleResetErrors={handleResetErrors}
            buttonProps={btnProps}
            skillList={skillList}
            titleModal="Kỹ năng chung"
            type={0}
            handleUpdate={onClickSave}
            companySkillIds={companySkillIds}
            onClickSaveSkill={onClickSaveSkill}
          />
        </div>
      </div>
    </div>
  )
}

SkillSoftEdit.propTypes = {
  imageRole0: PropTypes.string,
  imageRole1: PropTypes.string
}
SkillSoftEdit.defaultProps = {
  imageRole0: '/images/mouseDepartment.png',
  imageRole1: '/images/sheepDepartment.png'
}

export default SkillSoftEdit
