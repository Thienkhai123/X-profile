import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import DescribeDayItem from '../DescribeDayItem'

const DescribeDay = (props) => {
  return (
    <div className="bg-background-describeDay bg-no-repeat bg-[length:100%_100%] bg-center h-full">
      <div className="flex justify-center items-center h-full">
        <div>
          <div className="mb-[52px]">
            <div className="text-center mb-4 ">
              <p className="text-h2">Một ngày làm công việc BA</p>
            </div>
            <div className="text-center">
              <p className="text-p18 font-normal text-grey-1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                mauris neque, interdum eu consequat
              </p>
            </div>
          </div>
          <div className="xl:flex xl:justify-center">
            <div className="ml-[10px] mr[10px]">
              <DescribeDayItem
                title="Buổi sáng"
                description="You start the day with a discovery meeting for stakeholders from multiple departments. On the agenda: making sure the scope of your latest project."
              />
            </div>
            <div className="ml-[10px] mr[10px]">
              <DescribeDayItem
                title="Buổi trưa"
                description="You start the day with a discovery meeting for stakeholders from multiple departments. On the agenda: making sure the scope of your latest project."
              />
            </div>
            <div className="ml-[10px] mr[10px]">
              <DescribeDayItem
                title="Buổi chiều"
                description="You  start the day with a discovery meeting for stakeholders from multiple departments. On the agenda: making sure the scope of your latest project."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

DescribeDay.propTypes = {}

export default DescribeDay
