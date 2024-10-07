import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import {
  calculateDiscount,
  calculateDiscountNoDecimal,
  convertCurrency,
  secondsToHms,
  secondsToHmsFormatSimple
} from 'store/helper/functionHelper'
import { Divider } from 'common/presentation/Divider'
import XProfileIcon from 'common/presentation/Icons'

const CourseManySourceItem = (props) => {
  const {
    imageUrl,
    name,
    company,
    basePrice,
    sellingPrice,
    totalVideoCount,
    length,
    totalUserCount,
    totalComment,
    source,
    isCompanyCourse,
    companyImageUrl,
    widthImg = 270,
    heightImg = 135,
    priceUnit,
    handleLinkCourse = () => {}
  } = props
  const convertCurrencyPriceUnit = (value, spacing = true) => {
    const maxval = 100000000
    const million = 1000000
    if (spacing) {
      if (value > maxval) {
        return Math.trunc(value / million)?.toLocaleString() + 'M'
      }
      return value?.toLocaleString() + ` ${priceUnit}`
    } else {
      if (value > maxval) {
        return Math.trunc(value / million)?.toLocaleString() + ' M'
      }
      return value?.toLocaleString() + ` ${priceUnit}`
    }
  }
  if (source !== 'x-profile') {
    return (
      <div className="group h-full">
        <div
          onClick={() => handleLinkCourse()}
          className="max-w-[270px] md:h-[376px] h-full rounded-xl  border border-grey-4 duration-200 transition-all cursor-pointer  group-hover:shadow-blur24 group-hover:-translate-y-2   flex flex-col relative  bg-white overflow-hidden "
        >
          <div className="relative  ">
            <Image
              src={imageUrl || ''}
              alt="Course Image"
              priority
              quality={100}
              width={widthImg}
              height={heightImg}
              objectFit="cover"
              className="rounded-t-xl  cursor-pointer"
            />
          </div>
          <div className="flex flex-col h-full justify-between items-start xl:pt-4 pt-2 xl:px-5 px-3 xl:pb-6 pb-3">
            <div className=" flex flex-col md:gap-2">
              <p className="xl:text-p18-bold text-p14-bold xl:h-[56px] h-[44px] text-neutral line-clamp-2 cursor-pointer">
                {name}
              </p>
              <div className="flex items-center gap-2 ">
                <div className="relative">
                  <Image
                    src={companyImageUrl}
                    width={24}
                    height={24}
                    alt=""
                    quality={100}
                    objectFit="contain"
                  />
                </div>
                <span className="text-blue-2 first-letter:uppercase xl:text-p16 text-p12 line-clamp-1 cursor-pointer ">
                  {company || ''}
                </span>
              </div>
              <div className="flex items-center gap-1 ">
                <p className="text-p14-bold lg:text-p16-bold text-button-2">
                  {convertCurrencyPriceUnit(sellingPrice)}
                </p>
                {/* {sellingPrice <= 0 ? (
                  <p className="text-p14-bold lg:text-p16-bold text-semantic-red"></p>
                ) : basePrice > 0 && sellingPrice <= basePrice ? (
                  <Fragment>
                    <p className="text-p14-bold lg:text-p16-bold text-neutral">
                      {convertCurrencyPriceUnit(sellingPrice)}
                    </p>
                    <p className="xl:text-p14 text-p12 text-grey-1 line-through ">
                      {convertCurrencyPriceUnit(basePrice)}
                    </p>
                    <p className="hidden xl:block text-p12 lg:text-p14 text-semantic-red">
                      {calculateDiscountNoDecimal(sellingPrice, basePrice)}
                    </p>
                  </Fragment>
                ) : (
                  basePrice >= 0 &&
                  sellingPrice >= basePrice && (
                    <p className="text-p14-bold lg:text-p16-bold text-neutral">
                      {convertCurrency(sellingPrice)}
                    </p>
                  )
                )} */}
              </div>
            </div>
            <div>
              <p className="text-grey-1 md:text-p16 text-p12">
                {sellingPrice > 0 ? 'Khoá học' : 'Tài liệu tham khảo'}
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="group">
      <div
        onClick={() => handleLinkCourse()}
        className="rounded-xl max-w-[270px] border border-grey-4 duration-200 transition-all cursor-pointer  group-hover:shadow-blur24 group-hover:-translate-y-2   flex flex-col relative   h-full bg-white overflow-hidden "
      >
        <div className="relative  ">
          <Image
            src={imageUrl || ''}
            alt="Course Image"
            priority
            quality={100}
            width={widthImg}
            height={heightImg}
            objectFit="cover"
            className="rounded-t-xl  cursor-pointer"
          />
          {isCompanyCourse && (
            <Fragment>
              <div className="md:block hidden absolute right-6 top-0">
                <XProfileIcon name="flagXprofile" />
              </div>
              <div className="md:hidden absolute right-3 top-0">
                <XProfileIcon name="flagXprofile" width="38" height="55" />
              </div>
            </Fragment>
          )}
        </div>
        <div className="xl:pt-4 pt-2 xl:px-5 px-3 xl:pb-6 pb-3 flex flex-col gap-2">
          <p className="xl:text-p18-bold text-p14-bold xl:h-[56px] h-[44px] text-neutral line-clamp-2 cursor-pointer">
            {name}
          </p>
          <span className="text-blue-2 first-letter:uppercase xl:text-p16 text-p12 line-clamp-1 cursor-pointer ">
            {company || 'Công ty TNHH X-Profile'}
          </span>
          <div className="flex items-center gap-1 ">
            {sellingPrice <= 0 ? (
              <p className="text-p14-bold lg:text-p16-bold text-semantic-red">
                Miễn Phí
              </p>
            ) : basePrice > 0 && sellingPrice <= basePrice ? (
              <Fragment>
                <p className="text-p14-bold lg:text-p16-bold text-neutral">
                  {convertCurrency(sellingPrice)}
                </p>
                <p className="xl:text-p14 text-p12 text-grey-1 line-through ">
                  {convertCurrency(basePrice)}
                </p>
                <p className="hidden xl:block text-p12 lg:text-p14 text-semantic-red">
                  {calculateDiscountNoDecimal(sellingPrice, basePrice)}
                </p>
              </Fragment>
            ) : (
              basePrice >= 0 &&
              sellingPrice >= basePrice && (
                <p className="text-p14-bold lg:text-p16-bold text-neutral">
                  {convertCurrency(sellingPrice)}
                </p>
              )
            )}
          </div>
          <Divider />
          <div className="flex items-center justify-between overflow-hidden">
            <div className="flex items-center gap-1 ">
              <XProfileIcon name="play2Icon" />
              <p className="xl:text-p16 text-p12 text-grey-1 line-clamp-1">
                {totalVideoCount || 0} Videos
              </p>
              <span className="xl:text-p16 text-p12 text-grey-1">-</span>
              <p className="xl:text-p16 text-p12 text-grey-1 line-clamp-1">
                {secondsToHmsFormatSimple(length || 0)}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <div className="flex items-center gap-1">
              <XProfileIcon name="user2" />
              <p className="xl:text-p16 text-p12 text-grey-1">
                {totalUserCount?.toLocaleString() || 0}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <XProfileIcon name="bubbleMess2" />
              <p className="xl:text-p16 text-p12 text-grey-1">
                {totalComment?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CourseManySourceItem.propTypes = {}
CourseManySourceItem.defaultProps = {
  name: '',
  imageUrl: '',
  company: '',
  totalTime: 0,
  sellingPrice: 0,
  basePrice: 0,
  videoAmount: 0,
  totalSeconds: 0,
  totalUserCount: 0,
  totalComments: 0,
  height: 'h-[370px]',
  isCompanyCourse: false
}

export default CourseManySourceItem
