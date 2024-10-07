import React, { Fragment, useEffect, useRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

import Image from 'next/image'

import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'

import Pagination from 'common/presentation/Pagination'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import CancelledInvitedModal from './CancelledInvitedModal'
import moment from 'moment'
import { useDispatch } from 'react-redux'
import {
  getAllAppliedCampaigns,
  getUserAcceptInterview,
  userUpdateAcceptInterview
} from 'store/app/campaign'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

const ConfirmInterviewPage = (props) => {
  const {
    userAppliedCampaigns,
    metaAppliedCampaigns,
    isAuthentication,
    userAcceptInterview,
    step,
    handlePageChangeAppliedCampaigns = () => {},
    handleLink = () => {}
  } = props
  const [modalConfirm, toggleModalConfirm] = useModal()
  const [modalCancel, toggleModalCancel] = useModal()
  const [jobChosing, setJobChosing] = useState(null)

  const { company, userRecruitmentCampaignId } = jobChosing || {}
  const { avatarUrl } = company || {}
  const {
    address,
    cityName,
    districtName,
    interviewAt,
    name: companyName,
    positionName,
    wardName
  } = userAcceptInterview

  const dispatch = useDispatch()
  const onCloseConfirm = () => {
    if (jobChosing) {
      setJobChosing(null)
    }
    toggleModalConfirm()
  }
  const onCloseCancel = () => {
    if (jobChosing) {
      setJobChosing(null)
    }
    toggleModalCancel()
  }
  const handleClickCancel = () => {
    toggleModalConfirm(false)
    toggleModalCancel()
  }
  const handleClickConfirm = (e) => {
    e.stopPropagation()
    toggleModalConfirm()
  }
  const handleClickSend = async () => {
    if (userRecruitmentCampaignId) {
      const res = await dispatch(
        userUpdateAcceptInterview({ userRecruitmentCampaignId })
      )
      if (res?.payload?.isSuccess) {
        toast(
          AlertSuccess({
            title:
              res?.payload?.successMessage ||
              'Bạn đã xác nhận lời mời phỏng vấn'
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
          AlertError({
            title: res?.payload?.errorMessage || 'Có lỗi xảy ra'
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
      dispatch(getAllAppliedCampaigns({ status: 200 }))
      onCloseConfirm()
    }
  }
  useEffect(() => {
    if (userRecruitmentCampaignId) {
      dispatch(getUserAcceptInterview({ userRecruitmentCampaignId }))
    }
  }, [userRecruitmentCampaignId])

  return (
    <div className={``}>
      <div className="p-6 rounded-2xl bg-[#F5F6F7] mb-6 select-none">
        <p className="text-p16 italic whitespace-nowrap ">
          Hãy xác nhận phỏng vấn trước thời hạn để không bỏ lỡ những cơ hội việc
          làm mới nhé!
        </p>
      </div>
      <div className="w-full">
        {userAppliedCampaigns?.length !== 0 ? (
          <div>
            <div className="xl:pt-0 grid grid-cols-2 xl:grid-cols-2 xl:gap-11 gap-4 mb-5 ">
              {userAppliedCampaigns?.map((job, index) => {
                const {
                  companyId,
                  departmentId,
                  departmentPositionId,
                  company,
                  userRecruitmentCampaignStatus
                } = job
                const { tag } = company
                return (
                  <HightlightJobCard
                    showTimeRemaining={
                      userRecruitmentCampaignStatus !== 301 &&
                      userRecruitmentCampaignStatus !== 203
                    }
                    timeRemaining={12}
                    titleButton={'Xác nhận phỏng vấn'}
                    showHeart={false}
                    step={step}
                    key={index}
                    job={job}
                    // applied={true}
                    disableButton={
                      userRecruitmentCampaignStatus === 301 ||
                      userRecruitmentCampaignStatus === 203
                    }
                    disableTitle={
                      userRecruitmentCampaignStatus === 203
                        ? 'Đã gửi yêu cầu đổi lịch phỏng vấn'
                        : 'Đã xác nhận phỏng vấn'
                    }
                    isAuthentication={isAuthentication}
                    handleAction={() =>
                      handleLink(tag, departmentId, departmentPositionId)
                    }
                    handleClickButton={(e) => {
                      setJobChosing(job), handleClickConfirm(e)
                    }}
                  />
                )
              })}
            </div>
            {metaAppliedCampaigns?.totalPages > 1 && (
              <div className="flex justify-end items-center">
                <Pagination
                  totalPages={metaAppliedCampaigns?.totalPages}
                  pageSize={metaAppliedCampaigns?.pageSize}
                  totalCount={metaAppliedCampaigns?.recordsTotal}
                  currentPage={metaAppliedCampaigns?.currentPage}
                  onPageChange={handlePageChangeAppliedCampaigns}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full min-h-[340px] pb-12 flex flex-col items-center justify-center mt-20">
            <Image
              alt="empty"
              width={200}
              height={200}
              src={'/images/empty.svg'}
              quality={100}
            />

            <p className="text-grey-1 text-p18 my-10">
              Bạn chưa có đơn ứng tuyển nào
            </p>
            <Button
              title="Xem thêm việc làm"
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-neutral'}
              padding="py-[13px] px-8"
              height="h-auto"
              margin=""
              width="w-full"
              textWeight={'text-p18-bold '}
              onClick={() => (window.location.href = '/jobs')}
            />
          </div>
        )}
      </div>
      <Modal
        open={modalConfirm}
        toggleModal={onCloseConfirm}
        hiddenCancel={true}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-8 bg-white rounded-[16px]"
      >
        <div className="flex flex-col items-center justify-center w-full relative">
          <div className="relative w-[88px] h-[88px] rounded-full mb-6 border overflow-hidden border-light-nude shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]">
            <Image alt="" src={avatarUrl} layout="fill" />
          </div>
          <div
            onClick={() => onCloseConfirm()}
            className="cursor-pointer absolute top-0 right-0"
          >
            <XProfileIcon name="cancel" width="14" height="14" />
          </div>
          <p className="text-p20-bold mb-1">Bạn nhận được lời mời phỏng vấn</p>
          <p className="text-p18 text-semantic-green mb-4">
            Còn 12 giờ để xác nhận
          </p>
          <p className="text-p18 text-grey-1 text-center mb-6">
            Chúc mừng bạn! công ty{' '}
            <span className="text-black">{companyName}</span> gửi lời mời phỏng
            vấn vị trí <span className="text-black">{positionName}!</span>
          </p>
          <div>
            <div className="flex items-center gap-2 mb-4">
              <XProfileIcon name="clock" width="24" height="24" stroke="#000" />
              <p>
                {moment(interviewAt).format('HH:mm')} ngày{' '}
                {moment(interviewAt).format('DD/MM/YYYY')}
              </p>
            </div>
            <div className="flex items-center gap-2 mb-8">
              <XProfileIcon name="mapPoint" />
              <p className="max-w-[243px]">{`${address || ''}, ${
                wardName || ''
              }, ${districtName || ''}, ${cityName || ''}`}</p>
            </div>
          </div>
          <div className="flex w-full justify-center items-center gap-4">
            <Button
              title={'Từ chối'}
              rounded="rounded-lg"
              background={'bg-button-2'}
              color={'text-white'}
              padding="py-[13px] px-8"
              height="h-[44px]"
              margin=""
              width="w-[200px]"
              textWeight={'text-p18-bold'}
              onClick={() => handleClickCancel()}
            />
            <Button
              title={'Xác nhận'}
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-neutral'}
              padding="py-[13px] px-8"
              height="h-[44px]"
              margin=""
              width="w-[200px]"
              textWeight={'text-p18-bold'}
              onClick={() => handleClickSend()}
            />
          </div>
        </div>
      </Modal>

      <Modal
        open={modalCancel}
        toggleModal={onCloseCancel}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-8 bg-white rounded-[16px]"
      >
        <CancelledInvitedModal
          userRecruitmentCampaignId={userRecruitmentCampaignId}
          onCloseCancel={onCloseCancel}
        />
      </Modal>
    </div>
  )
}

export default ConfirmInterviewPage
