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

export const SliderThumb = (props) => {
  const { list, loop, breakpoints, hasArrow } = props
  const [thumbsSwiper, setThumbsSwiper] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
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
          // height: '484px'
        }}
        loop={loop}
        spaceBetween={10}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2 xl:h-[484px] h-[174px]"
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
        onSlideChange={(swiper) => setActiveIndex(swiper?.activeIndex)}
      >
        {[...list]
          ?.sort((a, b) => (a.position > b.position ? 1 : -1))
          ?.map((item) => {
            if (item?.enumMediaType === 0) {
              return (
                <SwiperSlide key={`media-${item?.cultureMediaId}`}>
                  <div className="w-auto xl:h-[484px] h-[174px] relative rounded-[8px] overflow-hidden">
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
                <SwiperSlide key={`media-${item?.cultureMediaId}`}>
                  <video
                    src={item?.url || ''}
                    className="xl:h-[484px] h-[174px] mx-auto rounded-[8px]"
                    controls
                    poster={item?.thumbnailUrl}
                  />
                </SwiperSlide>
              )
            }
          })}
      </Swiper>
      <div className="relative w-auto xl:w-[946px] xl:px-[56px] mt-[16px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          slidesPerView="auto"
          spaceBetween={20}
          loop={loop}
          freeMode={true}
          watchSlidesProgress={true}
          breakpoints={breakpoints}
          modules={[FreeMode, Grid, Navigation, Thumbs]}
          className="mySwiperEdit3"
        >
          {[...list]
            ?.sort((a, b) => (a.position > b.position ? 1 : -1))
            ?.map((item) => {
              if (item?.enumMediaType === 0) {
                return (
                  <SwiperSlide
                    key={`media-${item?.cultureMediaId}`}
                    className="company-slide"
                  >
                    <div className=" w-full rounded-[12px] xl:h-[88px] h-[120px] relative overflow-hidden">
                      <Image
                        alt={`media-${item?.cultureMediaId}`}
                        layout="fill"
                        src={item?.thumbnailUrl || item?.url || ''}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/images/loading/loading2.png"
                      />
                    </div>
                  </SwiperSlide>
                )
              } else {
                return (
                  <SwiperSlide key={`media-${item?.cultureMediaId}`}>
                    <div className=" w-full rounded-[12px] xl:h-[88px] h-[120px] relative overflow-hidden">
                      <Image
                        alt={`media-${item?.cultureMediaId}`}
                        layout="fill"
                        src={item?.thumbnailUrl}
                        objectFit="cover"
                        placeholder="blur"
                        blurDataURL="/images/loading/loading2.png"
                      />
                    </div>
                  </SwiperSlide>
                )
              }
            })}
        </Swiper>
        {hasArrow && (
          <Fragment>
            <PreviousArrow
              prevRef={prevRef}
              className="hidden xl:block absolute z-50 left-0 top-1/2 -translate-y-1/2"
            />
            <NextArrow
              nextRef={nextRef}
              className="hidden xl:block absolute z-50 right-0 top-1/2 -translate-y-1/2"
            />
          </Fragment>
        )}
      </div>
      <div
        style={{
          wordBreak: 'break-word'
        }}
        className="mt-6 xl:px-[56px] xl:h-[56px] "
      >
        <p className="xl:text-p18 text-p12 text-grey-1">
          {list[activeIndex]?.description || ''}
        </p>
      </div>
    </Fragment>
  )
}

SliderThumb.propTypes = {
  list: PropTypes.array,
  loop: PropTypes.bool,
  breakpoints: PropTypes.any,
  hasArrow: PropTypes.bool
}

SliderThumb.defaultProps = {
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
