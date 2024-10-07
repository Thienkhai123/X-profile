import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import { scrollToId } from 'store/helper/functionHelper'
import Image from 'next/image'

const JoumeyXprofile = (props) => {
  const { title, description, button, link, roleId } = props
  const handleScrollId = () => {
    scrollToId('blockDiscover')
  }

  // const sanityIoImageLoader = ({ src, width, quality }) => {
  //   return `${
  //     process.env.NODE_ENV === 'development'
  //       ? process.env.NEXT_PUBLIC_HOST_DEV
  //       : process.env.NEXT_PUBLIC_HOST_PROD
  //   }/${src}?w=${width}&q=${quality || 15}`
  // }
  return (
    <div className="w-full relative">
      <div className="hidden xl:block w-full h-[55.4vw]">
        <Image
          alt=""
          // loader={sanityIoImageLoader}
          src={`${
            parseInt(roleId) === 0
              ? '/images/Cuu_Banner_v2.webp'
              : '/images/Chuot_Banner_v2.webp'
          }`}
          layout="fill"
          width={2160}
          height={1199}
          quality={100}
          placeholder="blur"
          blurDataURL={`${
            parseInt(roleId) === 0
              ? '/images/Cuu_Banner_v2.webp'
              : '/images/Chuot_Banner_v2.webp'
          }`}
          objectFit="cover"
          priority={true}
        />
      </div>
      <div className="xl:hidden">
        <Image
          alt=""
          // loader={sanityIoImageLoader}
          src={`${
            parseInt(roleId) === 0
              ? '/images/Cuu_Banner_Mobile.webp'
              : '/images/Chuot_Banner_Mobile.webp'
          }`}
          placeholder="blur"
          blurDataURL={`${
            parseInt(roleId) === 0
              ? '/images/Cuu_Banner_Mobile.webp'
              : '/images/Chuot_Banner_Mobile.webp'
          }`}
          // layout="fill"
          width={1125}
          height={2085}
          quality={100}
          objectFit="cover"
        />
      </div>
      <div className="absolute md:top-16 top-12 px-12 xl:px-0 w-full">
        <div className="text-center text mb-3">
          <p className="md:text-h1 text-xl font-bold">{title}</p>
        </div>
        <div className="flex justify-center md:mb-5 mb-6">
          <p className="md:text-p18 xl:max-w-[713px] xl:px-[56px] text-p14 text-center whitespace-pre-line">
            {description}
          </p>
        </div>
        <div className="flex justify-center md:mb-5 mb-6">
          <Button
            title={button}
            width="xl:w-[155px] w-[263px]"
            height="h-[48px]"
            rounded="rounded-lg"
            padding="py-3"
            onClick={() => handleScrollId()}
          />
        </div>
        <div className="text-center text-blue-2 ">
          <a
            href="https://blog.xprofile.vn/category/huong-dan/"
            rel="noreferrer"
            target="_blank"
            className="flex xl:flex-row flex-col items-center justify-center"
          >
            <div className="mr-2 xl:mb-0 mb-4">
              <XProfileIcon name="book" />
            </div>
            <p className="md:text-p16-bold font-bold text-p14">{link}</p>
          </a>
        </div>
      </div>
    </div>
  )
}

JoumeyXprofile.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  button: PropTypes.string,
  link: PropTypes.string,
  roleId: PropTypes.number
}
JoumeyXprofile.defaultProps = {
  title: 'Bắt đầu cuộc hành trình với X-Profile',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce mauris neque, interdum eu consequat. Lorem ipsum dolor sit ame.',
  button: 'Khám phá',
  link: 'Tìm hiểu cách bắt đầu với X-Profile',
  roleId: 0
}

export default JoumeyXprofile
