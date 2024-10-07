import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { secondsToHmsVideo } from 'store/helper/functionHelper'

const IntroduceCourseLessonChapterTable = (props) => {
  const {
    lessonList,
    coursePartNumber,
    coursePartName,
    sortPositon = () => {},
    enumLessonType,
    totalSeconds,
    padding = '32px 0px 32px 32px',
    paddingRightChil = '32px',
    gap = '12px',
    maxWidth = '376px',
    lessonLength
  } = props
  return (
    <div className={`bg-white `} style={{ padding: padding }}>
      <div
        className={` border-r h-[272px]  flex flex-col gap-4`}
        style={{ paddingRight: paddingRightChil, maxWidth: maxWidth }}
      >
        {lessonList?.map((element, index) => {
          const {
            enumLessonType,
            coursePartname = element?.name,
            totalSeconds
          } = element
          return (
            <div
              key={index}
              className="flex justify-between "
              style={{ gap: gap }}
            >
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
                  className="text-p16 leading-7 text-grey-1 line-clamp-2 h-[56px] max-w-[218px] "
                  style={{
                    wordBreak: 'break-word'
                  }}
                >
                  {coursePartname}
                </p>
              </div>
              <div className="mt-[2px]">
                {enumLessonType === 0 && (
                  <div className="text-p14 leading-[26px] text-grey-1 line-clamp-2 max-h-[56px]">
                    {secondsToHmsVideo(totalSeconds)}
                  </div>
                )}
                {enumLessonType === 1 && (
                  <div className="text-p14 leading-[26px] text-grey-1 line-clamp-1">
                    {secondsToHmsVideo(totalSeconds)}
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

IntroduceCourseLessonChapterTable.propTypes = {}
IntroduceCourseLessonChapterTable.defaultProps = {
  coursePartNumber: '',
  coursePartName: '',
  lessonList: []
}

export default IntroduceCourseLessonChapterTable
