import React from 'react'
import PropTypes from 'prop-types'

const QuestionChoose = (props) => {
  const { answer } = props

  return (
    <div>
      <div className="sm:pt-5 pt-4 sm:pb-5 pb-4 pl-8 sm:pr-8 pr-2 flex justify-end">
        <div className="rounded-[16px] bg-blue-main w-[334px]">
          <button className="pt-3 pb-3 pl-4 pr-4 text-start ">
            <p
              className={`xl:text-p16-bold text-p12 text font-normal text-white`}
            >
              {answer}
            </p>
          </button>
        </div>
      </div>
    </div>
  )
}

QuestionChoose.propTypes = {
  answer: PropTypes.string
}

QuestionChoose.defaultProps = {
  answer: ''
}

export default QuestionChoose
