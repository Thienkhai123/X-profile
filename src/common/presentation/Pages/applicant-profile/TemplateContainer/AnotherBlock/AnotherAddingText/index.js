import Button from 'common/presentation/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useRef } from 'react'

const AnotherAddingText = ({
  handleCreate = () => {},
  cancelEdit = () => {},
  addRef = null
}) => {
  const btnRef = useRef(null)
  const schema = yup.object().shape({
    title: yup.string().required('Vui lòng nhập thông tin bạn nhé'),
    description: yup.string().required('Vui lòng nhập thông tin bạn nhé')
  })
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const submit = (data) => {
    handleCreate(data)
  }

  const handleClickOutSideItem = () => {
    btnRef?.current?.click()
  }

  useOnClickOutside(addRef, handleClickOutSideItem)

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="w-full">
        <p className="text-grey-2 text-p16 mb-4">
          Những trải nghiệm khác như các dự án cá nhân, hoạt động ngoại
          khóa,...sẽ giúp bạn nổi bật hơn và tạo điểm cộng trước nhà tuyển dụng
          đấy!
        </p>
        <input
          autoFocus
          className="sm:text-p16-bold text-p14-bold p-2 rounded-lg text-black mb-2 outline-0 border border-button w-full"
          placeholder="Tên trải nghiệm"
          maxLength={100}
          {...register('title')}
        />
        <p className="text-semantic-red sm:text-p14 text-p12 h-6 mb-1">
          {errors?.title?.message}
        </p>
        <textarea
          className="custom-scrollbar rounded-lg p-[8px] w-full sm:text-p16 text-p14 text-grey-1 resize-none outline-0 border border-button"
          rows={3}
          {...register('description')}
          placeholder="Mô tả trải nghiệm"
        />
        <p className="text-semantic-red sm:text-p14 text-p12 h-6 mb-1">
          {errors?.description?.message}
        </p>
      </div>
      <div className="sm:flex gap-3">
        <Button
          title="Hủy bỏ"
          rounded="rounded-[8px]"
          background={'bg-[#4CA9BD]'}
          color="text-black"
          padding="py-[8px] px-[20px]"
          height="h-auto"
          width="sm:w-[240px] w-full"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          type="button"
          onClick={cancelEdit}
        />
        <Button
          btnRef={btnRef}
          title="Xác nhận"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[8px] px-[20px]"
          height="h-auto"
          width="sm:w-[240px] w-full"
          textWeight={'sm:text-p18-bold text-p14-bold'}
        />
      </div>
    </form>
  )
}

export default AnotherAddingText
