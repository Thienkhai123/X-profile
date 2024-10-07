import Button from 'common/presentation/Button'
import BannerDepartmentEdit from '../../../department/banner'
import IntroDepartmentEdit from '../../../department/intro'
import ReviewDepartmentEdit from '../../../department/review'
import PositionDepartmentEdit from '../../../department/positions'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { deleteDepartmentEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import { useDispatch } from 'react-redux'
import Modal from 'common/presentation/Modal'
import DeleteConfirmModal from '../../../DeleteConfirmModal'
import { getAllDepartmentsEdit } from 'store/app/edit-mode-company/profile/teamListSlice'
import ButtonIcon from 'common/presentation/ButtonIcon'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const ModalEditDepartment = ({
  companyId = 0,
  departmentId = 0,
  handleToggleModal = () => {}
}) => {
  const dispatch = useDispatch()
  const [modalConfirm, setModalConfirm] = useState(false)
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
        dispatch(getAllDepartmentsEdit({ companyId }))
        handleToggleModal()
      }
    }
  }

  return (
    <div className="relative animate-bottomToTop h-screen pb-[80px] bg-[#f5f5f2]">
      <div
        className="flex justify-between py-4 px-10 sticky top-0 border-b border-grey-3 bg-white"
        style={{
          filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
        }}
      >
        <Button
          title="Huỷ"
          padding="sm:p-[12px_32px] p-2"
          margin="m-0"
          background="bg-white"
          textWeight="sm:text-p18-bold text-p14 font-bold"
          rounded="rounded-[8px] border border-grey-3"
          height="h-auto"
          type="button"
          onClick={handleToggleModal}
        />

        <div className="flex gap-4">
          <ButtonIcon
            title="Xoá phòng ban"
            padding="sm:p-[12px_32px] p-2"
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
            onClick={toggleModal}
          />
          <ButtonIcon
            title="Tạo bản sao"
            padding="sm:p-[12px_32px] p-2"
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
            // onClick={toggleModal}
          />

          <ButtonIcon
            title="Lưu & ẩn"
            padding="sm:p-[12px_32px] p-2"
            margin="m-0"
            background="bg-white"
            color="text-button"
            textWeight="sm:text-p18-bold text-p14 font-bold"
            rounded="rounded-[8px] border border-button"
            height="h-auto"
            type="button"
            width="w-auto"
            iconName="eyeOff2"
            iconStroke="#F6BB3A"
            // onClick={toggleModal}
          />
          <ButtonIcon
            title="Xem trước"
            padding="sm:p-[12px_32px] p-2"
            margin="m-0"
            background="bg-white"
            color="text-button"
            textWeight="sm:text-p18-bold text-p14 font-bold"
            rounded="rounded-[8px] border border-button"
            height="h-auto"
            type="button"
            width="w-auto"
            iconName="preview"
            iconStroke="#F6BB3A"
            // onClick={toggleModal}
          />

          <Button
            title="Tạo phòng ban"
            width="w-auto"
            height="h-auto"
            rounded="rounded-[8px]"
            padding="sm:p-[12px_32px] p-2"
            color="text-neutral"
            margin="m-0"
            textWeight="sm:text-p18-bold text-p14 font-bold"
            // onClick={() => handleClickCreate()}
          />
        </div>
      </div>
      {companyId && departmentId && (
        <div className="overflow-y-scroll h-full pb-[80px]">
          <div>
            <BannerDepartmentEdit
              companyId={companyId}
              departmentId={departmentId}
            />
          </div>
          <div>
            <IntroDepartmentEdit
              companyId={companyId}
              departmentId={departmentId}
            />
          </div>
          <div>
            <ReviewDepartmentEdit
              companyId={companyId}
              departmentId={departmentId}
            />
          </div>
          <div>
            <PositionDepartmentEdit
              companyId={companyId}
              departmentId={departmentId}
            />
          </div>
          <Modal
            childStyle="w-fit h-fit  mt-4 shadow-md p-4 bg-white rounded-lg"
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
        </div>
      )}
    </div>
  )
}

export default ModalEditDepartment
