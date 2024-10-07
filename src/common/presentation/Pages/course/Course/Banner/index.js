import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import Button from 'common/presentation/Button'
import { getClickableLink } from 'store/helper/functionHelper'

const Banner = (props) => {
  const { bannerList } = props

  const handleClick = (url) => {
    if (url) {
      const link = getClickableLink(url)
      window.location.assign(link)
    }
  }

  return (
    <div className="flex justify-center">
      <div className="xl:w-[1140px] w-full ">
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1,
              slidesPerGroup: 1
            }
          }}
          classNameLeft="absolute z-50 left-[32px] top-1/2 -translate-y-1/2"
          classNameRight="absolute z-50 right-[32px] top-1/2 -translate-y-1/2"
          stylePrev="bg-black p-4 opacity-[40%]"
          stroke="white"
          classNameSwiper="rounded-3xl"
          hasArrow={bannerList?.length > 1}
        >
          {bannerList.map((element, ind) => {
            const { imageUrl, title, content, timeCourse, typeLearnCourse } =
              element
            return (
              <SwiperSlide key={ind}>
                <div className="w-full h-[420px] rounded-3xl relative">
                  <Image
                    src={imageUrl || ''}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                    className="rounded-3xl"
                  />
                  <div className="relative z-[100] flex flex-col justify-center gap-[40px] max-w-[522px] h-full mx-[114px]">
                    <div className="flex flex-col gap-[16px] w-full ">
                      <p
                        className="sm:text-p36-bold text-p28-bold text-dark-blue  line-clamp-2"
                        style={{ wordBreak: 'break-word' }}
                      >
                        {title}
                      </p>
                      <p
                        className="sm:text-p20 text-p16 text-dark-blue line-clamp-2"
                        style={{ wordBreak: 'break-word' }}
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                      {/* <p className="sm:text-p18 text-p14 text-white">
                        Thời gian:{' '}
                        <span className="sm:text-p18-bold text-p14-bold text-white">
                          {timeCourse}
                        </span>
                      </p> */}
                      {/* <p className="sm:text-p18 text-p14 text-white">
                      Hình thức:{' '}
                      <span className="sm:text-p18-bold text-p14-bold text-white">
                        {typeLearnCourse}
                      </span>
                    </p> */}
                    </div>
                    <div>
                      <Button
                        title={element?.buttonTitle}
                        background="bg-button-2"
                        textWeight="text-white text-p18-bold  line-clamp-1 break-words "
                        height="h-[48px]"
                        width="min-w-[191px] "
                        padding="px-[32px] "
                        rounded="rounded-[8px]"
                        onClick={() => handleClick(element?.buttonUrl)}
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

Banner.propTypes = {
  bannerList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string
    })
  )
}
Banner.defaultProps = {
  bannerList: [
    {
      imageUrl: '/images/Course/BannerDefault.png',
      typeCourse: 'KHOÁ HỌC MIỄN PHÍ',
      nameCourse: 'SỬ DỤNG CHATGPT HIỆU QUẢ CÙNG CHUYÊN GIA',
      timeCourse: '13h30 ngày 23/1/2023',
      typeLearnCourse: 'Nền tảng trực tuyến Zoom, Youtube , Google'
    },
    {
      imageUrl: '/images/Course/BannerDefault.png',
      typeCourse: 'KHOÁ HỌC MIỄN PHÍ',
      nameCourse: 'SỬ DỤNG CHATGPT HIỆU QUẢ CÙNG CHUYÊN GIA',
      timeCourse: '13h30 ngày 23/1/2023',
      typeLearnCourse: 'Nền tảng trực tuyến Zoom, Youtube , Google'
    }
  ]
}

export default Banner
