import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'

import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from 'common/presentation/Icons'

const SkillDatabaseStepAnalytic = (props) => {
  const {
    SETTING_STEP,
    handleChoose,
    choosedStepId,
    slideId,
    styleEleText = 'md:text-p18 text-p14',
    breakpoints,
    marginBottom = 'md:mb-4'
  } = props

  return (
    <div
      className={`w-full h-full md:h-14 flex flex-wrap md:flex-nowrap  md:border-b border-grey-4 md:pb-4 md:justify-center md:items-center bg-white shadow-none bg-transparent  ${marginBottom}`}
    >
      <div className=" w-full  mx-auto">
        <Slider
          loop={false}
          breakpoints={breakpoints}
          // hasArrow={SETTING_STEP?.length > 3}
          stroke={'#666666'}
          hasShadow={false}
          initialIndex={slideId}
          stylePrev="bg-transparent p-2"
          spaceBetween={16}
          classNameSwiper="md:!px-0 !px-6 md:!pt-0 !pt-4"
        >
          {SETTING_STEP?.map((element, index) => {
            const { name, jobId, icon, logoSVG, status } = element
            return (
              <SwiperSlide key={index} className="!w-auto">
                <div>
                  <button
                    onClick={() => handleChoose(jobId)}
                    // className="flex items-center "
                    className={`px-4 py-2  rounded-xl ${
                      choosedStepId === element.jobId
                        ? 'bg-black  duration-100 '
                        : 'bg-white  duration-100 '
                    }`}
                    style={{ margin: '0 auto' }}
                  >
                    <div className="text-center ">
                      <p
                        className={`${styleEleText} whitespace-nowrap ${
                          choosedStepId === element.jobId
                            ? 'text-white  '
                            : 'text-black '
                        }`}
                      >
                        {name}
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

SkillDatabaseStepAnalytic.propTypes = {
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

SkillDatabaseStepAnalytic.defaultProps = {
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

export default SkillDatabaseStepAnalytic
