import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

import QuestionItems from 'common/presentation/Pages/Career-Path/QuestionItems'
import QuestionHtml from 'common/presentation/Pages/Career-Path/QuestionHtml'
import QuestionChoose from 'common/presentation/Pages/Career-Path/QuestionChoose'
import Typing from 'common/presentation/Pages/Career-Path/Typing'

const QuestionsEditMode = (props) => {
  const {
    faqs,
    title,
    handleAnswer,
    isTyping,
    titleQuestions,
    editMode,
    toggleModal
  } = props
  return (
    <div className="w-auto h-[642px] xl:w-[1140px] xl:flex justify-between">
      <div className="relative group">
        <div className="absolute  xl:top-12 xl:left-10 w-full h-auto xl:w-[560px]  sm:h-[588px]  rounded-borderStep bg-white">
          <div className="rounded-t-borderStep bg-blue-main pl-10 sm:h-[80px] sm:py-0 py-2 w-full items-center flex relative">
            {editMode && (
              <div
                onClick={() => toggleModal()}
                className="absolute drop-shadow-[0px_16px_24px_rgba(0,0,0,0.04)] opacity-0 group-hover:opacity-100 right-6 -bottom-6 z-50 w-[56px] h-[56px] rounded-full bg-white hover:bg-button flex justify-center items-center cursor-pointer"
              >
                <XProfileIcon name="pen" />
              </div>
            )}
            <p className="sm:text-h3 text-p16-bold text-white">{title} </p>
            <div className="sm:hidden block absolute -right-2 -top-5">
              <XProfileIcon name="faqMobile" />
            </div>
          </div>
          {(faqs?.length === 0 || faqs[0]?.faqAnswers?.length === 0) &&
          editMode ? (
            <div
              onClick={() => toggleModal()}
              className="flex flex-col cursor-pointer justify-center items-center w-full h-[508px]"
            >
              <p className="mb-6 max-w-[280px] text-center text-p18 text-neutral">
                Hãy tạo câu hỏi thường gặp cho công ty của bạn nhé!
              </p>
              <div className="w-[217px] py-3 px-8 flex items-center justify-center gap-2 bg-button rounded-lg">
                <XProfileIcon name="add" width="24" height="24" />
                <p className="text-neutral text-p18-bold">Thêm câu hỏi</p>
              </div>
            </div>
          ) : (
            // <div
            //   id="wrapper-faqs"
            //   className="h-[508px] bg-white rounded-b-borderStep overflow-y-auto relative"
            // >
            //   <div>
            //     <QuestionItems
            //       questions={faqs}
            //       handleChooseAnswer={handleAnswer}
            //       content={titleQuestions}
            //     />
            //   </div>
            //   {isTyping && <Typing />}
            //   <div id="faqs-scroll-bottom" />
            // </div>
            <div
              id="wrapper-faqs"
              className="h-[508px] bg-white rounded-b-borderStep overflow-y-auto relative"
            >
              {faqs?.map((faq, index) => {
                const { type } = faq
                if (type === 0) {
                  const { content = '', faqAnswers = [] } = faq
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
                  const { content = '' } = faq
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
          )}
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

QuestionsEditMode.propTypes = {
  faqs: PropTypes.array,
  title: PropTypes.string,
  handleAnswer: PropTypes.func,
  isTyping: PropTypes.bool || null,
  titleQuestions: PropTypes.string
}

QuestionsEditMode.defaultProps = {
  faqRoot: [],
  title: 'Trò chuyện với chúng tôi',
  handleAnswer: () => {},
  isTyping: null,
  titleQuestions: ''
}

export default QuestionsEditMode
