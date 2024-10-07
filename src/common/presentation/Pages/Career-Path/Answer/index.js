import React from 'react'
import PropTypes from 'prop-types'

const Answer = (props) => {
  const { questionsChoose, children } = props
  const { answer } = questionsChoose

  return (
    <div>
      <div className="pt-5 pb-5 pl-8 pr-8 flex justify-start">
        <div className="rounded-borderStep bg-nude w-[334px]">
          <button className="pt-3 pb-3 pl-5  text-start ">
            <p className={`text-p16-bold text-neutral font-normal`}>{answer}</p>
          </button>
        </div>
      </div>
      {children}
    </div>
  )
}

Answer.propTypes = {}

export default Answer
