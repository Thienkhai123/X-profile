import { useRouter } from 'next/router'
import BannerApplyEditMode from './bannerApplyEditMode'
import BannerApplyViewMode from './bannerApplyViewMode'

import BlockEditorContainer from 'common/container/block-editor'
import { useDispatch } from 'react-redux'
import { selectInitSatePosition } from 'store/app/edit-mode-company/position/bannerSlice'
import {
  selectBannerProfile,
  selectImageBannerApplyUrl,
  updateBannerApplyUrl,
  updateBannerEdit
} from 'store/app/edit-mode-company/profile/bannerSlice'
import { useSelector } from 'react-redux'
import useModal from 'common/hooks/useModal'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import {
  convertToWebp,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import { urlToFile } from 'store/helper/functionHelper'
import { selectUserProfile } from 'store/app/userSlice'
import { useState } from 'react'

const BannerApplyEdit = (props) => {
  const { pageEditMode } = props
  const dispatch = useDispatch()
  const { query } = useRouter()
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })
  const { departmentPositionId } = query || {}
  const [cropModal, toggleCropModal] = useModal()
  const profile = useSelector(selectBannerProfile)
  const user = useSelector(selectUserProfile)
  const bannerApply = useSelector(selectImageBannerApplyUrl)

  const handleRemoveItem = (id) => {
    dispatch(
      updateBannerEdit({
        ...profile,
        applyBannerUrl: '',
        meta: { ...profile?.meta, applyBannerUrl: '' }
      })
    )
  }
  const onChangeImageUpload = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateBannerApplyUrl(reader.result))
        toggleCropModal()
      })
    }
  }
  const handleCropImageComplete = async (src) => {
    if (src) {
      const file = await urlToFile(src)

      handleUploadAvatar(file)
    }
  }
  const handleUploadAvatar = async (file) => {
    await getPresignedUrlByAxios(file, 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    const imgUrl = await convertToWebp(file, 'User/' + user?.userId)

    if (imgUrl) {
      dispatch(updateBannerEdit({ ...profile, applyBannerUrl: imgUrl }))
      setPersent({ onUpload: false, upload: 0 })
    }
  }

  return (
    <div className="bg-light-nude flex justify-center relative mt-8 mb-[3.25rem]">
      <BlockEditorContainer
        editmode={pageEditMode}
        editState={
          <BannerApplyEditMode
            checkUpload={persent.onUpload}
            persent={persent.upload}
            profile={profile}
            onChangeImageUpload={onChangeImageUpload}
            handleRemoveItem={handleRemoveItem}
          />
        }
        viewState={<BannerApplyViewMode profile={profile} />}
      />
      <DialogCropImage
        aspect={1440 / 296}
        src={bannerApply}
        isVisible={cropModal}
        handleOnClose={toggleCropModal}
        handleCropImage={handleCropImageComplete}
      />
    </div>
  )
}

export default BannerApplyEdit
