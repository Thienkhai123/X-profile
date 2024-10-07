import XProfileIcon from 'common/presentation/Icons'
import React, { Fragment, useRef, useState } from 'react'

const OptionCustom = (props) => {
  const {
    refOpt,
    selectedItem,
    optionData,
    showOpt,
    startIcon = '',
    setShowOpt = () => {},
    handleSelectJob = () => {}
  } = props

  return (
    <div className="relative" ref={refOpt}>
      <button
        className="bg-light-nude rounded-[8px] xl:min-w-[188px] w-full flex justify-between py-[13px] px-[20px] items-center"
        onClick={() => setShowOpt(!showOpt)}
      >
        {/* {selectedItem.id === 0 ? (
          <Fragment>
            {startIcon && <XProfileIcon name={startIcon} />}
            <p className="text-p18">{optionData[0].name}</p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        ) : (
          <Fragment>
            {startIcon && <XProfileIcon name={startIcon} />}
            <p className="text-p18">{selectedItem.name}</p>
            <XProfileIcon name="arrowDown" />
          </Fragment>
        )} */}
        <Fragment>
          {startIcon && <XProfileIcon name={startIcon} />}
          <p className="sm:text-p16 text-p12 text-grey-2">Chọn để tìm kiếm</p>
          <XProfileIcon name="arrowDown" />
        </Fragment>
      </button>
      {showOpt && (
        <div className="bg-white max-h-[190px] z-50  w-full overflow-x-hidden absolute top-[50px] rounded-[12px]">
          {optionData?.map((el) => (
            <div
              key={el?.id}
              className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px] cursor-pointer"
              onClick={() => handleSelectJob(el)}
            >
              <p className="sm:text-p18 text-p12">{el?.name}</p>
              {selectedItem.findIndex((item) => item.id === el.id) !== -1 && (
                <XProfileIcon name="check" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

OptionCustom.propTypes = {}

export default OptionCustom
