import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'

import { OrgViewCard } from 'common/presentation/Card/OrgViewCard'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'
import { HightLightJobViewMode } from './HightLightJobViewMode'
import { useRouter } from 'next/router'

const RecruitmentViewMode = (props) => {
  const {
    recruitmentCampaign = [],
    handleAction = () => {},
    onClickEdit = () => {},
    trans
  } = props
  const { push } = useRouter()
  const handleLink = (companyId, departmentId, departmentPositionId) => {
    if (departmentId) {
      push(
        `/profile-company/${companyId}/${departmentId}/${departmentPositionId}/edit`
      )
    } else {
      push(`/profile-company/${companyId}/${id}/${departmentPositionId}/edit`)
    }
  }

  return (
    <div className="py-5  xl:pl-0 xl:pr-0 px-5 xl:px-0">
      <div className="text-center mb-10 ">
        <p className="xl:text-h2 text-p20-bold text-neutral xl:pt-8">
          {/* {PROFILE_COMPANY.profileCompany.titleRecruit} */}
          Các vị trí tuyển dụng nổi bật
        </p>
      </div>
      <div className="max-w-[1140px] mx-auto ">
        {recruitmentCampaign.length > 0 && (
          <div className="xl:w-[1140px] w-auto  xl:mx-auto   ">
            <Slider
              breakpoints={{
                330: {
                  slidesPerView: 1,
                  slidesPerGroup: 1
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
                  <SwiperSlide className="mb-4" key={recruitmentCampaignId}>
                    <HightLightJobViewMode
                      job={recruitment}
                      // isAuthentication={isAuthentication}
                      handleAction={() =>
                        handleLink(
                          companyId,
                          departmentId,
                          departmentPositionId
                        )
                      }
                    />
                  </SwiperSlide>
                )
              })}
            </Slider>
          </div>
        )}
        {recruitmentCampaign.length === 0 && (
          <p className="xl:text-p18 text-p14 text-center mb-[52px]">
            {trans.profileCompany.titleEmptyRecruitment}
          </p>
        )}
      </div>
    </div>
  )
}

export default RecruitmentViewMode
