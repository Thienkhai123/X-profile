import React from 'react'
import PropTypes from 'prop-types'
import CourseItem from '../Card/CourseItem'
import Image from 'next/image'

const CourseUserOwnedList = (props) => {
  const { listCourseUserOwned, handleLinkCourse } = props
  return (
    <div>
      {listCourseUserOwned?.length !== 0 ? (
        <div className="xl:flex flex-wrap justify-center grid grid-cols-2 md:justify-start  items-center gap-4 ">
          {listCourseUserOwned?.map((item, index) => {
            return (
              <CourseItem
                key={index}
                {...item}
                handleLinkCourse={handleLinkCourse}
              />
            )
          })}
        </div>
      ) : (
        <div className="w-full min-h-[340px] flex flex-col items-center justify-center">
          <Image
            alt="empty"
            width={200}
            height={200}
            src={'/images/empty.svg'}
          />
          <p className="text-grey-2 text-p18 mt-10">
            Hiện chưa có khoá học nào
          </p>
        </div>
      )}
    </div>
  )
}

CourseUserOwnedList.propTypes = {}

export default CourseUserOwnedList
