import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const StaticsImageModal = (props) => {
  const {
    achivementImages,
    toggleModal,
    selectedImageId,
    setSelectedImageId,
    editingId,
    highlight = [],
    onChangeEdit = () => {}
  } = props

  const handleClickAdd = () => {
    if (selectedImageId) {
      const { imageUrl, imageId } =
        achivementImages.find((img) => img.imageId === selectedImageId) || {}
      onChangeEdit(
        {
          ...highlight[editingId],
          id: editingId,
          imageUrl: imageUrl,
          imageId: imageId
        },
        `Static_imageUrl_${editingId}`
      )
    }
  }
  useEffect(() => {
    if (highlight[editingId].imageId === 0) {
      setSelectedImageId(0)
    } else {
      setSelectedImageId(highlight[editingId].imageId)
    }
  }, [editingId])
  // useEffect(() => {
  //   if (selectedImageId) {
  //     const { imageUrl, imageId } =
  //       achivementImages.find((img) => img.imageId === selectedImageId) || {}
  //     onChangeEdit({
  //       ...highlight[editingId],
  //       id: editingId,
  //       imageUrl: imageUrl,
  //       imageId: imageId
  //     })
  //   }
  //   // else {
  //   //       if (imageId === 0) {
  //   //         setAvatar('/images/uploadAvatarEdit.png')
  //   //       } else {
  //   //         const { imageUrl } =
  //   //           achivementImages?.find((img) => img.imageId === imageId) || {}
  //   //         onChangeEdit({ id: index, imageUrl: imageUrl })
  //   //       }
  //   //     }
  // }, [selectedImageId, editingId])
  return (
    <div className="bg-white relative sm:max-h-[80vh] max-h-[400px]  ">
      <div className="flex items-center justify-between">
        {/* <p className="text-p28-bold text-black">Chọn ảnh từ thư viện</p> */}
        {/* <div className="cursor-pointer" onClick={() => toggleModal()}>
          <XProfileIcon name="cross" stroke="#000000" />
        </div> */}
      </div>
      <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 sm:max-h-[36vh] custom-scrollbar overflow-y-auto gap-[32px] mt-[32px] w-full mb-[40px]">
        {achivementImages?.map((image) => {
          const { imageId, imageUrl } = image || {}
          return (
            <div
              key={`image-achievement-${imageId}`}
              className={`relative w-[100px] h-[100px] p-5 border-[2px] rounded-[8px] ${
                selectedImageId === imageId ? 'border-button' : ' border-stoke'
              }`}
              onClick={() => setSelectedImageId(imageId)}
            >
              <Image
                alt={`achievement-${imageId}`}
                src={imageUrl}
                // layout="fill"
                width={80}
                height={80}
                objectFit="contain"
              />
            </div>
          )
        })}
      </div>
      <div className="sticky flex gap-4 justify-end py-4 w-full bg-white bottom-0">
        <Button
          title="Huỷ"
          rounded="rounded-[8px]"
          background={'bg-grey-4'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="w-[112px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          // disabled={selectedImageId === 0}
          onClick={() => {
            toggleModal()
          }}
        />
        <Button
          title="Xác nhận"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="w-[190px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          // disabled={selectedImageId === 0}
          onClick={() => {
            toggleModal(), handleClickAdd()
          }}
        />
      </div>
    </div>
  )
}

StaticsImageModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
StaticsImageModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default StaticsImageModal
