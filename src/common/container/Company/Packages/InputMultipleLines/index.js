import React from 'react'
import PropTypes from 'prop-types'

const InputMultipleLines = (props) => {
  const {
    errors,
    register,
    name = 'fullName',
    placeholder = 'Chúng tôi có thể giúp bạn điều gì?',
    hidden = false,
    length = 150
  } = props
  return (
    <div className="w-full min-h-[168px] bg-white border border-grey-4 py-[16px] px-[24px]  rounded-[16px]">
      <textarea
        {...register(name)}
        placeholder={placeholder}
        className={`text-p16 text-black placeholder:text-grey-2 bg-white h-full w-full focus:outline-none resize-none`}
        maxLength={length}
      />
      {hidden && (
        <p className="text-p14 text-semantic-red mt-[4px]">{errors}</p>
      )}
    </div>
  )
}

InputMultipleLines.propTypes = {}

export default InputMultipleLines
