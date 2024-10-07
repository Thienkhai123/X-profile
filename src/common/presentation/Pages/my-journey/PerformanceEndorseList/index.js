import Image from 'next/image'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import XProfileIcon from 'common/presentation/Icons'

import { DEFAULT_AVATAR } from 'common/config/app.constants'

const PerformanceEndorseList = (props) => {
  const { data = [], userSkills = [], handleToogle = () => {} } = props

  return (
    <div className="w-full flex flex-col px-5 md:px-0">
      {data?.map((item, index) => {
        const { id, name, time, status, isPublic, avatarUrl, content } = item

        return (
          <div key={index} className="py-5 border-b border-grey-4">
            <div className="flex items-end gap-4 mb-1">
              <div className="relative w-12 h-12  rounded-full">
                <Image
                  src={avatarUrl || DEFAULT_AVATAR}
                  layout="fill"
                  objectFit="cover"
                  alt=""
                />
              </div>
              <div className="flex gap-2 items-center">
                <p className="text-p18-bold">{name}</p>
                <p className="text-p16 text-semantic-text-link">{status}</p>
              </div>
            </div>
            <p className="text-p16 mb-8">{content}</p>
            <div className="flex md:flex-row flex-col md:items-center justify-end gap-5">
              <p className="text-p16 text-semantic-text-link">
                Panamera engine repair
              </p>
              <p className="text-p16 text-semantic-text-link">{time}</p>
              <p
                className={`text-p18-bold ${
                  isPublic ? 'text-semantic-text-link' : 'text-[#1B75BB]'
                }`}
              >
                Public
              </p>
              <label className="relative  items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={isPublic}
                  className="sr-only peer"
                  onChange={(e) => {
                    handleToogle(index)
                  }}
                />
                <div className="w-12 h-6 bg-white peer-focus:outline-none border-2 border-black  peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-grey-4 peer-checked:border-grey-4 after:content-[''] after:absolute after:top-[6px] after:left-[6px] peer-checked:after:left-[2px] after:bg-black peer-checked:after:bg-grey-4 after:border-gray-300 after:border after:rounded-full after:h-3 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#317AE8]"></div>
              </label>
            </div>
          </div>
        )
      })}
    </div>
  )
}

PerformanceEndorseList.propTypes = {}

PerformanceEndorseList.defaultProps = {}

export default PerformanceEndorseList
