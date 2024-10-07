import React, { useRef, useState } from 'react'
import Image from 'next/image'
import XProfileIcon from '../Icons'

const BadgeSheepSkill = (props) => {
  const {
    persent = 25,
    title = 'SEO Content',
    titlePopup = 'Làm kiểm tra để nâng cao cấp độ !',
    description = '(Bạn đang đạt 10% ở cấp độ cơ bản)',
    redirectToExam = () => {},
    isShowTooltip = true,
    disableCursor = false,
    classNameButton = 'py-[8px] px-[16px] bg-[#F7E0DB] rounded-[12px] ',
    showIcon = false,
    nameIcon = 'notes'
  } = props

  const sheepRef = useRef()
  const popUp = useRef()

  const sheepWidth = sheepRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  const sheepHeight = sheepRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  const dashArray = 24 * Math.PI * 2
  const dashOffset = dashArray - (dashArray * persent) / 100

  const [hover, setHover] = useState(false)

  return (
    <div className="relative group">
      {isShowTooltip && (
        <div
          ref={popUp}
          className={`absolute -translate-x-[2/4] -left-1/2 xl:block hidden  duration-200  min-w-[311px]  ${
            hover ? 'opacity-100 z-[10]' : 'opacity-0 -z-[1]'
          }`}
          style={{
            left: -(sheepWidth / 2 + (popUpWidth - sheepWidth)) + 'px',
            top: -(sheepHeight + (popUpHeight - sheepHeight) + 16) + 'px'
          }}
        >
          <div
            className="speech bottom relative z-[100]  "
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
                className="text-[#E29D98]"
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
              <div className="relative w-[30.4px] h-[22.4px]">
                <Image
                  src="/images/Portfolio/cuu.png"
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
          className={`absolute left-1/2 xl:block hidden duration-200  ml-[2.75px] ${
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
        ref={sheepRef}
        className={` ${disableCursor && ' cursor-pointer'} ${classNameButton}`}
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

BadgeSheepSkill.propTypes = {}
BadgeSheepSkill.defaultProps = {}

export default BadgeSheepSkill
