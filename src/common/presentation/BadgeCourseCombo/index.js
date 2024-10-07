import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import { secondsToHmsFormatSimple } from 'store/helper/functionHelper'

const BadgeCourseCombo = (props) => {
  const {
    isBought,
    handleOpenModal = () => {},
    videoNumber,
    title,
    time
  } = props
  const courseRef = useRef()
  const popUp = useRef()

  const courseHeight = courseRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  return (
    <div className="relative group">
      {isBought && (
        <div className="flex justify-center ">
          <div
            className="absolute group-hover:opacity-100 group-hover:z-[10] duration-200 opacity-0 -z-[1]"
            ref={popUp}
            style={{
              top: -(courseHeight + (popUpHeight - courseHeight) + 16) + 'px'
            }}
          >
            <div className="speechProductGuid bottomProductGuid  ">
              <p className="text-p18 leading-[30px] text-white text-center">
                Giá combo đã được giảm vì bạn đã mua khoá học này{' '}
              </p>
            </div>
          </div>
        </div>
      )}

      <div
        className=" flex justify-between"
        ref={courseRef}
        onClick={() => {
          handleOpenModal()
        }}
      >
        <div
          className={`${
            isBought ? 'bg-light-nude' : 'bg-portfolio-empty'
          } cursor-pointer flex justify-between  w-[440px] px-[40px] h-[96px] py-[18px] rounded-[24px] border border-transparent duration-200 group-hover:shadow-blur16 group-hover:border-grey-5`}
        >
          <div>
            <p
              className="  text-p18-bold leading-[30px] text-black mb-[2px] duration-200 group-hover:text-button-2 line-clamp-1"
              style={{ wordBreak: 'break-word' }}
            >
              {title}
            </p>
            <div className="flex gap-[4px] items-center">
              <XProfileIcon name="play2Icon" />
              <p className="xl:text-p16 leading-[28px] text-p12 text-grey-1">
                {videoNumber} videos
              </p>
              <span className="xl:text-p16 leading-[28px] text-p12 text-grey-1">
                -
              </span>
              <p className="xl:text-p16 leading-[28px] text-p12 text-grey-1">
                {secondsToHmsFormatSimple(time)}
              </p>
            </div>
          </div>
          {isBought && (
            <div className="rounded-full bg-white my-auto h-[46px] w-[46px] flex justify-center items-center">
              <XProfileIcon name="checkCouse" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

BadgeCourseCombo.propTypes = {}

export default BadgeCourseCombo
