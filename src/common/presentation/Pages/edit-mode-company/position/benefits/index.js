import BenefitsPositionEditMode from './benefitsPositionEditMode'
import BenefitsPositionViewMode from './benefitsPositionViewMode'
import BlockEditorContainer from 'common/container/block-editor'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import {
  addBenefit,
  removeBenefit,
  selectBenefitsPositoninitState,
  updateBenefit
} from 'store/app/edit-mode-company/position/benefitsSlice'
import Modal from 'common/presentation/Modal'
import BenefitsImageModal from './benefitsImageModal'

const BenefitsPositionEdit = (props) => {
  const {
    pageEditMode,
    errors,
    setErrors,
    handleResetErrors = () => {}
  } = props
  const dispatch = useDispatch()
  const { benefits, benefitsDefault, systemImages } = useSelector(
    selectBenefitsPositoninitState
  )
  const [openModalImages, setOpenModalImages] = useState(false)
  const [selectedImageId, setSelectedImageId] = useState(0)
  const [editingId, setEditingId] = useState(null)
  const toggleModal = (id) => {
    if (!openModalImages) {
      setEditingId(id)
      setOpenModalImages(true)
    } else {
      setEditingId(null)
      setOpenModalImages(false)
    }
  }

  const handleAdd = () => {
    const payload = {
      position: 0,
      name: '',
      description: '',
      imageUrl: '',
      imageId: 0
    }
    dispatch(addBenefit(payload))
    handleResetErrors('benefitList')
  }
  const onChangeEdit = (data, id) => {
    dispatch(updateBenefit(data))
    handleResetErrors(id)
  }
  const handleRemoveItem = (id) => {
    dispatch(removeBenefit({ id }))
    handleResetErrors([
      `Benefits_desciption_${id}`,
      `Benefits_imageUrl_${id}`,
      `Benefits_name_${id}`
    ])
  }

  const errorsList = []
  const errorsArray = Object.values(errors || {}) || []
  if (errorsArray?.length > 0) {
    errorsArray?.forEach((elm) => {
      if (elm.id !== '') {
        errorsList.push(elm.id)
      }
    })
  }

  useEffect(() => {
    if (benefits?.length === 0 || !benefits) {
      for (let i = 0; i < 3; i++) {
        handleAdd()
      }
    }
  }, [benefits])

  return (
    <div className="bg-stoke  relative">
      <BlockEditorContainer
        editmode={pageEditMode}
        editState={
          <BenefitsPositionEditMode
            benefitsList={benefits}
            handleAdd={handleAdd}
            onChangeEdit={onChangeEdit}
            handleRemoveItem={handleRemoveItem}
            toggleModal={toggleModal}
            errors={errors}
            errorsList={errorsList || []}
          />
        }
        viewState={<BenefitsPositionViewMode benefitsList={benefitsDefault} />}
      />

      <Modal
        toggleModal={toggleModal}
        open={openModalImages}
        title="Chọn hình phúc lợi"
        styleTitle="text-p28-bold text-black"
      >
        <BenefitsImageModal
          benifitsImages={systemImages}
          selectedImageId={selectedImageId}
          toggleModal={toggleModal}
          setSelectedImageId={setSelectedImageId}
          editingId={editingId}
          onChangeEdit={onChangeEdit}
          benefitsList={benefits}
        />
      </Modal>
    </div>
  )
}

export default BenefitsPositionEdit
