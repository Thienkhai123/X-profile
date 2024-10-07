import React, { useEffect, useRef, useState } from 'react'

import { SliderThumb } from 'common/presentation/Swiper/SliderThumb'

const SliderThumbViewState = (props) => {
  const { medias } = props

  return (
    <div className=" w-full mx-auto py-[24px]">
      <div>
        <p className="text-center text-h2 mt-3">
          Hình ảnh văn hóa doanh nghiệp
        </p>
      </div>
      {medias?.length === 0 && (
        <div className="mt-3">
          <p className="text-center">
            Thêm ảnh để mọi người biết thêm về doanh nghiệp của bạn nhé
          </p>
        </div>
      )}
      {medias?.length > 0 && (
        <div className="max-w-[500px] md:max-w-[800px] xl:max-w-[946px] mx-auto mt-[20px]  px-5 xl:px-0">
          <SliderThumb
            breakpoints={{
              330: {
                slidesPerView: 1.5,
                slidesPerGroup: 1
              },
              1100: {
                slidesPerView: 3,
                slidesPerGroup: 1
              },
              1280: {
                slidesPerView: 5,
                slidesPerGroup: 1
              }
            }}
            hasArrow
            list={medias}
          />
        </div>
      )}
    </div>
  )
}

export default SliderThumbViewState
