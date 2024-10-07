import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import { useDispatch } from 'react-redux'
import { updateFooterEdit } from 'store/app/edit-mode-company/profile/footerSlice'
import { Divider } from 'common/presentation/Divider'
import ButtonIcon from 'common/presentation/ButtonIcon'
import isEmpty from 'lodash/isEmpty'
import AddresBookWrapper from 'common/container/Footer/AddresBookWrapper'

const FOOTERICONS = {
  facebook: 'socialFacebook',
  youtube: 'socialYoutube',
  linkedin: 'socialLinkedIn',
  instagram: 'socialInstagram',
  tiktok: 'socialTiktok'
}

const FooterEditMode = (props) => {
  const {
    footerProfile,
    layoutFirst,
    alt,
    layoutSecond,
    FOOTER_PROFILE,
    onChangeFooterCompany,
    toggleModal = () => {},
    errors = '',
    handleResetErrors = () => {},
    toggleModalListAddress = () => {},
    addressBooks
  } = props
  const { address, meta = {}, avatarUrl: src } = footerProfile || {}
  const { contactEmail, contactPhone1, contactPhone2, socials } = meta
  const { titlePhone, titleAddress, titleEmail } = FOOTER_PROFILE
  return (
    <Fragment>
      <div className="bg-white flex justify-center">
        <div className="flex w-[94vw] relative">
          <div className="pb-[20px] pt-[8px] pl-[21px] absolute sm:bottom-0 left-0 top-0">
            <Image width={97.38} height={99} src={layoutFirst} alt="" />
          </div>
          <div className="sm:flex sm:justify-center w-full px-[20px] sm:px-0 z-[1]">
            <div className="md:flex  items-start  xl:justify-start sm:justify-around justify-center xl:w-[1140px] sm:w-full pb-[20px] pt-[8px] relative">
              <div
                style={{
                  filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
                }}
                onClick={toggleModalListAddress}
                className="absolute z-10 right-0 w-14 h-14 rounded-full flex cursor-pointer hover:bg-button duration-200 items-center justify-center border border-nude bg-white "
              >
                <XProfileIcon name="pen" stroke="#000000" />
              </div>
              <div className="flex justify-center items-center md:justify-start sm:w-auto w-full  ">
                <div className=" mb-5 md:mb-0 xl:w-[208px] w-[100px] h-[102px]">
                  {src && (
                    <div>
                      <div className="hidden sm:block">
                        <Image
                          width={100}
                          height={102}
                          src={src}
                          alt={alt}
                          className="rounded-full"
                          quality={100}
                          objectFit="cover"
                        />
                      </div>
                      <div className="block sm:hidden">
                        <Image
                          width={97}
                          height={99}
                          src={src}
                          className="rounded-full"
                          alt={alt}
                          quality={100}
                          objectFit="cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {addressBooks && addressBooks?.length === 1 && (
                <>
                  <div className="xl:w-[780px] xl:flex xl:flex-wrap xl:justify-between xl:pt-[25px]">
                    <div className="flex items-start justify-start mb-5 md:mb-0">
                      <XProfileIcon
                        name="mapPoint"
                        fill="#333333"
                        width="20"
                        height="20"
                      />
                      <div className="max-w-[241px] ml-[12px] text-start">
                        <p className="mb-[8px] text-p16-bold text-neutral">
                          {titleAddress}
                        </p>
                        <p className="sm:text-p16 text-p12 text-neutral">
                          {`${addressBooks[0]?.addressDetail}, ${addressBooks[0]?.wardName}, ${addressBooks[0]?.districtName}, ${addressBooks[0]?.cityName}`}
                        </p>
                      </div>
                    </div>
                    {addressBooks[0]?.phone && (
                      <div className="flex justify-start mb-5 md:mb-0">
                        <XProfileIcon name="telePhone" />
                        <div className="max-w-[241px] ml-[12px]">
                          <p className="mb-[8px] text-p16-bold text-neutral">
                            {titlePhone}
                          </p>
                          <p className="sm:text-p16 text-p12 text-neutral">
                            {`${addressBooks[0]?.phone}`}
                          </p>
                        </div>
                      </div>
                    )}
                    {addressBooks[0]?.email && (
                      <div className="flex  justify-start mb-5 md:mb-0">
                        <XProfileIcon name="letter" fill="black" />
                        <div className="max-w-[241px] ml-[12px]">
                          <p className="mb-[8px] text-p16-bold text-neutral">
                            {titleEmail}
                          </p>
                          <p className="sm:text-p16 text-p12 text-neutral line-clamp-1">
                            {`${addressBooks[0]?.email}`}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </>
              )}
              {addressBooks?.length >= 2 && (
                <>
                  <div className="xl:w-[904px] mb-16 xl:flex xl:flex-col xl:items-center gap-6 xl:justify-center xl:pt-[25px]">
                    <AddresBookWrapper addressBooks={addressBooks} />
                  </div>
                </>
              )}

              {isEmpty(addressBooks) && (
                <>
                  <div className="xl:w-[904px] xl:flex xl:flex-col xl:items-center gap-6 xl:justify-center xl:pt-[25px]">
                    <p className="text-p18 text-neutral opacity-80">
                      Hãy tạo sổ địa chỉ cho công ty của bạn nhé
                    </p>
                    <ButtonIcon
                      title="Thêm địa chỉ"
                      padding="sm:p-[13px_32px] "
                      margin="m-0"
                      background="bg-button"
                      gap="gap-2"
                      color="text-black"
                      textWeight="sm:text-p18-bold text-p14 font-bold"
                      rounded="rounded-[8px]"
                      // height="h-auto"
                      type="button"
                      width="w-auto"
                      iconName="add"
                      iconStroke="#000"
                      size="1.3"
                      onClick={toggleModalListAddress}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
          {/* <div className=" absolute right-0 bottom-0">
            <div className="hidden sm:block">
              <Image
                width={251}
                height={123}
                src={layoutSecond}
                alt=""
                quality={100}
              />
            </div>
            <div className="block sm:hidden">
              <Image
                width={198}
                height={97}
                src={layoutSecond}
                alt=""
                quality={100}
              />
            </div>
          </div> */}
        </div>
      </div>

      <Divider />
      <div className="flex justify-end mt-10">
        <div className="flex gap-6">
          {socials &&
            socials?.length > 0 &&
            socials?.map((icon, ind) => (
              <div key={ind} onClick={toggleModal}>
                <XProfileIcon
                  name={FOOTERICONS[icon?.type]}
                  fill={icon?.url ? '#000000' : '#CCCCCC'}
                />
              </div>
            ))}
          {(!socials || socials?.length === 0) &&
            Object.values(FOOTERICONS)?.map((icon, ind) => (
              <div key={ind} onClick={toggleModal}>
                <XProfileIcon name={icon} fill="#CCCCCC" />
              </div>
            ))}
        </div>
      </div>
    </Fragment>
  )
}

FooterEditMode.propTypes = {}
FooterEditMode.defaultProps = {
  src: '',
  alt: '',
  address: '',
  srcAddress: '/images/address_default.png',
  firstPhone: '',
  secondPhone: '',
  email: '',
  wardName: '',
  districtName: '',
  cityName: '',
  titleAddress: 'Address',
  titlePhone: 'Phone',
  titleEmail: 'Email',
  layoutFirst: '/images/layout_Footer_profile.png',
  layoutSecond: '/images/layout_Right_Footer_profile.png'
}

export default FooterEditMode
