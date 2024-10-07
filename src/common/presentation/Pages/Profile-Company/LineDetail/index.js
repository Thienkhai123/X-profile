import React from 'react'
import PropTypes from 'prop-types'
import LineCard from '../LineCard'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'
import { DepartmentPositionViewCard } from 'common/presentation/DepartmentPositionViewCard'

const LineDetail = (props) => {
  const { departmentPositions, handle, isFirstRow, avatarCompany } = props

  return (
    <div className="xl:w-[1140px] w-full mx-auto px-0">
      <Slider
        breakpoints={{
          330: {
            slidesPerView: 1.3,
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
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        }}
        hasArrow={departmentPositions?.length > 3}
        spaceBetween={24}
        classNameSwiper="!px-5 xl:!px-0"
      >
        {departmentPositions?.map((element, ind) => {
          const {
            departmentPositionId,
            name,
            shortDescription,
            meta,
            recruitmentAmount,
            isActive
          } = element || {}
          return (
            <SwiperSlide key={departmentPositionId} style={{ height: 'auto' }}>
              <div className="py-10">
                <DepartmentPositionViewCard
                  org={{
                    avatarUrl: avatarCompany || meta?.avatarUrl,
                    name,
                    subtitle: shortDescription,
                    recruitmentAmount,
                    isActive
                  }}
                  type="avatar"
                  handleAction={() => handle(departmentPositionId)}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Slider>
    </div>
  )
}

LineDetail.propTypes = {
  handle: PropTypes.func,
  departmentPositions: PropTypes.array
}
LineDetail.defaultProps = { handle: () => {}, departmentPositions: [] }

export default LineDetail
