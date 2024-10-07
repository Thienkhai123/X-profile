import Image from 'next/image'
import PropTypes from 'prop-types'
import { Divider } from 'common/presentation/Divider'
import XProfileIcon from 'common/presentation/Icons'
import {
  calculateDiscount,
  convertCurrency,
  secondsToHms
} from 'store/helper/functionHelper'
import { Fragment, useState } from 'react'
import { DiscoveryCard } from '../Discovery'

export const CourseCard = (props) => {
  const {
    company,
    imageUrl,
    sellingPrice,
    name,
    basePrice,
    length,
    totalVideoCount,
    course,
    shortDescription
  } = props.course
  const { likeAmount } = course || {}
  const { isLastIndex, isCompanyCourse, height } = props
  const { name: companyName } = company || {}
  const [openDiscovery, setOpenDiscovery] = useState(false)
  const handleOpenDiscovery = () => setOpenDiscovery(true)
  const handleCloseDiscovery = () => setOpenDiscovery(false)
  return (
    <div className="relative group" onMouseLeave={handleCloseDiscovery}>
      <div
        className="rounded-[12px] h-full bg-white w-full relative overflow-hidden"
        onMouseEnter={handleOpenDiscovery}
      >
        <div className="w-full h-[180px] relative transition-brightness duration-300 group-hover:brightness-75">
          <Image
            alt="course"
            src={imageUrl}
            layout="fill"
            priority
            objectFit="cover"
          />
        </div>

        <div className="p-[20px] flex flex-col justify-between">
          <p className="text-p18-bold mb-[8px] truncate">{name}</p>
          <div className="flex items-center gap-[4px] mb-[10px]">
            <p className="text-p16 text-blue-2">{companyName || ''}</p>
          </div>
          {!isCompanyCourse && (
            <div className="flex items-center gap-[12px] mb-[14px]">
              {sellingPrice === 0 && (
                <p className="text-p18-bold text-semantic-green">Miễn phí</p>
              )}
              {sellingPrice > 0 && sellingPrice >= basePrice ? (
                <p className="text-p18-bold text-neutral">
                  {convertCurrency(sellingPrice)}
                </p>
              ) : (
                <Fragment>
                  <p className="text-p18-bold text-neutral">
                    {convertCurrency(sellingPrice)}
                  </p>
                  <p className="text-p12 text-grey-1 line-through	">
                    {convertCurrency(basePrice)}
                  </p>
                  <p className="text-p14 text-semantic-red">
                    {calculateDiscount(sellingPrice, basePrice)}
                  </p>
                </Fragment>
              )}
            </div>
          )}
          <Divider />
          <div className="flex items-center justify-between mt-[15px]">
            <div className="flex items-center gap-[5px]">
              <XProfileIcon name="play" />
              <p className="text-p16 text-grey-1">
                {totalVideoCount || 0} video
              </p>
              <span className="text-p16 text-grey-1">-</span>
              <p className="text-p16 text-grey-1">
                {secondsToHms(length || 0)}
              </p>
            </div>
            <div className="flex items-center gap-[5px]">
              <XProfileIcon name="user" />
              <p className="text-p16 text-grey-1">
                {likeAmount?.toLocaleString() || 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`absolute top-0 lg:flex hidden w-[366px] items-center transition-all duration-300 ${
          openDiscovery ? 'opacity-100 z-10' : 'opacity-0 -z-10'
        } ${isLastIndex ? '-left-[366px]' : '-right-[366px]'}`}
        onMouseLeave={handleCloseDiscovery}
      >
        {!isLastIndex && (
          <div className="w-11 overflow-hidden inline-block">
            <div className=" h-16 bg-white -rotate-45 transform origin-top-right mt-[36px]"></div>
          </div>
        )}

        <DiscoveryCard shortDescription={shortDescription} height={height} />

        {isLastIndex && (
          <div className="w-11 overflow-hidden inline-block">
            <div className=" h-16  bg-white rotate-45 transform origin-top-left mt-[36px]"></div>
          </div>
        )}
      </div>
    </div>
  )
}

CourseCard.propTypes = {
  course: PropTypes.shape({
    company: PropTypes.object,
    imageUrl: PropTypes.string,
    sellingPrice: PropTypes.number,
    basePrice: PropTypes.number,
    name: PropTypes.string,
    owner: PropTypes.string,
    discount: PropTypes.string,
    length: PropTypes.number,
    totalVideoCount: PropTypes.number,
    course: PropTypes.object,
    shortDescription: PropTypes.string
  }),
  isLastIndex: PropTypes.bool,
  isCompanyCourse: PropTypes.bool,
  height: PropTypes.string
}

CourseCard.defaultProps = {
  course: {
    company: {},
    imageUrl: '/images/couse-demo.png',
    sellingPrice: 0,
    basePrice: 0,
    name: '',
    owner: 'TNHH Soundio',
    discount: '',
    length: 0,
    totalVideoCount: 0,
    course: {},
    shortDescription: ''
  },
  isLastIndex: false,
  isCompanyCourse: false,
  height: 'h-[349px]'
}
