import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import { convertCurrency } from 'store/helper/functionHelper'

const CoursePaymentCard = (props) => {
  const {
    imageUrl = '',
    productName = 'Khoá học CSS cho người mới bắt đầu',
    company = 'X-Profile',
    priceSale = 0,
    price = 200000,
    title = 'Chương trình thực tập',
    description = 'Porttitor suscipit enim gravida tempus ultrices laoreet letius vitae mi curabitur.',
    typeFree = true
  } = props
  return (
    <div className="p-[32px] bg-white rounded-[16px]">
      <div className=" xl:flex gap-[16px] ">
        <div className="relative min-w-[160px] h-[78px] rounded-[12px]">
          <Image
            src={imageUrl}
            alt=""
            quality={100}
            objectFit="cover"
            layout="fill"
            className="rounded-[12px]"
          />
        </div>
        <div className="w-full">
          <p className="text-p16-bold text-black leading-[28px]">
            {productName}
          </p>
          <p className="text-p16 text-button-2 leading-[28px]">{company}</p>
          <div className="flex gap-[16px] items-center mt-[5px]">
            <Fragment>
              {priceSale <= 0 ? (
                <>
                  <p className=" text-p16-bold leading-[28px] text-semantic-red">
                    Miễn phí
                  </p>
                  <p className="text-p16 leading-[28px] text-grey-1 line-through">
                    {convertCurrency(price)}
                  </p>
                </>
              ) : price > 0 && priceSale <= price ? (
                <>
                  <p className="text-p16-bold leading-[28px] text-button-2">
                    {convertCurrency(priceSale)}
                  </p>
                  <p className="text-p16 leading-[28px] text-grey-1 line-through">
                    {convertCurrency(price)}
                  </p>
                </>
              ) : (
                price >= 0 &&
                priceSale >= price && (
                  <p className="text-p14-bold lg:text-p16-bold text-black">
                    {convertCurrency(priceSale)}
                  </p>
                )
              )}
            </Fragment>
          </div>
        </div>
      </div>
      {!typeFree && (
        <>
          <hr className="mt-[21px] mb-[16px]" />
          <div className="flex gap-[16px] ">
            <div className="relative w-[80px] h-[80px]">
              <Image
                src="/images/course/EmptyInter.png"
                alt=""
                quality={100}
                layout="fill"
              />
            </div>
            <div className="max-w-[368px]">
              <p className="text-p16-bold text-black leading-[28px]">{title}</p>
              <p className="text-p16 text-grey-1 leading-[28px]">
                {description}
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

CoursePaymentCard.propTypes = {}

export default CoursePaymentCard
