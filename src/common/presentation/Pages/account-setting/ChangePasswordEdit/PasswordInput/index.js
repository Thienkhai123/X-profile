import XProfileIcon from 'common/presentation/Icons'
import React, { useState } from 'react'

const PasswordInput = (props) => {
  const {
    label = 'Mật khẩu cũ',
    name,
    register,
    errorMessage,
    placeholder = ''
  } = props
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex flex-col ">
      <label className="xl:text-p18 text-p16 text-neutral mb-2">
        {label} <span className="text-semantic-red">*</span>
      </label>
      <div
        className={`w-full border ${
          errorMessage ? 'border-semantic-red' : 'border-grey-3'
        } py-2 px-6 rounded-lg flex`}
      >
        <input
          name={name}
          placeholder={placeholder}
          {...register(name)}
          type={visible ? 'text' : 'password'}
          className="bg-transparent appearance-none placeholder:text-grey-3 w-full focus:outline-none xl:text-p18 text-p16"
        />
        <div className="cursor-pointer" onClick={() => setVisible(!visible)}>
          <XProfileIcon name={visible ? 'eyeOff2' : 'eye2'} />
        </div>
      </div>
      <p className="text-semantic-red text-[14px] mt-1 h-[24px] text-right">
        {errorMessage}
      </p>
    </div>
  )
}

export default PasswordInput
