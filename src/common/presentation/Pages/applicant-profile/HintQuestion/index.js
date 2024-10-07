import Image from 'next/image'
import PropTypes from 'prop-types'
import { useRef, useState } from 'react'

const HintQuestion = (props) => {
  const { commonQuestions, professionalQuestions } = props
  const ref = useRef(null)
  const [questions, setQuestions] = useState({
    common: commonQuestions.slice(0, 2),
    professional: professionalQuestions.slice(0, 2),
    seeMoreCommonQuestion: false,
    seeMoreProfessionalQuestion: false
  })
  const handleClickSeemoreQuestionCommon = () => {
    setQuestions({
      ...questions,
      common: [...commonQuestions],
      seeMoreCommonQuestion: true
    })
  }
  const handleClickSeemoreQuestionProfessional = () => {
    setQuestions({
      ...questions,
      professional: [...professionalQuestions],
      seeMoreProfessionalQuestion: true
    })
  }
  if (commonQuestions?.length === 0 && professionalQuestions?.length === 0) {
    return <></>
  }
  return (
    <div
      ref={ref}
      className="border border-button rounded-3xl pt-[81px] px-8 pb-8 relative"
    >
      <div className="absolute top-[6px] bg-white  -translate-y-1/2 -translate-x-1/2 left-1/2">
        <Image
          width={150}
          height={100}
          alt="hint-logo"
          src="/images/Portfolio/hint-logo.png"
          quality={100}
        />
      </div>
      <p className="text-h4 text-button text-center">
        Một số gợi ý câu hỏi khi
        <br /> phỏng vấn ứng viên
      </p>
      <div className="py-6">
        <div className="bg-button w-full h-[1px]"></div>
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-h5">Câu hỏi đánh giá kỹ năng chung</p>
        <ul className="list-decimal px-5 flex flex-col gap-4">
          {questions.common.map((question, ind) => (
            <li className="text-p16 leading-[28px]" key={ind}>
              {question}
            </li>
          ))}
        </ul>
        {!questions.seeMoreCommonQuestion && commonQuestions.length > 2 && (
          <div>
            <button
              onClick={handleClickSeemoreQuestionCommon}
              className="hover:text-button-2 text-grey-2 text-p16-bold h-[28px]"
            >
              Xem thêm
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-col gap-4">
        <p className="text-h5">Câu hỏi đánh giá kỹ năng chuyên môn</p>
        <ul className="list-decimal px-5 flex flex-col gap-4">
          {questions.professional.map((question, ind) => (
            <li className="text-p16 leading-[28px]" key={ind}>
              {question}
            </li>
          ))}
        </ul>
        {!questions.seeMoreProfessionalQuestion &&
          professionalQuestions.length > 2 && (
            <div>
              <button
                onClick={handleClickSeemoreQuestionProfessional}
                className="hover:text-button-2 text-grey-2 text-p16-bold h-[28px]"
              >
                Xem thêm
              </button>
            </div>
          )}
      </div>
    </div>
  )
}

HintQuestion.propTypes = {
  commonQuestions: PropTypes.array,
  professionalQuestions: PropTypes.array
}

HintQuestion.defaultProps = {
  commonQuestions: [],
  professionalQuestions: []
}

export default HintQuestion
