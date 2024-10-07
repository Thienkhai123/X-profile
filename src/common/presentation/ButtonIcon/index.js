import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import Tippy from '@tippyjs/react'
import tippy, { roundArrow } from 'tippy.js'
import 'tippy.js/dist/svg-arrow.css'
const ButtonIcon = (props) => {
  const {
    margin,
    title,
    disabled,
    background,
    color,
    width,
    height,
    onClick,
    rounded,
    padding,
    textWeight,
    type,
    btnRef = null,
    iconName,
    iconStroke,
    iconFill,
    iconWidth,
    iconHeight,
    gap,
    hover,
    border,
    tooltipButton = false,
    widthDiv
  } = props
  const arrow = () => {
    return (
      <div className="rotate-90  border-8 border-y-transparent border-l-transparent border-r-grey-1"></div>
    )
  }
  if (tooltipButton) {
    return (
      <div className="relative">
        <Tippy
          animation="shift-away"
          duration={100}
          delay={0}
          appendTo={() => document.body}
          placement="bottom"
          arrow={roundArrow}
          // offset={[0, 8]}
          // popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
          content={
            <div className="text-p18 flex justify-center items-center -bottom-[72px] z-50  w-48 px-4 py-3 bg-grey-1 rounded-lg text-center text-white ">
              {title}
            </div>
          }
        >
          <div className={widthDiv}>
            <button
              ref={btnRef}
              className={`flex relative group items-center ${gap} ${border} justify-center ${margin} ${rounded} ${width} ${height} ${background} ${padding} disabled:bg-grey-2 ${hover}`}
              onClick={onClick}
              disabled={disabled}
              type={type}
            >
              {iconName && (
                <XProfileIcon
                  name={iconName}
                  stroke={iconStroke}
                  fill={iconFill}
                  width={`${iconWidth}`}
                  height={`${iconHeight}`}
                />
              )}
            </button>
          </div>
        </Tippy>
      </div>
    )
  }
  return (
    <div className={widthDiv}>
      <button
        ref={btnRef}
        className={`flex items-center ${gap} ${border} justify-center ${margin} ${rounded} ${width} ${height} ${background} ${padding} disabled:bg-grey-2 ${hover}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        {iconName && (
          <XProfileIcon
            name={iconName}
            stroke={iconStroke}
            fill={iconFill}
            width={`${iconWidth}`}
            height={`${iconHeight}`}
          />
        )}
        <p className={`${textWeight} ${disabled ? 'text-white' : color}`}>
          {title}
        </p>
      </button>
    </div>
  )
}

ButtonIcon.propTypes = {
  margin: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  background: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  rounded: PropTypes.string,
  padding: PropTypes.string,
  textWeight: PropTypes.string,
  type: PropTypes.string,
  gap: PropTypes.string,
  iconWidth: PropTypes.number,
  iconHeight: PropTypes.number,
  hover: PropTypes.string
}

ButtonIcon.defaultProps = {
  margin: 'mt-[6px]',
  title: '',
  onClick: () => {},
  disabled: false,
  background: 'bg-button',
  color: 'text-neutral',
  width: 'w-[80px]',
  height: 'h-[40px]',
  rounded: 'rounded-[12px]',
  padding: '',
  textWeight: 'text-p18-bold',
  type: 'submit',
  iconName: '',
  iconStroke: '#000000',
  gap: 'gap-2',
  iconWidth: 24,
  iconHeight: 24,
  hover: 'hover:opacity-80',
  widthDiv: 'relative'
}

export default ButtonIcon
