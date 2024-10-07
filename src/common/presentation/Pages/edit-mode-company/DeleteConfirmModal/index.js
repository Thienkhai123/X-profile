import Button from 'common/presentation/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const DeleteConfirmModal = (props) => {
  const {
    title,
    desc,
    handleClickDelete = () => {},
    handleClickCancel = () => {}
  } = props

  return (
    <div className="bg-white max-w-[416px] sm:max-h-[80vh] max-h-[400px] flex flex-col items-center justify-center ">
      <div className="flex justify-center mb-[24px]">
        <Image
          src="/images/departmentWarning.png"
          alt=""
          width={88}
          height={88}
          quality={100}
        />
      </div>
      <div className=" mb-[40px]">
        <p className="text-p20-bold mb-[16px] text-center">{title}</p>
        <p className="text-p14 text-grey-2 text-center">{desc}</p>
      </div>
      <div className="flex items-center justify-center gap-[16px]">
        <Button
          title="Hủy"
          rounded="rounded-[8px]"
          background={'bg-[#E6E6E6]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-[44px]"
          width="w-[200px]"
          textWeight={'text-p18 font-bold'}
          onClick={() => handleClickCancel()}
        />
        <Button
          title="Xác nhận"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-[44px]"
          width="w-[200px]"
          textWeight={'text-p18 font-bold'}
          onClick={() => handleClickDelete()}
        />
      </div>
    </div>
  )
}

DeleteConfirmModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
DeleteConfirmModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default DeleteConfirmModal
