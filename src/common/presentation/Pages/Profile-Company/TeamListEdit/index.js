import React from 'react'
import BlockEditorContainer from 'common/container/block-editor'
import TeamListViewMode from '../../edit-mode-company/company/teamList/teamListViewMode'
import TeamListEditMode from '../../edit-mode-company/company/teamList/teamListEditMode'
import { useSelector } from 'react-redux'
import {
  getAllDepartmentsEdit,
  saveTeamListEdit,
  selectAllDepartmentsEdit,
  selectDepartmentId,
  updateTeamList
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import Modal from 'common/presentation/Modal'
import ModalUseTemplateDepartment from '../../edit-mode-company/company/modal/department/modalUseTemplate'
import useModal from 'common/hooks/useModal'
import ModalEditDepartment from '../../edit-mode-company/company/modal/department/modalEditDepartment'
import HideShowBlock from '../HideShowBlock'
import {
  selectFooterProfile,
  updateFooterEdit
} from 'store/app/edit-mode-company/profile/footerSlice'
import { cloneDepartmentEdit } from 'store/app/edit-mode-company/department/cloneSlice'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const TeamListEdit = ({ editmode = false, isShowDepartments }) => {
  // const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const departments = useSelector(selectAllDepartmentsEdit)
  const router = useRouter()
  const { push, query, asPath } = useRouter()
  const { companyId } = query
  const dispatch = useDispatch()
  const departmentId = useSelector(selectDepartmentId)
  const footerProfile = useSelector(selectFooterProfile)
  const [open, toggleModal] = useModal()
  const [openEdit, toggleModalEdit] = useModal()

  const onClickEdit = () => {
    // handleShowEditMode()
  }

  const onClickCancel = () => {
    if (companyId) {
      dispatch(getAllDepartmentsEdit(query))
    }
    // handleShowViewMode()
  }

  const onClickSave = async () => {
    const payload = {
      departments: [...departments],
      companyId: companyId,
      updateProperties: ['Departments']
    }
    const res = await dispatch(saveTeamListEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertError({
          title: 'Lưu không thành công'
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
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
    if (companyId) {
      dispatch(getAllDepartmentsEdit(query))
    }
    // ... add function here
    // handleShowViewMode()
  }

  const onClickOutSide = () => {
    // ... add function or logical here
    // if (!cropModal) {
    // }
    if (!open && !openEdit) {
      // onClickSave()
    }
  }
  const handleActionViewMode = async (departmentId) => {
    window.location.replace(
      `/profile-company/${companyId}/${departmentId}/edit`
    )
  }
  const handleActionViewModeNewTab = async (departmentId) => {
    window.open(`/profile-company/${companyId}/${departmentId}/edit`, '_blank')
  }
  const handleActionEditMode = async (departmentId) => {
    window.open(
      `/profile-company/${companyId}/${departmentId}/edit/?editMode=1`,
      '_blank'
    )
    window.onbeforeunload = function () {
      // blank function do nothing
    }
  }
  const handleClickDuplicate = async (departmentId) => {
    if (departmentId) {
      const res = await dispatch(
        cloneDepartmentEdit({ departmentId: departmentId })
      )
      if (!res?.payload?.isSuccess) {
        toast(
          AlertError({
            title: 'Nhân bản không thành công',
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
      } else {
        // const { payload } = res
        // if (window !== undefined) {
        //   window.location.assign(
        //     `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/edit`
        //   )
        // }
        dispatch(getAllDepartmentsEdit({ companyId }))
        toast(
          AlertSuccess({
            title: 'Nhân bản phòng ban thành công'
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
  const handleToggleModal = () => {
    toggleModal()
  }
  const handleToggleModalEdit = () => {
    toggleModalEdit()
  }

  const handleClickCreate = () => {
    // window.location.replace(`/profile-company/${companyId}/department/create`)
    handleToggleModal()
  }
  const onChangeEdit = async (data) => {
    dispatch(updateTeamList(data))
  }
  const handleChangeIsShow = () => {
    dispatch(
      updateFooterEdit({
        ...footerProfile,
        meta: {
          ...footerProfile.meta,
          isShowDepartments: !isShowDepartments
        }
      })
    )
  }

  return (
    <div className="">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <div>
            <HideShowBlock
              editMode={editmode}
              isShowBlock={isShowDepartments}
              handleChangeIsShow={handleChangeIsShow}
            />
            <TeamListEditMode
              departments={departments}
              handleClickCreate={handleClickCreate}
              handleAction={onChangeEdit}
              handleClickPen={handleActionEditMode}
              handleActionCard={handleActionViewModeNewTab}
              handleClickDuplicate={handleClickDuplicate}
            />
          </div>
        }
        viewState={
          <TeamListViewMode
            departments={departments}
            handleAction={handleActionViewMode}
            onClickEdit={onClickEdit}
          />
        }
        onClickEdit={onClickEdit}
        onClickCancel={onClickCancel}
        onClickSave={onClickSave}
        onClickOutSide={onClickOutSide}
      />

      <div>
        <Modal
          hiddenCancel={true}
          open={open}
          modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[9999] left-[calc(0%)] top-[calc(0%)]"
          childStyle="h-fit  w-full mt-[160px] shadow-md  bg-white rounded-3xl"
        >
          <ModalUseTemplateDepartment
            handleToggleModal={handleToggleModal}
            handleToggleModalEdit={handleToggleModalEdit}
          />
        </Modal>
      </div>

      <div>
        <Modal
          open={openEdit}
          modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)]"
          childStyle="h-fit  w-full mt-[120px] shadow-md  bg-white"
        >
          <ModalEditDepartment
            companyId={companyId}
            departmentId={departmentId}
            handleToggleModal={handleToggleModalEdit}
          />
        </Modal>
      </div>
    </div>
  )
}

TeamListEdit.propTypes = {}

TeamListEdit.defaultProps = {}

export default TeamListEdit
