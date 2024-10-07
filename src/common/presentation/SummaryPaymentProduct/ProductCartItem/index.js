import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { convertCurrency } from 'store/helper/functionHelper'

const ProductCartItem = (props) => {
  const { productName, company, basePrice, imageUrl } = props
  return (
    <div className="flex gap-4">
      <div className="max-w-[138px] max-h-[80px] lg:w-[138px] relative">
        <Image
          src={imageUrl || ''}
          objectFit="cover"
          layout="fill"
          alt="Product in cart"
          priority
          className="rounded-xl"
        />
      </div>
      <div className="max-w-[268px]">
        <p className="text-p16-bold text-black line-clamp-1  first-letter:uppercase">
          {productName}
        </p>
        <p className="text-p16-line text-button-2 line-clamp-1 first-letter:uppercase">
          {company}
        </p>
        <p className="text-p16-bold text-semantic-red line-clamp-1 ">
          {basePrice > 0 ? convertCurrency(basePrice) : 'Miễn phí'}
        </p>
      </div>
    </div>
  )
}

ProductCartItem.propTypes = {
  productName: PropTypes.string,
  company: PropTypes.string,
  basePrice: PropTypes.number,
  imageUrl: PropTypes.string
}
ProductCartItem.defaultProps = {
  productName: 'Cẩm nang từ A-Z Photoshop..',
  company: 'Công ty TNHH Soundio',
  basePrice: 1500000,
  imageUrl: '/images/Course/Rectangle_5558.png'
}

export default ProductCartItem
