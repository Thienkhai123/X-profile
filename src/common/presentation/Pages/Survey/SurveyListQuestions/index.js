import React from 'react'
import PropTypes from 'prop-types'
import { SurveyCard } from 'common/presentation/Card'
import Button from 'common/presentation/Button'
import SurveyBack from '../SurveyBack'
import Image from 'next/image'

const SurveyListQuests = (props) => {
  const {
    title,
    textDescription,
    typeSurvey,
    SURVEYS,
    unAmountType,
    amountType,
    role,
    handleChooseAnswer,
    handleClearSurveyFirst,
    listSurvey,
    titleButton,
    titleBackButton
  } = props
  return (
    <div className="w-full">
      <div className="flex justify-center">
        <div
          className={`${
            typeSurvey >= 2 ? '' : 'invisible'
          } xl:mb-10 mb-0 xl:w-[1141px] w-full flex justify-start`}
        >
          <SurveyBack
            unAmountType={unAmountType}
            titleBackButton={titleBackButton}
          />
        </div>
      </div>
      <div className="text-center mb-[15px] ">
        <p className="xl:text-h1 text-p20-bold text-neutral">{title}</p>
      </div>
      <div className="text-center mb-[16px]">
        <p className="xl:text-p18 text-p14 text-grey-1">{textDescription}</p>
      </div>
      <div>
        <div className="max-w-[1141px] mx-auto">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 xl:gap-[20px] gap-[16px] place-content-center">
            {SURVEYS?.map((survey) => (
              <SurveyCard
                id={survey?.surveyAnswerId}
                content={survey?.content}
                key={survey?.surveyAnswerId}
                role={role}
                handleChooseAnswer={handleChooseAnswer}
                handleClearSurveyFirst={handleClearSurveyFirst}
                listSurvey={listSurvey}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-[40px] ">
        <Button
          rounded="sm:rounded-[12px] rounded-[8px]"
          textWeight="sm:text-p18-bold text-p14 font-bold"
          title={titleButton}
          width="w-[117px]"
          height="h-auto"
          padding="py-[12px]"
          onClick={() => amountType()}
          disabled={listSurvey.length === 0}
        />
      </div>
    </div>
  )
}

SurveyListQuests.propTypes = {
  title: PropTypes.string,
  textDescription: PropTypes.string,
  typeSurvey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  role: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChooseAnswer: PropTypes.func,
  handleClearSurveyFirst: PropTypes.func,
  listSurvey: PropTypes.array,
  titleButton: PropTypes.string
}

SurveyListQuests.defaultProps = {
  title: '',
  textDescription: '',
  role: 0,
  handleChooseAnswer: () => {},
  handleClearSurveyFirst: () => {},
  listSurvey: [],
  titleButton: ''
}

export default SurveyListQuests
