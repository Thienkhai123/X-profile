import Button from 'common/presentation/Button'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { useEffect } from 'react'

const FunFactImageModal = (props) => {
  const {
    achivementImages,
    toggleModal,
    selectedImageId,
    setSelectedImageId,
    editingId,
    highlight = [],
    onChangeEdit = () => {},
    handleAccessImage = () => {}
  } = props

  return (
    <div>
      <div className="bg-white sm:max-h-[80vh] max-h-[400px] overflow-y-auto custom-scrollbar my-[40px] ">
        {/* <p className="text-p20-bold text-black">
        Chọn hình minh hoạ sự thật thú vị
      </p> */}
        <div className="flex justify-center">
          <div className="grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[40px] max-w-[576px] w-full  max-h-[240px] ">
            {achivementImages?.map((image) => {
              const { imageId, imageUrl } = image || {}
              return (
                <div
                  key={`image-achievement-${imageId}`}
                  className={`cursor-pointer relative w-[100px] h-[100px] p-[10px] border-[2px] rounded-[8px] ${
                    selectedImageId === imageId
                      ? 'border-blue-light'
                      : ' border-stoke'
                  }`}
                  onClick={() => {
                    onChangeEdit(imageUrl)
                    setSelectedImageId(imageId)
                  }}
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
        </div>
      </div>
      <div className="flex justify-end gap-[16px]">
        <Button
          title="Hủy"
          rounded="rounded-[8px]"
          background={'bg-grey-4'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-[56px]"
          width="w-[99px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          disabled={selectedImageId === 0}
          onClick={() => handleAccessImage()}
        />
        <Button
          title="Chọn"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-[10px] px-[20px]"
          height="h-[56px]"
          width="w-[112px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          disabled={selectedImageId === 0}
          onClick={() => handleAccessImage()}
        />
      </div>
    </div>
  )
}

FunFactImageModal.propTypes = {
  selectedImageId: PropTypes.number,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func
}
FunFactImageModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {}
}

export default FunFactImageModal
