import React, { Fragment, useEffect, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import cloneDeep from 'lodash/cloneDeep'
import PrivacySettings from '../PrivacySettings'
import Image from 'next/image'
import isEmpty from 'lodash/isEmpty'
import CertificateFormCreate from './CertificateFormCreate'
import { Divider } from 'common/presentation/Divider'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import CertificateItem from './CertificateItem'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { delay } from 'store/helper/functionHelper'

const CertificateBlock = (props) => {
  const {
    id,
    index,
    parentId,
    portfolioId,
    title,
    dragStyle,
    templateOptions,
    childrenTemplate,
    handleDelete,
    handleCreateElement,
    handleSaveTemplateOption,
    editingBlockIds,
    showError,
    handleOffShowError,
    handleEditingId,
    handleRemoveEditingId,
    showEditTool = true,
    isActive = true,
    loadingBlock,
    loadingPrivacy
  } = props
  const blockRef = useRef(null)
  const btnCreateRef = useRef(null)
  const btnSaveRef = useRef(null)
  const [edit, setEdit] = useState(false)
  const [currentCertificates, setCurrentCertificates] = useState({})
  const [modalMobile, toogleModalMobile] = useState(false)

  const [selectedId, setSelectedId] = useState(null)
  const [selectedInd, setSelectedInd] = useState(null)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState({})
  const [loadingOnRemove, setLoadingOnRemove] = useState(false)

  const handleCancel = () => {
    initData()
    handleRemoveEditingId(index)
    setEdit(false)
    setLoadingOnRemove(false)
  }

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEdit(true)
      handleEditingId(index)
      setSelectedId(null)
    }
  }

  const handleSelectedItem = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = currentCertificates[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        setEdit(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        setSelectedId(group)
      }
    }
  }
  const handleSelectedItemMobile = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = currentCertificates[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        toogleModalMobile(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        setSelectedId(group)
      }
    }
  }
  const handleClickEditMobile = () => {
    if (editingBlockIds?.length === 0) {
      toogleModalMobile(true)
      handleEditingId(index)
      document.body.style.overflow = 'hidden'
    }
  }
  const handleViewModeMobile = () => {
    handleResetMobile()
  }
  const handleResetMobile = () => {
    toogleModalMobile(false)
    handleRemoveEditingId(index)
    setSelectedId(null)
    document.body.style.overflow = 'auto'
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
  const handleCreateItemMobile = async (payload) => {
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

  const handleSaveItems = async (data) => {
    const listEditPayload = []
    Object.keys(currentCertificates[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = currentCertificates[selectedId][childKey]
      listEditPayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: data[childKey],
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
  const handleSaveItemsMobileDivice = async (data) => {
    const listEditPayload = []
    Object.keys(currentCertificates[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = currentCertificates[selectedId][childKey]
      listEditPayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value: data[childKey],
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: isActive
      })
    })

    await new Promise(async (resolve) => {
      handleSaveTemplateOption(listEditPayload)
      resolve()
    })
    handleResetMobile()
  }

  const handleRemoveItem = async (group) => {
    setLoadingOnRemove(true)
    const templateVal = currentCertificates[group]
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

  const handleClickOutSideBlock = () => {
    if (showError) {
      handleOffShowError()
    }
    if (edit) {
      if (selectedId !== null) {
        btnSaveRef.current?.click()
      } else {
        btnCreateRef.current?.click()
      }
    }
  }

  const initData = () => {
    setCurrentCertificates(cloneDeep(childrenTemplate))
  }

  useEffect(() => {
    initData()
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutSideBlock)

  return (
    <div
      ref={blockRef}
      className=" rounded-xl border-2 border-[#F5F6F7] bg-white relative"
    >
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true) ||
        loadingOnRemove) && <LoadingRoleBlock />}

      <div
        className="flex  sm:px-6 px-3 rounded-t-xl  sm:py-4 py-3 bg-stoke items-center justify-between"
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
          <>
            <div className="sm:flex hidden items-center gap-3">
              {!edit && (
                <>
                  <div
                    className="cursor-careerPath ignore-el-pdf"
                    onClick={handleCreateMode}
                  >
                    <XProfileIcon name="addCircle" fill="#294F9B" />
                  </div>
                </>
              )}
            </div>
            <div className="flex sm:hidden items-center gap-3">
              {!edit && (
                <>
                  <div
                    className="cursor-careerPath ignore-el-pdf"
                    onClick={handleClickEditMobile}
                  >
                    <XProfileIcon name="addCircle" fill="#294F9B" />
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>

      <div className="sm:p-6 p-3 flex flex-col gap-6  bg-white  rounded-b-xl">
        {!isEmpty(currentCertificates) &&
          !edit &&
          Object.keys(currentCertificates)?.map((key, ind) => {
            const {
              value: imageUrl,
              group,
              isActive
            } = currentCertificates[key]['UserCertificateImage'] || {}
            const { value: name } =
              currentCertificates[key]['UserCertificateName'] || {}
            return (
              <Fragment key={name + ind}>
                {ind > 0 && <Divider />}
                <CertificateItem
                  imageUrl={imageUrl}
                  name={name}
                  showEditTool={showEditTool}
                  group={group}
                  handleRemoveItem={handleRemoveItem}
                  handleSelectedItemMobile={handleSelectedItemMobile}
                  handleSelectedItem={(val) => {
                    handleSelectedItem(val)
                    setSelectedInd(ind)
                  }}
                />
              </Fragment>
            )
          })}

        {isEmpty(currentCertificates) && !edit && (
          <div className="flex justify-between ">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm chứng chỉ chuyên môn của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/diploma 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}

        {edit && selectedId === null && (
          <>
            <CertificateFormCreate
              btnRef={btnCreateRef}
              portfolioId={portfolioId}
              handleCancle={handleCancel}
              handleCreateItem={handleCreateItem}
            />
            {!isEmpty(currentCertificates) &&
              Object.keys(currentCertificates)?.length > 0 && (
                <div>
                  <Divider />
                </div>
              )}
            <div className="flex flex-col gap-6">
              {!isEmpty(currentCertificates) &&
                Object.keys(currentCertificates)?.map((key, ind) => {
                  const {
                    value: imageUrl,
                    group,
                    isActive
                  } = currentCertificates[key]['UserCertificateImage'] || {}
                  const { value: name } =
                    currentCertificates[key]['UserCertificateName'] || {}
                  return (
                    <Fragment key={name + ind}>
                      {ind > 0 && <Divider />}
                      <CertificateItem
                        imageUrl={imageUrl}
                        name={name}
                        showEditTool={!edit}
                        group={group}
                        handleRemoveItem={handleRemoveItem}
                        handleSelectedItemMobile={handleSelectedItemMobile}
                        handleSelectedItem={handleSelectedItem}
                      />
                    </Fragment>
                  )
                })}
            </div>
          </>
        )}

        {edit && selectedId !== null && (
          <>
            <CertificateFormCreate
              btnRef={btnSaveRef}
              portfolioId={portfolioId}
              defaultValues={defaultSelectedItem}
              handleCancle={handleCancel}
              handleCreateItem={handleSaveItems}
            />
            {!isEmpty(currentCertificates) &&
              Object.keys(currentCertificates)?.length > 1 && (
                <div>
                  <Divider />
                </div>
              )}
            <div className="flex flex-col gap-6">
              {!isEmpty(currentCertificates) &&
                Object.keys(currentCertificates).map((key, ind) => {
                  const {
                    value: imageUrl,
                    group,
                    isActive
                  } = currentCertificates[key]['UserCertificateImage'] || {}
                  const { value: name } =
                    currentCertificates[key]['UserCertificateName'] || {}
                  if (group !== selectedId) {
                    return (
                      <Fragment key={name + ind}>
                        {(selectedInd === 0 ? ind > 1 : ind > 0) && <Divider />}
                        <CertificateItem
                          imageUrl={imageUrl}
                          name={name}
                          showEditTool={!edit}
                          group={group}
                          handleRemoveItem={handleRemoveItem}
                          handleSelectedItemMobile={handleSelectedItemMobile}
                          handleSelectedItem={handleSelectedItem}
                        />
                      </Fragment>
                    )
                  }
                })}
            </div>
          </>
        )}
      </div>
      <ModalApplicantProfile
        open={modalMobile}
        handleCancel={handleViewModeMobile}
        title="Chứng chỉ chuyên môn"
      >
        {modalMobile && selectedId === null && (
          <CertificateFormCreate
            btnRef={btnCreateRef}
            portfolioId={portfolioId}
            handleCreateItem={handleCreateItemMobile}
          />
        )}
        {modalMobile && selectedId !== null && (
          <CertificateFormCreate
            btnRef={btnSaveRef}
            portfolioId={portfolioId}
            defaultValues={defaultSelectedItem}
            handleCreateItem={handleSaveItemsMobileDivice}
          />
        )}
      </ModalApplicantProfile>
    </div>
  )
}

CertificateBlock.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  templateOptions: PropTypes.array,
  childrenTemplate: PropTypes.object,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  dragStyle: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleInAtiveChildrenTemplate: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func
}
CertificateBlock.defaultProps = {
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

export default CertificateBlock
