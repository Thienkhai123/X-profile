import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import {
  selectBannerProfile,
  selectImageAvatarUpload,
  selectImageBannerUpload,
  updateAvatarImageUpload,
  updateBannerEdit
} from 'store/app/edit-mode-company/profile/bannerSlice'
import { useSelector } from 'react-redux'

import { useRouter } from 'next/router'
import {
  convertToWebp,
  convertToWebpAxios,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { DialogCropImage } from '../../applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { urlToFile } from 'store/helper/functionHelper'
import { selectUserProfile } from 'store/app/userSlice'
import PropressBar from 'common/presentation/ProgressBar'
import XProfileIcon from 'common/presentation/Icons'

const BannerEdit = (props) => {
  const {
    isEdit = false,
    errors = null,
    handleResetErrors = () => {},
    seenNumber = 0
  } = props

  const profile = useSelector(selectBannerProfile)
  const user = useSelector(selectUserProfile)
  const imageUpload = useSelector(selectImageAvatarUpload) || {}
  const bannerUpload = useSelector(selectImageBannerUpload) || {}

  const [cropImage, setCropImage] = useState(false)
  const [cropBanner, setCropBanner] = useState(false)
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })

  const { name, bannerUrl, avatarUrl, shortDescription = '' } = profile || {}

  const dispatch = useDispatch()
  const handleOpenModal = () => {
    setCropImage(true)
  }
  const handleCloseModal = () => {
    setCropImage(false)
  }
  // const handleChangeBannerOpenModal = () => {
  //   setCropBanner(true)
  // }
  const handleChangeBannerCloseModal = () => {
    setCropBanner(false)
  }
  const handleOnChangeNameField = (value) => {
    dispatch(
      updateBannerEdit({
        name: value
        // ...profile.updateProperties
      })
    )
    handleResetErrors('Name')
  }
  // const onChangeBannerUpload = (file) => {
  //   const imageFile = file[0]
  //   if (imageFile) {
  //     const reader = new FileReader()
  //     reader.readAsDataURL(imageFile)
  //     reader.addEventListener('load', () => {
  //       dispatch(updateBannerImageUpload(reader.result))
  //       handleChangeBannerOpenModal()
  //     })
  //   }
  // }
  const handleCropBannerComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)

      handleUploadBanner(file)
    }
  }
  const onChangeImageUpload = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateAvatarImageUpload(reader.result))
        handleOpenModal()
      })
    }
  }
  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)

      handleUploadAvatar(file)
    }
  }
  const handleUploadAvatar = async (file) => {
    await getPresignedUrlByAxios(file, 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    const imgUrl = await convertToWebpAxios(file, 'User/' + user?.userId)
    if (imgUrl) {
      dispatch(
        updateBannerEdit({
          avatarUrl: imgUrl?.url
        })
      )
      setPersent({ onUpload: false, upload: 0 })
    }
  }
  const handleUploadBanner = async (file) => {
    const bannerUrl = await convertToWebp(file, 'User/' + user?.userId)
    if (bannerUrl) {
      dispatch(
        updateBannerEdit({
          bannerUrl: bannerUrl
        })
      )
    }
  }
  const handleOnChangeshortDescriptionField = (value) => {
    dispatch(
      updateBannerEdit({
        shortDescription: value
      })
    )
    handleResetErrors('ShortDescription')
  }

  const handleCLose = () => {}
  const bannerRef = useRef(null)
  const inputRef = useRef(null)
  useOnClickOutside(bannerRef, handleCLose)

  const editMode = (
    <div ref={bannerRef} className="h-full">
      <div className="relative flex justify-between pt-4  px-[72px] h-full">
        <div className="hidden md:flex flex-col justify-end">
          <Image
            src={'/images/banner-profile-bottom.png'}
            width={122}
            height={105}
            alt=""
            objectFit="contain"
          />
        </div>
        <div className="flex flex-col justify-center ">
          <input
            ref={inputRef}
            id="input-file-avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChangeImageUpload(e.target.files)}
          />
          <div className="mb-[44px]">
            {avatarUrl ? (
              <div className="relative  mx-auto text-center bg-white xl:w-[200px] xl:h-[200px] w-[106px] h-[106px] rounded-full border-[1px] border-grey-4">
                <label htmlFor="input-file-avatar" className="hidden sm:block">
                  <Image
                    src={avatarUrl}
                    height={200}
                    width={200}
                    objectFit="contain"
                    alt=""
                    className="rounded-full"
                    quality={100}
                  />
                </label>
                <div
                  onClick={() => inputRef?.current?.click()}
                  className="absolute bottom-0 cursor-pointer  flex items-center justify-center  right-0 w-[80px] h-[80px] rounded-full bg-white border-[1px] border-grey-4"
                >
                  <Image
                    src="/images/uploadAvatarEdit.png"
                    height={40}
                    width={40}
                    objectFit="contain"
                    alt=""
                    quality={100}
                  />
                </div>
              </div>
            ) : (
              <div className=" mx-auto text-center  w-[100px] xl:h-[100px] cursor-pointer ">
                <label htmlFor="input-file-avatar" className="hidden sm:block">
                  <Image
                    src="/images/uploadAvatarEdit.png"
                    height={300}
                    width={300}
                    objectFit="contain"
                    alt=""
                    quality={100}
                  />
                </label>
              </div>
            )}
            {persent.onUpload && persent.upload <= 100 && (
              <div className="flex justify-center mt-[12px]">
                <div className="w-[400px]">
                  <PropressBar
                    background="bg-[#ECB14E]"
                    backgroundOut="bg-[#E6E6E6]"
                    type={1}
                    skillMatchingPercentage={persent}
                    percentValue={100}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <div className="xl:w-[1000px] text-center mb-[24px]">
              <input
                id="Name"
                placeholder="Tên doanh nghiệp"
                onChange={(e) => handleOnChangeNameField(e?.target?.value)}
                value={name}
                className={`xl:text-h1 text-p20-bold font-bold text-neutral  transition-all placeholder:text-grey-3 appearance-none bg-transparent w-fit text-center outline-0 focus:transition-all focus:duration-500 focus:border-b  ${
                  errors?.Name
                    ? 'xl:w-[391px] border-b border-semantic-red'
                    : 'border-b border-transparent focus:border-semantic hover:border-semantic'
                }`}
              />
              {errors?.Name && (
                <div className="flex justify-center">
                  <p className="xl:w-[391px] text-end text-p16 text-semantic-red h-[16px]">
                    {errors?.Name}
                  </p>
                </div>
              )}
            </div>
            <div className="xl:w-[1000px] text-center  ">
              <input
                maxLength={125}
                id="ShortDescription"
                placeholder="Slogan của công ty bạn là gì?"
                onChange={(e) =>
                  handleOnChangeshortDescriptionField(e?.target?.value)
                }
                value={shortDescription}
                className={`text-p18 leading-[30px] placeholder:text-grey-3  transition-all  text-black appearance-none  bg-transparent w-full text-center outline-0 focus:transition-all focus:duration-500 focus:border-b 
                ${
                  errors?.ShortDescription
                    ? 'xl:w-[259px] border-b border-semantic-red'
                    : 'border-b border-transparent hover:border-semantic focus:border-semantic px-[8px]'
                }`}
              />
              {errors?.ShortDescription && (
                <div className="flex justify-center">
                  <p className="xl:w-[259px] text-end text-p16 text-semantic-red h-[16px]">
                    {errors?.ShortDescription}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-start">
          <Image
            src={'/images/banner-profile-top.png'}
            width={139}
            height={139}
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
    </div>
  )
  const divMode = (
    <div className="h-full">
      <div className="relative flex justify-between pt-4  px-[72px] h-full">
        <div className="hidden md:flex flex-col justify-end">
          <Image
            src={'/images/banner-profile-bottom.png'}
            width={122}
            height={105}
            alt=""
            objectFit="contain"
          />
        </div>

        <div className="flex flex-col justify-center ">
          <div className="relative flex">
            <div className="absolute top-0">
              <div className="flex gap-[4px] items-center">
                <XProfileIcon name="eyeProfileCompany" />
                <p className="text-p16 text-grey-1">{seenNumber}</p>
              </div>
            </div>
            {avatarUrl ? (
              <div className="mb-[44px] mx-auto text-center bg-white xl:w-[200px] xl:h-[200px] w-[106px] h-[106px] rounded-full border-[1px] border-grey-4">
                <div className="hidden sm:block">
                  <Image
                    src={avatarUrl}
                    height={200}
                    width={200}
                    objectFit="contain"
                    alt=""
                    className="rounded-full"
                    quality={100}
                  />
                </div>
              </div>
            ) : (
              <div className="mb-[44px] mx-auto text-center  w-[100px] xl:h-[100px] cursor-pointer">
                <div className="hidden sm:block">
                  <Image
                    src="/images/uploadAvatarEdit.png"
                    height={300}
                    width={300}
                    objectFit="contain"
                    alt=""
                    quality={100}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col justify-center ">
            <div className="xl:w-[1000px] mx-auto mb-[24px]">
              <p className="xl:text-h1 text-ellipsis overflow-hidden line-clamp-2 text-p20-bold font-bold text-neutral   rounded-xl bg-transparent  text-center">
                {name}
              </p>
            </div>
            <div className="xl:w-[1000px] text-center  ">
              <p className=" px-[2px] text-p18 text-ellipsis overflow-hidden line-clamp-1 break-words text-neutral  rounded-xl bg-transparent w-full text-center">
                {shortDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex flex-col justify-start">
          <Image
            src={'/images/banner-profile-top.png'}
            width={139}
            height={139}
            objectFit="contain"
            alt=""
          />
        </div>
      </div>
    </div>
  )

  return (
    <div
      key={bannerUrl}
      className="w-full xl:min-h-[457px] h-[561px]  "
      style={
        {
          // background: `${bannerUrl ? `url('${bannerUrl}')` : 'white'}`,
          // backgroundSize: 'cover',
          // backgroundRepeat: 'no-repeat'
        }
      }
    >
      {/* <div className="relative w-full h-full pb-[32px] bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"> */}
      <div className="relative w-full h-full pt-[44px] pb-[80px] bg-white">
        {/* bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent */}
        {isEdit ? editMode : divMode}
      </div>
      <DialogCropImage
        src={imageUpload}
        isVisible={cropImage}
        handleOnClose={handleCloseModal}
        handleCropImage={handleCropImageComplete}
      />
      <DialogCropImage
        aspect={1440 / 254}
        src={bannerUpload}
        isVisible={cropBanner}
        handleOnClose={handleChangeBannerCloseModal}
        handleCropImage={handleCropBannerComplete}
      />
    </div>
  )
}

BannerEdit.propTypes = {
  profile: PropTypes.object
}
BannerEdit.defaultProps = {
  profile: {
    name: 'Tên doanh nghiệp',
    bannerUrl: '',
    isDisplayOnBanner: true,
    avatarUrl: '',
    shortDescription: 'Slogan của công ty bạn là gì?'
  }
}

export default BannerEdit
