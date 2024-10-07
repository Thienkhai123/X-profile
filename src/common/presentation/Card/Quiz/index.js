import Image from 'next/image'
import PropTypes from 'prop-types'
import { Divider } from 'common/presentation/Divider'
import XProfileIcon from 'common/presentation/Icons'
import { useRef, useState } from 'react'
import { LearnMoreCard } from '../LearnMore'
import { useRouter } from 'next/router'

export const QuizCard = (props) => {
  const { logo, time, title, questions, discovery } = props.quiz
  const { handleDiscover = () => {} } = props || {}
  const router = useRouter()
  const cardRef = useRef(null)
  const [openDiscovery, setOpenDiscovery] = useState(false)
  const handleOpenDiscovery = () => setOpenDiscovery(true)
  const handleCloseDiscovery = () => {
    setOpenDiscovery(false)
  }

  return (
    <div>
      <div
        ref={cardRef}
        className="rounded-[12px] bg-white w-full relative overflow-hidden pt-[32px] sm:px-[20px] px-2 pb-[15px]"
        onMouseEnter={handleOpenDiscovery}
      >
        <div className="flex xl:justify-between justify-center">
          <div className="relative w-[80px] h-[80px]">
            <Image alt="quiz" src={logo} layout="fill" quality={100} />
          </div>
        </div>
        <div className="my-[20px]">
          <p className="font-bold text-black sm:text-[16px] text-p14-bold break-words line-clamp-2">
            {title}
          </p>
        </div>
        <Divider />
        <div className="flex items-center justify-between sm:mt-4 mt-3">
          <div className="flex items-center gap-[4px]">
            <XProfileIcon name="question" />
            <p className="xl:text-[14px] text-[10px] text-grey-1">
              {questions + ' câu'}
            </p>
          </div>
          <div className="flex items-center gap-[4px]">
            <XProfileIcon name="clock" />
            <p className="xl:text-[14px] text-[10px] text-grey-1">
              {time + ' phút'}
            </p>
          </div>
        </div>
      </div>
      {openDiscovery && (
        <div className="absolute top-0 z-10">
          <LearnMoreCard
            discovery={discovery}
            setOpenDiscovery={handleCloseDiscovery}
            cardRef={cardRef}
            handleDiscover={handleDiscover}
          />
        </div>
      )}
    </div>
  )
}

QuizCard.propTypes = {
  quiz: PropTypes.shape({
    logo: PropTypes.string,
    time: PropTypes.number,
    title: PropTypes.string,
    questions: PropTypes.number,
    discovery: PropTypes.string
  })
}

QuizCard.defaultProps = {
  quiz: {
    logo: '',
    time: 0,
    title: '',
    questions: 0,
    discovery: ''
  }
}
