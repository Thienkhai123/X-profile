import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const AddressFooterItem = (props) => {
  const { phone, email, addressDetail, titleAddress } = props
  return (
    <>
      <div className="flex flex-col gap-4 max-w-[400px]  overflow-hidden">
        <p className="text-p18-bold line-clamp-1 break-words">{titleAddress}</p>
        <div className=" flex gap-2 justify-start items-start">
          <div>
            <XProfileIcon name="mapPoint" />
          </div>
          <p className="text-p16 text-black line-clamp-2">{addressDetail}</p>
        </div>
        <div className="flex justify-between gap-4 items-center truncate">
          {phone && (
            <div className="flex gap-3 justify-center items-center  ">
              <div>
                <XProfileIcon name="telePhone" />
              </div>
              <p>{phone}</p>
            </div>
          )}
          {email && (
            <div className="flex gap-2 truncate  justify-center items-center ">
              <div>
                <XProfileIcon name="letter" fill="black" stroke="black" />
              </div>
              <p className="truncate">{email}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

AddressFooterItem.propTypes = {
  phone: PropTypes.string,
  email: PropTypes.string,
  addressDetail: PropTypes.string,
  titleAddress: PropTypes.string
}
AddressFooterItem.defaultProps = {
  phone: '',
  email: '',
  addressDetail: '',
  titleAddress: ''
}

export default AddressFooterItem
