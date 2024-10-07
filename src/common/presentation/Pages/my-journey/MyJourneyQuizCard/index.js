import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { secondsToHms } from 'store/helper/functionHelper'
import Button from 'common/presentation/Button'

const MyJourneyQuizCard = (props) => {
  const {
    title,
    description,
    time = 5400,
    question = 100,
    typeCard = 1,
    surveyName,
    handleSurvey = () => {}
  } = props

  if (typeCard === 1) {
    return (
      <div className="md:p-[32px] p-6 border border-grey-4 rounded-[24px] hover:shadow-blur24 duration-200">
        <div className="flex flex-col gap-[8px] md:pb-6 pb-4 border-b border-grey-3">
          <p
            className="md:text-p18-bold text-p14-bold text-neutral line-clamp-1"
            style={{ wordBreak: 'break-word' }}
          >
            {title}
          </p>
        </div>
        <div className="md:pt-6 pt-4 flex flex-col md:gap-6 gap-4">
          <div className="flex flex-col gap-[8px] ">
            <p
              className="md:text-p18 text-p14 text-neutral line-clamp-1"
              style={{ wordBreak: 'break-word' }}
            >
              {surveyName}
            </p>

            <p
              className="md:text-p16 text-p14 text-grey-1 md:line-clamp-2"
              style={{ wordBreak: 'break-word' }}
            >
              {description}
            </p>
          </div>
          <div className="flex md:flex-row flex-col-reverse flex-1 md:gap-[20px] gap-4">
            <Button
              title="Làm lại trắc nghiệm"
              width="w-full"
              widthDiv="w-full"
              rounded="rounded-[8px]"
              height="md:h-[48px] h-11"
              textWeight="md:text-p18-bold text-p14-bold text-neutral"
              background="bg-grey-4"
              margin="mt-0"
              onClick={() => {
                handleSurvey()
              }}
            />
            <Button
              title="Xem kết quả chi tiết"
              width="w-full"
              widthDiv="w-full"
              rounded="rounded-[8px]"
              height="md:h-[48px] h-11"
              textWeight="md:text-p18-bold text-p14-bold text-neutral"
              background="bg-button"
              margin="mt-0"
              onClick={() => {
                handleSurvey()
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        className="md:p-8 p-6 border border-grey-4 rounded-[24px] cursor-pointer hover:shadow-blur24 duration-200"
        onClick={() => {
          handleSurvey()
        }}
      >
        <div className="flex flex-col gap-[8px] pb-4 border-b border-grey-3">
          <p
            className="md:text-p18-bold text-p14-bold text-neutral line-clamp-1"
            style={{ wordBreak: 'break-word' }}
          >
            {title}
          </p>
          <p
            className="md:text-p18 text-p14 text-neutral md:line-clamp-2"
            style={{ wordBreak: 'break-word' }}
          >
            {description}
          </p>
        </div>
        <div className="flex md:gap-[24px] gap-8 pt-4">
          <div className="flex gap-[8px] items-center">
            <XProfileIcon name="question" />
            <p
              className="md:text-p16 text-p14  text-grey-1 line-clamp-1"
              style={{ wordBreak: 'break-word' }}
            >
              {secondsToHms(time)}
            </p>
          </div>

          <div className="flex gap-[8px] items-center">
            <XProfileIcon name="stopwartchUnderstand" />
            <p
              className="md:text-p16 text-p14 text-grey-1 line-clamp-1"
              style={{ wordBreak: 'break-word' }}
            >
              {question} câu hỏi
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MyJourneyQuizCard

MyJourneyQuizCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  surveyName: PropTypes.string
}
MyJourneyQuizCard.defaultProps = {
  title: 'Trắc nghiệm MBTI - Khám phá tính cách',
  description:
    'Trắc Nghiệm MBTI là bài test tính cách phổ biến nhất để bạn dễ dàng định hướng nghề nghiệp.',
  surveyName: 'Bạn thuộc nhóm tính cách INFP - Người lý tưởng hoá'
}
