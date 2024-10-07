import React from 'react'

const getColorsByScore = (score) => {
  if (score < 40) {
    return 'bg-pink-main'
  } else if (score < 70) {
    return 'bg-button'
  } else {
    return 'bg-semantic'
  }
}

const SkillRange = (props) => {
  const { value = 0, maxValue = 100 } = props
  const width = Math.round((value * 100) / maxValue)

  return (
    <div className="sm:mt-5 mt-2 w-full h-3 bg-stoke rounded-lg overflow-hidden">
      <div
        style={{ width: `${width}%` }}
        className={` h-3 ${getColorsByScore(value)} rounded-lg`}
      ></div>
    </div>
  )
}

SkillRange.propTypes = {}
SkillRange.defaultProps = {}

export default SkillRange
