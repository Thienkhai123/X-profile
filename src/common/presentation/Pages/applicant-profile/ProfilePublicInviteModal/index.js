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
import { CvInviteTestCard } from '../../cv-database/CvInviteTestCard'
import { ProfilePublicInviteCard } from '../ProfilePublicInviteCard'
import {
  getAllRecruitmentCv,
  selectInitCv,
  updateinviteCampaignSelected
} from 'store/app/cvSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Image from 'next/image'
import { getUserApplyStatus, inviteUserApply } from 'store/app/portfolioSlice'
import { toast } from 'react-toastify'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const ProfilePublicInviteModal = (props) => {
  const { toggleModal = () => {}, userTag, userPortfolio } = props

  const { fullName } = userPortfolio
  const { push } = useRouter()
  const dispatch = useDispatch()
  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany } = userProfile || {}
  const { companyId, tag, name } = ownedCompany || {}
  const { recruitments, inviteCampaignSelected } = useSelector(selectInitCv)
  const handleClickCancel = () => {
    // dispatch(updateRecruitmentSelected(recruitmentSelectedDefault))
  }
  const handleClickInvite = async (e) => {
    if (userTag && inviteCampaignSelected) {
      toggleModal()
      const res = await dispatch(
        inviteUserApply({
          userTag: userTag,
          recruitmentCampaignId: inviteCampaignSelected
        })
      )
      if (!res?.payload?.isSuccess) {
        toast(
          AlertError({
            title: 'Mời không thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      } else {
        toast(
          AlertSuccess({
            title: 'Bạn đã mời thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
      dispatch(updateinviteCampaignSelected(''))
      dispatch(
        getUserApplyStatus({
          tag: userTag
        })
      )
    }
  }
  useEffect(() => {
    dispatch(getAllRecruitmentCv({ companyId }))
  }, [dispatch, companyId])

  return (
    <div className="w-full  pt-[38px]">
      <div className="flex justify-between px-10">
        <p className={'text-p28-bold text-neutral'} style={{ lineHeight: 1 }}>
          Các vị trí đang tuyển dụng
        </p>

        <div onClick={() => toggleModal()} className="cursor-pointer ">
          <XProfileIcon name="cancel" width="14" height="14" />
        </div>
      </div>
      <div className="mt-4 px-10">
        <div className="flex items-center justify-between">
          <p className="text-p18 text-grey-1">
            Chọn vị trí bạn muốn mời{' '}
            <span className="text-p18-bold">{fullName}</span> ứng tuyển
          </p>
        </div>
        {recruitments?.length === 0 ? (
          <div className="w-full min-h-[520px] flex flex-col items-center justify-center mt-20">
            <Image
              alt="empty"
              width={200}
              height={200}
              src={'/images/empty.svg'}
              quality={100}
            />

            <p className="text-grey-2 text-p16 mt-6 mb-1 text-center max-w-[538px]">
              Hiện doanh nghiệp của bạn chưa có vị trí công việc nào.
            </p>
            <p className="text-grey-2 text-p16  mb-8 text-center max-w-[538px]">
              Hãy tạo vị trí công việc cho doanh nghiệp của bạn ở Hồ sơ công ty
            </p>
            <Button
              title="Đến trang hồ sơ công ty"
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-neutral'}
              padding="py-[13px] px-8"
              height="h-auto"
              margin=""
              width="w-full"
              textWeight={'text-p18-bold '}
              onClick={() => {
                window.location.href = `/profile-company/${tag}/edit`
              }}
            />
          </div>
        ) : (
          <div className="max-w-[1140px] pb-8 mt-8 max-h-[460px] overflow-y-auto custom-scrollbar gap-4 grid grid-cols-3 mx-auto ">
            {recruitments.length > 0 &&
              Array.from(recruitments)?.map((recruitment) => {
                const {
                  recruitmentCampaignId,
                  companyId,
                  departmentId,
                  company,
                  departmentPositionId
                } = recruitment
                const { tag } = company
                return (
                  <ProfilePublicInviteCard
                    key={recruitmentCampaignId}
                    job={recruitment}
                    recruitmentSelected={inviteCampaignSelected}
                    // isAuthentication={isAuthentication}
                  />
                )
              })}

            {/* {recruitmentCampaign.length === 0 && (
            <p className="xl:text-p18 text-p14">
              {trans.profileCompany.titleEmptyRecruitment}
            </p>
          )} */}
          </div>
        )}
      </div>
      {recruitments?.length > 0 && (
        <div className=" w-full border-t sticky py-4 px-10 flex items-center justify-end">
          <div className="flex items-center justify-end gap-4">
            <Button
              title="Huỷ"
              width="xl:w-auto"
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
              title="Mời ứng tuyển"
              width="xl:w-auto"
              height="h-auto"
              disabled={!inviteCampaignSelected}
              textWeight="sm:text-p18-bold text-p14 font-bold truncate"
              background="bg-button"
              color="text-neutral"
              rounded={
                inviteCampaignSelected
                  ? 'rounded-lg border border-button'
                  : 'rounded-lg border '
              }
              padding="px-8 py-[13px]"
              onClick={() => handleClickInvite()}
            />
          </div>
        </div>
      )}
    </div>
  )
}

ProfilePublicInviteModal.propTypes = {
  toggleModal: PropTypes.func
}

ProfilePublicInviteModal.defaultProps = {
  toggleModal: () => {}
}

export default ProfilePublicInviteModal
