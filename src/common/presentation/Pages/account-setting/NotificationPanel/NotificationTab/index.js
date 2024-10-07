import React, { useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'

const NotificationTab = (props) => {
  const { id, title, handleClickTab = () => {}, tabActive } = props
  const trans = useTrans()
  return (
    <button
      className={`px-6 py-2 ${
        tabActive === id ? 'bg-[#F5F6F7]' : ''
      }  rounded-[20px] transition-all duration-300`}
      onClick={() => handleClickTab(id)}
    >
      <p
        className={`${
          tabActive === id
            ? 'text-button-2 xl:text-p16-bold text-p14-bold'
            : 'text-black xl:text-p16 text-p14'
        } `}
      >
        {title}
      </p>
    </button>
  )
}

export default NotificationTab
