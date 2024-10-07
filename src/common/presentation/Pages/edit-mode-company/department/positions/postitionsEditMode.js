import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import { DepartmentPositionEditCard } from 'common/presentation/Card/DepartmentPositionEditCard'
import XProfileIcon from 'common/presentation/Icons'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { SwiperSlide } from 'swiper/react'

const PositionsDepartmentEditMode = (props) => {
  const {
    positions = [],
    handleAction = () => {},
    handleClickCreate = () => {},
    handleClickPen = () => {},
    handleActionCard = () => {},
    handleClickDuplicate = () => {},
    avatarCompany
  } = props

  const dispatch = useDispatch()

  return (
    <div className="max-w-[1140px] mx-auto xl:pt-[52px] ">
      <p className="xl:text-h2 font-bold text-center mb-8">
        Các vị trí trong Team
      </p>
      {positions?.length > 0 && (
        <div
          onClick={() => {
            handleClickCreate()
          }}
          className="max-w-[1140px] mx-auto flex items-center gap-3 justify-end cursor-pointer mb-4"
        >
          <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
          <p className="text-p18-bold text-blue-light">Thêm vị trí</p>
        </div>
      )}
      <div className="">
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
            {positions?.map((position, index) => {
              const {
                imageUrl,
                name,
                shortDescription,
                recruitmentAmount,
                departmentId,
                departmentPositionId,
                isActive,
                meta
              } = position
              return (
                <SwiperSlide
                  key={`profile-company-team-${index}`}
                  style={{ height: 'auto' }}
                >
                  <div className="pb-[52px]">
                    <DepartmentPositionEditCard
                      org={{
                        imageUrl: imageUrl,
                        avatarUrl: avatarCompany || meta?.avatarUrl,
                        // avatarUrl: meta?.avatarUrl,

                        name,
                        subtitle: shortDescription,
                        recruitmentAmount,
                        isActive
                      }}
                      type="avatar"
                      handleAction={() =>
                        handleAction({
                          ...positions[index],
                          id: index,
                          isActive: !isActive
                        })
                      }
                      handleClickPen={() =>
                        handleClickPen(departmentPositionId)
                      }
                      handleActionCard={() =>
                        handleActionCard(departmentPositionId)
                      }
                      handleClickDuplicate={() =>
                        handleClickDuplicate(departmentPositionId)
                      }
                    />
                  </div>
                </SwiperSlide>
              )
            })}
          </Slider>
        ) : (
          <div className="flex items-center justify-center gap-24">
            <div className="flex flex-col items-center">
              <Image
                src="/images/empty5.png"
                alt=""
                width={200}
                height={200}
                quality={100}
              />
              <p className="text-p18 text-center opacity-[0.8] text-neutral mt-[24px] mb-[32px]">
                Bạn chưa tạo vị trí công việc cho Team. Hãy tạo vị trí công việc
                mới cho phòng ban của bạn nhé!
              </p>
              <div className=" flex  justify-center items-center mb-[52px]">
                <ButtonIcon
                  iconName="addTeam"
                  title="Tạo vị trí mới"
                  width="w-[224px]"
                  height="h-[52px]"
                  rounded="rounded-[8px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  onClick={() => handleClickCreate()}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

PositionsDepartmentEditMode.propTypes = {
  toggleModal: PropTypes.func
}

PositionsDepartmentEditMode.defaultProps = {
  toggleModal: () => {}
}

export default PositionsDepartmentEditMode
