import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'

import XProfileIcon from 'common/presentation/Icons'

const BlogManySourceItem = (props) => {
  const {
    imageUrl,
    title,
    desc,
    isCompanyCourse,
    widthImg = 197,
    heightImg = 96,
    widthImgMobile = 115,
    heightImgMobile = 56,
    handleLinkBlog = () => {}
  } = props

  return (
    <div className="group w-full">
      <div
        onClick={() => handleLinkBlog()}
        className="w-full cursor-pointer flex items-start gap-6 relative h-full bg-white overflow-hidden "
      >
        <div className="relative min-w-[197px] md:block hidden">
          <Image
            src={imageUrl || ''}
            alt="Course Image"
            priority
            quality={100}
            width={widthImg}
            height={heightImg}
            objectFit="cover"
            className="rounded-xl  cursor-pointer"
          />
          {isCompanyCourse && (
            <div className="absolute right-4 top-0">
              <XProfileIcon name="flagXprofile" />
            </div>
          )}
        </div>
        <div className="relative min-w-[115px] md:hidden">
          <Image
            src={imageUrl || ''}
            alt="Course Image"
            priority
            quality={100}
            width={widthImgMobile}
            height={heightImgMobile}
            objectFit="cover"
            className="rounded-xl  cursor-pointer"
          />
          {isCompanyCourse && (
            <div className="absolute right-3 top-0">
              <XProfileIcon name="flagXprofile" width="38" height="55" />
            </div>
          )}
        </div>
        <div className="flex-col gap-1 items-start">
          <p
            style={{ wordBreak: 'break-word' }}
            className="md:text-p18-bold text-p16-bold text-black md:line-clamp-1"
          >
            {title || ''}
          </p>
          <p
            style={{ wordBreak: 'break-word' }}
            className="text-p18 text-grey-1 line-clamp-2 md:block hidden"
          >
            {desc || ''}
          </p>
        </div>
      </div>
    </div>
  )
}

BlogManySourceItem.propTypes = {}
BlogManySourceItem.defaultProps = {
  height: 'h-[370px]',
  isCompanyCourse: false
}

export default BlogManySourceItem
