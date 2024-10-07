import Button from 'common/presentation/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const BenefitsImageModal = (props) => {
  const {
    benifitsImages,
    toggleModal,
    selectedImageId,
    setSelectedImageId,
    editingId,
    benefitsList = [],
    onChangeEdit = () => {}
  } = props

  useEffect(() => {
    if (selectedImageId) {
      const { imageUrl, imageId, tag } =
        benifitsImages.find((img) => img.imageId === selectedImageId) || {}
      onChangeEdit(
        {
          ...benefitsList[editingId],
          id: editingId,
          imageUrl: imageUrl,
          imageId: imageId,
          tag: tag
        },
        `Benefits_imageUrl_${editingId}`
      )
    }
    // else {
    //       if (imageId === 0) {
    //         setAvatar('/images/uploadAvatarEdit.png')
    //       } else {
    //         const { imageUrl } =
    //           achivementImages?.find((img) => img.imageId === imageId) || {}
    //         onChangeEdit({ id: index, imageUrl: imageUrl })
    //       }
    //     }
  }, [selectedImageId, editingId])
  return (
    <div className="bg-white sm:max-h-[80vh] max-h-[400px] overflow-y-auto ">
      {/* <p className="text-p20-bold text-black">Chọn hình phúc lợi</p> */}
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[40px] w-full my-[40px]">
        {[...benifitsImages]
          ?.sort((a, b) => (a.position > b.position ? 1 : -1))
          ?.map((image) => {
            const { imageId, imageUrl } = image || {}
            return (
              <div
                key={`image-achievement-${imageId}`}
                className={`relative w-[100px] h-[100px] p-[12px] border-[2px] rounded-[8px] ${
                  selectedImageId === imageId
                    ? 'border-blue-light'
                    : ' border-stoke'
                }`}
                onClick={() => setSelectedImageId(imageId)}
              >
                <Image
                  alt={`achievement-${imageId}`}
                  src={imageUrl}
                  layout="fill"
                />
              </div>
            )
          })}
      </div>
      <div className="flex justify-end">
        <Button
          title="Xác nhận"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-[56px]"
          width="w-[149px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          disabled={selectedImageId === 0}
          onClick={() => toggleModal()}
        />
      </div>
    </div>
  )
}

BenefitsImageModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
BenefitsImageModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default BenefitsImageModal
