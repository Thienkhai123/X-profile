import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CourseItem from 'common/presentation/Card/CourseItem'
import { DUMP_COURSE } from 'common/presentation/Pages/Demo/constants'
import Button from 'common/presentation/Button'
import { ACCESS_TOKEN } from 'common/config/app.constants'

const InternalCourseViewMode = (props) => {
  const { internalCourses, handleFavouriteCourseList = () => {} } = props

  const [itemHovered, setItemHovered] = useState(null)
  const [openDiscovery, setOpenDiscovery] = useState(false)

  const handleOpenDiscovery = async (id) => {
    setItemHovered(id)
    setOpenDiscovery(true)
  }
  const handleCloseDiscovery = async () => {
    setOpenDiscovery(false)
  }

  const handleLinkCourse = (productGruid, isUserOwned) => {
    window.location.href = `/course/learn/${productGruid}`
  }

  const handleMoreCourse = () => {
    const token = localStorage.getItem(ACCESS_TOKEN)
    window.open(
      process.env.NEXT_PUBLIC_LMS +
        'user?token=' +
        token +
        '&redirect=companycourse'
    )
  }

  return (
    <div>
      {internalCourses?.length === 0 && (
        <div className="py-[52px]">
          <div className="text-center mb-[64px] ">
            <p className="xl:text-h2 text-p20-bold text-neutral">
              Khoá học nội bộ
            </p>
          </div>
          <p className="xl:text-p18 text-p14 text-center">
            Hiện chưa có khoá học nào
          </p>
        </div>
      )}
      {internalCourses?.length > 0 && (
        <div className="pt-[26px] pb-[80px]">
          <div className="text-center mb-[64px] ">
            <p className="xl:text-h2 text-p20-bold text-neutral">
              Khoá học nội bộ
            </p>
          </div>
          <div className="max-w-[1140px] mx-auto px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 place-items-center gap-5 ">
            {internalCourses?.map((item, ind) => {
              return (
                <div key={ind} className="relative">
                  <CourseItem
                    {...item}
                    itemHovered={itemHovered}
                    isLastIndex={(ind + 1) % 3 === 0}
                    handleOpenDiscovery={handleOpenDiscovery}
                    openDiscovery={openDiscovery}
                    handleCloseDiscovery={handleCloseDiscovery}
                    // maxWidth="100%"
                    // widthImg={360.87}
                    // widthHover="377.87px"
                    // leftPosition="-left-[372.87px]"
                    // rightPositon="-right-[372.87px]"
                    handleFavouriteCourse={handleFavouriteCourseList}
                    handleLinkCourse={() => handleLinkCourse(item?.seoName)}
                  />
                </div>
              )
            })}
          </div>
          <div className="flex justify-center mt-[40px]">
            <Button
              title="Xem thêm"
              width="w-auto"
              padding="p-[13px_32px]"
              margin="mt-0"
              rounded="rounded-[8px]"
              height="h-[56px]"
              onClick={handleMoreCourse}
            />
          </div>
        </div>
      )}
    </div>
  )
}

InternalCourseViewMode.propTypes = {}
InternalCourseViewMode.defaultProps = {}

export default InternalCourseViewMode
