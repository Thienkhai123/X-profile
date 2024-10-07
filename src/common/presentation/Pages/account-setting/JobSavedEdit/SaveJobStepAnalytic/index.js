import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from 'common/presentation/Icons'

const SaveJobStepAnalytic = (props) => {
  const {
    SETTING_STEP,
    handleChoose,
    choosedStepId,
    slideId,
    styleEleText = 'text-p14',
    breakpoints,
    marginBottom = 'mb-4'
  } = props

  return (
    <div
      className={`w-full border-b-2   h-full md:h-16  px-[20px] sm:px-0  flex flex-wrap md:flex-nowrap  md:justify-center md:items-center bg-white shadow-none bg-transparent mt-[24px] ${marginBottom}`}
    >
      <div className="w-full xl:max-w-[80vw] mx-auto">
        <Slider
          breakpoints={breakpoints}
          hasArrow={SETTING_STEP?.length > 5}
          hasShadow={false}
          initialIndex={slideId}
        >
          {SETTING_STEP?.map((element, index) => {
            const { title, id, icon, logoSVG } = element
            return (
              <SwiperSlide key={index}>
                <div
                  className={`${
                    choosedStepId === element.id
                      ? 'border-b-2  duration-100 border-blue-light'
                      : 'border-b-2 border-transparent duration-100 '
                  }`}
                >
                  <button
                    onClick={() => handleChoose(id)}
                    className="flex items-center py-[18px]"
                    style={{ margin: '0 auto' }}
                  >
                    <div className="text-center ">
                      <p
                        className={`${styleEleText} ${
                          choosedStepId === element.id
                            ? 'text-blue-light text-p12-bold xl:text-p18'
                            : 'text-grey-1 text-p12 xl:text-p18'
                        }`}
                      >
                        {title}
                      </p>
                    </div>
                  </button>
                </div>
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

SaveJobStepAnalytic.propTypes = {
  SETTING_STEP: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      icon: PropTypes.string,
      title: PropTypes.string,
      href: PropTypes.string
    })
  ),
  showIcon: PropTypes.bool
}

SaveJobStepAnalytic.defaultProps = {
  SETTING_STEP: [],
  showIcon: true,
  breakpoints: {
    330: {
      slidesPerView: 1.5,
      slidesPerGroup: 1
    },
    750: {
      slidesPerView: 2.7,
      slidesPerGroup: 1
    },
    1000: {
      slidesPerView: 4,
      slidesPerGroup: 1
    },
    1280: {
      slidesPerView: 5,
      slidesPerGroup: 1
    }
  }
}

export default SaveJobStepAnalytic
