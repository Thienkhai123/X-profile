import React, { Fragment, useEffect, useRef, useState } from 'react'

const CvJobCompatibility = (props) => {
  const { percent } = props

  return (
    <div>
      {percent > 0 ? (
        <div
          className={`px-4 py-[2px] rounded-full ${
            percent > 70
              ? 'bg-[#EAEDF5]'
              : percent > 40
              ? 'bg-[#FCF6ED]'
              : 'bg-[#FCF5F5]'
          } w-fit`}
        >
          <p
            className={`text-p16-bold  ${
              percent > 70
                ? 'text-blue-light'
                : percent > 40
                ? 'text-button'
                : 'text-pink-dark'
            }`}
          >{`${percent}% phù hợp`}</p>
        </div>
      ) : (
        <div className="px-3 py-[2px] rounded-full bg-nude w-fit">
          <p className="text-p16-bold text-grey-2">Chưa kiểm tra năng lực</p>
        </div>
      )}
    </div>
  )
}

CvJobCompatibility.propTypes = {}

export default CvJobCompatibility
