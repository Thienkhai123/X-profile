import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import useEditMode from 'common/hooks/useEditMode'
import BlockEditorContainer from 'common/container/block-editor'
import DevRoadmapPositionEdit from './devRoadmapPositionEdit'
import DevRoadmapPositionView from './devRoadmapPositionView'
import {
  addPositionListEdit,
  getRoadmapEditPosition,
  getSystemImages,
  removeRoadmap,
  saveRoadmapPositionEdit,
  selectRoadmapPositionList,
  selectSystemImages,
  updatePositionListEdit
} from 'store/app/edit-mode-company/position/roadmapSlice'
import Modal from 'common/presentation/Modal'
import SystemImageModal from './SystemImageModal'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const DevRoadmapPosition = (props) => {
  const { pageEditMode, handleResetErrors, errors } = props
  const router = useRouter()
  const { query } = router
  const { departmentPositionId, companyId } = query
  const dispatch = useDispatch()
  const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  // const skillList = useSelector(selectSkillListSoftSkillPosition)
  const positionList = useSelector(selectRoadmapPositionList)
  const systemImages = useSelector(selectSystemImages)
  const [openModalImages, setOpenModalImages] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState(23)
  const [editingId, setEditingId] = useState(null)
  const toggleModal = (id) => {
    if (!openModalImages) {
      setEditingId(id)
      setOpenModalImages(true)
    } else {
      setEditingId(null)
      setOpenModalImages(false)
    }
  }

  const handleAdd = () => {
    const item = {
      imageUrl: '',
      name: '',
      imageId: 0
    }
    dispatch(addPositionListEdit(item))
  }

  const onClickEdit = () => {
    // ... add function here
    handleShowEditMode()
  }
  const onChangeEdit = async (data, id) => {
    dispatch(updatePositionListEdit(data))
    handleResetErrors(id)
  }
  const onClickCancel = () => {
    if (departmentPositionId) {
      dispatch(getRoadmapEditPosition(query))
    }
    handleShowViewMode()
  }

  const onClickSave = async () => {
    if (
      positionList?.every((item) => item?.name !== '' && item?.imageUrl !== '')
    ) {
      const payload = {
        careerPaths: [...positionList],
        companyId: companyId,
        departmentPositionId: departmentPositionId,
        updateProperties: ['CareerPaths']
      }
      const res = await dispatch(saveRoadmapPositionEdit(payload))

      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: res?.payload?.errorMessage || 'Lưu không thành công'
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
      } else {
        toast(
          AlertSuccess({
            title: 'Bạn đã lưu thành công'
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
      if (departmentPositionId) {
        dispatch(getRoadmapEditPosition(query))
      }
      // ... add function here
      handleShowViewMode()
    } else {
      toast(
        AlertWaring({
          title: 'Vui lòng điền đủ thông tin'
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
  const handleRemoveItem = (id) => {
    dispatch(removeRoadmap({ id }))
    handleResetErrors(`roadMap_imageUrl_${id}`)
  }

  const onClickOutSide = () => {
    if (!openModalImages) {
      onClickSave()
    }
  }

  const errorsList = []
  const errorsArray = Object.values(errors || {}) || []
  if (errorsArray?.length > 0) {
    errorsArray?.forEach((elm) => {
      if (elm.id !== '') {
        errorsList.push(elm.id)
      }
    })
  }

  // useEffect(() => {
  //   if (departmentPositionId) {
  //     dispatch(getRoadmapEditPosition(query))
  //   }
  //   dispatch(getSystemImages())
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [departmentPositionId, companyId, dispatch])
  return (
    <div>
      {((!pageEditMode && positionList?.length > 0) || pageEditMode) && (
        <div className="bg-white">
          <BlockEditorContainer
            editmode={pageEditMode}
            editState={
              <DevRoadmapPositionEdit
                positionList={positionList}
                editmode={editmode}
                handleAdd={handleAdd}
                onChangeEdit={onChangeEdit}
                toggleModal={toggleModal}
                handleRemoveItem={handleRemoveItem}
                errorsList={errorsList || []}
              />
            }
            viewState={<DevRoadmapPositionView positionList={positionList} />}
          />

          <Modal
            toggleModal={toggleModal}
            open={openModalImages}
            childStyle="w-screen h-fit max-h-[800px] sm:w-fit   p-[40px] bg-white rounded-lg"
            title="Lộ trình phát triển"
            styleTitle="text-p28-bold text-black"
          >
            <SystemImageModal
              systemImages={systemImages}
              selectedImageId={selectedImageId}
              toggleModal={toggleModal}
              setSelectedImageId={setSelectedImageId}
              editingId={editingId}
              onChangeEdit={onChangeEdit}
              positionList={positionList}
            />
          </Modal>
        </div>
      )}
    </div>
  )
}

DevRoadmapPosition.propTypes = {}
DevRoadmapPosition.defaultProps = {}

export default DevRoadmapPosition
