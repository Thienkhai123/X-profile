import ProgressCompany from 'common/presentation/ProgressCompany'
import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { selectDataListChart } from 'store/app/companySlice'
import ProgressChart from '../ProgressChart'

const LABELS_AVARGE = [
  '0',
  '10.000.000',
  '20.000.000',
  '30.000.000',
  '40.000.000',
  '50.000.000',
  '60.000.000',
  '70.000.000',
  '80.000.000'
]

const AverageWageChart = (props) => {
  const selectDataChart = useSelector(selectDataListChart)

  return (
    <div>
      <div className=" flex flex-col gap-[16px] py-[32px]">
        {selectDataChart?.map((element, ind) => {
          return (
            <div key={ind}>
              <ProgressChart {...element} />
            </div>
          )
        })}
      </div>
      <div className=" hidden xl:flex gap-[16px] items-center ">
        <div className="min-w-[175px]"></div>
        <div className="flex items-center justify-between w-full">
          {LABELS_AVARGE?.map((item, ind) => {
            return (
              <div key={ind} className={`text-grey-3 text-p14 w-[80px] `}>
                {item}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

AverageWageChart.propTypes = {}
AverageWageChart.defaultProps = {}

export default AverageWageChart
