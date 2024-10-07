import React, { useEffect, useRef, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import { getProfile, updatePersonalProfile } from 'store/app/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import moment from 'moment'
import XProfileIcon from 'common/presentation/Icons'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const PersonalInformationEdit = (props) => {
  const { birthday, gender = 0 } = props
  const dispatch = useDispatch()
  const maxYear = new Date().getFullYear()
  const [startDate, setStartDate] = useState(birthday || new Date())
  const selectedDate = moment(startDate).toDate()
  const genderList = [
    {
      id: 'female',
      value: 2,
      content: 'Nữ'
    },
    {
      id: 'male',
      value: 1,
      content: 'Nam'
    },
    {
      id: 'other',
      value: 3,
      content: 'Khác'
    },
    {
      id: 'none',
      value: 0,
      content: 'Chưa xác định'
    }
  ]
  const schema = yup.object().shape({
    date: yup.date(),
    gender: yup.string().nullable()
  })
  const {
    control,
    handleSubmit,
    setValue,
    register,
    formState: { errors }
  } = useForm({
    defaultValues: {
      // date: moment(birthday, 'DD/MM/YYYY').toDate()
    },
    mode: 'onChange',
    resolver: yupResolver(schema)
  })
  const onSubmit = (data) => {
    const payload = {
      birthday: moment(startDate).toISOString(),
      gender: parseInt(data?.gender)
    }
    updateUser(payload)
  }
  const handleClickDatePicker = () => {
    const item = document?.getElementById('datePicker')
    if (item) item?.click()
  }
  const updateUser = async (payload) => {
    const updateUserProfile = await dispatch(updatePersonalProfile(payload))
    const { data } = unwrapResult(updateUserProfile)

    if (data?.errorMessage) {
      toast(
        AlertError({
          title: data?.errorMessage,
          description: 'Vui lòng thử lại trong giây lát.'
          // information: 'Tìm hiểu thêm',
        }),
        {
          toastId: 'alert-account-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    } else {
      dispatch(getProfile())
      toast(
        AlertSuccess({
          title: 'Cập nhật thành công',
          description: 'Thông tin của bạn đã được ghi nhận.'
          // information: 'Tìm hiểu thêm'
        }),
        {
          toastId: 'alert-account-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Information */}
      <div className="mb-6">
        <div className="mb-6">
          <p className="xl:block hidden text-p20-bold text-black">
            Thông tin cá nhân
          </p>
          <p className="xl:text-p18 text-p14 italic text-grey-1">
            Chỉnh sửa thông tin cá nhân cơ bản của bạn để cải thiện đề xuất.
            Thông tin này là riêng tư và sẽ không hiển thị trong hồ sơ công khai
            của bạn.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <label className="xl:text-p18 text-p16 text-black">Ngày sinh</label>
          <Controller
            name="date"
            control={control}
            // defaultValue={moment(birthday, 'DD/MM/YYYY').toDate()}
            render={({ field }) => (
              <div className="border  py-2 px-6 rounded-lg flex">
                <DatePicker
                  key={'date'}
                  id="datePicker"
                  placeholderText="Ngày sinh của bạn"
                  className="outline-0 focus:outline-none w-full"
                  selected={selectedDate}
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  showMonthDropdown
                  maxDate={moment().year(maxYear).toDate()}
                  scrollableYearDropdown
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
                <div onClick={handleClickDatePicker}>
                  <XProfileIcon name="calendar2" />
                </div>
              </div>
            )}
          />
          {errors?.date && (
            <p className="text-semantic-red text-p14 ml-0.5 -mt-4">
              {errors?.date?.message}
            </p>
          )}
        </div>
        <div className="flex flex-col gap-4 mt-4">
          <label className="xl:text-p18 text-p16 text-black">Giới tính</label>
          <div className="flex flex-col xl:flex-row justify-start gap-7 xl:gap-16">
            {genderList?.map((item, idx) => {
              const { id, content, value } = item
              return (
                <>
                  <div key={idx} className="flex items-center gap-x-6 ">
                    <input
                      id={id}
                      type="radio"
                      {...register('gender')}
                      className="radio-input"
                      defaultChecked={value === gender}
                      value={value}
                    />
                    <label
                      htmlFor={id}
                      // onClick={() => handleChangePaymentMethod(value)}
                      className="flex items-center cursor-pointer text-p18 radio-label"
                    >
                      <span className="w-6 h-6 inline-block mr-2 rounded-full border flex-no-shrink"></span>
                      <p className="first-letter:uppercase xl:text-p18 text-p16">
                        {content}
                      </p>
                    </label>
                  </div>
                </>
              )
            })}
          </div>
          {errors.gender && (
            <p className="text-semantic-red text-p14 ml-0.5 -mt-4">
              {errors.gender.message}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end items-center mt-16 xl:mt-0">
        <button
          // disabled={!isDirty || !isValid }
          type="submit"
          className="xl:w-[240px] w-full py-3 bg-button disabled:bg-grey-2 rounded-lg hover:opacity-70"
        >
          <p className="text-p18-bold">Lưu thông tin</p>
        </button>
      </div>
    </form>
  )
}

export default PersonalInformationEdit
