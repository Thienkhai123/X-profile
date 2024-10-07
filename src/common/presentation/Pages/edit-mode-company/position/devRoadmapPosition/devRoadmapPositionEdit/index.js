import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import DevRoadmapPositionItem from '../devRoadmapPositionItem'
import useTrans from 'common/hooks/useTrans'
import XProfileIcon from 'common/presentation/Icons'
import { Slider } from 'common/presentation/Swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { Grid, Navigation } from 'swiper'
import { NextArrow, PreviousArrow } from 'common/presentation/Swiper/Arrows'
const DevRoadmapPositionEdit = (props) => {
  const {
    titleAdd,
    editmode,
    handleAdd = () => {},
    positionList = [],
    onChangeEdit = () => {},
    toggleModal = () => {},
    handleRemoveItem = () => {},
    errorsList = []
  } = props
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef(null)
  useEffect(() => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex + 1)
      const swiper = swiperRef.current.swiper
      swiper.slideTo(activeIndex + 1)
    } else {
      setActiveIndex(activeIndex + 1)
    }
  }, [positionList.length])
  return (
    <div id="roadMap" className="pb-10">
      <div className="text-center my-10">
        <p className="sm:text-h2 text-p20-bold text-neutral">
          {PROFILE_COMPANY.titleCareerPathTeam}
        </p>
      </div>
      <div
        onClick={() => {
          handleAdd()
        }}
        className="flex items-center gap-3 justify-end cursor-pointer mb-4"
      >
        <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
        <p className="text-p18-bold text-blue-light">Thêm lộ trình</p>
      </div>
      <div className="flex justify-center">
        <div className="relative xl:max-w-[1140px] w-screen  px-5 xl:px-0">
          {positionList?.length > 3 && (
            <div className="hidden xl:block">
              <PreviousArrow
                stylePrev="bg-white p-[15.2px] border border-nude shadow-blur24"
                prevRef={prevRef}
                hasShadow={false}
              />
              <NextArrow
                stylePrev="bg-white p-[15.2px] border border-nude shadow-blur24"
                nextRef={nextRef}
                hasShadow={false}
              />
            </div>
          )}
          <Swiper
            ref={swiperRef}
            breakpoints={{
              330: {
                slidesPerView: 1,
                slidesPerGroup: 1
              },
              700: {
                slidesPerView: 2.4,
                slidesPerGroup: 2
              },
              1100: {
                slidesPerView: 3,
                slidesPerGroup: 3
              },
              1280: {
                slidesPerView: 3,
                slidesPerGroup: 1
              }
            }}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current
            }}
            modules={[Grid, Navigation]}
            spaceBetween={0}
            initialSlide={activeIndex}
          >
            {positionList?.map((element, ind) => {
              const isErrorsImageUrl = errorsList?.some(
                (element) => element === `roadMap_imageUrl_${ind}`
              )
              const isErrorsName = errorsList?.some(
                (element) => element === `roadMap_name_${ind}`
              )
              return (
                <SwiperSlide key={`position-roadmap-${ind}`}>
                  <DevRoadmapPositionItem
                    {...element}
                    isErrorsName={isErrorsName}
                    isErrorsImageUrl={isErrorsImageUrl}
                    positionList={positionList}
                    number={positionList?.length}
                    index={ind}
                    toggleModal={toggleModal}
                    onChangeEdit={onChangeEdit}
                    handleRemoveItem={handleRemoveItem}
                  />
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

DevRoadmapPositionEdit.propTypes = {
  titleAdd: PropTypes.string
}
DevRoadmapPositionEdit.defaultProps = {
  titleAdd: 'Thêm thẻ'
}

export default DevRoadmapPositionEdit
