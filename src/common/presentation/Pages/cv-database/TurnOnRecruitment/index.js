import XProfileIcon from 'common/presentation/Icons'
import * as yup from 'yup'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import ReactDatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useRef, useState } from 'react'
import { Divider } from 'common/presentation/Divider'
import { useSelector } from 'react-redux'
import {
  createRecruitmentCampaign,
  getBannerEditPosition,
  selectCampaignPrice
} from 'store/app/edit-mode-company/position/bannerSlice'
import moment from 'moment'
import Button from 'common/presentation/Button'
import {
  calculateTotalPriceByDay,
  calculateTotalPriceByPushDay,
  calculateTotalPriceByPushTime
} from 'store/helper/functionHelper'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { getAllDepartmentPositionsEdit } from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import ReactSlider from 'react-slider'

const TYPES = [
  { type: 1, name: 'Full Time' },
  { type: 2, name: 'Part-time' },
  { type: 3, name: 'Freelancer' }
]

const getDaysBetweenTwoDate = (start, end) => {
  const tempStart = moment(new Date(start)).startOf('day')
  const tempEnd = moment(new Date(end)).startOf('day')
  if (isNaN(tempEnd)) {
    return 0
  }
  const duration = tempEnd.diff(tempStart, 'days')
  if (duration === 0) {
    return 1
  } else {
    return duration + 1
  }
}

const getMinutesBetweenTwoTime = (start, end) => {
  const tempStart = moment(start)
  const tempEnd = moment(end)
  if (isNaN(tempEnd)) {
    return 0
  }
  return tempEnd.diff(tempStart, 'minute')
}
function calculateTotalPriceByMatchingScore(price1Day, matchingScore) {
  if (matchingScore <= 50) {
    return 0
  }

  let result = price1Day * 10
  let varNum = 1.0
  if (matchingScore >= 61 && matchingScore <= 70) {
    varNum = 1.5
  } else if (matchingScore >= 71 && matchingScore <= 80) {
    varNum = Math.pow(1.5, 2)
  } else if (matchingScore >= 81 && matchingScore <= 90) {
    varNum = Math.pow(1.5, 3)
  } else if (matchingScore >= 91 && matchingScore <= 100) {
    varNum = Math.pow(1.5, 3) * Math.pow(1.2, matchingScore - 90)
  }
  return result * varNum
}
const getTotalPrice = (
  start,
  end,
  costPerDay = 0,
  costPer7Day = 0,
  days = 0,
  newsPerDay,
  matchingPercent = 0
) => {
  if (costPerDay === 0 && costPer7Day === 0) {
    return 0
  } else {
    const tempPriceByDay = calculateTotalPriceByDay(
      costPerDay,
      costPer7Day,
      getDaysBetweenTwoDate(start, end)
    )
    const tempPriceByPushDay = calculateTotalPriceByPushDay(
      costPerDay,
      costPer7Day,
      days || 0
    )
    const tempPriceByPushTime = calculateTotalPriceByPushTime(
      costPerDay,
      newsPerDay || 0,
      getMinutesBetweenTwoTime(start, end)
    )

    const tempPriceByMatchingPercent = calculateTotalPriceByMatchingScore(
      costPerDay,
      matchingPercent
    )

    return (
      tempPriceByDay +
      tempPriceByPushDay +
      tempPriceByPushTime +
      tempPriceByMatchingPercent
    )
  }
}

