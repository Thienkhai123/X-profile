import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import XProfileIcon from 'common/presentation/Icons'

const WorkDayItemEdit = (props) => {
  const {
    detail,
    workingDayId,
    logo,
    title,
    description,
    onSubmit = {},
    handleEdit = {},
    handleDelete = {},
    isEdit = false,
    ind = 0
  } = props
  const schema = yup.object({
    titleContent: yup.string().required(),
    descriptionContent: yup.string().required()
  })

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  return (
    <div className=" xl:w-full relative xl:min-h-[470px] min-h-[293px] h-full p-5 mr-0 bg-white rounded-xl flex flex-col ">
      <div className="flex justify-center mb-[16px] mt-[28px]">
        <label htmlFor="avatar">
          {logo ? (
            <div className="min-h-[156px] flex items-center">
              <Image
                width={120}
                height={120}
                src={logo}
                alt=""
                objectFit="contain"
              />
            </div>
          ) : (
            <div className="min-h-[156px] flex items-center">
              <Image
                width={80}
                height={80}
                src="/images/Edit/Upload.png"
                alt=""
                objectFit="contain"
              />
            </div>
          )}
        </label>
      </div>
      <form onChange={handleSubmit(onSubmit)}>
        <p className="xl:text-p20-bold text-p16-bold focus:outline-none w-full text-center mb-[8px] mt-[20px] text-neutral">
          {title}
        </p>
        <p
          className="xl:text-p18 font-normal h-[80px] xl:h-fit text-grey-1 text-p12 focus:outline-none text-center "
          {...register('descriptionContent')}
          style={{ wordBreak: 'break-word' }}
        >
          {description}
        </p>
      </form>
    </div>
  )
}

WorkDayItemEdit.propTypes = {
  titlePlacehoder: PropTypes.string,
  descriptionPlaceholder: PropTypes.string,
  detail: PropTypes.string
}
WorkDayItemEdit.defaultProps = {
  titlePlacehoder: '',
  detail: 'Chọn ảnh minh họa từ thư viện',
  descriptionPlaceholder: ''
}

export default WorkDayItemEdit
