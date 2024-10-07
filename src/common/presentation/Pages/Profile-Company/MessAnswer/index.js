import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const MessAnswer = (props) => {
  const { titleAnswer } = props
  return (
    <div className=" h-full w-full px-[60px] py-8 ">
      <div className="mb-5">
        <XProfileIcon name="answer" />
      </div>
      <div className=" overflow-auto max-h-[84px]">
        <p className="text-p18 text-grey-1">{titleAnswer}</p>
      </div>
    </div>
  )
}

MessAnswer.propTypes = { titleAnswer: PropTypes.string }
MessAnswer.defaultProps = {
  titleAnswer: ''
}

export default MessAnswer
