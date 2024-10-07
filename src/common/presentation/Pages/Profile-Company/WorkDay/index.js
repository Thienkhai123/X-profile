import React from 'react'
import PropTypes from 'prop-types'
import WorkDayItem from '../WorkDayItem'
import Image from 'next/image'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'

const WorkDay = (props) => {
  const { title, description, workingDays, stylePage = 0 } = props

  return (
    <div className=" relative h-full py-8  xl:py-[88px] lg:bg-[length:100%_100%] xl:bg-cover ">
      <div className="flex justify-center  items-center h-full">
        <div className="w-full">
          <div className="xl:mb-[52px] mb-6 px-6 md:px-0">
            <div className="flex justify-center">
              <div className="text-center xl:mb-4 mb-2 max-w-[650px]  sm:px-0 px-4">
                <p className="xl:text-h2 text-p18-bold">{title}</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="text-center max-w-[892px] px-[16px] xl:px-0">
                <p className="xl:text-p18 text-p14 leading-[26px] md:leading-7 font-normal text-grey-1 md:whitespace-pre-line">
                  {description}
                </p>
              </div>
            </div>
          </div>

          {stylePage === 0 && (
            <div className="flex items-center xl:gap-32 gap-[20px] ">
              <div className="hidden xl:relative  w-auto xl:block xl:ml-[60px]">
                <div className="absolute top-3 ">
                  {/* <Image
                src={'/images/bearBossBackground.png'}
                width={350}
                height={373}
                quality={100}
                alt=""
                objectFit="contain"
              /> */}
                </div>
                <div className="w-[380px] h-[380px] relative">
                  <Image
                    src={'/images/career_path/work_day.png'}
                    layout="fill"
                    alt=""
                    quality={100}
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="xl:max-w-[850px] w-screen px-0">
                <Slider
                  breakpoints={{
                    330: {
                      slidesPerView: 1.5,
                      slidesPerGroup: 1
                    },
                    800: {
                      slidesPerView: 2,
                      slidesPerGroup: 2
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
                  hasArrow={workingDays?.length > 3}
                  classNameSwiper="!px-6 xl:!px-0"
                >
                  {workingDays?.map((workingDay) => {
                    const { workingDayId } = workingDay
                    return (
                      <SwiperSlide
                        key={`profile-workday-${workingDayId}`}
                        style={{ height: 'auto' }}
                      >
                        <WorkDayItem {...workingDay} />
                      </SwiperSlide>
                    )
                  })}
                </Slider>
              </div>
              {/* {workingDays?.map((workingDay) => {
            const { workingDayId } = workingDay
            return <WorkDayItem key={workingDayId} {...workingDay} />
          })} */}
            </div>
          )}
          {stylePage !== 0 && (
            <div>
              <div className="hidden  w-auto xl:block ">
                <div className="absolute -bottom-[6px]">
                  <Image
                    src={'/images/bearBossBackground.png'}
                    width={335.76}
                    height={326}
                    quality={100}
                    alt=""
                    objectFit="contain"
                  />
                </div>
              </div>
              <div className="xl:max-w-[850px] w-screen mx-auto px-0">
                <Slider
                  breakpoints={{
                    330: {
                      slidesPerView: 1.5,
                      slidesPerGroup: 1
                    },
                    800: {
                      slidesPerView: 2,
                      slidesPerGroup: 2
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
                  classNameSwiper="h-auto !px-5 xl:!pl-0"
                  hasArrow={workingDays?.length > 3}
                >
                  {workingDays?.map((workingDay) => {
                    const { workingDayId } = workingDay
                    return (
                      <SwiperSlide
                        key={`profile-workday-${workingDayId}`}
                        style={{ height: 'auto' }}
                      >
                        <WorkDayItem {...workingDay} />
                      </SwiperSlide>
                    )
                  })}
                </Slider>
              </div>
              {/* {workingDays?.map((workingDay) => {
              const { workingDayId } = workingDay
              return <WorkDayItem key={workingDayId} {...workingDay} />
            })} */}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

WorkDay.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  workingDays: PropTypes.array
}
WorkDay.defaultProps = {
  title: 'Một ngày làm việc',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris neque, interdum eu consequat ',
  workingDays: []
}

export default WorkDay
