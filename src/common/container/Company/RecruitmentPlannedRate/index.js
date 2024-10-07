import React, { Fragment, useRef, useState } from 'react'

import XProfileIcon from 'common/presentation/Icons'

import CircularProgressDashboard from 'common/presentation/Pages/CircularProgressDashboard'

const RecruitmentPlannedRate = (props) => {
  const { InNeed, OfferConfirm, applicantsPast, rateDateType } = props
  const { InNeed: InNeedPast, OfferConfirm: OfferConfirmPast } =
    applicantsPast || {}
  const currentRate = InNeed > 0 ? Math.floor((OfferConfirm / InNeed) * 100) : 0
  const pastRate =
    InNeedPast > 0 ? Math.floor((OfferConfirmPast / InNeedPast) * 100) : 0
  const renderRate = () => {
    let result = 0
    result = Math.abs(currentRate - pastRate)
    return result
  }
  return (
    <div className="bg-dark-blue rounded-2xl p-8 pb-9 w-full">
      <p className="text-h4 text-white">Tỉ lệ tuyển đúng kế hoạch</p>
      <div className="flex items-start mt-4 gap-1">
        <CircularProgressDashboard
          value={InNeed > 0 ? Math.floor((OfferConfirm / InNeed) * 100) : 0}
        />
        <div className="">
          <p className="text-h1 text-white">
            {InNeed > 0 ? Math.floor((OfferConfirm / InNeed) * 100) : 0}%
          </p>
          <p className="text-p14 text-grey-3">
            * Tỉ lệ đồng ý nhận việc / Số lượng tuyển
          </p>
        </div>
      </div>
      <div className="mt-4 h-6">
        {rateDateType !== 'all' &&
          rateDateType !== 'custom' &&
          rateDateType !== 'threeMonth' && (
            <div className=" flex items-center gap-2">
              <XProfileIcon
                name={
                  currentRate - pastRate < 0
                    ? 'roundArrowLeftDown'
                    : 'roundArrowRightUp'
                }
              />

              <p
                className={`${
                  currentRate - pastRate < 0
                    ? 'text-[#FC816E]'
                    : 'text-[#76E6A0]'
                } text-p16`}
              >
                {renderRate()}% so với{' '}
                {rateDateType === 'day'
                  ? 'hôm qua'
                  : rateDateType === 'month'
                  ? 'tháng trước'
                  : rateDateType === 'week'
                  ? 'tuần trước'
                  : ''}
              </p>
            </div>
          )}
      </div>
    </div>
  )
}

export default RecruitmentPlannedRate
