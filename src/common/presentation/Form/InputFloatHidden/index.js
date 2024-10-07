import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { Fragment, useState } from 'react'

const InputFloatHidden = (props) => {
  const { label, name, register, errorMessage } = props
  const [visible, setVisible] = useState(false)
  return (
    <Fragment>
      <div
        className="border rounded-[8px] flex gap-[14px] items-center px-[20px]"
        style={{ borderColor: errorMessage !== '' ? '#DB2E24' : '#999999' }}
      >
        <div className="relative w-full">
          <input
            type={visible ? 'text' : 'password'}
            id={name}
            className="input-autocomplete block px-2.5 pb-2.5 pt-4 w-full text-p14 text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            autoComplete="off"
            {...register(name)}
          />
          <label
            htmlFor={name}
            className="absolute text-p14 text-gray-500 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            style={{ color: errorMessage !== '' ? '#DB2E24' : '#999999' }}
          >
            {label}
            <span className="text-semantic-red ml-1">*</span>
          </label>
        </div>
        <div className="cursor-pointer" onClick={() => setVisible(!visible)}>
          <XProfileIcon name={visible ? 'eyeOff' : 'eye'} stroke="#666666" />
        </div>
      </div>
      <p className="text-semantic-red lg:text-[14px] text-[12px] mt-1 h-[21px]">
        {errorMessage}
      </p>
    </Fragment>
  )
}

InputFloatHidden.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  register: PropTypes.func,
  errorMessage: PropTypes.string
}

InputFloatHidden.defaultProps = {
  label: '',
  name: '',
  register: () => {},
  errorMessage: ''
}

export default InputFloatHidden
