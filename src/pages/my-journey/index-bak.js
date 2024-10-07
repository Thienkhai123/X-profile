import Button from 'common/presentation/Button'
import Head from 'next/head'
import Image from 'next/image'
import { Fragment, useEffect } from 'react'

const MyJourneyPage = () => {
  // useEffect(() => {
  //   window.location.replace('my-journey/understand-myself')
  // }, [])
  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi</title>
      </Head>
      <div className="flex-1 bg-portfolio-empty sm:px-0 px-10">
        <div className="flex flex-col items-center sm:py-[48px] py-[48px]">
          <div className="text-center mb-8">
            <p className="sm:text-p28-bold text-p16-bold text-black mb-4">
              Tính năng này vẫn đang được phát triển
            </p>
            <p className="sm:text-p20 text-p16 text-black">
              Trang “Hành trình của tôi” sẽ ra mắt sớm thôi, bạn chờ thêm một
              chút nha!
            </p>
          </div>
          <div className="sm:mb-[88px]">
            <Button
              title={'Trở về trang chủ'}
              textWeight="sm:text-p18-bold text-p14-bold"
              width="w-auto"
              rounded="rounded-lg"
              height="h-[44px]"
              color="text-white"
              background="bg-button-2"
              padding="px-8 py-[13px]"
              onClick={() => {
                window.location.href = '/'
              }}
            />
          </div>
          <div className="relative xl:w-[800px] w-[340px] h-[200px] xl:h-[384px]">
            <Image
              placeholder="blur"
              blurDataURL="/images/WorkInProgress.webp"
              src="/images/WorkInProgress.webp"
              alt=""
              layout="fill"
              objectFit="contain"
              quality={100}
            />
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MyJourneyPage
