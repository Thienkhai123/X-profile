import React from 'react'
import PropTypes from 'prop-types'
import { useCountdown } from 'common/hooks/useCountdown'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const QuestionItemLanding = (props) => {
  const {
    questionNumber,
    questionTitle,
    answers,
    handleChooseAnswer = () => {},
    result,
    type,
    isChoosing = false,
    position,
    questionIndex,
    exQuestionId
  } = props

  return (
    <div className=" pb-10 flex flex-col xl:max-w-[1182px] xl:px-0 px-6  mx-auto justify-center items-center xl:gap-16 gap-4 text-center">
      <p className="xl:text-[28px] xl:leading-[48px] text-[18px] leading-7 font-light text-neutral">
        {questionTitle}
      </p>
      <div className="w-full grid xl:grid-cols-2 grid-cols-1 xl:gap-10 gap-4 ">
        {answers?.map((answer, index) => {
          const { exAnswerId, content, questionId, imageUrl } = answer || {}
          const data = {
            questionId: exQuestionId,
            answerId: exAnswerId,
            index: questionIndex
          }
          return (
            <div
              className={`relative   w-full group ${
                result[exQuestionId] && 'pointer-events-none'
              }`}
              key={index}
            >
              <div
                className={`w-full h-full absolute bg-black left-0 top-0 rounded-2xl transition-all duration-300 -z-10 xl:group-hover:left-2 xl:group-hover:top-2  ${
                  result[exQuestionId]?.exAnswerId === exAnswerId &&
                  'left-2 top-2'
                }`}
              ></div>
              <div
                onClick={() => {
                  if (isChoosing) {
                    handleChooseAnswer(data)
                  }
                }}
                className={` bg-white xl:h-[184px] h-[110px]  xl:group-hover:bg-button rounded-2xl xl:p-8 p-4  z-10   cursor-pointer transition-all  border-[0.5px] border-black/50 ${
                  result[exQuestionId]?.exAnswerId === exAnswerId && 'bg-button'
                }`}
              >
                <div
                  style={{
                    wordBreak: 'break-word'
                  }}
                  className={` text-start  `}
                >
                  <p className="xl:text-[20px] xl:leading-10 leading-6 text-p14 font-light text-neutral">
                    {content}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

QuestionItemLanding.propTypes = {}
QuestionItemLanding.defaultProps = {}

export default QuestionItemLanding
