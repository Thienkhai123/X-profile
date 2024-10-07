import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from '../Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const DropdownTemplatePositionJob = (props) => {
  const {
    handleActiveDropdown,
    currentJobPosition = '',
    activeDropdown,
    listJobPosition,
    queryJobPositionByName,
    handleChooseJobPosition,
    handleClearJobPosition,
    handleCloseDropdown
  } = props
  const itemRef = useRef(null)

  useOnClickOutside(itemRef, handleCloseDropdown)

  return (
    <>
      <div
        ref={itemRef}
        className="w-full relative flex flex-col items-center "
      >
        <div
          onClick={() => handleActiveDropdown()}
          className=" flex items-center justify-between cursor-pointer border rounded-lg border-grey-3 bg-white py-3 px-6 h-[50px] xl:w-[360px]"
        >
          {!currentJobPosition && (
            <span className="flex-1 text-p18 text-left whitespace-nowrap text-grey-3 ">
              Chọn vị trí công việc (nếu có)
            </span>
          )}
          <p className="flex-1 flex justify-between items-center text-p18 text-left truncate ">
            {currentJobPosition}
            {currentJobPosition && (
              <span
                onClick={(e) => handleClearJobPosition(e)}
                className="w-5 h-5 rounded-full bg-grey-3 p-1 mr-4 hover:opacity-75"
              >
                <XProfileIcon
                  name="cross"
                  stroke="#fff"
                  width="12"
                  height="12"
                />
              </span>
            )}
          </p>
          <XProfileIcon name="arrowDown" stroke="#000" />
        </div>
        <div className="absolute top-full mt-2 z-50 ">
          {activeDropdown && (
            <>
              <div className="z-50 w-full border rounded-lg border-grey-3 bg-white py-3 px-6 h-full xl:w-[360px] max-h-96 overflow-y-scroll custom-scrollbar1">
                <input
                  placeholder="Nhập tên vị trí"
                  className="outline-0 text-p18 mb-2 text-black placeholder:text-grey-3 w-full px-4 py-2 border border-grey-3 rounded-lg "
                  // {...register('city')}
                  onChange={(e) =>
                    queryJobPositionByName(e.target.value.trim())
                  }
                />
                {listJobPosition?.map((job, idx) => {
                  const { name, jobLevelId } = job
                  return (
                    <p
                      onClick={() => handleChooseJobPosition(name, jobLevelId)}
                      key={idx}
                      className="text-p18 cursor-pointer text-black py-2 px-4 hover:bg-light-nude rounded-lg duration-200"
                    >
                      {name}
                    </p>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
      <></>
    </>
  )
}

DropdownTemplatePositionJob.propTypes = {}

export default DropdownTemplatePositionJob
