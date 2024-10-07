import React, { useEffect, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useDispatch } from 'react-redux'
import { getExamBySkill } from 'store/app/examSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectUserSkill } from 'store/app/portfolioSlice'
import PrivacySettings from '../PrivacySettings'
import Image from 'next/image'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import { isMobile } from 'store/helper/functionHelper'
import WrapperSkillItem from '../SkillBlock/WrapperSkillItem'
import SkillCommonFormCreate from '../SkillBlock/SkillCommonFormCreate'
import SkillCommonFormCreateMobile from '../SkillBlock/SkillCommonFormCreateMobile'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const SkillCommonBlock = (props) => {
  const {
    id,
    index,
    parentId,
    portfolioId,
    title,
    templateOptions,
    skillsCommon,
    childrenTemplate,
    dragStyle,
    handleDelete,
    handleCreateElement,
    handleSaveTemplateOption,
    handleInAtiveChildrenTemplate,
    handleEditingId,
    handleRemoveEditingId,
    showEditTool = true,
    hiddenDoExamBtn = false,
    isActive = true,
    editingBlockIds,
    loadingBlock,
    loadingPrivacy
  } = props

  const dispatch = useDispatch()
  const blockRef = useRef(null)
  const btnRef = useRef(null)
  const [editMode, setEditMode] = useState(false)
  const [modalMobile, toogleModalMobile] = useState(false)
  const [userTemplateSkill, setUserTemplateSkill] = useState({
    commonSkills: [],
    commonIds: []
  })
  const userSkills = useSelector(selectUserSkill)

  const handleCreateMode = () => {
    if (editingBlockIds?.length === 0) {
      setEditMode(true)
      handleEditingId(index)
      if (isMobile()) {
        toogleModalMobile(true)
        document.body.style.overflow = 'hidden'
      }
    }
  }

  const handleUpdateItems = async (skillCommonList = []) => {
    let groupsCommon = Object.keys(childrenTemplate)?.sort((a, b) => b - a)
    let groupCommon = groupsCommon?.length === 0 ? 0 : +groupsCommon[0] + 1

    const updatePayload = []
    const createPayload = []

    const { children } = templateOptions.find(
      (el) => el.templateOptionId === id
    )

    skillCommonList?.map((el) => {
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
          children['UserSkillCommonDetail']
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
          group: groupCommon
        })
        groupCommon++
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

    // await Promise.all([handle1, handle2]).then(([res]) => {
    //   handleResetData()
    // })
    // handleResetData()
  }

  const handleInitValue = () => {
    const tempArrCommon = []
    const tempIdsCommon = []

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
        } = childrenTemplate[childKey]['SkillCommon'] || {}
        if (isNaN(value)) {
          tempArrCommon.push({
            ...childrenTemplate[childKey]['SkillCommon'],
            name: value,
            skillId: value
          })
        } else {
          const findElement = skillsCommon.find(
            (s) => s.skillId === parseInt(value)
          )
          tempArrCommon.push({
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
      tempArrCommon.map((el) => {
        if (el.isActive) {
          tempIdsCommon.push(el.skillId)
        }
      })
    }
    setUserTemplateSkill({
      commonSkills: [...tempArrCommon],
      commonIds: [...tempIdsCommon]
    })
  }

  const handleResetData = () => {
    handleInitValue()
    setEditMode(false)
    handleRemoveEditingId(index)
    if (isMobile()) {
      toogleModalMobile(false)
      document.body.style.overflow = 'auto'
    }
  }

  const handleClickOutSideBlock = () => {
    if (editMode && !isMobile()) {
      btnRef?.current?.click()
    }
  }

  useEffect(() => {
    handleInitValue()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleClickOutSideBlock)

  return (
    <div
      ref={blockRef}
      id={`block-editing-id-${index}`}
      className="bg-white relative"
    >
      {((editingBlockIds?.includes(index) && loadingBlock) ||
        (loadingPrivacy?.blockIndex === index &&
          loadingPrivacy?.state === true)) && <LoadingRoleBlock />}
      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between rounded-tl-xl rounded-tr-xl border-t-2 border-l-2 border-r-2 border-[#F5F6F7]"
        style={dragStyle}
      >
        <div className="flex items-center gap-1">
          <p className="uppercase sm:text-p18-bold text-p14-bold text-blue-light">
            Kỹ năng chung
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
          <div className="items-center gap-3">
            {!editMode && (
              <div
                className="cursor-careerPath ignore-el-pdf"
                onClick={handleCreateMode}
              >
                <XProfileIcon name="pen" fill="#294F9B" />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="sm:p-6 p-3 bg-white  border-2 border-[#F5F6F7] rounded-bl-xl rounded-br-xl">
        {!editMode && userTemplateSkill?.commonSkills?.length > 0 && (
          <div>
            <div className="flex flex-wrap gap-4">
              {userTemplateSkill?.commonSkills?.length > 0 &&
                userTemplateSkill.commonSkills?.map((skill, ind) => {
                  const { name, group, isActive, skillId } = skill || {}
                  const redirectToExam = async () => {
                    if (showEditTool) {
                      if (!isNaN(skillId)) {
                        const fetchExam = await dispatch(
                          getExamBySkill({ skillId })
                        )
                        const res = unwrapResult(fetchExam)
                        if (res?.data) {
                          window.open(`/exam/${res?.data?.examGuid}`)
                        } else {
                          toast(
                            AlertWaring({
                              title: res?.errorMessage
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
                      } else {
                        toast(
                          AlertWaring({
                            title: 'Kỹ năng này không có bài kiểm tra'
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
                  }
                  if (isActive && name && name !== '') {
                    const findExisSkill = userSkills?.find(
                      (el) => el?.skillId === skillId
                    )
                    return (
                      <div key={`skill-active-${ind}`}>
                        <WrapperSkillItem
                          persent={findExisSkill?.percentageComplete || 0}
                          skillName={name}
                          redirectToExam={redirectToExam}
                          isShowTooltip={showEditTool}
                        />
                      </div>
                    )
                  }
                })}
            </div>
          </div>
        )}

        {userTemplateSkill?.skills?.length === 0 && !editMode && (
          <div className="flex justify-between min-h-[130px]">
            <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
              Hãy thêm kỹ năng chung của bạn
            </pre>
            <div>
              <Image
                alt="target-portfolio"
                src="/images/Portfolio/resume 1.png"
                width={70.4}
                height={70.4}
                className="opacity-30"
                quality={100}
              />
            </div>
          </div>
        )}

        {editMode && (
          <SkillCommonFormCreate
            handleCancle={handleResetData}
            skillsCommon={skillsCommon}
            userSkillCommonIds={userTemplateSkill.commonIds}
            userCommonSkills={userTemplateSkill.commonSkills}
            handleUpdateItems={handleUpdateItems}
            btnRef={btnRef}
          />
        )}

        <ModalApplicantProfile
          open={modalMobile}
          handleCancel={handleResetData}
          title="Kỹ năng chuyên môn"
        >
          <div className="mt-4">
            <SkillCommonFormCreateMobile
              handleCancle={handleResetData}
              skillsCommon={skillsCommon}
              userSkillCommonIds={userTemplateSkill.commonIds}
              userCommonSkills={userTemplateSkill.commonSkills}
              handleUpdateItems={handleUpdateItems}
              btnRef={btnRef}
            />
          </div>
        </ModalApplicantProfile>
      </div>
    </div>
  )
}

SkillCommonBlock.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  skillsAdvanced: PropTypes.array,
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

SkillCommonBlock.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: 'No title',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  skillsAdvanced: [],
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

export default SkillCommonBlock
