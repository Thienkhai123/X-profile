import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import React from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import 'react-datepicker/dist/react-datepicker.css'
import TextareaAutosize from 'react-textarea-autosize'
import DatePicker, { registerLocale } from 'react-datepicker'
import moment from 'moment'
import { vi } from 'date-fns/locale'
import { useDispatch } from 'react-redux'
import { getAllAppliedCampaigns, rejectCampaign } from 'store/app/campaign'
import { toast } from 'react-toastify'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
registerLocale('vi', vi)
const CancelledInvitedModal = (props) => {
  const { userRecruitmentCampaignId, onCloseCancel = () => {} } = props
  const schema = yup.object().shape({})
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    // mode: 'onChange',
    defaultValues: {}
  })
  const dispatch = useDispatch()
  // const selectedDate = moment(startDate).toDate()
  const maxYear = new Date().getFullYear()
  const handleClickDatePicker = () => {
    const item = document?.getElementById('datePicker')
    if (item) item?.click()
  }
  const handleClickTimePicker = () => {
    const item = document?.getElementById('timePicker')
    if (item) item?.click()
  }
  const onSubmit = async (data) => {
    const { date, time, cancelOption, other } = data
    if (userRecruitmentCampaignId) {
      const payload = {
        userRecruitmentCampaignId: userRecruitmentCampaignId,
        rejectType: parseInt(cancelOption),
        reScheduleAt:
          date !== undefined && parseInt(cancelOption) === 1
            ? `${moment(date).format('DD/MM/YYYY')} ${moment(time).format(
                'HH:mm'
              )}`
            : null,
        reason: parseInt(cancelOption) === 0 ? other : null
      }
      const res = await dispatch(rejectCampaign(payload))
      if (res?.payload?.isSuccess) {
        onCloseCancel()
        dispatch(getAllAppliedCampaigns({ status: 200 }))
        toast(
          AlertSuccess({
            title:
              res?.payload?.successMessage || 'Bạn đã gửi từ chối thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      } else {
        toast(
          AlertError({
            title: res?.payload?.errorMessage || 'Có lỗi xảy ra'
          }),
          {
            toastId: 'alert-create-success',
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

  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-center justify-center w-full"
      >
        <p className="text-p20-bold mb-6 max-w-[282px] text-center">
          Vui lòng cho X-Profile biết lý do bạn từ chối lời mời này
        </p>
        <div className="w-full">
          <label className="mb-4 w-fit flex gap-6">
            <div className=" relative w-fit h-fit">
              <input
                type="radio"
                value={1}
                {...register('cancelOption')}
                className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded-full"
              />
              <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
              </div>
            </div>
            <p className="text-p18  overflow-hidden overflow-ellipsis">
              Lịch phỏng vấn chưa phù hợp
            </p>
          </label>
          {watch('cancelOption') === '1' && (
            <div className="mb-4">
              <p className="text-p16 text-grey-1 mb-4">
                Vui lòng chọn giờ khác phù hợp với bạn.
              </p>
              <Controller
                name="date"
                control={control}
                // defaultValue={moment(birthday, 'DD/MM/YYYY').toDate()}
                render={({ field }) => (
                  <div className="border bg-[#F5F5F2] py-[9px] px-6 rounded-lg flex relative mb-4">
                    <DatePicker
                      autoComplete="off"
                      key={'date'}
                      id="datePicker"
                      placeholderText="Chọn ngày"
                      className="outline-0 focus:outline-none w-full bg-[#F5F5F2] placeholder:text-grey-3 "
                      selected={field.value}
                      showYearDropdown
                      yearDropdownItemNumber={100}
                      showMonthDropdown
                      // maxDate={moment().year(maxYear).toDate()}
                      scrollableYearDropdown
                      onKeyDown={(e) => e.preventDefault()}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="dd/MM/yyyy"
                      locale="vi"
                      minDate={moment().toDate()}
                    />
                    <div onClick={handleClickDatePicker}>
                      <XProfileIcon name="calendar2" />
                    </div>
                  </div>
                )}
              />
              <Controller
                name="time"
                control={control}
                render={({ field }) => (
                  <div className="border bg-[#F5F5F2] py-[9px] px-6 rounded-lg flex relative">
                    <DatePicker
                      key={'time'}
                      id="timePicker"
                      placeholderText="Chọn giờ "
                      autoComplete="off"
                      className="outline-0 focus:outline-none w-full bg-[#F5F5F2] placeholder:text-grey-3 "
                      selected={field.value}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Chọn giờ"
                      onKeyDown={(e) => e.preventDefault()}
                      onChange={(date) => field.onChange(date)}
                      dateFormat="HH:mm"
                      locale="vi"
                    />
                    <div onClick={handleClickTimePicker}>
                      <XProfileIcon
                        name="clock"
                        width="24"
                        height="24"
                        stroke="#000"
                      />
                    </div>
                  </div>
                )}
              />
            </div>
          )}
          <label className="mb-4 w-fit flex gap-6">
            <div className=" relative w-fit h-fit">
              <input
                type="radio"
                value={2}
                {...register('cancelOption')}
                className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded-full"
              />
              <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
              </div>
            </div>
            <p className="text-p18  overflow-hidden overflow-ellipsis">
              Đã tìm được công việc mới
            </p>
          </label>
          <label className="mb-4 w-fit flex gap-6">
            <div className=" relative w-fit h-fit">
              <input
                type="radio"
                value={3}
                {...register('cancelOption')}
                className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded-full"
              />
              <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
              </div>
            </div>
            <p className="text-p18  overflow-hidden overflow-ellipsis">
              Mức đãi ngộ của công ty chưa phù hợp
            </p>
          </label>
          <label className="mb-4 w-fit flex gap-6">
            <div className=" relative w-fit h-fit">
              <input
                type="radio"
                value={0}
                {...register('cancelOption')}
                className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button border-grey-4 rounded-full"
              />
              <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
              </div>
            </div>
            <p className="text-p18  overflow-hidden overflow-ellipsis">Khác</p>
          </label>
          {watch('cancelOption') === '0' && (
            <div className="mb-8">
              <Controller
                control={control}
                name="other"
                render={({ field }) => {
                  return (
                    <TextareaAutosize
                      {...field}
                      maxLength={250}
                      placeholder="Nhập lý do khác"
                      className={`custom-scrollbar-none-border placeholder:text-grey-3 min-h-[160px] max-h-[160px] resize-none outline-0 rounded-lg border border-grey-3  py-2 px-6  w-full peer`}
                    />
                  )
                }}
              />
            </div>
          )}
        </div>
        <div className=" w-full justify-center items-center gap-4">
          <Button
            title={'Gửi'}
            rounded="rounded-lg"
            background={'bg-button'}
            color={'text-neutral'}
            disabled={!watch('cancelOption')}
            padding="py-[13px] px-8"
            height="h-[44px]"
            margin=""
            width="w-full"
            textWeight={'text-p18-bold'}
            // onClick={() => setSelect(0)}
          />
        </div>
      </form>
    </div>
  )
}

export default CancelledInvitedModal
