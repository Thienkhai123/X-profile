import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { toast } from 'react-toastify'
import { getPresignedUrlByAxiosProgress } from 'store/helper/serviceHelper'
import { useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

function bytesToMegaBytes(bytes) {
  return (bytes / (1024 * 1024)).toFixed(2) + 'MB'
}

const CertificateFormCreate = (props) => {
  const { handleCancle, handleCreateItem, defaultValues, btnRef, portfolioId } =
    props

  const [progress, setProgress] = useState({
    onUpload: false,
    percentage: 0
  })

  const [fileState, setFileState] = useState({
    name: null,
    size: null
  })

  const handleRemoveFile = () => {
    setFileState({
      name: null,
      size: null
    })
    setProgress({
      onUpload: false,
      percentage: 0
    })
    setValue('UserCertificateImage', '')
  }

  const expression =
    /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi

  const schema = yup.object().shape({
    UserCertificateName: yup.string().trim().required('Không được bỏ trống'),
    UserCertificateImage: yup
      .string()
      .trim()
      .required('Không được bỏ trống')
      .matches(expression, 'Đường dẫn không hợp lệ')
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

  const watchUserCertificateImage = watch('UserCertificateImage')

  const handleUploadImage = async (file) => {
    if (file) {
      if (file[0]?.type !== 'application/pdf') {
        toast(
          AlertWaring({
            title: 'Chỉ hỗ trợ upload file định dạng PDF'
          }),
          {
            toastId: 'upload-certificate-error-type',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
        return
      }
      if (file[0].size / 1024 > 5120) {
        toast(
          AlertWaring({
            title: 'Chưa hỗ trợ upload file kích thước lớn'
          }),
          {
            toastId: 'upload-certificate-error-size',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
        return
      } else {
        setProgress({
          ...progress,
          onUpload: true
        })
        setFileState({
          ...fileState,
          name: file[0]?.name,
          size: file[0]?.size
        })
        const imgUrl = await getPresignedUrlByAxiosProgress(
          file[0],
          'Portfolio/' + portfolioId,
          (val) =>
            setProgress({
              ...progress,
              percentage: val
            })
        )
        setValue('UserCertificateImage', imgUrl)
        setError('UserCertificateImage', { type: 'custom', message: '' })
      }
    }
  }

  const submit = async (data) => {
    handleCreateItem(data)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="mb-6">
        <p className="text-p18 mb-4">
          Tên chứng chỉ<span className="text-semantic-red">*</span>
        </p>

        <input
          placeholder="Nhập tên chứng chỉ"
          {...register('UserCertificateName')}
          className={`rounded-lg border ${
            errors?.UserCertificateName
              ? 'border-semantic-red '
              : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full placeholder:text-grey-3`}
        />
        {errors?.UserCertificateName && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.UserCertificateName?.message}
            </span>
          </div>
        )}
      </div>

      <div className="mb-6">
        <p className="text-p18 mb-2">
          Đăng tải chứng chỉ<span className="text-semantic-red">*</span>
        </p>

        <p className="text-p16 text-grey-2 italic mb-4">
          Bạn có thể thêm liên kết dẫn đến chứng chỉ của bạn hoặc tải lên file
          PDF tại đây
        </p>

        <input
          placeholder="https://"
          {...register('UserCertificateImage')}
          className={`rounded-lg border placeholder:text-grey-3 ${
            errors?.UserCertificateImage?.message
              ? 'border-semantic-red '
              : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full`}
          disabled={!!fileState.name}
        />
        {errors?.UserCertificateImage?.message && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.UserCertificateImage?.message}
            </span>
          </div>
        )}
      </div>

      {!fileState.name && (
        <label id="upload-pdf-file-block-certificate">
          <input
            id="upload-pdf-file-block-certificate"
            type="file"
            accept="application/pdf"
            className="hidden"
            disabled={!!watchUserCertificateImage}
            onChange={(e) => {
              handleUploadImage(e.target.files)
              e.target.value = ''
            }}
          />
          <div
            className={`bg-background-border-dashed ${
              !!watchUserCertificateImage &&
              'bg-[rgba(192,192,192,0.3)] rounded-lg opacity-50'
            } w-full h-[80px] lg:h-[120px] mb-6 flex flex-col justify-center items-center cursor-careerPath`}
          >
            <div className="flex items-center gap-2">
              <Image
                alt="upload-pdf"
                src="/images/Portfolio/File Send.png"
                width={24}
                height={24}
                quality={100}
              />
              <p className="text-p14 lg:text-p18 text-grey-1">
                Đăng tải PDF - Dung lượng 10MB
              </p>
            </div>
          </div>
        </label>
      )}

      {fileState.name && (
        <div className="py-7 px-6 rounded-2xl border border-grey-4 mb-6">
          <div className="flex gap-4">
            <div
              className="w-5/12 flex gap-4"
              style={{
                wordBreak: 'break-word'
              }}
            >
              <div>
                <div className="w-6">
                  <Image
                    alt="upload-pdf"
                    src="/images/Portfolio/File Send.png"
                    width={24}
                    height={24}
                    quality={100}
                  />
                </div>
              </div>
              <div>
                <p className="text-p18 text-neutral">{fileState.name}</p>
                <p className="text-p18 text-grey-1">
                  {bytesToMegaBytes(fileState.size)}
                </p>
              </div>
            </div>

            <div className="flex gap-4 w-7/12">
              <div className="w-2/3">
                {progress.percentage < 100 && (
                  <div className="flex gap-4 items-center">
                    <div className="rounded-xl bg-grey-4 overflow-hidden flex-1 h-3">
                      <div
                        className="rounded-xl bg-button h-3"
                        style={{
                          width: `${progress.percentage}%`
                        }}
                      />
                    </div>
                    <p className="text-button">{progress.percentage}%</p>
                  </div>
                )}
              </div>

              <div className="w-1/3 flex justify-end">
                <div className="cursor-careerPath" onClick={handleRemoveFile}>
                  <XProfileIcon name="cross" stroke="#000000" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="hidden xl:flex justify-end">
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
      <div className="block w-full xl:hidden">
        <Button
          title="Lưu"
          margin="m-0"
          rounded="rounded-lg"
          width="w-full"
          padding="py-[13px]"
          height="h-full"
          type="submit"
          btnRef={btnRef}
        />
      </div>
    </form>
  )
}

CertificateFormCreate.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object
}

CertificateFormCreate.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {}
}

export default CertificateFormCreate
