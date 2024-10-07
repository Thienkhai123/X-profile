import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import PropTypes from 'prop-types'

const AchievementModal = (props) => {
  const {
    achivementImages,
    toggleModal,
    selectedImageId,
    setSelectedImageId,
    handleSubmit
  } = props
  return (
    <div className="bg-white   overflow-y-auto">
      <div className="flex gap-10 justify-between items-center">
        <p className="xl:text-p28-bold text-p18-bold text-black">
          Chọn ảnh từ thư viện
        </p>
        <div onClick={() => toggleModal()} className="cursor-pointer">
          <XProfileIcon name="cancel" width="14" height="14" />
        </div>
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
                width={80}
                height={80}
                objectFit="contain"
              />
            </div>
            // superSmall:w-[80px] superSmall:h-[80px]
          )
        })}
      </div>
      <div className="flex items-center xl:justify-end justify-center w-full gap-4">
        <Button
          title="Huỷ"
          rounded="rounded-[8px]"
          background={'bg-grey-4'}
          color="text-neutral"
          padding="py-3 px-8"
          height="h-auto"
          width="xl:w-[112px] w-[120px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          onClick={() => toggleModal()}
        />
        <Button
          title="Chọn"
          rounded="rounded-[8px]"
          background={'bg-[#F6BB3A]'}
          color="text-neutral"
          padding="py-3 px-8"
          height="h-auto"
          width="xl:w-[112px] w-[140px]"
          textWeight={'text-p18 font-bold'}
          margin="mx-auto"
          disabled={selectedImageId === 0}
          onClick={() => handleSubmit()}
        />
      </div>
    </div>
  )
}

AchievementModal.propTypes = {
  selectedImageId: PropTypes.any,
  achivementImages: PropTypes.array,
  toggleModal: PropTypes.func,
  setSelectedImageId: PropTypes.func,
  handleSubmit: PropTypes.func
}
AchievementModal.defaultProps = {
  selectedImageId: 0,
  achivementImages: [],
  toggleModal: () => {},
  setSelectedImageId: () => {},
  handleSubmit: () => {}
}

export default AchievementModal
