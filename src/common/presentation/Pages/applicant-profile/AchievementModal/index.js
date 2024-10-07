import React from 'react'
import Button from 'common/presentation/Button'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

const AchievementModal = (props) => {
  const {
    data,
    submit = () => {},
    title = 'Thêm thành tích',
    desc = 'Chọn các thành tích bên dưới để thêm vào hồ sơ:'
  } = props
  const schema = yup.object().shape({})
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const onSubmit = async (data) => {
    if (data) {
      submit(data)
    }
  }

  return (
    <div className="px-[63px] py-[34px]">
      <p className="text-p20-bold">{title}</p>
      <p className="text-p16 text-grey-1 mt-2">{desc}</p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-8 flex flex-col gap-6"
      >
        <div>
          <label className="text-p18-bold ">Xếp hạng thành tích</label>
          <input
            {...register('title')}
            className="w-full border border-stoke p-2 mt-2"
          />
        </div>
        <div>
          <label className="text-p18-bold ">Tên thành tích</label>
          <input
            {...register('content')}
            className="w-full border border-stoke p-2 mt-2"
          />
        </div>
        <div>
          <label className="text-p18-bold ">Ngày xác lập thành tích</label>
          <input
            {...register('time')}
            className="w-full border border-stoke p-2 mt-2"
          />
        </div>
        <div className="w-full flex justify-center mt-10">
          <Button
            title="Xác nhận"
            rounded="rounded-[8px]"
            background={'bg-[#F6BB3A]'}
            color="text-neutral"
            padding="py-[10px] px-[20px]"
            height="h-auto"
            width="w-[240px]"
            textWeight={'text-p18 font-bold'}
            onClick={() => onSubmit()}
          />
        </div>
      </form>
    </div>
  )
}

AchievementModal.propTypes = {}
AchievementModal.defaultProps = {}

export default AchievementModal
