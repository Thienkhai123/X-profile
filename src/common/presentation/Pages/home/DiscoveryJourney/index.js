import React, { useState } from 'react'
import PropTypes from 'prop-types'
import dynamic from 'next/dynamic'
import JoumeyList from './JoumeyList'

const LineTo = dynamic(() => import('react-lineto'), {
  ssr: false
})

const DiscoveryJoumey = (props) => {
  const { SETTING_JOUMEY } = props
  const { title, joumeys } = SETTING_JOUMEY

  const [hidden, setHidden] = useState(true)
  const [valueJoumey, setValueJoumey] = useState('')

  return (
    <div className="w-[1140px] h-[318px] rounded-xl ">
      <div className="flex justify-between pt-5 pb-5 pl-8 pr-8 border-b border-2 rounded-t-xl border-spacing-0.5 border-neutral-200 ">
        <div>
          <h4 className="font-semibold text-p20 text-black">{title}</h4>
        </div>
        <div>
          <button
            className="font-semibold text-p14 text-black"
            onClick={() => {
              setHidden(!hidden)
            }}
          >
            [icon]
          </button>
        </div>
      </div>
      <div
        className={`pt-5 pb-5 pl-8 pr-8 border-t border-2 rounded-b-xl border-spacing-0.5 border-neutral-200 grid-rows-5 ${
          hidden ? 'flex justify-between ' : 'hidden '
        }`}
      >
        {joumeys?.map((element, index) => {
          return (
            <div key={index} className="mt-8">
              <JoumeyList element={element} setValueJoumey={setValueJoumey} />
            </div>
          )
        })}
      </div>

      <LineTo
        borderColor="#020A46"
        borderWidth="2.5px"
        from="B1"
        to={valueJoumey}
      />
    </div>
  )
}

export default DiscoveryJoumey

DiscoveryJoumey.propTypes = {
  SETTING_JOUMEY: PropTypes.shape({
    title: PropTypes.string,
    joumeys: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        numberJoumey: PropTypes.string,
        classNameJoumey: PropTypes.string,
        title: PropTypes.string,
        decription: PropTypes.string,
        buttonTitle: PropTypes.string
      })
    )
  })
}
DiscoveryJoumey.defaultProps = {
  SETTING_JOUMEY: {
    title: 'Hành trình khám phá sự nghiệm cho Cừu Tân Binh',
    joumeys: [
      {
        id: 1,
        numberJoumey: '1',
        classNameJoumey: 'B1',
        title: 'Làm bài test',
        decription:
          'Làm các bài test để khám phá bản thân phù hợp với loại nghề nghiệp',
        buttonTitle: 'Tìm hiểu'
      }
    ]
  }
}
