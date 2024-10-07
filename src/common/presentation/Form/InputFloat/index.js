import XProfileIcon from 'common/presentation/Icons'
import PropTypes from 'prop-types'
import { Fragment } from 'react'

const InputFloat = (props) => {
  const {
    label,
    type,
    name,
    register,
    iconName,
    isRequired,
    errorMessage,
    errorValidateMessage,
    maxLength
  } = props
  return (
    <Fragment>
      <div
        className="border  rounded-[8px] flex gap-[14px] items-center px-[20px]"
        style={{
          borderColor:
            errorMessage || errorValidateMessage ? '#DB2E24' : '#999999'
        }}
      >
        <div className="relative w-full">
          <input
            type={type}
            id={name}
            maxLength={maxLength}
            className="input-autocomplete block px-2.5 pb-2.5 pt-4 w-full text-p14 text-gray-900 bg-transparent rounded-lg border-1 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
            placeholder=" "
            {...register(name)}
          />
          <label
            htmlFor={name}
            className="absolute text-p14 duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
            style={{
              color: errorMessage !== '' ? '#DB2E24' : '#999999'
            }}
          >
            {label}
            {isRequired && <span className="text-semantic-red ml-1">*</span>}
          </label>
        </div>
        {iconName !== '' && <XProfileIcon name={iconName} />}
      </div>
      <p className="text-semantic-red text-[14px] mt-1 h-[21px]">
        {errorMessage || errorValidateMessage}
      </p>
    </Fragment>
  )
}

InputFloat.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  iconName: PropTypes.string,
  register: PropTypes.func,
  errorMessage: PropTypes.string,
  errorValidateMessage: PropTypes.string,
  maxLength: PropTypes.number
}

InputFloat.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  isRequired: true,
  iconName: '',
  register: () => {},
  errorMessage: '',
  errorValidateMessage: '',
  maxLength: 50
}

export default InputFloat
