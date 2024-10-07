import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { Line } from 'react-chartjs-2'
import XProfileIcon from 'common/presentation/Icons'
import TrackingCard from './TrackingCard'
import { useSelector } from 'react-redux'
import {
  selectDataChart,
  selectKey,
  selectLabels,
  selectLocation,
  updateKey,
  updateLocation
} from 'store/app/companySlice'
import { useDispatch } from 'react-redux'
import { object } from 'prop-types'
import { list } from 'postcss'
import { useEffect } from 'react'
import { useWindowSize } from 'common/hooks/useWindowSize'
import AverageWageChart from './AverageWageChart'
import PersonnelFactors from './PersonnelFactors'

const YEAH_NUMBER = [
  { background: '#FBECCA', title: 'Dưới 1 năm' },
  { background: '#F6BB3A', title: '1-3 năm' },
  { background: '#FF8514', title: '3-5 năm' },
  { background: '#FF4D14', title: '5-8 năm' },
  { background: '#FF14AF', title: 'Hơn 8 năm' }
]

const CompanyChart = (props) => {
  return (
    <div className="">
      <div className="flex flex-col justify-center">
        <div className="xl:w-[1140px] w-auto p-[32px] bg-[#102153] rounded-[16px]">
          <div className="flex flex-wrap gap-[16px] xl:gap-[0px] justify-between items-center">
            <div>
              <p className="text-p20-bold text-white">Mức lương trung bình</p>
            </div>
            <div className="flex gap-[16px] flex-wrap">
              {YEAH_NUMBER?.map((item, ind) => {
                return (
                  <div key={ind} className="flex gap-[8px] items-center">
                    <div
                      className="h-[12px] w-[12px]  rounded-full"
                      style={{
                        background: item?.background
                      }}
                    ></div>
                    <p className="text-p16 leading-[28px] text-white">
                      {item?.title}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <AverageWageChart />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center mt-[16px]">
        <div className="xl:w-[1140px] w-auto p-[32px] bg-[#102153] rounded-[16px]">
          <div className="flex justify-between items-center">
            <p className="text-p20-bold text-white">
              Các yếu tố để giữ chân nhân sự
            </p>
          </div>
          <div className="pt-[32px]">
            <PersonnelFactors />
          </div>
        </div>
      </div>
    </div>
  )
}

CompanyChart.propTypes = {
  titleDataSource: PropTypes.string,
  descriptionDataSource: PropTypes.string
}
CompanyChart.defaultProps = {
  titleDataSource: 'Nguồn dữ liệu:',
  descriptionDataSource:
    'Vietnam IT Market Report 2022 - TOPDEV, Job Go và một số nguồn khác'
}

export default CompanyChart
