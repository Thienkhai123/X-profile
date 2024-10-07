import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ProgressSkill from 'common/presentation/Pages/Profile-Company/ProgressSkill'
import WrapperSkillItemTippy from 'common/presentation/WrapperSkillItemTippy'
import XProfileIcon from 'common/presentation/Icons'

const PropressBarJob = (props) => {
  const {
    title,
    percentValue,
    background,
    description,
    roleId,
    ind,
    tooltip,
    setTooltip = () => {},
    skillMatchingPercentage,
    handleDoExam = () => {},
    canDoExam = false,
    skillId = 0,
    userScore = 0,
    showUserScore = false
  } = props
  const renderLevelSkill = (percentValue) => {
    if (percentValue <= 30) {
      return 'Cơ bản'
    } else if (percentValue <= 60) {
      return 'Trung bình'
    } else {
      return 'Cao'
    }
  }

  return (
    <div>
      <p className="md:hidden sm:text-p16 leading-7 text-p14 text-right pr-12  text-grey-1 whitespace-nowrap">
        {renderLevelSkill(percentValue)}
      </p>
      <div className="flex justify-between items-center relative">
        <div className="mb-[4px] w-full grid grid-cols-2 gap-6 mb:gap-0">
          <div className="flex flex-wrap">
            <div className="mr-[8px]">
              <p className="text-p14 md:text-p16-bold text-neutral">{title}</p>
            </div>
            {/* <div className="flex mb-[4px] relative ">
            <div
              className="flex items-center  mr-[4px] cursor-pointer"
              onMouseMove={() => setTooltip(ind)}
              onMouseLeave={() => setTooltip()}
              onClick={() => {
                if (canDoExam) {
                  handleDoExam(skillId)
                }
              }}
            >
              {roleId === 1 ? (
                <XProfileIcon
                  name="researchBook"
                  fill={`${
                    tooltip === ind
                      ? 'rgba(236, 51, 51, 1) '
                      : 'rgba(102, 102, 102, 1)'
                  }`}
                />
              ) : (
                <XProfileIcon
                  name="researchBook"
                  fill={`${
                    tooltip === ind
                      ? 'rgba(246, 187, 58, 1) '
                      : 'rgba(102, 102, 102, 1)'
                  }`}
                />
              )}
            </div>
            <div className="xl:absolute left-[100%] z-[100]">
              <div
                className={`${
                  tooltip === ind
                    ? 'opacity-100 duration-300'
                    : 'opacity-0 duration-300'
                } relative hidden sm:block`}
              >
                <XProfileIcon
                  name="processbarTooltip"
                  fill={
                    roleId === 1
                      ? 'rgba(246, 187, 58, 1)'
                      : 'rgba(245, 193, 179, 1)'
                  }
                />
                <div className="absolute  top-[5%] left-[10%]">
                  <p className="sm:text-p14 text-p12 text-neutral">
                    {description}
                  </p>
                </div>
              </div>
              <div
                className={`${
                  tooltip === ind
                    ? 'opacity-100 duration-300'
                    : 'opacity-0 duration-300'
                } relative block sm:hidden`}
              >
                <XProfileIcon
                  name="processbarTooltip"
                  width="170"
                  fill={
                    roleId === 1
                      ? 'rgba(246, 187, 58, 1)'
                      : 'rgba(245, 193, 179, 1)'
                  }
                />
                <div className="absolute  top-[5%] left-[10%]">
                  <p className="sm:text-p14 text-p12 text-neutral">
                    {description}
                  </p>
                </div>
              </div>
            </div>
          </div> */}
          </div>
          <div className="w-full h-full md:grid flex grid-cols-2 items-center gap-6 ">
            <ProgressSkill
              percentValue={percentValue}
              userPercent={userScore}
              showUserScore={showUserScore}
            />

            <div className="flex items-center justify-between">
              <p className="md:block hidden sm:text-p16 leading-7 text-p12  text-grey-1 whitespace-nowrap">
                {renderLevelSkill(percentValue)}
              </p>
              <div onClick={() => handleDoExam(skillId)}>
                <WrapperSkillItemTippy
                  classNameButton="h-5 w-5  duration-200 cursor-pointer flex items-center justify-center"
                  percent={userScore}
                  title=""
                  showIcon={true}
                  showSuccessIcon={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

PropressBarJob.propTypes = {
  title: PropTypes.string,
  percentValue: PropTypes.number,
  background: PropTypes.string,
  roleId: PropTypes.number,
  description: PropTypes.string,
  skillMatchingPercentage: PropTypes.number
}
PropressBarJob.defaultProps = {
  title: 'Communication',
  percentValue: 50,
  background: '',
  roleId: 0,
  description: 'Kiểm tra mức độ phù hợp',
  skillMatchingPercentage: 0
}

export default PropressBarJob
