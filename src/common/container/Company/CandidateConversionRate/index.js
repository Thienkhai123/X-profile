import React, { Fragment, useRef, useState } from 'react'

import Image from 'next/image'

const CandidateConversionRate = (props) => {
  const { Total, InviteInterview, Interviewed, InterviewPass, OfferConfirm } =
    props

  return (
    <div
      key={Total}
      className="xl:block hidden h-full min-w-[784px] bg-dark-blue rounded-2xl p-8"
    >
      <p className="text-h4  text-white">Tỷ lệ chuyển đổi ứng viên</p>
      <div className="flex  items-center gap-10 mt-10 mb-2 h-16">
        <p className="text-p18 text-grey-3">Ứng tuyển</p>
        <div
          style={{
            animationDelay: '500ms',
            animationDuration: '1000ms',
            animationFillMode: 'backwards'
          }}
          className="w-[591px] h-full relative animate-fadeIn cursor-default "
        >
          <Image src={'/images/ungtuyen.svg'} layout="fill" alt="" />
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <p className="text-h4 px-4 max-w-[200px] overflow-hidden">
              {Total} (100%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[50px]  mb-2 h-16">
        <p className="text-p18 text-grey-3">Mời phỏng vấn</p>
        <div
          style={{
            animationDelay: '400ms',
            animationDuration: '1000ms',
            animationFillMode: 'backwards'
          }}
          className="w-[491px] h-full relative animate-fadeIn cursor-default"
        >
          <Image src={'/images/moiphongvan.svg'} layout="fill" alt="" />
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <p className="text-h4 px-4 max-w-[200px] overflow-hidden">
              {InviteInterview} (
              {Math.floor((InviteInterview / Total) * 100) || 0}%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[107px]  mb-2 h-16">
        <p className="text-p18 text-grey-3">Đã phỏng vấn</p>
        <div
          style={{
            animationDelay: '200ms',
            animationDuration: '1000ms',
            animationFillMode: 'backwards'
          }}
          className="w-[389px] relative h-full animate-fadeIn cursor-default"
        >
          <Image src={'/images/daphongvan.svg'} layout="fill" alt="" />
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <p className="text-h4 px-4 max-w-[200px] overflow-hidden">
              {Interviewed} ({Math.floor((Interviewed / Total) * 100) || 0}%)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[176px]  mb-2 h-16">
        <p className="text-p18 text-grey-3">Trúng tuyển</p>
        <div
          style={{
            animationDelay: '100ms',
            animationDuration: '1000ms',
            animationFillMode: 'backwards'
          }}
          className="w-[289px] h-full relative animate-fadeIn cursor-default "
        >
          <Image src={'/images/trungtuyen.svg'} layout="fill" alt="" />
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <p className="text-h4 px-4 max-w-[200px] overflow-hidden">
              {InterviewPass} ({Math.floor((InterviewPass / Total) * 100) || 0}
              %)
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-[124px]   h-16">
        <p className="text-p18 text-grey-3">Nhân viên chính thức</p>
        <div
          style={{ animationDelay: '0ms', animationDuration: '1000ms' }}
          className="w-[236px] h-full relative animate-fadeIn cursor-default"
        >
          <Image src={'/images/nhanvienchinhthuc.svg'} layout="fill" alt="" />
          <div className="absolute w-full h-full left-0 top-0 flex items-center justify-center">
            <p className="text-h4 px-4 max-w-[200px] overflow-hidden">
              {OfferConfirm} ({Math.floor((OfferConfirm / Total) * 100) || 0}%)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CandidateConversionRate
