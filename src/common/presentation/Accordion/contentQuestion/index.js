import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const ContentQuestion = (props) => {
  const { element } = props
  const { content, decription } = element

  const [hidden, setHidden] = useState(false)

  return (
    <label className="group">
      <div className="pb-5 pt-5 border-b">
        <div className="flex items-center justify-between ">
          <div className="mr-[10px]">
            <p className="text-3xl leading-[44px] text-black font-semibold ">
              1
            </p>
          </div>
          <div className="ml-[10px] mr-[12.5px]">
            <p className="text-p14 font-normal text-black ">{content}</p>
          </div>
          <div className="ml-[12.5px]">
            <button onClick={() => setHidden(!hidden)}>
              <div
                className={`${hidden ? 'transition rotate-180' : 'transition'}`}
              >
                <XProfileIcon name="vector3" />
              </div>
            </button>
          </div>
        </div>
        <div
          className={`${
            hidden
              ? 'opacity-100 duration-300 h-auto mt-5'
              : 'opacity-0 h-0 duration-300'
          } `}
        >
          <p className="text-p14 font-normal text-black ">{decription}</p>
        </div>
      </div>
    </label>
  )
}

ContentQuestion.propTypes = {
  element: PropTypes.shape({
    content: PropTypes.string,
    decription: PropTypes.string
  })
}
ContentQuestion.defaultProps = {
  element: {
    content:
      ' How do you communicate a complex concept, process, or  quantitative data? Please take an example you know well, and explain it to me.',
    decription: 'aaaaaaaaaaaaaaa'
  }
}

export default ContentQuestion
