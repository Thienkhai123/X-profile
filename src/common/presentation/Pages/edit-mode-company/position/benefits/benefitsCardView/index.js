import { HightLightJobMobile } from 'common/presentation/Card/HighlightJob/HightLightJobMobile'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

const BenefitsCardView = (props) => {
  const { imageUrl, description, name } = props

  return (
    <div className="xl:mb-0">
      <div className="flex justify-center mb-6 ">
        <div
          className={`text-center flex flex-col items-center gap-3 justify-center w-[200px]  px-4 py-8 border-grey-2 border-dashed rounded-lg`}
        >
          <div>
            <Image
              src={imageUrl || '/images/Upload.png'}
              width={imageUrl ? 140 : 100}
              height={imageUrl ? 140 : 100}
              objectFit="contain"
              alt=""
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-6">
        <div className="text-center w-[366px] ">
          <p className="xl:text-[36px] leading-[48px] text-p20-bold text-blue-light  line-clamp-1 overflow-ellipsis w-full text-center">
            {name}
          </p>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="text-center w-[366px]">
          <p className="xl:text-p18 text-p12 text-grey-1 line-clamp-3 w-full text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  )
}

BenefitsCardView.propTypes = {}

BenefitsCardView.defaultProps = {}

export default BenefitsCardView
