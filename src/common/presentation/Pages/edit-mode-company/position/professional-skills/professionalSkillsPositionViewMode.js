import useTrans from 'common/hooks/useTrans'
import SkillAdvenced from './SkillAdvanced'

const ProfessionalSkillsPositionViewMode = ({ skills = [] }) => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans || {}

  return (
    <div className="flex justify-center xl:py-[52px]  xl:px-0  px-5 py-10 bg-blue-light-opacity">
      <SkillAdvenced
        imageBoss="/images/Edit/hard_skill.png"
        title={PROFILE_COMPANY?.jobDetail?.titleAdvancedSkillsJob}
        description={PROFILE_COMPANY?.jobDetail?.descriptionAdvancedSkillsJob}
        skillNecessary={skills}
      />
    </div>
  )
}

export default ProfessionalSkillsPositionViewMode
