import React from 'react'
import PropTypes from 'prop-types'
import AddresCompanyItem from '../AddresCompanyItem'

const FooterAddressCompany = (props) => {
  const { listAddress = [], handleUpdateAddress } = props
  return (
    <>
      {listAddress && listAddress?.length === 0 && (
        <p>Công ty của bạn chưa có địa chỉ</p>
      )}
      <div className="">
        {listAddress?.map((item, idx) => {
          const {
            wardName,
            phone,
            email,
            cityName,
            districtName,
            addressDetail,
            isDefault,
            name,
            addressBookId,
            addressTemporaryId
          } = item
          return (
            <div key={idx} className="mb-6">
              <AddresCompanyItem
                idAddress={addressBookId}
                phoneNumber={phone}
                addressTemporaryId={addressTemporaryId}
                mailCompany={email}
                title={name || `Chi nhánh ${idx + 1}`}
                isHeadQuaters={isDefault}
                address={`${addressDetail}, ${wardName}, ${districtName}, ${cityName} `}
                handleUpdateAddress={handleUpdateAddress}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

FooterAddressCompany.propTypes = {
  listAddress: PropTypes.array
}
FooterAddressCompany.defaultProps = {}

export default FooterAddressCompany
