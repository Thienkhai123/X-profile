import React, { Fragment, useRef, useState } from 'react'

import 'react-datepicker/dist/react-datepicker.css'

import Image from 'next/image'

import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'

import Pagination from 'common/presentation/Pagination'
import Button from 'common/presentation/Button'

const AppliedPage = (props) => {
  const {
    userAppliedCampaigns,
    metaAppliedCampaigns,
    isAuthentication,
    step,
    handlePageChangeAppliedCampaigns = () => {},
    handleLink = () => {}
  } = props

  return (
    <div className={``}>
      <div className="w-full">
        {userAppliedCampaigns?.length !== 0 ? (
          <div>
            <div className="xl:pt-0 grid grid-cols-2 xl:grid-cols-2 xl:gap-11 gap-4 mb-5 ">
              {userAppliedCampaigns?.map((job, index) => {
                const {
                  companyId,
                  departmentId,
                  departmentPositionId,
                  company
                } = job
                const { tag } = company
                return (
                  <HightlightJobCard
                    showHeart={false}
                    step={step}
                    key={index}
                    job={job}
                    // applied={true}
                    isAuthentication={isAuthentication}
                    disableButton={true}
                    disableTitle="Đã ứng tuyển"
                    handleAction={() =>
                      handleLink(tag, departmentId, departmentPositionId)
                    }
                  />
                )
              })}
            </div>
            {metaAppliedCampaigns?.totalPages > 1 && (
              <div className="flex justify-end items-center">
                <Pagination
                  totalPages={metaAppliedCampaigns?.totalPages}
                  pageSize={metaAppliedCampaigns?.pageSize}
                  totalCount={metaAppliedCampaigns?.recordsTotal}
                  currentPage={metaAppliedCampaigns?.currentPage}
                  onPageChange={handlePageChangeAppliedCampaigns}
                />
              </div>
            )}
          </div>
        ) : (
          <div className="w-full min-h-[340px] pb-12 flex flex-col items-center justify-center mt-20">
            <Image
              alt="empty"
              width={200}
              height={200}
              src={'/images/empty.svg'}
              quality={100}
            />

            <p className="text-grey-1 text-p18 my-10">
              Bạn chưa có đơn ứng tuyển nào
            </p>
            <Button
              title="Xem thêm việc làm"
              rounded="rounded-lg"
              background={'bg-button'}
              color={'text-neutral'}
              padding="py-[13px] px-8"
              height="h-auto"
              margin=""
              width="w-full"
              textWeight={'text-p18-bold '}
              onClick={() => (window.location.href = '/jobs')}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default AppliedPage
