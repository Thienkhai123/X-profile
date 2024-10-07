import useEditMode from 'common/hooks/useEditMode'
import ProfessionalSkillsPositionViewMode from './professionalSkillsPositionViewMode'
import ProfessionalSkillsPositionEditMode from './professionalSkillsPositionEditMode'
import BlockEditorContainer from 'common/container/block-editor'
import { useEffect, useState } from 'react'
import {
  getAllProfessionalSkillPositionV2,
  getProfessionalSkillPositionV2,
  getProfilePostionProfessionalSkill,
  savePositionProfessionalSkillEdit,
  selectProfileProfessionalSkillPosition,
  selectSkillListProfessionalSkillPosition,
  selectSkillListProfessionalSkillPositionExist,
  updateCompanyProfessionalSkills
} from 'store/app/edit-mode-company/position/professionalSkillSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { selectSkillCompanySoftSkillPosition } from 'store/app/edit-mode-company/position/softSkillSlice'

const ProfessionalSkillsPositionEdit = (props) => {
  const { pageEditMode, errors, handleResetErrors } = props
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { departmentPositionId, companyId } = query || {}
  const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const skillList = useSelector(selectSkillListProfessionalSkillPosition)
  const companySkills = useSelector(
    selectSkillListProfessionalSkillPositionExist
  )
  const profile = useSelector(selectProfileProfessionalSkillPosition)
  const softSkills = useSelector(selectSkillCompanySoftSkillPosition)
  const [selectedSkill, setSelectedSkill] = useState()

  const handleUpdateSkills = (list = []) => {
    setSelectedSkill(list)
  }

  const onClickEdit = () => {
    // ... add function here
    handleShowEditMode()
  }

  const onClickCancel = () => {
    // ... add function here
    handleShowViewMode()
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
    dispatch(
      updateCompanyProfessionalSkills([...companySkills, ...listPayload])
    )
    setSelectedSkill([])
  }

  const onClickOutSide = () => {
    // ... add function or logical here
    onClickSave()
  }

  useEffect(() => {
    if (departmentPositionId) {
      dispatch(getProfessionalSkillPositionV2({ departmentPositionId }))
      dispatch(getAllProfessionalSkillPositionV2({ type: 1 }))
      dispatch(
        getProfilePostionProfessionalSkill({
          departmentPositionId
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentPositionId])

  return (
    <div className="bg-blue-light-opacity">
      <BlockEditorContainer
        editmode={pageEditMode}
        editState={
          <ProfessionalSkillsPositionEditMode
            errors={errors}
            handleResetErrors={handleResetErrors}
            skillList={skillList}
            companySkillIds={companySkills || []}
            onClickSave={handleUpdateSkills}
            onClickSaveSkill={onClickSave}
          />
        }
        viewState={
          <ProfessionalSkillsPositionViewMode skills={companySkills} />
        }
        onClickEdit={onClickEdit}
        onClickCancel={onClickCancel}
      />
    </div>
  )
}

export default ProfessionalSkillsPositionEdit
