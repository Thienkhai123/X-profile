import React from 'react'
import PropTypes from 'prop-types'

const SurveyStep = (props) => {
  const { typeSurvey, width, rounded, position, height, length, grid, bg } =
    props

  const settingStepUI = (stepLength) => {
    const result = []
    for (let i = 1; i <= stepLength; i += 1) {
      result.push(
        <div
          key={`step-${i}`}
          className={`${
            typeSurvey > i ? `duration-300 ${bg}` : 'duration-300 bg-grey-3'
          }  ${rounded} w-auto h-full ml-1 mr-1 `}
        ></div>
      )
    }
    return result
  }

  return (
    <div className={`grid ${grid} ${position} ${width} ${height}`}>
      {settingStepUI(length)}
    </div>
  )
}

SurveyStep.propTypes = {
  typeSurvey: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  widthItem: PropTypes.string,
  rounded: PropTypes.string,
  position: PropTypes.string,
  height: PropTypes.string,
  length: PropTypes.number,
  grid: PropTypes.string,
  bg: PropTypes.string
}
SurveyStep.defaultProps = {
  typeSurvey: 0,
  width: '',
  rounded: 'rounded-lg',
  position: '',
  height: 'h-[8px]',
  length: 3,
  grid: 'grid-cols-3',
  bg: 'bg-blue-main'
}

export default SurveyStep
