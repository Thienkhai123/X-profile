import React from 'react'
import XProfileIcon from '../Icons'

const SideMenu = (props) => {
  const { element, handleStep, chooseId, id, numberTitle } = props
  const { title } = element
  return (
    <button
      onClick={() => {
        handleStep(id)
      }}
    >
      <div
        className={`${
          chooseId === id ? '' : 'h-[44px]'
        } w-[86px] flex justify-between`}
      >
        <div className="h-full w-full">
          <div className="flex justify-center items-center">
            <p
              className={`${
                chooseId === id
                  ? 'text-p32-bold text-dark-blue duration-300'
                  : 'text-p20-side-menu-bold text-grey-2 duration-300'
              }  font-bold`}
            >
              {numberTitle}
            </p>
          </div>
          <div
            className={`${
              chooseId === id
                ? 'opacity-100 duration-300 h-auto'
                : 'duration-300 opacity-0 h-0 overflow-hidden'
            } text-center `}
          >
            <p className="text-p14 text-dark-blue ">{title}</p>
          </div>
        </div>
        <div
          className={`${
            chooseId === id
              ? 'opacity-100 transition duration-300'
              : 'transition opacity-0 duration-300'
          } flex items-center`}
        >
          <XProfileIcon name="arrowVector" />
        </div>
      </div>
    </button>
  )
}

SideMenu.propTypes = {}

export default SideMenu
