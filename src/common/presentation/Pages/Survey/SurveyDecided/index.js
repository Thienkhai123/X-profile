import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import SurveyBack from '../SurveyBack'
import { getJobByJobCategory, selectJobDetail } from 'store/app/jobSlice'
import { postSurvey } from 'store/app/surveySlice'
import useTrans from 'common/hooks/useTrans'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const SurveyDecided = (props) => {
  const { unAmountType, surveyResult, decided } = props
  const dispatch = useDispatch()
  const trans = useTrans()
  const refOpt = useRef(null)
  const [showOpt, setShowOpt] = useState(false)
  const [selectedJob, setSelectedJob] = useState({
    id: 0,
    name: ''
  })
  const { jobDetail } = useSelector(selectJobDetail)
  const handleSelectJob = (value) => {
    setSelectedJob({
      id: value?.jobId,
      name: value?.name
    })
    setShowOpt(false)
  }
  const handleCloseOpt = () => setShowOpt(false)
  useOnClickOutside(refOpt, handleCloseOpt)

  const onSubmit = () => {
    if (surveyResult) {
      const surveyPayload = {
        surveyAnswer1Id: surveyResult.first[0],
        surveyAnswer2Id: surveyResult.second[0],
        jobId: parseInt(selectedJob.id)
      }
      dispatch(postSurvey(surveyPayload))
    }
  }

  useEffect(() => {
    dispatch(getJobByJobCategory())
  }, [dispatch])

  return (
    <div>
      <div className="flex justify-center">
        <div
          className={`mb-10 md:mb-0 xl:w-[1141px] w-full flex justify-start`}
        >
          <SurveyBack
            unAmountType={unAmountType}
            titleBackButton={decided?.titleBackButton}
          />
        </div>
      </div>
      <div className="md:w-[560px] w-auto mt-[26px] mx-auto">
        <p className="xl:text-h1 text-p20-bold text-black text-center mb-[15px]">
          {decided?.title}
        </p>
        <p className="xl:text-p18 text-p14 text-grey-1 text-center mb-[38px]">
          {decided?.description}
        </p>
        <div className="relative" ref={refOpt}>
          <button
            className="bg-white rounded-[8px] sm:w-[560px] w-full flex justify-between py-[14px] px-[24px] items-center"
            onClick={() => setShowOpt(!showOpt)}
          >
            {selectedJob.id === 0 ? (
              <Fragment>
                <p className="xl:text-p18 text-p14">
                  Tôi chưa xác định được nghề nghiệp
                </p>
                <XProfileIcon name="arrowDown" />
              </Fragment>
            ) : (
              <Fragment>
                <p className="xl:text-p18 text-p14">{selectedJob.name}</p>
                <XProfileIcon name="arrowDown" />
              </Fragment>
            )}
          </button>
          {showOpt && (
            <div className="custom-scrollbar  bg-white max-h-[190px] w-full overflow-x-hidden absolute top-[64px] rounded-[12px]">
              {jobDetail?.map((job) => (
                <div
                  key={job?.jobId}
                  className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                  onClick={() => handleSelectJob(job)}
                >
                  <p>{job?.name}</p>
                  {selectedJob.id === job?.jobId && (
                    <XProfileIcon name="check" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mt-[40px] w-fit mx-auto">
          <button
            className="w-[206px] py-[12px] bg-button  rounded-[8px] text-blacksm:text-p18-bold text-p14 font-bold disabled:bg-grey-2 disabled:text-white hover:opacity-80"
            onClick={onSubmit}
          >
            {decided?.titleButton}
          </button>
        </div>
      </div>
    </div>
  )
}

SurveyDecided.propTypes = {
  unAmountType: PropTypes.func,
  surveyResult: PropTypes.object
}

SurveyDecided.defaultProps = {
  unAmountType: () => {},
  surveyResult: null
}

export default SurveyDecided
