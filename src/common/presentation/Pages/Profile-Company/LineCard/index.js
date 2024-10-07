import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'
import { useRouter } from 'next/router'
import Image from 'next/image'
import LinePath from '../LinePath'

const LineCard = (props) => {
  const {
    id,
    src,
    title,
    description,
    handle,
    index,
    backgroundUrl,
    color,
    isDrawPath,
    numbers,
    isFirstRow
  } = props
  const ref = useRef()
  const [showBackground, setShowBackground] = useState(null)

  const { query } = useRouter()
  const { departmentPositionId } = query

  return (
    <div className="w-full" onClick={() => handle(id)}>
      <div className="relative w-full">
        <div
          className='"w-full mx-auto '
          style={{
            paddingTop: (index + 1) % 2 === 0 ? 44 : 0
          }}
          onMouseEnter={() => setShowBackground(true)}
          onMouseLeave={() => setShowBackground(false)}
        >
          <div ref={ref} className="w-[240px] h-[280px] relative mx-auto z-10">
            {src &&
            (showBackground || parseInt(departmentPositionId) === id) ? (
              <Image
                alt=""
                src={backgroundUrl || src}
                layout="fill"
                objectFit="contain"
                className={`roadmap-${index}`}
              />
            ) : src && !showBackground ? (
              <Image
                alt=""
                src={src}
                layout="fill"
                objectFit="contain"
                className={`roadmap-${index}`}
              />
            ) : (
              <div className="w-[240px] mx-auto">
                <SkeletonBox
                  width="w-[240px]"
                  height="h-[280px]"
                  bg="bg-[#F5F5F2]"
                />
              </div>
            )}
          </div>
        </div>

        <div className="w-[36px] mx-auto -mt-[32px]">
          <div className="w-[10px] bg-stoke h-[69px] mx-auto" />
          <div
            className="rounded-full  mx-auto -mt-2 w-[36px] h-[36px]  flex flex-col justify-center items-center"
            style={{
              background:
                showBackground || parseInt(departmentPositionId) === id
                  ? 'white'
                  : 'transparent',
              boxShadow:
                showBackground || parseInt(departmentPositionId) === id
                  ? `0px 0px 7px 8px ${color || 'black'}`
                  : 'none'
            }}
          >
            <div
              className="rounded-full w-[26px] h-[26px]"
              style={{ backgroundColor: color || 'black' }}
            />
          </div>
        </div>
        {isDrawPath && index === 0 && !isFirstRow && (
          <LinePath positon="right-top" />
        )}
        {isDrawPath && (index + 1) % 2 === 0 && !isFirstRow && (
          <LinePath
            positon="center-bottom"
            isLastIndex={index === numbers - 1}
          />
        )}
        {isDrawPath && index > 0 && (index + 1) % 2 !== 0 && !isFirstRow && (
          <LinePath positon="center-top" isLastIndex={index === numbers - 1} />
        )}
      </div>
      <div className="text-center my-2">
        <p
          className="sm:text-p20-bold text-p16-bold"
          style={{ color: color || 'black' }}
        >
          {title}
        </p>
      </div>
      {/* <p className="sm:text-p18 text-p12 text-grey-1 text-center sm:px-[12px] px-[48px]">
        {description}
      </p> */}
    </div>
  )
}

LineCard.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  handle: PropTypes.func,
  src: PropTypes.string,
  backgroundUrl: PropTypes.string,
  numbers: PropTypes.number,
  color: PropTypes.string,
  isDrawPath: PropTypes.bool,
  numbers: PropTypes.number
}
LineCard.defaultProps = {
  title: '',
  description: '',
  handle: () => {},
  src: '/images/avatar.png',
  backgroundUrl: '',
  numbers: 0,
  color: '',
  isDrawPath: false,
  numbers: 0
}

export default LineCard
