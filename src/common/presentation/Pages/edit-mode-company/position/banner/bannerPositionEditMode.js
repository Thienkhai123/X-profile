import Button from 'common/presentation/Button'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updatePositionBannerEdit } from 'store/app/edit-mode-company/position/bannerSlice'
import TextareaAutosize from 'react-textarea-autosize'
import { useRef } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import PropressBar from 'common/presentation/ProgressBar'

const BannerPositionEditMode = (props) => {
  const {
    breadCrumbsTitle,
    profilePosition,
    onChangeImageUpload = () => {},
    errors = null,
    handleResetErrors = () => {},
    persent,
    checkUpload
  } = props
  const { meta, name, shortDescription, avatarUrl } = profilePosition || {}
  const { avatarUrl: avatarUrlDefault } = meta || {}
  const inputRef = useRef(null)
  const dispatch = useDispatch()
  const handleOnChangeNameField = (value) => {
    dispatch(updatePositionBannerEdit({ ...profilePosition, name: value }))
    handleResetErrors('Name')
  }
  const handleOnChangeShortDescriptionField = (value) => {
    dispatch(
      updatePositionBannerEdit({
        ...profilePosition,
        shortDescription: value
      })
    )
    handleResetErrors('ShortDescription')
  }

  return (
    <div className="max-w-[1140px] mx-auto py-6">
      <div className=" sm:flex items-center gap-[64px] max-w-[1140px]">
        <div className="block sm:hidden mb-5">
          <BreadCrumbs
            type={true}
            nameList={breadCrumbsTitle}
            styleBread="text-grey-1 text-p14"
            textBreadLast="text-grey-1 text-p14"
            classNameType="text-grey-1 text-p14"
          />
        </div>
        <div className="absolute bottom-0 right-0 hidden xl:block">
          <Image
            src={'/images/absoluteBottomBanner.png'}
            width={344}
            height={168}
            alt=""
            objectFit="cover"
          />
        </div>

        <div
          id="AvatarUrl"
          className="sm:w-[514px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]"
        >
          <div className="hidden md:block absolute -bottom-[48px] -left-10">
            <Image
              src={'/images/banner-profile-bottom.png'}
              width={122}
              height={90.31}
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="hidden md:block absolute -top-[44px] -right-10 ">
            <Image
              placeholder="blur"
              blurDataURL="/images/banner-profile-top.png"
              src={'/images/banner-profile-top.png'}
              width={91.43}
              height={83.72}
              objectFit="contain"
              alt=""
            />
          </div>
          <input
            ref={inputRef}
            id="input-file-avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              if (!(checkUpload && persent <= 100)) {
                handleResetErrors('AvatarUrl')
                onChangeImageUpload(e.target.files)
                e.target.value = ''
              }
            }}
          />
          <label
            className={`relative w-full h-full 
         `}
          >
            {avatarUrl || avatarUrlDefault ? (
              <div
                className={`relative w-full h-full flex justify-center items-center border border-[#EBB14C80] rounded-lg bg-white
           `}
              >
                <Image
                  src={!avatarUrl ? avatarUrlDefault : avatarUrl}
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg bg-white"
                />
                <div className="absolute right-6 top-6 flex gap-4">
                  <div
                    onClick={() => inputRef?.current?.click()}
                    className=" w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
                  >
                    <XProfileIcon name="pen" />
                  </div>
                </div>
              </div>
            ) : (
              <label
                htmlFor="input-file-avatar"
                className={`relative w-full h-full flex justify-center items-center border rounded-lg bg-white
                ${
                  errors?.AvatarUrl
                    ? 'border-semantic-red border-dashed'
                    : 'border-[#EBB14C80]'
                }`}
              >
                <Image
                  src={'/images/uploadAvatarEdit.png'}
                  height={100}
                  width={100}
                  objectFit="contain"
                  alt=""
                  quality={100}
                  className="rounded-lg bg-white"
                />
              </label>
            )}
          </label>
          {errors?.AvatarUrl && (
            <p className="text-p16 text-semantic-red h-[24px] mt-1 text-end">
              {errors?.AvatarUrl && 'Hình ảnh bị thiếu'}
            </p>
          )}
          {checkUpload && persent <= 100 && (
            <div className="w-full mt-[12px]">
              <PropressBar
                background="bg-[#ECB14E]"
                backgroundOut="bg-[#E6E6E6]"
                type={1}
                skillMatchingPercentage={persent}
                percentValue={100}
              />
            </div>
          )}
        </div>

        <div className="max-w-[552px]">
          <div className="hidden xl:block mb-5">
            <BreadCrumbs
              type={true}
              nameList={breadCrumbsTitle}
              styleBread="text-grey-1 text-p14"
              textBreadLast="text-grey-1 text-p14"
              classNameType="text-grey-1 text-p14"
            />
          </div>
          <div className="mb-3 sm:text-center text-start xl:text-start">
            <input
              id="Name"
              placeholder="Nhập tên vị trí"
              onChange={(e) => handleOnChangeNameField(e?.target?.value)}
              value={name}
              maxLength={50}
              className={`xl:text-h1 peer  border-b outline-none  transition-all text-p20-bold font-bold text-neutral appearance-none outline-0 focus:transition-all focus:duration-500  focus:border-b  bg-transparent w-fit 
              ${
                errors?.Name
                  ? 'border-b border-semantic-red'
                  : 'border-b border-transparent hover:border-semantic  focus:border-semantic'
              }`}
            />
            {!errors?.Name && (
              <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
                {50 - (name?.length || 0)}
              </p>
            )}

            {errors?.Name && (
              <p className="text-p16 text-semantic-red leading-[28px] text-end">
                {errors?.Name}
              </p>
            )}
          </div>

          <div className="xl:w-[500px] text-start mb-6">
            <TextareaAutosize
              id="ShortDescription"
              placeholder="Nhập mô tả vị trí"
              className={`text-p18 text-grey-1 border-b outline-none   transition-all w-full p-4 outline-0 peer focus:transition-all focus:duration-500 focus:border-b resize-none  custom-scrollbar-none-border
              ${
                errors?.ShortDescription
                  ? 'border-b border-semantic-red'
                  : 'border-b border-transparent hover:border-semantic focus:border-semantic '
              }
              `}
              defaultValue={shortDescription}
              rows={5}
              maxLength={100}
              onChange={(e) =>
                handleOnChangeShortDescriptionField(e?.target?.value)
              }
            />

            {!errors?.ShortDescription && (
              <div className="flex justify-end opacity-0 peer-focus:opacity-100">
                <p className="text-grey-2 text-p14">
                  {100 - (shortDescription ? shortDescription?.length : 0)}
                </p>
              </div>
            )}
            {errors?.ShortDescription && (
              <p className="text-p16 text-end text-semantic-red leading-[28px]">
                Không được bỏ trống
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

BannerPositionEditMode.propTypes = {
  toggleModal: PropTypes.func
}

BannerPositionEditMode.defaultProps = {
  toggleModal: () => {}
}

export default BannerPositionEditMode
