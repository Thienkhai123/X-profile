import XProfileIcon from 'common/presentation/Icons'
import { Fragment, useEffect, useRef, useState } from 'react'
import PrivacySettings from '../PrivacySettings'
import isEmpty from 'lodash/isEmpty'
import Image from 'next/image'
import EducationFormCreate from './EducationFormCreate'
import { cloneDeep } from 'lodash'
import { Divider } from 'common/presentation/Divider'
import moment from 'moment'
import { toast } from 'react-toastify'
import EducationItem from './EducationItem'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { delay } from 'store/helper/functionHelper'

const EducationBlock = (props) => {
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
    loadingBlock,
    loadingPrivacy
  } = props
  const blockRef = useRef(null)
  const btnCreateRef = useRef(null)
  const btnSaveRef = useRef(null)
  const btnModalRef = useRef(null)
  const [editmode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [selectedInd, setSelectedInd] = useState(null)
  const [currentEducations, setCurrentEducations] = useState({})
  const [modalMobile, toogleModalMobile] = useState(false)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState({})
  const [loadingOnRemove, setLoadingOnRemove] = useState(false)

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditMode(true)
      handleEditingId(index)
      setSelectedId(null)
    }
  }
  const handleClickEditMobile = () => {
    if (editingBlockIds?.length === 0) {
      toogleModalMobile(true)
      handleEditingId(index)

      document.body.style.overflow = 'hidden'
    }
  }
  const handleCreateItem = async (payload) => {
    let groups = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let group = groups?.length === 0 ? 0 : +groups[0] + 1
    const listCreatePayload = []
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    Object.keys(children).map((key) => {
      const { templateOptionName, templateOptionType, templateOptionId } =
        children[key]
      listCreatePayload.push({
        templateOptionId: templateOptionId,
        templateOptionType: templateOptionType,
        portfolioId: portfolioId,
        templateOptionName: templateOptionName,
        value: payload[key],
        isActive: true,
        parentId: parentId,
        group: group
      })
    })
    const handle = await new Promise(async (resolve) => {
      await handleCreateElement(listCreatePayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      handleCancel()
    })
  }
  const handleCreateItemMobileDevice = async (payload) => {
    let groups = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let group = groups?.length === 0 ? 0 : +groups[0] + 1
    const listCreatePayload = []
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    Object.keys(children).map((key) => {
      const { templateOptionName, templateOptionType, templateOptionId } =
        children[key]
      listCreatePayload.push({
        templateOptionId: templateOptionId,
        templateOptionType: templateOptionType,
        portfolioId: portfolioId,
        templateOptionName: templateOptionName,
        value: payload[key],
        isActive: true,
        parentId: parentId,
        group: group
      })
    })
    await new Promise(async (resolve) => {
      handleCreateElement(listCreatePayload)
      resolve()
    })
    handleResetMobile()
  }

  const handleCancel = () => {
    initData()
    handleRemoveEditingId(index)
    setEditMode(false)
    setLoadingOnRemove(false)
  }

  const handleRemoveItem = async (group) => {
    setLoadingOnRemove(true)
    const templateVal = childrenTemplate[group]
    const listUpdatePayload = []
    Object.keys(templateVal).map((key) => {
      listUpdatePayload.push({
        ...templateVal[key],
        isActive: false
      })
    })
    await delay(200)
    const handle = await new Promise(async (resolve) => {
      await handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      handleCancel()
    })
  }

  const handleSaveItems = async (data) => {
    const tmp = {
      School: data?.UserEducationSchool,
      EndAt: data?.UserEducationEndAt,
      StartAt: data?.UserEducationStartAt,
      Subject: data?.UserEducationSubject
    }

    const listEditPayload = []
    Object.keys(childrenTemplate[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = childrenTemplate[selectedId][childKey]

      listEditPayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: tmp[childKey],
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: isActive
      })
    })

    const handle = await new Promise(async (resolve) => {
      await handleSaveTemplateOption(listEditPayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      handleCancel()
    })
  }

  const handleSaveItemsMobile = async (data) => {
    const tmp = {
      School: data?.UserEducationSchool,
      EndAt: data?.UserEducationEndAt,
      StartAt: data?.UserEducationStartAt,
      Subject: data?.UserEducationSubject
    }
    const listEditPayload = []
    Object.keys(childrenTemplate[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = childrenTemplate[selectedId][childKey]

      listEditPayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: tmp[childKey],
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: isActive
      })
    })

    await new Promise(async (resolve) => {
      await handleSaveTemplateOption(listEditPayload)
      resolve()
    })
    handleResetMobile()
  }

  const handleResetMobile = () => {
    toogleModalMobile(false)
    handleRemoveEditingId(index)
    setSelectedId(null)
    document.body.style.overflow = 'auto'
  }

  const handleViewModeMobile = () => {
    handleResetMobile()
  }

  const handleSelectedItem = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = childrenTemplate[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        setEditMode(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        setSelectedId(group)
      }
    }
  }

  const handleSelectedItemMobile = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = childrenTemplate[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        toogleModalMobile(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        setSelectedId(group)
        document.body.style.overflow = 'hidden'
      }
    }
  }
  const handleClickOutSideBlock = () => {
    if (showError) {
      handleOffShowError()
    }
    if (editmode) {
      if (selectedId !== null) {
        btnSaveRef.current?.click()
      } else {
        btnCreateRef.current?.click()
      }
    }
  }

  const initData = () => {
    setCurrentEducations(cloneDeep(childrenTemplate))
  }

  useEffect(() => {
    initData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutSideBlock)
  return (
    <div
      ref={blockRef}
      className="rounded-xl border-2 border-[#F5F6F7] overflow-hidden bg-white relative"
    >
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true) ||
        loadingOnRemove) && <LoadingRoleBlock />}

      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between"
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
          <div className="sm:flex hidden items-center gap-3">
            {!editmode && (
              <div
                className="cursor-careerPath ignore-el-pdf"
                onClick={handleCreateMode}
              >
                <XProfileIcon name="addCircle" fill="#294F9B" />
              </div>
            )}
          </div>
        )}
        {showEditTool && (
          <div className="flex xl:hidden items-center gap-3">
            {!editmode && (
              <div
                className="cursor-careerPath ignore-el-pdf"
                onClick={handleClickEditMobile}
              >
                <XProfileIcon name={'addCircle'} fill="#294F9B" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="sm:px-6 px-3 bg-white  ">
        {!isEmpty(childrenTemplate) && !editmode && (
          <div>
            {Object.keys(childrenTemplate)?.map((key, ind) => {
              const { value: nameSchool, group } =
                childrenTemplate[key]['School'] || {}
              const { value: timeStart } =
                childrenTemplate[key]['StartAt'] || {}
              const { value: timeEnd } = childrenTemplate[key]['EndAt'] || {}
              const { value: subject } = childrenTemplate[key]['Subject'] || {}
              return (
                <Fragment key={nameSchool + ind}>
                  {ind > 0 && <Divider />}
                  <EducationItem
                    group={group}
                    nameSchool={nameSchool}
                    timeEnd={timeEnd}
                    subject={subject}
                    timeStart={timeStart}
                    showEditTool={showEditTool}
                    handleRemoveItem={handleRemoveItem}
                    handleEditMobile={handleSelectedItemMobile}
                    handleSelectedItem={(val) => {
                      handleSelectedItem(val)
                      setSelectedInd(ind)
                    }}
                  />
                </Fragment>
              )
            })}
          </div>
        )}
        {isEmpty(childrenTemplate) && !editmode && (
          <div className="flex justify-between pt-6 min-h-[130px]">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm trình độ học vấn của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/apprentice 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}
        {editmode && selectedId === null && (
          <>
            <EducationFormCreate
              btnRef={btnCreateRef}
              handleCreateItem={handleCreateItem}
              handleCancel={handleCancel}
            />
            {!isEmpty(childrenTemplate) &&
              Object.keys(childrenTemplate)?.length > 0 && (
                <div>
                  <Divider />
                </div>
              )}
            {!isEmpty(childrenTemplate) && (
              <div>
                {Object.keys(childrenTemplate)?.map((key, ind) => {
                  const { value: nameSchool, group } =
                    childrenTemplate[key]['School'] || {}
                  const { value: timeStart } =
                    childrenTemplate[key]['StartAt'] || {}
                  const { value: timeEnd } =
                    childrenTemplate[key]['EndAt'] || {}
                  const { value: subject } =
                    childrenTemplate[key]['Subject'] || {}
                  return (
                    <Fragment key={nameSchool + ind}>
                      {ind > 0 && <Divider />}
                      <EducationItem
                        group={group}
                        nameSchool={nameSchool}
                        timeEnd={timeEnd}
                        subject={subject}
                        timeStart={timeStart}
                        showEditTool={!editmode}
                        handleRemoveItem={handleRemoveItem}
                        handleEditMobile={handleSelectedItemMobile}
                        handleSelectedItem={handleSelectedItem}
                      />
                    </Fragment>
                  )
                })}
              </div>
            )}
          </>
        )}
        {editmode && selectedId !== null && (
          <>
            <EducationFormCreate
              btnRef={btnSaveRef}
              defaultValues={defaultSelectedItem}
              handleCreateItem={handleSaveItems}
              handleCancel={handleCancel}
            />
            {!isEmpty(childrenTemplate) &&
              Object.keys(childrenTemplate)?.length > 1 && (
                <div>
                  <Divider />
                </div>
              )}
            {!isEmpty(childrenTemplate) && (
              <div>
                {Object.keys(childrenTemplate)?.map((key, ind) => {
                  const { value: nameSchool, group } =
                    childrenTemplate[key]['School'] || {}
                  const { value: timeStart } =
                    childrenTemplate[key]['StartAt'] || {}
                  const { value: timeEnd } =
                    childrenTemplate[key]['EndAt'] || {}
                  const { value: subject } =
                    childrenTemplate[key]['Subject'] || {}

                  if (group !== selectedId) {
                    return (
                      <Fragment key={nameSchool + ind}>
                        {(selectedInd === 0 ? ind > 1 : ind > 0) && <Divider />}
                        <EducationItem
                          group={group}
                          nameSchool={nameSchool}
                          timeEnd={timeEnd}
                          subject={subject}
                          timeStart={timeStart}
                          showEditTool={!editmode}
                          handleRemoveItem={handleRemoveItem}
                          handleEditMobile={handleSelectedItemMobile}
                          handleSelectedItem={handleSelectedItem}
                        />
                      </Fragment>
                    )
                  }
                })}
              </div>
            )}
          </>
        )}
        <ModalApplicantProfile
          open={modalMobile}
          handleCancel={handleViewModeMobile}
          title="Học vấn"
        >
          {modalMobile && selectedId === null && (
            <EducationFormCreate
              // btnRef={btnCreateRef}
              handleCreateItem={handleCreateItemMobileDevice}
            />
          )}

          {modalMobile && selectedId !== null && (
            <EducationFormCreate
              // btnRef={btnSaveRef}
              handleCreateItem={handleSaveItemsMobile}
              defaultValues={defaultSelectedItem}
            />
          )}
        </ModalApplicantProfile>
      </div>
    </div>
  )
}

export default EducationBlock
