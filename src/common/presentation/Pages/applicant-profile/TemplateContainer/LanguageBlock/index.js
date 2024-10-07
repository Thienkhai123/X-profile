import Image from 'next/image'
import isEmpty from 'lodash/isEmpty'
import XProfileIcon from 'common/presentation/Icons'
import PrivacySettings from '../PrivacySettings'
import { useEffect, useRef, useState } from 'react'
import LanguageFormCreate from './LanguageFormCreate'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'

const LanguageBlock = (props) => {
  const {
    id,
    index,
    parentId,
    portfolioId,
    title,
    dragStyle,
    childrenTemplate,
    handleSaveTemplateOption,
    handleEditingId,
    handleRemoveEditingId,
    handleDelete,
    editingBlockIds,
    showError,
    handleOffShowError,
    showEditTool = true,
    isActive = true,
    templateOptions,
    handleCreateElement,
    languages,
    loadingBlock,
    loadingPrivacy
  } = props

  const blockRef = useRef(null)
  const btnRef = useRef(null)
  const [modalMobile, toogleModalMobile] = useState(false)

  const [editmode, setEditMode] = useState(false)
  const [languageState, setLanguageState] = useState({
    items: [],
    ids: []
  })

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditMode(true)
      handleEditingId(index)
    }
  }

  const handleInitValue = () => {
    const tempArr = []
    const tempIds = []
    if (Object?.keys(childrenTemplate)?.length > 0) {
      Object.keys(childrenTemplate).map((childKey) => {
        const {
          isActive,
          value,
          templateOptionValueId,
          group,
          templateOptionId,
          parentId,
          templateOptionName,
          templateOptionType
        } = childrenTemplate[childKey]['UserLanguageDetail'] || {}
        if (isNaN(value)) {
          tempArr.push({
            ...childrenTemplate[childKey]['UserLanguageDetail'],
            name: value,
            skillId: value
          })
        } else {
          const findElement = languages.find(
            (s) => s.skillId === parseInt(value)
          )
          tempArr.push({
            ...findElement,
            isActive,
            templateOptionValueId,
            group,
            templateOptionId,
            parentId,
            templateOptionName,
            templateOptionType,
            value
          })
        }
      })
      tempArr.map((el) => {
        if (el.isActive) {
          tempIds.push(el.skillId)
        }
      })
    }
    setLanguageState({
      items: [...tempArr],
      ids: [...tempIds]
    })
  }

  const handleResetData = () => {
    handleInitValue()
    setEditMode(false)
    handleRemoveEditingId(index)
  }
  const handleClickEditMobile = () => {
    if (editingBlockIds?.length === 0) {
      toogleModalMobile(true)
      handleEditingId(index)
      document.body.style.overflow = 'hidden'
    }
  }

  const handleResetMobile = () => {
    toogleModalMobile(false)
    handleRemoveEditingId(index)
    // setSelectedId(null)
    document.body.style.overflow = 'auto'
  }
  const handleViewModeMobile = () => {
    handleResetMobile()
  }

  const handleUpdateItems = async (langs = []) => {
    let groups = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let group = groups?.length === 0 ? 0 : +groups[0] + 1

    const updatePayload = []
    const createPayload = []
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    langs?.map((el) => {
      if (el?.templateOptionValueId) {
        const {
          templateOptionId,
          templateOptionName,
          templateOptionType,
          templateOptionValueId,
          group,
          value,
          isActive
        } = el
        if (!isActive) {
          updatePayload.push({
            templateOptionId: templateOptionId,
            templateOptionName: templateOptionName,
            value: value,
            templateOptionType: templateOptionType,
            parentId: parentId,
            group: group,
            templateOptionValueId: templateOptionValueId,
            portfolioId: portfolioId,
            isActive: isActive
          })
        }
      } else {
        const { templateOptionName, templateOptionType, templateOptionId } =
          children['UserLanguageDetail']
        createPayload.push({
          templateOptionId: templateOptionId,
          templateOptionType: templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: templateOptionName,
          value: !isNaN(parseInt(el?.skillId))
            ? el?.skillId?.toString()
            : el?.name,
          isActive: true,
          parentId: parentId,
          group: group
        })
        group++
      }
    })
    if (createPayload?.length > 0) {
      await new Promise(async (resolve) => {
        await handleCreateElement(createPayload)
        resolve()
      }).then(() => {
        handleResetData()
      })
    }

    if (updatePayload?.length > 0) {
      await new Promise(async (resolve) => {
        await handleSaveTemplateOption(updatePayload)
        resolve()
      }).then(() => {
        handleResetData()
      })
    }
    handleResetData()
  }
  const handleUpdateItemsMobile = async (langs = []) => {
    let groups = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let group = groups?.length === 0 ? 0 : +groups[0] + 1

    const updatePayload = []
    const createPayload = []
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    langs?.map((el) => {
      if (el?.templateOptionValueId) {
        const {
          templateOptionId,
          templateOptionName,
          templateOptionType,
          templateOptionValueId,
          group,
          value,
          isActive
        } = el
        if (!isActive) {
          updatePayload.push({
            templateOptionId: templateOptionId,
            templateOptionName: templateOptionName,
            value: value,
            templateOptionType: templateOptionType,
            parentId: parentId,
            group: group,
            templateOptionValueId: templateOptionValueId,
            portfolioId: portfolioId,
            isActive: isActive
          })
        }
      } else {
        const { templateOptionName, templateOptionType, templateOptionId } =
          children['UserLanguageDetail']
        createPayload.push({
          templateOptionId: templateOptionId,
          templateOptionType: templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: templateOptionName,
          value: !isNaN(parseInt(el?.skillId))
            ? el?.skillId?.toString()
            : el?.name,
          isActive: true,
          parentId: parentId,
          group: group
        })
        group++
      }
    })
    if (createPayload?.length > 0) {
      await new Promise(async (resolve) => {
        handleCreateElement(createPayload)
        resolve()
      })
    }

    if (updatePayload?.length > 0) {
      await new Promise(async (resolve) => {
        handleSaveTemplateOption(updatePayload)
        resolve()
      })
    }
    handleResetMobile()
  }

  const handleClickOutSideBlock = () => {
    if (showError) {
      handleOffShowError()
    }
    if (editmode) {
      btnRef.current.click()
    }
  }

  useEffect(() => {
    handleInitValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutSideBlock)

  return (
    <div ref={blockRef} className="bg-white relative">
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true)) && <LoadingRoleBlock />}

      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between rounded-tl-xl rounded-tr-xl border-t-2 border-l-2 border-r-2 border-[#F5F6F7]"
        style={dragStyle}
      >
        <div className="flex items-center gap-1">
          <p className="uppercase sm:text-p18-bold text-p14-bold text-blue-light">
            {title}
          </p>
          {showEditTool && (
            <div className="rounded-full bg-transparent hover:bg-stoke p-[6px] cursor-careerPath relative group ">
              <XProfileIcon
                name={isActive ? 'publish' : 'lock2'}
                fill="#294F9B"
              />
              <PrivacySettings
                listItems={[
                  {
                    icon: 'lock2',
                    title: 'Riêng tư',
                    fill: isActive ? 'black' : '#294F9B',
                    action: () => handleDelete(index, parentId)
                  },
                  {
                    icon: 'publish',
                    title: 'Công khai',
                    fill: isActive ? '#294F9B' : 'black',
                    action: () => handleDelete(index, parentId, true)
                  }
                ]}
              />
            </div>
          )}
        </div>
        {showEditTool && (
          <div className="flex  items-center gap-3">
            {!editmode && (
              <>
                <div
                  className="cursor-careerPath hidden sm:flex ignore-el-pdf"
                  onClick={handleCreateMode}
                >
                  <XProfileIcon name="pen" fill="#294F9B" />
                </div>
                {/* nút edit ở mobile */}
                <div
                  className="cursor-careerPath flex sm:hidden ignore-el-pdf"
                  onClick={handleClickEditMobile}
                >
                  <XProfileIcon name="pen" fill="#294F9B" />
                </div>
              </>
            )}
          </div>
        )}
      </div>
      <div className="sm:p-6 p-3 bg-white  border-2 border-[#F5F6F7] rounded-bl-xl rounded-br-xl">
        {!isEmpty(childrenTemplate) && !editmode && (
          <div className="flex flex-wrap gap-4">
            {languageState.items?.map((lang, ind) => {
              const { name, isActive } = lang || {}

              if (isActive) {
                return (
                  <div
                    key={`lang-${ind}`}
                    className="py-2 px-4 rounded-xl bg-white border border-grey-4"
                  >
                    <p className="text-card-title text-p16">{name}</p>
                  </div>
                )
              }
            })}
          </div>
        )}
        {isEmpty(childrenTemplate) && !editmode && (
          <div className="flex justify-between ">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm ngoại ngữ của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/hand 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}
        {editmode && (
          <LanguageFormCreate
            handleCancle={handleResetData}
            handleUpdateItems={handleUpdateItems}
            langs={languages}
            userLangIds={languageState.ids}
            userLangList={languageState.items}
            btnRef={btnRef}
          />
        )}
        <ModalApplicantProfile
          open={modalMobile}
          handleCancel={handleViewModeMobile}
          title="Ngoại ngữ"
        >
          {modalMobile && (
            <LanguageFormCreate
              handleCancle={handleResetData}
              handleUpdateItems={handleUpdateItemsMobile}
              langs={languages}
              userLangIds={languageState.ids}
              userLangList={languageState.items}
              btnRef={btnRef}
            />
          )}
        </ModalApplicantProfile>
      </div>
    </div>
  )
}

export default LanguageBlock
