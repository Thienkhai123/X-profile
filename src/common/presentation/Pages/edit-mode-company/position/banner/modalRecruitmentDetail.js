import XProfileIcon from 'common/presentation/Icons'

import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  createRecruitmentCampaign,
  getBannerEditPosition,
  getDetailRecruitmentCampaign,
  selectCampaignPrice,
  selectDetailRecruitmentCampaign
} from 'store/app/edit-mode-company/position/bannerSlice'
import moment from 'moment'
import Button from 'common/presentation/Button'
import {
  calculateTotalPriceByDay,
  calculateTotalPriceByPushDay,
  calculateTotalPriceByPushTime
} from 'store/helper/functionHelper'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import Image from 'next/image'

const ModalRecruitmentDetail = ({
  toggleModal = () => {},
  isOpen = false,
  toggleModal2 = () => {},
  recruitmentCampaignId
}) => {
  const dispatch = useDispatch()
  const campaignDetail = useSelector(selectDetailRecruitmentCampaign)
  const {
    addressBook,
    campaignName,
    matchingPercent,
    startTime,
    endTime,
    quantity,
    type,
    amountPushDate,
    pushTime,
    pushEndAt,
    pushStartAt,
    typeDisplay,
    totalPrice,
    createdAt,
    jobName
  } = campaignDetail || {}
  const { addressDetail, cityName, districtName, wardName } = addressBook || {}

  useEffect(() => {
    if (recruitmentCampaignId) {
      dispatch(getDetailRecruitmentCampaign({ recruitmentCampaignId }))
    }
  }, [recruitmentCampaignId])
  return (
    <div className=" w-full">
      <p className="my-8 text-p18">
        Ngày tạo chiến dịch: {moment(new Date(createdAt)).format('DD/MM/YYYY')}
      </p>
      {/* divider */}
      <div className="relative w-full h-[2px] mb-8">
        <Image
          src={'/images/lineDash.svg'}
          layout="fill"
          alt=""
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-4 mb-8">
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7 "
          >
            Tên chiến dịch
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {campaignName}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Hình thức công việc
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {typeDisplay}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Địa điểm tuyển dụng
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {`${addressDetail}, ${wardName}, ${cityName}, ${districtName}`}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Số lượng cần tuyển
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {quantity || '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Vị trí tuyển dụng
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {jobName ? `${jobName}` : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Thời gian tuyển dụng
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {startTime && endTime
              ? `${moment(new Date(startTime)).format('DD/MM/YYYY')} - ${moment(
                  new Date(endTime)
                ).format('DD/MM/YYYY')}`
              : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Số ngày đẩy tin
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {amountPushDate && amountPushDate > 0
              ? `${amountPushDate} ngày`
              : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Số lần đầy tin tuyển dụng
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {pushTime && pushTime > 0 ? `${pushTime} lần` : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Khung giờ đẩy tin
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {pushStartAt && pushEndAt
              ? `${moment(pushStartAt, 'h:mm a').format('H:mm')} - ${moment(
                  pushEndAt,
                  'h:mm a'
                ).format('H:mm')}`
              : '-'}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16 text-grey-1 leading-7"
          >
            Độ phù hợp của ứng viên
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p16-bold max-w-[335px] text-right leading-7"
          >
            {matchingPercent && matchingPercent > 0
              ? `${matchingPercent}%`
              : '-'}
          </p>
        </div>
      </div>
      {/* divider */}
      <div className="relative w-full h-[2px] mb-8">
        <Image
          src={'/images/lineDash.svg'}
          layout="fill"
          alt=""
          quality={100}
        />
      </div>
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-start justify-between">
          <p className="text-p18 leading-[30px]">Tạm tính</p>
          <p className="text-p18-bold leading-[30px] max-w-[335px] text-right">
            {`${totalPrice?.toLocaleString()} đ`}
          </p>
        </div>
        <div className="flex items-start justify-between">
          <p className="text-p18 leading-[30px]">Giảm giá</p>
          <p className="text-p18-bold leading-[30px] max-w-[335px] text-right text-semantic-red">
            -100%
          </p>
        </div>
        <div className="flex items-start justify-between">
          <p className="text-p18 leading-[30px]">Tổng chi phí tuyển dụng</p>
          <p className="text-p18-bold leading-[30px] max-w-[335px] text-right text-button-2">
            0 đ
          </p>
        </div>
      </div>
      <div className="w-full flex items-center justify-between gap-6">
        <Button
          title="Thoát"
          widthDiv="w-full"
          width="w-full"
          height="h-14"
          padding="py-[13px] px-8"
          background="bg-grey-4"
          textWeight="text-p18-bold"
          rounded="rounded-lg"
          onClick={() => toggleModal()}
        />
        <Button
          title="Tắt tuyển dụng"
          width="w-full"
          widthDiv="w-full"
          height="h-14"
          padding="py-[13px] px-8"
          background="bg-button"
          textWeight="text-p18-bold"
          rounded="rounded-lg "
          onClick={toggleModal2}
        />
      </div>
    </div>
  )
}

export default ModalRecruitmentDetail
