import React, { useEffect, useRef, useState } from 'react'

import { useDispatch } from 'react-redux'

import XProfileIcon from 'common/presentation/Icons'

const SocialLink = (props) => {
  const {
    title = 'social',
    icon = 'socialFacebook',
    name,
    register,
    value,
    reset = () => {},
    setValue = () => {},
    watch = () => {}
  } = props

  const dispatch = useDispatch()

  return (
    <div className="flex xl:flex-row flex-col xl:gap-12 gap-2 xl:items-center mb-6">
      <div className="xl:w-1/3 flex xl:gap-4 gap-2 items-center ">
        <div className="flex items-center justify-center xl:w-11 xl:h-11 w-10 h-10 rounded-full border border-grey-4">
          <XProfileIcon name={icon} fill="#000000" />
        </div>
        <label className="xl:text-p18 text-p16 text-neutral">{title}</label>
      </div>
      <div className="w-full relative">
        <input
          type="text"
          {...register(`${name}`)}
          defaultValue={value || ''}
          placeholder="https://"
          className="border border-grey-3 peer rounded-lg py-2 px-6 w-full xl:text-p18 text-p16 placeholder:text-grey-3"
        />
        {watch(`${name}`)?.length !== 0 && (
          <div
            className="absolute right-2 top-2 cursor-pointer"
            onClick={() => setValue(`${name}`, '')}
          >
            <XProfileIcon name="closeCircle" />
          </div>
        )}
      </div>
    </div>
  )
}

export default SocialLink
