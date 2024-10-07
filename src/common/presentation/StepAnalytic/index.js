import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Slider } from '../Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from '../Icons'
import { ROLE_STORAGE } from 'common/config/app.constants'

const StepAnalytic = (props) => {
  const {
    SETTING_STEP,
    handleChoose,
    choosedStepId,
    slideId,
    style,
    styleEleText = 'text-p14',
    showIcon
  } = props
  const [roleId, setRoleId] = useState(0)

  useEffect(() => {
    const roleLocal = localStorage.getItem(ROLE_STORAGE)
    if (roleLocal) {
      setRoleId(roleLocal)
    }
  }, [])

  return (
    <div
      key={slideId}
      className="w-full border-b  shadow-md h-full  px-[20px] sm:px-0  flex flex-wrap md:flex-nowrap  md:justify-center md:items-center bg-white"
    >
      <div className="w-full xl:max-w-[80vw] mx-auto">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 2,
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
          }}
          hasArrow={SETTING_STEP?.length > 5}
          hasShadow={false}
          initialIndex={slideId}
        >
          {SETTING_STEP?.map((element, index) => {
            const { title, id, icon, logoSVG } = element
            return (
              <SwiperSlide key={index} style={{ width: '141px ' }}>
                <div
                  className={`${
                    choosedStepId === element.id
                      ? `border-b duration-100 ${
                          parseInt(roleId) === 1
                            ? 'border-button'
                            : parseInt(roleId) === 2
                            ? 'border-button-2'
                            : 'border-pink-dark'
                        } `
                      : 'border-b border-transparent duration-100  '
                  }`}
                >
                  <button
                    onClick={() => handleChoose(id)}
                    className="flex items-center py-6  gap-2"
                    style={{ margin: '0 auto' }}
                  >
                    {/* <div className="h-7 md:w-7 mr-1">
                      {icon !== undefined && (
                        <Image
                          className="rounded-full object-cover"
                          src={icon}
                          alt="..."
                          width={28}
                          height={28}
                        />
                      )}
                      {logoSVG !== undefined && (
                        <div>
                          <div className="hidden sm:block">
                            <XProfileIcon
                              name={logoSVG}
                              width="28"
                              height="28"
                              fill={
                                choosedStepId === element.id
                                  ? '#1C3074'
                                  : '#666666'
                              }
                            />
                          </div>
                          <div className="block sm:hidden">
                            <XProfileIcon
                              name={logoSVG}
                              width="24"
                              height="24"
                              fill={
                                choosedStepId === element.id
                                  ? '#1C3074'
                                  : '#666666'
                              }
                            />
                          </div>
                        </div>
                      )}
                      {icon === undefined &&
                        logoSVG === undefined &&
                        showIcon && (
                          <div className="h-full w-7 mr-1 bg-[#E6E6E6] rounded-full"></div>
                        )}
                    </div> */}
                    {showIcon && logoSVG && (
                      <div className="">
                        <XProfileIcon
                          name={logoSVG}
                          width="24"
                          height="24"
                          fill={
                            choosedStepId === element.id
                              ? parseInt(roleId) === 1
                                ? '#ECB14E'
                                : parseInt(roleId) === 2
                                ? '#294F9B'
                                : '#E29D98'
                              : '#666666'
                          }
                        />
                      </div>
                    )}
                    <div className="text-center ml-1">
                      <p
                        className={`${styleEleText} line-clamp-2 ${
                          choosedStepId === element.id
                            ? `${
                                parseInt(roleId) === 1
                                  ? 'text-button'
                                  : parseInt(roleId) === 2
                                  ? 'text-button-2'
                                  : 'text-pink-dark'
                              }  font-bold`
                            : 'text-grey-1'
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

StepAnalytic.propTypes = {
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

StepAnalytic.defaultProps = {
  SETTING_STEP: [],
  showIcon: true
}

export default StepAnalytic
