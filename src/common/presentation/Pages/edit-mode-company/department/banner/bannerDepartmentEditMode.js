import BreadCrumbs from 'common/presentation/breadCrumbs'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import TextareaAutosize from 'react-textarea-autosize'
import XProfileIcon from 'common/presentation/Icons'
import { useRef } from 'react'
import PropressBar from 'common/presentation/ProgressBar'

const BannerDepartmentEditMode = (props) => {
  const {
    breadCrumbsTitle,
    profileDepartment,
    onChangeImageUpload = () => {},
    errors = '',
    handleResetErrors = () => {},
    checkUpload,
    persent
  } = props
  const {
    imageUrl,
    name,
    shortDescription,
    meta,
    departmentPositionId,
    avatarUrl
  } = profileDepartment || {}
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const handleOnChangeNameField = (value) => {
    dispatch(updateDepartmentBannerEdit({ ...profileDepartment, name: value }))
    handleResetErrors('Name')
  }
  const handleOnChangeShortDescriptionField = (value) => {
    dispatch(
      updateDepartmentBannerEdit({
        ...profileDepartment,
        shortDescription: value
      })
    )
    handleResetErrors('ShortDescription')
  }

  return (
    <div className="max-w-[1140px] mx-auto">
      <div className=" sm:flex items-center gap-[40px] max-w-[1140px]">
        <div className="block sm:hidden mb-5">
          <BreadCrumbs type={true} nameList={breadCrumbsTitle} />
        </div>
        <div className="absolute top-[88px] right-[72px] hidden xl:block">
          <Image
            src={'/images/banner-profile-top.png'}
            width={140}
            height={168}
            alt=""
            // objectFit="cover"
          />
        </div>

        <div
          id="ImageUrl"
          className="sm:w-[515px] w-[340px] sm:h-[312px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]"
        >
          {/* <div className="hidden md:block absolute -bottom-9 -left-10">
            <Image
              src={'/images/banner-profile-bottom.png'}
              width={122}
              height={90.31}
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="hidden md:block absolute -top-9 -right-10 ">
            <Image
              src={'/images/banner-profile-top.png'}
              width={91.43}
              height={83.72}
              objectFit="contain"
              alt=""
            />
          </div> */}
          <input
            ref={inputRef}
            id="input-file-avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              onChangeImageUpload(e.target.files)
              e.target.value = ''
            }}
          />
          <div
            className={`relative w-full h-full 
            `}
          >
            {imageUrl ? (
              <div
                className={`relative w-full h-full flex justify-center border items-center rounded-lg bg-white
             ${
               errors?.ImageUrl
                 ? 'border-semantic-red border-dashed'
                 : 'border-[#EBB14C80]'
             }`}
              >
                <Image
                  src={imageUrl}
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
                className={`relative w-full h-full   mx-auto text-center  cursor-pointer flex flex-col justify-center items-center rounded-lg 
            ${
              errors?.ImageUrl
                ? 'border-custom-img-deparment_errors'
                : 'border-custom-img-deparment'
            }`}
              >
                <div className="relative w-[100px] xl:h-[100px]">
                  <Image
                    src="/images/uploadAvatarEdit.png"
                    height={300}
                    width={300}
                    objectFit="contain"
                    alt=""
                    quality={100}
                  />
                </div>

                <p className="text-p28-bold text-button mt-6">Thêm ảnh</p>
                <p className="hidden xl:block w-[142px] text-p16 text-neutral ">
                  hoặc kéo và thả
                </p>
              </label>
            )}
            {checkUpload && persent <= 100 && (
              <div className="mt-[20px]">
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
          <p className="text-p16 text-semantic-red h-[24px] mt-1 text-end">
            {errors?.ImageUrl && 'Hình ảnh bị thiếu'}
          </p>
        </div>

        <div className="max-w-[552px]">
          <div className="hidden xl:block mb-5">
            <BreadCrumbs type={true} nameList={breadCrumbsTitle} />
          </div>
          <div className=" sm:text-center text-start xl:text-start">
            <input
              id="Name"
              placeholder="Nhập Tên Phòng Ban"
              onChange={(e) => handleOnChangeNameField(e?.target?.value)}
              value={name}
              maxLength={50}
              className={`xl:text-h1 peer  hover:border-b placeholder:text-grey-3 transition-all text-p20-bold font-bold text-neutral  appearance-none  bg-transparent w-fit outline-0 focus:transition-all focus:duration-500 focus:border-b  
              ${
                errors?.Name
                  ? 'border-b border-semantic-red'
                  : 'border-b border-transparent hover:border-semantic focus:border-semantic'
              }`}
            />
            <div className="flex justify-end">
              {errors?.Name && (
                <p className="text-p16 text-semantic-red h-[24px]">
                  {errors?.Name}
                </p>
              )}
            </div>
            {!errors?.Name && (
              <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
                {50 - (name?.length || 0)}
              </p>
            )}
          </div>

          <div className="xl:w-[500px] text-start  my-4 ">
            <TextareaAutosize
              id="ShortDescription"
              placeholder="Nhập mô tả phòng ban"
              className={`text-p18 text-grey-1  placeholder:text-grey-3 hover:border-b transition-all peer w-full  outline-0 resize-none  focus:transition-all focus:duration-500 focus:border-b  custom-scrollbar-none-border
              ${
                errors?.ShortDescription
                  ? 'border-b border-semantic-red'
                  : 'border-b border-transparent focus:border-semantic hover:border-semantic'
              }`}
              defaultValue={shortDescription}
              maxLength={125}
              rows={5}
              onChange={(e) =>
                handleOnChangeShortDescriptionField(e?.target?.value)
              }
            />
            {errors?.ShortDescription && (
              <p className="text-p16 text-end text-semantic-red h-[24px]">
                Không được bỏ trống
              </p>
            )}
            {!errors?.ShortDescription && (
              <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
                {125 - (shortDescription?.length || 0)}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

BannerDepartmentEditMode.propTypes = {
  toggleModal: PropTypes.func
}

BannerDepartmentEditMode.defaultProps = {
  toggleModal: () => {}
}

export default BannerDepartmentEditMode
