import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { SwiperSlide } from 'swiper/react'
import { Slider } from '../Swiper'
import CourseLovely from '../Card/CourseLovely'
import { CourseCard } from '../Card'
import HeadTitle from '../HeadTitle'

const CourseFavoriteList = (props) => {
  const { favoriteList = [], handleLinkCourse, handleFavouriteCourse } = props
  const [state, setState] = useState({
    openDiscovery: false,
    itemHovered: null
  })
  const handleOpenDiscovery = (id) => {
    setState({
      ...state,
      itemHovered: id,
      openDiscovery: true
    })
  }
  const handleCloseDiscovery = () => {
    setState({
      ...state,
      openDiscovery: false
    })
  }

  return (
    <div className="relative max-w-[1140px] mx-auto w-full  ">
      <div className="max-w-[1140px] mx-auto px-2 mt-14 mb-9 ">
        <HeadTitle
          showLink
          title="Khoá học được yêu thích nhất"
          href="/course/categories"
        />
      </div>
      <div>
        <Slider
          classNameSwiper="swiper-radius"
          breakpoints={{
            330: {
              slidesPerView: 1,
              slidesPerGroup: 1,
              spaceBetween: 20
            }
          }}
          hasArrow={favoriteList?.length > 1}
          classNameLeft="absolute z-10 -left-[25px] top-1/2 -translate-y-1/2 "
          classNameRight="absolute z-10 -right-[25px] top-1/2 -translate-y-1/2 "
          stylePrev=" p-4 bg-white drop-shadow-blur24  "
          maxBackfaceHiddenSlides={0}
        >
          {favoriteList?.map((item, ind) => {
            const {
              name,
              company,
              basePrice,
              finalPrice,
              length,
              totalVideoCount,
              totalUser,
              totalComment,
              imageUrl,
              id,
              shortDescription,
              seoName,
              isUserOwned,
              isUserLiked,
              productGuid
            } = item
            return (
              <SwiperSlide key={ind}>
                <CourseLovely
                  name={name}
                  productGuid={productGuid}
                  isUserLiked={isUserLiked}
                  company={company}
                  basePrice={basePrice}
                  id={id}
                  finalPrice={finalPrice}
                  seoName={seoName}
                  isUserOwned={isUserOwned}
                  shortDescription={shortDescription}
                  length={length}
                  totalComment={totalComment}
                  totalUser={totalUser}
                  totalVideoCount={totalVideoCount}
                  imageUrl={imageUrl}
                  handleOpenDiscovery={handleOpenDiscovery}
                  handleCloseDiscovery={handleCloseDiscovery}
                  handleLinkCourse={handleLinkCourse}
                  openDiscovery={state?.openDiscovery}
                  itemHovered={state?.itemHovered}
                  handleFavouriteCourse={handleFavouriteCourse}
                />
              </SwiperSlide>
            )
          })}
        </Slider>
      </div>
    </div>
  )
}

CourseFavoriteList.propTypes = {}
CourseFavoriteList.defaultProps = {
  favoriteList: [
    {
      id: 1,
      name: 'Bí quyết xây dựng và duy trì văn hoá doanh nghiệp 1',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 800000,
      basePrice: 10000000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 2,
      name: 'Bí quyết xây dựng và duy trì văn hoá doanh nghiệp 2',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 30,
      length: 9282,
      finalPrice: 800000,
      basePrice: 10000000,
      totalUser: 3000,
      totalComment: 3000
    }
  ]
}

export default CourseFavoriteList
