import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import HeadTitle from 'common/presentation/HeadTitle'
import CourseItem from 'common/presentation/Card/CourseItem'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'

const CourseRelatedList = (props) => {
  const {
    listCourse = [],
    handleLinkCourse = () => {},
    handleFavouriteCourse
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

  return (
    <div className="w-full">
      <div className=" relative xl:w-[1180px]">
        <div className="  px-[20px]  ">
          <HeadTitle title="Các khoá học liên quan" />
        </div>
        <div className="xl:w-[1180px] w-auto">
          <Slider
            breakpoints={{
              330: {
                slidesPerView: 1,
                slidesPerGroup: 1
              },
              1024: {
                slidesPerView: 4,
                slidesPerGroup: 4,
                spaceBetween: -20
              }
            }}
            hasArrow={listCourse?.length > 4}
            hasShadow={false}
            stylePrev="p-[15.2px] border border-nude bg-white shadow-[0_16px_24px_rgba(0,0,0,0.04)]"
            classNameLeft="absolute z-10 -left-[28px] top-1/2 -translate-y-1/2 ml-[20px]"
            classNameRight="absolute z-10 -right-[28px] top-1/2 -translate-y-1/2 mr-[20px]"
          >
            {listCourse?.map((item, ind) => {
              return (
                <SwiperSlide key={ind} style={{ padding: '32px 20px' }}>
                  <div className="relative">
                    <CourseItem
                      {...item}
                      company={item?.company?.name || 'X-Profile'}
                      itemHovered={itemHovered}
                      isLastIndex={(ind + 1) % 4 === 0}
                      handleOpenDiscovery={handleOpenDiscovery}
                      openDiscovery={openDiscovery}
                      handleCloseDiscovery={handleCloseDiscovery}
                      handleLinkCourse={handleLinkCourse}
                      handleFavouriteCourse={handleFavouriteCourse}
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Slider>
        </div>
        {/* <div className="flex gap-[20px] justify-start">
          {listCourse?.slice(0, 4).map((item, ind) => {
            return (
              <div className="relative" key={ind}>
                <CourseItem
                  {...item}
                  company={item?.company?.name || 'X-Profile'}
                  itemHovered={itemHovered}
                  isLastIndex={(ind + 1) % 4 === 0}
                  handleOpenDiscovery={handleOpenDiscovery}
                  openDiscovery={openDiscovery}
                  handleCloseDiscovery={handleCloseDiscovery}
                  handleLinkCourse={handleLinkCourse}
                  handleFavouriteCourse={handleFavouriteCourse}
                />
              </div>
            )
          })}
        </div> */}
      </div>
    </div>
  )
}

CourseRelatedList.propTypes = {}
CourseRelatedList.defaultProps = {}

export default CourseRelatedList
