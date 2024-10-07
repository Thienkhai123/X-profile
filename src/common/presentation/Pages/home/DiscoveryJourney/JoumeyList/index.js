import React, { useState } from 'react'
import JoumeyItem from '../JoumeyItem'
import Image from 'next/image'
import PropTypes from 'prop-types'

const JoumeyList = (props) => {
  const [learned, setLearned] = useState(false)

  const { element, setValueJoumey } = props
  const { numberJoumey, classNameJoumey } = element

  return (
    <div>
      <div className=" mb-2 flex justify-center text-center ">
        <div
          className={`${classNameJoumey} ${
            learned ? '' : 'rounded-full border-2 border-grey'
          } bg-white z-20 w-10 h-10 flex items-center justify-center`}
        >
          {learned ? (
            <Image
              alt=""
              width={40}
              height={40}
              src="/images/Primary fill.png"
            />
          ) : (
            <p className="text-p20 font-semibold text-black">{numberJoumey}</p>
          )}
        </div>
      </div>
      <div className="mt-2">
        <JoumeyItem
          element={element}
          setLearned={setLearned}
          setValueJoumey={setValueJoumey}
        />
      </div>
    </div>
  )
}

export default JoumeyList

JoumeyList.propTypes = {
  element: PropTypes.shape({
    numberJoumey: PropTypes.string,
    classNameJoumey: PropTypes.string
  })
}

JoumeyList.defaultProps = {
  element: {
    numberJoumey: '1',
    classNameJoumey: 'B1'
  }
}
