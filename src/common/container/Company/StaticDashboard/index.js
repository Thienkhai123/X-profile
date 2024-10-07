import React, { Fragment, useRef, useState } from 'react'

import XProfileIcon from 'common/presentation/Icons'

const StaticDashboard = (props) => {
  const {
    Fail,
    InRecruit,
    OfferConfirm,
    Total,
    Interviewed,
    applicantsPast,
    rateDateType
  } = props
  const { Total: TotalPast } = applicantsPast || {}
  const renderRate = () => {
    let result = 0
    if (Total - TotalPast < 0) {
      result = ((Math.abs(Total - TotalPast) * 100) / TotalPast).toFixed(2)
    } else {
      result = ((Math.abs(Total - TotalPast) * 100) / Total).toFixed(2)
    }
    return result
  }
  return (
    <div className=" w-full bg-dark-blue rounded-2xl py-8 flex xl:flex-row flex-col items-center gap-2">
      <div className="px-8 min-w-[273px] border-r border-button-2">
        <div className=" flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#F6BB3A] flex items-center justify-center">
            <XProfileIcon name="plate" />
          </div>
          <p className="text-p18 text-grey-3">Tổng số ứng viên</p>
        </div>
        <div className="mt-4 flex gap-3 items-center">
          <p className="text-h1 text-white ">{Total || 0}</p>
          {Total - TotalPast !== 0 &&
            rateDateType !== 'all' &&
            rateDateType !== 'custom' &&
            rateDateType !== 'threeMonth' && (
              <div className="flex items-start max-w-[105px]">
                <div
                  className={`${
                    Total - TotalPast > 0 ? 'rotate-180' : 'rotate-0'
                  } w-fit`}
                >
                  <div className="">
                    <XProfileIcon
                      name="altArrowDown"
                      fill={Total - TotalPast > 0 ? '#76E6A0' : '#FC816E'}
                    />
                  </div>
                </div>
                <p
                  className={`text-p14 ${
                    Total - TotalPast > 0 ? 'text-[#76E6A0]' : 'text-[#FC816E]'
                  }`}
                >
                  {renderRate()}% với{' '}
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
      <div className="px-8 min-w-[273px] border-r border-button-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#69ADF9] flex items-center justify-center">
            <XProfileIcon name="hourglass" />
          </div>
          <p className="text-p18 text-grey-3">Đang tuyển dụng</p>
        </div>
        <div className="flex items-end justify-between  mt-4">
          <p className="text-h1 text-white">{InRecruit || 0}</p>

          <div className="cursor-pointer group relative">
            <div className="mb-2  w-10 h-10 rounded-full hover:bg-[#051442] flex items-center justify-center">
              <XProfileIcon name="chart" />
            </div>
            <div className="absolute hidden group-hover:flex flex-col gap-1 justify-center transition-all right-1/2  translate-x-1/2 -top-2 -translate-y-full w-[169px] px-4 py-2 bg-black rounded-lg text-center text-white text-p18 after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-black z-30">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#CAE6F0] rounded-full"></div>
                <p className="text-p14 text-white">Ứng tuyển: {Total || 0}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-[#69ADF9] rounded-full"></div>
                <p className="text-p14 text-white">
                  Đã phỏng vấn: {Interviewed || 0}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="px-8 min-w-[273px] border-r border-button-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#76E6A0] flex items-center justify-center">
            <XProfileIcon name="archiveMinimalistic" />
          </div>
          <p className="text-p18 text-grey-3">Đã tuyển</p>
        </div>
        <p className="text-h1 text-white mt-4">{OfferConfirm || 0}</p>
      </div>
      <div className="px-8 min-w-[273px]  border-button-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FC816E] flex items-center justify-center">
            <XProfileIcon name="clipboardRemove" />
          </div>
          <p className="text-p18 text-grey-3">Không đạt</p>
        </div>
        <p className="text-h1 text-white mt-4">{Fail || 0}</p>
      </div>
    </div>
  )
}

export default StaticDashboard
