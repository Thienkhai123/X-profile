import React, { Fragment, useEffect, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import PrivacySettings from '../PrivacySettings'
import isEmpty from 'lodash/isEmpty'
import AnotherFormCreate from './AnotherFormCreate'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import { Navigation } from 'swiper'
import { Slider } from 'common/presentation/Swiper'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { delay } from 'store/helper/functionHelper'
const AnotherBlock = (props) => {
  const {
    id,
    index,
    parentId,
    portfolioId,
    title,
    templateOptions,
    childrenTemplate,
    dragStyle,
    handleCreateElement,
    handleSaveTemplateOption,
    handleEditingId,
    handleRemoveEditingId,
    handleDelete,
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
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [editMode, setEditmode] = useState(false)
  const [others, setOthers] = useState(null)
  const [selectedId, setSelectedId] = useState(null)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState({})
  const [modalMobile, toogleModalMobile] = useState(false)
  const [menuAction, toogleMenuAction] = useState(false)
  const [loadingOnRemove, setLoadingOnRemove] = useState(false)
  const menuActionRef = useRef(null)
  const handleCloseMenuAction = () => toogleMenuAction(false)
  useOnClickOutside(menuActionRef, handleCloseMenuAction)

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditmode(true)
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
  const handleResetData = () => {
    getInitialData()
    setEditmode(false)
    handleRemoveEditingId(index)
    setLoadingOnRemove(false)
  }
  const handleResetDataMobile = () => {
    getInitialData()
    toogleModalMobile(false)
    handleRemoveEditingId(index)
    document.body.style.overflow = 'auto'
  }

  const handleEditItem = () => {
    if (editingBlockIds?.length === 0) {
      const groupVal = others[selectedId]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        setEditmode(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
      }
    }
  }
  const handleEditItemMobile = () => {
    if (editingBlockIds?.length === 0) {
      const groupVal = others[selectedId]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          defaultVal[keyEl] = groupVal[keyEl]?.value
        })
        toogleModalMobile(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        document.body.style.overflow = 'hidden'
      }
    }
  }

  const handleRemoveItem = async (group) => {
    setLoadingOnRemove(true)
    const templateVal = others[group]
    const listUpdatePayload = []
    Object.keys(templateVal).map((key) => {
      listUpdatePayload.push({
        ...templateVal[key],
        isActive: false
      })
    })
    await delay(200)
    await new Promise(async (resolve) => {
      handleSaveTemplateOption(listUpdatePayload)
      resolve()
    }).then(() => {
      handleResetData()
    })
  }
  const handleRemoveItemMobile = async (group) => {
    const templateVal = others[group]
    const listUpdatePayload = []
    Object.keys(templateVal).map((key) => {
      listUpdatePayload.push({
        ...templateVal[key],
        isActive: false
      })
    })
    await new Promise(async (resolve) => {
      handleSaveTemplateOption(listUpdatePayload)
      resolve()
    })
    handleResetDataMobile()
    toogleMenuAction(false)
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
      handleResetData()
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
    handleResetDataMobile()
  }
  const handleSaveItem = async (data) => {
    const listEditPayload = []
    Object.keys(others[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = others[selectedId][childKey]
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
      handleResetData()
    })
  }
  const handleSaveItemMobile = async (data) => {
    const listEditPayload = []
    Object.keys(others[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = others[selectedId][childKey]
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
    handleResetDataMobile()
  }

  const handleClickOutSideBlock = () => {
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

  const getInitialData = () => {
    if (Object.keys(childrenTemplate).length > 0) {
      let tempObj = { ...childrenTemplate }
      const activeEl = {}
      const keys = []
      const createMissingElementPayload = []

      Object.keys(tempObj).map((key) => {
        const { isActive, group } = tempObj[key]['OtherImage'] || {}
        if (isActive) {
          if (!tempObj[key].hasOwnProperty('OtherDescription')) {
            const templateOther = templateOptions.find(
              (el) => el.templateOptionName === 'Other'
            )
            if (templateOther) {
              Object.keys(templateOther?.children).map((keyTemplate) => {
                if (keyTemplate !== 'OtherImage') {
                  const {
                    templateOptionId,
                    templateOptionType,
                    templateOptionName,
                    parentId
                  } = templateOther?.children[keyTemplate]
                  createMissingElementPayload.push({
                    templateOptionId: templateOptionId,
                    templateOptionType: templateOptionType,
                    portfolioId: portfolioId,
                    templateOptionName: templateOptionName,
                    value: '',
                    isActive: isActive,
                    parentId: parentId,
                    group: group
                  })
                }
              })
            }
          }
          activeEl[key] = { ...tempObj[key] }
          keys.push(group)
        }
      })
      setOthers({ ...activeEl })
      setSelectedId(keys[0])
    } else {
      setOthers({})
    }
  }

  useEffect(() => {
    getInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutSideBlock)

  return (
    <div
      ref={blockRef}
      className="rounded-xl border-2 border-[#F5F6F7] xl:overflow-hidden bg-white relative"
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
            <div className="sm:flex hidden items-center gap-3">
              {!editMode && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={handleCreateMode}
                >
                  <XProfileIcon name="addCircle" fill="#294F9B" />
                </div>
              )}
            </div>
            <div className="xl:hidden items-center gap-3">
              {!editMode && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={() => handleCreateModeMobile()}
                >
                  <XProfileIcon name="addCircle" fill="#294F9B" />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
      <div className="sm:p-6 p-3 bg-white min-h-[130px] xl:rounded-none rounded-b-xl">
        {!editMode && !isEmpty(others) && (
          <Fragment>
            <div className="hidden xl:grid xl:grid-cols-6 md:grid-cols-4 grid-cols-2 gap-[20px] sm:px-0 px-4">
              {Object.keys(others)?.map((key, ind) => {
                const { value, group } = others[key]['OtherImage'] || {}
                return (
                  <div
                    key={ind}
                    className={`rounded-xl relative w-[80px] h-[80px] overflow-hidden cursor-pointer
              ${selectedId === group && 'border-[4px] border-button'}
              `}
                    onClick={() => setSelectedId(group)}
                  >
                    <Image
                      src={value}
                      layout="fill"
                      alt=""
                      priority={true}
                      objectFit="cover"
                    />
                  </div>
                )
              })}
            </div>
            {/* Mobile */}
            <div className="relative xl:hidden sm:px-0 px-4 ">
              <Slider
                handleSlideChange={(swiper) => {
                  toogleMenuAction(false)
                }}
                slidesPerView={1}
                hasArrowMobile={
                  !editMode && others ? Object?.keys(others)?.length > 1 : false
                }
                rewind={false}
              >
                {Object.keys(others)?.map((key, ind) => {
                  const { value, group } = others[key]['OtherImage'] || {}
                  return (
                    <SwiperSlide key={ind}>
                      <div className="w-full flex flex-col justify-center items-center relative overflow-hidden">
                        <div className="relative w-full">
                          {showEditTool && (
                            <div
                              onClick={() => {
                                setSelectedId(group),
                                  toogleMenuAction(!menuAction)
                              }}
                              className="absolute right-0 top-0"
                            >
                              <XProfileIcon name="menuDot" />
                            </div>
                          )}

                          {menuAction && (
                            <div
                              // ref={menuActionRef}
                              className="absolute right-1 z-30 top-5 bg-white border border-grey-3 rounded-lg w-[120px] p-2"
                            >
                              <div className="xl:hidden flex flex-col items-center gap-4">
                                <div
                                  className="cursor-pointer flex items-center gap-2 px-4 py-2"
                                  onClick={() => {
                                    handleEditItemMobile()
                                  }}
                                >
                                  <XProfileIcon name="pen" />
                                  <p className="text-p16">Sửa</p>
                                </div>
                                <div
                                  className="cursor-pointer flex items-center gap-2 px-4 py-2"
                                  onClick={() =>
                                    handleRemoveItemMobile(selectedId)
                                  }
                                >
                                  <XProfileIcon name="trash" />
                                  <p className="text-p16">Xoá</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <div
                          className={`rounded-xl relative w-[80px] h-[80px] overflow-hidden cursor-pointer

              `}
                          // onClick={() => setSelectedId(group)}
                        >
                          <Image
                            src={value}
                            layout="fill"
                            alt=""
                            priority={true}
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex xl:hidden gap-9 max-w-[240px]">
                          <div className="flex-1">
                            <p className="text-p16-bold text-card-title mt-6 text-center">
                              {others[key]['OtherTitle']?.value}
                            </p>
                            <p className="text-p14 text-grey-1 mt-1 text-center">
                              {others[key]['OtherDescription']?.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                })}
              </Slider>
              {/* <PreviousArrow
                hasShadow={false}
                className="absolute z-10 left-2 top-1/2 "
                prevRef={prevRef}
              />
              <NextArrow
                hasShadow={false}
                className="absolute z-10 right-2 top-1/2 "
                nextRef={nextRef}
              /> */}
            </div>
            {/* Mobile */}
          </Fragment>
        )}
        {!editMode && !isEmpty(others) && selectedId !== null && (
          <div className="xl:flex hidden gap-9">
            <div className="flex-1">
              <p className="text-p16-bold text-card-title mt-6">
                {others[selectedId]['OtherTitle']?.value}
              </p>
              <p className="text-p14 text-grey-1 mt-1">
                {others[selectedId]['OtherDescription']?.value}
              </p>
            </div>
            {showEditTool && (
              <Fragment>
                <div className="xl:flex hidden items-center gap-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEditItem()}
                  >
                    <XProfileIcon name="pen" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleRemoveItem(selectedId)}
                  >
                    <XProfileIcon name="trash" />
                  </div>
                </div>
                <div className="xl:hidden flex items-center gap-4">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleEditItemMobile()}
                  >
                    <XProfileIcon name="pen" />
                  </div>
                  <div
                    className="cursor-pointer"
                    onClick={() => handleRemoveItemMobile(selectedId)}
                  >
                    <XProfileIcon name="trash" />
                  </div>
                </div>
              </Fragment>
            )}
          </div>
        )}
        {!editMode && isEmpty(others) && (
          <div className="flex justify-between">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm trải nghiệm khác ngoài công việc của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/heart 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}

        {editMode && selectedId === null && (
          <div>
            <AnotherFormCreate
              portfolioId={portfolioId}
              handleCreateItem={handleCreateItem}
              handleCancle={handleResetData}
              btnRef={btnCreateRef}
            />
            <div className="flex flex-col gap-4">
              {Object.keys(others)?.map((key, ind) => {
                const { value, group } = others[key]['OtherImage'] || {}
                return (
                  <div key={ind}>
                    <div className="w-full flex gap-4 justify-start items-center relative overflow-hidden">
                      <div
                        className={`rounded-xl relative min-w-[80px] h-[80px] overflow-hidden cursor-pointer border border-grey-4

              `}
                      >
                        <Image
                          src={value}
                          layout="fill"
                          alt=""
                          priority={true}
                          objectFit="cover"
                        />
                      </div>
                      <div className="flex flex-col gap-2 ">
                        <div className="flex-1">
                          <p className="text-p16-bold text-card-title line-clamp-1">
                            {others[key]['OtherTitle']?.value}
                          </p>
                          <p className="text-p14 text-grey-1 line-clamp-2">
                            {others[key]['OtherDescription']?.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {editMode && selectedId !== null && (
          <div>
            <AnotherFormCreate
              portfolioId={portfolioId}
              handleCreateItem={handleSaveItem}
              handleCancle={handleResetData}
              defaultValues={defaultSelectedItem}
              btnRef={btnSaveRef}
            />
            <div className="flex flex-col gap-4">
              {Object.keys(others)?.map((key, ind) => {
                const { value, group } = others[key]['OtherImage'] || {}
                if (selectedId !== group) {
                  return (
                    <div key={ind}>
                      <div className="w-full flex gap-4 justify-start items-center relative overflow-hidden">
                        <div
                          className={`rounded-xl relative min-w-[80px] h-[80px] overflow-hidden cursor-pointer border border-grey-4
  
                `}
                        >
                          <Image
                            src={value}
                            layout="fill"
                            alt=""
                            priority={true}
                            objectFit="cover"
                          />
                        </div>
                        <div className="flex flex-col gap-2 ">
                          <div className="flex-1">
                            <p className="text-p16-bold text-card-title line-clamp-1">
                              {others[key]['OtherTitle']?.value}
                            </p>
                            <p className="text-p14 text-grey-1 line-clamp-2">
                              {others[key]['OtherDescription']?.value}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                }
              })}
            </div>
          </div>
        )}
      </div>
      <ModalApplicantProfile
        open={modalMobile}
        handleCancel={handleResetDataMobile}
        title="Trải nghiệm khác"
      >
        <div className="mt-6">
          <p className="text-grey-2 text-p14 italic mb-6">
            Những trải nghiệm khác như các dự án cá nhân, hoạt động ngoại
            khóa,...sẽ giúp bạn nổi bật hơn và tạo điểm cộng trước nhà tuyển
            dụng đấy!
          </p>
          {selectedId === null && (
            <AnotherFormCreate
              portfolioId={portfolioId}
              handleCreateItem={handleCreateItemMobile}
              btnRef={btnCreateRef}
            />
          )}

          {selectedId !== null && (
            <AnotherFormCreate
              portfolioId={portfolioId}
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

AnotherBlock.propTypes = {
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
AnotherBlock.defaultProps = {
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
  handleRemoveEditingId: () => {},
  handleUploadImageLocal: () => {}
}

export default AnotherBlock
