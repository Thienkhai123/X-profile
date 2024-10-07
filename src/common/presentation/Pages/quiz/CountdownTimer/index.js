import React from 'react'
import PropTypes from 'prop-types'
import { useCountdown } from 'common/hooks/useCountdown'
import XProfileIcon from 'common/presentation/Icons'
import Head from 'next/head'

const CountdownTimer = (props) => {
  const { targetDate, handleSubmitExam = () => {}, name } = props
  const [days, hours, minutes, seconds] = useCountdown(targetDate)
  if (days + hours + minutes + seconds <= 0) {
    handleSubmitExam()
  } else {
    return (
      <div className="min-w-[269px] shadow-[0_8px_16px_rgba(0,0,0,0.04)]  px-10 py-4  flex items-center  gap-6 border border-grey-4 bg-white rounded-2xl">
        <Head>
          <title>{`[${hours || 0}:${minutes || 0}:${seconds || 0}] ${
            name || ''
          }`}</title>
        </Head>
        <div className="flex items-center gap-1">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center">
            <XProfileIcon name="countdownQuiz" />
          </div>
        </div>
        <div className="flex flex-col items-start">
          <p className="text-p18 text-grey-1">Đếm ngược</p>
          <div className="flex justify-center  ">
            <p
              className={`text-p20-bold ${
                hours === 0 && minutes < 1 ? 'text-[#DB2E24]' : 'text-neutral'
              }`}
            >
              {hours || 0}:
            </p>
            {/* <div className="h-6 w-[1px] bg-neutral mx-[2px]"></div> */}
            <p
              className={`text-p20-bold ${
                hours === 0 && minutes < 1 ? 'text-[#DB2E24]' : 'text-neutral'
              } `}
            >
              {(minutes < 10 ? `0${minutes}` : minutes) || 0}:
            </p>
            {/* <div className="h-6 w-[1px] bg-neutral mx-[2px]"></div> */}
            <p
              className={`text-p20-bold ${
                hours === 0 && minutes < 1 ? 'text-[#DB2E24]' : 'text-neutral'
              }`}
            >
              {(seconds < 10 ? `0${seconds}` : seconds) || 0}
            </p>
          </div>
        </div>
      </div>
    )
  }
}

CountdownTimer.propTypes = {}
CountdownTimer.defaultProps = {}

export default CountdownTimer
