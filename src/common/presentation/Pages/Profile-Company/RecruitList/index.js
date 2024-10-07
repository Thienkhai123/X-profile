import React from 'react'
import PropTypes from 'prop-types'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import { useRouter } from 'next/router'

const RecruitList = (props) => {
  const {
    recruitmentCampaign,
    isAuthentication,
    id,
    ownedCompany,
    isTemplate = false
  } = props
  const { push } = useRouter()
  const handleLink = (companyId, departmentId, departmentPositionId) => {
    if (departmentId) {
      push(
        `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
      )
    } else {
      push(`/profile-company/${companyId}/${id}/${departmentPositionId}`)
    }
  }

  return (
    <div className="xl:w-[1228px] w-auto  xl:mx-auto   ">
      <Slider
        breakpoints={{
          330: {
            slidesPerView: 2,
            slidesPerGroup: 1,
            spaceBetween: 8
          },
          800: {
            slidesPerView: 2,
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
        hasArrow={recruitmentCampaign.length > 3}
      >
        {Array.from(recruitmentCampaign)?.map((recruitment) => {
          const {
            recruitmentCampaignId,
            companyId,
            departmentId,
            company,
            departmentPositionId
          } = recruitment
          const { tag } = company
          return (
            <SwiperSlide key={recruitmentCampaignId}>
              <div className="py-10">
                <HightlightJobCard
                  isTemplate={isTemplate}
                  showHeart={!ownedCompany}
                  job={recruitment}
                  isAuthentication={!ownedCompany && isAuthentication}
                  handleAction={() =>
                    handleLink(tag, departmentId, departmentPositionId)
                  }
                />
              </div>
            </SwiperSlide>
          )
        })}
      </Slider>
    </div>
  )
}

RecruitList.propTypes = {
  recruitmentCampaign: PropTypes.array,
  isAuthentication: PropTypes.bool
}
RecruitList.defaultProps = {
  recruitmentCampaign: [],
  isAuthentication: false
}

export default RecruitList
