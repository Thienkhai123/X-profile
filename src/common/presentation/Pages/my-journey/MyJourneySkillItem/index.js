import BadgeBearSkill from 'common/presentation/BadgeBearSkill'
import BadgeBearSkillTippy from 'common/presentation/BadgeBearSkillTippy'
import BadgeMouseSkill from 'common/presentation/BadgeMoueseSkill'
import BadgeSheepSkill from 'common/presentation/BadgeSheepSkill'
import BadgeTestSkillTippy from 'common/presentation/BadgeTestSkillTippy'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import BadgeSheepSkillTippy from '../../../BadgeSheepSkillTippy'
import BadgeMoueseSkillTippy from '../../../BadgeMoueseSkillTippy'

const MyJourneySkillItem = (props) => {
  const {
    percentValue = 60,
    skillName = '',
    handleExam = () => {},
    skillId
  } = props
  const commonProps = {
    classNameButton:
      'h-10 w-10 rounded-full xl:bg-blue-light-opacity hover:bg-button duration-200 cursor-pointer flex items-center justify-center',
    persent: percentValue,
    title: '',
    showIcon: true,
    description: `(Bạn đang đạt ${percentValue}% ở cấp độ cơ bản)`,
    nameIcon: 'notes',
    iconWidth: '20',
    iconHeight: '20'
  }
  return (
    <Fragment>
      <div className="md:block hidden">
        <p className="xl:text-p18 text-p14 mt-4">{skillName}</p>
        <div className="flex justify-start items-center gap-4">
          <div className=" max-w-[537px] w-full h-2  bg-blue-light-opacity rounded-full transition-all  flex items-center">
            <div
              className={`${
                percentValue > 61
                  ? 'bg-blue-light'
                  : percentValue > 31
                  ? 'bg-button'
                  : 'bg-pink-dark'
              } transition-all xl:text-p16 text-p14  text-neutral text-center  rounded-full h-2`}
              style={{
                width: `${percentValue}%`
              }}
            ></div>
          </div>
          {percentValue === 0 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeTestSkillTippy {...commonProps} />
            </div>
          ) : percentValue <= 30 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeSheepSkill {...commonProps} />
            </div>
          ) : percentValue <= 60 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeMouseSkill {...commonProps} />
            </div>
          ) : (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeBearSkillTippy {...commonProps} />
            </div>
          )}
        </div>
      </div>
      <div className="md:hidden">
        <div className="flex items-center justify-between mt-4">
          <p className="xl:text-p18 text-p14 ">{skillName}</p>
          {percentValue > 0 && (
            <p className="text-p14 text-grey-1 mr-14">{percentValue}%</p>
          )}
        </div>
        <div className="flex justify-start items-center gap-4">
          <div className=" max-w-[537px] w-full h-2  bg-blue-light-opacity rounded-full transition-all  flex items-center">
            <div
              className={`${
                percentValue > 61
                  ? 'bg-blue-light'
                  : percentValue > 31
                  ? 'bg-button'
                  : 'bg-pink-dark'
              } transition-all xl:text-p16 text-p14  text-neutral text-center  rounded-full h-2`}
              style={{
                width: `${percentValue}%`
              }}
            ></div>
          </div>
          {percentValue === 0 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeTestSkillTippy {...commonProps} />
            </div>
          ) : percentValue <= 30 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeSheepSkillTippy {...commonProps} />
            </div>
          ) : percentValue <= 60 ? (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeMoueseSkillTippy {...commonProps} />
            </div>
          ) : (
            <div onClick={() => handleExam(skillId)} className="rounded-full">
              <BadgeBearSkillTippy {...commonProps} />
            </div>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default MyJourneySkillItem
MyJourneySkillItem.propTypes = {
  percentValue: PropTypes.number,
  skillName: PropTypes.string,
  currentRole: PropTypes.string
}
MyJourneySkillItem.defaultProps = {
  percentValue: 60,
  skillName: '',
  currentRole: '1'
}
