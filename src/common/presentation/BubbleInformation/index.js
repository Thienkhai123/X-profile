import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import { DiscoveryCard } from '../Card'

const BubbleInformation = (props) => {
  const {
    openDiscovery,
    handleCloseDiscovery,
    shortDescription,
    isLastIndex,
    id,
    itemRef,
    itemHovered
  } = props
  return (
    <>
      {openDiscovery && (
        <div className="flex" onMouseLeave={() => handleCloseDiscovery()}>
          <div
            className={`lg:flex hidden z-20 w-[300px] items-center transition-all duration-300 ${
              id === itemHovered ? 'opacity-100' : 'opacity-0 h-0 w-0'
            }
          ${isLastIndex ? '-ml-[480px]' : ' '}
     `}
            ref={itemRef}
          >
            {!isLastIndex && (
              <div className="w-11 overflow-hidden h-full flex flex-col justify-center">
                <div className=" h-16 bg-white -rotate-45 transform origin-top-right mt-[36px] shadow-lg"></div>
              </div>
            )}
            <DiscoveryCard
              shortDescription={shortDescription}
              height={'h-[370px]'}
            />
            {isLastIndex && (
              <div className="w-11 overflow-hidden inline-block">
                <div className=" h-16  bg-white rotate-45 transform origin-top-left mt-[36px] shadow-lg"></div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

BubbleInformation.propTypes = {}
BubbleInformation.defaultProps = {
  handleCloseDiscovery: () => {}
}

export default BubbleInformation