const getPriceAfterDiscount = (price, discount = 0) => {
  return price - (price * discount) / 100
}
function addMinutes(date, minutes) {
  date.setMinutes(date.getMinutes() + minutes)

  return date
}
const TurnOnRecruitment = ({
  toggleModal = () => {},
  jobCategory = [],
  addressBooks = [],
  companyId,
  departmentPositionId,
  departmentId
}) => {
  const refOpt = useRef(null)
  const refTypeOpt = useRef(null)
  const refAddress = useRef(null)
  const dispatch = useDispatch()
  const { query } = useRouter()

  const campaignPrice = useSelector(selectCampaignPrice)
  const { costPer7Day, costPerDay } = campaignPrice || {}
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startTime, setStartTime] = useState(addMinutes(new Date(), 15))
  const [endTime, setEndTime] = useState(new Date().setHours(23, 45, 0, 0))
  const [showOpt, setShowOpt] = useState(false)
  const [showTypeOpt, setShowTypeOpt] = useState(false)
  const [showAddressBooks, setShowAddressBooks] = useState(false)
  const [tempJobs, setTempJobs] = useState(jobCategory)
  const [tempAddressBooks, setTempAddressBooks] = useState(addressBooks)
  const [tempTypes, setTempTypes] = useState(TYPES)

  const filterPassedStartTime = (time) => {
    const currentDate = new Date(endTime)
    const selectedDate = new Date(time)

    return currentDate.getTime() > selectedDate.getTime()
  }

  const filterPassedEndTime = (time) => {
    const currentDate = new Date(startTime)
    const selectedDate = new Date(time)

    return currentDate.getTime() < selectedDate.getTime()
  }

  const handleChangeStartDate = (dates) => {
    setStartDate(dates)
  }

  const handleChangeEndDate = (dates) => {
    setEndDate(dates)
  }

  const handleClickOutSidePicker = () => {
    const tempStart = new Date(startDate)
    if (!endDate) {
      setEndDate(tempStart)
    }
  }

  const schema = yup.object().shape({
    name: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    quantity: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    typeName: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    addressBook: yup.string().required('Vui lòng điền nội dung bạn nhé!'),
    jobName: yup.string().required('Vui lòng điền nội dung bạn nhé!')
  })

  const {
    register,
    control,
    watch,
    setValue,
    handleSubmit,
    reset,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      matchingPercent: 0
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })

  const { matchingPercent, pushTime, amountPushDate, name } = watch() || {}

  const queryJobByName = (val) => {
    const tempArr = [...jobCategory]
    const filterJobs = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempJobs(filterJobs)
  }
  const queryTypeByName = (val) => {
    const tempArr = [...TYPES]
    const filterTypes = tempArr?.filter((type) =>
      type?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempTypes(filterTypes)
  }
  const queryAddressByName = (val) => {
    const tempArr = [...addressBooks]
    const filterAddress = tempArr?.filter((address) =>
      address?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempAddressBooks(filterAddress)
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  const handleCloseAddressBooks = () => {
    setShowAddressBooks(false)
  }
  const handleCloseTypeOpt = () => {
    setShowTypeOpt(false)
  }

  const handleChooseJob = (id, val) => {
    setValue('joblevelId', id)
    setValue('jobName', val)
    handleCloseOpt()
  }
  const handleChooseAddress = (id, val) => {
    setValue('addressBookId', id)
    setValue('addressBook', val)
    handleCloseAddressBooks()
  }
  const handleChooseType = (id, val) => {
    setValue('type', id)
    setValue('typeName', val)
    handleCloseTypeOpt()
  }

  useOnClickOutside(refOpt, handleCloseOpt)
  useOnClickOutside(refTypeOpt, handleCloseTypeOpt)
  useOnClickOutside(refAddress, handleCloseAddressBooks)

  const submit = async (data) => {
    const payload = {
      companyId: parseInt(companyId),
      departmentPositionId: parseInt(departmentPositionId),
      ...data,
      joblevelId: parseInt(data?.joblevelId || 0),
      addressBookId: parseInt(data?.addressBookId || 0),
      minSalary: null,
      maxSalary: null,
      startTime: moment(startDate).format('YYYY-MM-DD'),
      endTime: moment(endDate).format('YYYY-MM-DD'),
      pushStartAt: moment(startTime).format('HH:mm'),
      pushEndAt: moment(endTime).format('HH:mm')
    }
    const res = await dispatch(createRecruitmentCampaign(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertError({
          title: res?.payload?.errorMessage || 'Thêm không thành công'
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
        AlertSuccess({
          title: res?.payload?.successMessage || 'Bạn đã tạo thành công'
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

      if (departmentPositionId) {
        dispatch(getAllDepartmentPositionsEdit({ departmentId }))
      }
      toggleModal()
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-h3 text-black">Thiết lập chiến dịch tuyển dụng</p>
        <div onClick={() => toggleModal()} className="cursor-pointer ">
          <XProfileIcon name="cancel" width="16" height="16" />
        </div>
      </div>
      <div className="max-h-[80vh] w-full mt-[40px]">
        {/* <div className="flex justify-between mb-10">
        <p className="text-h3">Thiết lập chiến dịch tuyển dụng</p>
        
      </div> */}
        <div className="lg:max-h-[70vh] ">
          <form onSubmit={handleSubmit(submit)}>
            <div className="lg:grid lg:grid-cols-2 gap-4 ">
              {/* <div className="max-h-[60vh] overflow-y-scroll custom-scrollbar pr-2">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-p18 text-neutral ">
                      Tên chiến dịch <span className="text-red-500">*</span>
                    </p>
                    <p className="text-p18 text-neutral ">
                      {200 - parseInt(name?.length || 0)}
                    </p>
                  </div>
                  <input
                    placeholder="Nhập tên chiến dịch tuyển dụng..."
                    className="py-2 px-6 w-full outline-0 text-p18 border rounded-lg border-grey-3 "
                    {...register('name')}
                    maxLength={200}
                  />
                  <p className="text-p16 text-grey-1 mt-1">{`VD: [Vị trí]_[Level]_[Thời gian]`}</p>
                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.name?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Hình thức công việc <span className="text-red-500">*</span>
                  </p>
                  <div className="py-2 px-5  border border-grey-3 rounded-lg styled-select">
                    <select
                      defaultValue={1}
                      {...register('type')}
                      className="outline-0 py-0.5 w-full"
                    >
                      {TYPES?.map((type, ind) => (
                        <option key={ind} value={type?.type}>
                          {type?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.type?.message}
                  </p>
                </div>
                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Địa điểm tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="relative" ref={refAddress}>
                    <div
                      className={`w-full flex justify-between py-2 gap-2 px-6 items-center rounded-lg border border-grey-3`}
                      onClick={() => setShowAddressBooks(true)}
                    >
                      <input
                        autoComplete="off"
                        placeholder="Chọn địa điểm tuyển dụng"
                        className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
                        {...register('addressBook')}
                        onChange={(e) => queryAddressByName(e.target.value)}
                      />
                      <XProfileIcon
                        name="arrowDown"
                        stroke="black"
                        size="1.3"
                      />
                    </div>
                    {showAddressBooks && (
                      <div className="bg-white max-h-[180px] rounded-lg w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                        {tempAddressBooks?.map((item, ind) => {
                          return (
                            <div
                              key={ind}
                              className="flex justify-between items-center px-[24px]  hover:bg-yellow-bg py-[10px]"
                              onClick={() =>
                                handleChooseAddress(
                                  item?.addressBookId,
                                  item?.name
                                )
                              }
                            >
                              <p>{item?.name}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors?.addressBookId?.message}
                  </p>
                </div>
                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Số lượng cần tuyển <span className="text-red-500">*</span>
                  </p>
                  <input
                    placeholder="Nhập số lượng cần tuyển..."
                    className="py-2 px-6 w-full outline-0 border text-p18 border-grey-3 rounded-lg "
                    type="number"
                    min={0}
                    {...register('quantity')}
                  />
                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.quantity?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Vị trí tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="relative" ref={refOpt}>
                    <div
                      className={`w-full flex justify-between py-2 gap-2 px-6 items-center border border-grey-3 rounded-lg`}
                      onClick={() => setShowOpt(true)}
                    >
                      <input
                        autoComplete="off"
                        placeholder="Chọn vị trí..."
                        className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
                        {...register('jobName')}
                        onChange={(e) => queryJobByName(e.target.value)}
                      />
                      <XProfileIcon
                        name="arrowDown"
                        stroke="black"
                        size="1.3"
                      />
                    </div>
                    {showOpt && (
                      <div className="bg-white max-h-[180px] rounded-lg w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                        {tempJobs?.map((job, ind) => {
                          return (
                            <div
                              key={ind}
                              className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                              onClick={() =>
                                handleChooseJob(job?.jobLevelId, job?.name)
                              }
                            >
                              <p>{job?.name}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.jobLevelId?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Thời gian tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="flex gap-4 ">
                    <ReactDatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      onChange={handleChangeStartDate}
                      // startDate={startDate}
                      // endDate={endDate}
                      // selectsRange
                      minDate={new Date()}
                      onClickOutside={handleClickOutSidePicker}
                      className="bg-white w-[200px] appearance-none  py-2 px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                    <ReactDatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      onChange={handleChangeEndDate}
                      // startDate={startDate}
                      // endDate={endDate}
                      // selectsRange
                      minDate={new Date(startDate)}
                      onClickOutside={handleClickOutSidePicker}
                      className="bg-white w-[200px] appearance-none py-2 px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </div>
                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors?.time?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">Số ngày đẩy tin</p>
                  <p className="text-button text-p18">{amountPushDate} ngày</p>

                  <input
                    defaultValue={0}
                    placeholder="Nhập số ngày đẩy tin"
                    type="range"
                    className="w-full outline-0 accent-button "
                    {...register('amountPushDate')}
                    min={0}
                    max={30}
                  />
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Số lần đẩy tin/ngày
                  </p>
                  <p className="text-button text-p18">{pushTime} lần</p>
                  <input
                    defaultValue={0}
                    placeholder="Nhập số ngày đẩy tin"
                    type="range"
                    className="w-full outline-0  accent-button"
                    {...register('pushTime')}
                    min={0}
                    max={30}
                  />
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Khung giờ đẩy tin <span className="text-red-500">*</span>
                  </p>
                  <div className="flex gap-4">
                    <ReactDatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="bg-white w-[200px] appearance-none py-2 px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                      filterTime={filterPassedStartTime}
                    />
                    <ReactDatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="bg-white w-[200px] appearance-none py-2 px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                      filterTime={filterPassedEndTime}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Độ phù hợp của ứng viên{' '}
                    <span className="text-red-500">*</span>
                  </p>
                  <p className="text-button text-p18">{matchingPercent}%</p>
                  <input
                    defaultValue={0}
                    type="range"
                    className="w-full outline-0 accent-button"
                    {...register('matchingPercent')}
                    min={0}
                    max={100}
                  />

                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.matchingPercent?.message}
                  </p>
                </div>
              </div> */}
              <div className="max-h-[60vh] overflow-y-scroll custom-scrollbar pr-2">
                <div>
                  <div className=" flex items-center justify-between mb-2">
                    <p className="text-p18 text-neutral ">
                      Tên chiến dịch <span className="text-red-500">*</span>
                    </p>
                    <p className="text-p18 text-neutral ">
                      {200 - parseInt(name?.length || 0)}
                    </p>
                  </div>
                  <input
                    placeholder="Nhập tên chiến dịch tuyển dụng..."
                    className="py-2 px-6 w-full outline-0 text-p18 border rounded-lg border-grey-3 "
                    {...register('name')}
                    maxLength={200}
                  />
                  <p className="text-p16 text-grey-1 mt-2">{`VD: [Vị trí]_[Level]_[Thời gian]`}</p>
                  <p className="text-p14 text-red-500 h-6">
                    {errors.name?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Hình thức công việc <span className="text-red-500">*</span>
                  </p>
                  <div className="relative" ref={refTypeOpt}>
                    <div
                      className={`w-full flex justify-between py-2 gap-2 px-6 items-center border border-grey-3 rounded-lg`}
                      onClick={() => setShowTypeOpt(true)}
                    >
                      <input
                        autoComplete="off"
                        placeholder="Chọn phân loại"
                        className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
                        {...register('typeName')}
                        onChange={(e) => queryTypeByName(e.target.value)}
                      />
                      <XProfileIcon
                        name="arrowDown"
                        stroke="black"
                        size="1.3"
                      />
                    </div>
                    {showTypeOpt && (
                      <div className="bg-white max-h-[180px] rounded-lg w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                        {tempTypes?.map((type, id) => {
                          return (
                            <div
                              key={id}
                              className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                              onClick={() =>
                                handleChooseType(type?.type, type?.name)
                              }
                            >
                              <p>{type?.name}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                  <p className="text-p14 text-red-500 h-6">
                    {errors.typeName?.message}
                  </p>
                </div>
                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Địa điểm tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="relative" ref={refAddress}>
                    <div
                      className={`w-full flex justify-between py-2 gap-2 px-6 items-center rounded-lg border border-grey-3`}
                      onClick={() => setShowAddressBooks(true)}
                    >
                      <input
                        autoComplete="off"
                        placeholder="Chọn địa điểm tuyển dụng"
                        className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
                        {...register('addressBook')}
                        onChange={(e) => queryAddressByName(e.target.value)}
                      />
                      <XProfileIcon
                        name="arrowDown"
                        stroke="black"
                        size="1.3"
                      />
                    </div>
                    {showAddressBooks && (
                      <div className="bg-white max-h-[180px] rounded-lg w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                        {tempAddressBooks?.map((item, ind) => {
                          return (
                            <div
                              key={ind}
                              className="flex justify-between items-center px-[24px]  hover:bg-yellow-bg py-[10px]"
                              onClick={() =>
                                handleChooseAddress(
                                  item?.addressBookId,
                                  item?.name
                                )
                              }
                            >
                              <p>{item?.name}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <p className="text-p14 text-red-500 h-6">
                    {errors?.addressBook?.message}
                  </p>
                </div>
                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Số lượng cần tuyển <span className="text-red-500">*</span>
                  </p>
                  <input
                    placeholder="Nhập số vị trí"
                    className="py-2 px-6 w-full outline-0 border text-p18 border-grey-3 rounded-lg "
                    type="number"
                    min={0}
                    {...register('quantity')}
                  />
                  <p className="text-p14 text-red-500 mb-2 h-[22px]">
                    {errors.quantity?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Vị trí tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="relative" ref={refOpt}>
                    <div
                      className={`w-full flex justify-between py-2 gap-2 px-6 items-center border border-grey-3 rounded-lg`}
                      onClick={() => setShowOpt(true)}
                    >
                      <input
                        autoComplete="off"
                        placeholder="Chọn vị trí tuyển dụng"
                        className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
                        {...register('jobName')}
                        onChange={(e) => queryJobByName(e.target.value)}
                      />
                      <XProfileIcon
                        name="arrowDown"
                        stroke="black"
                        size="1.3"
                      />
                    </div>
                    {showOpt && (
                      <div className="bg-white max-h-[180px] rounded-lg w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                        {tempJobs?.map((job, ind) => {
                          return (
                            <div
                              key={ind}
                              className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                              onClick={() =>
                                handleChooseJob(job?.jobLevelId, job?.name)
                              }
                            >
                              <p>{job?.name}</p>
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  <p className="text-p14 text-red-500 h-6">
                    {errors.jobName?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Thời gian tuyển dụng <span className="text-red-500">*</span>
                  </p>
                  <div className="flex gap-4">
                    <ReactDatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={startDate}
                      onChange={handleChangeStartDate}
                      // startDate={startDate}
                      // endDate={endDate}
                      // selectsRange
                      minDate={new Date()}
                      onClickOutside={handleClickOutSidePicker}
                      className="bg-white w-full appearance-none py-[9px] px-6 rounded-lg outline-0  border border-grey-3"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                    <ReactDatePicker
                      dateFormat="dd/MM/yyyy"
                      selected={endDate}
                      onChange={handleChangeEndDate}
                      // startDate={startDate}
                      // endDate={endDate}
                      // selectsRange
                      minDate={new Date(startDate)}
                      onClickOutside={handleClickOutSidePicker}
                      className="bg-white w-full appearance-none py-[9px] px-6 rounded-lg outline-0  border border-grey-3 "
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                    />
                  </div>
                  <p className="text-p14 text-red-500 h-6">
                    {errors?.time?.message}
                  </p>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">Số ngày đẩy tin</p>
                  <p className="text-button text-p18 mb-1">
                    {amountPushDate || 0} ngày
                  </p>
                  <Controller
                    control={control}
                    key={'rangeSlider'}
                    name="amountPushDate"
                    render={({ field }) => {
                      return (
                        <ReactSlider
                          min={0}
                          max={30}
                          // value={rangeThumbValue}
                          className="horizontal-slider !border-none"
                          thumbClassName="example-thumb"
                          trackClassName="example-track-custom"
                          renderThumb={(props, state) => (
                            <div className="group flex relative">
                              <div {...props}></div>
                            </div>
                          )}
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                          // minDistance={0}
                        />
                      )
                    }}
                  />
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Số lần đẩy tin/ngày
                  </p>
                  <p className="text-button text-p18 mb-1">
                    {pushTime || 0} lần
                  </p>
                  <Controller
                    control={control}
                    key={'rangeSlider'}
                    name="pushTime"
                    render={({ field }) => {
                      return (
                        <ReactSlider
                          min={0}
                          max={30}
                          // value={rangeThumbValue}
                          className="horizontal-slider !border-none"
                          thumbClassName="example-thumb"
                          trackClassName="example-track-custom"
                          renderThumb={(props, state) => (
                            <div className="group flex relative">
                              <div {...props}></div>
                            </div>
                          )}
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                          // minDistance={0}
                        />
                      )
                    }}
                  />
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Khung giờ đẩy tin <span className="text-red-500">*</span>
                  </p>
                  <div className="flex gap-4 w-full">
                    <ReactDatePicker
                      selected={startTime}
                      onChange={(date) => setStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="bg-white w-full appearance-none py-[9px] px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                      filterTime={filterPassedStartTime}
                    />
                    <ReactDatePicker
                      selected={endTime}
                      onChange={(date) => setEndTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Time"
                      dateFormat="HH:mm"
                      className="bg-white w-full appearance-none py-[9px] px-6 rounded-lg outline-0  border border-grey-3 mb-6"
                      onKeyDown={(e) => {
                        e.preventDefault()
                      }}
                      filterTime={filterPassedEndTime}
                    />
                  </div>
                </div>

                <div>
                  <p className="text-p18 text-neutral mb-2">
                    Độ phù hợp của ứng viên{' '}
                    <span className="text-red-500">*</span>
                  </p>
                  <p className="text-button text-p18">
                    {matchingPercent || 0}%
                  </p>

                  <Controller
                    control={control}
                    key={'rangeSlider'}
                    name="matchingPercent"
                    render={({ field }) => {
                      return (
                        <ReactSlider
                          min={0}
                          max={100}
                          // value={rangeThumbValue}
                          className="horizontal-slider !border-none"
                          thumbClassName="example-thumb"
                          trackClassName="example-track-custom"
                          renderThumb={(props, state) => (
                            <div className="group flex relative">
                              <div {...props}></div>
                            </div>
                          )}
                          onChange={(value) => {
                            field.onChange(value)
                          }}
                          // minDistance={0}
                        />
                      )
                    }}
                  />

                  <p className="text-p14 text-red-500 h-6">
                    {errors.matchingPercent?.message}
                  </p>
                </div>
              </div>
              <div className="max-h-[60vh] overflow-y-scroll custom-scrollbar pr-2">
                <div className="border border-grey-4 rounded-[16px] p-8 lg:mt-0 mt-6 ">
                  <p className="text-h4 mb-4 text-neutral">
                    Chi phí (tạm tính)
                  </p>
                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-p18 text-neutral">
                        Thời gian tuyển dụng
                      </p>
                      <p className="text-p18 text-grey-2">
                        {getDaysBetweenTwoDate(startDate, endDate) > 0
                          ? `${getDaysBetweenTwoDate(startDate, endDate)} ngày`
                          : '-'}
                      </p>
                    </div>
                    <p className="text-p18 text-neutral">
                      {calculateTotalPriceByDay(
                        costPerDay,
                        costPer7Day,
                        getDaysBetweenTwoDate(startDate, endDate)
                      )?.toLocaleString() + ' VND'}
                    </p>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-p18 text-neutral">Số ngày đẩy tin</p>
                      <p className="text-p18 text-grey-2 h-7">
                        {amountPushDate > 0 ? `${amountPushDate} ngày` : ''}
                      </p>
                    </div>
                    <p className="text-p18 text-neutral">
                      {calculateTotalPriceByPushDay(
                        costPerDay,
                        costPer7Day,
                        amountPushDate || 0
                      ) > 0
                        ? `${
                            calculateTotalPriceByPushDay(
                              costPerDay,
                              costPer7Day,
                              amountPushDate || 0
                            )?.toLocaleString() + ' VND'
                          }`
                        : '-'}
                    </p>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-p18 text-neutral">
                        Số lần đẩy tin/ngày
                      </p>
                      <p className="text-p18 text-grey-2 h-7">
                        {pushTime > 0 ? `${pushTime} lần` : ''}{' '}
                      </p>
                    </div>
                    <p className="text-p18 text-neutral">
                      {calculateTotalPriceByPushTime(
                        costPerDay,
                        pushTime || 0,
                        getMinutesBetweenTwoTime(startTime, endTime)
                      ) > 0
                        ? `${
                            calculateTotalPriceByPushTime(
                              costPerDay,
                              pushTime || 0,
                              getMinutesBetweenTwoTime(startTime, endTime)
                            )?.toLocaleString() + ' VND'
                          }`
                        : '-'}
                    </p>
                  </div>

                  <div className="flex py-6 px-8 gap-4 items-center bg-[#FFFCF5] voucher mb-6 rounded-lg">
                    <XProfileIcon name="coupon" />
                    <input
                      placeholder="Nhập mã giảm giá (nếu có)"
                      className="bg-transparent w-full outline-0 border-0 text-button"
                      {...register('coupon')}
                    />
                  </div>

                  <Divider />

                  <div className="flex justify-between my-6">
                    <div>
                      <p className="text-p18 text-neutral">Tổng chi phí</p>
                    </div>
                    <p className="text-p18-bold text-neutral ">
                      {getTotalPrice(
                        startDate,
                        endDate,
                        costPerDay,
                        costPer7Day,
                        amountPushDate || 0,
                        pushTime,
                        matchingPercent
                      )?.toLocaleString() + ' VND'}
                    </p>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-p18 text-neutral">Giảm giá</p>
                    </div>
                    <p className="text-p18-bold text-semantic-red ">{`100%`}</p>
                  </div>

                  <div className="flex justify-between mb-6">
                    <div>
                      <p className="text-p18 text-button-2">Cần thanh toán</p>
                    </div>
                    {/* <p className="text-p18 text-button-2 text-h5">
                    {getPriceAfterDiscount(
                      getTotalPrice(
                        startDate,
                        endDate,
                        costPerDay,
                        costPer7Day,
                        amountPushDate || 0,
                        pushTime
                      ),
                      0
                    )?.toLocaleString() + ' VND'}
                  </p> */}
                    <p className="text-p18-bold text-button-2 ">{0 + ' VND'}</p>
                  </div>

                  <Button
                    title="Thanh toán"
                    margin="m-0"
                    padding="py-4"
                    height="h-[56px]"
                    width="w-full"
                    rounded="rounded-[8px]"
                  />
                </div>
              </div>
            </div>
          </form>
          <div className="mt-8">
            <p className="text-p18 text-grey-2 ">
              Gói dịch vụ nâng cao (Xem CV {`>`} 80% phù hợp, Đăng tin tuyển
              dụng với KOLs trong ngành){' '}
              <a href="#" className="text-semantic-text-link hover:opacity-80">
                Tìm hiểu thêm
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TurnOnRecruitment
