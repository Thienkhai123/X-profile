import React from 'react'
import PropTypes from 'prop-types'
import LineCard from '../lineCard'
import useTrans from 'common/hooks/useTrans'
import DevRoadmapPositionViewItem from '../devRoadmapPositionViewItem'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'

const DevRoadmapPositionView = (props) => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans
  const { positionList } = props

  return (
    <div>
      <div className="text-center xl:my-10">
        <p className="sm:text-h2 text-p20-bold text-neutral">
          {PROFILE_COMPANY.titleCareerPathTeam}
        </p>
      </div>
      <div className="text-center mb-10">
        {/* {positionList?.length > 0 && (
          <div className="text-center mb-14">
            <p className="sm:text-h2 text-p20-bold text-neutral">
              {PROFILE_COMPANY.titleCareerPathTeam}
            </p>
          </div>
        )} */}
        <div className="flex justify-center mt-4 xl:mt-0">
          <div className="relative xl:max-w-[1140px] w-screen px-0">
            <Slider
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
              hasArrow={positionList?.length > 3}
              spaceBetween={0}
              hasShadow={false}
              classNameLeft="absolute z-50 -left-[71px] top-1/2 -translate-y-1/2"
              classNameRight="absolute z-50 -right-[71px] top-1/2 -translate-y-1/2"
              stylePrev="bg-white p-[15.2px] border border-nude shadow-blur24"
            >
              {positionList?.map((roadmap, index) => {
                return (
                  <SwiperSlide key={index}>
                    <DevRoadmapPositionViewItem
                      {...roadmap}
                      index={index}
                      number={positionList?.length}
                      positionList={positionList}
                    />
                  </SwiperSlide>
                )
              })}
            </Slider>
          </div>
        </div>
      </div>
    </div>
  )
}

DevRoadmapPositionView.propTypes = {}

export default DevRoadmapPositionView
