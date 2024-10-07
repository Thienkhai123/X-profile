import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import Button from '../Button'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import { getUserPortfolio, setOpenToWork } from 'store/app/portfolioSlice'
import { toast } from 'react-toastify'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { AlertSuccess } from '../Notification/Toast/AlertSuccess'
import { AlertError } from '../Notification/Toast/AlertError'
const ButtonOpenToWorkMobile = (props) => {
  const {
    toggleModalOpenToWork = () => {},
    open,
    userPortfolio,
    jobDetail = []
  } = props
  const [tempJobs, setTempJobs] = useState(jobDetail)
  const [errorSetting, setErrorSetting] = useState(null)
  const dispatch = useDispatch()
  const refOpt = useRef(null)
  const [showOpt, setShowOpt] = useState(false)

  const [jobSetting, setJobSetting] = useState({
    temp: {
      turnOn: false,
      type: [],
      jobId: null
    },
    current: {
      turnOn: false,
      type: [],
      jobId: null
    }
  })
  const schema = yup.object().shape({})

  const {
    register,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {}
  })
  const queryJobByName = (val) => {
    const tempArr = [...jobDetail]
    const filterJobs = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setTempJobs(filterJobs)
  }
  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  useOnClickOutside(refOpt, handleCloseOpt)
  const handleChooseJob = (id, val) => {
    setValue('jobId', id)
    setValue('currentJob', val)
    handleCloseOpt()
  }
  const cancelSetting = () => {
    const tempObj = cloneDeep(jobSetting?.current)
    setJobSetting({
      ...jobSetting,
      temp: tempObj
    })
    setErrorSetting('')
    document.body.style.overflow = 'auto'
    toggleModalOpenToWork()
    reset()
  }
  const handleAddJobType = (type) => {
    if (!jobSetting?.temp?.type?.includes(type)) {
      setJobSetting({
        ...jobSetting,
        temp: {
          ...jobSetting.temp,
          type:
            jobSetting?.temp?.type?.length > 0
              ? [...jobSetting?.temp?.type, type]
              : [type]
        }
      })
    } else {
      const findIndex = jobSetting?.temp?.type?.findIndex((el) => el === type)
      if (findIndex !== -1) {
        let tempArr = cloneDeep(jobSetting.temp.type)
        tempArr.splice(findIndex, 1)
        setJobSetting({
          ...jobSetting,
          temp: {
            ...jobSetting.temp,

            type: tempArr
          }
        })
      }
    }
  }

  const submitJobSetting = async () => {
    if (jobSetting?.temp?.turnOn) {
      if (jobSetting.temp.type?.length > 0) {
        const tempObj = cloneDeep(jobSetting?.temp)
        // setJobSetting({ ...jobSetting, current: tempObj }), setErrorSetting('')
        setErrorSetting('')
        const payload = {
          userId: userPortfolio?.userId,
          isOpenToWork: tempObj.turnOn,
          workTypes: tempObj.type,
          jobId: getValues('jobId')
        }
        const res = await dispatch(setOpenToWork(payload))
        if (res.payload.isSuccess) {
          dispatch(getUserPortfolio())
          toast(
            AlertSuccess({
              title: 'Lưu thành công'
            }),
            {
              toastId: 'alert-save-success',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
        } else {
          toast(
            AlertError({
              title: 'Lưu không thành công'
            }),
            {
              toastId: 'alert-save-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
        }
        document.body.style.overflow = 'auto'
        toggleModalOpenToWork()
      } else {
        setErrorSetting('Bạn phải chọn ít nhất một hình thức làm việc')
      }
    } else {
      const tempObj = cloneDeep(jobSetting?.temp)
      // setJobSetting({ ...jobSetting, current: tempObj }), setErrorSetting('')
      setErrorSetting('')
      const payload = {
        userId: userPortfolio?.userId,
        isOpenToWork: tempObj.turnOn,
        workTypes: tempObj.type,
        jobId: getValues('jobId')
      }
      const res = await dispatch(setOpenToWork(payload))
      if (res.payload.isSuccess) {
        dispatch(getUserPortfolio())
        toast(
          AlertSuccess({
            title: 'Lưu thành công'
          }),
          {
            toastId: 'alert-save-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
      toggleModalOpenToWork()
    }
  }
  const handleShowOpenToWork = () => {
    toggleModalOpenToWork(true)
    document.body.style.overflow = 'hidden'
  }

  useEffect(() => {
    setJobSetting({
      ...jobSetting,
      current: {
        turnOn: userPortfolio?.isOpenToWork || false,
        type: userPortfolio?.metadata?.workTypes,
        jobId: userPortfolio?.metadata?.jobId
      },
      temp: {
        turnOn: userPortfolio?.isOpenToWork || false,
        type: userPortfolio?.metadata?.workTypes,
        jobId: userPortfolio?.metadata?.jobId
      }
    })
    reset({
      currentJob:
        jobDetail?.find((job) => job.jobId === userPortfolio?.metadata?.jobId)
          ?.name || '',
      jobId: userPortfolio?.metadata?.jobId
    })
    setTempJobs(jobDetail)
  }, [userPortfolio?.metadata?.workTypes, userPortfolio?.metadata?.jobId])

  return (
    <div className="relative">
      <button
        className=" min-w-[196px]  h-10  border border-grey-3 rounded-lg  flex  justify-center px-4 py-2 items-center "
        onClick={() => handleShowOpenToWork()}
      >
        <p className="text-p14-bold text-black">{`Trạng thái tìm việc: ${
          jobSetting?.current?.turnOn ? 'Bật' : 'Tắt'
        }`}</p>
      </button>
      {open && (
        <div className="bg-white h-screen  border border-grey-3 z-[300] w-screen overflow-x-hidden fixed  left-0 py-2 top-0  ">
          <div className="relative py-4 flex justify-center items-center">
            <div onClick={() => cancelSetting()} className="absolute left-6">
              <XProfileIcon name="cross" stroke="#000000" />
            </div>
            <p className="text-p18-bold">Trạng thái tìm việc</p>
          </div>
          <div className="p-6 mt-6 flex flex-col  justify-between h-4/5">
            <div className="w-full">
              <div className="flex justify-between">
                <div className="flex items-center gap-4 ">
                  <div>
                    <XProfileIcon name="case" width="24" height="24" />
                  </div>
                  <p className="text-p16 text-neutral">Trạng thái tìm việc</p>
                </div>
                <div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={jobSetting.temp.turnOn}
                      className="sr-only peer"
                      onChange={(e) =>
                        setJobSetting({
                          ...jobSetting,
                          temp: {
                            ...jobSetting.temp,

                            turnOn: e.target.checked
                          }
                        })
                      }
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-light"></div>
                  </label>
                </div>
              </div>
              <div className="mt-6 ml-10 flex flex-col gap-5">
                <label
                  id="check-fulltime"
                  className="cursor-pointer flex items-center gap-6"
                >
                  <div className="relative w-fit h-fit">
                    <input
                      id="check-fulltime"
                      type="checkbox"
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button disabled:bg-nude border-grey-4 rounded"
                      checked={jobSetting?.temp?.type?.includes(1) || false}
                      onChange={() => handleAddJobType(1)}
                      disabled={!jobSetting?.temp?.turnOn}
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p16 text-neutral">Fulltime</p>
                </label>
                <label
                  id="check-fulltime"
                  className="cursor-pointer flex items-center gap-6"
                >
                  <div className="relative w-fit h-fit ">
                    <input
                      id="check-fulltime"
                      type="checkbox"
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button disabled:bg-nude border-grey-4 rounded"
                      checked={jobSetting?.temp?.type?.includes(2) || false}
                      onChange={() => handleAddJobType(2)}
                      disabled={!jobSetting?.temp?.turnOn}
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p16 text-neutral">Part-time</p>
                </label>
                <label
                  id="check-fulltime"
                  className="cursor-pointer flex items-center gap-6 "
                >
                  <div className="relative w-fit h-fit">
                    <input
                      id="check-fulltime"
                      type="checkbox"
                      checked={jobSetting?.temp?.type?.includes(3) || false}
                      className="appearance-none block w-6 h-6 accent-button bg-white border peer checked:bg-button disabled:bg-nude border-grey-4 rounded"
                      onChange={() => handleAddJobType(3)}
                      disabled={!jobSetting?.temp?.turnOn}
                    />
                    <div className="absolute top-0 w-full h-full flex items-center justify-center  opacity-0 peer-checked:opacity-100">
                      <XProfileIcon
                        name="quizCheck"
                        width="9.38"
                        height="7.88"
                      />
                    </div>
                  </div>
                  <p className="text-p16 text-neutral">Freelance</p>
                </label>
              </div>
              <div className="mt-6">
                <div className="flex mb-[8px] items-center">
                  <p className="text-p16 text-neutral">Vị trí ứng tuyển</p>
                </div>
                <div className="relative" ref={refOpt}>
                  <div
                    className={`w-full flex justify-between py-2 gap-2 px-6 items-center border rounded-lg bg-white border-grey-3
                ${
                  !jobSetting?.temp?.turnOn
                    ? 'pointer-events-none bg-grey-4'
                    : ''
                }
                `}
                    onClick={() => setShowOpt(true)}
                  >
                    <input
                      placeholder="Chọn vị trí..."
                      className="outline-0 text-p16 text-neutral bg-white  w-full disabled:bg-grey-4"
                      {...register('currentJob')}
                      disabled={!jobSetting?.temp?.turnOn}
                      onChange={(e) => queryJobByName(e.target.value)}
                    />
                    <XProfileIcon name="arrowDown" />
                  </div>
                  {showOpt && (
                    <div className="bg-white max-h-[180px] w-full overflow-x-hidden absolute top-[64px] rounded-lg border border-grey-3 custom-scrollbar z-10 -mt-4">
                      <div
                        className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                        onClick={() => handleChooseJob(0, '')}
                      >
                        <p>Không chọn</p>
                      </div>
                      {tempJobs?.map((job, ind) => {
                        return (
                          <div
                            key={ind}
                            className="flex justify-between items-center px-[24px] hover:bg-yellow-bg py-[10px]"
                            onClick={() =>
                              handleChooseJob(job?.jobId, job?.name)
                            }
                          >
                            <p>{job?.name}</p>
                          </div>
                        )
                      })}
                    </div>
                  )}
                </div>
                {/* <p className="text-p14 text-red-500 h-[22px]">
              {errors.currentJob?.message}
            </p> */}
              </div>
              <p className="text-red-500 h-[24px] mt-2">{errorSetting}</p>
            </div>

            <div className="w-full mt-10  ">
              <Button
                title="Lưu"
                className="py-3 px-8"
                width="w-full"
                margin="m-0"
                rounded="rounded-lg"
                height="h-[48px]"
                onClick={() => {
                  submitJobSetting()
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

ButtonOpenToWorkMobile.propTypes = {}

ButtonOpenToWorkMobile.defaultProps = {}

export default ButtonOpenToWorkMobile
