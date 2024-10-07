import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import cloneDeep from 'lodash/cloneDeep'
import XProfileIcon from 'common/presentation/Icons'
import { toLowerCaseNonAccentVietnamese } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const SkillCommonFormCreateMobile = (props) => {
  const {
    handleCancle,
    btnRef,
    skillsCommon,
    userSkillCommonIds,
    userCommonSkills,
    handleUpdateItems
  } = props

  const refCommonOpt = useRef(null)
  const refCommonInput = useRef(null)

  const [listSkill, setListSkill] = useState({
    common: skillsCommon
  })

  const [selectedSkill, setSelectedSkill] = useState({
    common: userCommonSkills,
    commonIds: userSkillCommonIds
  })

  const [showOpt, setShowOpt] = useState({
    common: false
  })

  const [optionACommonHeight, setOptionCommonHeight] = useState(0)

  const [keySearch, setKeySearch] = useState({
    common: ''
  })

  const handleShowOpt = (key, value = false) => {
    const cloneShowOpt = { ...showOpt }
    cloneShowOpt[key] = value
    setShowOpt({ ...cloneShowOpt })
  }

  const handleCloseOptCommon = () => {
    setShowOpt({ ...showOpt, common: false })
  }

  const querySkillCommon = (val) => {
    const cloneSkillCommon = cloneDeep(skillsCommon)
    const res = cloneSkillCommon.filter((skill) => {
      const thisName = toLowerCaseNonAccentVietnamese(skill?.name)
      const keywordName = toLowerCaseNonAccentVietnamese(val)
      if (thisName.includes(keywordName)) {
        return skill
      }
    })
    setListSkill({ ...listSkill, common: res })
    setKeySearch({
      ...keySearch,
      common: val
    })
  }

  const handleRemoveCommonSkill = (index) => {
    const cloneCommondArr = cloneDeep(selectedSkill.common)
    const cloneCommonIds = cloneDeep(selectedSkill.commonIds)
    const element = cloneCommondArr[index]
    if (element?.templateOptionValueId) {
      cloneCommondArr[index] = { ...cloneCommondArr[index], isActive: false }
    } else {
      cloneCommondArr.splice(index, 1)
    }
    cloneCommonIds.splice(index, 1)

    setSelectedSkill({
      ...selectedSkill,
      common: cloneCommondArr,
      commonIds: cloneCommonIds
    })
  }

  const selectSkillsCommon = (skillId, name) => {
    const findExistElementIndex = selectedSkill.common.findIndex(
      (el) => el.skillId === skillId
    )
    if (findExistElementIndex === -1) {
      setSelectedSkill({
        ...selectedSkill,
        common: [
          ...selectedSkill.common,
          {
            skillId,
            name,
            isActive: true
          }
        ],
        commonIds: [...selectedSkill.commonIds, skillId]
      })
    } else {
      const cloneCommondArr = cloneDeep(selectedSkill.common)
      const resIndex = cloneCommondArr[findExistElementIndex]?.skillId
      cloneCommondArr[findExistElementIndex] = {
        ...cloneCommondArr[findExistElementIndex],
        isActive: true
      }
      setSelectedSkill({
        ...selectedSkill,
        common: [...cloneCommondArr],
        commonIds: [...selectedSkill.commonIds, resIndex]
      })
    }
  }

  const selectNewSkillCommon = () => {
    const cloneSelectedSkillCommon = cloneDeep(selectedSkill.common)
    const res = cloneSelectedSkillCommon.filter((skill) => {
      const thisName = toLowerCaseNonAccentVietnamese(skill?.name)
      const keywordName = toLowerCaseNonAccentVietnamese(keySearch.common)
      if (thisName.includes(keywordName)) {
        return skill
      }
    })
    if (res?.length === 0) {
      setSelectedSkill({
        ...selectedSkill,
        common: [
          ...selectedSkill.common,
          {
            skillId: keySearch.common,
            name: keySearch.common,
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
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  const submit = () => {
    handleUpdateItems(selectedSkill.common)
  }

  useEffect(() => {
    if (!refCommonInput.current) return
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      setOptionCommonHeight(refCommonInput.current.clientHeight)
    })
    resizeObserver.observe(refCommonInput.current)
    return () => resizeObserver.disconnect() // clean up
  }, [])

  useOnClickOutside(refCommonOpt, handleCloseOptCommon)

  return (
    <div>
      <div>
        <p className="text-p18 text-card-title mb-4">Kỹ năng chung</p>
        <div className="relative" ref={refCommonOpt}>
          <div
            ref={refCommonInput}
            className={`w-full flex flex-wrap gap-4 py-3 px-3 items-center border rounded-lg border-grey-3`}
          >
            <input
              placeholder=""
              className="outline-0 placeholder:text-grey-3 sm:text-p18 text-p12 text-neutral min-w-[200px] px-1 max-w-full"
              maxLength={50}
              size={keySearch.common.length + 1}
              onChange={(e) => querySkillCommon(e.target.value)}
              onClick={() => handleShowOpt('common', true)}
            />
          </div>
          {showOpt.common && (
            <div
              className={`bg-white max-h-[180px] w-full overflow-x-hidden absolute border border-stoke custom-scrollbar z-10`}
              style={{
                top: optionACommonHeight + 12
              }}
            >
              {listSkill?.common?.map((skill, ind) => {
                if (selectedSkill.commonIds.includes(skill?.skillId)) {
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
                        selectSkillsCommon(skill?.skillId, skill?.name)
                      }
                    >
                      <p>{skill?.name}</p>
                    </div>
                  )
                }
              })}
              {keySearch.common !== '' && listSkill?.common?.length === 0 && (
                <div
                  className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px] cursor-careerPath"
                  onClick={() => selectNewSkillCommon()}
                >
                  <p>Thêm kỹ năng này</p>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-wrap gap-4 mt-4">
            {selectedSkill.common?.map((skill, ind) => {
              const { isActive } = skill
              if (isActive) {
                return (
                  <div
                    key={ind}
                    className="flex items-center gap-2 bg-yellow-light rounded-lg py-2 px-4"
                  >
                    <p className="text-p18">{skill?.name}</p>
                    <div
                      className="cursor-careerPath"
                      onClick={() => handleRemoveCommonSkill(ind)}
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

SkillCommonFormCreateMobile.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object,
  skillsCommon: PropTypes.array,
  handleUpdateItems: PropTypes.func
}

SkillCommonFormCreateMobile.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {},
  skillsCommon: [],
  handleUpdateItems: () => {}
}

export default SkillCommonFormCreateMobile
