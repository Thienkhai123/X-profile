import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import {
  calculateDiscount,
  convertCurrency,
  secondsToHms,
  secondsToHmsFormatSimple
} from 'store/helper/functionHelper'

const CourseIntroCard = (props) => {
  const {
    company,
    imageUrl,
    finalPrice,
    name,
    basePrice,
    length,
    totalVideoCount,
    course,
    id,
    shortDescription,
    totalUser,
    totalComment,
    onClick = () => {}
  } = props
  return (
    <>
      <div className=" w-full flex gap-x-4 " onClick={onClick}>
        <Image
          src={imageUrl || ''}
          objectFit="cover"
          width={240}
          height={118}
          priority
          alt={'Image course'}
          className="rounded-xl"
        />
        <div className="flex flex-col max-w-[450px] w-full">
          <p className="text-p18-bold first-letter:uppercase text-neutral line-clamp-1">
            {name}
          </p>
          <p className="text-p16 text-grey-1 line-clamp-2 py-1 min-h-[56px]">
            {shortDescription}
          </p>
          <div className="flex flex-col lg:items-center lg:flex-row justify-between">
            <span className="text-button-2 first-letter:uppercase text-p16 line-clamp-1">
              {company}
            </span>
            <div className="flex lg:justify-center items-center gap-2">
              {finalPrice <= 0 ? (
                <p className="text-p14-bold lg:text-p20-bold text-semantic-red">
                  Miễn Phí
                </p>
              ) : basePrice > 0 && finalPrice <= basePrice ? (
                <>
                  <p className="text-p18-bold text-grey-1 line-through ">
                    {convertCurrency(basePrice)}
                  </p>
                  <p className="text-p14-bold lg:text-p18-bold text-semantic-red">
                    {convertCurrency(finalPrice)}
                  </p>
                  {/* <p className="text-p12 lg:text-p14 text-semantic-red">
                    {calculateDiscount(finalPrice, basePrice)}
                  </p> */}
                </>
              ) : (
                basePrice >= 0 &&
                finalPrice >= basePrice && (
                  <p className="text-p14-bold lg:text-p18-bold text-neutral">
                    {convertCurrency(finalPrice)}
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-4">
        <div className="flex gap-2 items-center">
          <XProfileIcon name="play" />
          <p className="text-p16 text-grey-1">{totalVideoCount || 0} Videos</p>
          <span className="text-p16 text-grey-1">-</span>
          <p className="text-p16 text-grey-1 line-clamp-1">
            {secondsToHmsFormatSimple(length || 0)}
          </p>
        </div>
        <div className="flex items-center gap-4">
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
    </>
  )
}

CourseIntroCard.propTypes = {
  company: PropTypes.string,
  imageUrl: PropTypes.string,
  finalPrice: PropTypes.number,
  basePrice: PropTypes.number,
  name: PropTypes.string,
  length: PropTypes.number,
  totalVideoCount: PropTypes.number,
  shortDescription: PropTypes.string
}
CourseIntroCard.defaultProps = {
  id: '1',
  name: 'Cẩm nang từ A-Z Photoshop cho Designer',
  imageUrl: '/images/Course/Rectangle_5558.png',
  shortDescription:
    'Giúp bạn nhanh chóng làm chủ phần mềm PTS, cung cấp nền tảng kiến thức cơ bản,...',
  company: 'Công ty TNHH Soundio',
  totalVideoCount: 27,
  length: 3600,
  finalPrice: 80000,
  basePrice: 100000,
  totalComment: 3000,
  totalUser: 3000,
  discount: true
}

export default CourseIntroCard
