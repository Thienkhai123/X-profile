import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import Button from 'common/presentation/Button'
import Image from 'next/image'

const BannerApplyViewMode = (props) => {
  const {
    title,
    titleDay,
    titleButton,
    profile = {},
    showApply = false
  } = props
  const { meta, name, applyBannerUrl } = profile || {}
  const { applyBannerUrl: applyBannerUrlDefault } = meta || {}

  return (
    <div>
      {(applyBannerUrl && applyBannerUrl !== '') ||
      (applyBannerUrlDefault && applyBannerUrlDefault !== '') ? (
        <div
          style={{
            background: `${`url('${
              applyBannerUrl || applyBannerUrlDefault
            }') center center / cover no-repeat`}`
          }}
          className="xl:w-[1140px]  rounded-default  overflow-hidden"
        >
          <div className="pl-12 w-full h-full xl:flex justify-start bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
            <div className="pt-[45px] pb-[47px] flex flex-col justify-between px-5 xl:px-0">
              <div className="text-center max-w-[543px] mb-[26px]">
                <p className="text-white sm:text-h3 text-p16-bold">
                  {title}
                  <span className="text-white"> {name} </span>
                  {titleDay}
                </p>
              </div>

              <div className="flex justify-center">
                <Button
                  title={titleButton}
                  width="w-[180px]"
                  height="h-[52px]"
                  background="bg-blue-light"
                  color="text-white"
                  rounded="rounded-borderStep"
                  textWeight="text-p14 font-bold sm:text-p18-bold"
                  // onClick={() => handleApply()}
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="xl:w-[1140px] xl:flex justify-end bg-button rounded-default overflow-hidden">
          <div className="flex items-end justify-end sm:hidden pt-[52px]">
            <Image
              width={516.92}
              height={233}
              src="/images/contentProfile.png"
              alt=""
            />
          </div>
          <div className="pt-[45px] pb-[47px] flex flex-col justify-between px-5 xl:px-0">
            <div className="text-center max-w-[543px] mb-[26px]">
              <p className="text-white sm:text-h3 text-p16-bold">
                {title}
                <span className="text-white"> {name} </span>
                {titleDay}
              </p>
            </div>

            <div className="flex justify-center">
              <Button
                title={titleButton}
                width="w-[180px]"
                height="h-[52px]"
                background="bg-blue-light"
                color="text-white"
                rounded="rounded-borderStep"
                textWeight="text-p14 font-bold sm:text-p18-bold"
                // onClick={() => handleApply()}
              />
            </div>
          </div>
          <div className="hidden sm:flex items-end justify-end">
            <Image
              width={516.92}
              height={233}
              src="/images/contentProfile.png"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

BannerApplyViewMode.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  titleButton: PropTypes.string,
  titleDay: PropTypes.string
}
BannerApplyViewMode.defaultProps = {
  title: 'Bạn quan tâm đến vị trí này? Ứng tuyển vào  ',
  name: 'VNG Corporation',
  titleButton: 'Ứng tuyển ngay',
  titleDay: 'ngay hôm nay'
}

export default BannerApplyViewMode
