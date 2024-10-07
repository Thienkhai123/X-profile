import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import ChapterItem from './ChapterItem'
import ChapterLessonItem from './ChapterLessonItem'

const Chapter = (props) => {
  const {
    title,
    chapterList,
    titleChapter,
    name,
    courseTime,
    chapterId,
    setChapterId = () => {},
    resultChapterTables,
    handleClickExam
  } = props

  const sortPositon = (positionFirst, positionSeccond) => {
    return positionFirst?.position - positionSeccond?.position
  }

  return (
    <div className="bg-white px-[32px] py-[32px] h-auto xl:w-[342px] w-full rounded-[8px] border border-grey-4">
      {resultChapterTables?.sort(sortPositon)?.map((element, ind) => {
        const {
          partCourseList,
          lessonCourseList,
          name,
          totalTimeParendId,
          totalTimeParendIdNull
        } = element

        return (
          <div key={ind}>
            <p className="text-black text-p20-bold pb-[24px]">{name}</p>
            {partCourseList?.sort(sortPositon)?.map((element, ind) => {
              return (
                <div key={ind}>
                  <ChapterItem
                    {...element}
                    setChapterId={setChapterId}
                    chapterId={chapterId}
                    sortPositon={sortPositon}
                    handleExam={handleClickExam}
                  />
                </div>
              )
            })}
            {lessonCourseList?.sort(sortPositon)?.map((element, ind) => {
              return (
                <div key={ind}>
                  <ChapterLessonItem
                    {...element}
                    lengthCourse={lessonCourseList?.length - 1 === ind}
                    setChapterId={setChapterId}
                    chapterId={chapterId}
                    sortPositon={sortPositon}
                    handleExam={handleClickExam}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

Chapter.propTypes = {
  title: PropTypes.string,
  chapterList: PropTypes.arrayOf(
    PropTypes.shape({
      titleChapter: PropTypes.string,
      courseList: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          courseTime: PropTypes.any
        })
      )
    })
  )
}
Chapter.defaultProps = {
  title: 'Chương 1: Cơ bản về lập trình',
  chapterList: [
    {
      chapId: 1,
      name: 'Phần 1 : Fundamental - Kiến thức cơ bản về vẽ',
      lessonList: [
        {
          chapId: 1,
          name: 'Bài 1 : Giới thiệu tổng quan về khoá học',
          courseTime: 5000,
          courseId: 1
        },
        {
          chapId: 1,
          name: 'Bài 1 : Giới thiệu tổng quan về khoá học',
          courseTime: 5000,
          courseId: 2
        }
      ]
    },
    {
      chapId: 2,
      titleChapter: 'Phần 1 : Fundamental - Kiến thức cơ bản về vẽ',
      lessonList: [
        {
          chapId: 2,
          name: 'Bài 1 : Giới thiệu tổng quan về khoá học',
          courseTime: 5000,
          courseId: 3
        },
        {
          chapId: 2,
          name: 'Bài 1 : Giới thiệu tổng quan về khoá học',
          courseTime: 5000,
          courseId: 4
        }
      ]
    }
  ]
}

export default Chapter
