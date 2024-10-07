import Button from 'common/presentation/Button'
import { DepartmentPositionViewCard } from 'common/presentation/DepartmentPositionViewCard'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import { SwiperSlide } from 'swiper/react'

const PositionsDepartmentViewMode = (props) => {
  const {
    positions = [],
    handleAction = () => {},
    onClickEdit = () => {},
    avatarCompany
  } = props

  return (
    <div className="max-w-[1140px] mx-auto xl:pt-[88px] ">
      <p className="xl:text-h2 font-bold text-center mb-8">
        Các vị trí trong Team
      </p>
      {positions?.length > 0 ? (
        <Slider
          breakpoints={{
            330: {
              slidesPerView: 1.5,
              slidesPerGroup: 1
            },
            800: {
              slidesPerView: 2,
              slidesPerGroup: 2
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
          spaceBetween={36}
          hasArrow={positions.length > 3}
          hasShadow={false}
          classNameLeft="absolute z-50 -left-[80px] top-1/2 -translate-y-1/2"
          classNameRight="absolute z-50 -right-[80px] top-1/2 -translate-y-1/2"
          stylePrev="bg-white p-[19.15px] shadow-blur24 border border-nude"
        >
          {positions?.map((position, ind) => {
            const {
              imageUrl,
              name,
              shortDescription,
              recruitmentAmount,
              departmentPositionId,
              isActive,
              meta
            } = position
            if (isActive) {
              return (
                <SwiperSlide
                  key={`profile-company-team-${ind}`}
                  style={{ height: 'auto' }}
                >
                  <div className="pb-[52px]">
                    <DepartmentPositionViewCard
                      org={{
                        imageUrl: imageUrl,
                        avatarUrl: avatarCompany || meta?.avatarUrl,
                        // avatarUrl: meta?.avatarUrl,

                        name,
                        subtitle: shortDescription,
                        recruitmentAmount,
                        isActive
                      }}
                      // height="min-h-[387px]"
                      type="avatar"
                      handleAction={() => handleAction(departmentPositionId)}
                    />
                  </div>
                </SwiperSlide>
              )
            }
          })}
        </Slider>
      ) : (
        <div className=" w-full">
          <p className="text-p18 text-center mt-[48px] mb-[52px] opacity-[0.8]">
            Hiện chưa có vị trí công việc nào
          </p>
        </div>
      )}
    </div>
  )
}

export default PositionsDepartmentViewMode
