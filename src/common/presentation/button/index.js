import React from 'react'
import PropTypes from 'prop-types'

const Button = (props) => {
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
    widthDiv = 'w-auto',
    type,
    btnRef = null,
    hover = 'hover:opacity-80',
    disableBackground = 'disabled:bg-grey-2',
    disableColor = 'text-white',
    border = ''
  } = props
  return (
    <div className={widthDiv}>
      <button
        ref={btnRef}
        className={`flex gap-[8px] items-center justify-center ${border} ${margin} ${rounded} ${width} ${height} ${background} ${disableBackground} ${padding}  ${hover}`}
        onClick={onClick}
        disabled={disabled}
        type={type}
      >
        <p className={`${textWeight} ${disabled ? disableColor : color}`}>
          {title}
        </p>
      </button>
    </div>
  )
}

Button.propTypes = {
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
  type: PropTypes.string
}

Button.defaultProps = {
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
  type: 'submit'
}

export default Button
