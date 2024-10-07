import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const Input = (props) => {
  const {
    errors,
    register,
    name = 'fullName',
    placeholder = 'Họ và tên*',
    type = 'text',
    onInput = () => {},
    onWheel = () => {},
    max = 999,
    min = 1
  } = props
  return (
    <Fragment>
      {type === 'number' ? (
        <div className="w-full">
          <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            onInput={onInput}
            onWheel={onWheel}
            max={max}
            min={min}
            className={`text-p16 text-black placeholder:text-grey-2 py-[14px] px-6 bg-light-blue rounded-[16px] w-full focus:outline-none ${
              errors && 'border border-semantic-red'
            }`}
          />
          <p className="text-p14 text-semantic-red mt-[4px]">{errors}</p>
        </div>
      ) : (
        <div className="w-full">
          <input
            {...register(name)}
            type={type}
            placeholder={placeholder}
            onInput={onInput}
            onWheel={onWheel}
            className={`text-p16 text-black placeholder:text-grey-2 py-[14px] px-6 bg-light-blue rounded-[16px] w-full focus:outline-none ${
              errors && 'border border-semantic-red'
            }`}
          />
          <p className="text-p14 text-semantic-red mt-[4px]">{errors}</p>
        </div>
      )}
    </Fragment>
  )
}

Input.propTypes = {}

export default Input
