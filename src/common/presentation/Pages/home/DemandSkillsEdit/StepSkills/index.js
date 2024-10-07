import React from 'react'
import PropTypes from 'prop-types'

const StepSkill = (props) => {
  const { enumType, title, selected, onSelected } = props
  return (
    <button
      className={` pt-3 pb-3 pl-4 pr-4 rounded-borderStep ${
        selected ? 'bg-blue-light' : 'bg-white'
      }`}
      onClick={() => onSelected(enumType)}
    >
      <p
        className={`  ${
          selected ? 'text-p16-bold text-white' : 'text-grey-1 text-p16'
        }`}
      >
        {title}
      </p>
    </button>
  )
}

StepSkill.propTypes = {
  enumType: PropTypes.string,
  title: PropTypes.string,
  selected: PropTypes.bool,
  onSelected: PropTypes.func
}
StepSkill.defaultProps = {
  enumType: '0',
  title: 'Kỹ năng chuyên môn',
  selected: false,
  onSelected: () => {}
}

export default StepSkill
