import React from 'react'
import PropTypes from 'prop-types'
import AddressFooterItem from './AddressFooterItem'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation'

const AddresBookWrapper = (props) => {
  const { addressBooks } = props
  return (
    <>
      <div className="w-full  md:w-[648px]  xl:w-[904px] ">
        <Slider
          spaceBetween={0}
          breakpoints={{
            330: {
              slidesPerView: 1,
              slidesPerGroup: 1
            },
            700: {
              slidesPerView: 1,
              slidesPerGroup: 1
            },
            1100: {
              slidesPerView: 2,
              slidesPerGroup: 1
            },
            1280: {
              slidesPerView: 2,
              slidesPerGroup: 1
            }
          }}
          hasArrow={addressBooks?.length > 2}
          hasShadow={false}
          classNameLeft="absolute z-50  right-16 -bottom-5 translate-y-full drop-shadow-[0px_16px_24px_rgba(0,0,0,0.04)]"
          classNameRight="absolute z-50  right-0 -bottom-5 translate-y-full  drop-shadow-[0px_16px_24px rgba(0,0,0,0.04)]"
          stylePrev="bg-white border border-nude p-2"
          stroke="black"
          classNameSwiper="swiper-radius"
        >
          {addressBooks?.map((element, index) => {
            const {
              phone,
              email,
              wardName,
              cityName,
              districtName,
              addressDetail,
              name
            } = element
            return (
              <SwiperSlide key={index}>
                <AddressFooterItem
                  phone={phone}
                  email={email}
                  addressDetail={`${addressDetail}, ${wardName}, ${districtName}, ${cityName}`}
                  titleAddress={name || `Chi nhánh ${index + 1}`}
                />
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </>
  )
}

AddresBookWrapper.propTypes = {}

export default AddresBookWrapper
