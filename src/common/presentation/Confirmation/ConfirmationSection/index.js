import React from 'react'
import PropTypes, { string } from 'prop-types'
import ListChoiceTypeConfirmation from '../ListChoiceTypeConfirmation'

const ConfirmationSection = (props) => {
  const {
    profileCompany,
    handleClickDenied,
    handleClickAccept,
    dataListTypeConfirmation,
    handleChooseTypeConfirmation,
    currentTypeNameConfirmation
  } = props
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8 xl:py-40">
        <p className="text-p28-bold text-black">
          Xác nhận nhân viên của doanh nghiệp {profileCompany?.name}
        </p>
        <ListChoiceTypeConfirmation
          handleChooseTypeConfirmation={handleChooseTypeConfirmation}
          dataList={dataListTypeConfirmation}
          currentTypeNameConfirmation={currentTypeNameConfirmation}
        />
        <div className="flex gap-2">
          {/* <button
            onClick={handleClickDenied}
            className="py-3 px-8 bg-grey-4 text-p18-bold rounded-lg lg:w-[194px] "
          >
            Từ chối
          </button> */}
          <button
            onClick={handleClickAccept}
            className="py-3 px-8 bg-button text-p18-bold rounded-lg lg:w-[194px]"
          >
            Xác nhận
          </button>
        </div>
      </div>
    </>
  )
}

ConfirmationSection.propTypes = {
  profileCompany: PropTypes.object,
  handleClickDenied: PropTypes.func,
  handleClickAccept: PropTypes.func,
  dataListTypeConfirmation: PropTypes.array,
  handleChooseTypeConfirmation: PropTypes.func,
  currentTypeNameConfirmation: PropTypes.string
}
ConfirmationSection.defaultProps = {
  profileCompany: {},
  handleClickDenied: () => {},
  handleClickAccept: () => {},
  handleChooseTypeConfirmation: () => {},
  currentTypeNameConfirmation: ''
}
export default ConfirmationSection
