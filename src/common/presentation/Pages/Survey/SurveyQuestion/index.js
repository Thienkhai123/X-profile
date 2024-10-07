import React from 'react'
import SurveyChoose from '../SurveyChoose'

const SurveyQuestion = (props) => {
  const { SETTING, amountType } = props
  const { title, description, titleButton } = SETTING
  return (
    <div className="flex flex-col h-full justify-center relative pb-[120px]">
      <div className="mx-auto z-[2]">
        <SurveyChoose
          amountType={amountType}
          title={title}
          description={description}
          titleButton={titleButton}
        />
      </div>
    </div>
  )
}

SurveyQuestion.propTypes = {}

export default SurveyQuestion
