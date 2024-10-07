import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

import XProfileIcon from 'common/presentation/Icons'

const EditModeAction = (props) => {
  const {
    editmode,
    menuEdit = [],
    handleShowEditMode = () => {},
    departmentId,
    companyId,
    departmentPositionId
  } = props

  return (
    <div>
      {!editmode && (
        <div className="xl:flex hidden fixed z-[60] right-10 top-24  flex-col gap-4">
          <div
            onClick={() => handleShowEditMode()}
            className="cursor-pointer group w-16 h-16 rounded-lg bg-white drop-shadow-[0px_16px_24px_rgba(0,0,0,0.04)] hover:bg-button transition-all border border-grey-4 flex items-center justify-center"
          >
            <XProfileIcon name="pen" stroke="#000000" />
            <span className="absolute  text-p18 hidden group-hover:flex justify-center items-center right-72 translate-x-full w-48 px-4 py-3 bg-grey-1 rounded-lg text-center text-white before:content-[''] before:absolute before:top-1/2  before:left-[100%] before:rotate-180 before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-grey-1">
              Chỉnh sửa trang
            </span>
          </div>
          {menuEdit?.map((menu, index) => {
            const { icon, action = () => {}, title } = menu || {}
            return (
              <div
                key={index}
                onClick={() =>
                  action({ departmentId, companyId, departmentPositionId })
                }
                className="cursor-pointer group  w-16 h-16 drop-shadow-[0px_16px_24px_rgba(0,0,0,0.04)] rounded-lg bg-white hover:bg-button transition-all border border-grey-4 flex items-center justify-center"
              >
                <XProfileIcon
                  name={icon}
                  stroke="#000000"
                  width="28"
                  height="28"
                />
                <span className="absolute  text-p18 hidden group-hover:flex justify-center items-center right-72 translate-x-full w-48 px-4 py-3 bg-grey-1 rounded-lg text-center text-white before:content-[''] before:absolute before:top-1/2  before:left-[100%] before:rotate-180 before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-grey-1">
                  {title}
                </span>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

EditModeAction.propTypes = {}

export default EditModeAction
