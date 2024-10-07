import React from 'react'
import PropTypes from 'prop-types'
import { OrgCard } from 'common/presentation/Card'
import { Slider } from 'common/presentation/Swiper'
import { SwiperSlide } from 'swiper/react'

const TeamList = (props) => {
  const { departments, handleAction } = props
  return (
    <div className="max-w-[1140px]  ">
      <Slider
        classNameSwiper="!px-5 xl:!pl-0"
        breakpoints={{
          330: {
            slidesPerView: 1.5,
            slidesPerGroup: 1
          },
          800: {
            slidesPerView: 2,
            slidesPerGroup: 2,
            spaceBetween: 36
          },
          1100: {
            slidesPerView: 4,
            slidesPerGroup: 4
          },
          1280: {
            slidesPerView: 4,
            slidesPerGroup: 4
          }
        }}
        hasArrow={true}
      >
        {departments?.map((department, ind) => {
          const {
            imageUrl: avatarUrl,
            name,
            shortDescription,
            recruitmentAmount,
            departmentId
          } = department
          return (
            <SwiperSlide
              key={`profile-company-team-${ind}`}
              style={{ height: 'auto' }}
            >
              <div className="xl:py-10 h-full">
                <OrgCard
                  org={{
                    avatarUrl,
                    name,
                    subtitle: shortDescription,
                    recruitmentAmount
                  }}
                  type="avatar"
                  handleAction={() => handleAction(departmentId)}
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Slider>
    </div>
  )
}

TeamList.propTypes = {
  departments: PropTypes.array,
  handleAction: PropTypes.func
}

TeamList.defaultProps = {
  departments: [],
  handleAction: () => {}
}

export default TeamList
