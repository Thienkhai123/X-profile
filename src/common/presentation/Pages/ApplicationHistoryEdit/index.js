import React, { Fragment, useRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import { useSelector } from 'react-redux'
import {
  getAllAppliedCampaigns,
  getAllFavoriteCampaigns,
  getMoreAppliedCampaigns,
  getMoreFavoriteCampaigns,
  selectAllAppliedCampaigns,
  selectAllFavoriteCampaigns,
  selectAllInitCampaigns
} from 'store/app/campaign'

import { useRouter } from 'next/router'

import { useDispatch } from 'react-redux'
import Button from 'common/presentation/Button'
import Pagination from 'common/presentation/Pagination'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import AplicationHistoryStepAnalytic from './AplicationHistoryStepAnalytic'
import AppliedPage from './Applied'
import ConfirmInterviewPage from './ConfirmInterview'
import InterviewedPage from './Interviewed'
import AcceptedJobPage from './AcceptedJob'
import OfficialStaffPage from './OfficialStaff'
import CancelledJobPage from './CancelledJob'

const ApplicationHistoryEdit = (props) => {
  const { isAuthentication } = props
  const APPLICATION_HISTORY_STEP = [
    { id: 0, title: 'Đã ứng tuyển ', href: '#', status: 100 },
    { id: 1, title: 'Xác nhận phỏng vấn', href: '#', status: 200 },
    { id: 2, title: 'Đã phỏng vấn', href: '#', status: 400 },
    { id: 3, title: 'Đã nhận việc', href: '#', status: 500 },
    { id: 4, title: 'Nhân viên chính thức', href: '#', status: 800 },
    { id: 5, title: 'Đã từ chối', href: '#', status: 300 }
  ]

  const { push } = useRouter()
  const { metaAppliedCampaigns, userAcceptInterview } = useSelector(
    selectAllInitCampaigns
  )
  const refSortCVOpt = useRef(null)
  const userAppliedCampaigns = useSelector(selectAllAppliedCampaigns)
  const [choosedStepId, setChooseStepId] = useState(0)
  const dispatch = useDispatch()
  const [showOptionJobSave, setShowOptionJobSave] = useState(false)
  const handleCloseOptionJobSave = () => setShowOptionJobSave(false)
  useOnClickOutside(refSortCVOpt, handleCloseOptionJobSave)
  const handleLink = (companyId, departmentId, departmentPositionId) => {
    if (departmentId) {
      push(
        `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
      )
    } else {
      push(`/profile-company/${companyId}/${id}/${departmentPositionId}`)
    }
  }
  const handleChoose = async (id, status) => {
    dispatch(getAllAppliedCampaigns({ status }))

    setChooseStepId(id)
    handleCloseOptionJobSave()
  }

  const handlePageChangeAppliedCampaigns = async (page) => {
    dispatch(getAllAppliedCampaigns({ page: page }))
  }

  // const handleSearch = (e) => {
  //   e.preventDefault()
  //   if (choosedStepId === 0) {
  //     dispatch(getAllFavoriteCampaigns({ keyword: keyword || '' }))
  //   } else {
  //     dispatch(getAllAppliedCampaigns({ keyword: keyword || '' }))
  //   }
  // }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="xl:block hidden text-p20-bold text-neutral ">
          Lịch sử ứng tuyển
        </p>
        {/* <form
          onSubmit={(e) => handleSearch(e)}
          className="relative xl:block hidden "
        >
          <div className="absolute  inset-y-0 left-2 flex items-center pl-2">
            <XProfileIcon name="search" />
          </div>
          <input
            className="py-3 xl:min-w-[360px] w-full pl-11 bg-light-nude rounded-lg"
            placeholder="Tìm kiếm"
            maxLength={255}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form> */}
      </div>
      <div className="">
        <div className="hidden xl:block">
          <AplicationHistoryStepAnalytic
            marginBottom="mb-6"
            SETTING_STEP={APPLICATION_HISTORY_STEP}
            handleChoose={handleChoose}
            choosedStepId={choosedStepId}
            breakpoints={{
              330: {
                slidesPerView: 2,
                slidesPerGroup: 1
              },
              750: {
                slidesPerView: 3,
                slidesPerGroup: 1
              }
            }}
          />
        </div>
        <div className="xl:hidden mb-4">
          <div className="relative flex justify-end" ref={refSortCVOpt}>
            <button
              className=" w-[218px] border border-grey-3 rounded-lg  flex gap-2 justify-between py-[10px] px-4 items-center"
              onClick={() => setShowOptionJobSave(!showOptionJobSave)}
            >
              <Fragment>
                <p className="text-p16  text-neutral ">
                  {APPLICATION_HISTORY_STEP[choosedStepId].title}
                </p>
                <XProfileIcon name="arrowDown" />
              </Fragment>
            </button>
            {showOptionJobSave && (
              <div className="bg-white max-h-[320px] p-2  shadow-[0_8px_16px_rgba(0,0,0,0.04)] border border-grey-3 z-50 w-[218px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-lg">
                {APPLICATION_HISTORY_STEP?.map((step) => (
                  <div
                    key={step?.id}
                    className="flex transition-all justify-between rounded-lg items-center px-4 py-2"
                    onClick={() => handleChoose(step.id)}
                  >
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <p className=" text-p16 text-neutral">{step?.title}</p>
                        {/* {choosedStepId === step?.id && (
                          <XProfileIcon name="check" />
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {choosedStepId === 0 && (
          <AppliedPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
        {choosedStepId === 1 && (
          <ConfirmInterviewPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            userAcceptInterview={userAcceptInterview}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
        {choosedStepId === 2 && (
          <InterviewedPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
        {choosedStepId === 3 && (
          <AcceptedJobPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
        {choosedStepId === 4 && (
          <OfficialStaffPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
        {choosedStepId === 5 && (
          <CancelledJobPage
            step={choosedStepId}
            handleLink={handleLink}
            userAppliedCampaigns={userAppliedCampaigns}
            metaAppliedCampaigns={metaAppliedCampaigns}
            isAuthentication={isAuthentication}
            handlePageChangeAppliedCampaigns={handlePageChangeAppliedCampaigns}
          />
        )}
      </div>
    </div>
  )
}

export default ApplicationHistoryEdit
