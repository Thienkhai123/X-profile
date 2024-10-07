import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Slider } from '../Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from '../Icons'
import { ROLE_STORAGE } from 'common/config/app.constants'

const DashBoardStepAnalytic = (props) => {
  const {
    SETTING_STEP,
    handleChoose,
    choosedStepId,
    slideId,
    style,
    styleEleText = 'text-p18-bold',
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
      className="w-[328px]  h-full  flex flex-wrap md:flex-nowrap  md:justify-center md:items-center  "
    >
      <div className="w-full xl:max-w-[80vw] mx-auto">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 2,
              slidesPerGroup: 1
            }
          }}
          hasArrow={SETTING_STEP?.length > 5}
          hasShadow={false}
          initialIndex={slideId}
          spaceBetween={32}
        >
          {SETTING_STEP?.map((element, index) => {
            const { title, id, icon, logoSVG } = element
            return (
              <SwiperSlide className="!w-fit" key={index}>
                <div
                  className={`w-fit ${
                    choosedStepId === element.id
                      ? `border-b duration-100 `
                      : 'border-b border-transparent duration-100  '
                  }`}
                >
                  <button
                    onClick={() => handleChoose(id)}
                    className="flex items-center py-1  "
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

                    <div className="text-center ml-1">
                      <p
                        className={`${styleEleText} whitespace-nowrap ${
                          choosedStepId === element.id
                            ? `text-white `
                            : 'text-grey-3'
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

DashBoardStepAnalytic.propTypes = {
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

DashBoardStepAnalytic.defaultProps = {
  SETTING_STEP: [],
  showIcon: true
}

export default DashBoardStepAnalytic
