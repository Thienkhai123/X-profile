import React, { Fragment, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'
import Link from 'next/link'
import { Divider } from 'common/presentation/Divider'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useSelector } from 'react-redux'
import { selectMenuEdit } from 'store/app/helperSlice'
import { useRouter } from 'next/router'

const MenuEditOption = (props) => {
  const { handleClickMenuEdit = () => {}, roleId } = props
  const trans = useTrans()
  const { NOTIFICATION } = trans
  const accountRef = useRef(null)
  const menuEdit = useSelector(selectMenuEdit)
  useOnClickOutside(accountRef, handleClickMenuEdit)
  const router = useRouter()
  const { companyId, departmentId, departmentPositionId } = router.query

  return (
    <div
      ref={accountRef}
      className=" absolute animate-fadeIn opacity-0 flex flex-col gap-4 right-10 top-20 z-20    py-5 px-8 transition ease-in-out duration-700 rounded-xl  bg-white drop-shadow-[0_0_20px_rgba(0,0,0,0.15)]"
    >
      {menuEdit &&
        menuEdit.map((el, index) => {
          const { title, action = () => {} } = el
          return (
            <div
              className="cursor-pointer group"
              onClick={() =>
                action({ departmentId, companyId, departmentPositionId })
              }
              key={index}
            >
              <p className="text-p18  text-neutral hover:text-blue-light">
                {title}
              </p>
              <div className="mt-3 group-last:hidden">
                <Divider />
              </div>
            </div>
          )
        })}
    </div>
  )
}

export default MenuEditOption
