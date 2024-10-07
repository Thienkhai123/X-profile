import React from 'react'
import PropTypes from 'prop-types'
import { Divider } from 'common/presentation/Divider'
import {
  calculateDiscount,
  calculateDiscountPayment,
  convertCurrency,
  convertCurrencyPayment
} from 'store/helper/functionHelper'

const EstimatePayment = (props) => {
  const {
    total,
    finalPayment,
    totalContent,
    discountContent,
    finalPaymentContent
  } = props
  const percent = calculateDiscountPayment(finalPayment, total)
  return (
    <>
      <div className="w-full">
        <div className="flex justify-between">
          <p className="text-p18">{totalContent}</p>
          <p className="text-p18-bold">{convertCurrencyPayment(total)}</p>
        </div>
        <div className="flex justify-between py-6">
          <p className="text-p18">{discountContent}</p>
          {percent > 0 ? (
            <p className="text-p18-bold text-semantic-red ">- {percent} %</p>
          ) : (
            <p className="text-p18-bold text-black ">-</p>
          )}
        </div>
        <Divider />
        <div className="flex justify-between my-6">
          <p className="text-p18 text-button-2">{finalPaymentContent}</p>
          <p className="text-p18-bold text-button-2">
            {convertCurrencyPayment(finalPayment)}
          </p>
        </div>
      </div>
    </>
  )
}

EstimatePayment.propTypes = {
  total: PropTypes.number,
  finalPayment: PropTypes.number,
  totalContent: PropTypes.string,
  discountContent: PropTypes.string,
  finalPaymentContent: PropTypes.string
}
EstimatePayment.defaultProps = {
  total: 3000000,
  finalPayment: 2700000,
  totalContent: 'Tổng chi phí',
  discountContent: 'Giảm giá',
  finalPaymentContent: 'Cần thanh toán'
}

export default EstimatePayment
