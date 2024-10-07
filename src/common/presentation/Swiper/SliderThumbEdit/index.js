import React, { Fragment, useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import PropTypes from 'prop-types'
import { FreeMode, Grid, Navigation, Thumbs } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import { NextArrow, PreviousArrow } from '../Arrows'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import TextareaAutosize from 'react-textarea-autosize'
import PropressBar from 'common/presentation/ProgressBar'

export const SliderThumbEdit = (props) => {
  const {
    list,
    loop,
    breakpoints,
    hasArrow,
    handleUploadImage = () => {},
    handleChangeRemove = () => {},
    onChangeEdit = () => {},
    errorText = '',
    persent = 0,
    checkUpload = false
  } = props
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [hover, setHover] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isLastSlide, setIsLastSlide] = useState(false)

  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [firstLoading, setFirstLoading] = useState(false)

  useEffect(() => {
    if (!firstLoading) {
      if (typeof window !== 'undefined') {
        document
          .getElementsByClassName('company-slide')[0]
          ?.classList?.add('swiper-slide-thumb-active')
      }
      setFirstLoading(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  })
  return (
    <Fragment>
      <Swiper
        style={{
          '--swiper-navigation-color': '#fff',
          '--swiper-pagination-color': '#fff'
          // height: '532px'
        }}
        loop={loop}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 "
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current
        }}
        onBeforeInit={(Swiper) => {
          if (typeof Swiper.params.navigation !== 'boolean') {
            const navigation = Swiper.params.navigation
            if (navigation) {
              navigation.prevEl = prevRef?.current
              navigation.nextEl = nextRef?.current
            }
          }
        }}
        initialSlide={activeIndex}
        onSlideChange={(swiper) => {
          setActiveIndex(swiper?.activeIndex), setIsLastSlide(swiper?.isEnd)
        }}
      >
        {[...list]?.sort((a, b) => (a.position > b.position ? 1 : -1))?.length >
        0 ? (
          <Fragment>
            {list.map((item, ind) => {
              if (item?.enumMediaType === 0) {
                return (
                  <SwiperSlide key={`media-${item?.cultureMediaId}-${ind}`}>
                    <div className="w-auto xl:h-[532px] h-[174px] relative rounded-[8px] overflow-hidden">
                      <Image
                        alt={`media-${item?.cultureMediaId}`}
                        layout="fill"
                        src={item?.url || ''}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/images/loading/loading2.png"
                      />
                    </div>
                  </SwiperSlide>
                )
              } else {
                return (
                  <SwiperSlide key={`media-${item?.cultureMediaId}-${ind}`}>
                    <video
                      src={item?.url || ''}
                      className="xl:h-[532px] h-[174px] mx-auto rounded-[8px]"
                      controls
                      poster={item?.thumbnailUrl}
                    />
                  </SwiperSlide>
                )
              }
            })}
            <SwiperSlide key={`media-add`}>
              <div
                onClick={() => handleUploadImage()}
                className={`w-auto cursor-pointer xl:h-[532px] h-[174px] flex items-center justify-center relative   overflow-hidden
              ${
                errorText
                  ? 'image-upload-default-border-error'
                  : 'border border-grey-2 border-dashed rounded-2xl hover:border-button'
              }`}
              >
                <div className="max-w-[265px] flex flex-col items-center text-center">
                  <div className="w-[80px] h-[80px] relative">
                    <Image
                      alt={``}
                      layout="fill"
                      src={'/images/uploadAvatarEdit.png'}
                      objectFit="cover"
                      placeholder="blur"
                      blurDataURL="/images/loading/loading2.png"
                    />
                  </div>
                  <p className="text-button text-h3 font-bold mt-4">
                    Thêm ảnh/video
                  </p>
                  <p className="text-neutral text-p18 mt-2">hoặc kéo và thả</p>
                  <p className="text-grey-2 text-p18 mt-4">
                    Hình ảnh được chọn không vượt quá 5MB
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </Fragment>
        ) : (
          <SwiperSlide key={`media-add`}>
            <div
              onClick={() => handleUploadImage()}
              className={`w-auto cursor-pointer xl:h-[532px] h-[174px] flex items-center justify-center   relative   overflow-hidden
              ${
                errorText
                  ? 'image-upload-default-border-error'
                  : 'border border-grey-2 border-dashed rounded-2xl hover:border-button mb-4'
              }`}
            >
              <div className="max-w-[265px] flex flex-col items-center text-center">
                <div className="w-[80px] h-[80px] relative">
                  <Image
                    alt={``}
                    layout="fill"
                    src={'/images/uploadAvatarEdit.png'}
                    objectFit="cover"
                    placeholder="blur"
                    blurDataURL="/images/loading/loading2.png"
                  />
                </div>
                <p className="text-button text-h3 font-bold mt-4">
                  Thêm ảnh/video
                </p>
                <p className="text-neutral text-p18 mt-2">hoặc kéo và thả</p>
                <p className="text-grey-2 text-p18 mt-4">
                  Hình ảnh được chọn không vượt quá 5MB
                </p>
              </div>
            </div>
          </SwiperSlide>
        )}
      </Swiper>
      {errorText && (
        <p className="text-p16 leading-[28px] text-semantic-red le text-end mt-2">
          Hình ảnh bị thiếu, hãy thêm ít nhất một hình ảnh
        </p>
      )}

      <div className="relative w-auto xl:w-[946px]  ">
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          spaceBetween={20}
          loop={loop}
          freeMode={true}
          grid={{
            rows: 2,
            fill: 'row'
          }}
          initialSlide={activeIndex}
          watchSlidesProgress={true}
          breakpoints={breakpoints}
          modules={[FreeMode, Grid, Navigation, Thumbs]}
          className="mySwiperEdit3 !px-[56px] mt-[20px]"
        >
          {[...list]?.sort((a, b) => (a.position > b.position ? 1 : -1))
            ?.length > 0 ? (
            <Fragment>
              {list?.map((item, index) => {
                if (item?.enumMediaType === 0) {
                  return (
                    <SwiperSlide
                      key={`media-${item?.cultureMediaId}-${index}`}
                      className={`company-slide ${
                        index > 4 ? 'pt-0' : 'pt-[20px]'
                      }`}
                    >
                      <div className="relative w-full group rounded-[12px] xl:h-[83px] h-[120px] ">
                        <div className="absolute -right-5 -top-5 z-50 flex items-center justify-center rounded-full transition-all ease-out duration-700 bg-white shadow opacity-0 group-hover:opacity-100">
                          <div
                            onClick={() => {
                              handleChangeRemove(index)
                            }}
                            className="gap-2 rounded-full w-[40px] h-[40px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
                          >
                            <XProfileIcon name="trash" stroke="#000000" />
                          </div>
                        </div>
                        <div className="w-full h-full relative overflow-hidden rounded-lg">
                          <Image
                            alt={`media-${item?.cultureMediaId}`}
                            layout="fill"
                            src={item?.thumbnailUrl || item?.url || ''}
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL="/images/loading/loading2.png"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                } else {
                  return (
                    <SwiperSlide
                      key={`media-${item?.cultureMediaId}-${index}`}
                      className={`company-slide ${
                        index > 4 ? 'pt-0' : 'pt-[16px]'
                      }`}
                    >
                      <div className="relative w-full group rounded-[12px] xl:h-[88px] h-[120px]">
                        <div className="absolute -right-5 -top-5 z-50 flex items-center justify-center rounded-full transition-all ease-out duration-700 bg-white shadow opacity-0 group-hover:opacity-100">
                          <div
                            onClick={() => handleChangeRemove(index)}
                            className="gap-2 rounded-full w-[40px] h-[40px] hover:bg-button flex items-center justify-center p-2 cursor-pointer"
                          >
                            <XProfileIcon name="trash" stroke="#000000" />
                          </div>
                        </div>
                        <div className=" w-full h-full relative rounded-lg overflow-hidden  ">
                          <Image
                            alt={`media-${item?.cultureMediaId}`}
                            layout="fill"
                            src={item?.thumbnailUrl || ''}
                            objectFit="cover"
                            placeholder="blur"
                            blurDataURL="/images/loading/loading2.png"
                          />
                        </div>
                      </div>
                    </SwiperSlide>
                  )
                }
              })}
              {list?.length < 10 && (
                <SwiperSlide
                  key={`media-child-add`}
                  className={`flex items-center justify-center ${
                    list?.length > 4 ? 'pt-0' : 'pt-[16px]'
                  }`}
                  onMouseLeave={() => {
                    setHover(false)
                  }}
                  onMouseMove={() => {
                    setHover(true)
                  }}
                >
                  <div
                    onClick={() => {
                      if (!checkUpload && !(persent > 0 && persent <= 100)) {
                        handleUploadImage()
                      }
                    }}
                    className={`w-[148px] rounded-[12px] xl:h-[83px] h-[120px] cursor-pointer flex items-center justify-center  relative overflow-hidden ${
                      hover
                        ? 'border-custom-img-company-yellow'
                        : 'border-custom-img-company'
                    } `}
                  >
                    <div className="flex flex-col items-center justify-center w-full px-[20px]">
                      {!checkUpload && !(persent > 0 && persent <= 100) && (
                        <XProfileIcon
                          name="addThumb"
                          width="32"
                          height="32"
                          fill={hover ? '#F6BB3A' : '#999'}
                        />
                      )}
                      {checkUpload && persent <= 100 && (
                        <div className="w-full">
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
                  </div>
                </SwiperSlide>
              )}
            </Fragment>
          ) : (
            <div
              key={`media-child-add`}
              onClick={() => handleUploadImage()}
              className=" flex items-center justify-center"
            >
              <div
                onMouseLeave={() => setHover(false)}
                onMouseMove={() => setHover(true)}
                className={`w-[148px] rounded-[12px] xl:h-[83px] h-[120px] cursor-pointer flex items-center justify-center   relative overflow-hidden  ${
                  hover
                    ? 'border-custom-img-company-yellow'
                    : 'border-custom-img-company'
                }`}
              >
                <XProfileIcon
                  name="add"
                  width="32"
                  height="32"
                  stroke={hover ? '#F6BB3A' : '#999'}
                />
              </div>
            </div>
          )}
        </Swiper>
        {/* {hasArrow && (
          <Fragment>
            <PreviousArrow
              prevRef={prevRef}
              className="hidden xl:block absolute z-50 left-0 top-1/2 "
            />

            <NextArrow
              nextRef={nextRef}
              className="hidden xl:block absolute z-50 right-0 top-1/2"
            />
          </Fragment>
        )} */}
      </div>
      <div className="mt-6 xl:px-[56px] ">
        {list?.length === 0 ||
        (isLastSlide && !list[activeIndex]?.url) ||
        !list[activeIndex]?.url ? (
          <div></div>
        ) : (
          <div>
            <TextareaAutosize
              className={`text-p18 placeholder:text-grey-3 peer hover:border-semantic hover:border-b transition-all text-grey-1 w-full py-4 outline-0 resize-none focus:border-b focus:border-semantic focus:transition-all focus:duration-500 custom-scrollbar-none-border bg-transparent
        ${
          // errors?.Description
          //   ? 'border-b border-semantic-red'
          //   : 'border-b border-transparent'
          ''
        }`}
              maxLength={180}
              defaultValue={list[activeIndex]?.description || ''}
              value={list[activeIndex]?.description || ''}
              placeholder="Viết một đoạn mô tả ngắn về hình ảnh"
              rows={2}
              onChange={(e) =>
                onChangeEdit({
                  ...list[activeIndex],
                  id: activeIndex,
                  description: e?.target?.value
                })
              }
            />
            <p className="opacity-0 peer-focus:opacity-100 transition-all duration-100 text-grey-2 text-p14 text-end">
              {180 - (list[activeIndex]?.description?.length || 0)}
            </p>
          </div>
        )}
      </div>
    </Fragment>
  )
}

SliderThumbEdit.propTypes = {
  list: PropTypes.array,
  loop: PropTypes.bool,
  breakpoints: PropTypes.any,
  hasArrow: PropTypes.bool
}

SliderThumbEdit.defaultProps = {
  list: [],
  loop: false,
  breakpoints: {
    330: {
      slidesPerView: 1,
      slidesPerGroup: 1,
      grid: { rows: 1, fill: 'row' }
    },
    1100: {
      slidesPerView: 2,
      slidesPerGroup: 2,
      grid: { rows: 2, fill: 'row' }
    },
    1280: {
      slidesPerView: 3,
      slidesPerGroup: 3,
      grid: { rows: 2, fill: 'row' }
    }
  },
  hasArrow: false
}
