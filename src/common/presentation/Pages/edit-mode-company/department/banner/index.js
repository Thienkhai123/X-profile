import BlockEditorContainer from 'common/container/block-editor'
import BannerDepartmentEditMode from './bannerDepartmentEditMode'
import BannerDepartmentViewMode from './bannerDepartmentViewMode'
import useModal from 'common/hooks/useModal'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getBannerEditDepartment,
  saveDepartmentBannerEdit,
  selectDepartmentImageAvatarUpload,
  selectInitSateDepartment,
  updateDepartmentBannerEdit,
  updateDepartmentBannerImageUpload
} from 'store/app/edit-mode-company/department/bannerSlice'
import {
  convertToWebp,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { urlToFile } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import { selectUserProfile } from 'store/app/userSlice'
import { useState } from 'react'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const BannerDepartmentEdit = ({
  departmentId = 0,
  companyId = 0,
  editmode = false,
  errors = '',
  handleResetErrors = () => {},
  seenNumber = 0
}) => {
  const [open, toggleModal] = useModal()
  const [cropModal, toggleCropModal] = useModal()
  // const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  // const { departmentId, companyId } = query
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })
  const { profileDepartment, profileCompany } = useSelector(
    selectInitSateDepartment
  )
  const user = useSelector(selectUserProfile)
  const imageUpload = useSelector(selectDepartmentImageAvatarUpload) || {}
  const dispatch = useDispatch()
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    if (profileCompany.companyId && profileDepartment.departmentId) {
      titleBreadCrumbs.push(
        {
          name: profileCompany?.name,
          href: `profile-company/${profileCompany?.companyId}/edit`
        },

        {
          name: profileDepartment?.name || 'Phòng ban mới',
          href: `profile-company/${profileCompany?.companyId}/${profileDepartment?.departmentId}`
        }
      )
    }
    return titleBreadCrumbs
  }
  const onChangeImageUpload = async (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateDepartmentBannerImageUpload(reader.result))
        toggleCropModal()
      })
      handleResetErrors('ImageUrl')
    }
  }
  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)

      handleUploadAvatar(file)
    }
  }
  const handleUploadAvatar = async (file) => {
    await getPresignedUrlByAxios(file, 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    const imgUrl = await convertToWebp(file, 'User/' + user?.userId)
    if (imgUrl) {
      dispatch(
        updateDepartmentBannerEdit({ ...profileDepartment, imageUrl: imgUrl })
      )
      setPersent({ onUpload: false, upload: 0 })
    }
  }

  const onClickEdit = () => {
    // handleShowEditMode()
  }

  const onClickCancel = () => {
    if (departmentId) {
      dispatch(
        getBannerEditDepartment({
          departmentId,
          companyId
        })
      )
    }
    // handleShowViewMode()
  }

  const onClickSave = async () => {
    const payload = {
      ...profileDepartment,
      companyId: companyId,
      departmentId: departmentId,
      updateProperties: ['Name', 'ShortDescription', 'ImageUrl']
    }
    const res = await dispatch(saveDepartmentBannerEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
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
    if (departmentId) {
      dispatch(getBannerEditDepartment({ departmentId, companyId }))
      // dispatch(getAllDepartmentsEdit({ companyId }))
    }
    // ... add function here
    // handleShowViewMode()
  }

  const onClickOutSide = () => {
    // ... add function or logical here
    if (!cropModal) {
      // onClickSave()
    }
  }
  // useEffect(() => {
  //   if (departmentId) {
  //     dispatch(
  //       getBannerEditDepartment({
  //         departmentId,
  //         companyId
  //       })
  //     )
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [departmentId])

  return (
    <div className="bg-white py-[52px] relative">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <BannerDepartmentEditMode
            checkUpload={persent.onUpload}
            persent={persent.upload}
            toggleModal={toggleModal}
            breadCrumbsTitle={breadCrumbsTitle()}
            profileDepartment={profileDepartment}
            onChangeImageUpload={onChangeImageUpload}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        }
        viewState={
          <BannerDepartmentViewMode
            breadCrumbsTitle={breadCrumbsTitle()}
            profileDepartment={profileDepartment}
            seenNumber={seenNumber}
          />
        }
        // extraStartIconsEditState={[
        //   {
        //     name: 'upload',
        //     action: toggleModal2,
        //     props: {
        //       width: '24',
        //       height: '24'
        //     }
        //   }
        // ]}
        onClickEdit={onClickEdit}
        onClickCancel={onClickCancel}
        onClickSave={onClickSave}
        onClickOutSide={onClickOutSide}
      />

      <DialogCropImage
        aspect={514 / 310}
        src={imageUpload}
        isVisible={cropModal}
        handleOnClose={toggleCropModal}
        handleCropImage={handleCropImageComplete}
      />
    </div>
  )
}

export default BannerDepartmentEdit
