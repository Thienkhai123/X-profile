import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'
import { Slider } from '../Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from '../Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'

const AccountStepMobile = (props) => {
  const {
    SETTING_STEP,
    handleChoose,
    choosedStepId,
    slideId,
    style,
    styleEleText,
    showIcon,
    widthEle = '141px',
    classNameSwiper = ''
  } = props
  const router = useRouter()

  return (
    <div
      className={`w-full  h-full   sm:px-0  flex flex-wrap md:flex-nowrap  md:justify-center md:items-center bg-white ${style}`}
    >
      <div className="w-full mx-auto">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 2.4,
              slidesPerGroup: 1,
              spaceBetween: 16
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
          // hasArrow={SETTING_STEP?.length > 5}
          hasShadow={false}
          spaceBetween={8}
          initialIndex={SETTING_STEP.findIndex((el) =>
            router.pathname.includes(el?.href)
          )}
          classNameSwiper={classNameSwiper}
        >
          {SETTING_STEP?.map((element, index) => {
            const { title, id, icon, logoSVG, href } = element
            return (
              <SwiperSlide key={index}>
                <div
                  className={` ${
                    router.pathname.includes(href)
                      ? '  duration-100 bg-[#F5F6F7] px-4 py-2 rounded-xl'
                      : ' border-transparent duration-100 px-4 py-2 rounded-xl'
                  }`}
                >
                  {href && (
                    <Link key={id} href={href}>
                      <div className={'text-center'}>
                        <p
                          className={`${styleEleText} ${
                            router.pathname.includes(href)
                              ? 'text-button-2 font-bold'
                              : 'text-grey-1'
                          }`}
                        >
                          {title}
                        </p>
                      </div>
                    </Link>
                  )}
                </div>
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

AccountStepMobile.propTypes = {
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

AccountStepMobile.defaultProps = {
  SETTING_STEP: [],
  showIcon: true
}

export default AccountStepMobile
