import React, { useState } from 'react'
import PropTypes, { element } from 'prop-types'
import IntroduceCourseChapterTable from '../Card/IntroduceCourseChapterTable'
import { Slider } from '../Swiper'
import { SwiperSlide } from 'swiper/react'
import XProfileIcon from '../Icons'
import { secondsToHms, secondsToHmsCourse } from 'store/helper/functionHelper'
import IntroduceCourseLessonChapterTable from '../Card/IntroduceCourseLessonChapterTable'

const CourseChapterTableList = (props) => {
  const { resultChapterTables, totalVideoCount, length } = props

  const sortPositon = (positionFirst, positionSeccond) => {
    return positionFirst?.position - positionSeccond?.position
  }

  return (
    <div className="relative w-full lg:w-[1140px] mb-[40px]">
      <div className="flex flex-col gap-[40px]">
        {resultChapterTables?.sort(sortPositon)?.map((element, ind) => {
          const {
            partCourseList,
            lessonCourseList,
            name,
            totalTimeParendId,
            totalTimeParendIdNull,
            totalVideo
          } = element
          return (
            <div key={ind}>
              <div className="flex justify-between mb-[24px] items-center">
                <p className="sm:text-h4 text-p16-bold text-black ">{name}</p>
                <div className="flex items-center justify-between overflow-hidden gap-[8px]">
                  <div className="flex items-center gap-2 ">
                    <XProfileIcon name="play" />
                    <div className="flex items-center gap-1 ">
                      <p className="text-p16 leading-[28px] text-grey-1 line-clamp-1">
                        {totalVideo || 0} Videos
                      </p>
                      <span className="text-p16 leading-[28px] text-grey-1">
                        -
                      </span>
                      <p className="text-p16 leading-[28px] text-grey-1 line-clamp-1">
                        {secondsToHmsCourse(
                          totalTimeParendId + totalTimeParendIdNull || 0
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-[20px]">
                {partCourseList?.length > 0 && (
                  <Slider
                    breakpoints={{
                      330: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                      },
                      1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 20
                      }
                    }}
                    hasArrow={partCourseList?.length > 3}
                    hasShadow={false}
                    stylePrev="p-[15.2px] border border-nude bg-white shadow-[0_16px_24px_rgba(0,0,0,0.04)]"
                    classNameLeft="absolute z-10 -left-[28px] top-1/2 -translate-y-1/2"
                    classNameRight="absolute z-10 -right-[28px] top-1/2 -translate-y-1/2"
                  >
                    {partCourseList?.sort(sortPositon)?.map((item, index) => {
                      return (
                        <SwiperSlide key={index}>
                          <IntroduceCourseChapterTable
                            {...item}
                            coursePartNumber={item?.name}
                            coursePartName={item?.chapterName}
                            sortPositon={sortPositon}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Slider>
                )}

                {lessonCourseList.length > 0 && (
                  <Slider
                    breakpoints={{
                      330: {
                        slidesPerView: 1,
                        slidesPerGroup: 1
                      },
                      1024: {
                        slidesPerView: 3,
                        slidesPerGroup: 1,
                        spaceBetween: 0
                      }
                    }}
                    classNameSwiper="rounded-[16px] border border-grey-4 bg-white"
                    hasArrow={lessonCourseList.length > 3}
                    hasShadow={false}
                    stylePrev="p-[15.2px] border border-nude bg-white shadow-[0_16px_24px_rgba(0,0,0,0.04)]"
                    // stylePrev="h-[56px] w-[56px] bg-white"
                    classNameLeft="absolute z-10 -left-[28px] top-1/2 -translate-y-1/2"
                    classNameRight="absolute z-10 -right-[28px] top-1/2 -translate-y-1/2"
                  >
                    {lessonCourseList?.sort(sortPositon)?.map((item, index) => {
                      return (
                        <SwiperSlide key={index} style={{ marginRight: '0px' }}>
                          <IntroduceCourseLessonChapterTable
                            lessonList={item}
                            sortPositon={sortPositon}
                          />
                        </SwiperSlide>
                      )
                    })}
                  </Slider>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

CourseChapterTableList.propTypes = {
  resultChapterTables: PropTypes.array
}
CourseChapterTableList.defaultProps = {
  resultChapterTables: [
    {
      coursePartNumber: 'Phần 1',
      coursePartName: 'Giới thiệu tổng quan về khoá học 1'
    },
    {
      coursePartNumber: 'Phần 2',
      coursePartName: 'Giới thiệu tổng quan về khoá học 2'
    }
  ]
}
export default CourseChapterTableList
