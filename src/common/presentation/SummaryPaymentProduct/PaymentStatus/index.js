import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

const PaymentStatus = (props) => {
  const {
    status,
    handleRedirectPaymentSuccess,
    handleRedirectPaymentFailled,
    handleRedirectPaymentAgain
  } = props
  return (
    <>
      {status ? (
        <div className="flex flex-col justify-center items-center p-[40px] ">
          <Image
            src={'/images/Course/payment_success.png'}
            alt="payment status"
            priority
            width={320}
            height={320}
            objectFit="cover"
          />
          <p className="text-p20-bold text-black text-center mb-[56px] mt-[16px]">
            Thanh toán thành công
          </p>
          <div className="flex flex-col lg:flex-row gap-[16px] justify-center items-stretch w-full ">
            <button
              onClick={handleRedirectPaymentFailled}
              className="py-[13px] px-[20px] border border-button-2 bg-transparent text-p18-bold leading-[30px] text-button-2 rounded-[8px] lg:w-[192px] "
            >
              Trờ về trang chủ
            </button>
            <button
              onClick={handleRedirectPaymentSuccess}
              className="py-[13px] px-[18px] lg:w-[192px] w-full line-clamp-1 bg-button-2 text-p18-bold leading-[30px] text-white rounded-[8px]"
            >
              Khoá học của tôi
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center p-[40px] ">
          <Image
            src={'/images/Course/payment_failed.png'}
            alt="payment status"
            priority
            width={320}
            height={320}
            objectFit="cover"
          />
          <p className="text-p20-bold text-black text-center mb-[56px] mt-[16px]">
            Thanh toán thất bại
          </p>
          <div className="flex flex-col lg:flex-row gap-[16px] justify-center items-stretch w-full ">
            <button
              onClick={handleRedirectPaymentFailled}
              className="py-[13px] px-[20px] border border-button-2 bg-transparent text-p18-bold leading-[30px] text-button-2 rounded-[8px] lg:w-[192px] "
            >
              Trờ về trang chủ
            </button>
            <button
              onClick={handleRedirectPaymentAgain}
              className="py-[13px] px-[30px] lg:w-[192px] w-full line-clamp-1 bg-button-2 text-p18-bold leading-[30px] text-white rounded-[8px]"
            >
              Thanh toán lại
            </button>
          </div>
        </div>
      )}
    </>
  )
}

PaymentStatus.propTypes = {
  status: PropTypes.bool,
  handleRedirectPaymentSuccess: PropTypes.func,
  handleRedirectPaymentFailled: PropTypes.func,
  handleRedirectPaymentAgain: PropTypes.func
}
PaymentStatus.defaultProps = {
  status: true,
  handleRedirectPaymentSuccess: () => {},
  handleRedirectPaymentFailled: () => {},
  handleRedirectPaymentAgain: () => {}
}

export default PaymentStatus
