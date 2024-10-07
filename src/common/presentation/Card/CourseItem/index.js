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
import { DiscoveryCard } from '../Discovery'

const CourseItem = (props) => {
  const {
    imageUrl,
    name,
    company,
    basePrice,
    finalPrice,
    totalVideoCount,
    length,
    totalUserCount,
    totalComment,
    isLastIndex,
    shortDescription,
    height,
    id,
    openDiscovery,
    handleOpenDiscovery,
    handleCloseDiscovery,
    itemHovered,
    isCompanyCourse,
    productGuid,
    handleLinkCourse = () => {},
    seoName,
    isUserOwned,
    maxWidth = '270px',
    widthImg = 270,
    heightImg = 135,
    widthHover = '280px',
    leftPosition = '-left-[280px]',
    rightPositon = '-right-[280px]',
    handleFavouriteCourse = () => {},
    handleClickDiscoveryButton,
    isUserLiked,
    hiddenLike = false,
    isComboCourse
  } = props

  return (
    <div className="group" onMouseLeave={handleCloseDiscovery}>
      <div
        onMouseEnter={() => handleOpenDiscovery(id)}
        onClick={() => handleLinkCourse(seoName, isUserOwned)}
        className="rounded-xl border border-grey-4 duration-300  group-hover:shadow-blur24 group-hover:-translate-y-2   flex flex-col relative   h-full bg-white overflow-hidden "
        style={{
          maxWidth: maxWidth
        }}
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
            <div className="absolute right-6 top-0">
              <XProfileIcon name="flagXprofile" />
            </div>
          )}
          {isComboCourse && (
            <div className="absolute left-0 top-6">
              <XProfileIcon name="tagCombo" />
            </div>
          )}
        </div>
        <div className="xl:pt-4 pt-2 xl:px-5 px-3 xl:pb-6 pb-3 flex flex-col gap-2">
          <p className="xl:text-p18-bold text-p14-bold xl:h-[56px] h-[44px] text-neutral line-clamp-2 cursor-pointer">
            {name}
          </p>
          <span className="text-blue-2 first-letter:uppercase xl:text-p16 text-p12 line-clamp-1 cursor-pointer ">
            {company}
          </span>
          <div className="flex items-center gap-1 ">
            {finalPrice <= 0 ? (
              <p className="text-p14-bold lg:text-p16-bold text-semantic-red">
                Miễn Phí
              </p>
            ) : basePrice > 0 && finalPrice <= basePrice ? (
              <Fragment>
                <p className="text-p14-bold lg:text-p16-bold text-button-2">
                  {convertCurrency(finalPrice)}
                </p>
                <p className="xl:text-p14 text-p12 text-grey-1 line-through ">
                  {convertCurrency(basePrice)}
                </p>
                {/* <p className="hidden xl:block text-p12 lg:text-p14 text-semantic-red">
                  {calculateDiscountNoDecimal(finalPrice, basePrice)}
                </p> */}
              </Fragment>
            ) : (
              basePrice >= 0 &&
              finalPrice >= basePrice && (
                <p className="text-p14-bold lg:text-p16-bold text-neutral">
                  {convertCurrency(finalPrice)}
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
      {openDiscovery && id === itemHovered && (
        <div
          className={`absolute top-0 lg:flex hidden w-[280px] items-center transition-all duration-300 z-20 
          ${isLastIndex ? leftPosition : rightPositon}
         `}
          style={{ width: widthHover }}
          onMouseLeave={handleCloseDiscovery}
        >
          {!isLastIndex && (
            <div className="w-6  inline-block overflow-hidden">
              <div className=" h-12 bg-white shadow-grey-4 border border-grey-4 -rotate-45  transform origin-top-right mt-8"></div>
            </div>
          )}

          <DiscoveryCard
            hiddenLike={hiddenLike}
            isUserLiked={isUserLiked}
            handleClickIconHeart={() =>
              handleFavouriteCourse(productGuid, isUserLiked)
            }
            handleClickDiscoveryButton={() =>
              handleLinkCourse(seoName, isUserOwned)
            }
            shortDescription={shortDescription}
            height={height}
            shadowCard="shadow-blur24 "
            isLastIndex={isLastIndex}
            borderCard="border border-grey-4"
          />
          {isLastIndex && (
            <div className="w-6 overflow-hidden inline-block">
              <div className=" h-12  bg-white rotate-45 border border-grey-4 transform origin-top-left mt-8"></div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

CourseItem.propTypes = {}
CourseItem.defaultProps = {
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
  handleOpenDiscovery: () => {},
  handleCloseDiscovery: () => {},
  height: 'h-[370px]',
  isCompanyCourse: false,
  isComboCourse: false
}

export default CourseItem
