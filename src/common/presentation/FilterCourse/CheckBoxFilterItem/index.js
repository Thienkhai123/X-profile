import React from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
const CheckBoxFilterItem = (props) => {
  const { nameField, value, content, register, selected = false } = props
  return (
    <>
      <label className="relative text-p18 flex items-center gap-x-3 cursor-pointer ">
        <div className="absolute -left-8 ">
          <input
            type="radio"
            {...register(nameField)}
            value={value}
            checked={selected}
            className="appearance-none  w-6 h-6 peer "
          />
          <div className="absolute top-0 left-0  w-6 h-6 flex items-center justify-center  opacity-0 peer-checked:opacity-100">
            <Image
              src={'/images/bearChecked.svg'}
              width={24}
              height={24}
              alt=""
              quality={100}
            />
          </div>
        </div>
        <span
          className={`first-letter:uppercase ${
            selected ? 'text-button-2' : 'text-black '
          }`}
        >
          {' '}
          {content}
        </span>
      </label>
    </>
  )
}

CheckBoxFilterItem.propTypes = {
  nameField: PropTypes.string,
  value: PropTypes.number,
  register: PropTypes.func
}
CheckBoxFilterItem.defaultProps = {
  nameField: 'Protein Type',
  value: 'Beef'
}

export default CheckBoxFilterItem
