import Button from 'common/presentation/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const CancelConfirmModal = (props) => {
  const {
    title,
    desc,
    handleClickContinue = () => {},
    handleClickCancel = () => {}
  } = props

  return (
    <div className="bg-white sm:max-h-[80vh] max-h-[400px] max-w-[416px]">
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
        <p className="text-p16 text-grey-2 text-center">{desc}</p>
      </div>
      <div className="flex items-center justify-center gap-[16px]">
        <Button
          title="Hủy"
          rounded="rounded-[8px]"
          background={'bg-grey-4'}
          color="text-neutral"
          padding="py-[7px] px-[8px]"
          height="h-[44px]"
          width="w-[200px]"
          textWeight={'text-p18 font-bold'}
          onClick={() => handleClickCancel()}
        />
        <Button
          title="Tiếp tục chỉnh sửa"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[7px] px-[8px]"
          height="h-[44px]"
          width="w-[200px]"
          textWeight={'text-p18 font-bold'}
          onClick={() => handleClickContinue()}
        />
      </div>
    </div>
  )
}

CancelConfirmModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
CancelConfirmModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default CancelConfirmModal
