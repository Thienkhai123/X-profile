import React from 'react'
import PropTypes from 'prop-types'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import { SwiperSlide } from 'swiper/react'
import { Slider } from 'common/presentation/Swiper'
import { useRouter } from 'next/router'
import ButtonIcon from 'common/presentation/ButtonIcon'
import Image from 'next/image'

const RecruitmentListEditMode = (props) => {
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
      <div className="text-center  mb-[32px]">
        <p className="text-h2 text-neutral">Các vị trí đang tuyển dụng</p>
      </div>
      <div>
        {recruitmentCampaign.length > 0 && (
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
        )}
        {recruitmentCampaign.length === 0 && (
          <div className="flex items-center justify-center gap-24 ">
            <div className="flex flex-col items-center ">
              <Image
                src="/images/empty5.png"
                alt=""
                width={200}
                height={200}
                quality={100}
              />
              <p className="text-p18 text-center opacity-[0.8] text-neutral mt-[24px] mb-[32px]">
                Hiện chưa có vị trí nào đang tuyển dụng
              </p>
              {/* <div className=" flex  justify-center items-center mb-[52px]">
                <ButtonIcon
                  iconName="addTeam"
                  title="Tạo vị trí mới"
                  width="w-[224px]"
                  height="h-[52px]"
                  rounded="rounded-[8px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  onClick={() => handleClickCreate()}
                />
              </div> */}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

RecruitmentListEditMode.propTypes = {}
RecruitmentListEditMode.defaultProps = {}

export default RecruitmentListEditMode
