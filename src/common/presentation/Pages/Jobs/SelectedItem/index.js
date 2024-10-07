import XProfileIcon from 'common/presentation/Icons'
import React, { Fragment, useRef, useState } from 'react'

const SelectedItem = (props) => {
  const {
    name = '',
    id,
    handleRemoveSelectedItem = () => {},
    stroke = '#FFFFFF',
    colorText = 'text-white',
    style = 'bg-blue-light rounded-[20px]'
  } = props

  return (
    <div
      className={`py-[6px] px-3    flex items-center gap-2 justify-between ${style}`}
    >
      <p className={` sm:text-p16 text-p12 ${colorText}`}>{name}</p>
      <div
        className="cursor-pointer"
        onClick={() => handleRemoveSelectedItem(id)}
      >
        <XProfileIcon name="cross" stroke={stroke} size={'0.8'} />
      </div>
    </div>
  )
}

SelectedItem.propTypes = {}

export default SelectedItem
