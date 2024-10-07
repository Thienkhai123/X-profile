import React from 'react'
import PropTypes from 'prop-types'
import LineCard from '../lineCard'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'

const DevRoadmapPositionViewItem = (props) => {
  const { imageUrl, name, tag, index, number, positionList } = props
  return (
    <div className="w-full xl:h-auto flex items-center justify-center gap-6">
      <div className=" w-[224px] h-[280px] relative">
        <Image src={imageUrl} layout="fill" objectFit="contain" alt="" />
        <p
          style={{
            wordBreak: 'break-word'
          }}
          className="absolute m-auto top-2/3 left-0 right-0 text-white max-w-[80px] max-h-[56px] text-p14-bold"
        >
          {name}
        </p>
      </div>
      {index !== number - 1 && tag && (
        <div className="w-[88px] gap-4 flex flex-col items-center justify-center">
          {positionList[index + 1]?.description ? (
            <div className="">
              <p className="w-full text-p18 text-grey-1 text-center">
                {`${positionList[index + 1].description}`}
              </p>
            </div>
          ) : positionList[index + 1]?.totalTime ? (
            positionList[index + 1]?.totalTime !== 0 && (
              <div className="">
                <p className="w-full text-p18 text-grey-1 h-14">
                  {`${positionList[index + 1].totalTime} năm`}
                </p>
              </div>
            )
          ) : (
            <div className="h-14"></div>
          )}
          <div className=" w-[40px] h-[40px] relative">
            <Image
              src={
                parseInt(tag) === 0
                  ? '/images/arrowSystemRoadmap/intern.svg'
                  : parseInt(tag) === 1
                  ? '/images/arrowSystemRoadmap/fresherJunior.svg'
                  : parseInt(tag) === 2
                  ? '/images/arrowSystemRoadmap/midSenior.svg'
                  : '/images/arrowSystemRoadmap/managerLeader.svg'
              }
              layout="fill"
              objectFit="contain"
              alt=""
            />
          </div>
        </div>
      )}
    </div>
  )
}

DevRoadmapPositionViewItem.propTypes = {}

export default DevRoadmapPositionViewItem
