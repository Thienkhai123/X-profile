import React, { useState } from 'react'
import PropTypes from 'prop-types'
import RadioInputItem from '../RadioInputItem'

const PaymentMethod = (props) => {
  const { listPaymentMethod, handleChangePaymentMethod } = props
  const { paymentMomo, paymentVisa, paymentVnpay, paymentDifferent } =
    listPaymentMethod
  return (
    <div className="flex flex-col gap-[24px]">
      {paymentVnpay?.length > 0 && (
        <div className="border border-grey-3 rounded-[16px] bg-white px-6 max-w-[560px] w-full">
          {paymentVnpay?.map((item, idx) => {
            const { content, value, idRadio, imgUrls } = item
            return (
              <div className=" py-6 border-b last:border-none" key={idx}>
                <RadioInputItem
                  content={content}
                  value={value}
                  imgUrls={imgUrls}
                  idRadio={idRadio}
                  handleChangePaymentMethod={handleChangePaymentMethod}
                  isActiveSuggest={true}
                />
              </div>
            )
          })}
        </div>
      )}
      {paymentMomo?.length > 0 && (
        <div className="border border-grey-3 rounded-[16px] bg-white px-6 max-w-[560px] w-full">
          {paymentMomo?.map((item, idx) => {
            const { content, value, idRadio, imgUrls } = item
            return (
              <div className=" py-6 border-b last:border-none" key={idx}>
                <RadioInputItem
                  content={content}
                  value={value}
                  imgUrls={imgUrls}
                  idRadio={idRadio}
                  handleChangePaymentMethod={handleChangePaymentMethod}
                />
              </div>
            )
          })}
        </div>
      )}
      {paymentVisa?.length > 0 && (
        <div className="border border-grey-3 rounded-[16px] bg-white px-6 max-w-[560px] w-full">
          {paymentVisa?.map((item, idx) => {
            const { content, value, idRadio, imgUrls } = item
            return (
              <div className=" py-6 border-b last:border-none" key={idx}>
                <RadioInputItem
                  content={content}
                  value={value}
                  imgUrls={imgUrls}
                  idRadio={idRadio}
                  handleChangePaymentMethod={handleChangePaymentMethod}
                  isVisa={true}
                />
              </div>
            )
          })}
        </div>
      )}
      {paymentDifferent?.length > 0 && (
        <div className="border border-grey-3 rounded-[16px] bg-white px-6 max-w-[560px] w-full">
          {paymentDifferent?.map((item, idx) => {
            const { content, value, idRadio, imgUrls } = item
            return (
              <div className=" py-6 border-b last:border-none" key={idx}>
                <RadioInputItem
                  content={content}
                  value={value}
                  imgUrls={imgUrls}
                  idRadio={idRadio}
                  handleChangePaymentMethod={handleChangePaymentMethod}
                />
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

PaymentMethod.propTypes = {
  listPaymentMethod: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
      value: PropTypes.number,
      idRadio: PropTypes.string,
      imgUrls: PropTypes.string,
      nameField: PropTypes.string
    })
  )
}
PaymentMethod.defaultProps = {
  listPaymentMethod: [
    {
      content: 'Thẻ tín dụng/ Ghi nợ',
      value: 'credit',
      idRadio: 'visaCard',
      imgUrls: '/images/payment-method-visa.png',
      nameField: 'paymentMethod'
    },
    {
      content: 'Paypal',
      value: 'paypal',
      idRadio: 'paypalCard',
      imgUrls: '/images/payment-method-paypal.png',
      nameField: 'paymentMethod'
    }
  ]
}

export default PaymentMethod
