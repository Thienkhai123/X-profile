import useTrans from 'common/hooks/useTrans'
import SkillSoftEdit from 'common/presentation/Pages/Profile-Company/SkillSoftEdit'

const SoftSkillsPositionEditMode = ({
  roleId = 1,
  skillList = [],
  companySkillIds = [],
  onClickSave = () => {},
  onClickSaveSkill = () => {},
  handleResetErrors = () => {},
  errors
}) => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans || {}

  return (
    <div
      className={`flex justify-center xl:py-[52px]  xl:px-0  px-5 py-10 ${
        roleId === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
      }`}
    >
      <SkillSoftEdit
        errors={errors}
        handleResetErrors={handleResetErrors}
        imageRole0="/images/Edit/soft_skill.png"
        imageRole1="/images/Edit/soft_skill.png"
        title={PROFILE_COMPANY?.jobDetail?.titleGenaralSkillsJob}
        description={PROFILE_COMPANY?.jobDetail?.descriptionGenaralSkillsJob}
        PROFILE_COMPANY={PROFILE_COMPANY}
        skillList={skillList}
        companySkillIds={companySkillIds}
        onClickSave={onClickSave}
        onClickSaveSkill={onClickSaveSkill}
      />
    </div>
  )
}

export default SoftSkillsPositionEditMode
