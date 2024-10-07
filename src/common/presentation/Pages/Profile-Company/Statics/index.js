import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SkeletonText from 'common/presentation/Skeleton/SkeletonText'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
import { Grid, Navigation } from 'swiper'

const Statics = (props) => {
  const {
    highlight,
    highlightTitle,
    activeIndex,
    swiperRef,
    prevRef,
    nextRef
  } = props
  // if (Object?.keys(setting)?.length === 0) {
  //   return (
  //     <div className="grid sm:grid-cols-3 gap-[21px]">
  //       {[0, 1, 2].map((index) => (
  //         <div key={index} className="flex flex-col gap-[12px]">
  //           <SkeletonText width="w-[30vw]" height="h-[48px]" />
  //           <SkeletonText width="w-[30vw]" height="h-[28px]" />
  //         </div>
  //       ))}
  //     </div>
  //   )
  // }

  return (
    <div>
      <p className="xl:text-h2 text-p20-bold text-center mb-10 ">
        {highlightTitle || 'Thành tích nổi bật'}
      </p>
      <div className="relative xl:max-w-[1140px] w-screen px-0">
        {highlight?.length > 3 && (
          <div className="hidden xl:block">
            <PreviousArrow prevRef={prevRef} hasShadow={true} />
            <NextArrow nextRef={nextRef} hasShadow={true} />
          </div>
        )}
        <Swiper
          ref={swiperRef}
          breakpoints={{
            330: {
              slidesPerView: 1.8,
              slidesPerGroup: 1,
              centeredSlides: true
            },
            800: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            1100: {
              slidesPerView: 2,
              slidesPerGroup: 2
            },
            1280: {
              slidesPerView: 3,
              slidesPerGroup: 1
            }
          }}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current
          }}
          modules={[Grid, Navigation]}
          initialSlide={activeIndex}
        >
          {highlight?.map((item, idx) => {
            const { content, imageId, imageUrl, title } = item
            const isActive = content !== '' && imageUrl !== ''
            return (
              <SwiperSlide key={`highlight-${idx}`}>
                {isActive && (
                  <div key={idx} className="xl:mb-0">
                    <div className="flex justify-center mb-3">
                      <div className="text-center xl:w-[366px] w-[324px]">
                        {window.innerWidth >= 1280 ? (
                          <Image
                            src={imageUrl || '/images/2.png'}
                            width={100}
                            height={100}
                            objectFit="contain"
                            alt=""
                          />
                        ) : (
                          <Image
                            src={imageUrl || '/images/2.png'}
                            width={68}
                            height={68}
                            objectFit="contain"
                            alt=""
                          />
                        )}
                      </div>
                    </div>
                    <div className="flex justify-center mb-3">
                      <div className="text-center w-[366px]">
                        <p className="xl:text-h1 text-p20-bold text-blue-light">
                          {content || ''}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <div className="text-center w-[366px]">
                        <p className="xl:text-p18 text-p12 text-grey-1">
                          {title || ''}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
      {/* <div
        className={`grid lg:grid-cols-${highlight?.length} md:grid-cols-${
          highlight?.length - highlight?.length + 2
        } grid-cols-${
          highlight?.length - highlight?.length + 1
        }  justify-between xl:w-[1140px] max-w-[1140px] gap-[20px]`}
      >
        {highlight?.map((item, idx) => {
          const { content, imageId, imageUrl, title } = item
          const isActive = content !== '' && imageUrl !== ''
          return (
            <div key={idx}>
              {isActive && (
                <div key={idx} className="xl:mb-0">
                  <div className="flex justify-center mb-3">
                    <div className="text-center xl:w-[366px] w-[324px]">
                      {window.innerWidth >= 1280 ? (
                        <Image
                          src={imageUrl || '/images/2.png'}
                          width={100}
                          height={100}
                          objectFit="contain"
                          alt=""
                        />
                      ) : (
                        <Image
                          src={imageUrl || '/images/2.png'}
                          width={68}
                          height={68}
                          objectFit="contain"
                          alt=""
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="text-center w-[366px]">
                      <p className="xl:text-h1 text-p20-bold text-blue-light">
                        {content || ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="text-center w-[366px]">
                      <p className="xl:text-p18 text-p12 text-grey-1">
                        {title || ''}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div> */}
    </div>
  )
}

Statics.propTypes = {
  setting: PropTypes.array
}

Statics.defaultProps = {
  setting: []
}

export default Statics
