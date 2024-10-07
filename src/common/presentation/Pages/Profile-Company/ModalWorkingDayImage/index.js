import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'

const ModalWorkingDayImage = (props) => {
  const {
    logoList,
    onChange = () => {},
    toggleModalImage = () => {},
    index
  } = props

  const [imageChoose, setImageChoose] = useState({
    id: 0,
    imageUrl: '',
    imageId: ''
  })

  return (
    <div>
      <div className="grid grid-cols-4 py-[12px] px-[4px] gap-[16px] max-h-[346px] overflow-y-auto my-[40px]">
        {logoList.map((e, ind) => {
          return (
            <div key={ind}>
              <div
                className={` p-[16px] w-[104px] h-[94px]  flex justify-center rounded-[8px] hover:cursor-pointer hover:scale-105 duration-200   ${
                  imageChoose.id === e.imageId
                    ? 'border border-button'
                    : 'border border-grey-4'
                }`}
                onClick={() => {
                  setImageChoose({
                    id: e.imageId,
                    imageUrl: e.imageUrl,
                    imageId: e.imageId
                  })
                }}
              >
                <Image
                  width={88}
                  height={78}
                  src={e.imageUrl}
                  alt=""
                  objectFit="cover"
                />
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex justify-center mt-[60px]">
        <Button
          title="Xác nhận"
          width="w-[240px]"
          height="h-[48px]"
          rounded="rounded-[8px]"
          onClick={() => {
            onChange(
              {
                id: index,
                imageUrl: imageChoose.imageUrl,
                imageId: imageChoose.imageId
              },
              `WorkingDay_imageUrl_${index}`
            )
            toggleModalImage()
          }}
        />
      </div>
    </div>
  )
}

ModalWorkingDayImage.propTypes = {}
ModalWorkingDayImage.defaultProps = {}

export default ModalWorkingDayImage
