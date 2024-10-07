import React from 'react'
import PropTypes from 'prop-types'

const QuestionHtml = (props) => {
  const { content } = props
  return (
    <div className="sm:pt-5 pt-4 sm:pb-5 pb-4 sm:pl-8 pl-2 pr-8 flex justify-start ">
      <div
        style={{
          wordBreak: 'break-word'
        }}
        className=" bg-light-nude py-[12px] sm:px-5 px-2 rounded-[16px] w-[334px]"
        dangerouslySetInnerHTML={{ __html: content }}
      ></div>
    </div>
  )
}

QuestionHtml.propTypes = {
  content: PropTypes.string
}
QuestionHtml.defaultProps = {
  content: ''
}

export default QuestionHtml
