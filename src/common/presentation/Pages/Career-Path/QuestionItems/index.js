import React from 'react'
import PropTypes from 'prop-types'

const QuestionItems = (props) => {
  const { handleChooseAnswer, questions, content } = props
  return (
    <div>
      <div className="sm:pt-5 pt-4 sm:pb-5 pb-2 sm:pl-8 pl-2 pr-8 flex justify-start ">
        <div className={`rounded-borderStep border border-solid  w-[334px]`}>
          <div className=" bg-nude pt-3 pb-3 px-5 rounded-t-borderStep ">
            <p className="sm:text-p18 text-p14 text-neutral ">{content}</p>
          </div>
          {questions?.map((question) => {
            const { content, faqAnswerId } = question
            return (
              <button
                key={faqAnswerId}
                className="pt-3 pb-3 sm:px-5 px-2 border-b text-start w-full"
                onClick={() => {
                  handleChooseAnswer(content, faqAnswerId)
                }}
              >
                <p
                  className={`sm:text-p16 text-p12 text-button-2   font-normal `}
                >
                  {content}
                </p>
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

QuestionItems.propTypes = {
  questions: PropTypes.array,
  content: PropTypes.string,
  handleChooseAnswer: PropTypes.func
}
QuestionItems.defaultProps = {
  questions: [],
  content: '',
  handleChooseAnswer: () => {}
}

export default QuestionItems
