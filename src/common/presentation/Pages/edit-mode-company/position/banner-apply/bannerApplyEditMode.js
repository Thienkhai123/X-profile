import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import PropressBar from 'common/presentation/ProgressBar'

const BannerApplyEditMode = (props) => {
  const {
    title,
    titleDay,
    titleButton,
    profile = {},
    showApply = false,
    onChangeImageUpload = () => {},
    handleRemoveItem = () => {},
    persent,
    checkUpload
  } = props
  const { meta, applyBannerUrl, name } = profile || {}
  const { applyBannerUrl: applyBannerUrlDefault } = meta || {}
  const inputRef = useRef(null)
  return (
    <div>
      {!applyBannerUrl && applyBannerUrlDefault === null ? (
        <div className="xl:w-[1140px] relative xl:flex justify-end bg-button rounded-default overflow-hidden">
          <input
            ref={inputRef}
            id="input-file-banner"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => onChangeImageUpload(e.target.files)}
          />
          <div className="absolute right-6 top-6 flex gap-4 z-50">
            <div
              onClick={() => inputRef?.current?.click()}
              className=" w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
            >
              {!(checkUpload && persent <= 100) && <XProfileIcon name="pen" />}
              {checkUpload && persent <= 100 && (
                <div className="w-full mx-[8px]">
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

            <div
              onClick={() => handleRemoveItem()}
              className=" w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
            >
              <XProfileIcon name="trash" stroke="#000000" />
            </div>
          </div>
          <div></div>
          <div className="flex items-end justify-end sm:hidden pt-[52px]">
            <Image
              width={516.92}
              height={233}
              src="/images/contentProfile.png"
              alt=""
            />
          </div>
          <div className="pt-[45px] pb-[47px] flex flex-col justify-between px-5 xl:px-0">
            <div className="text-center max-w-[543px] mb-[26px]">
              <p className="text-white sm:text-h3 text-p16-bold">
                {title}
                <span className="text-white"> {name} </span>
                {titleDay}
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                title={titleButton}
                width="w-[180px]"
                height="h-[52px]"
                background="bg-blue-light"
                color="text-white"
                rounded="rounded-borderStep"
                textWeight="text-p14 font-bold sm:text-p18-bold"
                // onClick={() => handleApply()}
              />
            </div>
          </div>
          <div className="hidden sm:flex items-end justify-end">
            <Image
              width={516.92}
              height={233}
              src="/images/contentProfile.png"
              alt=""
            />
          </div>
        </div>
      ) : (
        <div>
          {(applyBannerUrl === '' && applyBannerUrlDefault === '') ||
          (applyBannerUrlDefault === '' && !applyBannerUrl) ? (
            <label
              htmlFor="input-file-banner"
              className="cursor-pointer xl:w-[1140px] xl:flex justify-center bg-white  border-dashed border-2 rounded-default overflow-hidden"
            >
              <input
                ref={inputRef}
                id="input-file-banner"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => onChangeImageUpload(e.target.files)}
              />
              <label
                htmlFor="input-file-banner"
                className="cursor-pointer flex flex-col items-center justify-center  py-[52px]"
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
                <div className="text-center mt-4">
                  <p className="text-h3 font-bold text-button">Thêm banner</p>
                  <p className="text-p18">hoặc kéo và thả</p>
                </div>
              </label>
            </label>
          ) : (
            <div
              style={{
                background: `${`url('${
                  applyBannerUrl || applyBannerUrlDefault
                }') center center / cover no-repeat`}`
              }}
              className="xl:w-[1140px]   rounded-default  overflow-hidden relative "
            >
              <div className="pl-12 w-full h-full xl:flex justify-start bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
                <input
                  ref={inputRef}
                  id="input-file-banner"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onChangeImageUpload(e.target.files)}
                />
                <div className="absolute right-6 top-6 flex gap-4 z-50">
                  <div
                    onClick={() => inputRef?.current?.click()}
                    className=" w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
                  >
                    {!(checkUpload && persent <= 100) && (
                      <XProfileIcon name="pen" />
                    )}
                    {checkUpload && persent <= 100 && (
                      <div className="w-full mx-[8px]">
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
                  <div
                    onClick={() => handleRemoveItem()}
                    className=" w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
                  >
                    <XProfileIcon name="trash" stroke="#000000" />
                  </div>
                </div>
                <div className="pt-[45px] pb-[47px] flex flex-col justify-between px-5 xl:px-0 ">
                  <div className="text-center max-w-[543px] mb-[26px]">
                    <p className="text-white sm:text-h3 text-p16-bold">
                      {title}
                      <span className="text-white"> {name} </span>
                      {titleDay}
                    </p>
                  </div>
                  <div className="flex justify-center">
                    <Button
                      title={titleButton}
                      width="w-[180px]"
                      height="h-[52px]"
                      background="bg-blue-light"
                      color="text-white"
                      rounded="rounded-borderStep"
                      textWeight="text-p14 font-bold sm:text-p18-bold"
                      // onClick={() => handleApply()}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

BannerApplyEditMode.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  titleButton: PropTypes.string,
  titleDay: PropTypes.string,
  submitApplyContent: PropTypes.func
}
BannerApplyEditMode.defaultProps = {
  title: 'Bạn quan tâm đến vị trí này? Ứng tuyển vào  ',
  name: 'VNG Corporation',
  titleButton: 'Ứng tuyển ngay',
  titleDay: 'ngay hôm nay'
}

export default BannerApplyEditMode
