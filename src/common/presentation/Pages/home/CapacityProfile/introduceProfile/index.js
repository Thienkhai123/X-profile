import React from 'react'
import PropTypes from 'prop-types'
import ContentProfile from '../contentProfile'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import Badge from 'common/presentation/Badge'
import Image from 'next/image'
import SkeletonAvatar from 'common/presentation/Skeleton/SkeletonAvatar'

const IntroduceProfile = (props) => {
  const {
    titleLocation,
    titleAddress,
    roleId = null,
    porfolio,
    handleLinkPortfolio = () => {}
  } = props

  return (
    <div className="xl:w-[362px] w-full bg-light-nude h-full rounded-borderStep pt-[32px] ">
      <div className="flex justify-center mb-[16px]">
        {/* {porfolio?.user?.avatarUrl ? ( */}
        <Image
          src={
            porfolio?.user?.avatarUrl !== null &&
            porfolio?.user?.avatarUrl !== ''
              ? porfolio?.user?.avatarUrl
              : parseInt(roleId) === 0
              ? '/images/DefaultAvatarCuu.png'
              : parseInt(roleId) === 1
              ? '/images/DefaultAvatarChuot.png'
              : parseInt(roleId) === 2
              ? '/images/DefaultAvatarGau.png'
              : '/images/DefaultAvatarCuu.png'
          }
          alt=""
          width={120}
          height={120}
          className="rounded-full object-cover"
        />
        {/* ) : (
          <SkeletonAvatar />
        )} */}
      </div>
      <div className="text-center mb-[8px] px-4">
        <p className="text-p18-bold text-neutral truncate">
          {porfolio?.user?.name}
        </p>
      </div>
      <div className="flex justify-center mb-[20px]">
        {roleId === 0 && (
          <Badge
            imageIcon="/images/CapacityProfile/sheep.png"
            imageWidth={20}
            imageHeight={20}
            imageStyle="object-cover"
            width="auto"
            padding="8px 12px"
            radius="20px"
            subValue="Cừu tân binh"
            subTextStyle="text-p16 text-grey-1"
          />
        )}
        {roleId === 1 && (
          <Badge
            imageIcon="/images/CapacityProfile/mouse.png"
            imageWidth={20}
            imageHeight={20}
            imageStyle="object-cover"
            width="auto"
            padding="8px 12px"
            radius="20px"
            subValue="Chuột công sở"
            subTextStyle="text-p16 text-grey-1"
          />
        )}
      </div>
      <div className="px-[32px]">
        <div className=" flex justify-between items-center w-full mb-4">
          <div className="flex justify-between w-full">
            <div className="flex gap-4">
              <XProfileIcon name="case" fill="#666666" />
              <p
                className={`text-p16 ${
                  porfolio?.currentJob ? 'text-neutral' : 'text-grey-1'
                }`}
              >
                {porfolio?.currentJob ? porfolio?.currentJob : titleLocation}
              </p>
            </div>
          </div>
          {!porfolio?.currentJob && (
            <a className="hover:cursor-pointer" href="applicant-profile">
              <div>
                <p className="text-p16-bold text-button-2">Thêm</p>
              </div>
            </a>
          )}
        </div>
        <div className=" flex justify-between items-center w-full mb-[32px]">
          <div className="flex gap-4 ">
            <XProfileIcon name="letter" fill="#666666" />
            <p
              className={`text-p16 ${
                porfolio?.user?.email ? 'text-neutral' : 'text-grey-1'
              }`}
            >
              {porfolio?.user?.email ? porfolio?.user?.email : titleAddress}
            </p>
          </div>
          {!porfolio?.user?.email && (
            <a className="hover:cursor-pointer" href="applicant-profile">
              <div>
                <XProfileIcon name="add" fill="#666666" />
              </div>
            </a>
          )}
        </div>
        <hr
          style={{
            height: '1px',
            backgroundImage:
              'linear-gradient(90deg, #CCCCCC, #CCCCCC 55%, transparent 0%, transparent 100%)',
            backgroundSize: '24px 4px',
            border: 'none',
            opacity: 1
          }}
        />
      </div>

      <div className="px-[32px] py-[44px]">
        <ContentProfile />
      </div>
    </div>
  )
}

IntroduceProfile.propTypes = {
  titleLocation: PropTypes.string,
  titleAddress: PropTypes.string
}
IntroduceProfile.defaultProps = {
  titleLocation: 'Thêm vị trí công việc',
  titleAddress: 'Thêm email liên hệ'
}

export default IntroduceProfile
