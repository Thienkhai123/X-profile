import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const SystemImageModal = (props) => {
  const {
    systemImages,
    toggleModal,
    selectedImageId,
    setSelectedImageId,
    editingId,
    positionList = [],
    onChangeEdit = () => {}
  } = props
  const { imageUrl, imageId, tag } =
    systemImages.find((img) => img.imageId === selectedImageId) || {}
  const handleClickAdd = () => {
    if (selectedImageId) {
      const { imageUrl, imageId, tag } =
        systemImages.find((img) => img.imageId === selectedImageId) || {}
      onChangeEdit(
        {
          ...positionList[editingId],
          id: editingId,
          imageUrl: imageUrl,
          imageId: imageId,
          tag: tag
        },
        `roadMap_imageUrl_${editingId}`
      )
    }
  }
  useEffect(() => {
    if (positionList[editingId].imageId === 0) {
      setSelectedImageId(23)
    } else {
      setSelectedImageId(positionList[editingId].imageId)
    }
  }, [editingId])
  // useEffect(() => {
  //   if (selectedImageId) {
  //     const { imageUrl, imageId, tag } =
  //       systemImages.find((img) => img.imageId === selectedImageId) || {}
  //     onChangeEdit({
  //       ...positionList[editingId],
  //       id: editingId,
  //       imageUrl: imageUrl,
  //       imageId: imageId,
  //       tag: tag
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
    <div>
      <div className="bg-white sm:max-h-[54vh] max-h-[400px] overflow-y-auto custom-scrollbar p-8 my-[40px]">
        {/* <p className="text-p20-bold text-black">Lộ trình phát triển</p> */}
        <div className="w-[224px] h-[280px] relative mx-auto">
          {selectedImageId && systemImages && (
            <Image alt="" src={imageUrl} layout="fill" />
          )}
        </div>
        <div className="grid xl:grid-cols-7 md:grid-cols-3 grid-cols-2 gap-[40px] mt-[32px] w-full mb-[40px]">
          {[...systemImages]
            ?.sort((a, b) => (a.position > b.position ? 1 : -1))
            ?.map((image) => {
              const { imageId, imageUrl } = image || {}
              return (
                <div
                  key={`image-achievement-${imageId}`}
                  className={`flex flex-col items-center gap-6`}
                >
                  <div
                    className={`relative w-[96px] h-[120px] 
                
                `}
                    onClick={() => setSelectedImageId(imageId)}
                  >
                    <Image
                      alt={`achievement-${imageId}`}
                      src={imageUrl}
                      layout="fill"
                    />
                  </div>
                  <div
                    onClick={() => setSelectedImageId(imageId)}
                    className={`w-8 h-8 rounded-full border border-button ${
                      selectedImageId === imageId ? 'bg-button' : ''
                    } flex items-center justify-center`}
                  >
                    {selectedImageId === imageId && (
                      <XProfileIcon name="quizCheck" />
                    )}
                  </div>
                </div>
              )
            })}
        </div>
        <div className="my-10 flex gap-6 items-center justify-between w-full">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <label
                htmlFor="name"
                className="block  mb-4 text-p18 text-neutral"
              >
                Tên vị trí
              </label>
              <div className="flex justify-end ">
                <p className="text-grey-2 text-p14">
                  {20 - (positionList[editingId]?.name?.length || 0)}
                </p>
              </div>
            </div>
            <input
              maxLength={20}
              id="name"
              className=" w-full h-[48px]  text-lg font-bold text-neutral border border-grey-3 rounded-lg focus:outline-button px-3"
              placeholder="Nhập tên vị trí"
              value={positionList[editingId]?.name || ''}
              onChange={(e) =>
                onChangeEdit(
                  {
                    ...positionList[editingId],
                    id: editingId,
                    name: e?.target?.value
                  },
                  `roadMap_name_${editingId}`
                )
              }
            />
          </div>
          <div className="w-full">
            <label className="block mb-4 text-p18 text-neutral">
              Thời gian đạt lộ trình (năm)
            </label>
            <input
              className=" w-full h-[48px]  text-lg font-bold text-neutral border border-grey-3 rounded-lg focus:outline-button px-3"
              placeholder="Nhập số năm"
              type="text"
              maxLength={10}
              onInput={(e) => (e.target.value = e.target.value.slice(0, 10))}
              value={positionList[editingId]?.description || ''}
              onChange={(e) =>
                onChangeEdit({
                  ...positionList[editingId],
                  id: editingId,
                  description: e?.target?.value || ''
                  // totalTime: e?.target?.value
                })
              }
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-4">
        <Button
          title="Huỷ"
          rounded="rounded-[8px]"
          background={'bg-grey-4'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-auto"
          width="w-[120px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
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
          width="w-[149px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          disabled={selectedImageId === 0}
          onClick={() => {
            toggleModal(), handleClickAdd()
          }}
        />
      </div>
    </div>
  )
}

SystemImageModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
SystemImageModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default SystemImageModal
