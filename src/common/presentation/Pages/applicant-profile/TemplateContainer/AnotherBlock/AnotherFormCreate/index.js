import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import { useState } from 'react'
import useModal from 'common/hooks/useModal'
import TextareaAutosize from 'react-textarea-autosize'
import { DialogAvatarCropImages } from '../dialogAvatarCropImages/dialogAvatarCropImages'
import { urlToFile } from 'store/helper/functionHelper'
import { toast } from 'react-toastify'
import {
  convertToWebpAxios,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import PropressBar from 'common/presentation/ProgressBar'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const AnotherFormCreate = (props) => {
  const { handleCancle, handleCreateItem, defaultValues, btnRef, portfolioId } =
    props

  const { OtherImage } = defaultValues || {}

  const [openModal, toggleModal] = useModal()
  const [imageSrc, setImageSrc] = useState(OtherImage || '')
  const [progress, setProgress] = useState({
    onUpload: false,
    upload: 0
  })
  const schema = yup.object().shape({
    OtherImage: yup.string().trim().required('Không được bỏ trống'),
    OtherTitle: yup.string().trim().required('Không được bỏ trống')
  })

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    watch,
    control,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    resolver: yupResolver(schema),
    defaultValues: defaultValues
  })

  const watchOtherImage = watch('OtherImage')
  const watchOtherTitle = watch('OtherTitle')

  const handleCropImage = async (src) => {
    if (src) {
      const file = await urlToFile(src)
      try {
        await getPresignedUrlByAxios(
          file,
          'Portfolio/' + portfolioId,
          (value) => setProgress({ onUpload: true, upload: value })
        )
        const imgUrl = await convertToWebpAxios(
          file,
          'Portfolio/' + portfolioId
        )

        if (imgUrl) {
          setImageSrc(imgUrl.url)
          setValue('OtherImage', imgUrl.url)
          setProgress({ onUpload: false, upload: 0 })
        }
      } catch (err) {
        setProgress({ onUpload: false, upload: 0 })

        toast(
          AlertError({
            title: 'Không tải được ảnh lên!'
          }),
          {
            toastId: 'upload-avatar-error',
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

  const handleUploadImage = async (file) => {
    const fileUpload = file[0]
    if (fileUpload.size / 1024 > 5120) {
      toast(
        AlertError({
          title: 'Chưa hỗ trợ upload file kích thước lớn'
        }),
        {
          toastId: 'upload-another-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    } else {
      const reader = new FileReader()
      reader.readAsDataURL(fileUpload)
      reader.addEventListener('load', () => {
        setImageSrc(reader.result)
        toggleModal()
      })
    }
  }

  const submit = async (data) => {
    handleCreateItem(data)
  }

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <p className="text-grey-2 text-p16 italic mb-6">
          Những trải nghiệm khác như các dự án cá nhân, hoạt động ngoại khóa,
          trải nghiệm bên ngoài công việc...sẽ giúp bạn nổi bật hơn và tạo điểm
          cộng trước nhà tuyển dụng đấy!
        </p>
        <div className="mb-6">
          <label className="w-fit block" id="another-input-file">
            <input
              id="another-input-file"
              type="file"
              accept="images/*"
              className="hidden"
              onChange={(e) => handleUploadImage(e.target.files)}
            />
            {watchOtherImage && (
              <div className="relative cursor-careerPath hover:brightness-110 ">
                <Image
                  alt="upload-another-img"
                  width={80}
                  height={80}
                  src={imageSrc}
                  objectFit="cover"
                  className="rounded-[16px]"
                />

                <div className="absolute top-0 w-[80px] h-[80px] bg-[rgba(0,0,0,0.5)] rounded-[16px] flex flex-col justify-center items-center">
                  <XProfileIcon name="uploadLogo" stroke="white" />
                </div>
              </div>
            )}
            {!watchOtherImage && (
              <Image
                alt="upload-another-img"
                width={80}
                height={80}
                src="/images/upload-another-new.png"
                className="cursor-careerPath hover:brightness-95"
              />
            )}
            {progress.onUpload && progress.upload <= 100 && (
              <div className="flex justify-center mt-3">
                <div className="w-full">
                  <PropressBar
                    background="bg-[#ECB14E]"
                    backgroundOut="bg-[#E6E6E6]"
                    type={1}
                    skillMatchingPercentage={progress.upload}
                    percentValue={100}
                  />
                </div>
              </div>
            )}
          </label>
          {errors?.OtherImage && (
            <div className="mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.OtherImage?.message}
              </span>
            </div>
          )}
        </div>
        <div className="mb-6">
          <p className="text-p18 mb-4">
            Tên trải nghiệm
            <span className="text-semantic-red">*</span>
          </p>
          <div className="relative">
            <input
              placeholder="Tên trải nghiệm"
              maxLength={100}
              {...register('OtherTitle')}
              className={`rounded-lg border placeholder:text-grey-3 ${
                errors?.OtherTitle ? 'border-semantic-red ' : 'border-grey-3'
              }  py-2 px-6 outline-0 w-full peer`}
            />
            <div className="hidden peer-focus:block transition-all duration-100 absolute right-0 -top-6">
              <p className="text-grey-1 text-p14">
                {100 - (watchOtherTitle?.length || 0)}
              </p>
            </div>
          </div>
          {errors?.OtherTitle && (
            <div className="flex justify-end mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.OtherTitle?.message}
              </span>
            </div>
          )}
        </div>

        <div className="mb-6">
          <p className="text-p18 mb-4">Mô tả chi tiết</p>
          <div className="relative">
            <Controller
              control={control}
              name="OtherDescription"
              render={({ field }) => {
                return (
                  <TextareaAutosize
                    {...field}
                    placeholder="Viết mô tả chi tiết"
                    className={`custom-scrollbar-none-border placeholder:text-grey-3 min-h-[200px] resize-none outline-0 rounded-lg border border-grey-3  py-2 px-6 outline-0 w-full peer`}
                  />
                )
              }}
            />

            {/* <div className="hidden peer-focus:block transition-all duration-100 absolute right-0 -top-6">
            <p className="text-grey-1 text-p14">
              {100 - (watchOtherTitle?.length || 0)}
            </p>
          </div> */}
          </div>
        </div>

        <div className="xl:flex justify-end">
          <div className="xl:flex items-center gap-4">
            <Button
              title="Huỷ"
              background="bg-grey-4 hidden xl:block"
              margin="m-0"
              rounded="rounded-lg"
              width="w-[99px]"
              padding="xl:py-2 xl:px-8"
              height="xl:h-auto h-[44px]"
              type="button"
              onClick={() => handleCancle()}
            />
            <Button
              title="Lưu"
              margin="m-0"
              rounded="rounded-lg"
              width="xl:w-[99px] w-full"
              padding="xl:py-2 xl:px-8"
              height="xl:h-auto h-[44px]"
              type="submit"
              btnRef={btnRef}
            />
          </div>
        </div>
      </form>

      <DialogAvatarCropImages
        title="Chỉnh sửa ảnh"
        circularCrop={false}
        src={imageSrc}
        isVisible={openModal}
        handleOnClose={toggleModal}
        handleCropImage={handleCropImage}
        aspect={1 / 1}
      />
    </>
  )
}

AnotherFormCreate.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object
}

AnotherFormCreate.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {}
}

export default AnotherFormCreate
