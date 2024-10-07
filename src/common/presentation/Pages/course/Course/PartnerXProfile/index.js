import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'

const PartnerXProfile = (props) => {
  const handleClick = () => {
    window.open(process.env.NEXT_PUBLIC_LMS + 'User/Register')
  }
  return (
    <div className="bg-blue-light min-h-[280px] flex justify-around items-center">
      <div className="xl:ml-14 hidden xl:block">
        <Image
          width={382}
          height={250}
          quality={100}
          objectFit="contain"
          src={'/images/Course/PartnerBannerLeft.png'}
          alt=""
        />
      </div>

      <div className="flex flex-col gap-3 items-center">
        <p className="sm:text-h2 text-h4 text-white text-center">
          Trở thành đối tác với X-Profile
        </p>
        {/* <p className="sm:text-p18 text-p16 text-white text-center">
          Hơn 10.000 Khoá học Online
        </p> */}
        <Button
          textWeight="sm:text-p20-bold text-p16-bold"
          title="Đăng ký ngay"
          rounded="rounded-none"
          height="h-[52px]"
          width="w-[235px]"
          onClick={handleClick}
        />
      </div>
      <div className="xl:mr-14 self-end hidden xl:block">
        <Image
          width={471}
          objectFit="contain"
          height={270}
          quality={100}
          src={'/images/Course/PartnerBannerRight.png'}
          alt=""
        />
      </div>
    </div>
  )
}

PartnerXProfile.propTypes = {}
PartnerXProfile.defaultProps = {}

export default PartnerXProfile
