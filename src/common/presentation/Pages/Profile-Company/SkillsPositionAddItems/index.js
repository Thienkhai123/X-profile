import useOnClickOutside from 'common/hooks/useClickOutSide'
import useModal from 'common/hooks/useModal'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Modal from 'common/presentation/Modal'
import { Fragment, useEffect, useRef, useState } from 'react'
import SkillPositionAddItemsModalContent from './skillPositionAddItemsModalContent'
import cloneDeep from 'lodash/cloneDeep'
import SelectedItem from '../../Jobs/SelectedItem'

const SkillsPositionAddItems = ({
  skillList = [],
  companySkillIds = [],
  titleModal = 'Kỹ năng',
  handleUpdate = () => {},
  handleUpdateAdvance = () => {},
  onClickSaveSkill = () => {},
  onClickSaveSkillAdvance = () => {},
  handleResetErrors = () => {},
  isError,
  errors,
  type = 0,
  id
}) => {
  const refOpt = useRef(null)
  const inputRef = useRef(null)
  const [openModal, toggleModal] = useModal()
  const [openAddModal, toggleAddModal] = useModal()
  const [showOpt, setShowOpt] = useState(false)
  const [options, setOptions] = useState([])
  const [optionsNewSkill, setOptionsNewSkill] = useState([])
  const [queryText, setQueryText] = useState('')
  const [newSkills, setNewSkills] = useState([])
  const [selectedSkill, setSelectedSkill] = useState([])

  const [selectedSkillId, setSelectedSkillId] = useState(null)

  const querySkillByName = (val) => {
    const tempArrSkill = [...skillList]
    const tempArrNewSkill = [...newSkills]
    const tempName = companySkillIds?.map((el) => el?.name)
    const tempNameArr = []

    tempArrSkill?.map((el) => {
      if (!tempName.includes(el?.name)) {
        tempNameArr.push(el)
      }
    })

    const filterSkills = tempNameArr?.filter((skill) => {
      if (skill?.name?.toLowerCase()?.includes(val?.toLowerCase())) {
        return skill
      }
    })

    const filterNewSkills = tempArrNewSkill?.filter((skill) =>
      skill?.name?.toLowerCase().includes(val?.toLowerCase())
    )

    setQueryText(val)
    setOptions([...filterSkills])
    setOptionsNewSkill([...filterNewSkills])
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }

  const handleSelectSkill = (id, name) => {
    const indexEl = selectedSkill?.findIndex((option) => option?.skillId === id)
    if (indexEl !== -1) {
      removeSelectedSkill(id)
    } else {
      setSelectedSkill([
        ...selectedSkill,
        {
          skillId: id,
          type: type,
          passScore: 0,
          percentage: 0,
          name: name,
          isCreate: true,
          departmentPositionSkillId: 0
        }
      ])

      if (type === 0) {
        handleUpdate([
          ...selectedSkill,
          {
            skillId: id,
            type: type,
            passScore: 0,
            percentage: 0,
            name: name,
            isCreate: true,
            departmentPositionSkillId: 0
          }
        ])
      }
      if (type === 1) {
        handleUpdateAdvance([
          ...selectedSkill,
          {
            skillId: id,
            type: type,
            passScore: 0,
            percentage: 0,
            name: name,
            isCreate: true,
            departmentPositionSkillId: 0
          }
        ])
      }
      handleCloseOpt()
    }
  }

  const removeSelectedSkill = (id) => {
    const indexEl = selectedSkill?.findIndex((option) => option?.skillId === id)
    if (indexEl !== -1) {
      const cloneSelectedSkill = cloneDeep(selectedSkill)
      cloneSelectedSkill?.splice(indexEl, 1)
      setSelectedSkill([...cloneSelectedSkill])
      handleUpdate([...cloneSelectedSkill])
    }
  }

  const handleAddSkill = (data) => {
    setSelectedSkill([])
    if (type === 0) {
      onClickSaveSkill()
    }
    if (type === 1) {
      onClickSaveSkillAdvance()
    }
    toggleModal()
  }

  const handleAddNewSkillToOption = (data, skillId) => {
    const tempArr = cloneDeep(options)
    const tempId = newSkills?.length + 1
    const newItem = {
      ...data,
      passScore: data.passScore,
      percentage: data.passScore,
      type: type,
      skillId: `new-skill-${tempId}`,
      isCreate: true,
      departmentPositionSkillId: 0,
      isDisplayChart: data.isDisplayChart
    }
    tempArr.push(newItem)

    setSelectedSkill([...selectedSkill, newItem])
    if (type === 0) {
      handleUpdate([...selectedSkill, newItem])
    }
    if (type === 1) {
      handleUpdateAdvance([...selectedSkill, newItem])
    }
    toggleAddModal()
  }

  const handleClickCreateNewSkill = () => {
    handleResetErrors(id)
    setSelectedSkill([])
    handleCloseOpt()
    toggleModal()
  }

  useEffect(() => {
    if (skillList?.length > 0) {
      const cloneSkillList = cloneDeep(skillList)
      setOptions([...cloneSkillList])
    }
    if (companySkillIds?.length > 0) {
      const cloneCompanySkillIds = cloneDeep(companySkillIds)
      const tempIds = companySkillIds?.map((el) => el?.skillId)
      const tempName = companySkillIds?.map((el) => el?.name)
      const tempArr = []
      const tempNameArr = []
      skillList?.map((el) => {
        if (!tempIds.includes(el?.skillId)) {
          tempArr.push(el)
        }
      })
      skillList?.map((el) => {
        if (!tempName.includes(el?.name)) {
          tempNameArr.push(el)
        }
      })
      // setSelectedSkillId([...cloneCompanySkillIds])
      setOptions([...tempNameArr])
    }
  }, [companySkillIds])

  useOnClickOutside(refOpt, handleCloseOpt)
  return (
    <Fragment>
      {isError && (
        <p className="text-p16 text-start text-semantic-red h-[24px]">
          Bạn phải thêm ít nhất một kỹ năng
        </p>
      )}
      <div className="rounded-[5px] py-3 flex flex-col mt-[20px]">
        <div
          className="flex justify-start gap-[12px] items-center cursor-pointer w-[222px] "
          onClick={() => handleClickCreateNewSkill()}
        >
          <XProfileIcon name="add" width="16" height="16" stroke="#294F9B" />
          <p className="sm:text-p18-bold text-p16 text-button-2">
            Thêm kỹ năng
          </p>
        </div>
      </div>

      <Modal
        toggleModal={handleClickCreateNewSkill}
        open={openModal}
        title={titleModal}
        styleTitle="text-p28-bold text-neutral"
      >
        <SkillPositionAddItemsModalContent
          skillId={selectedSkillId?.id}
          toggleModal={toggleModal}
          titleModal={titleModal}
          name={selectedSkillId?.name || ''}
          handleAddNewSkillToOption={handleAddNewSkillToOption}
          refOpt={refOpt}
          inputRef={inputRef}
          showOpt={showOpt}
          selectedSkill={selectedSkill}
          setShowOpt={setShowOpt}
          options={options}
          companySkillIds={companySkillIds}
          optionsNewSkillb={optionsNewSkill}
          handleSelectSkill={handleSelectSkill}
          querySkillByName={querySkillByName}
          removeSelectedSkill={removeSelectedSkill}
          setSelectedSkill={setSelectedSkill}
          handleAddSkill={handleAddSkill}
          openAddModal={openAddModal}
          toggleAddModal={toggleAddModal}
        />
      </Modal>
    </Fragment>
  )
}

export default SkillsPositionAddItems
