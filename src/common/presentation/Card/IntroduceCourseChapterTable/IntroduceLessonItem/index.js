import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { secondsToHms, secondsToHmsVideo } from 'store/helper/functionHelper'

const IntroduceLessonItem = (props) => {
  const {
    length,
    lessonName,
    lessonNumber,
    lessonType,
    lessonId,
    enumLessonType
  } = props

  return (
    <>
      <div className="flex justify-between ">
        <div className="flex items-start gap-3">
          {enumLessonType === 4 && (
            <div className="mt-1">
              <XProfileIcon name="documentVideo" />
            </div>
          )}
          {enumLessonType === 0 && (
            <div className="mt-1">
              <XProfileIcon name="playVideoIcon" />
            </div>
          )}

          <p
            className="line-clamp-2  h-[56px] max-w-[218px] text-p16 text-grey-1 leading-7"
            style={{
              wordBreak: 'break-word'
            }}
          >
            {lessonName}
          </p>
        </div>
        <div className="mt-[2px]">
          {enumLessonType === 0 && (
            <div className="text-p14 leading-[26px] text-grey-1 line-clamp-2 max-h-[56px]">
              {secondsToHmsVideo(length)}
            </div>
          )}
          {enumLessonType === 1 && (
            <div className="text-p14 leading-[26px] text-grey-1 line-clamp-1">
              {secondsToHmsVideo(length)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

IntroduceLessonItem.propTypes = {
  length: PropTypes.number,
  lessonName: PropTypes.string,
  lessonNumber: PropTypes.string
}
IntroduceLessonItem.defaultProps = {
  idLesson: '1',
  length: 3600,
  lessonName: 'Giới thiệu tổng quan về khoá học',
  lessonNumber: 'Bài 1',
  lessonType: 'video'
}

export default IntroduceLessonItem
