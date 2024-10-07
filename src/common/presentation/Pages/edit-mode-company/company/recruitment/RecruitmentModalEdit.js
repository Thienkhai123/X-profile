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
import {
  getAllRecruitmentEdit,
  updateRecruitmentSelected
} from 'store/app/edit-mode-company/profile/recruitListSlice'

const RecruitmentModalEdit = (props) => {
  const {
    recruitmentCampaign = [],
    recruitmentSelected = [],
    recruitmentSelectedDefault = [],
    toggleModal = () => {},
    trans,
    companyId
  } = props
  const { push } = useRouter()
  const dispatch = useDispatch()
  const handleSelectAll = () => {
    const selectAll = recruitmentCampaign?.map(
      (recruitment) => recruitment.recruitmentCampaignId
    )
    dispatch(updateRecruitmentSelected(selectAll))
  }
  const handleUnSelectAll = () => {
    const selectAll = []
    dispatch(updateRecruitmentSelected(selectAll))
  }
  const handleClickCancel = () => {
    dispatch(updateRecruitmentSelected(recruitmentSelectedDefault))
  }

  return (
    <div>
      <div className="w-full p-10 pb-0">
        <div className="flex justify-between mb-[29px]">
          <p className={'text-p28-bold text-neutral'} style={{ lineHeight: 1 }}>
            Các vị trí tuyển dụng nổi bật
          </p>

          <div onClick={() => toggleModal()} className="cursor-pointer ">
            <XProfileIcon name="cancel" width="14" height="14" />
          </div>
        </div>
        {recruitmentCampaign.length === 0 ? (
          <div className="w-full min-h-[440px] flex flex-col items-center justify-center mt-20">
            <Image
              alt="empty"
              width={200}
              height={200}
              src={'/images/empty.svg'}
              quality={100}
            />

            <p className="text-grey-1 max-w-[440px] text-center text-p18 mt-[9px] ">
              Hiện chưa có vị trí tuyển dụng nào được bật. Hãy tạo vị trí tuyển
              dụng cho công ty của bạn nhé!
            </p>
            {/* <Button
              title="Xong"
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-neutral'}
              padding="py-[13px] px-8"
              height="h-auto"
              margin=""
              width="w-full"
              textWeight={'text-p18-bold '}
              onClick={() => toggleModal()}
            /> */}
          </div>
        ) : (
          <div className="">
            <div className="flex items-center justify-between">
              <p className="text-p18">
                Chọn các vị trí tuyển dụng đã bật để thêm
              </p>
              {recruitmentSelected?.length === recruitmentCampaign?.length ? (
                <Button
                  title="Bỏ chọn tất cả"
                  width="xl:w-[171px]"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                  background="bg-white"
                  color="text-button"
                  rounded="rounded-lg border border-button"
                  padding="px-4"
                  onClick={() => handleUnSelectAll()}
                />
              ) : (
                <Button
                  title="Chọn tất cả"
                  width="xl:w-[171px]"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold truncate"
                  background="bg-white"
                  color="text-button"
                  rounded="rounded-lg border border-button"
                  padding="px-4"
                  onClick={() => handleSelectAll()}
                />
              )}
            </div>
            <div className="max-w-[1140px] py-6 max-h-[460px] overflow-y-auto custom-scrollbar1 gap-4 grid grid-cols-3 mx-auto ">
              {recruitmentCampaign.length > 0 &&
                Array.from(recruitmentCampaign)?.map((recruitment) => {
                  const {
                    recruitmentCampaignId,
                    companyId,
                    departmentId,
                    company,
                    departmentPositionId
                  } = recruitment
                  const { tag } = company
                  return (
                    <HightLightJobEditMode
                      key={recruitmentCampaignId}
                      job={recruitment}
                      recruitmentSelected={recruitmentSelected}
                      isAuthentication={true}
                    />
                  )
                })}
            </div>
          </div>
        )}
      </div>
      {recruitmentCampaign.length > 0 && (
        <div className=" w-full border-t border-grey-3 px-10 py-4 absolute bottom-0 bg-white rounded-b-2xl flex items-center justify-between">
          <p className="text-p18">{`Đã chọn ${
            recruitmentSelected ? recruitmentSelected?.length : 0
          }/${recruitmentCampaign?.length} vị trí`}</p>
          <div className="flex items-center justify-end gap-4">
            <Button
              title="Huỷ"
              width="xl:w-[100px]"
              height="h-auto"
              textWeight="sm:text-p18-bold text-p14 font-bold truncate"
              background="bg-grey-4"
              color="text-neutral"
              rounded="rounded-lg "
              padding="px-8 py-[13px]"
              onClick={() => {
                toggleModal(), handleClickCancel()
              }}
            />
            <Button
              title="Thêm"
              width="xl:w-auto"
              height="h-auto"
              textWeight="sm:text-p18-bold text-p14 font-bold truncate"
              background="bg-button"
              color="text-neutral"
              rounded="rounded-lg border border-button"
              padding="px-8 py-[13px]"
              onClick={() => toggleModal()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

RecruitmentModalEdit.propTypes = {
  toggleModal: PropTypes.func
}

RecruitmentModalEdit.defaultProps = {
  toggleModal: () => {}
}

export default RecruitmentModalEdit
