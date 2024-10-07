import React, { useEffect, useReducer, useRef, useState } from 'react'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useDispatch } from 'react-redux'
import {
  getProfile,
  selectAvatarUpload,
  selectUserSocial,
  updateAvatarUpload,
  updateProfile,
  updateUserProfile
} from 'store/app/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingPage from 'common/presentation/Loading/LoadingPage'
import moment from 'moment'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import {
  getAllCities,
  getJobByJobCategory,
  selectJobCities,
  selectJobDetail
} from 'store/app/jobSlice'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import XProfileIcon from 'common/presentation/Icons'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Image from 'next/image'
import {
  convertToWebp,
  getPresignedUrl,
  getPresignedUrlByAxios,
  uploadImage
} from 'store/helper/serviceHelper'
import SocialLink from './SocialLink'
import {
  checkTagName,
  getUserPortfolio,
  selectUserPortfolio
} from 'store/app/portfolioSlice'
import useDebounce from 'common/hooks/useDebounce'
import { DialogAvatarCropImages } from '../../applicant-profile/TemplateContainer/AnotherBlock/dialogAvatarCropImages/dialogAvatarCropImages'
import useModal from 'common/hooks/useModal'
import {
  toLowerCaseNonAccentVietnamese,
  urlToFile
} from 'store/helper/functionHelper'
import { Divider } from 'common/presentation/Divider'
import Modal from 'common/presentation/Modal'
import PropressBar from 'common/presentation/ProgressBar'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const InformationEdit = (props) => {
  const { userProfile } = props
  const {
    birthday,
    email,
    name,
    phone,
    setting,
    cityId,
    cityName,
    avatarUrl,
    altAvt,
    tag,
    userId
  } = userProfile || {}
  const { currentJob, jobName, jobId, characterId } = setting || {}
  const socialField = useSelector(selectUserSocial)
  const userPorfolio = useSelector(selectUserPortfolio)
  const phoneRegExp = /^^(09|03|07|08|05)+([0-9]{8})$/
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.USER.UPDATEPROFILE)
  )
  const schema = yup.object().shape({
    name: yup.string().trim().required('Tên không được để trống'),
    // email: yup.string().email().required('Email không được để trống'),
    phone: yup
      .string()
      .nullable()
      .matches(phoneRegExp, 'Số điện thoại không đúng định dạng')
      .required('Số điện thoại không được để trống'),

    currentJob: yup.string().trim().required('Nghề nghiệp không được để trống'),
    // jobId: yup.string().required('Lĩnh vực không được để trống'),
    cityId: yup.number().required('Thành phố không được để trống'),
    tagName:
      parseInt(characterId) !== 2 &&
      yup.string().trim().required('Liên kết không được để trống')
  })

  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const refOpt = useRef(null)
  const refCityOpt = useRef(null)
  const refMajorJob = useRef(null)
  const [startDate, setStartDate] = useState(birthday || new Date())
  const [loadMore, setLoadMore] = useState(false)
  const selectedDate = moment(startDate).toDate()
  const [showOpt, setShowOpt] = useState(false)
  const [showMajorJob, setShowMajorJob] = useState(false)
  const [showCity, setShowCity] = useState(false)
  const [checkTagAvailable, setCheckTagAvailable] = useState(false)
  const [disableButton, setDisableButton] = useState(false)
  const [tempJobs, setTempJobs] = useState([])
  const [tempMajorJob, setTempMajorJob] = useState([])
  const [tempCities, setTempCities] = useState([])
  const { jobDetail } = useSelector(selectJobDetail)
  const cities = useSelector(selectJobCities)
  const loadCount = loadMore ? socialField?.length : 5
  const [openModal, toggleModal] = useModal()
  const avatarUpload = useSelector(selectAvatarUpload)
  const [uploading, setUploading] = useState(false)
  const [showOptionAvatar, toggleShowOptionAvatar] = useModal()

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    setError,
    control,
    clearErrors,
    resetField,
    formState: { errors, isValid, isDirty }
  } = useForm({
    defaultValues: {
      phone: phone,
      jobName: jobName,
      jobId: jobId,
      cityId: cityId,
      cityName: cityName,
      socials: socialField,
      tagName: tag
    },
    resolver: yupResolver(schema),
    mode: 'onChange'
  })
  const { append, remove, fields } = useFieldArray({
    control,
    name: 'socials'
  })
  const tagNameValue = watch('tagName')
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })

  const updateUser = async (payload) => {
    const updateUserProfile = await dispatch(updateProfile(payload))
    const { data } = unwrapResult(updateUserProfile)

    if (data?.errorMessage) {
      toast(
        AlertError({
          title: data?.errorMessage,
          description: 'Vui lòng thử lại trong giây lát.'
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
      dispatch(getUserPortfolio())
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

  const queryJobByName = (val) => {
    const tempArr = [...jobDetail]
    const filterJobs = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempJobs(filterJobs)
  }
  const queryMajorJobByName = (val) => {
    const tempArr = [...jobDetail]
    const filterJobs = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempMajorJob(filterJobs)
  }
  const queryCity = (val) => {
    const tempArr = [...cities]
    const filterCities = tempArr?.filter((city) =>
      city?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempCities(filterCities)
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  const handleCloseMajorJob = () => {
    setShowMajorJob(false)
  }
  const handleCloseCity = () => {
    setShowCity(false)
  }
  const showMore = () => {
    setLoadMore(true)
  }
  const handleChooseJob = (id, val) => {
    setValue('jobId', id)
    setValue('jobName', val)
    handleCloseOpt()
  }
  const handleChooseMajorJob = (id, val) => {
    setValue('majorJobId', id)
    setValue('currentJob', val)
    handleCloseMajorJob()
  }
  const handleChooseCity = (id, val) => {
    setValue('cityId', id)
    setValue('cityName', val)
    handleCloseCity()
  }
  useOnClickOutside(refOpt, handleCloseOpt)
  useOnClickOutside(refCityOpt, handleCloseCity)
  useOnClickOutside(refMajorJob, handleCloseMajorJob)

  const onSubmit = (data) => {
    const filterSocials = data?.socials?.filter(
      (social) => social.url !== '' && social.isShow
    )

    const payload = {
      avatarUrl: avatarUrl,
      name: data?.name,
      phone: data?.phone,
      // birthday: moment(startDate).toISOString(),
      setting: {
        currentJob: data.currentJob,
        applyPosition: data.applyPosition,
        socials: filterSocials
      },
      tag: userPorfolio?.metadata?.isTagChanged ? null : data?.tagName,
      cityId: data.cityId
    }

    updateUser(payload)
  }

  const onChangeImageUpload = async (file) => {
    toggleShowOptionAvatar()
    setUploading(true)

    const imageFile = file[0]
    await getPresignedUrlByAxios(imageFile, 'User/' + userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    if (imageFile.type.startsWith('image/')) {
      if (imageFile.type === 'image/gif') {
        if (imageFile.size <= 2097152) {
          const imgUrl = await getPresignedUrl(imageFile, 'User/' + userId)
          dispatch(updateUserProfile({ ...userProfile, avatarUrl: imgUrl }))
          setUploading(false)
          if (imgUrl) {
            setPersent({ onUpload: false, upload: 0 })
          }
        } else {
          setUploading(false)
          setPersent({ onUpload: false, upload: 0 })

          toast(
            AlertError({
              title: 'Tải lên ảnh không thành công',
              description: 'Hiện tại hệ thống chưa hỗ trợ ảnh dung lượng lớn'
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
        }
      } else {
        if (imageFile) {
          if (imageFile.size <= 5242880) {
            const reader = new FileReader()
            reader.readAsDataURL(imageFile)
            reader.addEventListener('load', () => {
              dispatch(updateAvatarUpload(reader.result))
              toggleModal()
            })
            setUploading(false)
          } else {
            setUploading(false)
            setPersent({ onUpload: false, upload: 0 })
            toast(
              AlertError({
                title: 'Tải lên ảnh không thành công',
                description: 'Hiện tại hệ thống chưa hỗ trợ ảnh dung lượng lớn'
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
          }
        }
      }
    } else {
      setUploading(false)
      setPersent({ onUpload: false, upload: 0 })
      toast(
        AlertError({
          title: 'Tải lên không thành công',
          description: 'Hiện tại hệ thống chưa hỗ trợ định dạng này'
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
    }
  }
  const handleCropImageComplete = async (src) => {
    setUploading(true)
    if (src) {
      const file = await urlToFile(src)
      const imgUrl = await convertToWebp(file, 'User/' + userId)
      dispatch(updateUserProfile({ ...userProfile, avatarUrl: imgUrl }))
      setUploading(false)
      setPersent({ onUpload: false, upload: 0 })
    }
  }
  const handleRemoveAvatar = () => {
    dispatch(updateUserProfile({ ...userProfile, avatarUrl: '' }))
    dispatch(updateAvatarUpload(''))
    toggleShowOptionAvatar()
  }
  useEffect(() => {
    const fetchInitData = async () => {
      const fetchAllJob = await dispatch(getJobByJobCategory())
      const res = unwrapResult(fetchAllJob)
      if (res?.data) {
        setTempJobs(res?.data || [])
        setTempMajorJob(res?.data || [])
      }
    }
    const fetchAllCities = async () => {
      const fetchCity = await dispatch(getAllCities())
      const res = unwrapResult(fetchCity)
      if (res?.data) {
        setTempCities(res?.data || [])
      }
    }
    fetchAllCities()
    fetchInitData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const debounceSubmit = useDebounce(tagNameValue, 1000)
  useEffect(() => {
    const checkTag = async () => {
      setCheckTagAvailable(true)

      const re = new RegExp('^[a-zA-Z0-9-]+$')
      if (
        !re.test(tagNameValue) ||
        tagNameValue.trim() === '' ||
        !isNaN(parseInt(tagNameValue)) ||
        tagNameValue[0] === '-' ||
        tagNameValue[tagNameValue?.length - 1] === '-' ||
        tagNameValue.includes('--')
      ) {
        setError('tagName', {
          type: 'custom',
          message: 'Tên liên kết không hợp lệ'
        })
        setCheckTagAvailable(false)
        setDisableButton(false)
      } else {
        clearErrors('tagName')
        const res = await dispatch(checkTagName({ tag: tagNameValue }))
        if (res?.payload?.isSuccess) {
          clearErrors('tagName')
        } else {
          setError('tagName', {
            type: 'custom',
            message: 'Tên liên kết đã tồn tại'
          })
        }
        setCheckTagAvailable(false)
        setDisableButton(false)
      }
    }
    if (parseInt(characterId) !== 2) {
      checkTag()
    }
  }, [debounceSubmit])

  return (
    <form className=" " onSubmit={handleSubmit(onSubmit)}>
      {(loading || checkTagAvailable) && <LoadingRole />}
      {/* Information */}
      <div className="mb-6">
        <p className="xl:block hidden text-p20-bold text-neutral mb-6">
          Hồ sơ công khai
        </p>
        <div>
          <div className="relative ">
            <div className="relative mb-6  rounded-full border border-grey-4 bg-white xl:w-[160px] w-[96px] h-[96px] xl:h-[160px] object-cover mx-auto   ">
              <Image
                // width={177}
                // height={177}
                layout="fill"
                src={
                  avatarUrl !== null && avatarUrl !== ''
                    ? avatarUrl
                    : parseInt(characterId) === 0
                    ? '/images/DefaultAvatarCuu.png'
                    : parseInt(characterId) === 1
                    ? '/images/DefaultAvatarChuot.png'
                    : parseInt(characterId) === 2
                    ? '/images/DefaultAvatarGau.png'
                    : '/images/DefaultAvatarCuu.png'
                }
                alt={altAvt}
                objectFit="cover"
                priority={true}
                className="rounded-full"
              />
              <input
                type="file"
                id="imgAvatar"
                name="img"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  onChangeImageUpload(e.target.files)
                  e.target.value = ''
                }}
              />

              <div
                onClick={() => toggleShowOptionAvatar()}
                className="absolute  flex items-center border border-nude justify-center bottom-0 right-0 cursor-pointer xl:w-14 xl:h-14 w-11 h-11 bg-white hover:bg-button rounded-full"
              >
                <XProfileIcon name="uploadLogo" />
              </div>
            </div>
            {persent?.onUpload && persent?.upload <= 100 && (
              <div className="flex justify-center">
                <div className="w-[160px]">
                  <PropressBar
                    background="bg-[#ECB14E]"
                    backgroundOut="bg-[#E6E6E6]"
                    type={1}
                    skillMatchingPercentage={persent.upload}
                    percentValue={100}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        <div>
          <div className="flex flex-col ">
            <label className="xl:text-p18 text-p16 text-neutral mb-2">
              Họ và Tên <span className="text-semantic-red">*</span>
            </label>
            <input
              {...register('name')}
              maxLength={50}
              defaultValue={name}
              type="text"
              className="border rounded-lg border-grey-3 py-2 px-6 xl:text-p18 text-p16 placeholder:text-grey-3"
            />

            <p className="text-semantic-red text-[14px] h-6 text-right mt-1">
              {errors?.name?.message}
            </p>
          </div>
        </div>
        <div className="grid xl:grid-cols-2 grid-cols-1 xl:gap-6">
          <div className="w-full">
            <div className="flex flex-col ">
              <label className="xl:text-p18 text-p16 text-neutral mb-2">
                Nghề nghiệp <span className="text-semantic-red">*</span>
              </label>
              <div className="relative" ref={refMajorJob}>
                <div
                  className={`w-full flex justify-between py-2 gap-2 px-6 items-center border rounded-lg ${
                    errors?.currentJob?.message
                      ? 'border-red-500'
                      : 'border-grey-3'
                  }`}
                  onClick={() => setShowMajorJob(true)}
                >
                  <input
                    placeholder="Chọn nghề nghiệp..."
                    className="outline-0 xl:text-p18 text-p16 text-neutral  w-full placeholder:text-grey-3"
                    {...register('currentJob')}
                    defaultValue={currentJob}
                    maxLength={50}
                    type="text"
                    onChange={(e) => queryMajorJobByName(e.target.value)}
                  />
                  <XProfileIcon name="arrowDown" />
                </div>
                {showMajorJob && (
                  <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                    {tempMajorJob?.map((job, ind) => {
                      return (
                        <div
                          key={ind}
                          className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                          onClick={() =>
                            handleChooseMajorJob(job?.jobId, job?.name)
                          }
                        >
                          <p>{job?.name}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <p className="text-semantic-red text-[14px] h-6 ">
                {errors?.currentJob?.message}
              </p>
            </div>

            <div className="flex flex-col ">
              <label className="xl:text-p18 text-p16 text-neutral mb-2">
                Thành phố <span className="text-semantic-red">*</span>
              </label>
              <div className="relative" ref={refCityOpt}>
                <div
                  className={`w-full flex justify-between py-2 gap-2 px-6 items-center border rounded-lg ${
                    errors.cityId?.message ? 'border-red-500' : 'border-grey-3'
                  }`}
                  onClick={() => setShowCity(true)}
                >
                  <input
                    placeholder="Chọn thành phố..."
                    className="outline-0 xl:text-p18 text-p16 text-neutral  w-full placeholder:text-grey-3"
                    ref={inputRef}
                    {...register('cityName')}
                    onChange={(e) => queryCity(e.target.value)}
                  />
                  <XProfileIcon name="arrowDown" />
                </div>
                {showCity && (
                  <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                    {tempCities?.map((city, ind) => {
                      return (
                        <div
                          key={ind}
                          className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                          onClick={() =>
                            handleChooseCity(city?.cityId, city?.name)
                          }
                        >
                          <p>{city?.name}</p>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
              <p className="text-semantic-red text-[14px] h-6 ">
                {errors?.field?.message}
              </p>
            </div>
          </div>
          <div className="w-full">
            <div className="flex flex-col ">
              <label className="xl:text-p18 text-p16 text-neutral mb-2">
                Email <span className="text-semantic-red">*</span>
              </label>
              <input
                // {...register('email')}
                defaultValue={email}
                disabled
                type="text"
                className="border border-grey-3 disabled:bg-grey-4 rounded-lg py-2 px-6 text-grey-2 xl:text-p18 text-p16 placeholder:text-grey-3"
              />
              <p className="text-semantic-red text-[14px] h-6 ">
                {errors?.email?.message}
              </p>
            </div>
            <div className="flex flex-col ">
              <label className="xl:text-p18 text-p16 text-neutral mb-2">
                Số điện thoại <span className="text-semantic-red">*</span>
              </label>
              <input
                {...register('phone')}
                // defaultValue={phone}
                type="text"
                className="border border-grey-3 py-2 px-6 xl:text-p18 text-p16 rounded-lg placeholder:text-grey-3"
              />
              <p className="text-semantic-red text-[14px] h-6 ">
                {errors?.phone?.message}
              </p>
            </div>
          </div>
        </div>
      </div>
      {parseInt(characterId) !== 2 && (
        <div className="mb-6">
          <div className="flex flex-col ">
            <label className="xl:text-p18 text-p16  ">Liên kết</label>
            <p className="mb-4 xl:text-p16 text-p14 text-grey-1 italic">
              Cá nhân hóa liên kết cho hồ sơ của bạn, bạn chỉ có thể chỉnh sửa 1
              lần duy nhất
            </p>
            <input
              {...register('tagName', {
                onChange: (e) => {
                  setDisableButton(true)
                }
              })}
              disabled={userPorfolio?.metadata?.isTagChanged}
              type="text"
              onInput={(e) =>
                (e.target.value = toLowerCaseNonAccentVietnamese(
                  e.target.value
                ))
              }
              maxLength={30}
              className={`border rounded-lg disabled:bg-grey-4 disabled:text-grey-2 ${
                !errors?.tagName?.message
                  ? 'border-grey-3'
                  : 'border-semantic-red'
              } py-2 px-6 xl:text-p18 text-p16 placeholder:text-grey-3`}
            />
            <div className="flex xl:flex-row flex-col xl:items-center justify-between mt-2">
              <p className="text-p14 text-grey-3">
                https://xprofile.vn/profile/
                <span className="text-grey-2 text-p14-bold">
                  {watch('tagName')}
                </span>
              </p>
              {tagNameValue !== '' ? (
                !errors?.tagName?.message ? (
                  <div className="flex items-center gap-2 mt-1">
                    <XProfileIcon
                      name="quizCheck"
                      fill="#378711"
                      width="14"
                      height="14"
                    />
                    <p className="text-p14">Liên kết khả dụng</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 mt-1">
                    <XProfileIcon name="cross" width="12" height="12" />
                    <p className="text-p14">{errors?.tagName?.message}</p>
                  </div>
                )
              ) : (
                <div className="flex items-center gap-2">
                  <XProfileIcon name="cross" width="12" height="12" />
                  <p className="text-p14">Không được bỏ trống</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="">
        <p className="xl:text-p18 text-p16  mb-6">Liên kết cá nhân</p>
        <div className="grid grid-cols-1 gap-6">
          <div className="w-full">
            <SocialLink
              register={register}
              title={fields[0].typeDisplay}
              name={`socials.${0}.url`}
              icon={fields[0].icon}
              reset={resetField}
              setValue={setValue}
              watch={watch}
            />
          </div>
        </div>
      </div>
      {/* Social Network */}
      <div className="mb-6">
        <p className="xl:text-p18 text-p16  mb-6">Tài khoản xã hội</p>
        <div className="">
          <div className="w-full">
            {fields?.slice(1, loadCount)?.map((social, index) => {
              const { typeDisplay, type, icon, isShow } = social
              if (isShow) {
                return (
                  <SocialLink
                    key={index}
                    register={register}
                    title={typeDisplay}
                    name={`socials.${index + 1}.url`}
                    icon={icon}
                    reset={resetField}
                    setValue={setValue}
                    watch={watch}
                  />
                )
              }
            })}
          </div>
          {!loadMore && (
            <div className="w-full">
              <div
                onClick={() => showMore()}
                className="flex  items-center justify-center gap-2 cursor-pointer"
              >
                <p className="xl:text-p18 text-p16 text-button-2">Xem thêm</p>
                <XProfileIcon name="arrowDown" stroke="#294F9B" />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center xl:justify-end ">
        <button
          disabled={
            (parseInt(characterId) !== 2 && errors?.tagName?.message) ||
            checkTagAvailable ||
            uploading ||
            disableButton
          }
          type="submit"
          className="block xl:w-[240px] w-full   py-3 bg-button disabled:bg-grey-2 rounded-lg hover:opacity-70"
        >
          <p className="text-p18-bold">Lưu thông tin</p>
        </button>
      </div>
      <Modal
        hiddenCancel
        open={showOptionAvatar}
        toggleModal={toggleShowOptionAvatar}
        childStyle="w-screen h-fit sm:w-[400px] mt-4 p-8 bg-white rounded-[16px]"
      >
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-p20-bold">Thay đổi ảnh đại diện</p>
          <div className="mt-6 flex flex-col items-center justify-center w-full">
            <label
              htmlFor="imgAvatar"
              className="w-full cursor-careerPath hover:bg-light-nude transition-all"
            >
              <p className="py-4 text-p18 text-center text-button-2">
                Tải ảnh lên
              </p>
              <Divider />
            </label>
            <div
              onClick={() => handleRemoveAvatar()}
              className="w-full cursor-careerPath hover:bg-light-nude transition-all"
            >
              <p className="py-4 text-p18 text-center text-semantic-red">
                Xoá ảnh hiện tại
              </p>
              <Divider />
            </div>
            <div
              onClick={() => toggleShowOptionAvatar()}
              className="w-full cursor-careerPath hover:bg-light-nude transition-all"
            >
              <p className="py-4 text-p18 text-center ">Huỷ</p>
            </div>
          </div>
        </div>
      </Modal>
      <div>
        <DialogAvatarCropImages
          aspect={1 / 1}
          src={avatarUpload}
          isVisible={openModal}
          handleOnClose={toggleModal}
          handleCropImage={handleCropImageComplete}
        />
      </div>
    </form>
  )
}

export default InformationEdit
