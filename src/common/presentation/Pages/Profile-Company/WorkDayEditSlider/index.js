import React from 'react'
import PropTypes from 'prop-types'
import WorkDayItemEdit from '../WorkDayItemEdit'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'

const WorkDayEditSlider = (props) => {
  const {
    itemList = [],
    handleEdit = {},
    handleDelete = {},
    isEdit = false
  } = props

  return (
    <div className="xl:max-w-[850px] w-screen  px-5 xl:px-0 ">
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
            slidesPerGroup: 1
          }
        }}
        hasArrow={itemList?.length > 3}
        hasShadow={false}
        classNameLeft="absolute z-50 -left-[80px] top-1/2 -translate-y-1/2"
        classNameRight="absolute z-50 -right-[80px] top-1/2 -translate-y-1/2"
        stylePrev="bg-white p-5 shadow-blur24"
      >
        {itemList?.map((workingDay, ind) => {
          return (
            <SwiperSlide key={`profile-workday-${ind}`}>
              <WorkDayItemEdit
                {...workingDay}
                ind={ind}
                logo={workingDay?.imageUrl}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                isEdit={isEdit}
              />
            </SwiperSlide>
          )
        })}
      </Slider>
    </div>
  )
}

WorkDayEditSlider.propTypes = {}

export default WorkDayEditSlider
