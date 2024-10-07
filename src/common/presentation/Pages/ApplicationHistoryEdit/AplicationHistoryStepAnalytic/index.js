import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from 'common/presentation/Icons'

const AplicationHistoryStepAnalytic = (props) => {
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
      className={`w-full h-full md:h-14  px-[20px] sm:px-9  flex flex-wrap md:flex-nowrap  md:justify-center md:items-center bg-white shadow-none bg-transparent mt-[24px] ${marginBottom}`}
    >
      <div className=" w-full xl:max-w-[80vw] mx-auto">
        <Slider
          loop={false}
          breakpoints={breakpoints}
          hasArrow={SETTING_STEP?.length > 3}
          stroke={'#666666'}
          hasShadow={false}
          initialIndex={slideId}
          stylePrev="bg-transparent p-2"
        >
          {SETTING_STEP?.map((element, index) => {
            const { title, id, icon, logoSVG, status } = element
            return (
              <SwiperSlide key={index} className="!w-auto">
                <div>
                  <button
                    onClick={() => handleChoose(id, status)}
                    // className="flex items-center "
                    className={`px-6 py-3  rounded-full ${
                      choosedStepId === element.id
                        ? 'bg-[#F5F6F7]  duration-100 '
                        : 'bg-white  duration-100 '
                    }`}
                    style={{ margin: '0 auto' }}
                  >
                    <div className="text-center ">
                      <p
                        className={`${styleEleText} whitespace-nowrap ${
                          choosedStepId === element.id
                            ? 'text-black text-p12-bold xl:text-p18-bold'
                            : 'text-grey-1 text-p12 xl:text-p18-bold'
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

AplicationHistoryStepAnalytic.propTypes = {
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

AplicationHistoryStepAnalytic.defaultProps = {
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

export default AplicationHistoryStepAnalytic
