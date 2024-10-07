import React from 'react'
import PropTypes from 'prop-types'

const AcceptedSection = (props) => {
  const { profileCompany, handleClickRedirectHomePage } = props
  return (
    <>
      <div className="flex flex-col justify-center items-center gap-8">
        <p className="text-p28-bold text-black">
          Xác nhận thành công! Bạn đã trở thành nhân viên của doanh nghiệp{' '}
          {profileCompany?.name}
        </p>
        <button
          onClick={handleClickRedirectHomePage}
          className="py-3 px-8 bg-button text-p18-bold rounded-lg lg:w-[194px]"
        >
          Trang chủ
        </button>
      </div>
    </>
  )
}

AcceptedSection.propTypes = {}

export default AcceptedSection
