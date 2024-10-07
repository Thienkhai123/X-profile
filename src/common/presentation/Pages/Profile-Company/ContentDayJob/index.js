import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import { selectUserStatus } from 'store/app/departmentPositionSlice'
import { useSelector } from 'react-redux'

const ContentDayJob = (props) => {
  const {
    title,
    titleDay,
    name,
    titleButton,
    handleApply = {},
    showApply = false,
    applyBannerUrl = ''
  } = props

  const userStatus = useSelector(selectUserStatus)
  const { allCampaignStatus } = userStatus || {}

  return (
    <div>
      {applyBannerUrl ? (
        <div
          style={{
            background: `${`url('${applyBannerUrl}') center center / cover no-repeat`}`
          }}
          className="xl:w-[1140px]  rounded-default  overflow-hidden"
        >
          <div className="pl-12 w-full h-full xl:flex justify-start bg-gradient-to-t from-[rgba(0,0,0,0.8)] to-transparent">
            <div className="pt-[45px] pb-[47px] flex flex-col justify-between px-5 xl:px-0">
              <div className="text-center max-w-[543px] mb-[26px]">
                <p className="text-white sm:text-h3 text-p16-bold">
                  {title}
                  <span className="text-blue-light"> {name} </span>
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
                  onClick={() => handleApply()}
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
                <span className="text-blue-light"> {name} </span>
                {titleDay}
              </p>
            </div>
            {showApply && allCampaignStatus !== 1 && (
              <div className="flex justify-center">
                <Button
                  title={titleButton}
                  width="w-[180px]"
                  height="h-[52px]"
                  background="bg-blue-light"
                  color="text-white"
                  rounded="rounded-borderStep"
                  textWeight="text-p14 font-bold sm:text-p18-bold"
                  onClick={() => handleApply()}
                />
              </div>
            )}
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

ContentDayJob.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  titleButton: PropTypes.string,
  titleDay: PropTypes.string,
  submitApplyContent: PropTypes.func
}
ContentDayJob.defaultProps = {
  title: 'Interested in this job? Apply to  ',
  name: 'VNG Corporation',
  titleButton: 'Ứng tuyển ngay',
  titleDay: 'today',
  submitApplyContent: () => {}
}

export default ContentDayJob
