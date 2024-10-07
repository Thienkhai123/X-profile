import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { useRef } from 'react'
import useOnClickOutside from 'common/hooks/useClickOutSide'
const CourseSortTypeForm = (props) => {
  const {
    sortTypeList = [],
    title = '',
    handleActiveDropdown,
    isOpen,
    handleTypeSort,
    currentType,
    refBtnSort,
    idType
  } = props

  return (
    <>
      <div ref={refBtnSort} className="flex items-center gap-1">
        <div className="relative flex flex-col items-center rounded-lg">
          <button
            onClick={handleActiveDropdown}
            className="w-full pb-2 flex items-center gap-2 text-p16  text-black"
          >
            {title}
            <div className=" flex items-center justify-between border rounded-lg border-grey-3 bg-white px-3 min-w-[244px]">
              <span className="flex-1 text-left text-p18 py-2">
                {currentType}
              </span>
              <XProfileIcon name="arrowDown" stroke="#000" />
            </div>
          </button>
          {isOpen && (
            <div className=" border  border-grey-3 z-20 rounded-lg p-2  bg-white absolute top-full  w-[244px] h-max flex flex-col">
              {sortTypeList.map((item, ind) => {
                const { value, content, id } = item
                return (
                  <div
                    className="cursor-pointer px-2 py-2 hover:bg-light-nude duration-150 rounded-lg text-neutral flex justify-between items-center"
                    onClick={() => handleTypeSort(item)}
                    key={ind}
                    value={value}
                  >
                    <span className="truncate text-p18">{content}</span>
                    <div>
                      {idType === id && (
                        <XProfileIcon name="check" size="1.3" />
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

CourseSortTypeForm.propTypes = {
  sortTypeList: PropTypes.array.isRequired,
  title: PropTypes.string
}
CourseSortTypeForm.defaultProps = {
  sortTypeList: [
    {
      id: 4,
      value: '4',
      content: 'Học nhiều nhất'
    },
    {
      id: 0,
      value: '0',
      content: 'Mới nhất'
    },
    {
      id: 1,
      value: '1',
      content: 'Cũ nhất'
    },
    {
      id: 2,
      value: '2',
      content: 'Giá thấp đến cao'
    },
    {
      id: 3,
      value: '3',
      content: 'Giá cao đến thấp'
    }
  ]
}

export default CourseSortTypeForm
