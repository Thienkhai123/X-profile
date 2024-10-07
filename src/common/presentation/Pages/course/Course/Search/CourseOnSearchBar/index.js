import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const CourseOnSearchBar = (props) => {
  const { imageUrl, name, category, seoName, handleLinkCourse } = props
  return (
    <div
      className="flex gap-4 cursor-pointer"
      onClick={() => handleLinkCourse(seoName)}
    >
      <Image
        src={imageUrl || ''}
        priority
        alt="course on search bar"
        width={97}
        height={48}
        objectFit="cover"
        className="rounded-[2px]"
      />
      <div className="flex flex-col gap-1">
        <p className="text-p18-bold text-black">{name}</p>
        <p className="text-p16 font-[400] text-button-2">{category}</p>
      </div>
    </div>
  )
}

CourseOnSearchBar.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string,
  category: PropTypes.string
}
CourseOnSearchBar.defaultProps = {
  imageUrl: '/images/course/Rectangle_5558.png',
  name: '',
  category: ''
}

export default CourseOnSearchBar
