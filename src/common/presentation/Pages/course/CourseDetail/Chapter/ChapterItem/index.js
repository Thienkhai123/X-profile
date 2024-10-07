import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { secondsToHms, secondsToHmsVideo } from 'store/helper/functionHelper'
import { isUndefined } from 'lodash'

const ChapterItem = (props) => {
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
    isDone
  } = props

  const [chooseChap, setChooseChap] = useState({
    id: 0,
    hidden: false
  })

  const checkLesonAll = lessonList?.some((element) => element?.isDone)

  return (
    <div className="py-[24px] border-t border-grey-4">
      <div
        className="cursor-pointer flex gap-[12px]  justify-between "
        onClick={() => {
          setChooseChap({
            id: chapId,
            hidden: !chooseChap.hidden
          })
          setChapterId(lessonId)
        }}
      >
        <p
          className={`${
            checkLesonAll ? 'text-black' : 'text-grey-1'
          }  duration-150 sm:text-[18px] font-bold text-[16px] leading-[30px] `}
        >
          {name}
        </p>

        <div className="">
          <div
            className={` ${
              chapId === chooseChap.id && chooseChap.hidden
                ? 'transition -rotate-180'
                : 'transition '
            }`}
          >
            <XProfileIcon name="dropdownChapter" stroke="#000000" />
          </div>
        </div>
      </div>
      <div
        className={` duration-150  ${
          chapId === chooseChap.id && chooseChap.hidden ? 'h-0' : 'h-auto  '
        }`}
      >
        {lessonList?.sort(sortPositon)?.map((element, ind) => {
          const { name, totalSeconds, lessonId, isDone, enumLessonType } =
            element
          return (
            <div
              key={ind}
              onClick={() => {
                if (enumLessonType === 2) {
                  handleExam(lessonId, element?.exam?.examGuid)
                }
                if (enumLessonType !== 2) {
                  setChapterId(lessonId)
                }
              }}
              className={`cursor-pointer flex gap-[12px] justify-between duration-150 ${
                chapId === chooseChap.id && chooseChap.hidden
                  ? 'mt-0'
                  : 'mt-[16px]'
              }`}
            >
              <div className="flex gap-[12px]">
                {enumLessonType !== 2 && (
                  <div
                    className={`pt-[4px] duration-150 sm:text-[16px] font-normal leading-[28px] text-p12 ${
                      chapId === chooseChap.id && chooseChap.hidden
                        ? 'opacity-0 h-0'
                        : 'opacity-1'
                    }`}
                  >
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
                  className={`duration-150 sm:text-[16px] font-normal leading-[28px] text-p12
                ${
                  chapId === chooseChap.id && chooseChap.hidden
                    ? 'opacity-0 h-0'
                    : 'opacity-1'
                }
                ${
                  lessonId === chapterId
                    ? 'text-blue-light'
                    : isDone
                    ? 'text-black'
                    : 'text-grey-1'
                }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {name}
                </p>
              </div>
              {enumLessonType === 0 && (
                <p
                  className={`min-w-[60px] line-clamp-1 text-end duration-150 sm:text-[14px] leading-[26px] font-normal text-p12  
                ${
                  chapId === chooseChap.id && chooseChap.hidden
                    ? 'opacity-0 h-0'
                    : 'opacity-1'
                }
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
          )
        })}
      </div>
    </div>
  )
}

ChapterItem.propTypes = {}
ChapterItem.defaultProps = {}

export default ChapterItem
