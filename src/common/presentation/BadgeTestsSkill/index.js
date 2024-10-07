import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'

const BadgeTestsSkill = (props) => {
  const {
    title = 'Google Analytics',
    titlePopup = 'Làm bài kiểm tra năng lực',
    description = '(Bạn đang đạt 10% ở cấp độ trung bình)',
    redirectToExam = () => {},
    isShowTooltip = true,
    hiddenIcon = false,
    disableCursor = false
  } = props

  const testRef = useRef()
  const popUp = useRef()

  const [hover, setHover] = useState(false)

  const testWidth = testRef.current?.offsetWidth
  const popUpWidth = popUp.current?.offsetWidth / 2

  const testHeight = testRef.current?.offsetHeight
  const popUpHeight = popUp.current?.offsetHeight

  return (
    <div className="relative group">
      {isShowTooltip && (
        <div
          ref={popUp}
          className={`absolute -translate-x-[2/4] xl:block hidden -left-1/2 duration-200 min-w-[210px] ${
            hover ? 'opacity-100 z-[10]' : 'opacity-0 -z-[1]'
          }`}
          style={{
            left: -(testWidth / 2 + (popUpWidth - testWidth)) + 'px',
            top: -(testHeight + (popUpHeight - testHeight) + 16) + 'px'
          }}
        >
          <div
            className="speech bottom   relative z-[100]"
            style={{
              filter: ' drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
            }}
          >
            <p className="text-p14 text-neutral text-center w-full">
              {titlePopup}
            </p>
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
        ref={testRef}
        className={`py-[8px] px-[16px] rounded-[12px] flex gap-[8px] border-[1px] items-center border-grey-4 bg-white ${
          disableCursor && ' cursor-pointer'
        }`}
        onClick={redirectToExam}
        onMouseLeave={() => setHover(false)}
        onMouseMove={() => setHover(true)}
      >
        <p className="text-p16 text-black">{title}</p>
        {hiddenIcon && <XProfileIcon name="notes" />}
      </div>
    </div>
  )
}

BadgeTestsSkill.propTypes = {}
BadgeTestsSkill.defaultProps = {}

export default BadgeTestsSkill
