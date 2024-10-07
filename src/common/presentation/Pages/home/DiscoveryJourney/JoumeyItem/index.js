import React from 'react'
import PropTypes from 'prop-types'

const JoumeyItem = (props) => {
  const { element, setValueJoumey, setLearned } = props
  const { title, decription, buttonTitle, classNameJoumey } = element
  return (
    <div className="w-auto">
      <div className="text-center">
        <h4 className="font-semibold text-base  text-black">{title}</h4>
      </div>
      <div className="text-center">
        <p className="text-p14  ml-2 mr-2 mt-1 mb-4 text-grey">{decription}</p>
      </div>
      <div className="text-center ">
        <button
          className="pt-1 pb-1 pl-2 pr-2 rounded hover:bg-zinc-200 bg-zinc-100 font-semibold text-p14 text-black"
          onClick={() => {
            setValueJoumey(classNameJoumey)
            setLearned(true)
          }}
        >
          <p>{buttonTitle}</p>
        </button>
      </div>
    </div>
  )
}

export default JoumeyItem

JoumeyItem.propTypes = {
  element: {
    title: PropTypes.string,
    decription: PropTypes.string,
    buttonTitle: PropTypes.string,
    classNameJoumey: PropTypes.string
  }
}
JoumeyItem.defaultProps = {
  element: {
    classNameJoumey: 'B1',
    title: 'Làm bài test',
    decription:
      'Làm các bài test để khám phá bản thân phù hợp với loại nghề nghiệp',
    buttonTitle: 'Tìm hiểu'
  }
}
