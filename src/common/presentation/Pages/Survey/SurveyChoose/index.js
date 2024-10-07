import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'

const SurveyChoose = (props) => {
  const { title, description, amountType, titleButton } = props
  return (
    <div className="text-center">
      <div className="xl:w-[754px] w-auto mb-[32px] px-[12px] xl:px-0">
        <p className="xl:text-h1 text-p20-bold">{title}</p>
      </div>
      <div className="px-[16px] xl:px-0">
        <p className="xl:text-p18 text-grey-1 text-p12">{description}</p>
      </div>
      <div className="flex justify-center mt-[44px]">
        <Button
          rounded="sm:rounded-[12px] rounded-[8px]"
          title={titleButton}
          width="sm:min-w-[107px] min-w-[163px]"
          height="h-[52px]"
          padding="py-[12px] px-[]"
          textWeight="sm:text-p18-bold text-p14 font-bold"
          onClick={() => amountType()}
        />
      </div>
    </div>
  )
}

SurveyChoose.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  titleButton: PropTypes.string
}

SurveyChoose.defaultProps = {
  title: '',
  description: '',
  titleButton: ''
}

export default SurveyChoose
