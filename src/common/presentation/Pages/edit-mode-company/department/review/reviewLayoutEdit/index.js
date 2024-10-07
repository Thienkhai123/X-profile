import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import useTrans from 'common/hooks/useTrans'

const ReviewLayoutEdit = (props) => {
  const { profileDeparment, editmode } = props
  const trans = useTrans()

  const { PROFILE_COMPANY } = trans

  return (
    <div>
      <div className="hidden xl:block absolute right-20 top-[40px]">
        <Image
          placeholder="blur"
          blurDataURL="/images/banner-profile-top.png"
          src={'/images/banner-profile-top.png'}
          width={91.43}
          height={95.13}
          objectFit="contain"
          alt=""
        />
      </div>
      {editmode && (
        <div className="hidden xl:block absolute left-0 -bottom-1">
          <Image
            placeholder="blur"
            blurDataURL="/images/bearBossBackground.png"
            src={'/images/bearBossBackground.png'}
            width={405}
            height={389}
            objectFit="contain"
            alt=""
          />
        </div>
      )}
      <div className="text-center mb-10 mx-auto  sm:px-0 px-[16px]">
        <p className="sm:text-h2 text-p20-bold text-neutral">
          {PROFILE_COMPANY.detailCompany.titleMeetingDetail}{' '}
          {profileDeparment?.name ? profileDeparment?.name : ''}
        </p>
        <p className="sm:text-p18 text-p12 text-grey-1 mt-5 sm:px-0 px-[28px]">
          Một vài lời nhắn gửi và chia sẻ từ các thành viên trong team sẽ giúp
          bạn hiểu hơn về team và công ty chúng tôi!
        </p>
      </div>
    </div>
  )
}

ReviewLayoutEdit.propTypes = {}

export default ReviewLayoutEdit
