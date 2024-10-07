import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import QuestionItems from '../QuestionItems'
import QuestionChoose from '../QuestionChoose'
import Typing from '../Typing'
import QuestionHtml from '../QuestionHtml'

const Questions = (props) => {
  const { faqs, title, handleAnswer, isTyping, titleQuestions } = props

  return (
    <div className="w-auto h-[642px] xl:w-[1140px] xl:flex justify-between">
      <div className="block xl:hidden mb-[32px] px-[16px]">
        <p className="xl:text-h2 text-p20-bold text-center">
          Các câu hỏi thường gặp
        </p>
      </div>
      <div className="relative">
        <div className="absolute xl:top-12 xl:left-10 w-full h-auto xl:w-[560px]  sm:h-[588px]  rounded-borderStep bg-white">
          <div className="rounded-t-borderStep bg-blue-main pl-10 sm:h-[80px] sm:py-0 py-2 w-full items-center flex relative">
            <p className="sm:text-h3 text-p16-bold text-white">{title}</p>
            <div className="sm:hidden block absolute -right-2 -top-5">
              <XProfileIcon name="faqMobile" />
            </div>
          </div>
          <div
            id="wrapper-faqs"
            className="h-[508px] bg-white rounded-b-borderStep overflow-y-auto custom-scrollbar"
          >
            {faqs?.map((faq, index) => {
              const { type } = faq
              if (type === 0) {
                const { content, faqAnswers } = faq
                return (
                  <div key={`faq-${index}`}>
                    <QuestionItems
                      questions={faqAnswers}
                      handleChooseAnswer={handleAnswer}
                      content={content}
                    />
                  </div>
                )
              } else if (type === 1) {
                const { content } = faq
                return (
                  <QuestionHtml
                    key={`answer-link-${index}`}
                    content={content}
                  />
                )
              } else {
                const { content } = faq
                return (
                  <QuestionChoose key={`answer-${index}`} answer={content} />
                )
              }
            })}
            {isTyping && <Typing />}
            <div id="faqs-scroll-bottom" />
          </div>
        </div>

        <div className="">
          <XProfileIcon name="groupCircleLeft" />
        </div>
      </div>
      <div className="xl:flex flex-col justify-between pt-[56px] hidden">
        <p className="text-h2 text-center hidden xl:block">
          Các câu hỏi
          <br />
          thường gặp
        </p>
        <div className="flex justify-center">
          <Image
            width={502}
            height={409}
            placeholder="blur"
            blurDataURL="/images/career_path/q&a_career_path.png"
            src="/images/career_path/q&a_career_path.png"
            alt=""
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

Questions.propTypes = {
  faqs: PropTypes.array,
  title: PropTypes.string,
  handleAnswer: PropTypes.func,
  isTyping: PropTypes.bool || null,
  titleQuestions: PropTypes.string
}

Questions.defaultProps = {
  faqRoot: [],
  title: 'Trò chuyện với chúng tôi',
  handleAnswer: () => {},
  isTyping: null,
  titleQuestions: ''
}

export default Questions
