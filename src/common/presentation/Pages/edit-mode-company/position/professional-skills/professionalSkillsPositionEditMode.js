import useTrans from 'common/hooks/useTrans'
import SkillAdvanceEdit from 'common/presentation/Pages/Profile-Company/SkillAdvancedEdit'

const ProfessionalSkillsPositionEditMode = ({
  roleId = 1,
  skillList = [],
  companySkillIds = [],
  onClickSave = () => {},
  onClickSaveSkill = () => {},
  errors,
  handleResetErrors
}) => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans || {}

  return (
    <div className="flex justify-center xl:py-[52px]  xl:px-0  px-5 py-10 bg-blue-light-opacity">
      <SkillAdvanceEdit
        errors={errors}
        handleResetErrors={handleResetErrors}
        imageBoss="/images/Edit/hard_skill.png"
        title={PROFILE_COMPANY?.jobDetail?.titleAdvancedSkillsJob}
        description={PROFILE_COMPANY?.jobDetail?.descriptionAdvancedSkillsJob}
        skillList={skillList}
        companySkillIds={companySkillIds}
        onClickSave={onClickSave}
        onClickSaveSkill={onClickSaveSkill}
      />
    </div>
  )
}

export default ProfessionalSkillsPositionEditMode
