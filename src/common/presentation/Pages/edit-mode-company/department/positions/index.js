import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import BlockEditorContainer from 'common/container/block-editor'

import useEditMode from 'common/hooks/useEditMode'
import { useSelector } from 'react-redux'
import {
  getAllDepartmentsEdit,
  saveTeamListEdit,
  selectAllDepartmentsEdit,
  updateTeamList
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import PositionsDepartmentViewMode from './postitionsViewMode'
import PositionsDepartmentEditMode from './postitionsEditMode'
import {
  getAllDepartmentPositionsEdit,
  savePositionsEdit,
  selectAllDepartmentPositionEdit,
  updateDepartmentPositions
} from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import ModalUseTemplatePosition from '../../company/modal/position/modalUseTemplate'
import { cloneDepartmentPositionEdit } from 'store/app/edit-mode-company/position/cloneSlice'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const PositionDepartmentEdit = ({
  departmentId = 0,
  companyId = 0,
  editmode = false,
  profileCompany
}) => {
  const positions = useSelector(selectAllDepartmentPositionEdit)
  const { avatarUrl: avatarCompany } = profileCompany || {}

  const [open, toggleModal] = useModal()

  const dispatch = useDispatch()
  const onClickEdit = () => {
    handleShowEditMode()
  }

  const handleToggleModal = () => {
    toggleModal()
    if (!open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }

  const handleActionViewMode = (departmentPositionId) => {
    window.location.replace(
      `/profile-company/${companyId}/${departmentId}/${departmentPositionId}/edit`
    )
  }
  const handleActionEditMode = (departmentPositionId) => {
    window.open(
      `/profile-company/${companyId}/${departmentId}/${departmentPositionId}/edit?editMode=1`,
      '_blank'
    )
    window.onbeforeunload = function () {
      // blank function do nothing
    }
  }
  const handleActionViewModeNewTab = async (departmentPositionId) => {
    window.open(
      `/profile-company/${companyId}/${departmentId}/${departmentPositionId}/edit`,
      '_blank'
    )
  }
  const handleClickDuplicate = async (departmentPositionId) => {
    if (departmentPositionId) {
      const res = await dispatch(
        cloneDepartmentPositionEdit({
          departmentPositionId: departmentPositionId
        })
      )
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
        // const { payload } = res
        // if (window !== undefined) {
        //   window.location.replace(
        //     `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/${payload?.data?.departmentPositionId}/edit`
        //   )
        // }
        dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))
        toast(
          AlertSuccess({
            title: 'Nhân bản vị trí thành công'
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
  const handleClickCreate = () => {
    // window.location.replace(
    //   `/profile-company/${companyId}/${departmentId}/position/create`
    // )
    handleToggleModal()
  }
  const onChangeEdit = async (data) => {
    dispatch(updateDepartmentPositions(data))
  }

  return (
    <div className="bg-white">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <PositionsDepartmentEditMode
            positions={positions}
            handleClickCreate={handleClickCreate}
            handleAction={onChangeEdit}
            handleClickPen={handleActionEditMode}
            handleActionCard={handleActionViewModeNewTab}
            handleClickDuplicate={handleClickDuplicate}
            avatarCompany={avatarCompany}
          />
        }
        viewState={
          <PositionsDepartmentViewMode
            positions={positions}
            handleAction={handleActionViewMode}
            onClickEdit={onClickEdit}
            avatarCompany={avatarCompany}
          />
        }
      />
      <div>
        <Modal
          hiddenCancel={true}
          open={open}
          modalStyle="w-[100vw] h-[100vh] flex justify-center items-center fixed bg-black/30 z-[9999] left-[calc(0%)] top-[calc(0%)]"
          childStyle="h-fit  w-full mt-[160px] shadow-md  bg-white rounded-3xl"
        >
          <ModalUseTemplatePosition handleToggleModal={handleToggleModal} />
        </Modal>
      </div>
    </div>
  )
}

PositionDepartmentEdit.propTypes = {}

PositionDepartmentEdit.defaultProps = {}

export default PositionDepartmentEdit
