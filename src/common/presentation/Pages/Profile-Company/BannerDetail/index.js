import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import SkeletonBanner from 'common/presentation/Skeleton/SkeletonBanner'
import SkeletonText from 'common/presentation/Skeleton/SkeletonText'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import { useSelector } from 'react-redux'
import {
  getProfile,
  selectRoleIdUser,
  selectUserProfile,
  updateProfile
} from 'store/app/userSlice'
import { useDispatch } from 'react-redux'
import {
  canApply,
  changeUserFavoriteCampaign,
  getAllFavoriteCampaigns
} from 'store/app/campaign'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import ButtonIcon from 'common/presentation/ButtonIcon'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import ApplyModal from './ApplyModal'
import FeedbackModal from './FeedBackModal'
import moment from 'moment'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { useRouter } from 'next/router'
import XProfileIcon from 'common/presentation/Icons'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import {
  getUserStatus,
  selectUserStatus
} from 'store/app/departmentPositionSlice'

const BannerDetail = (props) => {
  const {
    profile,
    breadCrumbsTitle,
    applyModal,
    checkApply,
    recruitmentCampaignId,
    showApply,
    seenNumber = 0,
    isTemplate = false
  } = props
  const { imageUrl, name, shortDescription, meta, departmentPositionId } =
    profile || {}

  const router = useRouter()

  const [openModal, toggleModal] = useModal()
  const [openFeedbackModal, toggleFeedbackModal] = useModal()

  const userProfile = useSelector(selectUserProfile)
  const userStatus = useSelector(selectUserStatus)
  const { setting } = userProfile || {}
  const { favoriteCampaignIds } = setting || {}
  const dispatch = useDispatch()
  const roleId = useSelector(selectRoleIdUser)
  const a = 1
  const {
    allCampaignStatus,
    companyName,
    confirmInterviewExpiredAt,
    currentCampaignStatus,
    feedbackExpiredAt
  } = userStatus || {}

  let cloneIds = favoriteCampaignIds ? favoriteCampaignIds?.split(',') : []

  const { departmentId, companyId } = router.query

  const handleFeedbackModal = () => {
    toggleFeedbackModal()
  }

  const handleAcceptModal = () => {
    toggleModal()
  }

  const handleClickSave = async (departmentPositionId) => {
    if (departmentPositionId) {
      const result = await dispatch(
        changeUserFavoriteCampaign(departmentPositionId)
      )

      if (result?.payload?.errorMessage) {
        toast(
          AlertError({
            title: 'Lưu không thành công'
          }),
          {
            toastId: 'alert-save-warning',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      } else {
        if (result?.payload?.data) {
          toast(
            AlertSuccess({
              title: 'Bạn đã lưu tin tuyển dụng này!'
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
              title: 'Bạn đã bỏ lưu tin tuyển dụng này!'
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

        if (cloneIds.length > 0) {
          if (
            !cloneIds?.includes(departmentPositionId.toString()) &&
            result?.payload?.data
          ) {
            cloneIds?.push(departmentPositionId)
          } else if (
            cloneIds?.includes(departmentPositionId.toString()) &&
            !result?.payload?.data
          ) {
            cloneIds = cloneIds.filter(
              (id) => id !== departmentPositionId.toString()
            )
          }
        } else {
          cloneIds?.push(departmentPositionId)
        }

        const payload = {
          setting: {
            favoriteCampaignIds: cloneIds.toString()
          }
        }
        await Promise.all([
          dispatch(updateProfile(payload)),
          dispatch(getAllFavoriteCampaigns())
        ]).then(() => dispatch(getProfile()))
      }
    }
  }

  useEffect(() => {
    dispatch(
      getUserStatus({
        id: departmentPositionId
      })
    )
  }, [dispatch, departmentPositionId])

  useEffect(() => {
    if (allCampaignStatus === 1) {
      handleAcceptModal()
    }
    if (allCampaignStatus === 2) {
      handleFeedbackModal()
    }
  }, [])

  if (!profile || Object.keys(profile).length === 0) {
    return (
      <div className="sm:flex sm:items-center sm:gap-[40px]">
        <div>
          <SkeletonBanner className="flex justify-center items-center w-[366px] h-[260px] mx-auto bg-gray-300 rounded-[8px]" />
        </div>
        <div className="sm:mt-0 mt-[12px]">
          <div className="mb-[12px]">
            <SkeletonText height="h-[58px]" width="lg:w-[505px] w-full" />
          </div>
          <div className="flex flex-col gap-[8px]">
            <SkeletonText height="h-[15px]" width="w-full" />
            <SkeletonText height="h-[15px]" width="w-full" />
            <SkeletonText height="h-[15px]" width="w-full" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className=" lg:flex items-start gap-16 xl:w-[1140px]">
      <div className="block sm:hidden mb-5">
        <BreadCrumbs
          type={true}
          nameList={breadCrumbsTitle}
          styleBread="text-grey-1 text-p14"
          textBreadLast="text-grey-1 text-p14"
          classNameType="text-grey-1 text-p14"
        />
      </div>
      <div className="absolute bottom-0 right-0 hidden xl:block">
        <Image
          src={'/images/absoluteBottomBanner.png'}
          width={344}
          height={168}
          alt=""
          objectFit="cover"
        />
      </div>
      <div className="flex gap-[4px] items-center xl:absolute xl:top-[32px] top-[10px]">
        <XProfileIcon name="eyeProfileCompany" />
        <p className="xl:text-p16 text-p14 text-grey-1">{seenNumber}</p>
      </div>
      {(meta?.avatarUrl || imageUrl) && (
        <div className="sm:w-[514px] w-[340px] sm:h-[310px] h-[204.59px]  sm:mx-0 mx-auto relative rounded-[8px]  sm:mb-0 mb-[20px]">
          <div className="hidden md:block absolute -bottom-[40px] -left-10">
            <Image
              src={'/images/banner-profile-bottom.png'}
              width={122}
              height={90.31}
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="hidden md:block absolute -top-9 -right-10 ">
            <Image
              src={'/images/banner-profile-top.png'}
              width={91.43}
              height={83.72}
              objectFit="contain"
              alt=""
            />
          </div>
          <Image
            src={meta?.avatarUrl || imageUrl}
            alt=""
            layout="fill"
            objectFit="cover"
            className="rounded-lg bg-white"
          />
        </div>
      )}

      <div className="xl:max-w-[552px] h-fit flex flex-col items-start xl:justify-between">
        <div>
          <div className="hidden xl:block mb-5">
            <BreadCrumbs
              type={true}
              nameList={breadCrumbsTitle}
              styleBread="text-grey-1 text-p14"
              textBreadLast="text-grey-1 text-p14"
              classNameType="text-grey-1 text-p14"
            />
          </div>
          <div className="mb-3 sm:text-center text-start xl:text-start">
            <p className="sm:text-h1 text-p20-bold text-neutral">{name}</p>
          </div>

          <div className="text-start mb-6">
            <p className="sm:text-p18 text-p12 text-grey-1 break-words line-clamp-3">
              {shortDescription}
            </p>
          </div>
        </div>
        <div className="w-full">
          {isTemplate && (
            <div>
              <Button
                title={`Bật tuyển dụng`}
                magin="mt-0"
                color={`text-black`}
                background="bg-button"
                rounded="rounded-[8px] relative z-10"
                width="min-w-[222px]"
                height="h-[48px]"
                textWeight="sm:text-p18-bold text-p14 font-bold "
                padding="py-[12px] px-[32px]"
                // onClick={() => {
                //   checkApply()
                // }}
              />
            </div>
          )}
          <div className="flex w-full xl:gap-6 gap-4 ">
            {departmentPositionId && parseInt(roleId) !== 2 && (
              <ButtonIcon
                title={`${
                  favoriteCampaignIds?.includes(
                    departmentPositionId?.toString()
                  )
                    ? 'Đã lưu'
                    : 'Lưu công việc'
                }`}
                magin="mt-0"
                // color={`${
                //   favoriteCampaignIds?.includes(
                //     departmentPositionId?.toString()
                //   ) && 'text-white'
                // }`}
                color="text-button"
                iconName={
                  favoriteCampaignIds?.includes(
                    departmentPositionId?.toString()
                  )
                    ? 'savedJob'
                    : 'saveJob'
                }
                background="bg-white"
                rounded="rounded-[8px]"
                width="xl:min-w-[222px] w-full"
                widthDiv="w-full xl:w-auto"
                height="h-[48px]"
                textWeight="sm:text-p18-bold text-p14 font-bold  "
                padding="py-[12px] px-[32px]"
                border="border border-button"
                onClick={() => handleClickSave(departmentPositionId)}
              />
            )}
            {currentCampaignStatus === 0 &&
              allCampaignStatus !== 1 &&
              parseInt(roleId) !== 2 &&
              showApply && (
                <Button
                  title={`Ứng tuyển`}
                  magin="mt-0"
                  color={`text-black`}
                  background="bg-button"
                  rounded="rounded-[8px] relative z-10"
                  width="xl:min-w-[222px] w-full"
                  widthDiv="w-full xl:w-auto"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold "
                  padding="py-[12px] px-[32px]"
                  onClick={() => {
                    checkApply()
                  }}
                />
              )}
            {currentCampaignStatus === 1 &&
              allCampaignStatus !== 1 &&
              parseInt(roleId) !== 2 &&
              showApply && (
                <Button
                  title={`Đã ứng tuyển`}
                  magin="mt-0"
                  color="text-button"
                  background="bg-white"
                  rounded="rounded-[8px]"
                  width="xl:min-w-[222px] w-full"
                  height="h-[48px]"
                  textWeight="sm:text-p18-bold text-p14 font-bold  "
                  padding="py-[12px] px-[32px]"
                  border="border border-button"
                />
              )}
          </div>
        </div>
      </div>
      <Modal
        hiddenCancel={true}
        styleTitle="text-h3 text-black"
        open={openModal}
        toggleModal={toggleModal}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-[32px] bg-white rounded-[16px]"
      >
        <ApplyModal
          toggleModal={toggleModal}
          companyName={companyName || ''}
          exTtime={moment(confirmInterviewExpiredAt).format('L') || ''}
        />
      </Modal>
      <Modal
        hiddenCancel={true}
        styleTitle="text-h3 text-black"
        open={openFeedbackModal}
        toggleModal={toggleFeedbackModal}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-[32px] bg-white rounded-[16px]"
      >
        <FeedbackModal
          toggleFeedbackModal={toggleFeedbackModal}
          companyName={companyName || ''}
          exTtime={moment(feedbackExpiredAt).format('L') || ''}
        />
      </Modal>
    </div>
  )
}

BannerDetail.propTypes = {
  profile: PropTypes.object
}
BannerDetail.defaultProps = {
  profile: {}
}

export default BannerDetail
