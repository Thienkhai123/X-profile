import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import AchievementCard from './AchivementCard'
import { useSelector } from 'react-redux'
import { selectAchivementImages } from 'store/app/portfolioSlice'
import cloneDeep from 'lodash/cloneDeep'
import PrivacySettings from '../PrivacySettings'
import isEmpty from 'lodash/isEmpty'
import Image from 'next/image'
import AchievementFormCreate from './AchievementFormCreate'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import { delay, isMobile } from 'store/helper/functionHelper'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'

const AchievementBlock = (props) => {
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
  const [templateActive, setTemplateActive] = useState(null)
  const [rerender, setRerender] = useState(false)
  const achivementImages = useSelector(selectAchivementImages)
  const [modalMobile, toogleModalMobile] = useState(false)
  const [selectedId, setSelectedId] = useState(null)
  const [defaultSelectedItem, setDefaultSelectedItem] = useState({})
  const [loadingOnRemove, setLoadingOnRemove] = useState(false)

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditMode(true)
      handleEditingId(index)
      setSelectedId(null)
      if (isMobile()) {
        toogleModalMobile(true)
        document.body.style.overflow = 'hidden'
      }
    }
  }

  const handleSelectedItem = (group) => {
    if (editingBlockIds?.length === 0) {
      const groupVal = templateActive[group]
      if (!isEmpty(groupVal)) {
        const defaultVal = {}
        Object.keys(groupVal).map((keyEl) => {
          if (keyEl === 'Image') {
            defaultVal['UserAchievementImage'] = groupVal[keyEl]?.value
          } else {
            defaultVal[keyEl] = groupVal[keyEl]?.value
          }
        })
        setEditMode(true)
        handleEditingId(index)
        setDefaultSelectedItem(defaultVal)
        setSelectedId(group)
        if (isMobile()) {
          toogleModalMobile(true)
          document.body.style.overflow = 'hidden'
        }
      }
    }
  }

  const resetState = () => {
    getInitialData()
    handleRemoveEditingId(index)
    setEditMode(false)
    setLoadingOnRemove(false)

    if (isMobile()) {
      toogleModalMobile(false)
      document.body.style.overflow = 'auto'
    }
  }

  const handleRemoveAchievementItem = async (group) => {
    setLoadingOnRemove(true)

    const groupVal = templateActive[group]
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
      resetState()
    })
  }

  const handleCreateItem = async (payload) => {
    // Create Template Option Children
    let groups = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let group = groups?.length === 0 ? 0 : +groups[0] + 1

    const listCreatePayload = []
    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )

    delete children['UserAchievementSubTitle']

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
      resetState()
    })
  }

  const handleSaveItem = async (data) => {
    const listEditPayload = []
    Object.keys(templateActive[selectedId])?.map((childKey) => {
      const {
        templateOptionId,
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group,
        value,
        isActive
      } = templateActive[selectedId][childKey]
      listEditPayload.push({
        templateOptionId: templateOptionId,
        templateOptionName: templateOptionName,
        value:
          childKey === 'Image' ? data['UserAchievementImage'] : data[childKey],
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
      resetState()
    })
  }

  const getInitialData = () => {
    if (Object?.keys(childrenTemplate)?.length > 0) {
      const tempObj = {}
      Object.keys(childrenTemplate)?.map((key) => {
        const { isActive } = childrenTemplate[key]['Image'] || {}
        if (isActive) {
          tempObj[key] = cloneDeep(childrenTemplate[key])
        }
      })
      setTemplateActive({ ...tempObj })
      setRerender(!rerender)
    } else {
      setTemplateActive({})
    }
  }

  const handleClickOutsideBlock = () => {
    if (showError) {
      handleOffShowError()
    }
    if (editMode && !isMobile()) {
      if (selectedId !== null) {
        btnSaveRef.current?.click()
      } else {
        btnCreateRef.current?.click()
      }
    }
  }

  useEffect(() => {
    getInitialData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutsideBlock)

  return (
    <div
      ref={blockRef}
      id={`block-editing-id-${index}`}
      className=" bg-white relative"
      style={{
        borderColor: editingBlockIds.includes(index) && showError ? 'red' : null
      }}
    >
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true) ||
        loadingOnRemove) && <LoadingRoleBlock />}

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
          <div className=" items-center gap-3">
            {!editMode && (
              <div
                className="cursor-careerPath ignore-el-pdf"
                onClick={handleCreateMode}
              >
                <XProfileIcon name="addCircle" fill="#294F9B" />
              </div>
            )}
          </div>
        )}
      </div>

      <div className="sm:p-6 p-3 bg-white min-h-[130px] border-2 border-[#F5F6F7] rounded-bl-xl rounded-br-xl">
        {!isEmpty(templateActive) && !editMode && (
          <div>
            <div key={rerender} className=" mx-8">
              <Slider
                breakpoints={{
                  330: {
                    slidesPerView: 1,
                    slidesPerGroup: 1
                  },
                  700: {
                    slidesPerView: 2.7,
                    slidesPerGroup: 1
                  },
                  1100: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                  },
                  1280: {
                    slidesPerView: 3,
                    slidesPerGroup: 1
                  }
                }}
                hasArrow={
                  !editMode && templateActive
                    ? Object?.keys(templateActive)?.length > 3
                    : false
                }
                hasArrowMobile={
                  !editMode && templateActive
                    ? Object?.keys(templateActive)?.length > 1
                    : false
                }
                spaceBetween={80}
                rewind={false}
              >
                {templateActive &&
                  Object?.keys(templateActive)?.length > 0 &&
                  Object?.keys(templateActive)?.map((key, index) => {
                    const { value: imageId, isActive } =
                      templateActive[key]['Image'] || {}
                    const { value: title } =
                      templateActive[key]['UserAchievementTitle'] || {}
                    // const { value: content } =
                    //   templateActive[key]['UserAchievementSubTitle'] || {}
                    const { value: time } =
                      templateActive[key]['UserAchievementTime'] || {}
                    if (isActive) {
                      return (
                        <SwiperSlide key={index} style={{ height: 'auto' }}>
                          <AchievementCard
                            imageId={parseInt(imageId)}
                            value={{
                              title: title,
                              // content: content,
                              time: time
                            }}
                            achivementImages={achivementImages}
                            group={key}
                            handleRemoveAchievementItem={
                              handleRemoveAchievementItem
                            }
                            handleSelectedItem={handleSelectedItem}
                            showEditTool={showEditTool}
                          />
                        </SwiperSlide>
                      )
                    }
                  })}
              </Slider>
            </div>
            {editMode && (
              <div className="flex items-center justify-center ignore-el-pdf">
                <Button
                  title="Thêm thành tích"
                  rounded="rounded-[8px]"
                  background={'bg-[#F6BB3A]'}
                  color="text-neutral"
                  padding="py-[10px] px-[20px]"
                  height="h-auto"
                  width="w-[240px]"
                  textWeight={'sm:text-p18-bold text-p14-bold'}
                  onClick={handleCreateItem}
                />
              </div>
            )}
          </div>
        )}
        {isEmpty(templateActive) && !editMode && (
          <div className="flex justify-between">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm thành tích của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/trophy 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}
        {editMode && selectedId === null && (
          <AchievementFormCreate
            achivementImages={achivementImages}
            handleCancle={resetState}
            handleCreateItem={handleCreateItem}
            btnRef={btnCreateRef}
          />
        )}

        {editMode && selectedId !== null && (
          <AchievementFormCreate
            achivementImages={achivementImages}
            defaultValues={defaultSelectedItem}
            handleCancle={resetState}
            handleCreateItem={handleSaveItem}
            btnRef={btnSaveRef}
          />
        )}

        <ModalApplicantProfile
          open={modalMobile}
          handleCancel={resetState}
          title="Bảng thành tích"
        >
          <div className="mt-6">
            {editMode && selectedId === null && (
              <AchievementFormCreate
                achivementImages={achivementImages}
                handleCancle={resetState}
                handleCreateItem={handleCreateItem}
                btnRef={btnCreateRef}
              />
            )}

            {editMode && selectedId !== null && (
              <AchievementFormCreate
                achivementImages={achivementImages}
                defaultValues={defaultSelectedItem}
                handleCancle={resetState}
                handleCreateItem={handleSaveItem}
                btnRef={btnSaveRef}
              />
            )}
          </div>
        </ModalApplicantProfile>
      </div>
    </div>
  )
}

AchievementBlock.propTypes = {
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
AchievementBlock.defaultProps = {
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

export default AchievementBlock
