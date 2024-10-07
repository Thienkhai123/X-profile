import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { Fragment, useEffect, useState } from 'react'

export const LearnMoreCard = (props) => {
  const {
    setOpenDiscovery,
    discovery,
    display,
    cardRef,
    handleDiscover = () => {}
  } = props
  const [cardHeight, setCardHeight] = useState(0)
  const [cardWidth, setCardWidth] = useState(0)

  useEffect(() => {
    if (cardRef?.current) {
      setCardHeight(cardRef?.current?.clientHeight)
      setCardWidth(cardRef?.current?.clientWidth)
    }
  }, [cardRef])
  return (
    <Fragment>
      <div
        className={`sm:flex hidden flex-col justify-center items-center h-[253px] rounded-[12px] px-[20px] overflow-hidden transition-opacity duration-300 ease-in opacity-0 hover:opacity-100 bg-white`}
        onMouseLeave={() => {
          setOpenDiscovery(false)
        }}
      >
        <p className="text-[14px] text-black text-center mb-[20px]">
          {discovery}
        </p>
        <div className="flex justify-center items-center gap-[12px]">
          <button
            className=" rounded-[4px] bg-[#F7BB3A] px-[20px] py-[10px] font-bold text-[14px] hover:opacity-80"
            onClick={() => handleDiscover()}
          >
            Khám phá
          </button>
          {/* <div className="bg-black p-[12px] rounded-[8px] cursor-pointer hover:opacity-80">
            <XProfileIcon name="heart" />
          </div> */}
        </div>
      </div>
      <div
        className={`sm:hidden flex flex-col justify-center items-center rounded-[12px] px-2 overflow-hidden transition-opacity duration-300 ease-in opacity-0 hover:opacity-100 bg-white`}
        style={{
          height: cardHeight,
          width: cardWidth
        }}
        onMouseLeave={() => {
          setOpenDiscovery(false)
        }}
      >
        <p className="text-[12px] text-black text-center mb-[20px]">
          {discovery}
        </p>
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleDiscover()}
            className="rounded-[4px] bg-[#F7BB3A] px-[12px] py-[12px] font-bold text-[12px] hover:opacity-80"
          >
            Khám phá
          </button>
          {/* <div className="bg-black p-[12px] rounded-[8px] cursor-pointer hover:opacity-80">
            <XProfileIcon name="heart" />
          </div> */}
        </div>
      </div>
    </Fragment>
  )
}

LearnMoreCard.propTypes = {
  setOpenDiscovery: PropTypes.func,
  discovery: PropTypes.string,
  display: PropTypes.string
}

LearnMoreCard.defaultProps = {
  discovery: '',
  display: ''
}
