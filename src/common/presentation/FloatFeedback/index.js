import { useRef, useState } from 'react'
import Button from '../Button'
import XProfileIcon from '../Icons'
import ReCAPTCHA from 'react-google-recaptcha'
import { Divider } from '../Divider'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { uploadImage } from 'store/helper/serviceHelper'
import { useDispatch } from 'react-redux'
import { sendHomeFeedback } from 'store/app/homeSlice'
import { ToastSuccess } from '../Notification/Toast'
import { toast } from 'react-toastify'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { ToastError } from '../Notification/Toast/ToastError'
import { AlertError } from '../Notification/Toast/AlertError'
import { AlertSuccess } from '../Notification/Toast/AlertSuccess'

const FloatFeedback = () => {
  const recaptchaRef = useRef()

  const dispatch = useDispatch()
  const [openModal, setOpenModal] = useState(false)
  const [inputFile, setInputFile] = useState(null)
  const [loadingImage, setLoadingImage] = useState(false)
  const schema = yup.object().shape({
    email: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    name: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    content: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    recaptchaResponse: yup.mixed().required('Vui lòng xác thực bạn nhé!')
  })
  const {
    register,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const toggleModal = () => {
    setOpenModal(!openModal)
  }
  const handleCloseModal = () => {
    setOpenModal(false)
    reset()
  }
  const handleUpload = async (file) => {
    setLoadingImage(true)
    if (file?.length > 0) {
      if (file[0]?.size > 5120) {
        toast(
          AlertError({
            title: 'Có lỗi xảy ra'
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
        return false
      }
      const { successMessage } = await uploadImage(file[0])
      if (successMessage) {
        setValue('imageUrl', successMessage)
        setInputFile(file[0]?.name)
      }
    }
    setLoadingImage(false)
  }

  const onChangeRecaptcha = (val) => {
    setValue('recaptchaResponse', val)
  }

  const submit = async (data) => {
    if (recaptchaRef.current.getValue()) {
      const res = await dispatch(sendHomeFeedback(data))
      if (res?.payload?.isSuccess) {
        toast(
          AlertSuccess({
            title: 'Gửi phản hồi thành công'
          }),
          {
            toastId: 'send-feedback-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
        reset()
        setOpenModal(false)
      }
    } else {
      recaptchaRef.current?.reset()
      setValue('recaptchaResponse', '')
    }
  }
  const wrapperRef = useRef(null)
  useOnClickOutside(wrapperRef, handleCloseModal)

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="hidden xl:block fixed -right-[100px]  top-1/2 -rotate-90	rounded-[8px] z-[9999]">
        <Button
          title="X-Profile lắng nghe bạn"
          padding="py-1 px-3"
          width="w-auto"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          rounded="rounded-[8px]"
          color="text-neutral"
          type="button"
          onClick={() => setOpenModal(true)}
        />
      </div>
      <div className="xl:hidden fixed right-0 top-20 	 z-[9999]">
        <div
          className="w-9 h-9 rounded-full bg-button flex items-center justify-center"
          onClick={() => setOpenModal(true)}
        >
          <XProfileIcon name="sendFeedbackIcon" />
        </div>
      </div>

      <div
        className={`duration-500 w-[100vw] h-[100vh] flex justify-end fixed   ${
          openModal
            ? 'right-[calc(0%)]  z-[99999] opacity-100 bg-black/30'
            : '-right-[calc(100%)] -z-[99999] opacity-0'
        }`}
      >
        <div
          className={` duration-500 ease-in-out w-screen h-full sm:w-[400px] shadow-md p-4 bg-white overflow-y-scroll custom-scrollbar ${
            openModal ? 'translate-x-0' : '-translate-x-0'
          }`}
          ref={wrapperRef}
        >
          <div className="mb-8 ">
            <div className="flex justify-between">
              <p className="text-p18-bold">Ý kiến phản hồi</p>
              <div
                className="cursor-pointer"
                onClick={() => setOpenModal(false)}
              >
                <XProfileIcon name="cross" stroke="#333333" />
              </div>
            </div>
          </div>
          <p className="text-p16 mb-1">
            Bạn có gặp khó khăn hay bất tiện nào trong quá trình sử dụng nền
            tảng hoặc có đề xuất nào để cải thiện nền tảng không?{' '}
            <span className="text-red-500">*</span>
          </p>
          <textarea
            {...register('content')}
            placeholder="Chúng tôi sẵn sàng lắng nghe ý kiến của bạn"
            className="w-full outline-0 border border-grey-2 rounded-lg p-2 custom-scrollbar"
            rows={5}
            maxLength={500}
          />
          <p className="text-grey-1 text-p14 italic">
            Vui lòng không điền thông tin nhạy cảm hoặc từ cấm
          </p>
          <p className="text-p14 text-red-500 mb-4 h-[22px]">
            {errors.content?.message}
          </p>
          <p className="text-p16 mb-1">
            Một bức ảnh minh họa sẽ giúp X-Profile hiểu rõ đóng góp của bạn hơn:
          </p>
          <input
            id="input-file-feedback-app"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              handleUpload(e.target.files)
              e.target.value = ''
            }}
          />

          <label htmlFor="input-file-feedback-app">
            <div className="flex items-center rounded-lg overflow-hidden w-full group cursor-pointer">
              <div className="bg-stoke p-2 group-hover:opacity-80 border border-stoke">
                Chọn file
              </div>
              <div className="border border-stoke h-full p-2 rounded-tr-lg rounded-br-lg flex-1">
                {inputFile || 'Chưa chọn file'}
              </div>
            </div>
          </label>
          <p className="text-grey-1 text-p14 mt-1">(*) Tối đa 5MB</p>

          <p className="text-p16 mb-2 mt-4">
            Cung cấp thông tin này để X-Profile có thể gửi quà cảm ơn đến cho
            bạn nhé! <span className="text-red-500">*</span>
          </p>
          <div className="mb-2">
            <input
              {...register('name')}
              className={`sm:text-p16 text-p12 text-neutral py-2 px-4 focus:outline-none w-full border border-stoke rounded-lg`}
              placeholder="Tên của bạn"
            />
            <p className="text-p14 text-red-500 h-[22px]">
              {errors.name?.message}
            </p>
          </div>
          <div className="mb-2">
            <input
              {...register('email')}
              className={`sm:text-p16 text-p12 text-neutral py-2 px-4 focus:outline-none w-full border border-stoke rounded-lg`}
              placeholder="Email"
            />
            <p className="text-p14 text-red-500 h-[22px]">
              {errors.email?.message}
            </p>
          </div>

          <div className="my-2">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey="6Lc7KcooAAAAAJ4kpBi-iGeCtt0R_yBgGoK63uC4"
              onChange={onChangeRecaptcha}
            />
            <p className="text-p14 text-red-500 mb-[8px] h-[22px]">
              {errors?.recaptchaResponse?.message}
            </p>
          </div>

          <Divider />
          <div className="flex justify-end my-2 ">
            <Button
              title="Gửi"
              padding="py-1 px-8"
              width="w-auto"
              textWeight={'sm:text-p18-bold text-p14-bold'}
              rounded="rounded-[8px]"
              color="text-neutral"
              disabled={loadingImage}
              onClick={() => setOpenModal(true)}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

export default FloatFeedback
