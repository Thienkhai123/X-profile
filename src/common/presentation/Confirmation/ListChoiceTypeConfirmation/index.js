import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const ListChoiceTypeConfirmation = (props) => {
  const {
    dataList,
    handleChooseTypeConfirmation,
    currentTypeNameConfirmation
  } = props
  const refOpt = useRef()
  const [showOpt, setShowOpt] = useState(false)

  const handleCloseOpt = () => {
    setShowOpt(false)
  }
  useOnClickOutside(refOpt, handleCloseOpt)
  return (
    <>
      <div className="relative" ref={refOpt}>
        <button
          className="bg-white rounded-[8px] sm:w-[560px] w-full flex justify-between py-[14px] px-[24px] items-center"
          onClick={() => setShowOpt(!showOpt)}
        >
          <>
            <p className="xl:text-p18 text-p14 line-clamp-1">
              {currentTypeNameConfirmation}
            </p>
            <XProfileIcon name="arrowDown" />
          </>
        </button>
        {showOpt && (
          <div className="custom-scrollbar  bg-white max-h-[190px] w-full overflow-x-hidden absolute top-[64px] rounded-[12px]">
            {dataList?.map((item, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center px-[24px] cursor-pointer hover:bg-stoke py-[10px]"
                onClick={() => {
                  handleChooseTypeConfirmation(item)
                  setShowOpt(false)
                }}
              >
                <p className="line-clamp-1">{item?.name}</p>
                {currentTypeNameConfirmation === item?.name && (
                  <XProfileIcon name="check" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}

ListChoiceTypeConfirmation.propTypes = {
  dataList: PropTypes.array,
  handleChooseTypeConfirmation: PropTypes.func,
  currentTypeNameConfirmation: PropTypes.string
}
ListChoiceTypeConfirmation.defaultProps = {
  dataList: [],
  handleChooseTypeConfirmation: () => {},
  currentTypeNameConfirmation: 'Xác nhận thử việc'
}

export default ListChoiceTypeConfirmation
