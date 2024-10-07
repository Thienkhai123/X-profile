import React from 'react'
import PropTypes from 'prop-types'

const InputCheckbox = (props) => {
  const {
    register,
    name = 'solution',
    title = 'Giải pháp Quảng bá thương hiệu doanh nghiệp',
    value
  } = props
  return (
    <label className="flex gap-4 items-center ">
      <div className="relative">
        <input
          {...register(name)}
          type="checkbox"
          value={value}
          className='appearance-none block w-6 h-6 hover:cursor-pointer accent-button bg-white border-[1px] checked:bg-[url("/images/checkPackage.png")] checked:bg-center checked:bg-cover checked:bg-button checked:border-button border-grey-3 rounded-[8px]'
        />
      </div>
      <p className="text-p16 leading-7">{title}</p>
    </label>
  )
}

InputCheckbox.propTypes = {}

export default InputCheckbox
