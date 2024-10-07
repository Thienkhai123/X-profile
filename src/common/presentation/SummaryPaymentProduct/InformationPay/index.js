import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import CoursePaymentCard from 'common/presentation/Card/CoursePaymentCard'

const InformationPay = (props) => {
  const { productDetail } = props
  const { productName, company, basePrice, imageUrl, price, priceSale } =
    productDetail
  return (
    <div className="flex flex-col gap-[24px]">
      {/* {dataDemo?.map((e, ind) => {
        return (
          <div key={ind}>
            <CoursePaymentCard />
          </div>
        )
      })} */}
      <CoursePaymentCard
        productName={productName}
        company={company}
        price={price}
        priceSale={priceSale}
        imageUrl={imageUrl}
        // typeFree={priceSale === 0}
      />
    </div>
  )
}

InformationPay.propTypes = {}

export default InformationPay
