import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import { SimpleSlider } from 'common/presentation/Swiper/SimpleSlider'
import { SwiperSlide } from 'swiper/react'
import { useSelector } from 'react-redux'
import {
  addImagesEdit,
  getAllImages,
  selectImagesInformation,
  selectInformationProfile,
  updateInformationEdit
} from 'store/app/edit-mode-company/profile/informationSlice'
import { useDispatch } from 'react-redux'
import InformationItemEdit from '../InformationItemEdit'
import Modal from 'common/presentation/Modal'
import InformationImageEditModal from '../InformationImageEditModal'
import XProfileIcon from 'common/presentation/Icons'
import { useRouter } from 'next/router'
import InformationYearItemEdit from '../InformationYearItemEdit'
import moment from 'moment'
import {
  convertToWebp,
  convertToWebpAxios,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import TextareaAutosize from 'react-textarea-autosize'
import { convertCurrency, distanceYear } from 'store/helper/functionHelper'
import { selectUserProfile } from 'store/app/userSlice'

const InformationEdit = (props) => {
  const {
    title = 'Thông tin công ty',
    titleMapButon = 'Thêm URL bản đồ',
    titleMoreButton = 'Thêm URL website',
    isEdit = false,
    errors = null,
    handleResetErrors = () => {},
    showPreview = false
  } = props

  const profile = useSelector(selectInformationProfile)
  const {
    description,
    addressBooks,
    employeeAmount,
    recruitmentAmount,
    establishDate,
    websiteLinkTitle,
    websiteUrl,
    googleMapUrl,
    maxSalary,
    meta
  } = profile || {}
  const address = addressBooks?.filter((add) => add.isDefault === true)
  const googleMapUrlDefault = address && address[0]?.googleMapUrl

  const { websiteLinkTitle: websiteLinkTitleDefault } = meta || {}

  const dispatch = useDispatch()
  const router = useRouter()
  const { companyId } = router.query
  const listImages = useSelector(selectImagesInformation)
  const user = useSelector(selectUserProfile)

  const [editImage, setEditImage] = useState(false)
  const [showUrlMap, setShowUrlMap] = useState(false)
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })
  const [showUrlWebsite, setShowUrlWebsite] = useState(false)

  const toggleEditImage = () => {
    setEditImage(!editImage)
  }
  const handleChangeDescription = (val) => {
    dispatch(updateInformationEdit({ description: val }))
    handleResetErrors('Description')
  }
  const handleUploadImages = async (file) => {
    await getPresignedUrlByAxios(file[0], 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    const imgUrl = await convertToWebpAxios(file[0], 'User/' + user?.userId)
    if (imgUrl?.url) {
      dispatch(
        addImagesEdit({
          image: {
            imageUrl: imgUrl?.url
          },
          newUrl: imgUrl?.url
        })
      )
      setPersent({ onUpload: false, upload: 0 })
      handleResetErrors('LISTIMAGES')
    }
  }

  const informationRef = useRef(null)
  const urlMapRef = useRef(null)
  const urlWebsiteRef = useRef(null)
  const websiteLinkTitleRef = useRef(null)

  const handleCLose = () => {}
  useOnClickOutside(informationRef, handleCLose)
  const toggleUrlMap = () => {
    setShowUrlMap(!showUrlMap)
    setShowUrlWebsite(false)
  }
  const toggleUrlWebsite = () => {
    setShowUrlWebsite(!showUrlWebsite)
    setShowUrlMap(false)
  }
  const onSaveUrlMap = () => {
    dispatch(
      updateInformationEdit({
        googleMapUrl: urlMapRef?.current?.value
      })
    )
    setShowUrlMap(false)
  }
  const onCancelUrlMap = () => {
    setShowUrlMap(false)
  }
  const onSaveUrlWebsite = () => {
    dispatch(
      updateInformationEdit({
        websiteUrl: urlWebsiteRef?.current?.value,
        websiteLinkTitle: websiteLinkTitleRef?.current?.value.trim()
      })
    )
    setShowUrlWebsite(false)
  }
  const onCancelUrlWebsite = () => {
    setShowUrlWebsite(false)
  }

  const editMode = (
    <div ref={informationRef}>
      <div className="flex justify-center flex-wrap max-w-[1140px] mx-auto py-[5.5rem]">
        <div className="xl:mb-5  mb-[20px] text-center xl:text-start block xl:hidden">
          <p className="xl:text-h2 text-p20-bold text-neutral">{title}</p>
        </div>
        <div className=" xl:mr-[30px] px-[16px] xl:px-0">
          <div
            id="LISTIMAGES"
            className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px] bg-white rounded-lg "
          >
            {listImages?.length === 0 && (
              <div
                className={`w-full h-full p-8 ${
                  errors?.LISTIMAGES
                    ? 'image-upload-default-border-error'
                    : 'image-upload-default-border'
                } rounded-lg`}
              >
                <div
                  onClick={() => toggleEditImage()}
                  className=" h-full w-full xl:pt-32  rounded-lg cursor-pointer flex flex-col  items-center gap-32"
                >
                  <div className=" mx-auto text-center  cursor-pointer flex flex-col justify-center items-center">
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
                    <p className="max-w-[256px]  text-center text-p18 text-grey-2 mt-4">
                      Hình ảnh được chọn không vượt quá 5MB
                    </p>
                  </div>
                </div>
              </div>
            )}
            {errors?.LISTIMAGES && (
              <p className="text-p16 leading-[28px] text-semantic-red  text-end mt-2">
                Hình ảnh bị thiếu
              </p>
            )}
            {listImages?.length > 0 && (
              <div className="relative">
                <SimpleSlider hasArrow={listImages?.length > 1}>
                  {listImages?.map((element, idx) => {
                    const { image } = element
                    const { imageUrl } = image

                    return (
                      <SwiperSlide key={`profile-company-${idx}`}>
                        <div className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px] relative rounded-[8px] overflow-hidden cursor-pointer">
                          {imageUrl && (
                            <Image
                              src={imageUrl}
                              alt={`collection-${idx}`}
                              layout="fill"
                              objectFit="cover"
                            />
                          )}
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </SimpleSlider>
                <div
                  onClick={() => toggleEditImage()}
                  className="absolute top-4 right-4 z-20 w-[56px] h-[56px] rounded-full hover:bg-button bg-white flex justify-center items-center cursor-pointer"
                >
                  <XProfileIcon name="pen" />
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="xl:ml-[30px] mt-[20px] xl:mt-[0px]   px-[16px] xl:px-0">
          <div className="mb-5 text-center xl:text-start hidden xl:block">
            <p className="text-h2 text-neutral">{title}</p>
          </div>
          <div className="mb-5 px-[12px] xl:px-0">
            <div className={`md:w-[556px] w-auto text-center xl:text-start`}>
              <div className="xl:text-p18 text-p12 text-grey-1 ">
                <TextareaAutosize
                  id="Description"
                  onChange={(e) => handleChangeDescription(e?.target?.value)}
                  value={description}
                  maxLength={400}
                  placeholder="Viết một đoạn mô tả ngắn giới thiệu chung về doanh nghiệp của bạn, tầm nhìn, sứ mệnh, lĩnh vực hoạt động,..."
                  className={`xl:text-p18 placeholder:text-grey-3  hover:border-b transition-all peer text-p12  p-2 text-grey-1 w-full min-h-[100px] custom-scrollbar-none-border appearance-none  bg-transparent outline-0 resize-none focus:border-b  focus:transition-all focus:duration-500
                  ${
                    errors?.Description
                      ? 'border-b border-semantic-red'
                      : 'hover:border-semantic focus:border-semantic'
                  }`}
                />
                {!errors?.Description && (
                  <div className="flex justify-end opacity-0 peer-focus:opacity-100">
                    <p className="text-grey-2 text-p14">
                      {400 - (description?.length || 0)}
                    </p>
                  </div>
                )}
                {errors?.Description && (
                  <p className="text-end text-p16 text-semantic-red leading-[28px]">
                    {errors?.Description && 'Không được bỏ trống'}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex gap-6   flex-wrap justify-center xl:justify-start">
            {titleMapButon && (
              <div className="relative">
                <Button
                  title={'Xem vị trí'}
                  width="w-[268px]"
                  height="h-[48px]"
                  rounded="rounded-[8px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  // onClick={() => window.open(googleMapUrlDefault)}
                />
                <div
                  onClick={() => toggleUrlMap()}
                  className="w-[56px] h-[56px] flex items-center justify-center cursor-pointer hover:bg-button absolute -top-5 -right-5 rounded-full shadow bg-white"
                >
                  <XProfileIcon name="link2" />
                </div>
              </div>
            )}
            {titleMoreButton && (
              <div className="relative">
                <Button
                  title={
                    websiteLinkTitle !== undefined
                      ? websiteLinkTitle !== ''
                        ? websiteLinkTitle
                        : websiteUrl
                      : websiteLinkTitleDefault !== ''
                      ? websiteLinkTitleDefault
                      : websiteUrl
                  }
                  width="xl:w-[268px]  w-[240px]"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                  background="bg-[#294F9B]"
                  color="text-white"
                  rounded="rounded-[8px]"
                  padding="px-4"
                  onClick={() => toggleUrlWebsite()}
                />
                <div
                  onClick={() => toggleUrlWebsite()}
                  className="w-[56px] h-[56px] flex items-center justify-center cursor-pointer hover:bg-button absolute -top-5 -right-5 rounded-full shadow bg-white"
                >
                  <XProfileIcon name="link2" />
                </div>
              </div>
            )}
          </div>
          <div className="mb-8">
            {showUrlMap && (
              <div
                className={`bg-white relative rounded-lg animate-fadeIn transition-all   before:content-[''] before:absolute before:-top-4  before:left-28 before:rotate-90 before:-translate-y-1/2 before:border-[16px] before:border-y-transparent before:border-l-transparent before:border-r-white ${
                  showUrlMap ? 'w-full h-fit p-6 mt-8' : 'w-0 h-0'
                }`}
              >
                <div className="flex items-center gap-4">
                  <label className=" text-p18 text-neutral">Link</label>
                  <input
                    ref={urlMapRef}
                    placeholder={'Nhập URL bản đồ'}
                    maxLength={255}
                    defaultValue={googleMapUrl || googleMapUrlDefault}
                    className={`xl:text-p16 p-3 rounded-lg bg-light-nude text-neutral text-p14 font-bold w-full transition-all  appearance-none `}
                  />
                </div>
                <p className="text-p16 text-semantic-red h-[24px]">
                  {errors?.GoogleMapUrl && 'Không được bỏ trống'}
                </p>
                <div className=" flex items-center justify-end gap-4">
                  <Button
                    title="Huỷ"
                    width="xl:w-[98px]"
                    height="h-[48px]"
                    textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                    background="bg-white"
                    color="text-button"
                    rounded="rounded-lg border border-button"
                    padding="px-4"
                    onClick={() => onCancelUrlMap()}
                  />
                  <Button
                    title="Lưu"
                    width="xl:w-[98px]"
                    height="h-[48px]"
                    textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                    background="bg-button"
                    color="text-[#000000]"
                    rounded="rounded-lg "
                    padding="px-4"
                    onClick={() => onSaveUrlMap()}
                  />
                </div>
              </div>
            )}
            {showUrlWebsite && (
              <div
                className={`bg-white relative rounded-lg animate-fadeIn transition-all  before:content-[''] before:absolute before:-top-4  before:right-1/3 before:rotate-90 before:-translate-y-1/2 before:border-[16px] before:border-y-transparent before:border-l-transparent before:border-r-white ${
                  showUrlWebsite ? 'w-full h-fit p-6 mt-8' : 'w-0 h-0'
                }`}
              >
                <div className=" flex items-center gap-4 mb-4 ">
                  <label className="w-[84px]  text-p18 text-neutral">
                    Tiêu đề
                  </label>
                  <input
                    ref={websiteLinkTitleRef}
                    // value={description !== 0 ? description : ''}
                    placeholder={'Nhập tiêu đề'}
                    maxLength={255}
                    defaultValue={
                      websiteLinkTitle !== undefined
                        ? websiteLinkTitle
                        : websiteLinkTitleDefault
                    }
                    className={`xl:text-p16 p-3 rounded-lg bg-light-nude text-neutral text-p14 font-bold w-full transition-all  appearance-none `}
                  />
                </div>
                <div className="flex items-center gap-4">
                  <label className="w-[84px] text-p18 text-neutral">Link</label>
                  <input
                    ref={urlWebsiteRef}
                    // value={description !== 0 ? description : ''}
                    placeholder={'Nhập URL Website'}
                    maxLength={255}
                    defaultValue={websiteUrl}
                    className={`xl:text-p16 p-3 rounded-lg bg-light-nude text-neutral text-p14 font-bold w-full transition-all  appearance-none `}
                  />
                </div>

                <p className="text-p16 text-semantic-red h-[24px]">
                  {errors?.WebsiteUrl && 'Không được bỏ trống'}
                </p>
                <div className=" flex items-center justify-end gap-4">
                  <Button
                    title="Huỷ"
                    width="xl:w-[98px]"
                    height="h-[48px]"
                    textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                    background="bg-white"
                    color="text-button"
                    rounded="rounded-lg border border-button"
                    padding="px-4"
                    onClick={() => onCancelUrlWebsite()}
                  />
                  <Button
                    title="Lưu"
                    width="xl:w-[98px]"
                    height="h-[48px]"
                    textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                    background="bg-button"
                    color="text-[#000000]"
                    rounded="rounded-lg "
                    padding="px-4"
                    onClick={() => onSaveUrlWebsite()}
                  />
                </div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-[20px] mb-5 justify-center xl:justify-start ">
            <div>
              <InformationYearItemEdit
                title={
                  distanceYear(establishDate) <= 0
                    ? 'Năm thành lập'
                    : 'Số năm thành lập'
                }
                description={establishDate}
                defaultDesc="Nhập số năm thành lập"
                selectedDate={
                  establishDate ? moment(establishDate).toDate() : new Date()
                }
                onChange={(date) => {
                  dispatch(
                    updateInformationEdit({
                      establishDate: moment(date).toISOString()
                    })
                  )
                }}
                isValidate={true}
              />
            </div>
            <div>
              <InformationItemEdit
                isEdit={isEdit}
                isOpacity={isEdit}
                title="Mức lương lên đến"
                description={convertCurrency(maxSalary || 0)}
                defaultDesc={
                  maxSalary > 0 ? convertCurrency(maxSalary || 0) : 'Thỏa thuận'
                }
                disabled={true}
              />
            </div>
            <div>
              <InformationItemEdit
                isEdit={isEdit}
                title="Số lượng nhân viên"
                description={employeeAmount || 0}
                defaultDesc="Nhập số lượng nhân viên"
                onChange={(amount) => {
                  if (amount <= 9999999) {
                    dispatch(
                      updateInformationEdit({
                        employeeAmount: amount
                      })
                    )
                  }
                }}
                min="0"
                max="9999999"
                isValidate={true}
              />
            </div>
            <div>
              <InformationItemEdit
                isEdit={isEdit}
                isOpacity={isEdit}
                title="Số vị trí đang tuyển dụng"
                description={`${recruitmentAmount || 0} vị trí`}
                // defaultDesc="Hiển thị khi có bật chiến dịch"
                defaultDesc={`${recruitmentAmount || 0} vị trí`}
                disabled={true}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
  const divMode = (
    <div>
      <div className="py-3 px-10 flex justify-end items-center "></div>
      <div className="flex justify-center flex-wrap max-w-[1140px] mx-auto  pt-[5.5rem] pb-20">
        <div className="xl:mb-5  mb-[20px] text-center xl:text-start block xl:hidden">
          <p className="xl:text-h2 text-p20-bold text-neutral">{title}</p>
        </div>
        <div className=" xl:mr-[30px] px-[16px] xl:px-0">
          <div className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px] bg-white rounded-lg  ">
            {listImages?.length === 0 && (
              <div className="p-8 w-full h-full">
                <div className=" h-full w-full xl:pt-32  rounded-lg cursor-pointer flex flex-col  items-center gap-32">
                  <div className=" mx-auto text-center  cursor-pointer flex flex-col justify-center items-center">
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
                    <p className="max-w-[256px]  text-center text-p18 text-grey-2 mt-4">
                      Hình ảnh được chọn không vượt quá 5MB
                    </p>
                  </div>
                </div>
              </div>
            )}
            {listImages?.length > 0 && (
              <SimpleSlider hasArrow={listImages?.length > 1}>
                {listImages?.map((element, idx) => {
                  const { image } = element
                  const { imageUrl, imageId } = image
                  return (
                    <SwiperSlide key={`profile-company-${idx}`}>
                      <div className="xl:w-[520px] xl:h-[589px] w-[340px] h-[184px] relative rounded-[8px] overflow-hidden cursor-pointer">
                        {imageUrl && (
                          <Image
                            src={imageUrl}
                            alt={`collection-${idx}`}
                            layout="fill"
                            objectFit="cover"
                          />
                        )}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </SimpleSlider>
            )}
          </div>
        </div>
        <div className="xl:ml-[30px] mt-[20px] xl:mt-[0px]   px-[16px] xl:px-0">
          <div className="mb-5 text-center xl:text-start hidden xl:block">
            <p className="text-h2 text-neutral">{title}</p>
          </div>
          <div className="mb-5 px-[12px] xl:px-0">
            <div className={`md:w-[556px] w-auto text-center xl:text-start`}>
              <pre
                className="xl:text-p18 text-p12 text-grey-1 whitespace-pre-wrap"
                style={{
                  wordBreak: 'break-word'
                }}
              >
                {description || ''}
              </pre>
            </div>
          </div>

          <div className="flex gap-6  mb-[32px] flex-wrap justify-center xl:justify-start">
            {titleMapButon && (
              <div>
                <Button
                  title={googleMapUrlDefault ? 'Xem vị trí' : titleMapButon}
                  width="w-[268px]"
                  height="h-[48px]"
                  rounded="rounded-[8px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  onClick={() => window.open(googleMapUrlDefault)}
                  // onClick={() => setShowUrlMap(!showUrlMap)}
                />
                <div></div>
              </div>
            )}
            {titleMoreButton && (
              <div>
                <Button
                  title={
                    (websiteLinkTitle !== undefined
                      ? websiteLinkTitle
                      : websiteLinkTitleDefault) ||
                    websiteUrl ||
                    titleMoreButton
                  }
                  width="xl:w-[268px]  w-[240px]"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                  background="bg-[#294F9B]"
                  color="text-white"
                  rounded="rounded-[8px]"
                  padding="px-4"
                  onClick={() => {
                    if (!websiteUrl.match(/^https?:\/\//i)) {
                      window.open('https://' + websiteUrl)
                    } else {
                      window.open(websiteUrl)
                    }
                  }}
                />
                <div></div>
              </div>
            )}
          </div>
          <div className="grid grid-cols-2 gap-[20px] mb-5 justify-center xl:justify-start ">
            <div>
              <InformationItemEdit
                title={
                  distanceYear(establishDate) <= 0
                    ? 'Năm thành lập'
                    : 'Số năm thành lập'
                }
                description={
                  // establishDate
                  distanceYear(establishDate) <= 0
                    ? new Date(establishDate).getFullYear()
                    : distanceYear(establishDate || 0) + ' năm'
                }
                defaultDesc="Nhập số năm thành lập"
              />
            </div>
            <div>
              <InformationItemEdit
                title="Mức lương lên đến"
                description={convertCurrency(maxSalary || 0)}
                onChange={(e) =>
                  dispatch(
                    updateInformationEdit({ averageSalary: e?.target?.value })
                  )
                }
                defaultDesc="Tính dựa trên TB mức lương"
              />
            </div>
            <div>
              <InformationItemEdit
                title="Số lượng nhân viên"
                description={`${employeeAmount || 0} người`}
                defaultDesc="Nhập số lượng nhân viên"
                onChange={(e) =>
                  dispatch(
                    updateInformationEdit({ employeeAmount: e?.target?.value })
                  )
                }
              />
            </div>
            <div>
              <InformationItemEdit
                title="Số vị trí đang tuyển dụng"
                description={`${recruitmentAmount || 0} vị trí`}
                defaultDesc="Hiển thị khi có bật chiến dịch"
                onChange={(e) =>
                  dispatch(
                    updateInformationEdit({
                      recruitmentAmount: e?.target?.value
                    })
                  )
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  useEffect(() => {
    if (companyId) {
      dispatch(
        getAllImages({
          id: companyId
        })
      )
    }
  }, [dispatch, companyId])

  return (
    <div>
      {isEdit ? editMode : divMode}
      <Modal
        childStyle="w-screen h-fit sm:w-[800px] mt-4 shadow-md  bg-white rounded-lg p-[40px]"
        open={editImage}
        toggleModal={toggleEditImage}
      >
        <InformationImageEditModal
          checkUpload={persent.onUpload}
          persent={persent.upload}
          listImages={listImages}
          handleUploadImages={handleUploadImages}
          setEditImage={setEditImage}
        />
      </Modal>
    </div>
  )
}

InformationEdit.propTypes = {}
InformationEdit.defaultProps = {}

export default InformationEdit
