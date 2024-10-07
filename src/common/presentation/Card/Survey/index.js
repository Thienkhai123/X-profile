import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { calculateSurveyColor } from 'store/helper/functionHelper'

export const SurveyCard = (props) => {
  const {
    id,
    content,
    role,
    handleChooseAnswer,
    handleClearSurveyFirst,
    listSurvey
  } = props
  const positionId = listSurvey.indexOf(id)
  const [style, setStyle] = useState({
    background: '#ffffff',
    marginBottom: 0,
    marginTop: '22px'
  })
  const [tempId, setTempId] = useState(0)

  const [color, setColor] = useState('#333333')

  const handleMouseEnter = () => {
    if (positionId === -1) {
      setStyle({
        marginBottom: '15px',
        marginTop: 0,
        background: calculateSurveyColor(role, listSurvey.length + 3)
      })
      setColor('#ffffff')
    }
  }
  const handleMouseLeave = () => {
    if (positionId === -1) {
      setStyle({
        background: '#ffffff',
        marginBottom: 0,
        marginTop: '22px'
      })
      setColor('#333333')
    }
  }

  const handleSelect = () => {
    if (positionId === -1) {
      const newList = [...listSurvey, id]
      handleChooseAnswer(newList)
      setStyle({
        marginBottom: 0,
        marginTop: '22px',
        background: calculateSurveyColor(role, listSurvey.length + 3)
      })
      setTempId(listSurvey.length + 1)
      setColor('#ffffff')
    } else {
      handleClearSurveyFirst()
    }
  }

  useEffect(() => {
    if (listSurvey.length === 0) {
      setStyle({
        background: '#ffffff',
        marginBottom: 0,
        marginTop: '22px'
      })
      setColor('#333333')
      setTempId(0)
    }
  }, [listSurvey])

  useEffect(() => {
    if (listSurvey.length > 0) {
      if (positionId !== -1) {
        setStyle({
          marginBottom: 0,
          marginTop: '22px',
          background: calculateSurveyColor(role, positionId + 3)
        })
        setColor('#ffffff')
        setTempId(positionId + 1)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className="rounded-[12px] w-full flex items-center justify-center xl:min-h-[222px] min-h-[157px] transition duration-500 cursor-pointer relative xl:px-[32px] px-[20px]"
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleSelect}
    >
      <p
        className="xl:font-medium text-p12 xl:text-[20px] text-center text-neutral leading-[32px]"
        style={{
          color: color
        }}
      >
        {content}
      </p>
      {tempId !== 0 && (
        <div className="rounded-full flex flex-col items-center justify-center w-[32px] h-[32px] absolute bg-white right-[12px] top-[12px]">
          <p className="text-p18 font-bold text-blue-main">{tempId}</p>
        </div>
      )}
    </div>
  )
}

SurveyCard.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  role: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  handleChooseAnswer: PropTypes.func,
  handleClearSurveyFirst: PropTypes.func,
  listSurvey: PropTypes.array
}

SurveyCard.defaultProps = {
  id: 0,
  content: '',
  role: 0,
  handleChooseAnswer: () => {},
  handleClearSurveyFirst: () => {},
  listSurvey: []
}
