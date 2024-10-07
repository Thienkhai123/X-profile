import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import ExperienceItem from './ExperienceItem'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import cloneDeep from 'lodash/cloneDeep'
import PrivacySettings from '../PrivacySettings'
import isEmpty from 'lodash/isEmpty'
import ExperienceFormCreate from './ExperienceFormCreate'
import Image from 'next/image'
import moment from 'moment'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import ExperienceItemMobile from './ExperienceItemMobile'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { Divider } from 'common/presentation/Divider'
import { delay } from 'store/helper/functionHelper'

const ExperienceBlock = (props) => {
  const {
    id,
    index,
    parentId,
    portfolioId,
    title,
    templateOptions,
    childrenTemplate,
    dragStyle,
    handleDelete,
    handleCreateElement,
    handleSaveTemplateOption,
    handleEditingId,
    handleRemoveEditingId,
    editingBlockIds,
    showError,
    handleOffShowError,
    showEditTool = true,
    isActive = true,
    loadingBlock,
    loadingPrivacy
  } = props

  const blockRef = useRef(null)
  const btnCreateRef = useRef(null)
  const btnSaveRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [templateActive, setTemplateActive] = useState(null)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState({})
  const [modalMobile, toogleModalMobile] = useState(false)
  const [loadingOnRemove, setLoadingOnRemove] = useState(false)

  const handleChangeValueItem = (group, key, val) => {
    const cloneTemplateActive = cloneDeep(templateActive)
    cloneTemplateActive[group][key] = {
      ...cloneTemplateActive[group][key],
      value: val
    }
    setTemplateActive({ ...cloneTemplateActive })
  }

  const handleChangeValueItems = (group, keys = [], vals = []) => {
    const cloneTemplateActive = cloneDeep(templateActive)
    keys?.map((keyEl, index) => {
      cloneTemplateActive[group][keyEl] = {
        ...cloneTemplateActive[group][keyEl],
        value: vals[index]
      }
    })
    setTemplateActive({ ...cloneTemplateActive })
  }

  const resetData = () => {
    getInitialData()
    handleDeleteEditingId()
    setEditMode(false)
    setDefaultSelectedItem({})
    setLoadingOnRemove(false)
  }
  const resetDataMobile = () => {
    getInitialData()
    handleDeleteEditingId()
    toogleModalMobile(false)
    setDefaultSelectedItem({})
    document.body.style.overflow = 'auto'
    // setVersion(0)
  }

  const handleDeleteEditingId = () => {
    handleRemoveEditingId(index)
  }

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditMode(true)
      handleEditingId(index)
      setSelectedId(null)
    }
  }
  const handleCreateModeMobile = () => {
    if (editingBlockIds?.length === 0) {
      toogleModalMobile(true)
      handleEditingId(index)
      setSelectedId(null)
      document.body.style.overflow = 'hidden'
    }
  }

  const handleSelectedItem = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = templateActive[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        if (defaultVal?.hasOwnProperty('Time')) {
          const times = defaultVal?.Time.split(' - ')
          if (times?.length === 2) {
            const tempStartDate = moment(times[0]).format('YYYY')
            const tempEndDate = moment(times[1]).format('YYYY')

            if (tempEndDate === 'Invalid date') {
              defaultVal['StartDate'] = new Date(times[0])
              defaultVal['EndDate'] = 'Hiện tại'
            }
            if (!isNaN(tempStartDate)) {
              defaultVal['StartDate'] = new Date(times[0])
              defaultVal['EndDate'] = new Date(times[1])
            }
          } else {
            defaultVal['StartDate'] = null
            defaultVal['EndDate'] = null
          }
        } else {
          defaultVal['StartDate'] = null
          defaultVal['EndDate'] = null
        }
        setEditMode(true)
        setSelectedId(group)
        setDefaultSelectedItem(defaultVal)
        handleEditingId(index)
      }
    }
  }
  const handleSelectedItemMobile = (group) => {
    if (editingBlockIds?.length === 0) {
      if (group) {
        const groupVal = templateActive[group]
        if (!isEmpty(groupVal)) {
          const defaultVal = {}
          Object.keys(groupVal).map((keyEl) => {
            defaultVal[keyEl] = groupVal[keyEl]?.value
          })
          if (defaultVal?.hasOwnProperty('Time')) {
            const times = defaultVal?.Time.split(' - ')
            if (times?.length === 2) {
              const tempStartDate = moment(times[0]).format('YYYY')
              const tempEndDate = moment(times[1]).format('YYYY')

              if (tempEndDate === 'Invalid date') {
                defaultVal['StartDate'] = new Date(times[0])
                defaultVal['EndDate'] = 'Hiện tại'
              }
              if (!isNaN(tempStartDate)) {
                defaultVal['StartDate'] = new Date(times[0])
                defaultVal['EndDate'] = new Date(times[1])
              }
            } else {
              defaultVal['StartDate'] = null
              defaultVal['EndDate'] = null
            }
          } else {
            defaultVal['StartDate'] = null
            defaultVal['EndDate'] = null
          }
          toogleModalMobile(true)
          setSelectedId(group)
          setDefaultSelectedItem(defaultVal)
          handleEditingId(index)
        }
      }
    }
  }

  const handleCreateItem = async (payload) => {
    // Create Template Option Children
    const tempNewItems = {}
    const tempGroup =
      parseInt(
        [...Object?.keys(childrenTemplate)]?.sort((a, b) => b - a)[0] || 0
      ) + 1
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    tempNewItems[tempGroup] = {}
    Object.keys(children).map((key) => {
      const { templateOptionName, templateOptionType, templateOptionId } =
        children[key]
      tempNewItems[tempGroup][templateOptionName] = {
        templateOptionId: templateOptionId,
        templateOptionType: templateOptionType,
        portfolioId: portfolioId,
        templateOptionName: templateOptionName,
        value: payload[key],
        isActive: true,
        parentId: parentId,
        group: tempGroup
      }
    })
    const listCreatePayload = []
    Object.keys(tempNewItems)?.map((key) => {
      Object.keys(tempNewItems[key])?.map((childKey) => {
        listCreatePayload.push(tempNewItems[key][childKey])
      })
    })
    const handle = await new Promise(async (resolve) => {
      await handleCreateElement(listCreatePayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      resetData()
    })
  }
  const handleCreateItemMobile = async (payload) => {
    // Create Template Option Children
    const tempNewItems = {}
    const tempGroup =
      parseInt(
        [...Object?.keys(childrenTemplate)]?.sort((a, b) => b - a)[0] || 0
      ) + 1
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )
    tempNewItems[tempGroup] = {}
    Object.keys(children).map((key) => {
      const { templateOptionName, templateOptionType, templateOptionId } =
        children[key]
      tempNewItems[tempGroup][templateOptionName] = {
        templateOptionId: templateOptionId,
        templateOptionType: templateOptionType,
        portfolioId: portfolioId,
        templateOptionName: templateOptionName,
        value: payload[key],
        isActive: true,
        parentId: parentId,
        group: tempGroup
      }
    })
    const listCreatePayload = []
    Object.keys(tempNewItems)?.map((key) => {
      Object.keys(tempNewItems[key])?.map((childKey) => {
        listCreatePayload.push(tempNewItems[key][childKey])
      })
    })
    await new Promise(async (resolve) => {
      handleCreateElement(listCreatePayload)
      resolve()
    })
    resetDataMobile()
  }

  const handleSaveItem = async (data) => {
    const group = selectedId
    const listUpdatePayload = []
    Object.keys(childrenTemplate[group]).map((elKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId
      } = childrenTemplate[group][elKey]
      listUpdatePayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: data[elKey],
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: true
      })
    })
    const handle = await new Promise(async (resolve) => {
      await handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      resetData()
    })
  }
  const handleSaveItemMobile = async (data) => {
    const group = selectedId
    const listUpdatePayload = []
    Object.keys(childrenTemplate[group]).map((elKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId
      } = childrenTemplate[group][elKey]
      listUpdatePayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: data[elKey],
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: true
      })
    })
    await new Promise(async (resolve) => {
      handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    resetDataMobile()
  }

  const handleRemoveItem = async (group) => {
    setLoadingOnRemove(true)

    const groupVal = childrenTemplate[group]
    const listUpdatePayload = []
    Object.keys(groupVal).map((elKey) => {
      listUpdatePayload.push({
        ...groupVal[elKey],
        isActive: false
      })
    })
    await delay(200)
    const handle = await new Promise(async (resolve) => {
      await handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    await Promise.all([handle]).then(([res]) => {
      resetData()
    })
  }
  const handleRemoveItemMobile = async (group) => {
    const groupVal = childrenTemplate[group]
    const listUpdatePayload = []
    Object.keys(groupVal).map((elKey) => {
      listUpdatePayload.push({
        ...groupVal[elKey],
        isActive: false
      })
    })
    await new Promise(async (resolve) => {
      handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    resetDataMobile()
  }

  const getInitialData = () => {
    if (Object?.keys(childrenTemplate)?.length > 0) {
      const tempObj = {}
      Object.keys(childrenTemplate)?.map((key) => {
        const { isActive } = childrenTemplate[key]['Title'] || {}
        if (isActive) {
          tempObj[key] = childrenTemplate[key]
        }
      })
      setTemplateActive({ ...tempObj })
    } else {
      setTemplateActive({})
    }
  }

  const handleClickOutsideBlock = () => {
    if (showError) {
      handleOffShowError()
    }
    if (editMode) {
      if (selectedId !== null) {
        btnSaveRef.current?.click()
      } else {
        btnCreateRef.current?.click()
      }
    }
  }

  useEffect(() => {
    getInitialData()
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutsideBlock)

  return (
    <div
      ref={blockRef}
      id={`block-editing-id-${index}`}
      className=" rounded-xl border-2 border-[#F5F6F7] xl:overflow-hidden bg-white relative"
    >
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true) ||
        loadingOnRemove) && <LoadingRoleBlock />}

      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between xl:rounded-none rounded-t-xl"
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
          <Fragment>
            <div className="xl:flex hidden items-center gap-3">
              {!editMode && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={handleCreateMode}
                >
                  <XProfileIcon name="addCircle" fill="#294F9B" />
                </div>
              )}
            </div>
            <div className="flex xl:hidden items-center gap-3">
              {!editMode && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={handleCreateModeMobile}
                >
                  <XProfileIcon name="addCircle" fill="#294F9B" />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
      <div
        className={`sm:p-6 p-3 bg-white min-h-[130px] flex flex-col ${
          editMode ? 'gap-6' : 'gap-4 '
        } xl:rounded-none rounded-b-xl`}
      >
        {templateActive &&
          !editMode &&
          Object.keys(templateActive)?.map((key, ind) => {
            const {
              value: TimeOfExp,
              isActive,
              group
            } = templateActive[key]['TimeOfExp'] || {}
            const { value: UnitOfTime } =
              templateActive[key]['UnitOfTime'] || {}
            const { value: Title } = templateActive[key]['Title'] || {}
            const { value: SubTitle } = templateActive[key]['SubTitle'] || {}
            const { value: Time } = templateActive[key]['Time'] || {}
            const { value: Description } =
              templateActive[key]['Description'] || {}
            if (isActive) {
              return (
                <div key={`current-${ind}`}>
                  <div className="hidden xl:block">
                    <ExperienceItem
                      group={key}
                      TimeOfExp={TimeOfExp}
                      UnitOfTime={UnitOfTime}
                      Title={Title}
                      SubTitle={SubTitle}
                      Time={Time}
                      Description={Description}
                      editMode={editMode}
                      autoFocus={ind === 0}
                      handleRemoveItem={handleRemoveItem}
                      handleSaveItem={handleSaveItem}
                      handleChangeValueItem={handleChangeValueItem}
                      handleChangeValueItems={handleChangeValueItems}
                      showHidden={false}
                      handleSelectedItem={handleSelectedItem}
                      showEditTool={showEditTool}
                    />
                  </div>
                  <div key={`current-${ind}`} className="xl:hidden">
                    <ExperienceItemMobile
                      group={key}
                      TimeOfExp={TimeOfExp}
                      UnitOfTime={UnitOfTime}
                      Title={Title}
                      SubTitle={SubTitle}
                      Time={Time}
                      Description={Description}
                      editMode={editMode}
                      autoFocus={ind === 0}
                      handleRemoveItem={handleRemoveItemMobile}
                      handleSaveItem={handleSaveItemMobile}
                      handleChangeValueItem={handleChangeValueItem}
                      handleChangeValueItems={handleChangeValueItems}
                      showHidden={false}
                      handleSelectedItem={handleSelectedItemMobile}
                      showEditTool={showEditTool}
                    />
                  </div>
                </div>
              )
            }
          })}

        {isEmpty(templateActive) && !editMode && (
          <div className="flex justify-between">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm kinh nghiệm làm việc của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/briefcase 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}

        {editMode && selectedId === null && (
          <>
            <ExperienceFormCreate
              handleCancle={resetData}
              handleCreateItem={handleCreateItem}
              btnRef={btnCreateRef}
            />
            {templateActive && Object.keys(templateActive)?.length > 0 && (
              <div>
                <Divider />
              </div>
            )}
            {templateActive &&
              Object.keys(templateActive)?.map((key, ind) => {
                const {
                  value: TimeOfExp,
                  isActive,
                  group
                } = templateActive[key]['TimeOfExp'] || {}
                const { value: UnitOfTime } =
                  templateActive[key]['UnitOfTime'] || {}
                const { value: Title } = templateActive[key]['Title'] || {}
                const { value: SubTitle } =
                  templateActive[key]['SubTitle'] || {}
                const { value: Time } = templateActive[key]['Time'] || {}
                const { value: Description } =
                  templateActive[key]['Description'] || {}
                if (isActive) {
                  return (
                    <div key={`current-${ind}`}>
                      <div className="hidden xl:block">
                        <ExperienceItem
                          group={key}
                          TimeOfExp={TimeOfExp}
                          UnitOfTime={UnitOfTime}
                          Title={Title}
                          SubTitle={SubTitle}
                          Time={Time}
                          Description={Description}
                          editMode={editMode}
                          autoFocus={ind === 0}
                          handleRemoveItem={handleRemoveItem}
                          handleSaveItem={handleSaveItem}
                          handleChangeValueItem={handleChangeValueItem}
                          handleChangeValueItems={handleChangeValueItems}
                          showHidden={false}
                          handleSelectedItem={handleSelectedItem}
                          showEditTool={!editMode}
                        />
                      </div>
                      <div key={`current-${ind}`} className="xl:hidden">
                        <ExperienceItemMobile
                          group={key}
                          TimeOfExp={TimeOfExp}
                          UnitOfTime={UnitOfTime}
                          Title={Title}
                          SubTitle={SubTitle}
                          Time={Time}
                          Description={Description}
                          editMode={editMode}
                          autoFocus={ind === 0}
                          handleRemoveItem={handleRemoveItemMobile}
                          handleSaveItem={handleSaveItemMobile}
                          handleChangeValueItem={handleChangeValueItem}
                          handleChangeValueItems={handleChangeValueItems}
                          showHidden={false}
                          handleSelectedItem={handleSelectedItemMobile}
                          showEditTool={showEditTool}
                        />
                      </div>
                    </div>
                  )
                }
              })}
          </>
        )}

        {editMode && selectedId !== null && (
          <>
            <ExperienceFormCreate
              handleCancle={resetData}
              handleCreateItem={handleSaveItem}
              defaultValues={defaultSelectedItem}
              btnRef={btnSaveRef}
            />
            {templateActive && Object.keys(templateActive)?.length > 1 && (
              <div>
                <Divider />
              </div>
            )}
            {templateActive &&
              Object.keys(templateActive)?.map((key, ind) => {
                const {
                  value: TimeOfExp,
                  isActive,
                  group
                } = templateActive[key]['TimeOfExp'] || {}
                const { value: UnitOfTime } =
                  templateActive[key]['UnitOfTime'] || {}
                const { value: Title } = templateActive[key]['Title'] || {}
                const { value: SubTitle } =
                  templateActive[key]['SubTitle'] || {}
                const { value: Time } = templateActive[key]['Time'] || {}
                const { value: Description } =
                  templateActive[key]['Description'] || {}
                if (isActive && selectedId !== key) {
                  return (
                    <div key={`current-${ind}`}>
                      <div className="hidden xl:block">
                        <ExperienceItem
                          group={key}
                          TimeOfExp={TimeOfExp}
                          UnitOfTime={UnitOfTime}
                          Title={Title}
                          SubTitle={SubTitle}
                          Time={Time}
                          Description={Description}
                          editMode={editMode}
                          autoFocus={ind === 0}
                          handleRemoveItem={handleRemoveItem}
                          handleSaveItem={handleSaveItem}
                          handleChangeValueItem={handleChangeValueItem}
                          handleChangeValueItems={handleChangeValueItems}
                          showHidden={false}
                          handleSelectedItem={handleSelectedItem}
                          showEditTool={!editMode}
                        />
                      </div>
                      <div key={`current-${ind}`} className="xl:hidden">
                        <ExperienceItemMobile
                          group={key}
                          TimeOfExp={TimeOfExp}
                          UnitOfTime={UnitOfTime}
                          Title={Title}
                          SubTitle={SubTitle}
                          Time={Time}
                          Description={Description}
                          editMode={editMode}
                          autoFocus={ind === 0}
                          handleRemoveItem={handleRemoveItemMobile}
                          handleSaveItem={handleSaveItemMobile}
                          handleChangeValueItem={handleChangeValueItem}
                          handleChangeValueItems={handleChangeValueItems}
                          showHidden={false}
                          handleSelectedItem={handleSelectedItemMobile}
                          showEditTool={showEditTool}
                        />
                      </div>
                    </div>
                  )
                }
              })}
          </>
        )}
      </div>
      <ModalApplicantProfile
        open={modalMobile}
        handleCancel={resetDataMobile}
        title="Kinh nghiệm làm việc"
      >
        <div className="mt-6 ">
          {selectedId === null && (
            <ExperienceFormCreate
              handleCancle={resetDataMobile}
              handleCreateItem={handleCreateItemMobile}
              btnRef={btnCreateRef}
            />
          )}

          {selectedId !== null && (
            <ExperienceFormCreate
              handleCancle={resetDataMobile}
              handleCreateItem={handleSaveItemMobile}
              defaultValues={defaultSelectedItem}
              btnRef={btnSaveRef}
            />
          )}
        </div>
      </ModalApplicantProfile>
    </div>
  )
}

ExperienceBlock.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  templateOptions: PropTypes.array,
  childrenTemplate: PropTypes.object,
  dragStyle: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleInAtiveChildrenTemplate: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func
}
ExperienceBlock.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  templateOptions: [],
  childrenTemplate: {},
  dragStyle: {},
  handleDelete: () => {},
  handleSaveTemplateOption: () => {},
  handleCreateElement: () => {},
  handleInAtiveChildrenTemplate: () => {},
  handleEditingId: () => {},
  handleRemoveEditingId: () => {}
}

export default ExperienceBlock
