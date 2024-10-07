import React, { useEffect, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import {
  getProfile,
  selectUserProfile,
  selectUserSocial,
  updateProfile
} from 'store/app/userSlice'
import { useDispatch } from 'react-redux'
import { useFieldArray, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { REGEX_PHONE } from 'common/config/app.constants'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from 'common/presentation/Button'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { urlToFile } from 'store/helper/functionHelper'
import Modal from 'common/presentation/Modal'
import useModal from 'common/hooks/useModal'
import {
  convertToWebpAxios,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { DialogAvatarCropImages } from '../TemplateContainer/AnotherBlock/dialogAvatarCropImages/dialogAvatarCropImages'
import { getAllCities, selectJobCities } from 'store/app/jobSlice'
import SocialLink from '../../account-setting/InformationEdit/SocialLink'
import { Divider } from 'common/presentation/Divider'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import PropressBar from 'common/presentation/ProgressBar'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const TYPES = {
  1: 'Full-time',
  2: 'Part-time',
  3: 'Freelancer'
}
const ICONS = {
  facebook: 'socialFacebook',
  twitter: 'socialTwitter',
  linkedIn: 'socialLinkedIn',
  instagram: 'socialInstagram',
  behance: 'socialBehanceIcon',
  zalo: 'socialZalo',
  youtube: 'socialYoutube',
  telegram: 'socialTelegram',
  blog: 'socialFacebook',
  tiktok: 'socialTiktok',
  gitHub: 'socialGithub',
  dribbble: 'socialDribbble',
  website: 'socialWebsiteIcon'
}

const ProfileEdit = (props) => {
  const {
    index,
    handleEditMode,
    alt,
    userPortfolio,
    editingBlockIds,
    showError,
    handleOffShowError,
    jobDetail = [],
    handleCheckGuiIdProfile = () => {},
    modalCreatehGuiId = false,
    open = false,
    toggleModal = () => {},
    loadingBlock
  } = props

  const { user, portfolioId } = userPortfolio

  const userProfile = useSelector(selectUserProfile)
  const {
    avatarUrl,
    email,
    phone,
    name,
    setting,
    cityName,
    userId,
    altAvt,
    cityId
  } = userProfile || {}
  const { currentJob, displayName, socials, jobName, jobId, characterId } =
    setting || {}
  const socialField = useSelector(selectUserSocial)
  const dispatch = useDispatch()
  const blockRef = useRef(null)
  const saveRef = useRef(null)
  const refOpt = useRef(null)
  const refCityOpt = useRef(null)
  const inputRef = useRef(null)
  const [showCity, setShowCity] = useState(false)
  const [tempCities, setTempCities] = useState([])
  const cities = useSelector(selectJobCities)
  const [imageSrcAvatar, setImageSrcAvatar] = useState('')
  const [openModalAvatar, setOpenModalAvatar] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [socialModal, toggleSocialModal] = useModal()
  const [showOptionAvatar, toggleShowOptionAvatar] = useModal()

  const schema = yup.object().shape({
    name: yup.string().trim().required('Vui lòng nhập thông tin bạn nhé'),
    currentJob: yup.string().trim().required('Vui lòng nhập thông tin bạn nhé'),
    // fullName: yup.string().required('Vui lòng nhập thông tin bạn nhé'),
    // jobId: yup.string().required('Vui lòng nhập thông tin bạn nhé'),
    email: yup
      .string()
      .required('Vui lòng nhập thông tin bạn nhé')
      .email('Email không hợp lệ'),
    phone: yup
      .string()
      .required('Vui lòng nhập thông tin bạn nhé')
      .matches(REGEX_PHONE, 'Số điện thoại không hợp lệ'),
    cityId: yup.number().required('Thành phố không được để trống')
  })

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    control,
    reset,
    resetField,
    getValues,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      displayName: displayName || '',
      currentJob: currentJob || '',
      name: name || '',
      // jobId: jobId || '',
      email: email || '',
      phone: phone || '',
      cityId: cityId,
      cityName: cityName,
      socials: socialField
    }
  })
  const { append, remove, fields, replace, update } = useFieldArray({
    control,
    name: 'socials'
  })
  const [imageSrc, setImageSrc] = useState(avatarUrl)
  const [progress, setProgress] = useState({
    onUpload: false,
    upload: 0
  })
  const [showOpt, setShowOpt] = useState(false)
  const [tempJobs, setTempJobs] = useState(jobDetail)
  const [tempSocials, setTempSocials] = useState(socialField)

  // const handleAddToSocials = (social) => {
  //   setSocialNetWorkField([...socialNetworkField, social])
  //   const cloneTempArr = [...tempSocials]
  //   const elementIndex = tempSocials.findIndex((el) => el.id === social.id)
  //   if (elementIndex !== -1) {
  //     cloneTempArr.splice(elementIndex, 1)
  //     setTempSocials([...cloneTempArr])
  //     // setValue('isSubmitSocial', true)
  //   }
  // }

  // const handleAddNewSocial = () => {
  //   setTempSocials([
  //     ...tempSocials,
  //     {
  //       type: 'facebook',
  //       typeDisplay: 'Facebook',
  //       id: tempSocials.length + 1,
  //       url: ''
  //     }
  //   ])
  //   // setValue('isSubmitSocial', false)
  // }

  // const handleDeleteSocial = (index) => {
  //   const cloneTempSocials = [...socialNetworkField]
  //   cloneTempSocials.splice(index, 1)
  //   setSocialNetWorkField([...cloneTempSocials])
  // }

  // const handleDeleteTempSocial = (index) => {
  //   const cloneTempSocials = [...tempSocials]
  //   cloneTempSocials.splice(index, 1)
  //   setTempSocials([...cloneTempSocials])
  // }

  const handleUploadAvatar = async (file) => {
    setUploading(true)
    toggleShowOptionAvatar()
    const imageFile = file[0]
    if (imageFile.type.startsWith('image/')) {
      if (imageFile.type === 'image/gif') {
        if (imageFile.size <= 2097152) {
          const imgUrl = await getPresignedUrlByAxios(
            imageFile,
            'User/' + userId,
            (value) => setProgress({ onUpload: true, upload: value })
          )
          // const imgUrl = await convertToWebpAxios(imageFile, 'User/' + userId)
          if (imgUrl) {
            setImageSrc(imgUrl.url)
            setProgress({ onUpload: false, upload: 0 })
            setUploading(false)
          }
        } else {
          setUploading(false)
          setProgress({ onUpload: false, upload: 0 })

          toast(
            AlertWaring({
              title: 'Hiện tại hệ thống chưa hỗ trợ ảnh dung lượng lớn'
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
              setImageSrcAvatar(reader.result)
              setOpenModalAvatar(true)
            })
            setUploading(false)
          } else {
            setUploading(false)
            toast(
              AlertWaring({
                title: 'Hiện tại hệ thống chưa hỗ trợ ảnh dung lượng lớn'
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
      toast(
        AlertWaring({
          title: 'Hiện tại hệ thống chưa hỗ trợ định dạng này'
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

  const queryJobByName = (val) => {
    const tempArr = [...jobDetail]
    const filterJobs = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempJobs(filterJobs)
  }

  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  const handleChooseJob = (id, val) => {
    // setValue('jobId', id)
    setValue('currentJob', val)
    handleCloseOpt()
  }
  useOnClickOutside(refOpt, handleCloseOpt)
  const updateUser = async (payload) => {
    const updateUserProfile = await dispatch(updateProfile(payload))
    const { data } = unwrapResult(updateUserProfile)
    if (data?.errorMessage) {
      toast(
        AlertWaring({
          title: data?.errorMessage
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
      toast(
        AlertSuccess({
          title: 'Thông tin của bạn đã được ghi nhận.'
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
      await new Promise(async (resolve) => {
        dispatch(getProfile())
        resolve()
      }).then(() => {
        handleEditMode()
      })
    }
  }
  const handleClickCancel = () => {
    dispatch(getProfile())
    handleEditMode()
  }
  const queryCity = (val) => {
    const tempArr = [...cities]
    const filterCities = tempArr?.filter((city) =>
      city?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempCities(filterCities)
  }
  const handleCloseCity = () => {
    setShowCity(false)
  }
  const handleChooseCity = (id, val) => {
    setValue('cityId', id)
    setValue('cityName', val)
    handleCloseCity()
  }
  useOnClickOutside(refCityOpt, handleCloseCity)
  const onSubmit = async (data) => {
    const filterSocials = data?.socials?.filter(
      (social) => social.url !== '' && social.isShow
    )
    // const watchJobId = watch('jobId')
    // if (!watchJobId) {
    //   setError(
    //     'currentJob',
    //     {
    //       type: 'custom',
    //       message: 'Vui lòng nhập thông tin bạn nhé'
    //     },
    //     { shouldFocus: true }
    //   )
    // } else {
    const payload = {
      avatarUrl: imageSrc,
      name: data?.name,
      phone: data?.phone,
      setting: {
        currentJob: data?.currentJob,
        socials: filterSocials
      },
      cityId: data?.cityId
    }
    reset()
    updateUser(payload)
    // }
  }

  const handleOnCloseImage = () => {
    setOpenModalAvatar(false)
  }

  const handleCropImage = async (src) => {
    setUploading(true)
    if (src) {
      const file = await urlToFile(src)
      try {
        if (isNaN(parseInt(userId))) {
          toast(
            AlertWaring({
              title: 'Không tải được ảnh lên!'
            }),
            {
              toastId: 'upload-avatar-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          throw new Error('failed!')
        }
        await getPresignedUrlByAxios(file, 'User/' + userId, (value) =>
          setProgress({ onUpload: true, upload: value })
        )
        const imgUrl = await convertToWebpAxios(file, 'User/' + userId)
        if (imgUrl) {
          setImageSrc(imgUrl.url)
          setProgress({ onUpload: false, upload: 0 })
          setUploading(false)
        }
      } catch (err) {
        toast(
          AlertError({
            title: 'Không tải được ảnh lên!'
          }),
          {
            toastId: 'upload-avatar-error',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
        setProgress({ onUpload: false, upload: 0 })
        setUploading(false)
      }
    }
  }

  const handleClickOutSideBlock = () => {
    if (!modalCreatehGuiId) {
      saveRef?.current?.click()
    }
  }

  const handleRemoveAvatar = () => {
    setImageSrcAvatar('')
    setImageSrc('')
    toggleShowOptionAvatar()
  }

  // const handleCheckOpenToWork = async () => {
  //   handleCheckGuiIdProfile()
  // }

  useOnClickOutside(saveRef, handleOffShowError)
  useOnClickOutside(blockRef, handleClickOutSideBlock)

  useEffect(() => {
    const fetchAllCities = async () => {
      const fetchCity = await dispatch(getAllCities())
      const res = unwrapResult(fetchCity)
      if (res?.data) {
        setTempCities(res?.data || [])
      }
    }
    fetchAllCities()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      ref={blockRef}
      id={`block-editing-id-${9999999}`}
      className="rounded-borderStep  xl:w-[360px] w-full xl:mb-0 p-8 bg-[#F5F6F7] relative"
    >
      {/* {uploading && <LoadingRole />} */}
      {loadingBlock && <LoadingRoleBlock />}

      <div className="relative ">
        {/* {avatarUrl && ( */}
        <div className="relative rounded-full border border-grey-4 bg-white w-[160px] h-[160px] object-cover mx-auto   ">
          <Image
            layout="fill"
            src={
              imageSrc !== null && imageSrc !== ''
                ? imageSrc
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
              handleUploadAvatar(e.target.files), (e.target.value = '')
            }}
          />
          {progress?.upload === 0 && (
            <div
              onClick={() => toggleShowOptionAvatar()}
              className="absolute  flex items-center border border-nude justify-center bottom-0 right-0 cursor-pointer w-14 h-14 bg-white hover:bg-button rounded-full"
            >
              <XProfileIcon name="uploadLogo" />
            </div>
          )}
        </div>
        {progress.onUpload && progress.upload <= 100 && (
          <div className="flex justify-center mt-6">
            <div className="w-full">
              <PropressBar
                background="bg-[#ECB14E]"
                backgroundOut="bg-[#E6E6E6]"
                type={1}
                skillMatchingPercentage={progress.upload}
                percentValue={100}
              />
            </div>
          </div>
        )}
        {/* )} */}
      </div>
      {/* <p className="mt-6 text-p18 text-neutral text-center">
        {jobSetting.current.turnOn && jobSetting.current.type?.length > 0
          ? convertTypesToText(jobSetting.current.type)
          : 'Bạn đang tắt trạng thái tìm việc'}
      </p> */}
      {/* <div className="flex justify-center">
        <button
          onClick={handleCheckOpenToWork}
          className="mt-1 text-center text-p18 text-blue-light "
        >
          {jobSetting.current.turnOn && jobSetting.current.type?.length > 0
            ? 'Chỉnh sửa'
            : 'Bật tìm việc'}
        </button>
      </div> */}
      <form className=" pt-[28px] flex flex-col sm:gap-[6px] gap-[4px]">
        {/* <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Tên hiển thị
            </p>
          </div>
          <input
            {...register('displayName')}
            className={`sm:text-p18 text-p12 text-neutral py-2 px-4 focus:outline-none w-full ${
              errors.displayName?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.displayName?.message}
          </p>
        </div> */}
        <div className="mt-[20px]">
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18 text-p14-bold ">Họ và tên</p>
          </div>
          <input
            {...register('name')}
            maxLength={50}
            className={`sm:text-p18 text-p12 text-neutral dark:bg-white py-2 px-4 rounded-lg border-grey-3 focus:outline-none w-full ${
              errors.name?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.name?.message}
          </p>
        </div>

        {/* <div>
          <div className="flex items-center">
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Mạng xã hội
            </p>
          </div>
          <p className="text-p14 text-red-500 mb-[8px]">
            {errors.isSubmitSocial?.message}
          </p>

          {socialNetworkField &&
            socialNetworkField?.map((social, ind) => {
              if (social?.url !== '' && social?.type !== 'website') {
                return (
                  <SocialItemView
                    key={`social-network-${ind}`}
                    {...social}
                    index={ind}
                    handleDelete={handleDeleteSocial}
                  />
                )
              }
            })}
          <p className="text-p14 text-red-500">{errors.socials?.message}</p>

          <div key={tempSocials.le}>
            {tempSocials?.map((social, ind) => (
              <SocialItemEdit
                key={social.id}
                {...social}
                index={ind}
                handleAddToSocials={handleAddToSocials}
                handleDeleteTempSocial={handleDeleteTempSocial}
              />
            ))}
          </div>
          <div>
            <SocialAdd onClick={handleAddNewSocial} />
          </div>
        </div> */}

        <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18 text-p14-bold ">Nghề nghiệp</p>
          </div>
          <div className="relative" ref={refOpt}>
            <div
              className={`w-full flex justify-between py-2 gap-2 px-4 items-center border rounded-lg bg-white border-grey-3 ${
                errors.currentJob?.message ? 'border-red-500' : 'border-stoke'
              }`}
              onClick={() => setShowOpt(true)}
            >
              <input
                placeholder="Chọn vị trí..."
                className="outline-0 sm:text-p18 text-p12 text-neutral bg-white  w-full"
                {...register('currentJob')}
                maxLength={50}
                onChange={(e) => queryJobByName(e.target.value)}
              />
              <XProfileIcon name="arrowDown" />
            </div>
            {showOpt && (
              <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px] border border-stoke custom-scrollbar z-10 -mt-4">
                {tempJobs?.map((job, ind) => {
                  return (
                    <div
                      key={ind}
                      className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                      onClick={() => handleChooseJob(job?.jobId, job?.name)}
                    >
                      <p>{job?.name}</p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.currentJob?.message}
          </p>
        </div>
        {/* <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Email
            </p>
          </div>
          <input
            {...register('email')}
            className={`sm:text-p18 text-p12 text-neutral py-2 px-4 focus:outline-none w-full ${
              errors.email?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.email?.message}
          </p>
        </div> */}
        <div className="flex flex-col ">
          <label className="text-p18 text-neutral mb-2">
            Thành phố <span className="text-semantic-red">*</span>
          </label>
          <div className="relative" ref={refCityOpt}>
            <div
              className={`w-full flex justify-between py-2 gap-2 px-4 items-center border rounded-lg bg-white border-grey-3 ${
                errors.cityId?.message ? 'border-red-500' : 'border-stoke'
              }`}
              onClick={() => setShowCity(true)}
            >
              <input
                placeholder="Chọn thành phố..."
                className="outline-0 sm:text-p18 text-p12 text-neutral  w-full"
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
                      onClick={() => handleChooseCity(city?.cityId, city?.name)}
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
        <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18 text-p14-bold ">Số điện thoại</p>
          </div>
          <input
            {...register('phone')}
            className={`sm:text-p18 text-p12 text-neutral dark:bg-white py-2 px-4 rounded-lg border-grey-3 focus:outline-none w-full ${
              errors.phone?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.phone?.message}
          </p>
        </div>
        <div>
          <div className="flex items-center justify-between">
            <p className="text-p18">Tài khoản xã hội</p>
            <p
              onClick={() => toggleSocialModal()}
              className="text-p18 text-button-2 cursor-pointer"
            >
              Chỉnh sửa
            </p>
          </div>
          <div className="flex items-center sm:mt-6 mt-[12px] gap-4 flex-wrap w-full mx-auto">
            {fields?.map((el, ind) => {
              if (el?.url !== '') {
                return (
                  <Link href={el.url} key={ind}>
                    <a
                      className=" flex items-center justify-center w-11 h-11 rounded-full border group border-grey-4"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="group-hover:hidden">
                        <XProfileIcon name={ICONS[el.type]} fill="#000000" />
                      </div>
                      <div className="group-hover:block hidden">
                        <XProfileIcon name={ICONS[el.type]} fill="#F6BB3A" />
                      </div>
                    </a>
                  </Link>
                )
              }
            })}
          </div>
        </div>
        <div className="flex items-center gap-4 mt-[80px] justify-end">
          <Button
            // btnRef={saveRef}
            title="Huỷ"
            rounded="rounded-[8px]"
            background={'bg-grey-4'}
            color="text-black"
            padding="py-2 px-8"
            width="w-fit xl:block hidden"
            height="h-[48px]"
            textWeight={'sm:text-p18-bold text-p14 font-bold'}
            onClick={() => handleClickCancel()}
            margin="m-0"
          />
          <Button
            btnRef={saveRef}
            title="Lưu"
            rounded="rounded-[8px]"
            background={'bg-button-2'}
            color="text-white"
            padding="py-2 px-8"
            width="w-fit xl:block hidden"
            height="h-[48px]"
            textWeight={'sm:text-p18-bold text-p14 font-bold'}
            onClick={handleSubmit(onSubmit)}
            margin="m-0"
          />
        </div>
        {/* <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Lĩnh vực
            </p>
          </div>
          <input
            {...register('description')}
            className={`sm:text-p18 text-p12 text-neutral py-2 px-4 focus:outline-none w-full ${
              errors.description?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.description?.message}
          </p>
        </div> */}
        {/* <div>
          <div className="flex mb-[8px] items-center">
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Học vấn
            </p>
          </div>
          <input
            {...register('education')}
            className={`sm:text-p18 text-p12 text-neutral py-2 px-4 focus:outline-none w-full ${
              errors.education?.message
                ? 'border border-red-500'
                : 'border-[1px] border-stoke'
            }`}
          />
          <p className="text-p14 text-red-500 h-[22px]">
            {errors.education?.message}
          </p>
        </div> */}
        <Button
          btnRef={saveRef}
          title="Lưu"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[8px] px-[20px]"
          width="w-full xl:hidden block"
          height="h-[48px]"
          textWeight={'sm:text-p18 text-p14 font-bold'}
          onClick={handleSubmit(onSubmit)}
          margin="m-0"
        />
      </form>
      <DialogAvatarCropImages
        src={imageSrcAvatar}
        isVisible={openModalAvatar}
        handleOnClose={handleOnCloseImage}
        handleCropImage={handleCropImage}
        aspect={1 / 1}
      />
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
      <Modal
        open={socialModal}
        toggleModal={toggleSocialModal}
        title="Thêm tài khoản Social"
        styleTitle=" text-neutral text-p32-bold"
      >
        <div className="w-full max-h-[55vh] pr-1 overflow-y-auto custom-scrollbar mt-10">
          {fields?.map((social, index) => {
            const { typeDisplay, type, icon, isShow } = social
            if (isShow) {
              return (
                <SocialLink
                  key={social.id}
                  register={register}
                  title={typeDisplay}
                  name={`socials.${index}.url`}
                  icon={icon}
                  setValue={setValue}
                  watch={watch}
                />
              )
            }
          })}
        </div>
        <div className="flex justify-end items-center mt-10 gap-[16px]">
          <Button
            title="Huỷ"
            padding="py-3 py-3 px-8"
            background="bg-grey-4"
            margin="m-0"
            rounded="rounded-lg"
            height="h-[56px] "
            onClick={() => {
              resetField('socials'), toggleSocialModal()
            }}
          />
          <Button
            title="Lưu"
            className="py-3 px-8"
            margin="m-0"
            rounded="rounded-lg"
            height="h-[56px]"
            onClick={() => {
              update('socials', getValues('socials')), toggleSocialModal()
            }}
          />
        </div>
      </Modal>
    </div>
  )
}

ProfileEdit.propTypes = {}

export default ProfileEdit
