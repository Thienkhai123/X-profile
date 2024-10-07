import React from 'react'
import PropTypes from 'prop-types'
import CourseIntroCard from '../Card/CourseIntroCard'
import CourseItem from '../Card/CourseItem'

const CourseList = (props) => {
  const { courses, handleLinkCourse = () => {} } = props
  return (
    <div className="grid grid-cols-3 gap-4">
      {courses?.map((item, index) => {
        const {
          company,
          imageUrl,
          finalPrice,
          name,
          basePrice,
          length,
          totalVideoCount,
          id,
          totalUser,
          shortDescription,
          seoName,
          isUserOwned,
          totalComment,
          isCompanyCourse
        } = item
        return (
          <div key={index}>
            <CourseItem
              company={company}
              seoName={seoName}
              isUserOwned={isUserOwned}
              imageUrl={imageUrl}
              finalPrice={finalPrice}
              name={name}
              isCompanyCourse={isCompanyCourse}
              totalComment={totalComment}
              basePrice={basePrice}
              length={length}
              totalVideoCount={totalVideoCount}
              shortDescription={shortDescription}
              handleLinkCourse={handleLinkCourse}
              totalUser={totalUser}
            />
          </div>
        )
      })}
    </div>
  )
}

CourseList.propTypes = {}
CourseList.defaultProps = {
  courses: [
    {
      id: '1',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 1',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000
    },
    {
      id: '2',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 2',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000
    },
    {
      id: '3',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 3',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 0,
      basePrice: 0
    },
    {
      id: '4',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 4',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 0,
      basePrice: 0
    },
    {
      id: '5',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 5',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 0
    },
    {
      id: '6',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 6',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 0,
      basePrice: 100000
    },
    {
      id: '7',
      name: 'Cẩm nang từ A-Z Photoshop cho Designer 7',
      imageUrl: '/images/Course/Rectangle_5558.png',
      shortDescription:
        'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 18000,
      finalPrice: 50000,
      basePrice: 700000
    }
  ]
}

export default CourseList
