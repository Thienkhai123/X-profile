import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Button from '../Button'
import cloneDeep from 'lodash/cloneDeep'
import { useDispatch } from 'react-redux'
import { getUserPortfolio, setOpenToWork } from 'store/app/portfolioSlice'
import { toast } from 'react-toastify'
import { ToastSuccess } from '../Notification/Toast'
import { ToastError } from '../Notification/Toast/ToastError'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useForm } from 'react-hook-form'
import { AlertSuccess } from '../Notification/Toast/AlertSuccess'
import { AlertError } from '../Notification/Toast/AlertError'
const ButtonOpenToWork = (props) => {
  const {
    toggleModalOpenToWork = () => {},
    open,
    userPortfolio,
    jobDetail = []
  } = props
  const [tempJobs, setTempJobs] = useState(jobDetail)
  const refOpenToWorkOpt = useRef(null)
  const refOpt = useRef(null)
  const inputRef = useRef(null)
  const [showOpt, setShowOpt] = useState(false)
  const [errorSetting, setErrorSetting] = useState(null)
  const handleCloseOpenToWorkOpt = () => cancelSetting()
  useOnClickOutside(refOpenToWorkOpt, handleCloseOpenToWorkOpt)
  const dispatch = useDispatch()
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
    <div className="relative" ref={refOpenToWorkOpt}>
      <button
        className=" xl:min-w-[306px] sm:h-[48px] h-[36px] hover:bg-nude border border-grey-3 rounded-lg w-full flex gap-2 justify-between py-4 px-8 items-center "
        onClick={() => toggleModalOpenToWork(!open)}
      >
        <p className="sm:text-p18-bold text-p14-bold text-black">{`Trạng thái tìm việc: ${
          jobSetting?.current?.turnOn ? 'Bật' : 'Tắt'
        }`}</p>
        <XProfileIcon name="vectorDownBlack" width="14" height="14" />
      </button>
      {open && (
        <div className="bg-white max-h-[442px] p-8 border border-grey-3 z-50 min-w-[400px]  sm:w-full  absolute sm:top-[54px] top-[50px] xl:right-0 xl:left-auto  left-1/2 xl:translate-x-0 -translate-x-1/2   rounded-lg shadow-[0_16px_24px_rgba(0,0,0,0.04)]">
          <div className="flex justify-between">
            <div className="flex items-center gap-4 ">
              <div>
                <XProfileIcon name="case" width="24" height="24" />
              </div>
              <p className="text-p18 text-neutral">Trạng thái tìm việc</p>
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
                  <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
                </div>
              </div>
              <p className="text-p18 text-neutral">Fulltime</p>
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
                  <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
                </div>
              </div>
              <p className="text-p18 text-neutral">Part-time</p>
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
                  <XProfileIcon name="quizCheck" width="9.38" height="7.88" />
                </div>
              </div>
              <p className="text-p18 text-neutral">Freelance</p>
            </label>
          </div>

          <div className="mt-6">
            <div className="flex mb-[8px] items-center">
              <p className="sm:text-p18 text-p14-bold ">Vị trí ứng tuyển</p>
            </div>
            <div className="relative" ref={refOpt}>
              <div
                className={`w-full flex justify-between py-2 gap-2 px-4 items-center border rounded-lg bg-white border-grey-3
                ${
                  !jobSetting?.temp?.turnOn
                    ? 'pointer-events-none bg-grey-4'
                    : ''
                }
                `}
                onClick={() => setShowOpt(true)}
              >
                <input
                  ref={inputRef}
                  placeholder="Chọn vị trí..."
                  className="outline-0 sm:text-p18 text-p12 text-neutral bg-white  w-full disabled:bg-grey-4"
                  {...register('currentJob')}
                  disabled={!jobSetting?.temp?.turnOn}
                  onChange={(e) => queryJobByName(e.target.value)}
                />
                <XProfileIcon name="arrowDown" />
              </div>
              {showOpt && (
                <div className="bg-white max-h-[180px] w-full overflow-x-hidden rounded-lg border-grey-3 absolute top-[64px] border  custom-scrollbar z-10 -mt-4 shadow-[0_16px_24px_rgba(0,0,0,0.04)]">
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
                        onClick={() => handleChooseJob(job?.jobId, job?.name)}
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
          {errorSetting && errorSetting !== '' && (
            <p className="text-red-500 h-[24px] mt-2">{errorSetting}</p>
          )}

          <div className="flex justify-end items-center mt-8 gap-[16px] ">
            <Button
              title="Huỷ"
              padding="py-3  px-6"
              background="bg-grey-4"
              margin="m-0"
              rounded="rounded-lg"
              height="h-[36px] "
              onClick={() => cancelSetting()}
            />
            <Button
              title="Lưu"
              className="py-3  px-6"
              margin="m-0"
              rounded="rounded-lg"
              height="h-[36px]"
              onClick={() => {
                submitJobSetting()
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}

ButtonOpenToWork.propTypes = {}

ButtonOpenToWork.defaultProps = {}

export default ButtonOpenToWork
