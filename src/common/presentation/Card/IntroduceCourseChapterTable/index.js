import React from 'react'
import PropTypes from 'prop-types'
import IntroduceLessonItem from './IntroduceLessonItem'

const IntroduceCourseChapterTable = (props) => {
  const {
    lessonList,
    coursePartNumber,
    coursePartName,
    sortPositon = () => {}
  } = props
  return (
    <div className="bg-white border border-grey-4 rounded-[16px] p-8 max-w-[364px] h-[556px] mx-auto overflow-y-auto flex flex-col gap-4">
      <p className="text-p18-bold leading-[30px] text-black">
        {coursePartNumber}
      </p>
      {lessonList?.sort(sortPositon)?.map((item, index) => {
        return (
          <IntroduceLessonItem
            key={index}
            {...item}
            length={item?.totalSeconds}
            lessonName={item?.name}
            // lessonNumber={item?.name}
            lessonType={item?.video || 'document'}
          />
        )
      })}
    </div>
  )
}

IntroduceCourseChapterTable.propTypes = {}
IntroduceCourseChapterTable.defaultProps = {
  coursePartNumber: '',
  coursePartName: '',
  lessonList: []
}

export default IntroduceCourseChapterTable
