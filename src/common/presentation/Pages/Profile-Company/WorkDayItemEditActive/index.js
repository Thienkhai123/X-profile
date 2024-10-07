import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import XProfileIcon from 'common/presentation/Icons'
import TextareaAutosize from 'react-textarea-autosize'

const WorkDayItemEditActive = (props) => {
  const {
    detail,
    logo,
    title,
    description,
    onChange = () => {},
    handleDelete = () => {},
    isEdit = false,
    titlePlacehoder,
    descriptionPlaceholder,
    indForm = 0,
    setIndex,
    toggleModalImage = () => {},
    autofocus = false,
    isErrorsImageUrl,
    isErrorsDesciption,
    isErrorsTitle
  } = props
  const schema = yup.object({
    title: yup.string(),
    description: yup.string()
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { id: indForm, title: title, description: description }
  })

  const [action, setAction] = useState({
    hover: false,
    forcus: false
  })

  return (
    <div
      className="relative xl:w-full xl:min-h-[470px] min-h-[293px] h-full p-5 mr-0 bg-white rounded-xl flex flex-col justify-center mt-[28px]"
      onMouseLeave={() => setAction({ ...action, hover: false })}
      onMouseMove={() => setAction({ ...action, hover: true })}
    >
      {isEdit && (
        <div
          className={`absolute bg-white  p-[4px] border-[1px] rounded-full border-[#EDEDE8]  gap-[8px] items-center z-[9999] top-[-30px] right-0 ${
            action.hover ? 'duration-300 flex' : 'duration-300 hidden'
          }`}
        >
          <button
            onClick={() => {
              toggleModalImage()
              setIndex(indForm)
            }}
            className={`p-[12px] rounded-full hover:bg-button duration-300`}
          >
            <XProfileIcon name="uploadLogo" />
          </button>
          <button
            onClick={() => handleDelete({ id: indForm })}
            className={`p-[12px] rounded-full hover:bg-button duration-300 `}
          >
            <XProfileIcon name="trash" fill="#000000" stroke="black" />
          </button>
        </div>
      )}
      <div className="flex justify-center mb-[16px] mt-[28px] ">
        {logo !== '' ? (
          <div
            className="cursor-pointer min-h-[156px] flex items-center"
            onClick={() => {
              toggleModalImage()
              setIndex(indForm)
            }}
          >
            <Image
              width={120}
              height={120}
              src={logo}
              alt=""
              objectFit="contain"
            />
          </div>
        ) : (
          <button
            id={`WorkingDay_imageUrl_${indForm}`}
            onClick={() => {
              toggleModalImage()
              setIndex(indForm)
            }}
            className=" p-4 rounded-lg border-custom-img-working-day "
          >
            <Image
              width={80}
              height={80}
              src={`/images/Edit/Upload.png`}
              alt=""
              quality={100}
              objectFit="contain"
            />
            <p className="text-button  text-p16-bold pt-[20px]">
              Chọn ảnh từ thư viện
            </p>
          </button>
        )}
      </div>
      {isErrorsImageUrl && (
        <p className="text-center text-p16 text-semantic-red ">
          Vui lòng chọn hình ảnh
        </p>
      )}
      {/* <p className="text-grey-1 text-p12 text-center">{detail}</p> */}
      {/* <form> */}
      <div>
        <input
          id={`WorkingDay_title_${indForm}`}
          autoFocus={autofocus}
          className={`swiper-no-swiping  xl:text-p20-bold placeholder:text-grey-3 text-p16-bold focus:outline-none w-full text-center mb-[8px] mt-[20px] text-black ${
            isErrorsTitle
              ? 'border-b border-semantic-red'
              : 'border-b border-transparent'
          }`}
          placeholder={titlePlacehoder}
          value={title}
          onChange={(e) =>
            onChange(
              { id: indForm, title: e.target.value },
              `WorkingDay_title_${indForm}`
            )
          }
          // {...register('title')}
        />
        {isErrorsTitle && (
          <p className="text-center text-p16 text-semantic-red">
            Không được bỏ trống
          </p>
        )}
        <TextareaAutosize
          // rows={4}
          id={`WorkingDay_desciption_${indForm}`}
          maxLength={100}
          className={`swiper-no-swiping  hover:border-b transition-all outline-none custom-scrollbar-none-border focus:border-b-[1px] placeholder:text-grey-3   xl:text-p18 font-normal text-grey-1 text-p12 focus:outline-none text-center h-full w-full resize-none ${
            isErrorsDesciption
              ? 'border-b border-semantic-red'
              : 'border-b border-transparent hover:border-semantic focus:border-semantic'
          }`}
          placeholder={descriptionPlaceholder}
          value={description}
          minRows={4}
          onChange={(e) =>
            onChange(
              { id: indForm, description: e.target.value },
              `WorkingDay_desciption_${indForm}`
            )
          }
          // {...register('description')}
          onFocus={() => {
            setAction({ ...action, forcus: true })
          }}
          onBlur={() => setAction({ ...action, forcus: false })}
        />
        <p className="text-end xl:text-p14 text-p12 text-grey-2 min-h-[20px]">
          {action.forcus ? 100 - description.length : ''}
        </p>
        {isErrorsDesciption && (
          <p className="text-center text-p16 text-semantic-red">
            Không được bỏ trống
          </p>
        )}
      </div>

      {/* </form> */}
    </div>
  )
}

WorkDayItemEditActive.propTypes = {
  titlePlacehoder: PropTypes.string,
  descriptionPlaceholder: PropTypes.string,
  detail: PropTypes.string
}
WorkDayItemEditActive.defaultProps = {
  titlePlacehoder: 'Nhập buổi làm việc',
  detail: 'Chọn ảnh minh họa từ thư viện',
  descriptionPlaceholder:
    'Mô tả ngắn các hoạt động tại công ty của bạn vào mỗi buổi, giới hạn 100 chữ.'
}

export default WorkDayItemEditActive
