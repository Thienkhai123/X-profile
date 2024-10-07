import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import { convertCurrency } from 'store/helper/functionHelper'
import InformationCourse from 'common/presentation/InformationCourse'

const BannerCourse = (props) => {
  const {
    description,
    title,
    price,
    priceSale,
    intructorName,
    userAcceptCourse,
    userAcceptList,
    productDemo,
    certificate,
    titleBreadCrumbs,
    imageUrl,
    isUserOwned,
    seoName,
    productGuid,
    isUserLiked,
    handlePaymentCourse = () => {},
    handleFavouriteCourse = () => {},
    author = 'X-Profile',
    level
  } = props
  return (
    <div>
      <div className="xl:flex gap-[24px] ">
        <div className="w-[360px] h-[175.28px] relative rounded-borderStep">
          <Image
            src={imageUrl || '/images/Chuot_Banner_v2.webp'}
            alt=""
            objectFit="cover"
            layout="fill"
            className="rounded-borderStep"
          />
        </div>
        <div className="xl:w-[528px] w-auto">
          <div className="flex flex-col gap-[8px] w-full ">
            <p className="sm:text-h4 text-p16-bold text-black">{title}</p>
            <p className="sm:text-p16 text-p12 text-black leading-[28px]">
              {description}
            </p>
            <p className="sm:text-p16 text-p12 text-grey-1 leading-[28px]">
              Khóa học bởi{' '}
              <span className="sm:text-p16 text-p12 text-button-2 leading-[28px]">
                {author}
              </span>
            </p>
            <div className="flex gap-[16px] items-center">
              <Fragment>
                {priceSale <= 0 ? (
                  <>
                    <p className="sm:text-h4 text-p18-bold text-semantic-red">
                      Miễn phí
                    </p>
                  </>
                ) : price > 0 && priceSale <= price ? (
                  <>
                    <p className="sm:text-h4 text-p18-bold text-button-2">
                      {convertCurrency(priceSale)}
                    </p>
                    <p className="sm:text-p18 leading-[30px] text-p16 text-grey-1 line-through">
                      {convertCurrency(price)}
                    </p>
                  </>
                ) : (
                  price >= 0 &&
                  priceSale >= price && (
                    <p className="text-p14-bold leading-[26px] lg:text-p18-bold text-black">
                      {convertCurrency(priceSale)}
                    </p>
                  )
                )}
              </Fragment>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

BannerCourse.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  intructorName: PropTypes.string,
  resultCourse: PropTypes.any,
  userAcceptCourse: PropTypes.any,
  userAcceptList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      position: PropTypes.number
    })
  )
}
BannerCourse.defaultProps = {
  description:
    'Efficitur leo euismod massa arcu platea odio dolor posuere suspendisse. Torquent ornare lectus ut facilisis integer leo ',
  title: 'Lập trình CSS cho mọi người',
  price: 200000,
  priceSale: 150000,
  intructorName: '',
  certificate: '',
  productDemo: '',
  userAcceptCourse: 0
}

export default BannerCourse
