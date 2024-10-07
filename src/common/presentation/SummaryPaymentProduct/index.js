import React from 'react'
import PropTypes from 'prop-types'
import ProductCartItem from './ProductCartItem'
import Promotion from './Promotion'
import EstimatePayment from './EstimatePayment'
import HeadTitle from '../HeadTitle'
import PaymentMethod from './PaymentMethod'

const SummaryPaymentProduct = (props) => {
  const {
    handlePaymentCourse,
    productDetail,
    estimateInformation,
    courseFree,
    handleChangePaymentMethod,
    listPaymentMethod
  } = props
  const { productName, company, basePrice, imageUrl } = productDetail
  const { total, finalPayment } = estimateInformation
  return (
    <>
      <div className="p-[32px] flex flex-col gap-[24px] bg-white rounded-[16px]">
        {!courseFree && (
          <>
            <p className="text-p18 text-black ">Phương thức thanh toán</p>
            <PaymentMethod
              handleChangePaymentMethod={handleChangePaymentMethod}
              listPaymentMethod={listPaymentMethod}
            />
          </>
        )}
        <p className="text-p18 text-black ">Thông tin đặt hàng</p>
        <Promotion />
        <div>
          <EstimatePayment total={total} finalPayment={finalPayment} />
          <button
            onClick={handlePaymentCourse}
            className="py-3 px-8 bg-button text-p18-bold rounded-lg w-full mt-[80px]"
          >
            Hoàn tất thanh toán
          </button>
        </div>
        <div>
          <p className="text-p16 text-grey-1">
            Bằng việc hoàn tất giao dịch mua, bạn đồng ý với
            <a href="#" className="text-semantic-text-link">
              {' '}
              Điều khoản dịch vụ{' '}
            </a>
            này.
          </p>
        </div>
      </div>
    </>
  )
}

SummaryPaymentProduct.propTypes = {
  handlePaymentCourse: PropTypes.func
}
SummaryPaymentProduct.defaultProps = {
  handlePaymentCourse: () => {}
}

export default SummaryPaymentProduct
