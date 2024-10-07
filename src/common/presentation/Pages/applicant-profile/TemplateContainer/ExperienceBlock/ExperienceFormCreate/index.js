import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import XProfileIcon from 'common/presentation/Icons'
import { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import TextareaAutosize from 'react-textarea-autosize'
import Button from 'common/presentation/Button'
import PropTypes from 'prop-types'
import moment from 'moment'

const ExperienceFormCreate = (props) => {
  const { handleCancle, handleCreateItem, defaultValues, btnRef } = props
  const { StartDate, EndDate } = defaultValues || {}
  const [startDate, setStartDate] = useState(StartDate || null)
  const [endDate, setEndDate] = useState(
    EndDate && !isNaN(new Date(EndDate).getTime()) ? EndDate : null
  )
  const [isNow, setIsNow] = useState(
    EndDate && isNaN(new Date(EndDate).getTime())
  )

  const schema = yup.object().shape({
    Title: yup.string().required('Không được bỏ trống'),
    SubTitle: yup.string().required('Không được bỏ trống'),
    StartDate: yup.string().required('Không được bỏ trống'),
    EndDate: yup.string().required('Không được bỏ trống')
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

  const handleRenderValueByDatesPicker = async (s, e) => {
    let range = 0
    if (!e) {
      const date = new Date()
      const tempEndDate = moment(date).format('YYYY-MM-DD')
      range = moment(tempEndDate).diff(s, 'months')
      if (range < 12) {
        return {
          TimeOfExp: range.toString(),
          UnitOfTime: 'Tháng'
        }
      } else {
        return {
          TimeOfExp: Math.floor(range / 12).toString(),
          UnitOfTime: 'Năm'
        }
      }
    } else {
      range = moment(e).diff(s, 'months')

      if (range < 12) {
        return {
          TimeOfExp: range.toString(),
          UnitOfTime: 'Tháng'
        }
      } else {
        return {
          TimeOfExp: Math.floor(range / 12).toString(),
          UnitOfTime: 'Năm'
        }
      }
    }
  }

  const handleCheckNow = (val) => {
    if (val) {
      setValue('EndDate', 'now')
    } else {
      setValue('EndDate', null)
    }
    setError('EndDate', {
      type: 'custom',
      message: ''
    })
    setIsNow(!isNow)
  }

  const handleSetStartDate = async (value) => {
    setStartDate(value)
    setValue('StartDate', value)
    setError('StartDate', { type: 'custom', message: '' })
  }

  const handleSetEndDate = (value) => {
    setEndDate(value)
    setValue('EndDate', value)
    setError('EndDate', { type: 'custom', message: '' })
  }

  const submit = async (data) => {
    const { Title, SubTitle, Description } = data
    let timeValue = ''
    const watchEndDate = watch('EndDate')

    if (watchEndDate === 'now' || isNaN(new Date(watchEndDate).getTime())) {
      timeValue = moment(startDate).format('YYYY-MM-DD') + ' - ' + 'Hiện tại'
    } else {
      timeValue =
        moment(startDate).format('YYYY-MM-DD') +
        ' - ' +
        moment(endDate).format('YYYY-MM-DD')
    }

    const { TimeOfExp, UnitOfTime } = await handleRenderValueByDatesPicker(
      startDate,
      endDate
    )
    const payload = {
      Title,
      SubTitle,
      Description,
      Time: timeValue,
      TimeOfExp,
      UnitOfTime
    }
    handleCreateItem(payload)
  }
  const handleClickDateEnd = () => {
    if (!startDate && !isNow) {
      setError('EndDate', {
        type: 'custom',
        message: 'Chọn ngày bắt đầu trước'
      })
    } else {
      setError('EndDate', {
        type: 'custom',
        message: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit(submit)} className="">
      <div className="xl:mb-6 mb-4">
        <p className="xl:text-p18 text-p16 mb-4">
          Chức vụ<span className="text-semantic-red">*</span>
        </p>

        <input
          autoComplete="off"
          placeholder="Nhập chức vụ"
          {...register('Title')}
          className={`rounded-lg border placeholder:text-grey-3 ${
            errors?.Title ? 'border-semantic-red ' : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full`}
        />
        {errors?.Title && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.Title.message}
            </span>
          </div>
        )}
      </div>
      <div className="">
        <p className="xl:text-p18 text-p16 mb-4">
          Tên công ty<span className="text-semantic-red">*</span>
        </p>

        <input
          autoComplete="off"
          placeholder="Nhập tên công ty"
          {...register('SubTitle')}
          className={`rounded-lg border placeholder:text-grey-3 ${
            errors?.SubTitle ? 'border-semantic-red ' : 'border-grey-3'
          }  py-2 px-6 outline-0 w-full`}
        />
        {errors?.SubTitle && (
          <div className="flex justify-end mt-1">
            <span className="text-semantic-red text-p14 ">
              {errors?.SubTitle.message}
            </span>
          </div>
        )}

        <div className="flex items-center mt-4">
          <label className="xl:mb-6 mb-4 w-fit flex gap-4 cursor-careerPath">
            <div className=" relative w-fit h-fit">
              <input
                type="checkbox"
                defaultChecked={isNow}
                value={isNow}
                onClick={(e) => handleCheckNow(e.target.checked)}
                className="appearance-none placeholder:text-grey-3 block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded"
              />
              <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
              </div>
            </div>
            <p className="xl:text-p18 text-p16">Tôi đang làm việc ở đây</p>
          </label>
        </div>

        <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6 gap-4 mb-6">
          <div>
            <p className="xl:text-p18 text-p16 xl:mb-4 mb-2">
              Từ<span className="text-semantic-red">*</span>
            </p>
            <label id="select-date-exp-from ">
              <div
                className={`border  ${
                  errors?.StartDate?.message
                    ? 'border-semantic-red '
                    : 'border-grey-3'
                }  py-2 px-6 rounded-lg flex cursor-careerPath`}
              >
                <ReactDatePicker
                  id="select-date-exp-from"
                  key={'date'}
                  placeholderText="Ngày bắt đầu"
                  className={`outline-0 focus:outline-none w-full placeholder:text-grey-3`}
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
                <XProfileIcon name="calendar2" />
              </div>
            </label>
            {errors?.StartDate?.message && (
              <div className="flex justify-end mt-1">
                <span className="text-semantic-red text-p14 ">
                  Không được bỏ trống
                </span>
              </div>
            )}
          </div>

          <div>
            <p className="xl:text-p18 text-p16 xl:mb-4 mb-2">
              Đến<span className="text-semantic-red">*</span>
            </p>
            <label id="select-date-exp-to ">
              <div
                onClick={() => handleClickDateEnd()}
                className={`border  ${
                  errors?.EndDate?.message
                    ? 'border-semantic-red '
                    : 'border-grey-3'
                } ${
                  isNow ? 'bg-grey-4' : 'bg-white'
                }  py-2 px-6 rounded-lg flex cursor-careerPath relative`}
              >
                <ReactDatePicker
                  id="select-date-exp-to "
                  key={'date'}
                  placeholderText="Ngày kết thúc"
                  className="outline-0 focus:outline-none w-full bg-transparent placeholder:text-grey-3"
                  selected={endDate}
                  showYearDropdown
                  yearDropdownItemNumber={100}
                  showMonthDropdown
                  autoComplete="off"
                  disabled={!startDate || isNow}
                  minDate={startDate && new Date(startDate)}
                  maxDate={new Date()}
                  scrollableYearDropdown
                  onKeyDown={(e) => e.preventDefault()}
                  onChange={(date) => handleSetEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                />
                {(!startDate || isNow) && (
                  <div
                    className="absolute top-0 left-0 w-full h-full z-10"
                    onClick={() => handleClickDateEnd()}
                  />
                )}
                <XProfileIcon name="calendar2" />
              </div>
            </label>
            {errors?.EndDate?.message && (
              <div className="flex justify-end mt-1">
                <span className="text-semantic-red text-p14 ">
                  {errors?.EndDate?.message || `Không được bỏ trống`}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="mb-6">
          <p className="xl:text-p18 text-p16 mb-2">Mô tả chi tiết</p>
          <p className="text-p16 text-grey-2 italic mb-4">
            Hãy nêu rõ một vài thành tích nổi bật của bạn khi làm việc tại vị
            trí này, kèm theo số liệu tương ứng để gây ấn tượng nhé!
          </p>

          <TextareaAutosize
            placeholder="Nhập mô tả chi tiết"
            {...register('Description')}
            className="custom-scrollbar-none-border placeholder:text-grey-3 min-h-[200px] rounded-lg p-4 block w-full h-[179px] text-p16 resize-none overflow-auto outline-0 text-neutral border border-grey-3"
          />
        </div>

        <div className="xl:flex justify-end">
          <div className="xl:flex items-center gap-4 ">
            <Button
              title="Huỷ"
              background="bg-grey-4 xl:block hidden"
              margin="m-0"
              rounded="rounded-lg"
              width="w-[99px]"
              onClick={() => handleCancle()}
            />
            <Button
              title="Lưu"
              margin="m-0"
              rounded="rounded-lg"
              width="xl:w-[99px] w-full"
              type="submit"
              btnRef={btnRef}
            />
          </div>
        </div>
      </div>
    </form>
  )
}

ExperienceFormCreate.propTypes = {
  handleCancle: PropTypes.func,
  handleCreateItem: PropTypes.func,
  defaultValues: PropTypes.object
}

ExperienceFormCreate.defaultProps = {
  handleCancle: () => {},
  handleCreateItem: () => {},
  defaultValues: {}
}

export default ExperienceFormCreate
