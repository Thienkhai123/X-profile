import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { secondsToHms, secondsToHmsVideo } from 'store/helper/functionHelper'
import { isUndefined } from 'lodash'

const ChapterLessonItem = (props) => {
  const {
    chapId,
    name,
    lessonList,
    chapterId,
    lessonId,
    examGuid,
    setChapterId = () => {},
    sortPositon = () => {},
    handleExam = () => {},
    lengthCourse,
    enumLessonType,
    isDone,
    totalSeconds,
    exam
  } = props
  const [chooseChap, setChooseChap] = useState({
    id: 0,
    hidden: false
  })

  return (
    <div className="py-[24px] border-t border-grey-4">
      <div
        className="cursor-pointer flex gap-[12px] justify-between  "
        onClick={() => {
          setChooseChap({
            id: chapId,
            hidden: !chooseChap.hidden
          })
          if (enumLessonType === 2) {
            handleExam(lessonId, exam?.examGuid)
          }
          if (enumLessonType !== 2) {
            setChapterId(lessonId)
          }
        }}
      >
        <div className="flex gap-[12px]">
          {enumLessonType !== 2 && (
            <div className="pt-[4px]">
              {isDone ? (
                <XProfileIcon
                  name="checkVideo"
                  fill={lessonId === chapterId ? '#294F9B' : 'black'}
                />
              ) : enumLessonType === 0 || enumLessonType === 1 ? (
                <XProfileIcon
                  name="playVideoIcon"
                  fill={lessonId === chapterId ? '#294F9B' : '#666666'}
                />
              ) : (
                <XProfileIcon
                  name="documentVideo"
                  fill={lessonId === chapterId ? '#294F9B' : '#666666'}
                />
              )}
            </div>
          )}
          <p
            className={`break-words duration-150 sm:text-[16px] font-normal leading-[28px] text-p12 ${
              enumLessonType === 2
                ? 'text-black'
                : ` ${
                    lessonId === chapterId
                      ? 'text-blue-light'
                      : isDone
                      ? 'text-black'
                      : 'text-grey-1'
                  }`
            } `}
            style={{ wordBreak: 'break-word' }}
          >
            {name}
          </p>
        </div>
        {enumLessonType === 0 && (
          <p
            className={`min-w-[60px] line-clamp-1 text-end duration-150 sm:text-[14px] leading-[26px] font-normal text-p12  
                ${
                  lessonId === chapterId
                    ? 'text-blue-light'
                    : isDone
                    ? 'text-black'
                    : 'text-grey-1'
                }`}
          >
            {secondsToHmsVideo(totalSeconds || 0)}
          </p>
        )}
      </div>
    </div>
  )
}

ChapterLessonItem.propTypes = {}
ChapterLessonItem.defaultProps = {}

export default ChapterLessonItem
