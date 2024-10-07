import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'

import { OrgViewCard } from 'common/presentation/Card/OrgViewCard'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

const TeamListViewMode = (props) => {
  const { departments, handleAction = () => {}, onClickEdit = () => {} } = props

  return (
    <div className="max-w-[1140px] mx-auto pb-[2.75rem]  xl:pt-[52px]">
      <p className="xl:text-h2 font-bold text-center mb-8">
        Các phòng ban trong doanh nghiệp
      </p>
      {departments?.length > 0 ? (
        <div className="grid grid-cols-4 gap-4">
          {departments?.map((department, ind) => {
            const {
              imageUrl: avatarUrl,
              name,
              shortDescription,
              recruitmentAmount,
              departmentId,
              isActive
            } = department
            if (isActive) {
              return (
                <div key={`profile-company-team-${ind}`}>
                  <OrgViewCard
                    org={{
                      avatarUrl,
                      name,
                      subtitle: shortDescription,
                      recruitmentAmount,
                      isActive
                    }}
                    type="avatar"
                    handleAction={() => handleAction(departmentId)}
                  />
                </div>
              )
            }
          })}
        </div>
      ) : (
        <div className=" w-full mt-[48px] mb-[52px]">
          <p className="text-p18 text-center">Hiện chưa có phòng ban nào</p>
        </div>
      )}
    </div>
  )
}

export default TeamListViewMode
