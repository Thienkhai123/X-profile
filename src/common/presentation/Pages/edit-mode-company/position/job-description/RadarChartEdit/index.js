import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import 'chart.js/auto'
import { Radar } from 'react-chartjs-2'
import Link from 'next/link'
import Image from 'next/image'

function splitStr(str) {
  let maxCharPerLine = 15
  let items = str.split(' ')
  let result = []
  while (items.length) {
    if (items.length >= 2) {
      let curLength = 0
      let curStr = []
      let count = 0
      for (var i = 0; i < items.length; i++) {
        if (curLength + items[i].length + 1 <= maxCharPerLine) {
          curLength = curLength + items[i].length + 1
          curStr.push(items[i])
          count++
        } else {
          break
        }
      }
      result.push(curStr.join(' '))
      items.splice(0, count)
    } else {
      result.push(items[0])
      items.splice(0, 1)
    }
  }
  return result
}

const radarMap = (skills) => {
  const softSkills = skills.filter((element) => element.type !== 1)
  const mainSkills = skills.filter((element) => element.type === 1)
  const data = {
    labels: [...softSkills, ...mainSkills]
      ?.splice(0, 6)
      .map((element) => splitStr(element.name)),
    datasets: [
      {
        label: 'Radar',
        data: [...softSkills, ...mainSkills]
          ?.splice(0, 6)
          .map((element) => element.percentage),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(246, 187, 58, 1)',
        pointBackgroundColor: '#ECB14E',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }
  return data
}
const radarMapDefault = (skills) => {
  const arr = [
    { id: 0, name: 'Tên kỹ năng', percentage: 70 },
    { id: 1, name: 'Tên kỹ năng', percentage: 50 },
    { id: 3, name: 'Tên kỹ năng', percentage: 0 },
    { id: 4, name: 'Tên kỹ năng', percentage: 50 },
    { id: 5, name: 'Tên kỹ năng', percentage: 70 },
    { id: 6, name: 'Tên kỹ năng', percentage: 20 }
  ]
  const data = {
    labels: [...arr].map((element) => splitStr(element.name)),
    datasets: [
      {
        label: 'Radar',
        data: [...arr].map((element) => element.percentage),
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(246, 187, 58, 1)',
        pointBackgroundColor: '#ECB14E',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
      }
    ]
  }
  return data
}

const options = {
  responsive: true,
  aspectRatio: 1,
  scales: {
    r: {
      ticks: {
        display: false
      },
      pointLabels: {
        offset: true,
        display: true,
        font: {
          size: 12,
          lineHeight: '20px',
          weight: '400',
          family: 'Be Vietnam Pro'
        }
      },
      beginAtZero: true,
      max: 100,
      min: 0,
      angleLines: {}
    }
  },
  plugins: {
    legend: {
      display: false
    }
  }
}

const RadarChartEdit = (props) => {
  const {
    title,
    numeral,
    descriptionDefault,
    titleButton,
    titleApplyButton,
    skills,
    handleApply,
    showApply,
    src,
    userProfile,
    isShowRadarChartEdit = true,
    pageEditMode = false,
    toggleModal = () => {}
  } = props

  return (
    <div className="relative">
      {pageEditMode && (
        <div
          onClick={() => toggleModal()}
          className="absolute -top-6 -right-6 drop-shadow-[0px_16px_24px_rgba(0,0,0,0.04)] w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
        >
          <XProfileIcon name="pen" />
        </div>
      )}
      <div className="md:w-[340px] w-full mb-[36px]">
        <div className="px-[12px] py-[32px] bg-white rounded-borderStep">
          <div className="">
            <div className="mb-4 text-center">
              <p className="text-p20-bold text-neutral">
                {title + ' '}
                <span className="text-blue-light text-p20-bold">
                  {numeral}%
                </span>
              </p>
            </div>
            {isShowRadarChartEdit && (
              <div className="flex justify-center">
                <Radar
                  data={
                    skills.length > 0 ? radarMap(skills) : radarMapDefault()
                  }
                  options={options}
                />
              </div>
            )}
          </div>
          <div className="flex justify-center ">
            {showApply && (
              <Button
                title={titleApplyButton}
                magin="mt-0"
                width="w-[180px]"
                height="h-[48px]"
                rounded="rounded-borderStep"
                textWeight="sm:text-p18-bold text-p14 font-bold"
                // onClick={() => handleApply()}
              />
            )}
          </div>
        </div>
      </div>
      <div className="sm:block hidden">
        <Image width={322.64} height={221.11} src={src} alt="" quality={100} />
      </div>
    </div>
  )
}

RadarChartEdit.propTypes = {
  title: PropTypes.string,
  numeral: PropTypes.number,
  descriptionDefault: PropTypes.string,
  titleButton: PropTypes.string,
  titleApplyButton: PropTypes.string,
  handleApply: PropTypes.func,
  showApply: PropTypes.bool,
  src: PropTypes.string
}
RadarChartEdit.defaultProps = {
  title: 'Mức độ phù hợp:',
  numeral: 0,
  descriptionDefault:
    'Cập nhật hồ sơ cá nhân để xem mức độ phù hợp của bạn với công việc này.',
  titleButton: 'Cập nhật ngay',
  titleApplyButton: 'Ứng tuyển ngay',
  handleApply: () => {},
  showApply: false,
  src: '/images/Profile_RadarChar.png',
  userProfile: null
}

export default RadarChartEdit
