import React, { Fragment, useRef, useState } from 'react'

import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import StaticDashboard from '../StaticDashboard'
import Image from 'next/image'
import CandidateConversionRate from '../CandidateConversionRate'
import CircularProgressDashboard from 'common/presentation/Pages/CircularProgressDashboard'
import RecruitmentPlannedRate from '../RecruitmentPlannedRate'
import TotalRecruitmentCost from '../TotalRecruitmentCost'
import { useDispatch } from 'react-redux'
import { updateQueryDashboard } from 'store/app/dashboardSlice'

const InterviewDashboard = (props) => {
  const {
    applicants,
    applicantsPast,
    totalPricePast,
    showFilter = false,
    totalPrice,
    departmentList = [],
    queryFilter,
    timeType,
    departmentPositionsFilter = [],
    rateDateType,
    selectedSortRecruitment = () => {},
    selectedSortDepartment = () => {},
    selectedSortJobType = () => {},
    handleSelectSortRecruitment = () => {},
    handleSelectSortDepartment = () => {},
    handleSelectSortJobType = () => {}
  } = props
  const dispatch = useDispatch()

  const [showSortRecruitmentOpt, setShowSortRecruitmentOpt] = useState(false)
  const [showSortDepartmentOpt, setShowSortDepartmentOpt] = useState(false)
  const [showSortJobTypeOpt, setShowSortJobTypeOpt] = useState(false)
  const refSortRecruitmentOpt = useRef(null)
  const refSortDepartmentOpt = useRef(null)
  const refSortJobTypeOpt = useRef(null)

  const handleCloseSortRecruitmentOpt = () => setShowSortRecruitmentOpt(false)
  useOnClickOutside(refSortRecruitmentOpt, handleCloseSortRecruitmentOpt)
  const handleCloseSortDepartmentOpt = () => setShowSortDepartmentOpt(false)
  useOnClickOutside(refSortDepartmentOpt, handleCloseSortDepartmentOpt)
  const handleCloseSortJobTypeOpt = () => setShowSortJobTypeOpt(false)
  useOnClickOutside(refSortJobTypeOpt, handleCloseSortJobTypeOpt)

  return (
    <div key={rateDateType} className="">
      {/* Fillter */}
      <div
        className={`transition-all  duration-200 ease-linear ${
          showFilter ? 'max-h-14 mb-4' : 'max-h-0 overflow-hidden'
        }    flex items-center gap-4 `}
      >
        <div className="relative" ref={refSortRecruitmentOpt}>
          <button
            className=" xl:min-w-[369px] bg-dark-blue rounded-2xl w-full flex gap-2 justify-between py-3.5 px-6 items-center"
            onClick={() => setShowSortRecruitmentOpt(!showSortRecruitmentOpt)}
          >
            {/* {selectedSortDate.id === null ? (
                  <Fragment>
                    <p className="sm:text-p18 text-p14  text-white ">
                      {SORT_DATA[0].name}
                    </p>
                    <XProfileIcon name="altArrowDown" />
                  </Fragment>
                ) : ( */}
            <Fragment>
              <p className="sm:text-p18 text-p14  text-white line-clamp-1">
                {selectedSortRecruitment.value}
              </p>
              <XProfileIcon name="altArrowDown" />
            </Fragment>
            {/* )} */}
          </button>
          {showSortRecruitmentOpt && (
            <div className="bg-[#162A66] shadow-[0_16px_24px_rgba(255,255,255,0.04)] custom-scrollbar1 border border-[#2E50B0] max-h-[374px] px-2 py-4 drop-shadow-[0_16px_24px_0_#0000000A] z-50 min-w-[360px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-2xl">
              {departmentPositionsFilter?.map((sort) => (
                <Fragment key={sort?.departmentPositionId}>
                  <div
                    className="flex cursor-pointer transition-all justify-between rounded-2xl items-center p-4 hover:bg-[#0B2156] "
                    onClick={() => {
                      handleSelectSortRecruitment(sort),
                        setShowSortRecruitmentOpt(false)
                    }}
                  >
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <p className="sm:text-p18 text-p14 text-white">
                          {sort?.name}
                        </p>
                        {/* {selectedSortDate.id === sort?.id && (
                            <XProfileIcon name="check" />
                          )} */}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 last:hidden">
                    <div className="w-full h-0.5 bg-[#0B2156] my-2 "></div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={refSortDepartmentOpt}>
          <button
            className=" xl:min-w-[369px] bg-dark-blue rounded-2xl w-full flex gap-2 justify-between py-3.5 px-6 items-center"
            onClick={() => setShowSortDepartmentOpt(!showSortDepartmentOpt)}
          >
            {/* {selectedSortDate.id === null ? (
                  <Fragment>
                    <p className="sm:text-p18 text-p14  text-white ">
                      {SORT_DATA[0].name}
                    </p>
                    <XProfileIcon name="altArrowDown" />
                  </Fragment>
                ) : ( */}
            <Fragment>
              <p className="sm:text-p18 text-p14  text-white line-clamp-1">
                {selectedSortDepartment.value}
              </p>
              <XProfileIcon name="altArrowDown" />
            </Fragment>
            {/* )} */}
          </button>
          {showSortDepartmentOpt && (
            <div className="bg-[#162A66] shadow-[0_16px_24px_rgba(255,255,255,0.04)] custom-scrollbar1 border custom-scrollbar1 border-[#2E50B0] max-h-[374px] px-2 py-4 drop-shadow-[0_16px_24px_0_#0000000A] z-50 min-w-[360px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-2xl">
              {departmentList?.map((sort) => (
                <Fragment key={sort?.departmentId}>
                  <div
                    className="flex cursor-pointer transition-all justify-between rounded-2xl items-center p-4 hover:bg-[#0B2156] "
                    onClick={() => {
                      handleSelectSortDepartment(sort),
                        setShowSortDepartmentOpt(false)
                    }}
                  >
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <p className="sm:text-p18 text-p14 text-white line-clamp-2">
                          {sort?.name}
                        </p>
                        {/* {selectedSortDate.id === sort?.id && (
                            <XProfileIcon name="check" />
                          )} */}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 last:hidden">
                    <div className="w-full h-0.5 bg-[#0B2156] my-2 "></div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
        <div className="relative" ref={refSortJobTypeOpt}>
          <button
            className=" xl:min-w-[369px] bg-dark-blue rounded-2xl w-full flex gap-2 justify-between py-3.5 px-6 items-center"
            onClick={() => setShowSortJobTypeOpt(!showSortJobTypeOpt)}
          >
            {/* {selectedSortDate.id === null ? (
                  <Fragment>
                    <p className="sm:text-p18 text-p14  text-white ">
                      {SORT_DATA[0].name}
                    </p>
                    <XProfileIcon name="altArrowDown" />
                  </Fragment>
                ) : ( */}
            <Fragment>
              <p className="sm:text-p18 text-p14  text-white ">
                {selectedSortJobType?.typeDisplay}
              </p>
              <XProfileIcon name="altArrowDown" />
            </Fragment>
            {/* )} */}
          </button>
          {showSortJobTypeOpt && (
            <div className="bg-[#162A66] shadow-[0_16px_24px_rgba(255,255,255,0.04)] custom-scrollbar1 border border-[#2E50B0] max-h-[374px] px-2 py-4 drop-shadow-[0_16px_24px_0_#0000000A] z-50 min-w-[360px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-2xl">
              {timeType?.map((sort) => (
                <Fragment key={sort?.type}>
                  <div
                    className="flex cursor-pointer  transition-all justify-between rounded-2xl items-center p-4 hover:bg-[#0B2156] "
                    onClick={() => {
                      handleSelectSortJobType(sort),
                        setShowSortJobTypeOpt(false)
                    }}
                  >
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <p className="sm:text-p18 text-p14 text-white">
                          {sort?.typeDisplay}
                        </p>
                        {/* {selectedSortDate.id === sort?.id && (
                            <XProfileIcon name="check" />
                          )} */}
                      </div>
                    </div>
                  </div>

                  <div className="px-5 last:hidden">
                    <div className="w-full h-0.5 bg-[#0B2156] my-2 "></div>
                  </div>
                </Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* Fillter */}
      <StaticDashboard
        {...applicants}
        applicantsPast={applicantsPast}
        rateDateType={rateDateType}
      />
      <div className="flex xl:flex-row flex-col items-start mt-4 gap-4">
        <CandidateConversionRate {...applicants} />
        <div className="flex flex-col gap-4 h-full">
          <RecruitmentPlannedRate
            {...applicants}
            applicantsPast={applicantsPast}
            rateDateType={rateDateType}
          />
          <TotalRecruitmentCost
            totalPrice={totalPrice}
            totalPricePast={totalPricePast}
            rateDateType={rateDateType}
          />
        </div>
      </div>
    </div>
  )
}

export default InterviewDashboard
