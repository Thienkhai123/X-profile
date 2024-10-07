import IntroDepartmentEdit from 'common/presentation/Pages/edit-mode-company/department/intro'
import BannerDepartmentEdit from 'common/presentation/Pages/edit-mode-company/department/banner'
import Head from 'next/head'
import ReviewDepartmentEdit from 'common/presentation/Pages/edit-mode-company/department/review'
import PositionDepartmentEdit from 'common/presentation/Pages/edit-mode-company/department/positions'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { hasEditPermission } from 'store/app/companySlice'
import { selectMenuEdit, updateMenuEdit } from 'store/app/helperSlice'
import {
  deleteDepartmentEdit,
  getBannerEditDepartment,
  saveDepartmentBannerEdit,
  selectInitSateDepartment,
  updateDepartmentEdit
} from 'store/app/edit-mode-company/department/bannerSlice'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import Modal from 'common/presentation/Modal'
import DeleteConfirmModal from 'common/presentation/Pages/edit-mode-company/DeleteConfirmModal'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import { cloneDepartmentEdit } from 'store/app/edit-mode-company/department/cloneSlice'
import EditModeAction from 'common/presentation/Pages/Profile-Company/EditModeAction'
import useEditMode from 'common/hooks/useEditMode'
import ButtonIcon from 'common/presentation/ButtonIcon'
import Button from 'common/presentation/Button'
import {
  getDepartmentReview,
  selectReviewEdit
} from 'store/app/edit-mode-company/department/reviewSlice'
import {
  getDepartmentIntro,
  getDepartmentIntroFunfact,
  selectFunfactsEditIntro,
  selectProfileEditIntro
} from 'store/app/edit-mode-company/department/introSlice'
import cloneDeep from 'lodash/cloneDeep'
import FooterEditCompany from 'common/container/Footer/footerEditCompany'
import { GUEST_ROUTES } from 'common/config/app.constants'
import useTrans from 'common/hooks/useTrans'
import {
  getAllDepartmentPositionsEdit,
  selectAllDepartmentPositionEdit
} from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import CancelConfirmModal from 'common/presentation/Pages/edit-mode-company/CancelConfrmModal'
import useModal from 'common/hooks/useModal'
import {
  getAddressBooksCompany,
  selectFooterAddressBook
} from 'store/app/edit-mode-company/profile/footerSlice'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import RecruitmentList from 'common/presentation/Pages/edit-mode-company/department/recruitmentList'
import {
  getRecruitmentEdit,
  selectRecruitment
} from 'store/app/edit-mode-company/department/recruitListSlice'
import { selectUserProfile } from 'store/app/userSlice'
import {
  getViewCountDepartmentEditmode,
  selectDepartmentViews
} from 'store/app/departmentSlice'

