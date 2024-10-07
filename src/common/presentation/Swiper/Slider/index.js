import React, { useRef } from 'react'
import { Swiper } from 'swiper/react'
import PropTypes from 'prop-types'
import { Grid, Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/grid'
import { NextArrow, PreviousArrow } from '../Arrows'

export const Slider = (props) => {
  const {
    children,
    loop,
    breakpoints,
    spaceBetween,
    hasArrow,
    hasShadow,
    initialIndex,
    hidePrev,
    hideNext,
    arrowStyle,
    rewind,
    handleSlideChange,
    maxBackfaceHiddenSlides,
    classNameLeft = 'absolute z-50 -left-[50px] top-1/2 -translate-y-1/2',
    classNameRight = 'absolute z-50 -right-[50px] top-1/2 -translate-y-1/2',
    classNameLeftMobile = 'absolute z-50 -left-[30px] top-1/2 -translate-y-1/2',
    classNameRightMobile = 'absolute z-50 -right-[30px] top-1/2 -translate-y-1/2',
    stylePrev = 'bg-white p-2',
    stylePrevMobile = 'bg-transparent',
    stroke = 'black',
    strokeMobile = '#999999',

    classNameSwiper,
    hasArrowMobile,
    arrowStyleMobile
  } = props

  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="relative">
      {hasArrow && (
        <div className={arrowStyle}>
          {!hidePrev && (
            <PreviousArrow
              className={classNameLeft}
              prevRef={prevRef}
              hasShadow={hasShadow}
              stylePrev={stylePrev}
              stroke={stroke}
            />
          )}
          {!hideNext && (
            <NextArrow
              className={classNameRight}
              nextRef={nextRef}
              hasShadow={hasShadow}
              stylePrev={stylePrev}
              stroke={stroke}
            />
          )}
        </div>
      )}
      {hasArrowMobile && (
        <div className={arrowStyleMobile}>
          {!hidePrev && (
            <PreviousArrow
              className={classNameLeftMobile}
              prevRef={prevRef}
              hasShadow={false}
              stylePrev={stylePrevMobile}
              stroke={strokeMobile}
            />
          )}
          {!hideNext && (
            <NextArrow
              className={classNameRightMobile}
              nextRef={nextRef}
              hasShadow={false}
              stylePrev={stylePrevMobile}
              stroke={strokeMobile}
            />
          )}
        </div>
      )}
      <Swiper
        // key={initialIndex}
        className={classNameSwiper}
        slidesPerView="auto"
        spaceBetween={spaceBetween}
        loop={loop}
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
        initialSlide={initialIndex?.toString()}
        // observer={true}
        breakpoints={breakpoints}
        modules={[Grid, Navigation]}
        updateOnWindowResize={true}
        longSwipesRatio={0.3}
        longSwipesMs={50}
        shortSwipes={false}
        rewind={rewind}
        maxBackfaceHiddenSlides={maxBackfaceHiddenSlides}
        onSlideChange={handleSlideChange}
      >
        {children}
      </Swiper>
    </div>
  )
}

Slider.propTypes = {
  children: PropTypes.node,
  loop: PropTypes.bool,
  breakpoints: PropTypes.any,
  spaceBetween: PropTypes.number,
  hasArrow: PropTypes.bool,
  hasShadow: PropTypes.bool,
  initialIndex: PropTypes.number || null,
  hidePrev: PropTypes.bool,
  hideNext: PropTypes.bool,
  arrowStyle: PropTypes.string,
  arrowStyleMobile: PropTypes.string,

  rewind: PropTypes.bool,
  hasArrowMobile: PropTypes.bool
}

Slider.defaultProps = {
  classNameSwiper: 'slide-rounded',
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
  spaceBetween: 20,
  hasArrow: false,
  hasShadow: true,
  initialIndex: null,
  hidePrev: false,
  hideNext: false,
  arrowStyle: 'hidden xl:block',
  arrowStyleMobile: 'block sm:hidden',
  rewind: true,
  maxBackfaceHiddenSlides: 0,
  handleSlideChange: () => {},
  hasArrowMobile: false
}
