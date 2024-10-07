import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import Image from 'next/image'
import ReactDatePicker from 'react-datepicker'
import { useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { getPresignedUrl } from 'store/helper/serviceHelper'
import isEmpty from 'lodash/isEmpty'
import Modal from 'common/presentation/Modal'
import AchievementModal from '../AchievementModal'
import useModal from 'common/hooks/useModal'

const AchievementFormCreate = (props) => {
  const {
    handleCancle,
    handleCreateItem,
    defaultValues,
    btnRef,
    portfolioId,
    achivementImages = []
  } = props

  const { UserAchievementImage, UserAchievementTime } = defaultValues

  const [achievementDate, setAchievementDate] = useState(
    !isNaN(new Date(UserAchievementTime).getTime())
      ? new Date(UserAchievementTime)
      : null
  )
  const [openModal, toggleModal] = useModal()
  const [selectedImageId, setSelectedImageId] = useState(
    UserAchievementImage || 0
  )

  const schema = yup.object().shape({
    UserAchievementTitle: yup.string().trim().required('Không được bỏ trống'),
    UserAchievementTime: yup.string().required('Không được bỏ trống'),
    UserAchievementImage: yup.string().required('Không được bỏ trống')
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const watchUserAchievementImage = watch('UserAchievementImage')
  const watchUserAchievementTitle = watch('UserAchievementTitle')

  const renderImageById = (id) => {
    const { imageUrl } =
      achivementImages?.find((img) => img?.imageId === parseInt(id)) || {}
    return imageUrl
  }

  const handleSetAchievementDate = (value) => {
    setAchievementDate(value)
    setValue('UserAchievementTime', value)
    setError('UserAchievementTime', { type: 'custom', message: '' })
  }

  const handleChooseImage = (imageId) => {
    setSelectedImageId(imageId)
  }

  const handleSubmitSelectImage = () => {
    setValue('UserAchievementImage', selectedImageId)
    setError('UserAchievementImage', { type: 'custom', message: '' })
    toggleModal()
  }

  const submit = async (data) => {
    handleCreateItem(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <div className="mb-6" onClick={toggleModal}>
          {watchUserAchievementImage && (
            <div className="relative cursor-careerPath hover:brightness-110">
              <Image
                alt="upload-another-img"
                width={80}
                height={80}
                src={renderImageById(selectedImageId)}
                objectFit="cover"
              />

              <div className="absolute top-0 w-[80px] h-[80px] bg-[rgba(0,0,0,0.5)] rounded-[16px] flex flex-col justify-center items-center">
                <XProfileIcon name="uploadLogo" stroke="white" />
              </div>
            </div>
          )}
          {!watchUserAchievementImage && (
            <Image
              alt="upload-another-img"
              width={80}
              height={80}
              src="/images/upload-another-new.png"
              className="cursor-careerPath hover:brightness-95"
            />
          )}
          {errors?.UserAchievementImage && (
            <div className="mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.UserAchievementImage?.message}
              </span>
            </div>
          )}
        </div>
        <div className="mb-6">
          <p className="text-p18 mb-4">
            Tên giải thưởng/thành tích
            <span className="text-semantic-red">*</span>
          </p>
          <div className="relative">
            <input
              placeholder="Nhập tên giải thưởng"
              maxLength={100}
              {...register('UserAchievementTitle')}
              className={`rounded-lg border ${
                errors?.UserAchievementTitle
                  ? 'border-semantic-red '
                  : 'border-grey-3'
              }  py-2 px-6 outline-0 w-full peer placeholder:text-grey-3`}
            />
            <div className="hidden peer-focus:block transition-all duration-100 absolute right-0 -top-6">
              <p className="text-grey-1 text-p14">
                {100 - (watchUserAchievementTitle?.length || 0)}
              </p>
            </div>
          </div>
          {errors?.UserAchievementTitle && (
            <div className="flex justify-end mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.UserAchievementTitle?.message}
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-p18 mb-4">
            Thời gian<span className="text-semantic-red">*</span>
          </p>

          <label id="select-date-achievement">
            <div
              className={`border  ${
                errors?.UserAchievementTime?.message
                  ? 'border-semantic-red '
                  : 'border-grey-3'
              } py-2 px-6 rounded-lg flex cursor-careerPath`}
            >
              <ReactDatePicker
                id="select-date-achievement"
                key={'date'}
                placeholderText="Chọn ngày nhận"
                className="outline-0 focus:outline-none w-full placeholder:text-grey-3 "
                selected={achievementDate}
                showYearDropdown
                yearDropdownItemNumber={100}
                showMonthDropdown
                maxDate={new Date()}
                scrollableYearDropdown
                showMonthYearPicker
                onKeyDown={(e) => e.preventDefault()}
                onChange={(date) => handleSetAchievementDate(date)}
                dateFormat="MM/yyyy"
              />
              <XProfileIcon name="calendar2" />
            </div>
          </label>
          {errors?.UserAchievementTime && (
            <div className="flex justify-end mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.UserAchievementTime?.message}
              </span>
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <div className="flex items-center gap-4">
            <Button
              title="Huỷ"
              background="bg-grey-4"
              margin="m-0"
              rounded="rounded-lg"
              width="w-[99px]"
              type="button"
              onClick={() => handleCancle()}
            />
            <Button
              title="Lưu"
              margin="m-0"
              rounded="rounded-lg"
              width="w-[99px]"
              type="submit"
              btnRef={btnRef}
            />
          </div>
        </div>
      </form>
      <Modal
        toggleModal={toggleModal}
        open={openModal}
        hiddenCancel
        modalStyle="w-[100vw] h-[100vh] p-6 flex justify-center items-center fixed bg-black/30 z-[10000] left-[calc(0%)] top-[calc(0%)]"
        childStyle="w-screen h-fit sm:w-[800px] mt-4 sm:p-[40px] p-8 bg-white rounded-[16px]"
      >
        <AchievementModal
          achivementImages={achivementImages}
          selectedImageId={selectedImageId}
          toggleModal={toggleModal}
          setSelectedImageId={handleChooseImage}
          handleSubmit={handleSubmitSelectImage}
        />
      </Modal>
    </>
  )
}

AchievementFormCreate.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object
}

AchievementFormCreate.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {}
}

export default AchievementFormCreate
