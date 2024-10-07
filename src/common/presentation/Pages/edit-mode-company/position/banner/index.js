import BlockEditorContainer from 'common/container/block-editor'
import useModal from 'common/hooks/useModal'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  deactivateCampaign,
  getBannerEditPosition,
  getCampaignPriceBannerPosition,
  selectInitSatePosition,
  updatePositionBannerEdit,
  updatePositionBannerImageUpload
} from 'store/app/edit-mode-company/position/bannerSlice'
import { urlToFile } from 'store/helper/functionHelper'
import {
  convertToWebp,
  getPresignedUrlByAxios
} from 'store/helper/serviceHelper'
import BannerPositionEditMode from './bannerPositionEditMode'
import BannerPositionViewMode from './bannerPositionViewMode'
import ModalRecruitmentBannerPosition from './modalRecruitmentBannerPosition'
import Modal from 'common/presentation/Modal'
import {
  getJobCategory,
  selectJobCategory,
  selectUserProfile
} from 'store/app/userSlice'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import {
  getAllJobLevels,
  selectAddressBook,
  selectAllJobLevels
} from 'store/app/jobSlice'
import {
  getAddressBooksCompany,
  selectFooterAddressBook
} from 'store/app/edit-mode-company/profile/footerSlice'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import ModalRecruitmentDetail from './modalRecruitmentDetail'

