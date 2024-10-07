import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CourseItem from '../Card/CourseItem'
import HeadTitle from '../HeadTitle'

const CourseForPersonalList = (props) => {
  const {
    listCourse = [],
    handleLinkCourse = () => {},
    handleFavouriteCourse = () => {}
  } = props
  const [openDiscovery, setOpenDiscovery] = useState(false)
  const [itemHovered, setItemHovered] = useState(null)

  const handleOpenDiscovery = (id) => {
    setItemHovered(id)
    setOpenDiscovery(true)
  }
  const handleCloseDiscovery = () => {
    setOpenDiscovery(false)
  }

  if (listCourse?.length === 0) return
  return (
    <div className=" mx-auto relative ">
      <div className="max-w-[1140px] mx-auto px-2  mb-9 ">
        <HeadTitle showLink title="Dành cho bạn" href="/course/categories" />
      </div>
      <div className="max-w-[1140px] mx-auto px-2 grid grid-cols-2 sm:grid-cols-2  lg:grid-cols-4 place-items-center gap-5 ">
        {listCourse?.slice(0, 4).map((item, ind) => {
          return (
            <div key={ind} className="relative">
              <CourseItem
                {...item}
                itemHovered={itemHovered}
                isLastIndex={(ind + 1) % 4 === 0}
                handleOpenDiscovery={handleOpenDiscovery}
                openDiscovery={openDiscovery}
                handleCloseDiscovery={handleCloseDiscovery}
                handleFavouriteCourse={handleFavouriteCourse}
                handleLinkCourse={handleLinkCourse}
              />
            </div>
          )
        })}
      </div>
    </div>
  )
}

CourseForPersonalList.propTypes = {}

export default CourseForPersonalList
