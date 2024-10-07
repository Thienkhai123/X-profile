import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import { OrgEditCard } from 'common/presentation/Card/OrgEditCard'
import XProfileIcon from 'common/presentation/Icons'
import { Slider } from 'common/presentation/Swiper'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import {
  selectDepartmentsDefault,
  updateDepartment
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { SwiperSlide } from 'swiper/react'

const TeamListEditMode = (props) => {
  const {
    departments = [],
    handleAction = () => {},
    handleClickCreate = () => {},
    handleClickPen = () => {},
    handleActionCard = () => {},
    handleClickDuplicate = () => {}
  } = props
  const FILTER_DATA = [
    {
      title: 'Tất cả',
      value: 0
    },
    {
      title: 'Bản nháp',
      value: 1
    },
    {
      title: 'Đang hiển thị',
      value: 2
    }
  ]
  const dispatch = useDispatch()
  const [filter, setFilter] = useState(0)
  const handleClickFilter = (value) => {
    setFilter(value)
  }
  return (
    <div className="max-w-[1140px] mx-auto  xl:pt-[52px] pb-[2.75rem]">
      <p className="xl:text-h2 font-bold text-center mb-8">
        Các phòng ban trong doanh nghiệp
      </p>
      {departments?.length > 0 && (
        <div
          onClick={() => {
            handleClickCreate()
          }}
          className="max-w-[1140px] mx-auto flex items-center gap-3 justify-end cursor-pointer mb-4"
        >
          <XProfileIcon name="add" width="24" height="24" stroke="#294F9B" />
          <p className="text-p18-bold text-blue-light">Thêm phòng ban</p>
        </div>
      )}
      {departments?.length > 0 && (
        <div className="flex items-center justify-start gap-4">
          {FILTER_DATA?.map((el, index) => {
            const { title, value } = el
            return (
              <div
                key={index}
                onClick={() => handleClickFilter(value)}
                className={`px-3 py-4 rounded-xl  border border-grey-3 w-fit group transition-all cursor-pointer hover:bg-blue-light  ${
                  value === filter ? 'bg-blue-light text-white' : 'bg-white'
                }`}
              >
                <p
                  className={`text-p16 group-hover:text-white group-hover:font-bold ${
                    value === filter ? 'font-bold text-white' : 'text-grey-1'
                  }`}
                >
                  {title}
                </p>
              </div>
            )
          })}
        </div>
      )}
      <div className=" mt-6">
        {departments?.length > 0 ? (
          <div className="grid grid-cols-4 gap-4">
            {departments?.map((department, index) => {
              const {
                imageUrl: avatarUrl,
                name,
                shortDescription,
                recruitmentAmount,
                departmentId,
                isActive
              } = department
              if (filter === 2) {
                if (isActive) {
                  return (
                    <div
                      key={`profile-company-team-${index}`}
                      style={{ height: 'auto' }}
                    >
                      <OrgEditCard
                        org={{
                          avatarUrl,
                          name,
                          subtitle: shortDescription,
                          recruitmentAmount,
                          isActive
                        }}
                        type="avatar"
                        handleAction={() =>
                          handleAction({
                            ...departments[index],
                            id: index,
                            isActive: !isActive
                          })
                        }
                        handleClickPen={() => handleClickPen(departmentId)}
                      />
                    </div>
                  )
                }
              } else if (filter === 1) {
                if (!isActive) {
                  return (
                    <div
                      key={`profile-company-team-${index}`}
                      style={{ height: 'auto' }}
                    >
                      <OrgEditCard
                        org={{
                          avatarUrl,
                          name,
                          subtitle: shortDescription,
                          recruitmentAmount,
                          isActive
                        }}
                        type="avatar"
                        handleAction={() =>
                          handleAction({
                            ...departments[index],
                            id: index,
                            isActive: !isActive
                          })
                        }
                        handleClickPen={() => handleClickPen(departmentId)}
                      />
                    </div>
                  )
                }
              } else {
                return (
                  <div
                    key={`profile-company-team-${index}`}
                    style={{ height: 'auto' }}
                  >
                    <OrgEditCard
                      org={{
                        avatarUrl,
                        name,
                        subtitle: shortDescription,
                        recruitmentAmount,
                        isActive
                      }}
                      type="avatar"
                      handleAction={() =>
                        handleAction({
                          ...departments[index],
                          id: index,
                          isActive: !isActive
                        })
                      }
                      handleClickPen={() => handleClickPen(departmentId)}
                      handleClickDuplicate={() =>
                        handleClickDuplicate(departmentId)
                      }
                      handleActionCard={() => handleActionCard(departmentId)}
                    />
                  </div>
                )
              }
            })}
          </div>
        ) : (
          <div className="flex items-center justify-center gap-24">
            <div>
              <div className="flex justify-center mb-6">
                <Image
                  src={'/images/empty-3.png'}
                  width={200}
                  height={200}
                  alt=""
                  quality={100}
                />
              </div>
              <p className="text-p18 text-center text-neutral opacity-[0.8]">
                Hãy tạo phòng ban mới cho công ty của bạn nhé!
              </p>
              <div className="flex justify-center">
                <div
                  onClick={() => handleClickCreate()}
                  className=" w-[224px] h-[52px] gap-4 cursor-pointer hover:opacity-75 rounded-lg bg-button mt-10 flex  justify-center items-center"
                >
                  <XProfileIcon
                    name="add"
                    width="24"
                    height="24"
                    stroke="#000000"
                  />
                  <p className="sm:text-p18-bold text-p14 font-bold">
                    Tạo phòng ban
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

TeamListEditMode.propTypes = {
  toggleModal: PropTypes.func
}

TeamListEditMode.defaultProps = {
  toggleModal: () => {}
}

export default TeamListEditMode
