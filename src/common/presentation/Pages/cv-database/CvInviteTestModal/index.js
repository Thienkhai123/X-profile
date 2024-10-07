import Button from 'common/presentation/Button'

import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { updateDepartmentBannerEdit } from 'store/app/edit-mode-company/department/bannerSlice'
import { SwiperSlide } from 'swiper/react'
import { useRouter } from 'next/router'
import XProfileIcon from 'common/presentation/Icons'
import {
  getAllRecruitmentEdit,
  updateRecruitmentSelected
} from 'store/app/edit-mode-company/profile/recruitListSlice'
import { CvInviteTestCard } from '../CvInviteTestCard'

const CvInviteTestModal = (props) => {
  const {
    recruitmentCampaign = [],
    recruitmentSelected = [],
    recruitmentSelectedDefault = [],
    toggleModal = () => {},
    handleClickInvite = () => {},
    trans,
    companyId
  } = props
  const { push } = useRouter()
  const dispatch = useDispatch()
  const handleClickCancel = () => {
    // dispatch(updateRecruitmentSelected(recruitmentSelectedDefault))
  }

  return (
    <div className="w-full  pt-10">
      <div className="">
        {/* <div className=" flex items-center justify-between mb-10 ">
          <p className="xl:text-h2 text-p20-bold text-neutral">
            Các vị trí đang tuyển dụng
          </p>
          
        </div> */}
        <div className="flex items-center justify-between">
          <p className="text-p18">
            Chọn vị trí bạn muốn mời ứng viên làm bài kiểm tra năng lực
          </p>
        </div>
        <div className="max-w-[1140px] my-8 max-h-[460px] overflow-y-auto custom-scrollbar gap-4 grid grid-cols-3 mx-auto ">
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
                <CvInviteTestCard
                  key={recruitmentCampaignId}
                  job={recruitment}
                  recruitmentSelected={recruitmentSelected}
                  // isAuthentication={isAuthentication}
                />
              )
            })}

          {recruitmentCampaign.length === 0 && (
            <p className="xl:text-p18 text-p14">
              {trans.profileCompany.titleEmptyRecruitment}
            </p>
          )}
        </div>
      </div>
      <div className=" w-full border-t sticky py-2 flex items-center justify-end">
        <div className="flex items-center justify-end gap-4">
          <Button
            title="Huỷ"
            width="xl:w-[100px]"
            height="h-[48px]"
            textWeight="sm:text-p18-bold text-p14 font-bold truncate"
            background="bg-grey-4"
            color="text-neutral"
            rounded="rounded-lg "
            padding="px-4"
            onClick={() => {
              toggleModal(), handleClickCancel()
            }}
          />
          <Button
            title="Mời làm bài kiểm tra"
            width="xl:w-[247px]"
            height="h-[48px]"
            textWeight="sm:text-p18-bold text-p14 font-bold truncate"
            background="bg-button"
            color="text-neutral"
            rounded="rounded-lg border border-button"
            padding="px-4"
            onClick={() => handleClickInvite()}
          />
        </div>
      </div>
    </div>
  )
}

CvInviteTestModal.propTypes = {
  toggleModal: PropTypes.func
}

CvInviteTestModal.defaultProps = {
  toggleModal: () => {}
}

export default CvInviteTestModal
