import React, { Fragment, useEffect, useRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

import Image from 'next/image'

import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'

import Pagination from 'common/presentation/Pagination'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import ReviewCampaignModal from './ReviewCampaignModal'
import Button from 'common/presentation/Button'
import { useSelector } from 'react-redux'
import {
  getUserCampaignFeedback,
  selectAllUserCampaignFeedback
} from 'store/app/campaign'
import { useDispatch } from 'react-redux'

const OfficialStaffPage = (props) => {
  const {
    userAppliedCampaigns,
    metaAppliedCampaigns,
    isAuthentication,
    step,
    handleLink = () => {},
    handlePageChangeAppliedCampaigns = () => {}
  } = props
  const dispatch = useDispatch()
  const [modalReview, toggleModalReview] = useModal()
  const [jobChosing, setJobChosing] = useState(null)
  const {
    company,
    name: positionName,
    interviewAt,
    userRecruitmentCampaignId
  } = jobChosing || {}
  const { name: companyName } = company || {}
  const userCampaignFeedback = useSelector(selectAllUserCampaignFeedback)
  const onCloseReview = () => {
    if (jobChosing) {
      setJobChosing(null)
    }
    toggleModalReview()
  }

  const handleClickReview = (e) => {
    e.stopPropagation()
    toggleModalReview()
  }
  useEffect(() => {
    dispatch(getUserCampaignFeedback())
  }, [])

  return (
    <div className={``}>
      <div className="p-6 rounded-2xl bg-[#F5F6F7] mb-6 select-none">
        <p className="text-p16-bold">
          Vui lòng viết cảm nhận & phản hồi sau khi nhận việc!
        </p>
        <p className="text-p16 italic mb-8">
          Để đảm bảo quyền lợi và công bằng cho ứng viên, bạn vui lòng dành 2
          phút viết phản hồi về công ty này nhé!
        </p>
        <p className="text-p16 italic ">
          <span className="text-p16-bold not-italic">Lưu ý:</span> 10 ngày kể từ
          sau khi xác nhận trở thành nhân viên chính thức, nếu bạn chưa viết
          phản hồi, tài khoản của bạn sẽ bị vô hiệu hóa tính năng ứng tuyển công
          việc mới.
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
                  userRecruitmentCampaignId
                } = job
                const { tag } = company
                return (
                  <HightlightJobCard
                    titleButton={'Viết phản hồi'}
                    showHeart={false}
                    disableTitle={'Đã viết phản hồi'}
                    disableButton={userCampaignFeedback?.includes(
                      userRecruitmentCampaignId
                    )}
                    step={step}
                    key={index}
                    job={job}
                    // applied={true}
                    isAuthentication={isAuthentication}
                    handleAction={() =>
                      handleLink(tag, departmentId, departmentPositionId)
                    }
                    handleClickButton={(e) => {
                      setJobChosing(job), handleClickReview(e)
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
        open={modalReview}
        toggleModal={onCloseReview}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 p-8 bg-white rounded-[16px]"
      >
        <ReviewCampaignModal
          userRecruitmentCampaignId={userRecruitmentCampaignId}
          onCloseReview={onCloseReview}
          companyName={companyName}
        />
      </Modal>
    </div>
  )
}

export default OfficialStaffPage
