import 'chart.js/auto'
import { useState } from 'react'
import { Radar } from 'react-chartjs-2'

const FAKE_DATAS = [
  {
    labels: [
      'Khả năng sử dụng ERP',
      'Hiểu về công ty',
      'Văn hóa công ty',
      'Quản lý tài sản',
      'Quản lý thời gian'
    ],
    datasets: [
      {
        label: 'Năng lực công ty yêu cầu',
        data: [70, 100, 65, 0, 90],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Năng lực thực tế của bạn',
        data: [65, 90, 85, 75, 70],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  },
  {
    labels: [
      'Khả năng sử dụng ERP',
      'Hiểu về công ty',
      'Văn hóa công ty',
      'Quản lý tài sản',
      'Quản lý thời gian'
    ],
    datasets: [
      {
        label: 'Năng lực công ty yêu cầu',
        data: [20, 40, 30, 10, 80],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Năng lực thực tế của bạn',
        data: [90, 45, 34, 24, 45],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  },
  {
    labels: [
      'Khả năng sử dụng ERP',
      'Hiểu về công ty',
      'Văn hóa công ty',
      'Quản lý tài sản',
      'Quản lý thời gian'
    ],
    datasets: [
      {
        label: 'Năng lực công ty yêu cầu',
        data: [22, 55, 34, 40, 33],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
      },
      {
        label: 'Năng lực thực tế của bạn',
        data: [27, 45, 77, 34, 55],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }
]

const renderMatchesPercent = (datasets = []) => {
  let res = 0
  if (datasets?.length === 0) {
    return res
  }
  const [objCompany, objPersonal] = datasets
  if (objCompany?.data?.length === 0) {
    return res
  }
  objCompany?.data?.forEach((point, ind) => {
    if (parseInt(objPersonal?.data[ind]) >= parseInt(point)) {
      res += 1
    }
  })
  return (res / objCompany?.data?.length) * 100
}

const Tab = ({
  id = null,
  title = 'Chung',
  bg = '',
  color = '',
  h = '',
  handleChangeDataSet = () => {}
}) => {
  return (
    <div
      className={`w-[72px] px-3 flex justify-center items-center cursor-pointer`}
      style={{
        height: h,
        backgroundColor: bg
      }}
      onClick={() => handleChangeDataSet(id)}
    >
      <p className={`text-h6 text-center`} style={{ color: color }}>
        {title}
      </p>
    </div>
  )
}

const Label = ({
  title = 'Năng lực công ty yêu cầu',
  fill = '#D5E5F7',
  stroke = '#53A1E5'
}) => {
  return (
    <div className="flex gap-2 items-center">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
      >
        <circle cx="5" cy="5" r="4.5" fill={fill} stroke={stroke} />
      </svg>

      <p className="text-[#8B8BA7] text-p3">{title}</p>
    </div>
  )
}

const BannerRadarChart = ({ competencyMatrix = [] }) => {
  const [dataSet, setDataSet] = useState({
    index: 0,
    data: {
      labels: competencyMatrix?.length > 0 ? competencyMatrix[0]?.labels : {},
      datasets:
        competencyMatrix?.length > 0 ? competencyMatrix[0]?.datasets : {}
    }
  })

  const handleChangeDataSet = (id = null) => {
    if (id !== null) {
      setDataSet({
        index: id,
        data: {
          labels:
            competencyMatrix?.length > 0 ? competencyMatrix[id]?.labels : {},
          datasets:
            competencyMatrix?.length > 0 ? competencyMatrix[id]?.datasets : {}
        }
      })
    }
  }

  const options = {
    responsive: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        display: false
      }
    }
  }

  return (
    <div className="w-full h-full flex bg-[#F6F7FB] gap-[200px]">
      <div className="flex flex-col">
        {competencyMatrix?.map((cm, ind) => {
          const { backgroundColor, activeColor, color } = cm
          return (
            <Tab
              key={`tab-cm-${ind}`}
              id={ind}
              color={dataSet.index === ind ? `${activeColor}` : `${color}`}
              bg={backgroundColor}
              h={`${(100 / competencyMatrix?.length).toFixed(2)}%`}
              handleChangeDataSet={handleChangeDataSet}
            />
          )
        })}
      </div>

      <div className="flex justify-around my-4 gap-[48px]">
        <div className="w-[546px]">
          <Radar data={dataSet.data} options={options} />
        </div>

        <div className="flex-1 w-[190px]  mt-14 mb-20 flex flex-col gap-4 justify-between">
          <div className="w-full">
            <div className="w-[140px] h-[140px] rounded-full bg-white flex items-center justify-center p-7 mx-auto mb-3 drop-shadow-[0px_8px_16px_rgba(0,0,0,0.04)]">
              <p className="text-yellow-main text text-h3 ">
                {renderMatchesPercent(dataSet.data?.datasets)} %
              </p>
            </div>
            <p className="text-blue-new-1 text-p20-bold text-center">MATCHED</p>
          </div>

          <div>
            <Label />
            <Label
              fill="#F4DCE3"
              stroke="#EE6E85"
              title="Năng lực thực tế của bạn"
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default BannerRadarChart
