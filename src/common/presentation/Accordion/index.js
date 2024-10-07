import React, { useState } from 'react'
import PropTypes from 'prop-types'
import ContentQuestion from './contentQuestion'

const Accordion = (props) => {
  const { DEMO_QUESTION, title } = props

  return (
    <div className="">
      <div className="text-center flex justify-center">
        <p className="text-[32px] text-black font-bold leading-[44px] mb-5">
          {title}
        </p>
      </div>
      <div className="flex justify-center mt-5 ">
        <div className="w-[752px] pl-10 pr-10 pt-3 pb-10 rounded-xl bg-white">
          {DEMO_QUESTION.map((element, index) => {
            return (
              <div key={index}>
                <ContentQuestion element={element} />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

Accordion.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  decription: PropTypes.string
}

Accordion.defaultProps = {
  title: 'Các câu hỏi thường gặp',
  content:
    ' How do you communicate a complex concept, process, or  quantitative data? Please take an example you know well, and explain it to me.',
  decription: 'aaaaaaaaaaaaaaa'
}

export default Accordion
