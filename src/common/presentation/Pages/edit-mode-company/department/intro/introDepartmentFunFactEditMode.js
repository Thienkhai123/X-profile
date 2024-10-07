import useModal from 'common/hooks/useModal'
import Button from 'common/presentation/Button'
import FieldDetailItemEdit from 'common/presentation/Pages/Profile-Company/FieldDetailItemEdit'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import cloneDeep from 'lodash/cloneDeep'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  selectAvatarUrlUpload,
  selectFunFactImages,
  updateAvatarUrl,
  updateFunfactIntro
} from 'store/app/edit-mode-company/department/introSlice'
import { urlToFile } from 'store/helper/functionHelper'
import { convertToWebp } from 'store/helper/serviceHelper'
import XProfileIcon from 'common/presentation/Icons'
import FunFactImageModal from './FunFactImageModal'
import Modal from 'common/presentation/Modal'
import { selectUserProfile } from 'store/app/userSlice'

const IntroDepartmentFunFactEditMode = ({
  toggleModalFunfact = () => {},
  openFunfact = false,
  funfacts = [],
  errors = '',
  isFunfactsNull,
  handleResetErrors = () => {}
}) => {
  const dispatch = useDispatch()
  const avatarUrlUpload = useSelector(selectAvatarUrlUpload)
  const funFactImages = useSelector(selectFunFactImages)
  const user = useSelector(selectUserProfile)
  const [openModalImages, toggleModalImage] = useModal()
  const [selectedId, setSelectedId] = useState(null)
  const [index, setIndex] = useState(0)
  const [selectedImageId, setSelectedImageId] = useState(0)

  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)
      const imgUrl = await convertToWebp(file, 'User/' + user?.userId)
      const cloneFunFacts = cloneDeep(funfacts)
      cloneFunFacts[selectedId] = {
        ...cloneFunFacts[selectedId],
        imageUrl: imgUrl
      }
      dispatch(updateFunfactIntro([...cloneFunFacts]))
    }
  }

  const handleAddItem = () => {
    dispatch(
      updateFunfactIntro([
        ...funfacts,
        {
          name: '',
          description: '',
          imageUrl: '',
          isCreate: true,
          funfactId: 0
        }
      ])
    )
    handleResetErrors('Funfacts')
  }

  const handleUploadAvatarUrl = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateAvatarUrl(reader.result))
        toggleModalFunfact()
      })
    }
  }

  const handleChangeText = (payload, ind) => {
    const cloneFunFacts = cloneDeep(funfacts)
    cloneFunFacts[ind] = { ...cloneFunFacts[ind], ...payload }
    dispatch(updateFunfactIntro([...cloneFunFacts]))
  }

  const handleChangeImage = (payload) => {
    dispatch(updateAvatarUrl(payload))
  }

  const handleAccessImage = () => {
    const cloneFunFacts = cloneDeep(funfacts)
    cloneFunFacts[index] = {
      ...cloneFunFacts[index],
      imageUrl: avatarUrlUpload
    }
    dispatch(updateFunfactIntro([...cloneFunFacts]))
    dispatch(updateAvatarUrl(''))
    setSelectedImageId()
    toggleModalImage()
  }

  const handleDelete = (ind) => {
    const cloneFunFacts = cloneDeep(funfacts)
    cloneFunFacts.splice(ind, 1)
    dispatch(updateFunfactIntro([...cloneFunFacts]))
  }

  return (
    <div
      id="Funfacts"
      className="bg-white rounded-lg p-8 md:w-1/2 w-full xl:mt-10 xl:mb-12"
    >
      <p className="sm:text-p20-bold text-p16-bold text-center ">
        Những sự thật thú vị
      </p>
      <div className="min-h-[24px]">
        {errors?.Funfacts && (
          <p className="text-p16 text-semantic-red my-2 ">
            {funfacts?.length < 3
              ? ' Bạn phải thêm ít nhất ba sự thật '
              : isFunfactsNull
              ? 'Không được để trống hình,tiêu đề, nội dung'
              : ''}
          </p>
        )}
      </div>
      {funfacts?.map((fact, index) => {
        const { name, description, imageUrl } = fact
        return (
          <div key={index}>
            <FieldDetailItemEdit
              name={name}
              description={description}
              imageUrl={imageUrl}
              index={index}
              onChangeText={handleChangeText}
              onChangeImage={handleUploadAvatarUrl}
              setSelectedId={setSelectedId}
              onDelete={handleDelete}
              toggleModalImage={toggleModalImage}
              setIndex={setIndex}
            />
          </div>
        )
      })}

      {funfacts.length < 5 && (
        <div
          className="cursor-pointer flex gap-[12px] items-center mt-[32px]"
          onClick={handleAddItem}
        >
          <XProfileIcon name="add" width="16" height="16" stroke="#294F9B" />
          <p className="sm:text-p18-bold text-p16 text-button-2">
            Thêm sự thật
          </p>
        </div>
      )}

      <div>
        <DialogCropImage
          src={avatarUrlUpload}
          isVisible={openFunfact}
          handleOnClose={toggleModalFunfact}
          handleCropImage={handleCropImageComplete}
        />
      </div>
      <Modal
        toggleModal={toggleModalImage}
        open={openModalImages}
        title="Chọn hình minh hoạ sự thật thú vị"
        styleTitle="text-p28-bold text-black"
      >
        <FunFactImageModal
          selectedImageId={selectedImageId}
          setSelectedImageId={setSelectedImageId}
          achivementImages={funFactImages}
          toggleModal={toggleModalImage}
          onChangeEdit={handleChangeImage}
          handleAccessImage={handleAccessImage}
        />
      </Modal>
    </div>
  )
}

export default IntroDepartmentFunFactEditMode
