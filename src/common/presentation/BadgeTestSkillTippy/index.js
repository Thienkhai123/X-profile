import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import Tippy from '@tippyjs/react'

const BadgeTestSkillTippy = (props) => {
  const {
    title = 'Google Analytics',
    titlePopup = 'Làm bài kiểm tra năng lực',
    description = '(Bạn đang đạt 10% ở cấp độ trung bình)',
    redirectToExam = () => {},
    isShowTooltip = true,
    hiddenIcon = false,
    disableCursor = false,
    classNameButton = 'py-[8px] px-[16px] bg-[#F7E0DB] rounded-[12px] ',
    showIcon = false,
    nameIcon = 'notes',
    iconWidth = '24',
    iconHeight = '24'
  } = props

  const testRef = useRef()
  const popUp = useRef()

  const [hover, setHover] = useState(false)

  const testWidth = testRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  const testHeight = testRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  return (
    <div className="relative ">
      <Tippy
        animation="shift-away"
        duration={100}
        delay={0}
        appendTo={() => document.body}
        placement="top"
        // offset={[0, 8]}
        popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
        content={
          <div>
            {isShowTooltip && (
              <div
                ref={popUp}
                className={`xl:block hidden  duration-200  min-w-[210px] opacity-100 z-[10] shadow-[0_16px_24px_0px_rgba(0,0,0,0.04)]`}
                style={{
                  left: -(testWidth / 2 + (popUpWidth - testWidth)) + 'px',
                  top: -(testHeight + (popUpHeight - testHeight) + 16) + 'px'
                }}
              >
                <div
                  className="speech4 mb-2 bottom   relative z-[100] "
                  // style={{
                  //   filter: ' drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
                  // }}
                >
                  <p className="text-p14 leading-[26px] text-neutral text-center w-full">
                    {titlePopup}
                  </p>
                </div>
              </div>
            )}
            {isShowTooltip && (
              <div
                className={`absolute left-1/2 translate-x-1 bottom-3 xl:block hidden opacity-100 z-[1]`}
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
          </div>
        }
      >
        <div
          ref={testRef}
          className={` ${
            disableCursor && ' cursor-pointer'
          } ${classNameButton}`}
          onClick={redirectToExam}
          onMouseLeave={() => setHover(false)}
          onMouseMove={() => setHover(true)}
        >
          <p className="text-p16 text-black">{title}</p>
          {showIcon && (
            <XProfileIcon
              name={nameIcon}
              width={iconWidth}
              height={iconHeight}
            />
          )}
        </div>
      </Tippy>
    </div>
  )
}

BadgeTestSkillTippy.propTypes = {}
BadgeTestSkillTippy.defaultProps = {}

export default BadgeTestSkillTippy
