import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from '../Icons'

const BadgeMouseSkill = (props) => {
  const {
    persent = 10,
    title = 'Product Design',
    titlePopup = 'Làm kiểm tra để nâng cao cấp độ !',
    description = '(Bạn đang đạt 10% ở cấp độ trung bình)',
    redirectToExam = () => {},
    isShowTooltip = true,
    disableCursor = false,
    classNameButton = 'py-[8px] px-[16px] bg-[#FBECCA] rounded-[12px]',
    showIcon = false,
    nameIcon = 'notes'
  } = props

  const mouseRef = useRef()
  const popUp = useRef()

  const [hover, setHover] = useState(false)

  const mouseWidth = mouseRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  const mouseHeight = mouseRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  const dashArray = 24 * Math.PI * 2
  const dashOffset = dashArray - (dashArray * persent) / 100

  return (
    <div className="relative group">
      {isShowTooltip && (
        <div
          ref={popUp}
          className={`absolute duration-200 -translate-x-[2/4] xl:block hidden -left-1/2   min-w-[311px]  ${
            hover ? 'opacity-100 z-[10]' : 'opacity-0 -z-[1]'
          }`}
          style={{
            left: -(mouseWidth / 2 + (popUpWidth - mouseWidth)) + 'px',
            top: -(mouseHeight + (popUpHeight - mouseHeight) + 16) + 'px'
          }}
        >
          <div
            className="speech bottom  relative z-[100]"
            style={{
              filter: ' drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
            }}
          >
            <p className="text-p14 text-neutral text-center">{titlePopup}</p>
            <p className="text-p14 text-grey-1 text-center">{description}</p>
          </div>
          <div className="absolute w-[64px] h-[64px]  bg-white border border-[#D9D9D9]  rounded-full -top-[40px] translate-x-2/4 left-[50%] -ml-[64px] z-[0]"></div>
          <div className="absolute w-[60px] h-[60px]  bg-white  flex justify-center items-center rounded-full -top-[38px] translate-x-2/4 left-[50%] -ml-[60px] z-[100]">
            <svg className="transform -rotate-90 w-20 h-20">
              <circle
                className="text-[#E6E6E6]"
                strokeWidth="2"
                stroke="currentColor"
                fill="transparent"
                r="24"
                cx="30"
                cy="40"
              />
              <circle
                className="text-[#F6BB3A]"
                strokeWidth="2"
                strokeDasharray={dashArray}
                strokeDashoffset={dashOffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="24"
                cx="30"
                cy="40"
              />
            </svg>
            <div className="absolute">
              <div className="relative w-[26.93px] h-[30.4px]">
                <Image
                  src="/images/Portfolio/chuot.png"
                  layout="fill"
                  alt=""
                  quality={100}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      {isShowTooltip && (
        <div
          className={`absolute left-1/2 xl:block hidden duration-200 ml-[2.75px] ${
            hover ? 'opacity-100 z-[1]' : 'opacity-0 -z-[1]'
          }`}
          style={{
            top: '-20px'
          }}
        >
          <div className="rotate-90 absolute">
            <div className="absolute z-[100]">
              <div className=" bg-white shadow-grey-4 border-[0.5px] w-[14px] border-grey-4 rotate-45  transform origin-top-right"></div>
            </div>
            <div className="absolute">
              <div className=" bg-white shadow-grey-4 border-[0.5px] w-[14px] border-grey-4 -rotate-45  transform origin-top-right"></div>
            </div>
          </div>
        </div>
      )}
      <div
        ref={mouseRef}
        className={` ${disableCursor && ' cursor-pointer'} ${classNameButton} `}
        onClick={redirectToExam}
        onMouseLeave={() => setHover(false)}
        onMouseMove={() => setHover(true)}
      >
        <p className="text-p16 text-black">{title}</p>
        {showIcon && <XProfileIcon name={nameIcon} />}
      </div>
    </div>
  )
}

BadgeMouseSkill.propTypes = {}
BadgeMouseSkill.defaultProps = {}

export default BadgeMouseSkill
