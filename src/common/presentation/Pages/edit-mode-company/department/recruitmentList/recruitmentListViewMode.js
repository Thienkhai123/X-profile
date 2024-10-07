import React from 'react'
import PropTypes from 'prop-types'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import { useRouter } from 'next/router'

const RecruitmentListViewMode = (props) => {
  const { recruitmentCampaign = [], isAuthentication, id, ownedCompany } = props
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
    <div className="pt-[52px] pb-[46px] pl-5 pr-5 xl:pl-0 xl:pr-0">
      <div className="text-center ">
        <p className="text-h2 text-neutral">Các vị trí đang tuyển dụng</p>
      </div>
      {recruitmentCampaign.length > 0 ? (
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
      ) : (
        <div className=" w-full">
          <p className="text-p18 text-center mt-[48px]  opacity-[0.8]">
            Hiện chưa có vị trí tuyển dụng nào
          </p>
        </div>
      )}
    </div>
  )
}

RecruitmentListViewMode.propTypes = {}
RecruitmentListViewMode.defaultProps = {}

export default RecruitmentListViewMode