const showErrorCustom = (fieldName = '', errors = {}, setErrors = () => {}) => {
  toast(
    AlertWaring({
      title: 'Bạn chưa điền đủ thông tin!'
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
  let tempErrors = cloneDeep(errors) || {}
  tempErrors[fieldName] = 'Bạn chưa điền đủ thông tin!'
  setErrors({ ...tempErrors })
  const findEmptyEl = document.getElementById(fieldName)
  if (findEmptyEl) {
    findEmptyEl.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }
}

const showErrorCustomArray = (
  fieldName = '',
  tmp = {},
  setErrors = () => {},
  objectContent = {},
  id = 'staticList'
) => {
  toast(
    AlertWaring({
      title: 'Bạn chưa điền đủ thông tin!'
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
  tmp[fieldName] = objectContent
  setErrors({ ...tmp })
  const findEmptyEl = document.getElementById(id)
  if (findEmptyEl) {
    findEmptyEl.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }
}

const EditDepartmentPage = () => {
  const dispatch = useDispatch()
  const trans = useTrans()
  const { FOOTER, FOOTER_PROFILE } = trans
  const router = useRouter()
  const { pathname } = router
  const { companyId, departmentId, editMode: checkEdit, focus } = router.query

  const { profileDepartment, profileCompany } = useSelector(
    selectInitSateDepartment
  )
  const { tag } = profileCompany || {}

  const [modalBack, toggleModalBack] = useModal()

  const { isActive } = profileDepartment || {}
  const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const [modalConfirm, setModalConfirm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [errors, setErrors] = useState(null)
  const positions = useSelector(selectAllDepartmentPositionEdit)
  const recruitments = useSelector(selectRecruitment)
  const menuEdit = useSelector(selectMenuEdit)
  const addressBooks = useSelector(selectFooterAddressBook)
  const comments = useSelector(selectReviewEdit)
  const funfactsEdit = useSelector(selectFunfactsEditIntro)
  const profileEdit = useSelector(selectProfileEditIntro)
  const views = useSelector(selectDepartmentViews)

  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany, characterId } = userProfile || {}
  const { companyId: ownedCompanyId } = ownedCompany || {}

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.EDIT.DELETEDEPARTMENTEDIT) ||
      // selectLoading(state, APP_TYPES.COMPANY.HASEDITPERMISSION)
      selectLoading(state, APP_TYPES.EDIT.UPDATEDEPARTMENTEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETDEPARTMENT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEDEPARTMENTBANNEREDIT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEDEPARTMENTINTROEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETPROFILEINTRO) ||
      selectLoading(state, APP_TYPES.EDIT.GETREVIEWS) ||
      selectLoading(state, APP_TYPES.EDIT.GETDEPARTMENTPOSITIONS) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEDEPARTMENTPOSITION) ||
      selectLoading(state, APP_TYPES.EDIT.CLONEDEPARMENT) ||
      selectLoading(state, APP_TYPES.EDIT.CLONEDEPARMENTPOSITION)
  )
  const isFunfactsNull = funfactsEdit?.some(
    (x) => !x?.imageUrl || !x?.name || !x?.description
  )
  const handleResetErrors = (field) => {
    const cloneError = cloneDeep(errors)
    if (Array.isArray(field) > 0) {
      field?.forEach((element) => {
        if (cloneError?.hasOwnProperty(element)) {
          cloneError[element] = ''
          setErrors({
            ...cloneError
          })
        }
      })
    } else {
      if (cloneError?.hasOwnProperty(field)) {
        cloneError[field] = ''
        setErrors({
          ...cloneError
        })
      }
    }
  }

  const toggleModal = () => {
    setModalConfirm(!modalConfirm)
  }
  const handleClickDelete = async () => {
    if (departmentId) {
      const res = await dispatch(
        deleteDepartmentEdit({ departmentId: departmentId })
      )

      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: res?.payload?.errorMessage
          }),
          {
            toastId: 'alert-delete-warning',
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
            title: 'Bạn đã xoá thành công'
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

        setModalConfirm(false)
        window.location.replace(`/profile-company/${companyId}/edit`)
      }
    }
  }

  const toggleMainHeader = () => {
    const el2 = document.getElementById('main-header-company')
    if (el2.style.display !== 'none') {
      el2.style.display = 'none'
    } else {
      el2.style.display = ''
    }
  }

  const onClickEdit = () => {
    toggleMainHeader()
    handleShowEditMode()
    window.onbeforeunload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  const onClickCancel = () => {
    if (departmentId) {
      dispatch(
        getBannerEditDepartment({
          departmentId,
          companyId
        })
      )
      dispatch(getRecruitmentEdit({ departmentId: departmentId }))
      dispatch(getDepartmentReview({ id: departmentId }))
      dispatch(
        getDepartmentIntroFunfact({
          departmentId: departmentId
        })
      )
      dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))
    }
    handleShowViewMode()
    toggleMainHeader()
    if (modalBack) {
      toggleModalBack()
    }
    setShowPreview(false)
    setErrors(null)
    window.onbeforeunload = function () {
      // blank function do nothing
    }
  }

  const onClickPreview = () => {
    if (!showPreview) {
      setShowPreview(true)
      handleShowViewMode()
    } else {
      setShowPreview(false)
      handleShowEditMode()
    }
  }

  const onClickSave = async () => {
    const payload = {
      ...profileDepartment,
      departmentPositions: [...positions],
      companyId: companyId,
      departmentId: departmentId,
      isActive: true,
      updateProperties: [
        'Name',
        'ShortDescription',
        'ImageUrl',
        'Comments',
        'Description',
        'Funfacts',
        'DepartmentPositions',
        'IsActive'
      ],
      comments: comments,
      funfacts:
        funfactsEdit?.length >= 3 && !isFunfactsNull ? funfactsEdit : null,
      description: profileEdit?.description
    }
    if (comments?.length < 1) {
      showErrorCustom('commentList', errors, setErrors)
      return
    }
    if (comments?.length >= 1) {
      const isCheck = false
      const tmp = {}
      comments.forEach((element, key) => {
        if (element?.content === '') {
          const content = {
            id: `Comment_content_${key}`
          }
          showErrorCustomArray(
            `Comment_content_${key}`,
            tmp,
            setErrors,
            content,
            'commentList'
          )
          isCheck = true
        }
        if (element?.name === '') {
          const content = {
            id: `Comment_name_${key}`
          }
          showErrorCustomArray(
            `Comment_name_${key}`,
            tmp,
            setErrors,
            content,
            'commentList'
          )
          isCheck = true
        }
        if (element?.description === '') {
          const content = {
            id: `Comment_description_${key}`
          }
          showErrorCustomArray(
            `Comment_description_${key}`,
            tmp,
            setErrors,
            content,
            'commentList'
          )
          isCheck = true
        }
      })
      if (isCheck) {
        const errorsList = Object.keys(tmp)
        const result = errorsList?.filter((elm) => elm?.id !== '')
        const element = document.getElementById(result[0])
        if (element) {
          element.focus()
        }
        return
      }
    }

    const res = await dispatch(saveDepartmentBannerEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
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
      setErrors(res?.payload?.errors)
      const scrollId = Object.keys(res?.payload?.errors)[0]
      const findEmptyEl = document.getElementById(scrollId)
      if (findEmptyEl) {
        findEmptyEl.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      if (departmentId) {
        dispatch(getBannerEditDepartment({ departmentId, companyId }))
        dispatch(getDepartmentReview({ id: departmentId }))
        dispatch(
          getDepartmentIntro({
            id: departmentId
          })
        )
        dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))
        setErrors(null)
        onClickCancel()
      }
    }

    // ... add function here
    // handleShowViewMode()
  }
  const onClickDraftSave = async () => {
    const payload = {
      ...profileDepartment,
      departmentPositions: [...positions],
      companyId: companyId,
      departmentId: departmentId,
      isActive: false,
      updateProperties: [
        'Name',
        'ShortDescription',
        'ImageUrl',
        'Comments',
        'Description',
        'Funfacts',
        'DepartmentPositions',
        'IsActive'
      ],
      comments: comments,
      funfacts:
        funfactsEdit?.length >= 3 && !isFunfactsNull ? funfactsEdit : null,
      description: profileEdit?.description
    }

    const res = await dispatch(saveDepartmentBannerEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
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
      setErrors(res?.payload?.errors)
      const scrollId = Object.keys(res?.payload?.errors)[0]
      const findEmptyEl = document.getElementById(scrollId)
      if (findEmptyEl) {
        findEmptyEl.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu nháp thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      if (departmentId) {
        dispatch(getBannerEditDepartment({ departmentId, companyId }))
        dispatch(getDepartmentReview({ id: departmentId }))
        dispatch(
          getDepartmentIntro({
            id: departmentId
          })
        )
        dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))
        setErrors(null)
        onClickCancel()
      }
    }

    // ... add function here
    // handleShowViewMode()
  }
  const onClickDuplicate = async () => {
    if (departmentId) {
      const res = await dispatch(
        cloneDepartmentEdit({ departmentId: departmentId })
      )
      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: res?.payload?.errorMessage
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
      } else {
        const { payload } = res
        if (window !== undefined) {
          window.location.assign(
            `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/edit`
          )
        }
      }
    }
  }
  let menuEditList = [
    {
      title: 'Nhân bản',
      icon: 'duplicate',
      action: async (props) => {
        const { departmentId } = props || {}
        if (departmentId) {
          const res = await dispatch(
            cloneDepartmentEdit({ departmentId: departmentId })
          )
          if (!res?.payload?.isSuccess) {
            toast(
              AlertWaring({
                title: res?.payload?.errorMessage
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
          } else {
            const { payload } = res
            if (window !== undefined) {
              window.location.assign(
                `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/edit`
              )
            }
          }
        }
      }
    },
    {
      title: isActive ? 'Ẩn' : 'Hiện',
      icon: isActive ? 'eyeOff2' : 'eye2',
      action: async (props) => {
        const { departmentId, companyId } = props || {}
        if (departmentId) {
          const res = await dispatch(
            updateDepartmentEdit({
              ...profileDepartment,
              departmentId: departmentId,
              companyId: companyId,
              isActive: !isActive,
              updateProperties: ['IsActive']
            })
          )

          if (!res?.payload?.isSuccess) {
            toast(
              AlertWaring({
                title: res?.payload?.errorMessage
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
          } else {
            toast(
              AlertSuccess({
                title: 'Bạn đã lưu thành công'
              }),
              {
                toastId: 'alert-save-success',
                className: 'bg-toast-custom',
                closeButton: false,
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
              }
            )
            if (departmentId) {
              dispatch(getBannerEditDepartment(props))
            }
          }
        }
      }
    },
    {
      title: 'Xóa',
      icon: 'trash',
      action: async (props) => {
        toggleModal()
      }
    }
  ]
  const scrollToElement = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 1000)
  }

  useEffect(() => {
    if (focus) {
      scrollToElement(focus)
    }
  }, [focus])
  useEffect(() => {
    const checkOwner = async () => {
      // let params = new URLSearchParams(document.location.search)
      // let checkEdit = params.get('editMode')
      if (companyId) {
        const res = await dispatch(hasEditPermission({ companyId }))

        if (!res?.payload?.isSuccess) {
          window.location.replace(`/profile-company/${companyId}`)
        } else {
          dispatch(updateMenuEdit(menuEditList))

          if (departmentId) {
            dispatch(
              getBannerEditDepartment({
                departmentId,
                companyId
              })
            )
            dispatch(getRecruitmentEdit({ departmentId: departmentId }))
            dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))
            dispatch(getDepartmentReview({ id: departmentId }))
            dispatch(getAddressBooksCompany(parseInt(companyId)))
          }
        }
      }
    }

    checkOwner()
  }, [departmentId])

  useEffect(() => {
    const el2 = document.getElementById('main-header-company')
    if (parseInt(checkEdit) === 1) {
      if (el2.style.display !== 'none') {
        toggleMainHeader()
        handleShowEditMode()
        window.onbeforeunload = (e) => {
          e.preventDefault()
          e.returnValue = ''
        }
      }
    }
  }, [checkEdit])
  useEffect(() => {
    dispatch(updateMenuEdit(menuEditList))
  }, [isActive])

  useEffect(() => {
    if (tag) {
      dispatch(
        getViewCountDepartmentEditmode({
          tag: tag,
          departmentId: departmentId
        })
      )
    }
  }, [tag])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1">
        <Head>
          <title>Chỉnh sửa phòng ban doanh nghiệp</title>
        </Head>
        {editmode && !showPreview && (
          <div className="sticky top-0 w-full overflow-hidden z-[9999]">
            <div
              className="flex justify-between py-4 px-10 border-b border-grey-3 bg-white "
              style={{
                filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
              }}
            >
              <Button
                title="Hủy"
                padding="sm:p-[12px_32px] p-2"
                margin="m-0"
                background="bg-white"
                textWeight="sm:text-p18-bold text-p14 font-bold"
                rounded="rounded-[8px] border border-grey-4"
                height="h-auto"
                type="button"
                iconName="previousArrow"
                onClick={() => toggleModalBack()}
              />

              <div className="flex gap-4">
                <ButtonIcon
                  title="Xoá phòng ban"
                  margin="m-0"
                  background="bg-white"
                  color="text-semantic-red"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-semantic-red"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconName="trash"
                  iconStroke="#DB2E24"
                  iconFill="#DB2E24"
                  onClick={toggleModal}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />
                <ButtonIcon
                  title="Tạo bản sao"
                  margin="m-0"
                  background="bg-white"
                  color="text-button"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconName="clone"
                  iconStroke="#F6BB3A"
                  onClick={onClickDuplicate}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />
                <ButtonIcon
                  title={`${'Lưu nháp'}`}
                  margin="m-0"
                  background="bg-white"
                  color="text-button"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconName={`${'saveDraft'}`}
                  iconStroke="#F6BB3A"
                  iconFill="#F6BB3A"
                  onClick={() => {
                    onClickDraftSave()
                  }}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />

                <ButtonIcon
                  title={`${showPreview ? 'Chỉnh sửa' : 'Xem trước'}`}
                  margin="m-0"
                  background="bg-white"
                  color="text-button"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconName={`${showPreview ? 'edit' : 'preview'}`}
                  iconStroke="#F6BB3A"
                  onClick={onClickPreview}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />

                <Button
                  title={`Lưu phòng ban`}
                  width="w-auto"
                  height="h-auto"
                  rounded="rounded-[8px]"
                  color="text-neutral"
                  margin="m-0"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  onClick={() => {
                    onClickSave()
                  }}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />
              </div>
            </div>
          </div>
        )}
        {!editmode && showPreview && (
          <div className="sticky top-0 w-full overflow-hidden z-[9999]">
            <div
              className="flex justify-between items-center py-8 px-10   bg-black/50 "
              style={{
                filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
              }}
            >
              <p className="text-p18 text-white">
                Bạn đang ở chế độ xem trước phòng ban
              </p>
              <div className="flex gap-4">
                <ButtonIcon
                  title={`Thoát chế độ xem trước`}
                  padding="sm:p-[12px_32px] p-2"
                  margin="m-0"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconStroke="#F6BB3A"
                  onClick={onClickPreview}
                />
              </div>
            </div>
          </div>
        )}
        {!editmode && showPreview && (
          <div className="absolute  w-full h-full z-10 top-0 "></div>
        )}
        {!showPreview && (
          <EditModeAction
            editmode={editmode}
            menuEdit={menuEdit}
            handleShowEditMode={onClickEdit}
            departmentId={departmentId}
            companyId={companyId}
          />
        )}
        <div>
          <BannerDepartmentEdit
            editmode={editmode}
            {...router.query}
            errors={errors}
            handleResetErrors={handleResetErrors}
            seenNumber={views}
          />
        </div>
        <div>
          <IntroDepartmentEdit
            editmode={editmode}
            isFunfactsNull={isFunfactsNull}
            {...router.query}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        </div>
        <div>
          <ReviewDepartmentEdit
            editmode={editmode}
            {...router.query}
            errors={errors}
            setErrors={setErrors}
            handleResetErrors={handleResetErrors}
          />
        </div>

        <div id="position">
          <PositionDepartmentEdit
            {...router.query}
            editmode={editmode}
            profileCompany={profileCompany}
          />
        </div>
        <div>
          <RecruitmentList
            editmode={editmode}
            recruitments={recruitments}
            isAuthentication={userProfile !== null}
            id={departmentId}
            ownedCompany={
              (ownedCompanyId !== null && characterId === 2) ||
              characterId === 2
            }
          />
        </div>
        <Modal
          childStyle="w-fit h-fit  shadow-md p-[32px] bg-white rounded-lg"
          toggleModal={toggleModal}
          open={modalConfirm}
          hiddenCancel={true}
        >
          <DeleteConfirmModal
            title="Bạn có chắc muốn xóa phòng ban này?"
            desc="Khi xóa phòng ban này, mọi thông tin về phòng ban và các vị trí công việc liên quan sẽ bị xóa. Nếu không chắc chắn, bạn có thể tạm ẩn nhé!"
            handleClickDelete={handleClickDelete}
            handleClickCancel={toggleModal}
          />
        </Modal>
        <Modal
          childStyle="w-fit h-fit  mt-4  p-[32px] bg-white rounded-lg"
          open={modalBack}
          toggleModal={toggleModalBack}
        >
          <CancelConfirmModal
            title="Các thay đổi chưa lưu"
            desc="Các thay đổi của bạn sẽ mất nếu bạn rời khỏi trang này. Bạn có chắc muốn thoát trang?"
            handleClickContinue={toggleModalBack}
            handleClickCancel={onClickCancel}
          />
        </Modal>
      </div>
      {!GUEST_ROUTES.includes(pathname) && (
        <FooterEditCompany
          addressBooks={addressBooks}
          FOOTER={FOOTER}
          FOOTER_PROFILE={FOOTER_PROFILE}
        />
      )}
    </>
  )
}

export default EditDepartmentPage
