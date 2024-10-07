import React, { useEffect, useRef, useState } from 'react'
import ReviewMessBlockViewMode from './reviewMessBlockViewMode'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  addComment,
  saveDepartmentReviewEdit,
  selectCommentDefault,
  selectProfileDeparment,
  selectReviewEdit,
  updateAvatarUrl,
  updateComment
} from 'store/app/edit-mode-company/department/reviewSlice'
import useEditMode from 'common/hooks/useEditMode'
import ReviewEditMode from './reviewEditMode'
import ReviewLayoutEdit from './reviewLayoutEdit'
import { getDepartmentReview } from 'store/app/edit-mode-company/department/reviewSlice'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { selectAvatarUrlUpload } from 'store/app/edit-mode-company/department/reviewSlice'
import useModal from 'common/hooks/useModal'
import { urlToFile } from 'store/helper/functionHelper'
import {
  convertToWebp,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import BlockEditorContainer from 'common/container/block-editor'
import Modal from 'common/presentation/Modal'
import ReviewSortPositionModal from './reviewSortPositionModal'
import { getAllDepartmentsEdit } from 'store/app/edit-mode-company/profile/teamListSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

const ReviewDepartmentEdit = ({
  departmentId = 0,
  companyId = 0,
  editmode = false,
  setErrors,
  errors,
  handleResetErrors = () => {}
}) => {
  // const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()

  const dispatch = useDispatch()
  const [ind, setInd] = useState(0)
  const [autofocus, setAutofocus] = useState(false)
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })
  const [open, toggleModal] = useModal()
  // const [openSort, toggleModalSort] = useModal()
  const comments = useSelector(selectReviewEdit)
  const profileDeparment = useSelector(selectProfileDeparment)
  const commentDefault = useSelector(selectCommentDefault)
  const avatarUrlUpload = useSelector(selectAvatarUrlUpload)
  const user = useSelector(selectUserProfile)

  const router = useRouter()
  // const { departmentId, companyId } = router.query

  const compareSortArray = (objectFirst, objectSecond) => {
    return objectFirst.position - objectSecond.position
  }

  const handleAddReview = () => {
    const arraySort = [...comments].sort(compareSortArray)
    const item = {
      description: '',
      name: '',
      quote: '',
      content: '',
      avatarUrl: '',
      position:
        arraySort.length !== 0
          ? arraySort[arraySort.length - 1].position + 1
          : 0
    }
    dispatch(addComment(item))
    setAutofocus(true)
    handleResetErrors('commentList')
  }

  const onsubmit = async (data, id) => {
    const tempItem = {
      ...comments[data?.ind],
      name: data.name,
      content: data.content,
      description: data.description,
      quote: data.quote
    }
    const tempList = [...comments]
    tempList[data?.ind] = { ...tempItem }
    comments = [...tempList]
    dispatch(updateComment(comments))
    handleResetErrors(id)
  }

  const onClickSaveReview = async () => {
    if (editmode === true && open === false) {
      const payload = {
        departmentId: departmentId,
        companyId: companyId,
        updateProperties: ['Comments'],
        comments: comments
      }
      const res = await dispatch(saveDepartmentReviewEdit(payload))
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
        // toast(
        //   ToastSuccess({
        //     title: 'Cập nhật thành công',
        //     description: 'Bạn đã lưu thành công'
        //   }),
        //   {
        //     toastId: 'alert-save-success',
        //     className: 'bg-alert-success  rounded-[8px]',
        //     position: 'bottom-left',
        //     hideProgressBar: true,
        //     autoClose: 3000
        //   }
        // )
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
      dispatch(getDepartmentReview({ id: departmentId }))
      dispatch(getAllDepartmentsEdit({ companyId }))
      setAutofocus(false)
      // handleShowViewMode()
    }
  }

  const onClickCancel = () => {
    dispatch(getDepartmentReview({ id: departmentId }))
    setAutofocus(false)
    // handleShowViewMode()
  }

  const onClickEdit = () => {
    // handleShowEditMode()
  }

  const handleDelete = (ind) => {
    const listRemove = comments.filter((e, indFil) => indFil !== ind)
    dispatch(updateComment(listRemove))
    handleResetErrors([
      `Comment_name_${ind}`,
      `Comment_content_${ind}`,
      `Comment_description_${ind}`
    ])
  }
  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)
      await getPresignedUrlByAxios(file, 'User/' + user?.userId, (value) =>
        setPersent({ onUpload: true, upload: value })
      )
      const imgUrl = await convertToWebp(file, 'User/' + user?.userId)
      const tempItem = {
        ...comments[ind],
        avatarUrl: imgUrl
      }
      const tempList = [...comments]
      tempList[ind] = { ...tempItem }
      comments = [...tempList]
      dispatch(updateComment(comments))
      if (imgUrl) {
        setPersent({ onUpload: false, upload: 0 })
      }
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
  //   if (departmentId) {
  //     dispatch(getDepartmentReview({ id: departmentId }))
  //   }
  // }, [dispatch, departmentId])

  const onClickOutSide = () => {
    // ... add function or logical here
    // if (!cropModal) {
    // }
    // onClickSaveReview()
  }
  return (
    <div>
      <div className="relative pt-[52px] pb-[56px]  bg-stoke">
        <BlockEditorContainer
          // extraStartIconsEditState={[
          //   { name: 'navbar', action: toggleModalSort }
          // ]}
          editmode={editmode}
          editState={
            <ReviewMessBlockViewMode
              checkUpload={persent.onUpload}
              persent={persent.upload}
              profileDeparment={profileDeparment}
              toggleModal={toggleModal}
              editmode={true}
              onsubmit={onsubmit}
              comments={comments}
              handleAddReview={handleAddReview}
              handleDelete={handleDelete}
              setInd={setInd}
              errors={errors}
              autofocus={autofocus}
              errorsList={errorsList}
            />
          }
          viewState={
            <ReviewMessBlockViewMode
              profileDeparment={profileDeparment}
              toggleModal={toggleModal}
              editmode={false}
              onsubmit={onsubmit}
              comments={comments}
              handleAddReview={handleAddReview}
              handleDelete={handleDelete}
              setInd={setInd}
            />
          }
          onClickEdit={onClickEdit}
          onClickCancel={onClickCancel}
          onClickSave={onClickSaveReview}
          onClickOutSide={onClickOutSide}
        />
        <DialogCropImage
          src={avatarUrlUpload}
          isVisible={open}
          handleOnClose={toggleModal}
          handleCropImage={handleCropImageComplete}
        />
        {/* <Modal
          childStyle="w-fit h-fit  mt-4 shadow-md p-4 bg-white rounded-lg"
          toggleModal={toggleModalSort}
          open={openSort}
        >
          <ReviewSortPositionModal
            toggleModal={toggleModalSort}
            handleDelete={handleDelete}
          />
        </Modal> */}
      </div>
    </div>
  )
}

ReviewDepartmentEdit.propTypes = {}

export default ReviewDepartmentEdit
