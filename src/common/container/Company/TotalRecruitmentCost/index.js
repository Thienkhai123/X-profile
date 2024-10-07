import React, { Fragment, useRef, useState } from 'react'

import XProfileIcon from 'common/presentation/Icons'

const TotalRecruitmentCost = (props) => {
  const { totalPrice, totalPricePast, rateDateType } = props
  const config = {
    maximumFractionDigits: 9
  }
  const formatedTotalPrice = new Intl.NumberFormat('vi-VN', config).format(
    totalPrice
  )

  const renderRate = () => {
    let result = 0
    if (totalPrice - totalPricePast < 0) {
      result = (
        (Math.abs(totalPrice - totalPricePast) * 100) /
        totalPricePast
      ).toFixed(2)
    } else {
      result = (
        (Math.abs(totalPrice - totalPricePast) * 100) /
        totalPrice
      ).toFixed(2)
    }

    return result
  }

  return (
    <div className="bg-dark-blue rounded-2xl p-8 pb-9 w-full h-full">
      <p className="text-h4 text-white">Tổng chi phí tuyển dụng</p>
      <p className="text-h3 text-white mt-4 max-w-[276px] overflow-hidden overflow-ellipsis">
        {formatedTotalPrice || totalPrice || 0}
      </p>

      <div className="h-6 mt-4">
        {totalPrice - totalPricePast !== 0 &&
          rateDateType !== 'all' &&
          rateDateType !== 'custom' &&
          rateDateType !== 'threeMonth' && (
            <div className=" flex items-center gap-2">
              <XProfileIcon
                name={
                  totalPrice - totalPricePast < 0
                    ? 'roundArrowLeftDown'
                    : 'roundArrowRightUp'
                }
              />
              <p
                className={`${
                  totalPrice - totalPricePast < 0
                    ? 'text-[#FC816E]'
                    : 'text-[#76E6A0]'
                }  text-p16`}
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

export default TotalRecruitmentCost
