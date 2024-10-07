import React, { Fragment, useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import DatePicker from 'react-datepicker'
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
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import { useRouter } from 'next/router'
import Link from 'next/link'
import StepAnalytic from 'common/presentation/StepAnalytic'
import SaveJobStepAnalytic from './SaveJobStepAnalytic'
import { useDispatch } from 'react-redux'
import Button from 'common/presentation/Button'
import Pagination from 'common/presentation/Pagination'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const JobSavedEdit = (props) => {
  const { isAuthentication } = props
  const JOBSAVE_STEP = [
    { id: 0, title: 'Việc làm đã lưu ', href: '#' },
    { id: 1, title: 'Các vị trí ứng tuyển', href: '#' }
  ]
  const trans = useTrans()
  const router = useRouter()
  const { push } = useRouter()
  const { metaFavoriteCampaigns, metaAppliedCampaigns } = useSelector(
    selectAllInitCampaigns
  )
  const refSortCVOpt = useRef(null)
  const userFavoriteCampaigns = useSelector(selectAllFavoriteCampaigns)
  const userAppliedCampaigns = useSelector(selectAllAppliedCampaigns)

  const [choosedStepId, setChooseStepId] = useState(0)
  const [keyword, setKeyword] = useState('')
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
  const handleChoose = async (id) => {
    if (id === 0) {
      dispatch(getAllFavoriteCampaigns({}))
    } else {
      dispatch(getAllAppliedCampaigns({}))
    }
    setChooseStepId(id)
    handleCloseOptionJobSave()
  }

  const handlePageChangeFavoriteCampaigns = async (page) => {
    dispatch(getAllFavoriteCampaigns({ page: page }))
  }
  const handlePageChangeAppliedCampaigns = async (page) => {
    dispatch(getAllAppliedCampaigns({ page: page }))
  }

  const handleSearch = (e) => {
    e.preventDefault()
    if (choosedStepId === 0) {
      dispatch(getAllFavoriteCampaigns({ keyword: keyword || '' }))
    } else {
      dispatch(getAllAppliedCampaigns({ keyword: keyword || '' }))
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="xl:block hidden text-p20-bold text-neutral ">
          Việc làm đã lưu
        </p>
        <form
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
        </form>
      </div>
      <div className="mt-10">
        <div className="xl:hidden mb-4">
          <div className="relative flex justify-end" ref={refSortCVOpt}>
            <button
              className=" w-[218px] border border-grey-3 rounded-lg  flex gap-2 justify-between py-[10px] px-4 items-center"
              onClick={() => setShowOptionJobSave(!showOptionJobSave)}
            >
              <Fragment>
                <p className="text-p16  text-neutral ">
                  {JOBSAVE_STEP[choosedStepId].title}
                </p>
                <XProfileIcon name="arrowDown" />
              </Fragment>
            </button>
            {showOptionJobSave && (
              <div className="bg-white max-h-[320px] p-2  shadow-[0_8px_16px_rgba(0,0,0,0.04)] border border-grey-3 z-50 w-[218px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-lg">
                {JOBSAVE_STEP?.map((step) => (
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
          <div className={``}>
            <div className="w-full">
              {userFavoriteCampaigns?.length !== 0 ? (
                <div className=" grid grid-cols-2 xl:grid-cols-2 xl:gap-11 gap-4  mb-11">
                  {userFavoriteCampaigns.map((job, index) => {
                    const {
                      companyId,
                      departmentId,
                      departmentPositionId,
                      company
                    } = job
                    const { tag } = company
                    return (
                      <HightlightJobCard
                        key={index}
                        job={job}
                        isAuthentication={isAuthentication}
                        handleAction={() =>
                          handleLink(tag, departmentId, departmentPositionId)
                        }
                      />
                    )
                  })}
                </div>
              ) : (
                <div className="w-full min-h-[340px] flex flex-col items-center justify-center">
                  <Image
                    alt="empty"
                    width={200}
                    height={200}
                    src={'/images/empty.svg'}
                  />
                  <p className="text-grey-2 text-p18 mt-10">
                    Hiện chưa có việc làm đã lưu nào
                  </p>
                </div>
              )}
              <div>
                {metaFavoriteCampaigns?.totalPages > 1 && (
                  <div className="flex justify-end items-center">
                    <Pagination
                      totalPages={metaFavoriteCampaigns?.totalPages}
                      pageSize={metaFavoriteCampaigns?.pageSize}
                      totalCount={metaFavoriteCampaigns?.recordsTotal}
                      currentPage={metaFavoriteCampaigns?.currentPage}
                      onPageChange={handlePageChangeFavoriteCampaigns}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {/* {choosedStepId === 1 && (
          <div className={``}>
            <div className="w-full">
              {userAppliedCampaigns?.length !== 0 ? (
                <div>
                  <div className="xl:pt-[58px] grid grid-cols-2 xl:grid-cols-2 xl:gap-11 gap-4 mb-5 ">
                    {userAppliedCampaigns?.map((job, index) => {
                      const {
                        companyId,
                        departmentId,
                        departmentPositionId,
                        company
                      } = job
                      const { tag } = company
                      return (
                        <HightlightJobCard
                          key={index}
                          job={job}
                          applied={true}
                          isAuthentication={isAuthentication}
                          handleAction={() =>
                            handleLink(tag, departmentId, departmentPositionId)
                          }
                        />
                      )
                    })}
                  </div>
                  {metaAppliedCampaigns?.totalPages > 1 && (
                    <div className="flex justify-end items-center">
                      <Pagination
                        totalPages={metaAppliedCampaigns?.totalPages}
                        pageSize={metaAppliedCampaigns?.pageSize}
                        totalCount={metaAppliedCampaigns?.recordsTotal}
                        currentPage={metaAppliedCampaigns?.currentPage}
                        onPageChange={handlePageChangeAppliedCampaigns}
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full min-h-[340px] flex flex-col items-center justify-center">
                  <Image
                    alt="empty"
                    width={200}
                    height={200}
                    src={'/images/empty.svg'}
                  />
                  <p className="text-grey-2 text-p18 mt-10">
                    Hiện chưa có vị trí ứng tuyển nào
                  </p>
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  )
}

export default JobSavedEdit
