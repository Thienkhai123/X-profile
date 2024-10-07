import React from 'react'
import PropTypes from 'prop-types'
import Card from '../Card'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'

const Role = (props) => {
  const { SETTING_ROLE, handleRole, chooseId, setChooseId } = props
  const { title, roleCard, titleButton } = SETTING_ROLE
  return (
    <div className=" pt-[26px] ">
      <div className="flex justify-center xl:mb-[38px] mt-[26px] flex-wrap">
        <p className="xl:text-h1 text-neutral text-p20-bold">{title}</p>
      </div>
      <div className="flex justify-center  pb-7 xl:w-full xl:px-0  xl:mx-0 mx-[15%]">
        <div className=" w-full xl:max-w-[1140px]">
          <Slider
            breakpoints={{
              330: {
                slidesPerView: 1,
                slidesPerGroup: 1
              },
              1100: {
                slidesPerView: 2,
                slidesPerGroup: 2
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 3
              }
            }}
            hasArrow
            arrowStyle="sm:hidden block"
          >
            {roleCard.map((element, index) => (
              <SwiperSlide key={index}>
                <div className="xl:w-[366px] w-full xl:h-[558px] h-full mt-10 xl:mt-0">
                  <Card
                    titleButton={titleButton}
                    element={element}
                    handleRole={handleRole}
                    chooseId={chooseId}
                    setChooseId={setChooseId}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Slider>
        </div>
      </div>
      <div className="absolute h-[408px] w-full bottom-0 md:hidden">
        <div className="relative h-[408px] w-full bottom-0">
          <Image
            alt="survey-background"
            placeholder="blur"
            blurDataURL="/images/pixel-BG.png"
            src={'/images/pixel-BG.png'}
            layout="fill"
            objectFit="cover"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

Role.propTypes = {
  SETTING_ROLE: PropTypes.shape({
    title: PropTypes.string,
    roleCard: PropTypes.arrayOf(
      PropTypes.shape({
        hoverIcon: PropTypes.string,
        href: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
      })
    )
  })
}
Role.defaultProps = {
  SETTING_ROLE: {
    title: 'Chọn nhân vật',
    roleCard: [
      {
        hoverIcon: 'ellipse',
        href: '#',
        title: 'Cừu tân binh',
        description:
          'Phù hợp với sinh viên mới ra trường người cần thay đổi nghề nghiệp'
      },
      {
        hoverIcon: 'polygon',
        href: '#',
        title: 'Chuột công sở',
        description:
          'Phù hợp với sinh viên mới ra trường người cần thay đổi nghề nghiệp'
      },
      {
        hoverIcon: 'vector',
        href: '#',
        title: 'Gấu doanh nhân',
        description:
          'Phù hợp với sinh viên mới ra trường người cần thay đổi nghề nghiệp'
      }
    ]
  }
}

export default Role
