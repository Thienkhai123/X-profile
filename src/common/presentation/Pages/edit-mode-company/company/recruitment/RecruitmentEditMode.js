import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import { OrgEditCard } from 'common/presentation/Card/OrgEditCard'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import { SwiperSlide } from 'swiper/react'
import { HightLightJobEditMode } from './HightLightJobEditMode'
import { HightLightJobViewMode } from './HightLightJobViewMode'
import { useRouter } from 'next/router'
import XProfileIcon from 'common/presentation/Icons'

const RecruitmentEditMode = (props) => {
  const {
    recruitmentCampaign = [],
    handleAction = () => {},
    handleClickCreate = () => {},
    handleClickPen = () => {},
    handleAdd = () => {},
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

  const dispatch = useDispatch()

  return (
    <div className="py-5 pb-[72px]  xl:pl-0 xl:pr-0 px-5 xl:px-0 pb">
      <div className="text-center mb-10 ">
        <p className="xl:text-h2 text-p20-bold text-neutral">
          {/* {PROFILE_COMPANY.profileCompany.titleRecruit} */}
          Các vị trí tuyển dụng nổi bật
        </p>
      </div>
      {recruitmentCampaign.length > 0 && (
        <div
          onClick={() => {
            handleAdd()
          }}
          className="max-w-[1140px] mx-auto flex items-center gap-3 justify-end cursor-pointer mb-4"
        >
          <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
          <p className="text-p18-bold text-blue-light">Thêm vị trí nổi bật</p>
        </div>
      )}
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
          <div className="flex items-center justify-center gap-24">
            <div>
              <div className="flex justify-center mb-6">
                <Image
                  src={'/images/empty4.png'}
                  width={200}
                  height={200}
                  alt=""
                  quality={100}
                />
              </div>
              <p className="text-p18 text-center text-neutral opacity-[0.8]">
                Hãy thêm vị trí tuyển dụng nổi bật cho công ty của bạn nhé!
              </p>
              <div className="flex justify-center">
                <div
                  onClick={() => handleAdd()}
                  className=" w-[280px] h-[52px] gap-4 cursor-pointer hover:opacity-75 rounded-lg bg-button mt-10 flex  justify-center items-center"
                >
                  <XProfileIcon
                    name="add"
                    width="24"
                    height="24"
                    stroke="#000000"
                  />
                  <p className="sm:text-p18-bold text-p14 font-bold">
                    Tạo vị trí tuyển dụng
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

RecruitmentEditMode.propTypes = {
  toggleModal: PropTypes.func
}

RecruitmentEditMode.defaultProps = {
  toggleModal: () => {}
}

export default RecruitmentEditMode
