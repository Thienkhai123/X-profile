import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'
import cloneDeep from 'lodash/cloneDeep'
import { toLowerCaseNonAccentVietnamese } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const LanguageFormCreate = (props) => {
  const {
    handleCancle,
    btnRef,
    userLangList,
    userLangIds,
    handleUpdateItems,
    langs
  } = props

  const refLangOpt = useRef(null)
  const refLanguages = useRef(null)
  const refInput = useRef(null)

  const [optionHeight, setOptionHeight] = useState(0)
  const [langList, setLangList] = useState(langs)
  const [showOpt, setShowOpt] = useState(false)
  const [keySearch, setKeySearch] = useState('')

  const [selectedLangs, setSelectedLang] = useState({
    items: userLangList,
    ids: userLangIds
  })

  const handleShowOpt = () => {
    if (!showOpt) {
      setShowOpt(true)
    }
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }

  const resetFilter = () => {
    setKeySearch('')
    queryLang('')
  }

  const queryLang = (val) => {
    const cloneLangs = cloneDeep(langs)
    const res = cloneLangs.filter((lang) => {
      const thisName = toLowerCaseNonAccentVietnamese(lang?.name)
      const keywordName = toLowerCaseNonAccentVietnamese(val)
      if (thisName.includes(keywordName)) {
        return lang
      }
    })
    setLangList(res)
    setKeySearch(val)
  }

  const selectLang = (skillId, name) => {
    const findExistElementIndex = selectedLangs?.items?.findIndex(
      (el) => el.skillId === skillId
    )
    if (findExistElementIndex === -1) {
      setSelectedLang({
        items: [
          ...selectedLangs.items,
          {
            skillId,
            name,
            isActive: true
          }
        ],
        ids: [...selectedLangs.ids, skillId]
      })
    } else {
      const cloneAdvancedArr = cloneDeep(selectedLangs.items)
      const resIndex = cloneAdvancedArr[findExistElementIndex]?.skillId
      cloneAdvancedArr[findExistElementIndex] = {
        ...cloneAdvancedArr[findExistElementIndex],
        isActive: true
      }
      setSelectedLang({
        items: [...cloneAdvancedArr],
        ids: [selectedLangs.ids, resIndex]
      })
    }
    resetFilter()
  }

  const selectNewLanguage = () => {
    if (isNaN(parseInt(keySearch))) {
      const cloneSelectedLang = cloneDeep(selectedLangs.items)
      const res = cloneSelectedLang.filter((lang) => {
        const thisName = toLowerCaseNonAccentVietnamese(lang?.name)
        const keywordName = toLowerCaseNonAccentVietnamese(keySearch)
        if (thisName.includes(keywordName)) {
          return lang
        }
      })
      if (res?.length === 0) {
        setSelectedLang({
          ...selectedLangs,
          items: [
            ...selectedLangs.items,
            {
              skillId: keySearch,
              name: keySearch,
              isActive: true
            }
          ]
        })
        resetFilter()
        handleCloseOpt()
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
    } else {
      toast(
        AlertWaring({
          title: 'Tên kỹ năng không được là chữ số'
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

  const handleRemoveLang = (index) => {
    const cloneLangdArr = cloneDeep(selectedLangs.items)
    const cloneLangIds = cloneDeep(selectedLangs.ids)
    const element = cloneLangdArr[index]
    if (element?.templateOptionValueId) {
      cloneLangdArr[index] = { ...cloneLangdArr[index], isActive: false }
    } else {
      cloneLangdArr.splice(index, 1)
    }
    cloneLangIds.splice(index, 1)

    setSelectedLang({
      items: cloneLangdArr,
      ids: cloneLangIds
    })
  }

  const submit = () => {
    handleUpdateItems(selectedLangs.items)
  }

  useEffect(() => {
    if (!refLanguages.current) return
    const resizeObserver = new ResizeObserver(() => {
      // Do what you want to do when the size of the element changes
      setOptionHeight(refLanguages?.current?.clientHeight)
    })
    resizeObserver.observe(refLanguages.current)
    return () => resizeObserver.disconnect() // clean up
  }, [])
  useOnClickOutside(refLangOpt, handleCloseOpt)

  return (
    <div className="flex flex-col justify-between h-full">
      <div>
        <p className="text-p18 text-card-title mb-4">
          Ngoại ngữ <span className="text-semantic-red">*</span>{' '}
        </p>
        <div className="relative" ref={refLangOpt}>
          <div
            ref={refLanguages}
            className={`w-full flex flex-wrap gap-4 py-3 px-3 items-center border rounded-lg border-grey-3`}
          >
            {selectedLangs.items?.map((skill, ind) => {
              const { isActive } = skill
              if (isActive) {
                return (
                  <div
                    key={ind}
                    className="hidden sm:flex items-center gap-2 bg-yellow-light rounded-lg py-2 px-4"
                  >
                    <p className="text-p18">{skill?.name}</p>
                    <div
                      className="cursor-careerPath"
                      onClick={() => handleRemoveLang(ind)}
                    >
                      <XProfileIcon name="cross" stroke="black" />
                    </div>
                  </div>
                )
              }
            })}
            <input
              placeholder="Tên ngoại ngữ"
              className="outline-0 placeholder:text-grey-3 sm:text-p18 text-p12 text-neutral min-w-[200px] px-1 max-w-full"
              maxLength={50}
              value={keySearch}
              size={keySearch?.length + 1}
              onChange={(e) => queryLang(e.target.value)}
              onClick={() => handleShowOpt()}
            />
          </div>
          <div className="flex sm:hidden gap-3 mt-4 flex-wrap">
            {selectedLangs.items?.map((skill, ind) => {
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
                      onClick={() => handleRemoveLang(ind)}
                    >
                      <XProfileIcon name="cross" stroke="black" />
                    </div>
                  </div>
                )
              }
            })}
          </div>
          {showOpt && (
            <div
              className={`bg-white max-h-[180px] p-2 rounded-lg w-full overflow-x-hidden absolute border border-grey-3 custom-scrollbar z-10`}
              style={{
                top: optionHeight + 12
              }}
            >
              {langList?.map((skill, ind) => {
                if (selectedLangs?.ids?.includes(skill?.skillId)) {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center p-4  rounded-lg hover:bg-light-nude cursor-default"
                    >
                      <p className="opacity-50">{skill?.name}</p>
                      <XProfileIcon name="check" />
                    </div>
                  )
                } else {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center p-4 hover:bg-light-nude rounded-lg cursor-careerPath"
                      onClick={() => selectLang(skill?.skillId, skill?.name)}
                    >
                      <p>{skill?.name}</p>
                    </div>
                  )
                }
              })}
              {keySearch?.trim() !== '' && langList?.length === 0 && (
                <div
                  className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px] cursor-careerPath"
                  onClick={() => selectNewLanguage()}
                >
                  <p>Thêm ngôn ngữ này</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="hidden sm:flex justify-end mt-4">
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
      <div className="block sm:hidden">
        <Button
          title="Lưu"
          margin="my-10"
          rounded="rounded-lg"
          width="w-full"
          type="submit"
          btnRef={btnRef}
          onClick={submit}
        />
      </div>
    </div>
  )
}

LanguageFormCreate.propTypes = {
  handleCancle: PropTypes.func,
  userLangList: PropTypes.array,
  handleUpdateItems: PropTypes.func,
  langs: PropTypes.array,
  userLangIds: PropTypes.array
}

LanguageFormCreate.defaultProps = {
  handleCancle: () => {},
  userLangList: [],
  handleUpdateItems: () => {},
  langs: [],
  userLangIds: []
}

export default LanguageFormCreate
