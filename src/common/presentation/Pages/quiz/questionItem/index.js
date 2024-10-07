import React from 'react'
import PropTypes from 'prop-types'
import { useCountdown } from 'common/hooks/useCountdown'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const QuestionItem = (props) => {
  const {
    questionNumber,
    questionTitle,
    answers,
    handleChooseAnswer = () => {},
    result,
    type,
    detail,
    position,
    questionIndex,
    exQuestionId,
    showNextArrow,
    classNextArrow,
    mediaLink,
    activeSlideChildIndex,
    handleToggleModal = () => {}
  } = props

  const letter = ['A', 'B', 'C', 'D']
  return (
    <div className=" xl:mt-0 mt-10  flex flex-col xl:max-w-[1104px]  mx-auto justify-center items-center  text-center">
      <div className="mb-2">
        <p className="text-h4 text-black">{position}</p>
      </div>
      <p className="text-p20 text-neutral max-w-[900px] text-center select-none">
        {questionTitle}
      </p>
      {detail && detail?.length > 0 && (
        <p className="text-p18 text-neutral text-left whitespace-pre-wrap select-none">
          {detail}
        </p>
      )}
      {mediaLink?.length > 0 && (
        <div
          key={mediaLink}
          className={`w-full grid ${
            mediaLink?.length < 2 ? 'grid-cols-1' : 'grid-cols-2'
          }`}
        >
          {mediaLink?.map((imageUrl, index) => {
            return (
              <div
                key={index}
                onClick={() => handleToggleModal(imageUrl)}
                className="relative w-full h-[300px] flex items-center justify-center"
              >
                <Image
                  src={imageUrl}
                  layout="fill"
                  alt=""
                  objectFit="contain"
                />
              </div>
            )
          })}
        </div>
      )}
      <div className="relative w-full grid xl:grid-cols-2 grid-cols-1 gap-8 px-4 xl:py-10 xl:px-0">
        {showNextArrow && (
          <div
            className={`${classNextArrow} absolute -right-40  top-1/2 -translate-y-1/2 `}
          >
            <div className="w-12 h-12 rotate-180 flex items-center justify-center rounded-full hover:bg-grey-4 cursor-pointer">
              <XProfileIcon name="arrowLeft" />
            </div>
          </div>
        )}
        {answers?.map((answer, index) => {
          const { exAnswerId, content, questionId, imageUrl } = answer || {}
          const data = {
            questionId: exQuestionId,
            answerId: exAnswerId,
            index: questionIndex
          }
          if (content) {
            return (
              <div key={index}>
                {type !== 2 ? (
                  <div
                    onClick={() => handleChooseAnswer(data)}
                    className={`xl:w-[540px] w-full bg-white hover:shadow-[0_8px_16px_0px_rgba(0,0,0,0.04)]  rounded-2xl py-10 px-8 flex ${
                      content?.length < 120 ? ' items-center' : 'items-start'
                    }  justify-between cursor-pointer transition-all  border-2 border-grey-4 ${
                      result[exQuestionId]?.exAnswerId === exAnswerId &&
                      'border-button'
                    }`}
                  >
                    {type === 1 && (
                      <div className="relative w-16 h-16">
                        <Image
                          src={imageUrl}
                          layout="fill"
                          alt=""
                          objectFit="cover"
                        />
                      </div>
                    )}
                    <div
                      style={{
                        wordBreak: 'break-word'
                      }}
                      className={`xl:max-w-[420px] max-w-[250px] h-[72px] flex ${
                        content?.length < 150 ? ' items-center' : 'items-start'
                      } overflow-y-hidden`}
                    >
                      <p className="text-p16 text-neutral">{content}</p>
                    </div>
                    <div
                      className={`w-[40px] h-[40px] rounded-full transition-all text-p20-bold text-grey-1 ${
                        result[exQuestionId]?.exAnswerId === exAnswerId
                          ? 'bg-[#FBECCA]'
                          : 'bg-grey-4'
                      }  flex items-center justify-center`}
                    >
                      {result[exQuestionId]?.exAnswerId === exAnswerId ? (
                        <div className="w-[30px] h-[30px] bg-button rounded-full flex justify-center items-center">
                          <XProfileIcon
                            name="quizCheck"
                            fill="#fff"
                            width="16"
                            height="16"
                          />
                        </div>
                      ) : (
                        letter[index]
                      )}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => handleChooseAnswer(data)}
                    className={`w-[557px] relative bg-white rounded-lg flex flex-col items-start justify-between cursor-pointer transition-all  border-2 border-transparent ${
                      result[exQuestionId]?.exAnswerId === exAnswerId &&
                      'border-button'
                    }`}
                  >
                    <div className="relative w-full h-52 ">
                      <Image
                        src={imageUrl}
                        layout="fill"
                        alt=""
                        objectFit="cover"
                        className="rounded-t-lg"
                      />
                    </div>

                    <div
                      style={{
                        wordBreak: 'break-word'
                      }}
                      className={`max-w-[450px] h-[72px] flex ${
                        content?.length < 150 ? ' items-center' : 'items-start'
                      } overflow-y-hidden`}
                    >
                      <p className="text-p16 text-neutral p-4"></p>
                    </div>
                    <div
                      className={`w-[40px] h-[40px] absolute top-3 right-3 rounded-full ${
                        result[exQuestionId]?.exAnswerId === exAnswerId
                          ? 'bg-[#FBECCA]'
                          : 'bg-grey-4'
                      }  flex items-center justify-center`}
                    >
                      {result[exQuestionId]?.exAnswerId === exAnswerId ? (
                        <div className="w-[30px] h-[30px] bg-button rounded-full flex justify-center items-center">
                          <XProfileIcon
                            name="quizCheck"
                            fill="#fff"
                            width="16"
                            height="16"
                          />
                        </div>
                      ) : (
                        letter[index]
                      )}
                    </div>
                  </div>
                )}
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

QuestionItem.propTypes = {}
QuestionItem.defaultProps = {}

export default QuestionItem