const BannerPositionEdit = (props) => {
  const {
    editmode = false,
    errors = null,
    handleResetErrors = () => {},
    views = 0
  } = props
  const dispatch = useDispatch()
  const [persent, setPersent] = useState({
    onUpload: false,
    upload: 0
  })
  const { query } = useRouter()
  const { departmentPositionId } = query || {}
  const { profile, profileCompany, profileDepartment, imageUpload } =
    useSelector(selectInitSatePosition)
  const jobCategory = useSelector(selectAllJobLevels)
  const addressBooks = useSelector(selectFooterAddressBook)
  const user = useSelector(selectUserProfile)
  const [cropModal, toggleCropModal] = useModal()
  const [open, toggleModal] = useModal()
  const [open2, toggleModal2] = useModal()
  const [modalDetail, toggleModalDetail] = useModal()

  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    if (profileCompany.companyId && profile.departmentId) {
      titleBreadCrumbs.push(
        {
          name: profileCompany.name,
          href: `profile-company/${profileCompany.companyId}/edit`
        },
        {
          name: profileDepartment.name || 'X-Department',
          href: `profile-company/${profileCompany.companyId}/${profileDepartment.departmentId}/edit`
        },
        {
          name: profile.name,
          href: `profile-company/${profileCompany.companyId}/${profileDepartment.departmentId}/${profile.departmentPositionId}`
        }
      )
    }
    return titleBreadCrumbs
  }
  const handleToggleModal = () => {
    toggleModal()
    if (!open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  const handleToggleModalDetail = () => {
    toggleModalDetail()
    if (!modalDetail) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }
  const onChangeImageUpload = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updatePositionBannerImageUpload(reader.result))
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
    const imgUrl = await convertToWebp(file, 'User/' + user?.userId)
    await getPresignedUrlByAxios(file, 'User/' + user?.userId, (value) =>
      setPersent({ onUpload: true, upload: value })
    )
    if (imgUrl) {
      dispatch(updatePositionBannerEdit({ ...profile, avatarUrl: imgUrl }))
      setPersent({ onUpload: false, upload: 0 })
    }
  }

  const handleDeactivateCampaign = async () => {
    const res = await dispatch(
      deactivateCampaign({
        recruitmentCampaignId: profile?.currentRecruitmentCampaignId
      })
    )
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage || 'Có lỗi xảy ra'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    } else {
      toast(
        AlertSuccess({
          title: 'Tin tuyển dụng của bạn đã được tắt'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
    if (departmentPositionId) {
      dispatch(getBannerEditPosition(query))
    }
    toggleModal2()
    handleToggleModalDetail()
    // ... add function here
    // handleShowViewMode()
  }

  useEffect(() => {
    if (departmentPositionId) {
      dispatch(getBannerEditPosition(query))
      dispatch(getCampaignPriceBannerPosition())
      dispatch(getAllJobLevels())
      dispatch(getAddressBooksCompany(parseInt(query?.companyId)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentPositionId])

  return (
    <div className="bg-white py-[52px] relative">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <BannerPositionEditMode
            checkUpload={persent.onUpload}
            persent={persent.upload}
            breadCrumbsTitle={breadCrumbsTitle()}
            profilePosition={profile}
            onChangeImageUpload={onChangeImageUpload}
            toggleModal={toggleModal}
            toggleModal2={toggleModal2}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        }
        viewState={
          <BannerPositionViewMode
            breadCrumbsTitle={breadCrumbsTitle()}
            profilePosition={profile}
            toggleModal={handleToggleModal}
            toggleModal2={toggleModal2}
            toggleModalDetail={handleToggleModalDetail}
            seenNumber={views}
          />
        }
        // extraStartIconsEditState={[
        //   {
        //     name: 'upload',
        //     action: toggleModal2,
        //     props: {
        //       width: '24',
        //       height: '24'
        //     }
        //   }
        // ]}
      />

      <DialogCropImage
        aspect={514 / 310}
        src={imageUpload}
        isVisible={cropModal}
        handleOnClose={toggleCropModal}
        handleCropImage={handleCropImageComplete}
      />

      <Modal
        open={open}
        toggleModal={handleToggleModal}
        childStyle="w-screen  xl:w-[1172px] h-fit translate-y-20 mt-4 transition-all animate-fadeIn shadow-md p-10 bg-white rounded-2xl"
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24 duration-500 overflow-y-scroll custom-scrollbar`}
        title="Thiết lập chiến dịch tuyển dụng"
        styleTitle="text-p28-bold text-neutral"
      >
        <ModalRecruitmentBannerPosition
          addressBooks={addressBooks}
          toggleModal={handleToggleModal}
          jobCategory={jobCategory}
          isOpen={open}
        />
      </Modal>

      <Modal
        open={modalDetail}
        useClickOutside={!open2}
        toggleModal={handleToggleModalDetail}
        childStyle="w-screen h-fit xl:w-[720px] min-h-[988px] translate-y-20 mt-4 transition-all animate-fadeIn shadow-md p-10 bg-white rounded-2xl"
        modalStyle={`w-[100vw] h-[100vh] bg-black/30  z-[10000] fixed flex justify-center items-start  left-[calc(0%)] top-[calc(0%)] transition-all pb-24 duration-500 overflow-y-scroll custom-scrollbar`}
        title="Chi tiết chiến dịch tuyển dụng"
        styleTitle="text-p28-bold text-neutral"
      >
        <ModalRecruitmentDetail
          recruitmentCampaignId={profile?.currentRecruitmentCampaignId}
          toggleModal={handleToggleModalDetail}
          isOpen={modalDetail}
          toggleModal2={toggleModal2}
        />
      </Modal>

      <Modal
        open={open2}
        useClickOutside={false}
        toggleModal={toggleModal2}
        childStyle="w-screen h-fit sm:w-[480px] mt-4 shadow-md p-8 bg-white rounded-2xl"
      >
        <div className="flex flex-col">
          <div className="flex justify-center mb-6">
            <Image src="/images/finish.png" alt="" width={88} height={76.04} />
          </div>
          <div className="max-w-[240px] mx-auto mb-10">
            <p className="text-center text-p20-bold text-neutral">
              Bạn có chắc muốn tắt tin tuyển dụng này?
            </p>
          </div>
          <div className="flex justify-around  gap-[16px]">
            <Button
              type="button"
              title="Huỷ"
              width="w-[200px]"
              height="h-[44px]"
              margin="m-0"
              padding="py-[13px]"
              background="bg-grey-4"
              rounded="rounded-lg"
              textWeight={'sm:text-p18-bold text-p14-bold'}
              onClick={toggleModal2}
            />
            <Button
              title="Tắt tuyển dụng"
              width="w-[200px]"
              height="h-[44px]"
              margin="m-0"
              padding="py-[13px]"
              rounded="rounded-lg"
              textWeight={'sm:text-p18-bold text-p14-bold'}
              onClick={handleDeactivateCampaign}
            />
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default BannerPositionEdit
