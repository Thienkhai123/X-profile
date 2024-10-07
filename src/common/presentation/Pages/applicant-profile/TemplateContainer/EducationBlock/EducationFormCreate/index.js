import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import XProfileIcon from 'common/presentation/Icons'
import ReactDatePicker from 'react-datepicker'
import moment from 'moment'

const EducationFormCreate = (props) => {
  const { defaultValues, handleCancel, handleCreateItem, btnRef } = props
  const { StartAt, EndAt, School, Subject } = defaultValues || {}
  const [startDate, setStartDate] = useState(StartAt ? new Date(StartAt) : null)
  const [endDate, setEndDate] = useState(
    EndAt && !isNaN(new Date(EndAt).getTime()) ? new Date(EndAt) : null
  )
  const [isNow, setIsNow] = useState(EndAt && isNaN(new Date(EndAt).getTime()))

  const schema = yup.object().shape({
    UserEducationSchool: yup.string().trim().required('Không được bỏ trống'),
    UserEducationSubject: yup.string().trim().required('Không được bỏ trống'),
    UserEducationStartAt: yup.string().trim().required('Không được bỏ trống'),
    UserEducationEndAt: yup.string().required('Không được bỏ trống')
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
    defaultValues: {
      UserEducationSchool: School,
      UserEducationSubject: Subject,
      UserEducationStartAt: StartAt,
      UserEducationEndAt: EndAt
    }
  })
  const handleCheckNow = (val) => {
    if (val) {
      setValue('UserEducationEndAt', 'now')
    } else {
      setValue('UserEducationEndAt', null)
    }
    setError('UserEducationEndAt', {
      type: 'custom',
      message: ''
    })
    setEndDate(null)
    setIsNow(!isNow)
  }

  const handleSetStartDate = async (value) => {
    setStartDate(value)
    setValue('UserEducationStartAt', value)
    setError('UserEducationStartAt', { type: 'custom', message: '' })
  }

  const handleSetEndDate = (value) => {
    setEndDate(value)
    setValue('UserEducationEndAt', value)
    setError('UserEducationEndAt', { type: 'custom', message: '' })
  }

  const submit = async (data) => {
    const watchEndDate = watch('UserEducationEndAt')

    const payload = {
      ...data,
      UserEducationStartAt: moment(startDate).format('YYYY-MM-DD'),
      UserEducationEndAt:
        watchEndDate === 'now' || isNaN(new Date(watchEndDate).getTime())
          ? 'Hiện tại'
          : moment(endDate).format('YYYY-MM-DD')
    }
    handleCreateItem(payload)
  }
  const handleClickDateEnd = () => {
    if (!startDate && !isNow) {
      setError('UserEducationEndAt', {
        type: 'custom',
        message: 'Chọn ngày bắt đầu trước'
      })
    } else {
      setError('UserEducationEndAt', {
        type: 'custom',
        message: ''
      })
    }
  }
  return (
    <form className="sm:py-6 py-3" onSubmit={handleSubmit(submit)}>
      <div className="mb-6 ">
        <p className="text-p18 mb-4">
          Trường<span className="text-semantic-red">*</span>
        </p>
        <input
          placeholder="Trường học"
          maxLength={160}
          {...register('UserEducationSchool')}
          className={`rounded-lg border placeholder:text-grey-3 ${
            errors?.UserEducationSchool
              ? 'border-semantic-red '
              : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full`}
        />
        {errors?.UserEducationSchool && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.UserEducationSchool?.message}
            </span>
          </div>
        )}
      </div>
      <div className="mb-6">
        <p className="text-p18 mb-4">
          Chuyên ngành<span className="text-semantic-red">*</span>
        </p>
        <input
          maxLength={160}
          placeholder="Nhập tên chuyên ngành"
          {...register('UserEducationSubject')}
          className={`rounded-lg border placeholder:text-grey-3 ${
            errors?.UserEducationSubject
              ? 'border-semantic-red '
              : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full`}
        />
        {errors?.UserEducationSubject && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.UserEducationSubject?.message}
            </span>
          </div>
        )}
        <label className="text-black mt-4 text-p18 flex items-center gap-x-4 cursor-pointer ">
          <div className="relative">
            <input
              type="checkbox"
              defaultChecked={isNow}
              value={isNow}
              onClick={(e) => handleCheckNow(e.target.checked)}
              className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded"
            />
            <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
              <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
            </div>
          </div>
          <span className="first-letter:uppercase"> Tôi đang học ở đây</span>
        </label>
      </div>
      <div className="flex flex-col xl:flex-row justify-between mb-6 gap-6">
        <div className="xl:w-1/2">
          <p className="text-p18 mb-4">
            Từ<span className="text-semantic-red">*</span>
          </p>
          <Controller
            name="UserEducationStartAt"
            control={control}
            render={({ field }) => (
              <div className="border  py-2 px-6 rounded-lg flex">
                <ReactDatePicker
                  id="datePicker"
                  placeholderText="Ngày bắt đầu"
                  className="outline-0 focus:outline-none w-full placeholder:text-grey-3"
                  selected={startDate}
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  showMonthDropdown
                  maxDate={new Date()}
                  scrollableYearDropdown
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date) => handleSetStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                />
              </div>
            )}
          />
          {errors?.UserEducationStartAt?.message && (
            <div className="flex justify-end mt-1">
              <span className="text-semantic-red text-p14 ">
                Không được bỏ trống
              </span>
            </div>
          )}
        </div>
        <div className="xl:w-1/2">
          <p className="text-p18 mb-4">
            Đến<span className="text-semantic-red">*</span>
          </p>
          <Controller
            name="UserEducationEndAt"
            control={control}
            render={({ field }) => (
              <div
                onClick={() => handleClickDateEnd()}
                className={`border  py-2 px-6 rounded-lg flex relative  ${
                  isNow ? 'bg-grey-4' : 'bg-white'
                }`}
              >
                <ReactDatePicker
                  placeholderText="Ngày kết thúc"
                  className="outline-0 focus:outline-none w-full bg-transparent placeholder:text-grey-3"
                  selected={endDate}
                  disabled={!startDate || isNow}
                  minDate={startDate && new Date(startDate)}
                  maxDate={new Date()}
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  showMonthDropdown
                  scrollableYearDropdown
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date) => handleSetEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  autoComplete="off"
                />
                {(!startDate || isNow) && (
                  <div
                    className="absolute top-0 left-0 w-full h-full z-10"
                    onClick={() => handleClickDateEnd()}
                  />
                )}
              </div>
            )}
          />
          {errors?.UserEducationEndAt?.message && (
            <div className="flex justify-end mt-1">
              <span className="text-semantic-red text-p14 ">
                {errors?.UserEducationEndAt?.message || `Không được bỏ trống`}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end gap-4 items-center  xl:mt-0">
        <button
          onClick={() => handleCancel()}
          className="xl:w-[98px] w-full hidden xl:block py-3 bg-grey-4 disabled:bg-grey-2 rounded-lg hover:opacity-70"
        >
          <p className="text-p18-bold">Huỷ</p>
        </button>
        <button
          ref={btnRef}
          type="submit"
          className="xl:w-[98px] w-full py-3 bg-button disabled:bg-grey-2 rounded-lg hover:opacity-70"
        >
          <p className="text-p18-bold">Lưu</p>
        </button>
      </div>
    </form>
  )
}

EducationFormCreate.propTypes = {}

export default EducationFormCreate
