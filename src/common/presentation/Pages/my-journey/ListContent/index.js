import Image from 'next/image'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import ProgressBarBasic from '../ProgressBarBasic'
import ResultStatus from '../ResultStatus'
import moment from 'moment'

const ListContent = (props) => {
  const { data = [] } = props

  return (
    <div className="w-full  flex flex-col overflow-x-scroll">
      <div className=" grid grid-cols-12 py-[18px] px-6 bg-[#EBEFF4] gap-4 w-[880px] xl:w-full">
        <div className="w-full col-span-4">
          <p className="text-p14-bold">Content</p>
        </div>
        <div className="w-full col-span-2">
          <p className="text-p14-bold">Deadline</p>
        </div>
        <div className="w-full col-span-2">
          <p className="text-p14-bold">Completion Date</p>
        </div>
        <div className="w-full col-span-2">
          <p className="text-p14-bold">Progress</p>
        </div>
        <div className="w-full col-span-2">
          <p className="text-p14-bold">Result</p>
        </div>
      </div>
      {data?.map((item, index) => {
        const {
          id,
          name,
          deadline,
          courseCompletePercentage,
          isExamPassed,
          courseCompletedAt
        } = item
        return (
          <div
            key={index}
            className="grid grid-cols-12 py-[18px] px-6 border-b border-[#eee] gap-4 items-center w-[880px] xl:w-full"
          >
            <div className="w-full col-span-4">
              <p className="text-p14">{name}</p>
            </div>
            <div className="w-full col-span-2">
              <p className="text-p14">
                {deadline ? moment(deadline).format('DD/MM/YYYY') : '-'}
              </p>
            </div>
            <div className="w-full col-span-2">
              <p className="text-p14">
                {courseCompletedAt
                  ? moment(courseCompletedAt).format('DD/MM/YYYY')
                  : '-'}
              </p>
            </div>
            <div className="w-full col-span-2">
              {/* {index === 2 ? (
                <div className="w-fit px-3 py-1 bg-button-2 border border-[#E0E0E0] rounded cursor-pointer">
                  <p className="text-p14 text-white">Register</p>
                </div>
              ) : ( */}
              <Fragment>
                <p className="text-p14 mb-2">
                  {courseCompletePercentage || 0}%
                </p>
                <div className="max-w-[102px]">
                  <ProgressBarBasic
                    color="bg-button-2"
                    background="bg-[#F0F0F0]"
                    percentValue={courseCompletePercentage || 0}
                    height={8}
                  />
                </div>
              </Fragment>
              {/* )} */}
            </div>
            <div className="w-full col-span-2 ">
              <ResultStatus
                status={
                  isExamPassed === true ? 1 : isExamPassed === false ? 2 : 0
                }
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

ListContent.propTypes = {}

ListContent.defaultProps = {}

export default ListContent
