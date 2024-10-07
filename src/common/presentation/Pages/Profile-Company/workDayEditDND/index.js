import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import WorkDayItemEditActive from '../WorkDayItemEditActive'
import { useDispatch } from 'react-redux'
import { updatePosition } from 'store/app/edit-mode-company/profile/workDaySlice'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'

const WorkDayEditDND = (props) => {
  const {
    itemList = [],
    handleDelete = {},
    isEdit = false,
    onChange = () => {},
    setIndex = () => {},
    toggleModalImage = () => {},
    autofocus = false,
    errorsList
  } = props

  return (
    <div className="xl:max-w-[850px] w-screen  px-5 xl:px-0">
      {/* <div className="flex gap-[20px]  overflow-auto"> */}
      <Slider
        breakpoints={{
          330: {
            slidesPerView: 1.5,
            slidesPerGroup: 1
          },
          800: {
            slidesPerView: 2,
            slidesPerGroup: 1
          },
          1100: {
            slidesPerView: 2,
            slidesPerGroup: 1
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
          const isErrorsImageUrl =
            errorsList?.some(
              (element) => element === `WorkingDay_imageUrl_${ind}`
            ) || false
          const isErrorsDesciption =
            errorsList?.some(
              (element) => element === `WorkingDay_desciption_${ind}`
            ) || false
          const isErrorsTitle =
            errorsList?.some(
              (element) => element === `WorkingDay_title_${ind}`
            ) || false
          return (
            <SwiperSlide
              className="my-2"
              key={`profile-workday-${ind}`}
              // style={{ height: 'auto' }}
            >
              <WorkDayItemEditActive
                {...workingDay}
                isErrorsImageUrl={isErrorsImageUrl}
                isErrorsDesciption={isErrorsDesciption}
                isErrorsTitle={isErrorsTitle}
                indForm={ind}
                logo={workingDay?.imageUrl}
                handleDelete={handleDelete}
                isEdit={isEdit}
                onChange={onChange}
                setIndex={setIndex}
                toggleModalImage={toggleModalImage}
                autofocus={autofocus}
              />
            </SwiperSlide>
          )
        })}
      </Slider>
      {/* </div> */}
    </div>
  )
}

WorkDayEditDND.propTypes = {}
WorkDayEditDND.defaultProps = {}

export default WorkDayEditDND
