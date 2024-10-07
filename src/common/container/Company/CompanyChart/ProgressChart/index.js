import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import ProgressCompany from 'common/presentation/ProgressCompany'
import {
  convertCurrency,
  convertCurrencyCompanyChart
} from 'store/helper/functionHelper'

const ProgressChart = (props) => {
  const { title, convertPrice, priceList } = props

  return (
    <div className="w-full xl:flex  gap-[16px] items-center">
      <div className="w-[175px] xl:mb-0 mb-[16px]">
        <p className="text-p14 text-grey-3">{title}</p>
      </div>
      <div className="flex-1">
        <div className="w-full h-[8px] rounded-full bg-[#051442] flex justify-start">
          <ProgressCompany
            width={convertPrice?.present0}
            background="#FBECCA"
            price={convertCurrencyCompanyChart(priceList[1] * 1000000)}
          />
          <ProgressCompany
            width={convertPrice?.present1}
            background="#F6BB3A"
            price={convertCurrencyCompanyChart(priceList[2] * 1000000)}
          />
          <ProgressCompany
            width={convertPrice?.present2}
            background="#FF8514"
            price={convertCurrencyCompanyChart(priceList[3] * 1000000)}
          />
          <ProgressCompany
            width={convertPrice?.present3}
            background="#FF4D14"
            price={convertCurrencyCompanyChart(priceList[4] * 1000000)}
          />
          <ProgressCompany
            width={convertPrice?.present4}
            background="#FF14AF"
            price={convertCurrencyCompanyChart(priceList[5] * 1000000)}
          />
        </div>
      </div>
    </div>
  )
}

ProgressChart.propTypes = {}

export default ProgressChart
