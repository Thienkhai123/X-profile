import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'

const VideoModal = (props) => {
  const { handleCurrentTimeSuccess, handleCurrentTimeUnSuccess } = props
  return (
    <div className="xl:p-[20px] p-[8px] flex flex-col gap-[20px]">
      <div className="flex justify-center mb-[24px]">
        <Image
          src="/images/departmentWarning.png"
          alt=""
          width={88}
          height={88}
          quality={100}
        />
      </div>
      <p className="sm:text-p20-bold text-p14-bold text-center">
        Bạn có muốn xem tiếp tục khóa học?
      </p>
      <div className="flex justify-center gap-[16px]">
        <Button
          title="Hủy"
          height="h-[48px]"
          background="bg-grey-4"
          width="w-[200px]"
          onClick={() => handleCurrentTimeUnSuccess()}
        />
        <Button
          title="Tiếp tục"
          height="h-[48px]"
          width="w-[200px]"
          onClick={() => handleCurrentTimeSuccess()}
        />
      </div>
    </div>
  )
}

VideoModal.propTypes = {}
VideoModal.defaultProps = {}

export default VideoModal
