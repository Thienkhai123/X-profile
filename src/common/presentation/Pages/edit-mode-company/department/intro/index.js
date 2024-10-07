import BlockEditorContainer from 'common/container/block-editor'
import useEditMode from 'common/hooks/useEditMode'
import useModal from 'common/hooks/useModal'
import IntroDepartmentViewMode from './introDepartmentViewMode'
import IntroDepartmentEditMode from './introDepartmentEditMode'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import {
  getDepartmentFunFactImages,
  getDepartmentIntro,
  saveDepartmentIntroEdit,
  selectAvatarUrlUpload,
  selectFunFactImages,
  selectFunfactsDefaultEditIntro,
  selectFunfactsEditIntro,
  selectFunfactsIntro,
  selectProfileEditIntro,
  selectProfileIntro,
  updateFunfactIntro,
  updateProfileEdit
} from 'store/app/edit-mode-company/department/introSlice'
import { useSelector } from 'react-redux'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { urlToFile } from 'store/helper/functionHelper'
import { convertToWebp } from 'store/helper/serviceHelper'
import { toast } from 'react-toastify'
import { getDepartmentIntroFunfact } from 'store/app/edit-mode-company/department/introSlice'
import { getAllDepartmentsEdit } from 'store/app/edit-mode-company/profile/teamListSlice'
import Modal from 'common/presentation/Modal'
import FunFactImageModal from './FunFactImageModal'
import { selectUserProfile } from 'store/app/userSlice'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const IntroDepartmentEdit = ({
  departmentId = 0,
  companyId = 0,
  editmode = false,
  errors = '',
  handleResetErrors = () => {},
  isFunfactsNull
}) => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  // const { departmentId, companyId } = query || {}
  const [open, toggleModal] = useModal()
  const [openFunfact, toggleModalFunfact] = useModal()
  // const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const profileEdit = useSelector(selectProfileEditIntro)
  const profile = useSelector(selectProfileIntro)
  const funfacts = useSelector(selectFunfactsIntro)
  const funfactsDefault = useSelector(selectFunfactsDefaultEditIntro)
  const funfactsEdit = useSelector(selectFunfactsEditIntro)
  const avatarUrlUpload = useSelector(selectAvatarUrlUpload)
  const user = useSelector(selectUserProfile)

  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)
      const imgUrl = await convertToWebp(file, 'User/' + user?.userId)
      dispatch(
        updateProfileEdit({
          ...profileEdit,
          avatarUrl: imgUrl
        })
      )
    }
  }

  const onClickEdit = () => {
    // ... add function here
    // handleShowEditMode()
  }

  const onClickCancel = () => {
    // ... add function here
    dispatch(updateProfileEdit({ ...profile }))
    dispatch(updateFunfactIntro([...funfactsDefault]))
    // handleShowViewMode()
  }

  const onClickSave = async () => {
    // ... add function here
    if (funfactsEdit.length >= 3) {
      const payload = {
        ...profileEdit,
        updateProperties: ['Description', 'Funfacts'],
        departmentId,
        companyId,
        funfacts: funfactsEdit
      }
      const res = await dispatch(saveDepartmentIntroEdit(payload))
      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: 'res?.payload?.errorMessage'
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

        dispatch(
          getDepartmentIntro({
            id: departmentId
          })
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
      // dispatch(getAllDepartmentsEdit({ companyId }))
      // handleShowViewMode()
    } else {
      toast(
        AlertWaring({
          title: 'Thêm tối thiếu 3 sự thật!'
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

  const onClickOutSide = () => {
    // ... add function or logical here
    if (!open && !openFunfact) {
      // onClickSave()
    }
  }

  useEffect(() => {
    if (departmentId) {
      dispatch(
        getDepartmentIntro({
          id: departmentId
        })
      )
      dispatch(
        getDepartmentIntroFunfact({
          departmentId: departmentId
        })
      )
      dispatch(getDepartmentFunFactImages())
    }
  }, [departmentId])

  return (
    <div>
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <IntroDepartmentEditMode
            profileEdit={profileEdit}
            toggleModal={toggleModal}
            openFunfact={openFunfact}
            toggleModalFunfact={toggleModalFunfact}
            funfacts={funfactsEdit}
            isFunfactsNull={isFunfactsNull}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        }
        viewState={
          <IntroDepartmentViewMode {...profileEdit} funfacts={funfacts} />
        }
        onClickEdit={onClickEdit}
        onClickCancel={onClickCancel}
        onClickSave={onClickSave}
        onClickOutSide={onClickOutSide}
      />

      <DialogCropImage
        src={avatarUrlUpload}
        isVisible={open}
        handleOnClose={toggleModal}
        handleCropImage={handleCropImageComplete}
      />
    </div>
  )
}

export default IntroDepartmentEdit
