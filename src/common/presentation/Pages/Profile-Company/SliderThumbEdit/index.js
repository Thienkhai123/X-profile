import React, { useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  removeCultureMediaImages,
  selectInitialState,
  toogleModal,
  updateDescriptionUpload,
  updateImageUpload,
  updateItemDescription,
  updateListImage
} from 'store/app/edit-mode-company/profile/thumbSlice'
import { useDispatch } from 'react-redux'

import { DialogCropImage } from '../../applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { urlToFile } from 'store/helper/functionHelper'
import {
  convertToWebp,
  convertToWebpAxios,
  generateVideoThumbnail,
  getPresignedUrl,
  getPresignedUrlByAxios,
  reduceImageThumbnail
} from 'store/helper/serviceHelper'

import BlockEditorContainer from 'common/container/block-editor'
import SliderThumbViewState from '../../edit-mode-company/company/SliderThumbViewState'
import SliderThumbEditState from '../../edit-mode-company/company/SliderThumbEditState'
import { selectUserProfile } from 'store/app/userSlice'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { DialogSliderThumbCropImage } from '../../applicant-profile/TemplateContainer/AnotherBlock/dialogSlideThumbCropImages/dialogSliderThumbCropImage'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const SliderThumbEdit = (props) => {
  const {
    isEdit = false,
    errors = null,
    handleResetErrors = () => {},
    setUploading = () => {}
  } = props
  const dispatch = useDispatch()
  const uploadRef = useRef(null)
  const [durationVideo, setDurationVideo] = useState(0)
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })

  const { listImage, imageUpload, openModal, medias, descriptionUpload } =
    useSelector(selectInitialState) || {}
  const user = useSelector(selectUserProfile)
  const handleChangeDescription = (data) => {
    dispatch(updateDescriptionUpload(data))
  }
  const handleUploadImage = (file) => {
    uploadRef.current?.click()
    handleResetErrors('CultureMedias')
  }
  const handleOpenModal = () => {
    dispatch(toogleModal(true))
  }
  const handleCloseModal = () => {
    dispatch(toogleModal(false))
    dispatch(updateDescriptionUpload(''))
  }
  const onChangeEdit = (data) => {
    dispatch(updateItemDescription(data))
  }
  const onChangeImageUpload = async (file) => {
    // setUploading(true)
    const imageFile = file[0]

    await getPresignedUrlByAxios(imageFile, 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )

    if (imageFile.type === 'video/mp4') {
      const handleValidateDuration = async (duration = 0) => {
        if (imageFile.size <= 524288000 && duration <= 600) {
          const videoUrl = await getPresignedUrl(
            imageFile,
            'User/' + user?.userId
          )
          const videoThumbs = await generateVideoThumbnail(imageFile)
          const file = await urlToFile(videoThumbs)
          const thumbUrl = await convertToWebpAxios(
            file,
            'User/' + user?.userId
          )
          dispatch(
            updateListImage([
              ...listImage,
              {
                cultureMediaId: 0,
                enumMediaType: 1,
                position: 0,
                url: videoUrl,
                thumbnailUrl: thumbUrl?.url,
                isCreate: true
              }
            ])
          )
          if (thumbUrl && videoUrl) {
            setPersent({ onUpload: false, upload: 0 })
          }

          // setUploading(false)
        } else {
          // setUploading(false)
          toast(
            AlertError({
              title: 'Tải lên video không thành công',
              description: 'Hiện tại hệ thống chưa hỗ trợ video dung lượng lớn',
              background: 'error'
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
          setPersent({ onUpload: false, upload: 0 })
        }
      }
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.onload = function () {
        const aud = new Audio(reader.result)
        aud.onloadedmetadata = function () {
          handleValidateDuration(aud.duration)
        }
      }
    } else if (imageFile.type.startsWith('image/')) {
      if (imageFile) {
        if (imageFile.size <= 5242880) {
          const reader = new FileReader()
          reader.readAsDataURL(imageFile)
          reader.addEventListener('load', () => {
            dispatch(updateImageUpload(reader.result))
            handleOpenModal()
          })
          // setUploading(false)
        } else {
          // setUploading(false)
          toast(
            AlertError({
              title: 'Tải lên ảnh không thành công'
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
          setPersent({ onUpload: false, upload: 0 })
        }
      }
    } else {
      setUploading(false)
      toast(
        AlertError({
          title: 'Tải lên không thành công'
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
  const handleCropImageComplete = async (src) => {
    // setUploading(true)
    if (src) {
      const file = await urlToFile(src)
      const imgUrl = await convertToWebpAxios(file, 'User/' + user?.userId)
      const thumbUrl = await reduceImageThumbnail(file, 'User/' + user?.userId)
      const tempId = listImage?.length
      dispatch(
        updateListImage([
          ...listImage,
          {
            cultureMediaId: 0,
            enumMediaType: 0,
            position: 0,
            url: imgUrl?.url,
            thumbnailUrl: thumbUrl,
            isCreate: true,
            description: descriptionUpload
          }
        ])
      )
      if (imgUrl?.url && thumbUrl) {
        setPersent({ onUpload: false, upload: 0 })
      }

      // setUploading(false)
    }
  }
  const handleChangeRemove = (index) => {
    dispatch(removeCultureMediaImages({ id: index }))
  }

  return (
    <div className=" w-full ">
      <BlockEditorContainer
        editmode={isEdit}
        editState={
          <SliderThumbEditState
            handleUploadImage={handleUploadImage}
            onChangeEdit={onChangeEdit}
            medias={listImage}
            handleChangeRemove={handleChangeRemove}
            errors={errors}
            handleResetErrors={handleResetErrors}
            persent={persent?.upload}
            checkUpload={persent?.onUpload}
          />
        }
        viewState={<SliderThumbViewState medias={medias} />}
      />
      <input
        ref={uploadRef}
        type="file"
        accept="image/*,video/mp4"
        className="hidden"
        onChange={(e) => {
          onChangeImageUpload(e.target.files)
          e.target.value = ''
        }}
      />

      <div>
        <DialogSliderThumbCropImage
          aspect={946 / 484}
          src={imageUpload}
          handleChangeDescription={handleChangeDescription}
          isVisible={openModal}
          description={descriptionUpload}
          handleOnClose={handleCloseModal}
          handleCropImage={handleCropImageComplete}
        />
      </div>
    </div>
  )
}

export default SliderThumbEdit
