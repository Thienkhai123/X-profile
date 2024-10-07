import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { delay } from 'store/helper/functionHelper'

const AddresCompanyItem = (props) => {
  const {
    isHeadQuaters,
    title,
    phoneNumber,
    mailCompany,
    address,
    handleUpdateAddress,
    idAddress,
    addressTemporaryId = 0
  } = props
  return (
    <div className="p-6 border rounded-2xl border-grey-4 flex gap-2 items-start justify-between ">
      <div className="flex gap-4">
        <div>
          <XProfileIcon name="mapPoint" fill="#000" />
        </div>
        <div className="flex flex-col gap-1 max-w-[400px] relative group overflow-hidden">
          <div className="text-p18-bold text-black flex gap-x-3 flex-wrap">
            <p className="break-words line-clamp-1"> {title}</p>
            <span className="text-semantic-green font-bold  ">
              {isHeadQuaters && '(Địa chỉ chính)'}
            </span>
          </div>
          <p className="text-p16 text-grey-1 line-clamp-2 break-words">
            {address}
          </p>
          <p className="text-p16 text-grey-1 line-clamp-1">{phoneNumber}</p>
          <p className="text-p16 text-grey-1 truncate"> {mailCompany}</p>
          <span
            className={`${
              mailCompany?.length > 40 && 'group-hover:opacity-100'
            }   opacity-0  transition-opacity bg-gray-800 text-sm text-gray-100 rounded-md absolute  
              bottom-0  sm:py-2 px-4`}
          >
            {mailCompany}
          </span>
        </div>
      </div>
      <button
        onClick={() => handleUpdateAddress(idAddress, addressTemporaryId)}
        className="text-button-2 text-p16-bold whitespace-nowrap xl:w-[80px]  "
      >
        Chỉnh sửa
      </button>
    </div>
  )
}

AddresCompanyItem.propTypes = {
  isHeadQuaters: PropTypes.bool,
  title: PropTypes.string,
  phoneNumber: PropTypes.string,
  mailCompany: PropTypes.string,
  address: PropTypes.string,
  handleUpdateAddress: PropTypes.func,
  idAddress: PropTypes.number
}
AddresCompanyItem.defaultProps = {
  isHeadQuaters: false,
  title: '',
  idAddress: 0,
  phoneNumber: '',
  mailCompany: '',
  address: '',
  handleUpdateAddress: () => {}
}

export default AddresCompanyItem
