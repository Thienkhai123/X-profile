import PropTypes from 'prop-types'
import { Fragment } from 'react'

const Select = (props) => {
  const {
    children,
    label,
    type,
    name,
    register,
    isRequired,
    errorMessage,
    showLabel
  } = props
  return (
    <Fragment>
      <div
        className="border  rounded-[8px] flex gap-[14px] items-center px-[20px] "
        style={{ borderColor: errorMessage !== '' ? '#DB2E24' : '#999999' }}
      >
        <div className="relative w-full">
          <select
            type={type}
            id={name}
            className="px-2.5 pb-2.5 pt-4 w-full text-p14 text-grey-2 bg-transparent rounded-lg border-1 focus:outline-none focus:ring-0 focus:border-blue-600 peer border-0 outline-none"
            placeholder=" "
            {...register(name)}
          >
            {children}
          </select>
          {showLabel && (
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
          )}
        </div>
      </div>
      <p className="text-semantic-red text-[14px] mt-1">{errorMessage}</p>
    </Fragment>
  )
}

Select.propTypes = {
  children: PropTypes.node,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  register: PropTypes.func,
  errorMessage: PropTypes.string,
  labelColor: PropTypes.bool
}

Select.defaultProps = {
  label: '',
  type: 'text',
  name: '',
  isRequired: true,
  register: () => {},
  errorMessage: '',
  showLabel: false
}

export default Select
