import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import { useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import SelectedItem from 'common/presentation/Pages/Jobs/SelectedItem'

const SkillAdding = (props) => {
  const {
    handleCreateItem,
    skillList,
    userSkillIds,
    cancelEdit,
    title = 'Tên kỹ năng chung'
  } = props
  const refOpt = useRef(null)
  const createSkllRef = useRef(null)
  const inputRef = useRef(null)
  const [showOpt, setShowOpt] = useState(false)
  const [selectedSkill, setSelectedSkill] = useState([])
  const [options, setOptions] = useState(skillList)
  const [queryText, setQueryText] = useState('')
  const [newSkills, setNewSkills] = useState([])
  const [errorMessage, setErrorMessage] = useState('')

  const querySkillByName = (val) => {
    const tempArr = [...skillList, ...newSkills]
    const filterSkills = tempArr?.filter((skill) =>
      skill?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setQueryText(val)
    setOptions(filterSkills)
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  useOnClickOutside(refOpt, handleCloseOpt)

  const handleSelectMultipleSkill = (id, name) => {
    const ids = selectedSkill.map((el) => el.skillId)
    if (ids.includes(id)) {
      const existIndex = selectedSkill.findIndex((el) => el.skillId === id)
      const cloneArr = [...selectedSkill]
      cloneArr.splice(existIndex, 1)
      setSelectedSkill([...cloneArr])
    } else {
      setSelectedSkill([...selectedSkill, { skillId: id, value: name }])
    }
    setErrorMessage('')
  }

  const handleAddNewSkillToOption = () => {
    if (queryText !== '') {
      setOptions([...options, { skillId: queryText, name: queryText }])
      setNewSkills([...newSkills, { skillId: queryText, name: queryText }])
    }
  }

  const handleSubmit = () => {
    if (selectedSkill.length > 0) {
      handleCreateItem(selectedSkill)
      setErrorMessage('')
    } else {
      createSkllRef?.current?.scrollIntoView()
      setErrorMessage('Vui lòng chọn kỹ năng bạn nhé!')
    }
  }

  useOnClickOutside(createSkllRef, handleSubmit)

  return (
    <div ref={createSkllRef} className="min-h-[280px]">
      <div>
        <label className="sm:text-p18-bold text-p14-bold">{title}</label>
        <div className="relative" ref={refOpt}>
          <div
            className={`w-full flex justify-between py-[14px] gap-2 px-[24px] items-center border mt-[8px] ${
              showOpt ? 'border-button' : 'border-stoke'
            }`}
            onClick={() => setShowOpt(true)}
          >
            <input
              placeholder="Chọn kỹ năng"
              className="outline-0 text-p16 text-card-title w-full"
              ref={inputRef}
              onChange={(e) => querySkillByName(e.target.value)}
            />
            <XProfileIcon name="arrowDown" />
          </div>
          {showOpt && (
            <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10">
              {options?.map((skill) => {
                const { skillId, name } = skill
                if (!userSkillIds.includes(skillId)) {
                  const ids = selectedSkill.map((el) => el.skillId)
                  return (
                    <div
                      key={skillId}
                      className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                      onClick={() => handleSelectMultipleSkill(skillId, name)}
                    >
                      <p>{name}</p>
                      {ids.includes(skillId) && <XProfileIcon name="check" />}
                    </div>
                  )
                }
              })}
              {options?.length === 0 && queryText !== '' && (
                <div
                  className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                  onClick={() => handleAddNewSkillToOption()}
                >
                  <p>Thêm kỹ năng này</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="my-[12px] flex gap-2 flex-wrap">
        {selectedSkill?.map((skill) => {
          const { skillId, value } = skill
          return (
            <SelectedItem
              key={`selected-${skillId}`}
              id={skillId}
              name={value}
              handleRemoveSelectedItem={handleSelectMultipleSkill}
            />
          )
        })}
        <div className="h-[22px]">
          <p className="text-red-500 text-p14">{errorMessage}</p>
        </div>
      </div>
      <div className="sm:flex gap-[12px]">
        <Button
          title="Xác nhận"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="sm:w-[240px] w-full"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={handleSubmit}
        />
        <Button
          title="Hủy bỏ"
          rounded="rounded-[8px]"
          background={'bg-[#4CA9BD]'}
          color="text-black"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="sm:w-[240px] w-full"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={cancelEdit}
        />
      </div>
    </div>
  )
}

SkillAdding.propTypes = {
  handleCreateItem: PropTypes.func,
  skillList: PropTypes.array,
  userSkillIds: PropTypes.array,
  cancelEdit: PropTypes.func
}

SkillAdding.defaultProps = {
  handleCreateItem: () => {},
  skillList: [],
  userSkillIds: [],
  cancelEdit: () => {}
}

export default SkillAdding
