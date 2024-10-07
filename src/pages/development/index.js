import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import { useRouter } from 'next/router'
import Head from 'next/head'

const Development = (props) => {
  const { content, titleButton } = props
  const router = useRouter()
  const { push } = router

  const handlePush = () => {
    push('/')
  }

  return (
    <div>
      <Head>
        <title>XProfile - đang phát triển</title>
      </Head>
      <div className="flex flex-col items-center sm:gap-[64px] gap-[40px] sm:py-[48px] py-[48px]">
        <div className="text-center">
          <p className="sm:text-p20-bold text-p16-bold text-black">{content}</p>
        </div>
        <div>
          <Button
            title={titleButton}
            textWeight="sm:text-p18-bold text-p14-bold"
            width="sm:w-[240px] w-[220px]"
            rounded="rounded-borderStep"
            height="h-[52px]"
            onClick={() => handlePush()}
          />
        </div>
        <div className="relative xl:w-[1144px] w-[340px] h-[200px] xl:h-[549px]">
          <Image
            placeholder="blur"
            blurDataURL="/images/Development/build.png"
            src="/images/Development/build.png"
            alt=""
            layout="fill"
            objectFit="contain"
            quality={100}
          />
        </div>
      </div>
      <div className="">
        <a
          target="_blank"
          href="https://www.facebook.com/groups/vietcodecangay"
          rel="noopener noreferrer"
          className="block sm:h-[304px] h-[139px] w-full relative"
        >
          <Image
            alt="join-us"
            placeholder="blur"
            blurDataURL="/images/Banner_JoinUs1.webp"
            src="/images/Banner_JoinUs1.webp"
            layout="fill"
            width={4320}
            height={912}
            objectFit="cover"
            quality={100}
          />
        </a>
      </div>
    </div>
  )
}

Development.propTypes = {
  content: PropTypes.string,
  titleButton: PropTypes.string
}
Development.defaultProps = {
  content:
    'Tính năng này vẫn đang được phát triển, bạn chờ thêm một chút nhé :>',
  titleButton: 'Trở về trang chủ'
}

export default Development
