import React, { Fragment, useEffect, useRef, useState } from 'react'

import Image from 'next/image'
import CvJobCompatibility from './CvJobCompatibility'
import XProfileIcon from 'common/presentation/Icons'

const CvCard = (props) => {
  const {
    name,
    portfolioId,
    avatarUrl,
    jobTitle,
    type,
    percent,
    guid,
    toggleModal = () => {},
    showInviteModal = () => {},
    handleClickCard = () => {},
    isShowMatching = false,
    characterId = 0
  } = props
  return (
    <div
      onClick={() => handleClickCard(guid)}
      className="flex items-start cursor-pointer gap-4 p-6 border border-grey-3 transition-all hover:border-blue-light hover:shadow-[0px_16px_24px_rgba(0,0,0,0.04)] rounded-lg w-full "
    >
      <div className="relative min-w-[80px]">
        <Image
          src={
            avatarUrl !== null && avatarUrl !== ''
              ? avatarUrl
              : parseInt(characterId) === 0
              ? '/images/DefaultAvatarCuu.png'
              : parseInt(characterId) === 1
              ? '/images/DefaultAvatarChuot.png'
              : parseInt(characterId) === 2
              ? '/images/DefaultAvatarGau.png'
              : '/images/DefaultAvatarCuu.png'
          }
          alt=""
          width={80}
          height={80}
          className="rounded-full"
          objectFit="cover"
          quality={100}
        />
      </div>
      <div className="w-full ">
        <div className=" flex items-center justify-between ">
          <p className="text-p18-bold  max-w-[220px] overflow-hidden overflow-ellipsis ">
            {name}
          </p>
          {percent === 0 && isShowMatching && (
            <div
              onClick={(e) => showInviteModal(e, portfolioId)}
              className="cursor-pointer group relative"
            >
              <XProfileIcon name="clipBoardAddIcon" />
              <span className="absolute hidden group-hover:flex justify-center transition-all right-1/2  translate-x-1/2 -top-2 -translate-y-full w-[254px] px-4 py-2 bg-button rounded-lg text-center text-white text-p18 after:content-[''] after:absolute after:left-1/2 after:top-[100%] after:-translate-x-1/2 after:border-8 after:border-x-transparent after:border-b-transparent after:border-t-button z-30">
                Mời tham gia bài kiểm tra
              </span>
            </div>
          )}
        </div>
        {isShowMatching && (
          <div className="mt-2 ">
            <CvJobCompatibility percent={percent} />
          </div>
        )}
        <p className="text-p16 mt-2 max-w-[240px] overflow-hidden overflow-ellipsis">
          {jobTitle}
        </p>
        <div className="flex gap-1">
          <p className="text-p14 text-grey-1 mt-2 peer">
            {type?.map((workType, index) => (
              <Fragment key={index}>
                {workType === 1
                  ? 'Fulltime'
                  : workType === 2
                  ? 'Part-time'
                  : 'Freelance'}
                {index !== type.length - 1 && <span className="">, </span>}
              </Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  )
}

CvCard.propTypes = {}

export default CvCard
