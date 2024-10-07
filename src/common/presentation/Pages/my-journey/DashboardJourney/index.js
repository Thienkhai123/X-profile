import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import ProgressBarBasic from 'common/presentation/Pages/my-journey/ProgressBarBasic'
const STEP_LIST = [
  {
    id: 0,
    title: 'Today’s Summary '
  },
  {
    id: 1,
    title: 'Required'
  },
  {
    id: 2,
    title: 'Suggesstion'
  }
]
const DashboardJourney = (props) => {
  const {} = props
  const [step, setStep] = useState(0)
  const [percentValue, setPercentValue] = useState(70)

  return (
    <div className="w-full bg-[#F6F7FB] h-[372px] rounded-3xl py-14 px-24">
      <div className="flex items-center gap-12">
        {STEP_LIST?.map((item, index) => {
          const { title } = item
          return (
            <div
              className="gap-2 flex items-center cursor-pointer group "
              key={index}
              onClick={() => {
                setStep(index)
              }}
            >
              <div
                className={`${
                  step === index ? 'border-[#263A7C]' : 'border-grey-2'
                } border w-9 h-9 rounded-full flex items-center justify-center group-hover:border-[#263A7C] transition-all duration-100`}
              >
                <p
                  className={`${
                    step === index ? 'text-[#263A7C] font-bold' : 'text-grey-2 '
                  } text-p14 group-hover:text-[#263A7C] transition-all duration-100`}
                >
                  {index + 1}
                </p>
              </div>
              <p
                className={`${
                  step === index ? 'text-[#263A7C] font-bold' : 'text-grey-2 '
                } text-p14 group-hover:text-[#263A7C] transition-all duration-100`}
              >
                {title}
              </p>
            </div>
          )
        })}
      </div>

      {step === 0 && (
        <div className="mt-10 flex items-start gap-40">
          <div className="flex flex-col items-start gap-7">
            <div>
              <p className="text-gray-400 text-p18 mb-[6px]">
                {percentValue}% Required Tasks Complete
              </p>
              <div className="w-[100px] mb-3">
                <ProgressBarBasic percentValue={percentValue} />
              </div>
              <p className="text-gray-400 text-h3">3/4</p>
            </div>
            <div className="">
              <p className="text-button-2 text-h2">5</p>
              <p className="text-gray-400 text-p18">new assessments</p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-7">
            <div>
              <p className="text-gray-400 text-p18 mb-[6px]">
                {percentValue}% Required Tasks Complete
              </p>
              <div className="w-[100px] mb-3">
                <ProgressBarBasic percentValue={0} />
              </div>
              <p className="text-gray-400 text-h3">0/2</p>
            </div>
            <div className="">
              <p className="text-button-2 text-h2">5</p>
              <p className="text-gray-400 text-p18">new assessments</p>
            </div>
          </div>
        </div>
      )}
      {step === 1 && (
        <div className="mt-10 flex items-stretch gap-40">
          <div className="flex flex-col items-start gap-7">
            <div>
              <p className="text-gray-400 text-p18 mb-[6px]">
                {percentValue}% Required Tasks Complete
              </p>
              <div className="w-[100px] mb-3">
                <ProgressBarBasic percentValue={percentValue} />
              </div>
              <p className="text-gray-400 text-h3">3/4</p>
            </div>
            <div className="">
              <p className="text-button-2 text-h2">2</p>
              <p className="text-gray-400 text-p18">new assessments</p>
            </div>
          </div>
          <div className=" flex flex-col items-start  justify-end gap-7">
            <div className="">
              <p className="text-button-2 text-h2">2</p>
              <p className="text-gray-400 text-p18">new technical courses </p>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="mt-10 flex items-stretch gap-40">
          <div className="flex flex-col items-start gap-56">
            <div className="">
              <p className="text-button-2 text-h2">2</p>
              <p className="text-gray-400 text-p18">new assessments</p>
            </div>
          </div>
          <div className="">
            <div className="">
              <p className="text-button-2 text-h2">2</p>
              <p className="text-gray-400 text-p18">new technical courses </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

DashboardJourney.propTypes = {}
DashboardJourney.defaultProps = {}

export default DashboardJourney
