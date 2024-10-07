import BlockEditorContainer from 'common/container/block-editor'
import SoftSkillsPositionViewMode from './softSkillsPositionViewMode'
import SoftSkillsPositionEditMode from './softSkillsPositionEditMode'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  getAllSkillPostionSoftSkill,
  getAllSoftSkillPositionV2,
  getProfilePostionSoftSkill,
  selectSkillCompanySoftSkillPosition,
  selectSkillListSoftSkillPosition,
  updateCompanySkills
} from 'store/app/edit-mode-company/position/softSkillSlice'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const SoftlSkillsPositionEdit = (props) => {
  const { pageEditMode, handleResetErrors, errors } = props
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { departmentPositionId } = query || {}
  const skillList = useSelector(selectSkillListSoftSkillPosition)
  const companySkills = useSelector(selectSkillCompanySoftSkillPosition)
  const [selectedSkill, setSelectedSkill] = useState()
  const handleUpdateSkills = (list = []) => {
    setSelectedSkill(list)
  }

  const onClickSave = async () => {
    const listPayload = []
    selectedSkill?.map((skill) => {
      listPayload.push({
        ...skill,
        skillId: skill?.skillId?.toString()?.includes('new-skill-')
          ? 0
          : skill?.skillId || 0
      })
    })
    dispatch(updateCompanySkills([...companySkills, ...listPayload]))
    setSelectedSkill([])
  }

  useEffect(() => {
    if (departmentPositionId) {
      dispatch(getAllSoftSkillPositionV2({ departmentPositionId }))
      dispatch(getAllSkillPostionSoftSkill({ type: 0 }))
      dispatch(
        getProfilePostionSoftSkill({
          departmentPositionId
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentPositionId])
  return (
    <div className="bg-yellow-bg">
      <BlockEditorContainer
        editmode={pageEditMode}
        editState={
          <SoftSkillsPositionEditMode
            skillList={skillList}
            errors={errors}
            handleResetErrors={handleResetErrors}
            companySkillIds={companySkills || []}
            onClickSave={handleUpdateSkills}
            onClickSaveSkill={onClickSave}
          />
        }
        viewState={<SoftSkillsPositionViewMode skills={companySkills || []} />}
      />
    </div>
  )
}

export default SoftlSkillsPositionEdit
