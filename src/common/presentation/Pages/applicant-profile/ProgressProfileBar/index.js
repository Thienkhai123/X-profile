import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const ProgressProfileBar = (props) => {
  const { characterId = 0, percentValue } = props

  return (
    <div className=" w-full h-2  bg-white rounded-full transition-all   flex items-center">
      <div
        className={`${
          characterId === 0 ? 'bg-[#F5C1B3]' : 'bg-yellow-bg'
        } transition-all text-p16  text-neutral text-center p-1 relative rounded-full `}
        style={{ width: `${percentValue}%` }}
      >
        <div className="absolute group -right-2 -top-[34px] flex flex-col gap-1 items-center">
          <p
            className={`text-p14-bold  ${
              characterId === 0 ? 'text-pink-dark' : 'text-button'
            }`}
          >{`${percentValue}%`}</p>
          <div className=" w-6 h-6 relative cursor-careerPath ">
            <Image
              src={
                characterId === 0
                  ? '/images/progressCuu.png'
                  : '/images/progressChuot.png'
              }
              layout="fill"
              alt=""
              quality={100}
            />
            <span
              className={`absolute  text-p18 ${
                characterId === 0
                  ? 'text-pink-dark before:border-r-pink-light bg-pink-light'
                  : 'text-button before:border-r-yellow-bg bg-yellow-bg'
              } hidden xl:group-hover:flex justify-center items-center whitespace-nowrap  translate-y-8 translate-x-1/2 right-3  min-w-[182px] max-w-[252px]  px-4 py-2  rounded-lg text-center  before:content-[''] before:absolute before:-top-4  before:left-[50%] before:rotate-90 before:-translate-x-1/2 before:border-8 before:border-y-transparent before:border-l-transparent `}
            >
              {percentValue === 100
                ? 'Bạn đã hoàn thành hồ sơ'
                : `${percentValue}% hoàn thành`}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

ProgressProfileBar.propTypes = {
  type: PropTypes.string,
  background: PropTypes.string,
  percentValue: PropTypes.number,
  height: PropTypes.string,
  width: PropTypes.string
}
ProgressProfileBar.defaultProps = {
  percentValue: 100
}

export default ProgressProfileBar
