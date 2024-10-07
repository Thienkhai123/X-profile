import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import {
  calculateDiscountNoDecimal,
  convertCurrency,
  secondsToHms,
  secondsToHmsFormatSimple
} from 'store/helper/functionHelper'
import XProfileIcon from 'common/presentation/Icons'
import { DiscoveryCard } from '../Discovery'

const CourseLovely = (props) => {
  const {
    name,
    company,
    basePrice,
    finalPrice,
    length,
    totalVideoCount,
    totalUser,
    totalComment,
    imageUrl,
    handleCloseDiscovery,
    openDiscovery,
    handleOpenDiscovery,
    id,
    itemHovered,
    height,
    shortDescription,
    seoName,
    isUserOwned,
    handleLinkCourse,
    isUserLiked,
    handleFavouriteCourse,
    productGuid,
    isComboCourse
  } = props
  return (
    <>
      <div
        className="bg-transparent border border-grey-4 rounded-xl group relative  max-w-[1140px] mx-auto"
        onMouseLeave={() => handleCloseDiscovery()}
      >
        <div
          className="flex gap-8 p-8 bg-white rounded-xl "
          onMouseEnter={() => handleOpenDiscovery(id)}
        >
          <div className="relative">
            <Image
              onClick={() => handleLinkCourse(seoName, isUserOwned)}
              src={imageUrl || ''}
              width={520}
              height={250}
              priority
              objectFit="cover"
              className="rounded-xl  cursor-pointer"
              alt="image course"
            />
            {isComboCourse && (
              <div className="absolute left-0 top-6">
                <XProfileIcon name="tagCombo" />
              </div>
            )}
          </div>
          <div className="flex flex-col xl:w-[527px]">
            <p className="text-p28-bold text-neutral line-clamp-2 first-letter:uppercase cursor-pointer">
              {name}
            </p>
            <p className="text-p18 font-[400] text-blue-light first-letter:uppercase line-clamp-1 mt-2 cursor-pointer">
              {company || 'Công ty TNHH X-Profile'}
            </p>
            <div className="flex flex-col lg:flex-row lg:justify-start  lg:items-center gap-4 my-6">
              {finalPrice <= 0 ? (
                <p className="text-p20-bold text-semantic-red">MIỄN PHÍ</p>
              ) : basePrice > 0 && finalPrice <= basePrice ? (
                <>
                  <p className="text-p28-bold text-grey-1 line-through ">
                    {convertCurrency(basePrice)}
                  </p>
                  <p className="text-p20-bold text-semantic-red">
                    {convertCurrency(finalPrice)}
                  </p>
                  {/* <p className="text-p12 lg:text-p28-bold text-semantic-red">
                    {calculateDiscountNoDecimal(finalPrice, basePrice)}
                  </p> */}
                </>
              ) : (
                basePrice >= 0 &&
                finalPrice >= basePrice && (
                  <p className="text-p28-bold  text-neutral">
                    {convertCurrency(finalPrice)}
                  </p>
                )
              )}
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-8 mt-4">
              <div className="flex gap-1 items-center">
                <XProfileIcon name="play" />
                <p className="text-p16 text-grey-1">
                  {totalVideoCount || 0} Videos
                </p>
                <span className="text-p16 text-grey-1">-</span>
                <p className="text-p16 text-grey-1 line-clamp-1">
                  {secondsToHmsFormatSimple(length || 0)}
                </p>
              </div>
              <div className="flex items-center gap-6">
                <div className="flex gap-1">
                  <XProfileIcon name="user" />
                  <p className="text-p16 text-grey-1">
                    {totalUser?.toLocaleString() || 0}
                  </p>
                </div>
                <div className="flex gap-1">
                  <XProfileIcon name="bubbleMess" />
                  <p className="text-p16 text-grey-1">
                    {totalComment?.toLocaleString() || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        {openDiscovery && id === itemHovered && (
          <div
            className={`absolute top-4 right-10 lg:flex hidden w-[527px] items-center transition-all duration-300 z-[100] rounded-none shadow-none`}
            onMouseLeave={handleCloseDiscovery}
          >
            {/* <div className="w-11 overflow-hidden inline-block">
              <div className=" h-16 bg-white -rotate-45 transform origin-top-right mt-[36px]"></div>
            </div> */}
            <DiscoveryCard
              isUserLiked={isUserLiked}
              handleClickIconHeart={() =>
                handleFavouriteCourse(productGuid, isUserLiked)
              }
              handleClickDiscoveryButton={() =>
                handleLinkCourse(seoName, isUserOwned)
              }
              shortDescription={shortDescription}
              height={height}
              shadowCard="shadow-none"
              positionGroupButton="self-end"
              contentButton="Xem chi tiết"
              alignText="text-start"
            />
          </div>
        )}
      </div>
    </>
  )
}

CourseLovely.propTypes = {}
CourseLovely.defaultProps = {
  name: 'Bí quyết xây dựng và duy trì văn hoá doanh nghiệp',
  imageUrl: '/images/Course/Rectangle_5558.png',
  company: 'Công ty TNHH Soundio',
  totalVideoCount: 27,
  length: 3600,
  finalPrice: 800000,
  basePrice: 10000000,
  totalUser: 3000,
  totalComment: 3000,
  shortDescription: '',
  height: 'h-[300px]',
  isUserLiked: false,
  isComboCourse: false
}

export default CourseLovely
