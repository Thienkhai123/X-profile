import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'

const FeedbackModal = (props) => {
  const {
    companyName = '',
    exTtime = '25/8/2023',
    toggleFeedbackModal = () => {}
  } = props
  const handleAcceptFeedback = () => {
    window.location.assign('/account-setting/applicationHistory')
    toggleFeedbackModal()
  }
  return (
    <div className="relative">
      <div className="flex justify-end ">
        <div
          className="absolute cursor-pointer"
          onClick={() => toggleFeedbackModal()}
        >
          <XProfileIcon name="cancel" width="14" height="14" />
        </div>
      </div>
      <div className="flex justify-center  mb-[24px]">
        <div className="flex justify-center items-center h-[80px] w-[80px] rounded-full bg-portfolio-empty">
          <XProfileIcon
            name="documentAdd"
            width="40"
            height="40"
            fill="#294F9B"
          />
        </div>
      </div>
      <div className="flex flex-col items-center mb-[32px]">
        <div className="flex justify-center  mb-[16px] w-[311px]  ">
          <p className="text-p20-bold text-neutral text-center">
            Bạn vẫn chưa viết phản hồi về công ty {companyName}!
          </p>
        </div>
        <div className="flex justify-center  mb-[24px]  ">
          <p className="text-p16 text-grey-1 text-center">
            Để lưu hoặc ứng tuyển công việc mới, bạn vui lòng viết cảm nhận và
            phản hồi của bạn sau khi làm việc tại công ty{' '}
            <span className="text-neutral">{companyName}</span>
          </p>
        </div>
        <div className="flex justify-center  mb-[16px]  ">
          <p className="text-p16 text-grey-1 text-center">
            <span className="text-neutral">Lưu ý: </span>
            nếu bạn chưa viết phản hồi trước ngày{' '}
            <span className="text-grey-1 font-bold">{exTtime}</span> , tài khoản
            của bạn sẽ bị vô hiệu hóa tính năng ứng tuyển công việc mới.
          </p>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <Button
          title={`Hủy`}
          magin="mt-0"
          color={`text-black`}
          background="bg-grey-4"
          rounded="rounded-[8px]"
          width="min-w-[200px]"
          height="h-[44px]"
          textWeight="sm:text-p18-bold text-p14 font-bold "
          padding="py-[12px] px-[32px]"
          onClick={() => {
            toggleFeedbackModal
          }}
        />
        <Button
          title={`Viết phản hồi`}
          magin="mt-0"
          color={`text-black`}
          background="bg-button"
          rounded="rounded-[8px]"
          width="min-w-[200px]"
          height="h-[44px]"
          textWeight="sm:text-p18-bold text-p14 font-bold "
          padding="py-[12px] px-[32px]"
          onClick={() => {
            handleAcceptFeedback()
          }}
        />
      </div>
    </div>
  )
}

FeedbackModal.propTypes = {}

export default FeedbackModal
