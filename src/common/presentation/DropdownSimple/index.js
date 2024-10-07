import React from 'react'
import PropTypes from 'prop-types'

const DropdownSimple = (props) => {
  const { isOpen, sortTypeList } = props
  return (
    <>
      {isOpen && (
        <div className=" border border-stoke  z-20 rounded-[14px] py-6 px-9 bg-white absolute top-full  w-[210px] h-[240px] flex flex-col gap-y-4">
          {sortTypeList?.map((item, ind) => {
            const { value, content } = item
            return (
              <div
                className="cursor-pointer hover:text-blue-light text-grey-1"
                onClick={() => handleTypeSort(item)}
                key={ind}
                value={value}
              >
                {content}
              </div>
            )
          })}
        </div>
      )}
    </>
  )
}

DropdownSimple.propTypes = {
  isOpen: PropTypes.bool,
  sortTypeList: PropTypes.array.isRequired
}
DropdownSimple.defaultProps = {
  isOpen: false,
  sortTypeList: []
}

export default DropdownSimple
