import useTrans from 'common/hooks/useTrans'
import SkillAdvenced from 'common/presentation/Pages/Profile-Company/SkillAdvanced'
import SkillSoft from './SkillSoft'

const SoftSkillsPositionViewMode = ({ roleId = 1, skills = [] }) => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans || {}

  return (
    <div
      className={`flex justify-center xl:py-[52px]  xl:px-0  px-5 py-10 ${
        roleId === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
      }`}
    >
      <SkillSoft
        imageRole0="/images/Edit/soft_skill.png"
        imageRole1="/images/Edit/soft_skill.png"
        title={PROFILE_COMPANY?.jobDetail?.titleGenaralSkillsJob}
        description={PROFILE_COMPANY?.jobDetail?.descriptionGenaralSkillsJob}
        PROFILE_COMPANY={PROFILE_COMPANY}
        skillProfessional={skills}
      />
    </div>
  )
}

export default SoftSkillsPositionViewMode
