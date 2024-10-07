import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'

const StepProfile = (props) => {
  const {
    title,
    description,
    isActive = true,
    isShowButton = false,
    handleSubmitAdd,
    isLineActive = true,
    hiddenMoreFirst
  } = props

  const [hiddenMore, setHiddenMore] = useState(false)

  return (
    <div
      className={`flex min-h-[80px] ${!isActive && 'cursor-pointer'}`}
      onMouseLeave={() => setHiddenMore(false)}
      onMouseMove={() => setHiddenMore(true)}
    >
      <div className="flex flex-col items-center">
        <div className="min-w-[40px] min-h-[40px]">
          <div className=" w-[40px] h-[40px] bg-[#F5F5F2] rounded-full">
            {isActive && (
              <Image
                className="rounded-full "
                width={40}
                height={40}
                src="/images/check.png"
                alt="logo_lagi_8_resize.jpg"
              />
            )}
          </div>
        </div>
        {isLineActive && <div className="border-l-[1px] h-full"></div>}
      </div>
      <div className="ml-[24px] pb-[20px] w-full">
        <div className="mb-[4px] flex justify-between w-full">
          <div>
            <p
              className={`  ${
                isActive ? 'text-p18-bold text-neutral' : 'text-p18 text-grey-3'
              }`}
            >
              {title}
            </p>
          </div>
          {!isActive && hiddenMore && (
            <div className="cursor-pointer" onClick={() => handleSubmitAdd()}>
              <p className="text-p18-bold text-button-2">Thêm</p>
            </div>
          )}
        </div>
        {description && (
          <div className="mb-[12px] max-w-[398px]">
            <p className="text-p16 text-grey-1">{description}</p>
          </div>
        )}
        {/* {!isShowButton && (
          <Button
            title="Thêm"
            rounded="rounded-[8px]"
            width="w-[85px]"
            height="h-[36px]"
            onClick={() => handleSubmitAdd()}
          />
        )} */}
      </div>
    </div>
  )
}

StepProfile.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string
}
StepProfile.defaultProps = {
  title: 'Thông tin cá nhân',
  description: ''
}

export default StepProfile
