import React, { useState } from 'react'
import PropTypes from 'prop-types'
import PropressBarJob from '../PropressBarJob'
import SkillJob from '../SkillsJob'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import { selectUserSkill } from 'store/app/portfolioSlice'
import XProfileIcon from 'common/presentation/Icons'

const SkillSoft = (props) => {
  const {
    skillProfessional,
    roleId = 0,
    title = '',
    description = '',
    imageRole0,
    imageRole1,
    handleDoExam = () => {},
    canDoExam = false
  } = props
  const userSkills = useSelector(selectUserSkill) || {}
  const [tooltip, setTooltip] = useState(0)
  const [checked, setChecked] = useState(false)
  const handleClickToggle = () => {
    setChecked(!checked)
  }
  const countUserSkillMatching = () => {
    let result = []
    result = skillProfessional?.filter((el) =>
      userSkills?.some(
        (el1) => el1?.skillId === el?.skillId && el?.percentage > 0
      )
    )
    return result.length
  }

  return (
    <div className="xl:w-[1140px]">
      <div className="">
        <div className="flex xl:flex-row flex-col gap-6 xl:gap-0 md:mb-14 mb-6 xl:items-start items-center justify-center md:justify-between">
          <SkillJob title={title} description={description} />
          {countUserSkillMatching() > 0 ? (
            <div className="md:py-4 py-2 md:px-14 px-4 w-full md:w-fit  bg-white rounded-2xl flex items-center justify-center gap-4">
              <p className="md:text-p16 text-p14 leading-7 text-black">
                {`Bạn có ${countUserSkillMatching()}/${
                  skillProfessional?.filter((el) => el.percentage > 0)?.length
                } kỹ năng phù hợp`}
              </p>
              <div>
                <label className="relative  items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={checked}
                    className="sr-only peer"
                    onChange={(e) => {
                      handleClickToggle()
                    }}
                  />
                  <div className="w-12 h-7 bg-grey-3 dark:bg-grey-3 peer-focus:outline-none  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] peer-checked:after:-left-[2px] after:bg-white  after:rounded-full after:h-6 after:w-6 after:transition-all dark:border-gray-600 peer-checked:bg-button"></div>
                </label>
              </div>
            </div>
          ) : (
            <div className="py-4 md:px-14 px-4 w-full md:w-fit bg-white rounded-2xl flex flex-col items-center justify-center md:gap-2">
              <div className="flex items-center gap-4">
                <XProfileIcon name="sadCircle" />
                <p className="md:text-p16 text-p14 md:leading-7 leading-[26px] text-black">
                  Bạn chưa có kỹ năng nào phù hợp
                </p>
              </div>
              <p className="text-p14 leading-[26px] text-grey-1 text-center max-w-[200px] md:max-w-none">
                Gợi ý: Hãy làm bài test để nâng cao kỹ năng nhé
              </p>
            </div>
          )}
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1  gap-x-14 md:gap-y-8 gap-y-4">
          {Array?.from(
            skillProfessional?.filter((el) => el?.percentage > 0)
          )?.map((element, ind) => {
            const { name, percentage, skillMatchingPercentage, skillId } =
              element || {}
            const findExisSkill = userSkills?.find(
              (el) => el?.skillId === skillId
            )
            if (percentage > 0) {
              return (
                <div key={ind}>
                  <PropressBarJob
                    tooltip={tooltip}
                    setTooltip={setTooltip}
                    ind={ind}
                    title={name}
                    skillMatchingPercentage={skillMatchingPercentage}
                    userScore={findExisSkill?.percentageComplete || 0}
                    percentValue={percentage}
                    showUserScore={checked}
                    background={
                      roleId === 1 ? 'bg-yellow-main' : 'bg-pink-dark'
                    }
                    roleId={roleId}
                    handleDoExam={handleDoExam}
                    canDoExam={canDoExam}
                    skillId={skillId}
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
  imageRole0: '/images/sheepDepartment.png',
  imageRole1: '/images/mouseDepartment.png',
  skillProfessional: []
}

export default SkillSoft
