import React, { useRef } from 'react'
import { Swiper } from 'swiper/react'
import PropTypes from 'prop-types'
import { Navigation } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'
import { NextArrow, PreviousArrow } from '../Arrows'

export const SimpleSlider = (props) => {
  const { children, loop, hasArrow, breakpoints } = props
  const prevRef = useRef(null)
  const nextRef = useRef(null)

  return (
    <div className="relative">
      <Swiper
        loop={loop}
        slidesPerView="auto"
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
        breakpoints={breakpoints}
        modules={[Navigation]}
        className="slide-rounded"
      >
        {children}
      </Swiper>
      {hasArrow && (
        <div className="hidden xl:block">
          <PreviousArrow
            prevRef={prevRef}
            className="absolute z-50 left-[24px] top-1/2 -translate-y-1/2"
            stylePrev="bg-[#00000066] w-[56px] h-[56px] flex  items-center justify-center"
            stroke="white"
          />
          <NextArrow
            nextRef={nextRef}
            className="absolute z-50 right-[24px] top-1/2 -translate-y-1/2 "
            stylePrev="bg-[#00000066] w-[56px] h-[56px] flex  items-center justify-center"
            stroke="white"
          />
        </div>
      )}
    </div>
  )
}

SimpleSlider.propTypes = {
  children: PropTypes.node,
  loop: PropTypes.bool,
  hasArrow: PropTypes.bool,
  breakpoints: PropTypes.object
}

SimpleSlider.defaultProps = {
  loop: false,
  hasArrow: false,
  breakpoints: {
    330: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    1100: {
      slidesPerView: 1,
      slidesPerGroup: 1
    },
    1280: {
      slidesPerView: 1,
      slidesPerGroup: 1
    }
  }
}
