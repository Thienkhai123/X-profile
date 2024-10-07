import React from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'

const ModalDelete = (props) => {
  const { id, onClickCancel, onClickDelete, ind } = props
  return (
    <div className="flex flex-col ">
      <div className="flex justify-center mb-[24px]">
        <Image
          src="/images/finish.png"
          quality={100}
          alt=""
          width={88}
          height={76}
        />
      </div>
      <div className="text-center text-h4 text-neutral mb-[40px]">
        Bạn có chắc muốn xóa kỹ năng này?
      </div>
      <div className="flex justify-center gap-[16px]">
        <Button
          type="button"
          title="Hủy"
          width="w-[200px]"
          margin="m-0"
          padding="py-2"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={() => onClickCancel()}
          height="h-[44px]"
          background="bg-[#E6E6E6]"
          rounded="rounded-[8px]"
        />
        <Button
          title="Xác nhận"
          width="w-[200px]"
          margin="m-0"
          padding="py-2"
          background="bg-button"
          textWeight={'sm:text-p18-bold text-p14-bold'}
          onClick={() => {
            onClickDelete(id, ind)
          }}
          height="h-[44px]"
          rounded="rounded-[8px]"
        />
      </div>
    </div>
  )
}

ModalDelete.propTypes = {}
ModalDelete.defaultProps = {}

export default ModalDelete
