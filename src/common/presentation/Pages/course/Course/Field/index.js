import React from 'react'
import PropTypes from 'prop-types'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import Image from 'next/image'

const Field = (props) => {
  const { fieldList, onRedirectPage } = props
  return (
    <div className="xl:flex justify-center">
      <div className="xl:w-[1062px] w-auto relative ">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1.5,
              slidesPerGroup: 1
            },
            700: {
              slidesPerView: 2.4,
              slidesPerGroup: 2
            },
            1024: {
              slidesPerView: 4,
              slidesPerGroup: 1,
              spaceBetween: 20
            }
          }}
          hasArrow={fieldList?.length > 4}
        >
          {fieldList?.map((item, ind) => {
            const { imageUrl, name, courseCategoryId } = item || {}
            return (
              <SwiperSlide key={ind}>
                <div
                  onClick={() => onRedirectPage(courseCategoryId)}
                  className="cursor-pointer group "
                >
                  <div className="p-[32px] flex justify-center">
                    <div className="relative w-[103px] h-[115px] ">
                      <Image
                        src={imageUrl || ''}
                        alt=""
                        quality={100}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                  </div>
                  <p className="sm:text-h4 text-p18-bold duration-150 text-neutral text-center group-hover:text-button-2">
                    {name}
                  </p>
                </div>
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

Field.propTypes = {
  fieldList: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string,
      title: PropTypes.string
    })
  )
}
Field.defaultProps = {
  fieldList: [
    {
      logo: '/images/Course/logoField.png',
      title: 'Công nghệ thông tin'
    },
    {
      logo: '/images/Course/logoField.png',
      title: 'Thiết kế- Đồ hoạ'
    },
    {
      logo: '/images/Course/logoField.png',
      title: 'Tài chính - Kế toán'
    },
    {
      logo: '/images/Course/logoField.png',
      title: 'Hành chính- Nhân sự'
    },
    {
      logo: '/images/Course/logoField.png',
      title: 'Công nghệ thông tin'
    }
  ]
}

export default Field
