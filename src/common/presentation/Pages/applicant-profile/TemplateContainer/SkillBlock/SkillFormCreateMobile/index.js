import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import cloneDeep from 'lodash/cloneDeep'
import XProfileIcon from 'common/presentation/Icons'
import { toLowerCaseNonAccentVietnamese } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const SkillFormCreateMobile = (props) => {
  const {
    handleCancle,
    btnRef,
    skillsAdvanced,
    userSkillAdvancedIds,
    userAdvancedSkills,
    handleUpdateItems
  } = props

  const refAdvancedOpt = useRef(null)
  const refAdvancedInput = useRef(null)

  const [listSkill, setListSkill] = useState({
    advanced: skillsAdvanced
  })

  const [selectedSkill, setSelectedSkill] = useState({
    advanced: userAdvancedSkills,
    advancedIds: userSkillAdvancedIds
  })

  const [showOpt, setShowOpt] = useState({
    advanced: false
  })

  const [optionAdvancedHeight, setOptionAdvancedHeight] = useState(0)

  const [keySearch, setKeySearch] = useState({
    advanced: ''
  })

  const handleShowOpt = (key, value = false) => {
    const cloneShowOpt = { ...showOpt }
    cloneShowOpt[key] = value
    setShowOpt({ ...cloneShowOpt })
  }

  const handleCloseOptAdvanced = () => {
    setShowOpt({ ...showOpt, advanced: false })
  }

  const querySkillAvanced = (val) => {
    const cloneSkillAdvanced = cloneDeep(skillsAdvanced)
    const res = cloneSkillAdvanced.filter((skill) => {
      const thisName = toLowerCaseNonAccentVietnamese(skill?.name)
      const keywordName = toLowerCaseNonAccentVietnamese(val)
      if (thisName.includes(keywordName)) {
        return skill
      }
    })
    setListSkill({ ...listSkill, advanced: res })
    setKeySearch({
      ...keySearch,
      advanced: val
    })
  }

  const selectSkillsAdvance = (skillId, name) => {
    const findExistElementIndex = selectedSkill.advanced.findIndex(
      (el) => el.skillId === skillId
    )
    if (findExistElementIndex === -1) {
      setSelectedSkill({
        ...selectedSkill,
        advanced: [
          ...selectedSkill.advanced,
          {
            skillId,
            name,
            isActive: true
          }
        ],
        advancedIds: [...selectedSkill.advancedIds, skillId]
      })
    } else {
      const cloneAdvancedArr = cloneDeep(selectedSkill.advanced)
      const resIndex = cloneAdvancedArr[findExistElementIndex]?.skillId
      cloneAdvancedArr[findExistElementIndex] = {
        ...cloneAdvancedArr[findExistElementIndex],
        isActive: true
      }
      setSelectedSkill({
        ...selectedSkill,
        advanced: [...cloneAdvancedArr],
        advancedIds: [...selectedSkill.advancedIds, resIndex]
      })
    }
  }

  const selectNewSkillAdvance = () => {
    const cloneSelectedSkillAdvanced = cloneDeep(selectedSkill.advanced)
    const res = cloneSelectedSkillAdvanced.filter((skill) => {
      const thisName = toLowerCaseNonAccentVietnamese(skill?.name)
      const keywordName = toLowerCaseNonAccentVietnamese(keySearch.advanced)
      if (thisName.includes(keywordName)) {
        return skill
      }
    })
    if (res?.length === 0) {
      setSelectedSkill({
        ...selectedSkill,
        advanced: [
          ...selectedSkill.advanced,
          {
            skillId: keySearch.advanced,
            name: keySearch.advanced,
            isActive: true
          }
        ]
      })
    } else {
      toast(
        AlertWaring({
          title: 'Kỹ năng này đã tồn tại'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  const handleRemoveAdvancedSkill = (index) => {
    const cloneAdvancedArr = cloneDeep(selectedSkill.advanced)
    const cloneAdvancedIds = cloneDeep(selectedSkill.advancedIds)
    const element = cloneAdvancedArr[index]
    if (element?.templateOptionValueId) {
      cloneAdvancedArr[index] = { ...cloneAdvancedArr[index], isActive: false }
    } else {
      cloneAdvancedArr.splice(index, 1)
    }
    cloneAdvancedIds.splice(index, 1)

    setSelectedSkill({
      ...selectedSkill,
      advanced: cloneAdvancedArr,
      advancedIds: cloneAdvancedIds
    })
  }

  const submit = () => {
    handleUpdateItems(selectedSkill.advanced)
  }

  useEffect(() => {
    if (!refAdvancedInput.current) return
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      setOptionAdvancedHeight(refAdvancedInput.current.clientHeight)
    })
    resizeObserver.observe(refAdvancedInput.current)
    return () => resizeObserver.disconnect() // clean up
  }, [])

  useOnClickOutside(refAdvancedOpt, handleCloseOptAdvanced)

  return (
    <div>
      <div className="mt-6">
        <p className="text-p18 text-card-title mb-4">Kỹ năng chuyên môn</p>
        <div className="relative" ref={refAdvancedOpt}>
          <div
            ref={refAdvancedInput}
            className={`w-full flex flex-wrap gap-4 py-3 px-3 items-center border rounded-lg border-grey-3`}
          >
            <input
              placeholder=""
              className="outline-0 placeholder:text-grey-3 sm:text-p18 text-p12 text-neutral min-w-[200px] px-1 max-w-full"
              maxLength={50}
              size={keySearch.advanced.length + 1}
              onChange={(e) => querySkillAvanced(e.target.value)}
              onClick={() => handleShowOpt('advanced', true)}
            />
          </div>
          {showOpt.advanced && (
            <div
              className={`bg-white max-h-[180px] w-full overflow-x-hidden absolute border border-stoke custom-scrollbar z-10`}
              style={{
                top: optionAdvancedHeight + 12
              }}
            >
              {listSkill?.advanced?.map((skill, ind) => {
                if (selectedSkill.advancedIds.includes(skill?.skillId)) {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center px-[24px] py-[10px] opacity-50 bg-grey-4 cursor-default"
                    >
                      <p>{skill?.name}</p>
                      <XProfileIcon name="check" />
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px] cursor-careerPath"
                      onClick={() =>
                        selectSkillsAdvance(skill?.skillId, skill?.name)
                      }
                    >
                      <p>{skill?.name}</p>
                    </div>
                  )
                }
              })}
              {keySearch.advanced !== '' &&
                listSkill?.advanced?.length === 0 && (
                  <div
                    className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px] cursor-careerPath"
                    onClick={() => selectNewSkillAdvance()}
                  >
                    <p>Thêm kỹ năng này</p>
                  </div>
                )}
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-4">
            {selectedSkill.advanced?.map((skill, ind) => {
              const { isActive, name } = skill || {}
              if (isActive && name) {
                return (
                  <div
                    key={ind}
                    className="flex items-center gap-2 bg-yellow-light rounded-lg py-2 px-4"
                  >
                    <p className="text-p18">{skill?.name}</p>
                    <div
                      className="cursor-careerPath"
                      onClick={() => handleRemoveAdvancedSkill(ind)}
                    >
                      <XProfileIcon name="cross" stroke="black" />
                    </div>
                  </div>
                )
              }
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <div className="flex items-center gap-4">
          <Button
            title="Huỷ"
            background="bg-grey-4"
            margin="m-0"
            rounded="rounded-lg"
            width="w-[99px]"
            onClick={() => handleCancle()}
          />
          <Button
            title="Lưu"
            margin="m-0"
            rounded="rounded-lg"
            width="w-[99px]"
            type="submit"
            btnRef={btnRef}
            onClick={submit}
          />
        </div>
      </div>
    </div>
  )
}

SkillFormCreateMobile.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object,
  skillsAdvanced: PropTypes.array,
  userSkillAdvancedIds: PropTypes.array,
  userAdvancedSkills: PropTypes.array,
  handleUpdateItems: PropTypes.func
}

SkillFormCreateMobile.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {},
  skillsAdvanced: [],
  userSkillAdvancedIds: [],
  userAdvancedSkills: [],
  handleUpdateItems: () => {}
}

export default SkillFormCreateMobile
