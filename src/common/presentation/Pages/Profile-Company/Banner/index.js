import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import SkeletonBanner from 'common/presentation/Skeleton/SkeletonBanner'
import isEmpty from 'lodash/isEmpty'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'

const Banner = (props) => {
  const { profile, seenNumber = 0 } = props
  const {
    name,
    bannerUrl,
    isDisplayOnBanner,
    avatarUrl,
    shortDescription = ''
  } = profile || {}

  if (isEmpty(profile)) {
    return <SkeletonBanner width="w-full" height="h-[254px]" />
  }
  // if (!bannerUrl) {
  //   return <Fragment></Fragment>
  // }

  return (
    <div
      className="w-full xl:h-[480px] h-fit bg-white"
      // style={{
      //   background: `${bannerUrl ? `url('${bannerUrl}')` : 'white'}`,
      //   backgroundSize: '100% 100%',
      //   backgroundRepeat: 'no-repeat'
      // }}
    >
      {/* <div className="w-full h-full bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent"> */}
      <div className="w-full h-full ">
        {/* {isDisplayOnBanner && ( */}
        <div className="relative xl:static flex xl:justify-between justify-center xl:pt-[48px] pt-8 pb-8 xl:px-[56px] px-8 h-full">
          <div className="hidden md:flex flex-col justify-end">
            <Image
              src={'/images/banner-profile-bottom.png'}
              width={122}
              height={105}
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="flex flex-col justify-center ">
            <div className="xl:relative flex">
              <div className="absolute top-0 xl:left-0 left-6">
                <div className="flex gap-[4px] items-center">
                  <XProfileIcon name="eyeProfileCompany" />
                  <p className="xl:text-p16 text-p14 text-grey-1">
                    {seenNumber}
                  </p>
                </div>
              </div>
              <div className="mb-5 mx-auto text-center bg-white xl:w-[222px] xl:h-[222px] w-[106px] h-[106px] rounded-full">
                <div className="hidden sm:block">
                  <Image
                    src={avatarUrl}
                    height={222}
                    width={222}
                    objectFit="contain"
                    alt=""
                    className="rounded-full"
                    quality={100}
                  />
                </div>
                <div className="block sm:hidden">
                  <Image
                    src={avatarUrl}
                    height={106}
                    width={106}
                    objectFit="contain"
                    alt=""
                    className="rounded-full"
                    quality={100}
                  />
                </div>
              </div>
            </div>

            <div className="flex  justify-center">
              <div className="xl:w-[1000px] text-center">
                <h1 className="xl:text-h1 text-p20-bold font-bold text-neutral">
                  {name}
                </h1>
                <p className="xl:text-p18 text-p16-bold font-bold text-grey-1 xl:mt-5 mt-2">
                  {shortDescription}
                </p>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-col justify-start">
            <Image
              src={'/images/banner-profile-top.png'}
              width={139}
              height={139}
              objectFit="contain"
              alt=""
            />
          </div>
        </div>
        {/* )} */}
      </div>
    </div>
  )
}

Banner.propTypes = {
  profile: PropTypes.object
}
Banner.defaultProps = {
  profile: {}
}

export default Banner
