import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import BannerCourse from '../BannerCourse'
import ContentCourse from '../ContentCourse'
import XProfileIcon from 'common/presentation/Icons'
import PartCourse from '../PartCourse'
import { useSelector } from 'react-redux'
import {
  selectChapterProductGuid,
  selectProductCourseByCategory,
  selectProductGuid
} from 'store/app/courseProductGuidSlice'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const dataDemo = {
  banner: {
    description:
      'Efficitur leo euismod massa arcu platea odio dolor posuere suspendisse. Torquent ornare lectus ut facilisis integer leo ',
    title: 'Lập trình CSS cho mọi người',
    price: 200000,
    author: 'X-Profile',
    priceSale: 150000,
    imageUrl: '/images/demoCourseCombo.png'
  },
  contentCourse: {
    description:
      'Magna conubia letius aptent mi vivamus natoque euismod ornare quisque lectus aliquet enim orci dignissim auctor proin dictumst ex tortor id torquent molestie a hendrerit ac nostra justo elementum consectetur mollis rutrum potenti vitae ',
    skillCourse: [
      { skillName: 'Github' },
      { skillName: 'Deep Learning' },
      { skillName: 'Daga Mining' },
      { skillName: 'Pandas' },
      { skillName: 'SQL' }
    ]
  },
  resultChapterTables: [
    {
      partCourseList: [
        {
          lessonList: [
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 1 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 2 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 3 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 4 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 5 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 6 : Giới thiệu tổng quan về khoá học'
            }
          ],
          coursePartNumber: 'Phần 1:  Kiến thức cơ bản về vẽ'
        },
        {
          lessonList: [
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 1 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 2 : Giới thiệu tổng quan về khoá học'
            }
          ],
          coursePartNumber: 'Phần 2:  Kiến thức cơ bản về vẽ'
        },
        {
          lessonList: [
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 1 : Giới thiệu tổng quan về khoá học'
            },
            {
              enumLessonType: 0,
              totalSeconds: 762,
              lessonName: 'Bài 2 : Giới thiệu tổng quan về khoá học'
            }
          ],
          coursePartNumber: 'Phần 3:  Kiến thức cơ bản về vẽ'
        }
      ],
      lessonCourseList: [
        [
          {
            enumLessonType: 0,
            name: 'Bài 1 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 2 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 3 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 4 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          }
        ],
        [
          {
            enumLessonType: 0,
            name: 'Bài 5 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 6 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 7 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 8 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          }
        ],
        [
          {
            enumLessonType: 0,
            name: 'Bài 9 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 10 : Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 11: Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          },
          {
            enumLessonType: 0,
            name: 'Bài 12: Giới thiệu tổng quan về khoá học',
            totalSeconds: 762
          }
        ]
      ],
      name: 'Chương 1',
      totalTimeParendId: 11097,
      totalTimeParendIdNull: 762,
      totalVideo: 27
    }
  ]
}

const ModalCourse = (props) => {
  const { handleCloseModal, modal } = props

  const modalRef = useRef(null)

  const chapterProductGuid = useSelector(selectChapterProductGuid)
  const productGuidDetail = useSelector(selectProductGuid)

  const { banner, contentCourse, productDetail, skillCourse, typeCourseCombo } =
    productGuidDetail
  const { resultChapterTables, course } = chapterProductGuid

  useOnClickOutside(modalRef, handleCloseModal)

  return (
    <div
      className={`${
        modal ? 'z-[10000] bg-black/30' : '-z-50 '
      } w-[100vw] h-[100vh] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24 duration-500 overflow-y-scroll`}
    >
      <div
        ref={modalRef}
        className={`w-[1024px]  bg-white rounded-2xl p-[40px] overflow-hidden duration-200 animate-fadeIn translate-y-20`}
      >
        <div className="relative  h-full">
          <div className="flex justify-end">
            <div
              onClick={() => handleCloseModal(false)}
              className="absolute cursor-pointer "
            >
              <XProfileIcon name="cancel" width="14" height="14" />
            </div>
          </div>
          <div className="mb-[32px]">
            <BannerCourse {...dataDemo?.banner} />
          </div>
          <div>
            <ContentCourse
              description={dataDemo?.contentCourse?.description}
              skillCourse={dataDemo?.contentCourse?.skillCourse}
            />
          </div>
          <div className="flex justify-center">
            <PartCourse resultChapterTables={dataDemo?.resultChapterTables} />
          </div>
        </div>
      </div>
    </div>
  )
}

ModalCourse.propTypes = {}

export default ModalCourse
