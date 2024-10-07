import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import isEmpty from 'lodash/isEmpty'
import PrivacySettings from '../PrivacySettings'
import Button from 'common/presentation/Button'
import TextareaAutosize from 'react-textarea-autosize'
import Image from 'next/image'
import ModalApplicantProfile from 'common/presentation/ModalApplicantProfile'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'

const TargetBlock = (props) => {
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
  const [edit, setEdit] = useState(false)
  const [description, setDescription] = useState('')
  const [errorMessage, setErroMessage] = useState(false)
  const [modalMobile, toogleModalMobile] = useState(false)
  const handleChangeDescription = (value) => {
    if (errorMessage) {
      setErroMessage('')
    }
    setDescription(value)
  }
  const handleClickEdit = () => {
    if (editingBlockIds?.length === 0) {
      setEdit(!edit)
      handleEditingId(index)
    }
  }
  const handleClickEditMobile = () => {
    if (editingBlockIds?.length === 0) {
      // setEdit(!edit)
      toogleModalMobile(true)
      handleEditingId(index)
      document.body.style.overflow = 'hidden'
    }
  }
  const handleReset = () => {
    setEdit(!edit)

    handleRemoveEditingId(index)
  }
  const handleResetMobile = () => {
    toogleModalMobile(false)
    handleRemoveEditingId(index)
    document.body.style.overflow = 'auto'
  }
  const handleViewMode = () => {
    if (isEmpty(childrenTemplate)) {
      setDescription('')
    } else {
      const { value = '' } =
        childrenTemplate[0]['CareerTargetDescription'] || {}
      setDescription(value)
    }
    handleReset()
  }
  const handleViewModeMobile = () => {
    if (isEmpty(childrenTemplate)) {
      setDescription('')
    } else {
      const { value = '' } =
        childrenTemplate[0]['CareerTargetDescription'] || {}
      setDescription(value)
    }
    handleResetMobile()
  }
  const handleSave = async () => {
    // Update Template Option
    if (isEmpty(childrenTemplate)) {
      const template = templateOptions.find(
        (el) => el?.templateOptionName === 'CareerTarget'
      )
      const { templateOptionId, templateOptionType, templateOptionName } =
        template?.children['CareerTargetDescription']

      const listCreatePayload = [
        {
          templateOptionId: templateOptionId,
          templateOptionType: templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: templateOptionName,
          value: description,
          isActive: true,
          parentId: parentId,
          group: 0
        }
      ]
      const handle = await new Promise(async (resolve) => {
        handleCreateElement(listCreatePayload)
        resolve()
      })
      await Promise.all([handle]).then(([res]) => {
        handleReset()
      })
    } else {
      const {
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group
      } = childrenTemplate[0]['CareerTargetDescription']
      const updatePayload = {
        templateOptionId: id,
        templateOptionName: templateOptionName,
        value: description,
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: true
      }
      const handle = handleSaveTemplateOption([updatePayload])
      await Promise.all([handle]).then(([res]) => {
        handleReset()
      })
    }
  }
  const handleSaveMobile = async () => {
    // Update Template Option
    if (isEmpty(childrenTemplate)) {
      const template = templateOptions.find(
        (el) => el?.templateOptionName === 'CareerTarget'
      )
      const { templateOptionId, templateOptionType, templateOptionName } =
        template?.children['CareerTargetDescription']

      const listCreatePayload = [
        {
          templateOptionId: templateOptionId,
          templateOptionType: templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: templateOptionName,
          value: description,
          isActive: true,
          parentId: parentId,
          group: 0
        }
      ]
      await new Promise(async (resolve) => {
        handleCreateElement(listCreatePayload)
        resolve()
      })
    } else {
      const {
        templateOptionName,
        templateOptionType,
        templateOptionValueId,
        group
      } = childrenTemplate[0]['CareerTargetDescription']
      const updatePayload = {
        templateOptionId: id,
        templateOptionName: templateOptionName,
        value: description,
        templateOptionType: templateOptionType,
        parentId: parentId,
        group: group,
        templateOptionValueId: templateOptionValueId,
        portfolioId: portfolioId,
        isActive: true
      }
      handleSaveTemplateOption([updatePayload])
    }
    handleResetMobile()
  }

  const handleSaveOnClickOutside = async () => {
    handleSave()
  }

  useEffect(() => {
    if (!isEmpty(childrenTemplate)) {
      const { value } = childrenTemplate[0]['CareerTargetDescription'] || ''
      setDescription(value)
    }
  }, [childrenTemplate])

  useOnClickOutside(blockRef, handleOffShowError)
  useOnClickOutside(blockRef, handleSaveOnClickOutside)

  const EditMode = (
    <div
      ref={blockRef}
      id={`block-editing-id-${index}`}
      className="hidden xl:block rounded-xl border-2 border-[#F5F6F7] overflow-hidden bg-white"
      style={{
        borderColor: editingBlockIds.includes(index) && showError && 'red'
      }}
    >
      <div
        style={dragStyle}
        className="flex  sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between"
      >
        <div className="flex items-center gap-1">
          {/* <XProfileIcon name="career" fill="#294F9B" /> */}
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
                    action: () => {
                      handleDelete(index, parentId)
                    }
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
      </div>
      <div className="sm:p-7 p-3 bg-white">
        <p className="text-grey-1 text-p16 mb-4 italic">
          Bạn có thể chia sẻ về những mong muốn và mục tiêu ngắn hạn, dài hạn
          đối với vị trí mà bạn đang ứng tuyển để nhà tuyển dụng hiểu rõ hơn về
          bạn nhé.
          <li>Mục tiêu công việc ngắn hạn của bạn là gì?</li>
          <li>Định hướng phát triển dài hạn của bạn với vị trí này là gì?</li>
          <li>
            Tại sao doanh nghiệp nên tuyển dụng bạn cho vị trí này? Bạn có gì
            nổi bật?
          </li>
        </p>
        <TextareaAutosize
          placeholder=""
          onChange={(e) => handleChangeDescription(e.target.value)}
          value={description}
          className="custom-scrollbar-none-border min-h-[200px] rounded-lg p-2 block w-full h-[145px] text-p16 resize-none overflow-auto outline-0 text-neutral border border-grey-3"
          autoFocus
        />
        <div className="h-[22px]">
          <p className="text-red-500 text-p14">{errorMessage}</p>
        </div>
        {showEditTool && (
          <div className="flex justify-end">
            <div className="flex items-center gap-4">
              <Button
                title="Huỷ"
                background="bg-grey-4"
                margin="m-0"
                rounded="rounded-lg"
                width="w-[99px] "
                onClick={handleViewMode}
              />
              <Button
                title="Lưu"
                margin="m-0"
                rounded="rounded-lg"
                width="w-[99px] "
                onClick={handleSave}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
  const ViewMode = (
    <div className="rounded-xl border-2 border-[#F5F6F7]  bg-white">
      <div
        className="flex sm:px-6 px-3 sm:py-4 py-3 bg-stoke items-center justify-between rounded-t-xl "
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
                    action: () => {
                      handleDelete(index, parentId)
                    }
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
              {!edit && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={handleClickEdit}
                >
                  <XProfileIcon
                    name={isEmpty(childrenTemplate) ? 'addCircle' : 'pen'}
                    fill="#294F9B"
                  />
                </div>
              )}
            </div>
            <div className="flex xl:hidden items-center gap-3">
              {!edit && (
                <div
                  className="cursor-careerPath ignore-el-pdf"
                  onClick={handleClickEditMobile}
                >
                  <XProfileIcon
                    name={isEmpty(childrenTemplate) ? 'addCircle' : 'pen'}
                    fill="#294F9B"
                  />
                </div>
              )}
            </div>
          </Fragment>
        )}
      </div>
      {description && (
        <div className="sm:p-6 p-3 bg-white rounded-b-xl">
          <pre className="whitespace-pre-wrap	text-p16 text-grey-1 break-words">
            {description}
          </pre>
        </div>
      )}
      {isEmpty(description) && (
        <div className="sm:p-6 p-3 bg-white min-h-[130px] flex justify-between">
          <pre className="whitespace-pre-wrap	text-p16 text-grey-2 break-words">
            Hãy thêm mục tiêu nghề nghiệp của bạn
          </pre>
          <div>
            <Image
              alt="target-portfolio"
              src="/images/Portfolio/target 1.png"
              width={70.4}
              height={70.4}
              className="opacity-30"
              quality={100}
            />
          </div>
        </div>
      )}
    </div>
  )
  return (
    <Fragment>
      <div className="relative">
        {((editingBlockIds?.includes(index) && loadingBlock) ||
          (loadingPrivacy?.blockIndex === index &&
            loadingPrivacy?.state === true)) && <LoadingRoleBlock />}
        {edit ? EditMode : ViewMode}
        <ModalApplicantProfile
          open={modalMobile}
          handleCancel={handleViewModeMobile}
          title="Mục tiêu nghề nghiệp"
        >
          <div
            id={`block-editing-id-${index}`}
            className="bg-white w-full h-4/5"
            // style={{
            //   borderColor: editingBlockIds.includes(index) && showError && 'red'
            // }}
          >
            <div className="mt-4 bg-white w-full flex flex-col justify-between h-full">
              <div>
                <p className="text-grey-1 text-p14 mb-8 italic">
                  Bạn có thể chia sẻ về những mong muốn và mục tiêu ngắn hạn,
                  dài hạn đối với vị trí mà bạn đang ứng tuyển để nhà tuyển dụng
                  hiểu rõ hơn về bạn nhé.
                  <li>Mục tiêu công việc ngắn hạn của bạn là gì?</li>
                  <li>
                    Định hướng phát triển dài hạn của bạn với vị trí này là gì?
                  </li>
                  <li>
                    Tại sao doanh nghiệp nên tuyển dụng bạn cho vị trí này? Bạn
                    có gì nổi bật?
                  </li>
                </p>
                <TextareaAutosize
                  placeholder=""
                  onChange={(e) => handleChangeDescription(e.target.value)}
                  value={description}
                  className="custom-scrollbar-none-border placeholder:text-grey-3 min-h-[200px] rounded-lg p-2 block w-full h-[145px] text-p16 resize-none overflow-auto outline-0 text-neutral border border-grey-3"
                  autoFocus
                />
                <div className="h-[22px]">
                  <p className="text-red-500 text-p14">{errorMessage}</p>
                </div>
              </div>
              {showEditTool && (
                <div className=" w-full ">
                  {/* <div className="flex items-center gap-4"> */}
                  {/* <Button
                    title="Huỷ"
                    background="bg-grey-4"
                    margin="m-0"
                    rounded="rounded-lg"
                    width="w-[99px] "
                    onClick={handleViewMode}
                  /> */}
                  <Button
                    title="Lưu"
                    margin="m-0"
                    rounded="rounded-lg"
                    width="w-full "
                    height="h-[48px]"
                    onClick={handleSaveMobile}
                  />
                </div>
                // </div>
              )}
            </div>
          </div>
        </ModalApplicantProfile>
      </div>
    </Fragment>
  )
  // if (edit) return EditMode
  // return ViewMode
}

TargetBlock.propTypes = {
  id: PropTypes.number,
  parentId: PropTypes.number,
  portfolioId: PropTypes.number,
  title: PropTypes.string,
  childrenTemplate: PropTypes.object,
  btnTitle: PropTypes.string,
  showUploadImage: PropTypes.bool,
  dragStyle: PropTypes.object,
  handleDelete: PropTypes.func,
  handleSaveTemplateOption: PropTypes.func,
  handleCreateElement: PropTypes.func,
  handleEditingId: PropTypes.func,
  handleRemoveEditingId: PropTypes.func,
  editingBlockIds: PropTypes.array
}

TargetBlock.defaultProps = {
  id: 0,
  parentId: 0,
  portfolioId: 0,
  title: '',
  btnTitle: '',
  templateOptionName: '',
  showUploadImage: false,
  childrenTemplate: {},
  dragStyle: {},
  editingBlockIds: [],
  templateOptions: {},
  handleDelete: () => {},
  handleSaveTemplateOption: () => {},
  handleCreateElement: () => {},
  handleEditingId: () => {},
  handleRemoveEditingId: () => {},
  handleCreateElement: () => {}
}

export default TargetBlock
