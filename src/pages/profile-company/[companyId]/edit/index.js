import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'

import { useRouter } from 'next/router'

import useTrans from 'common/hooks/useTrans'

import dynamic from 'next/dynamic'
import {
  getViewCountCompanyEditmode,
  hasEditPermission,
  selectCompanyViews
} from 'store/app/companySlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import useEditMode from 'common/hooks/useEditMode'
import ButtonIcon from 'common/presentation/ButtonIcon'
import { selectMenuEdit, updateMenuEdit } from 'store/app/helperSlice'
import EditModeAction from 'common/presentation/Pages/Profile-Company/EditModeAction'
import {
  getBannerEdit,
  saveBannerEdit,
  selectBannerProfile
} from 'store/app/edit-mode-company/profile/bannerSlice'
import { toast } from 'react-toastify'
import {
  getAllImages,
  selectImagesInformation,
  selectInformationProfile
} from 'store/app/edit-mode-company/profile/informationSlice'
import {
  getAllHighLight,
  selectHighlightEdit,
  selectHighlightProfile
} from 'store/app/edit-mode-company/profile/staticsSlice'
import {
  getAllWorkingDays,
  selectItemList,
  selectworkingDayCaption
} from 'store/app/edit-mode-company/profile/workDaySlice'
import {
  getCultureMediaEdit,
  selectCultureMedias
} from 'store/app/edit-mode-company/profile/thumbSlice'
import {
  getAllDepartmentsEdit,
  selectAllDepartmentsEdit
} from 'store/app/edit-mode-company/profile/teamListSlice'
import cloneDeep from 'lodash/cloneDeep'
import FooterEditCompany from 'common/container/Footer/footerEditCompany'
import { GUEST_ROUTES } from 'common/config/app.constants'
import {
  getAddressBooksCompany,
  getFooterEdit,
  selectFooterAddressBook,
  selectFooterProfile
} from 'store/app/edit-mode-company/profile/footerSlice'
import {
  getAllFaqs,
  getFaqRoot,
  selectInitFaqs
} from 'store/app/edit-mode-company/profile/questionsSlice'
import {
  getAllRecruitmentEdit,
  selectInitRecruitList
} from 'store/app/edit-mode-company/profile/recruitListSlice'
import useModal from 'common/hooks/useModal'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Modal from 'common/presentation/Modal'
import { delay } from 'store/helper/functionHelper'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import CancelConfirmModal from 'common/presentation/Pages/edit-mode-company/CancelConfrmModal'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const InternalCourse = dynamic(() =>
  import('common/presentation/Pages/edit-mode-company/company/internalCourse')
)
const BannerEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/BannerEdit')
)
const StaticsEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/StaticsEdit')
)
const InformationEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/InformationEdit')
)
const WorkDayEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/WorkDayEdit')
)
const TeamListEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/TeamListEdit')
)
const RecruitListEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/RecruitListEdit')
)
const DemandSkillsEdit = dynamic(() =>
  import('common/presentation/Pages/home/DemandSkillsEdit')
)
const QuestionsEdit = dynamic(() =>
  import('common/presentation/Pages/Career-Path/QuestionsEdit')
)

const SliderThumbEdit = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/SliderThumbEdit')
)

const showErrorCustom = (fieldName = '', errors = {}, setErrors = () => {}) => {
  toast(
    AlertWaring({
      title: 'Bạn chưa điền đủ thông tin!'
    }),
    {
      toastId: 'alert-save-warning',
      className: 'bg-toast-custom',
      closeButton: false,
      position: 'top-center',
      hideProgressBar: true,
      autoClose: 3000
    }
  )
  let tempErrors = cloneDeep(errors) || {}
  tempErrors[fieldName] = 'Bạn chưa điền đủ thông tin!'
  setErrors({ ...tempErrors })
  const findEmptyEl = document.getElementById(fieldName)
  if (findEmptyEl) {
    findEmptyEl.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }
}

const showErrorCustomArray = (
  fieldName = '',
  tmp = {},
  setErrors = () => {},
  objectContent = {},
  id = 'staticList'
) => {
  toast(
    AlertWaring({
      title: 'Bạn chưa điền đủ thông tin!'
    }),
    {
      toastId: 'alert-save-warning',
      className: 'bg-toast-custom',
      closeButton: false,
      position: 'top-center',
      hideProgressBar: true,
      autoClose: 3000
    }
  )
  tmp[fieldName] = objectContent
  setErrors({ ...tmp })
  const findEmptyEl = document.getElementById(id)
  if (findEmptyEl) {
    findEmptyEl.scrollIntoView({
      behavior: 'auto',
      block: 'center',
      inline: 'center'
    })
  }
}

const ProfileCompanyEdit = () => {
  const FIELDLIST = [
    { name: 'facebook', icon: 'socialFacebook', title: 'Facebook' },

    { name: 'linkedin', icon: 'socialLinkedIn', title: 'LinkedIn' }
  ]
  const trans = useTrans()
  const { FOOTER, FOOTER_PROFILE } = trans
  const dispatch = useDispatch()
  const router = useRouter()
  const { pathname, query } = router
  const { companyId, focus } = router.query
  const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const [showPreview, setShowPreview] = useState(false)
  const [modalShare, toggleModalShare] = useModal()
  const [modalBack, toggleModalBack] = useModal()
  const [tooltip, setTooltip] = useState(null)
  const [errors, setErrors] = useState(null)
  const [uploading, setUploading] = useState(false)
  const menuEdit = useSelector(selectMenuEdit)
  const views = useSelector(selectCompanyViews)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.EDIT.GETBANNEREDIT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEBANNEREDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETINFORMATIONEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEINFORMATIONEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVESTATICSEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLHIGHLIGHT) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETACHIVEMENTIMAGES) ||
      selectLoading(state, APP_TYPES.EDIT.GETCULTUREMEDIAEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETWORKINGDAYS) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEWORKINGDAYS) ||
      selectLoading(state, APP_TYPES.EDIT.GETIMAGEWORKINGDAYS) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLDEPARTMENTEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.SAVETEAMLISTEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.CLONEDEPARMENT) ||
      selectLoading(state, APP_TYPES.HELPER.PRESIGNEDIMAGE) ||
      selectLoading(state, APP_TYPES.JOB.GETALLCITIES) ||
      selectLoading(state, APP_TYPES.JOB.GETALLDISTRICTS) ||
      selectLoading(state, APP_TYPES.JOB.GETALLWARDS)
  )

  const profile = useSelector(selectBannerProfile)
  const addressBooksCompany = useSelector(selectFooterAddressBook)
  const profileInformation = useSelector(selectInformationProfile)
  const profileHighLight = useSelector(selectHighlightProfile)
  const highlight = useSelector(selectHighlightEdit)
  const itemList = useSelector(selectItemList)
  const workingDayCaption = useSelector(selectworkingDayCaption)
  const departments = useSelector(selectAllDepartmentsEdit)
  const footerProfile = useSelector(selectFooterProfile)
  const { faqsEdit, content } = useSelector(selectInitFaqs) || {}
  const { isShowCampaigns, isShowCourses, isShowDepartments, isShowFAQs } =
    footerProfile?.meta || {}
  const { recruitmentSelected } = useSelector(selectInitRecruitList)

  const {
    name,
    bannerUrl,
    avatarUrl,
    shortDescription = '',
    updateProperties = [],
    isHidden,
    tag
  } = profile || {}

  const {
    description,
    addressBooks,
    establishDate,
    websiteUrl,
    googleMapUrl,
    websiteLinkTitle,
    employeeAmount,
    updateProperties: updatePropertiesInfo = [],
    meta
  } = profileInformation || {}

  const listImages = useSelector(selectImagesInformation)
  const cultureMediasImages = useSelector(selectCultureMedias)
  const address = addressBooks?.filter((add) => add.isDefault === true)
  const googleMapUrlDefault = address && address[0]?.googleMapUrl

  const handleResetErrors = (field) => {
    const cloneError = cloneDeep(errors)
    if (Array.isArray(field) > 0) {
      field?.forEach((element) => {
        if (cloneError?.hasOwnProperty(element)) {
          cloneError[element] = ''
          setErrors({
            ...cloneError
          })
        }
      })
    } else {
      if (cloneError?.hasOwnProperty(field)) {
        cloneError[field] = ''
        setErrors({
          ...cloneError
        })
      }
    }
  }

  const toggleMainHeader = () => {
    const el2 = document.getElementById('main-header-company')

    if (el2.style.display !== 'none') {
      el2.style.display = 'none'
    } else {
      el2.style.display = ''
    }
  }

  const onClickEdit = () => {
    toggleMainHeader()
    handleShowEditMode()
    window.onbeforeunload = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
  }

  const onClickCancel = () => {
    dispatch(
      getBannerEdit({
        id: companyId
      })
    )
    dispatch(
      getCultureMediaEdit({
        id: companyId
      })
    )
    dispatch(
      getAllImages({
        id: companyId
      })
    )
    dispatch(getAllFaqs({ id: companyId }))
    dispatch(getAllDepartmentsEdit({ companyId }))
    dispatch(getAllHighLight({ id: companyId }))
    dispatch(getFaqRoot({ companyId: companyId }))
    dispatch(getFooterEdit({ companyId }))
    dispatch(getAllWorkingDays({ id: companyId }))
    dispatch(getAllRecruitmentEdit({ companyId }))
    dispatch(getAddressBooksCompany(parseInt(companyId)))

    handleShowViewMode()
    toggleMainHeader()
    if (modalBack) {
      toggleModalBack()
    }
    setShowPreview(false)
    setErrors(null)
    window.onbeforeunload = function () {
      // blank function do nothing
    }
  }

  const onClickPreview = () => {
    if (!showPreview) {
      setShowPreview(true)
      handleShowViewMode()
    } else {
      setShowPreview(false)
      handleShowEditMode()
    }
  }
  function copyText() {
    // Get the text field
    const copyText = document.getElementById('select-text')

    // Select the text field
    copyText.select()
    copyText.setSelectionRange(0, 99999) // For mobile devices

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.value)

    // Alert the copied text
    setTooltip('Đã sao chép')
  }
  const handleClickSave = async () => {
    let cloneCultureMediasImages = []
    for (let i = 0; i < cultureMediasImages.length; i++) {
      let cloneItem = { ...cultureMediasImages[i] }
      cloneItem.position = i + 1
      cloneCultureMediasImages.push(cloneItem)
    }
    const payload = {
      name,
      bannerUrl,
      companyId,
      avatarUrl,
      shortDescription,
      faq: { content: content, faqAnswers: [...faqsEdit] },
      isShowFAQs: isShowFAQs,
      isShowDepartments: isShowDepartments,
      isShowCampaigns: isShowCampaigns,
      preferedCampaignIds: recruitmentSelected || [],
      updateProperties: [
        'Name',
        'AvatarUrl',
        'ShortDescription',
        'BannerUrl',
        'Images',
        'WebsiteLinkTitle',
        'Description',
        websiteUrl && 'WebsiteUrl',
        'EstablishDate',
        googleMapUrl && 'GoogleMapUrl',
        'EmployeeAmount',
        'Highlights',
        'WorkingDays',
        'CultureMedias',
        'WorkingDayCaption',
        'Departments',
        'AddressBooks',
        'ContactEmail',
        'ContactPhone',
        // 'Address',
        'Socials',
        'Faq',
        'IsShowFAQs',
        'IsShowDepartments',
        'IsShowCampaigns',
        'PreferedCampaignIds',
        'HighlightTitle',
        'IsHidden'
      ],
      description,
      establishDate: establishDate || new Date(),
      websiteUrl,
      websiteLinkTitle:
        websiteLinkTitle !== undefined
          ? websiteLinkTitle
          : meta?.websiteLinkTitle,
      googleMapUrl: googleMapUrl || googleMapUrlDefault,
      employeeAmount: employeeAmount || 0,
      images: listImages,
      highlightTitle: profileHighLight?.meta?.highlightTitle,
      cultureMedias:
        cloneCultureMediasImages?.length === 0
          ? null
          : cloneCultureMediasImages,
      highlights: highlight,
      workingDays: itemList,
      workingDayCaption: workingDayCaption,
      departments: [...departments],
      address: footerProfile?.address,
      meta: {
        ...footerProfile?.meta,
        socials: footerProfile?.meta?.socials || []
      },
      addressBooks: addressBooksCompany,
      isHidden: false
    }

    if (highlight?.length > 0) {
      const isCheck = false
      const tmp = {}
      highlight.forEach((element, key) => {
        if (element?.content === '') {
          const content = {
            id: `Static_content_${key}`
          }
          showErrorCustomArray(`Static_content_${key}`, tmp, setErrors, content)
          isCheck = true
        }
        if (element?.title === '') {
          const content = {
            id: `Static_title_${key}`
          }
          showErrorCustomArray(`Static_title_${key}`, tmp, setErrors, content)
          isCheck = true
        }
        if (element?.imageUrl === '') {
          const content = {
            id: `Static_imageUrl_${key}`
          }
          showErrorCustomArray(
            `Static_imageUrl_${key}`,
            tmp,
            setErrors,
            content
          )
          isCheck = true
        }
      })
      if (isCheck) {
        const errorsList = Object.keys(tmp)
        const result = errorsList?.filter((elm) => elm?.id !== '')
        const element = document.getElementById(result[0])
        if (element) {
          element.focus()
        }
        return
      }
    }

    // if (!workingDayCaption) {
    //   showErrorCustom('WorkingDayCaption', errors, setErrors)
    //   return
    // }
    if (itemList?.length < 3) {
      showErrorCustom('workingDayList', errors, setErrors)
      return
    }

    if (itemList?.length >= 3) {
      const isCheck = false
      const tmp = {}
      itemList.forEach((element, key) => {
        if (element?.title === '') {
          const content = {
            id: `WorkingDay_title_${key}`
          }
          showErrorCustomArray(
            `WorkingDay_title_${key}`,
            tmp,
            setErrors,
            content,
            'workingDayList'
          )
          isCheck = true
        }
        if (element?.description === '') {
          const content = {
            id: `WorkingDay_desciption_${key}`
          }
          showErrorCustomArray(
            `WorkingDay_desciption_${key}`,
            tmp,
            setErrors,
            content,
            'workingDayList'
          )
          isCheck = true
        }
        if (element?.imageUrl === '') {
          const content = {
            id: `WorkingDay_imageUrl_${key}`
          }
          showErrorCustomArray(
            `WorkingDay_imageUrl_${key}`,
            tmp,
            setErrors,
            content,
            'workingDayList'
          )
          isCheck = true
        }
      })
      if (isCheck) {
        const errorsList = Object.keys(tmp)
        const result = errorsList?.filter((elm) => elm?.id !== '')
        const element = document.getElementById(result[0])
        if (element) {
          element.focus()
        }
        return
      }
    }

    if (listImages?.length === 0) {
      showErrorCustom('LISTIMAGES', errors, setErrors)
      return
    }

    const res = await dispatch(saveBannerEdit(payload))

    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: 'Bạn chưa điền đủ thông tin!'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      setErrors(res?.payload?.errors)
      const scrollId = Object.keys(res?.payload?.errors)[0]
      const findEmptyEl = document.getElementById(scrollId)
      if (findEmptyEl) {
        findEmptyEl.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      if (companyId) {
        setErrors(null)
        onClickCancel()
      }
    }
  }
  const handleClickDraftSave = async () => {
    let cloneCultureMediasImages = []
    for (let i = 0; i < cultureMediasImages.length; i++) {
      let cloneItem = { ...cultureMediasImages[i] }
      cloneItem.position = i + 1
      cloneCultureMediasImages.push(cloneItem)
    }
    const payload = {
      name,
      bannerUrl,
      companyId,
      avatarUrl,
      shortDescription,
      faq: { content: content, faqAnswers: [...faqsEdit] },
      isShowFAQs: isShowFAQs,
      isShowDepartments: isShowDepartments,
      isShowCampaigns: isShowCampaigns,
      preferedCampaignIds: recruitmentSelected || [],
      updateProperties: [
        'Name',
        'AvatarUrl',
        'ShortDescription',
        'BannerUrl',
        'Images',
        'WebsiteLinkTitle',
        'Description',
        websiteUrl && 'WebsiteUrl',
        'EstablishDate',
        googleMapUrl && 'GoogleMapUrl',
        'EmployeeAmount',
        'Highlights',
        'WorkingDays',
        'CultureMedias',
        'WorkingDayCaption',
        'Departments',
        'AddressBooks',
        'ContactEmail',
        'ContactPhone',
        // 'Address',
        'Socials',
        'Faq',
        'IsShowFAQs',
        'IsShowDepartments',
        'IsShowCampaigns',
        'PreferedCampaignIds',
        'HighlightTitle',
        'IsHidden'
      ],
      description,
      establishDate: establishDate || new Date(),
      websiteUrl,
      websiteLinkTitle:
        websiteLinkTitle !== undefined
          ? websiteLinkTitle
          : meta?.websiteLinkTitle,
      googleMapUrl: googleMapUrl || googleMapUrlDefault,
      employeeAmount: employeeAmount || 0,
      images: listImages,
      highlightTitle: profileHighLight?.meta?.highlightTitle,
      cultureMedias:
        cloneCultureMediasImages?.length === 0
          ? null
          : cloneCultureMediasImages,
      highlights: highlight,
      workingDays: itemList,
      workingDayCaption: workingDayCaption,
      departments: [...departments],
      address: footerProfile?.address,
      meta: {
        ...footerProfile?.meta,
        socials: footerProfile?.meta?.socials || []
      },
      addressBooks: addressBooksCompany,
      isHidden: true
    }

    const res = await dispatch(saveBannerEdit(payload))

    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: 'Bạn chưa điền đủ thông tin!'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      setErrors(res?.payload?.errors)
      const scrollId = Object.keys(res?.payload?.errors)[0]
      const findEmptyEl = document.getElementById(scrollId)
      if (findEmptyEl) {
        findEmptyEl.scrollIntoView({
          behavior: 'auto',
          block: 'center',
          inline: 'center'
        })
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu nháp thành công'
        }),
        {
          toastId: 'alert-save-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      if (companyId) {
        setErrors(null)
        onClickCancel()
      }
    }
  }
  let menuEditList = [
    {
      title: !isHidden ? 'Ẩn' : 'Hiện',
      icon: !isHidden ? 'eyeOff2' : 'eye2',
      action: async (props) => {
        const { companyId } = props || {}
        if (companyId) {
          const res = await dispatch(
            saveBannerEdit({
              ...profile,
              companyId: companyId,
              isHidden: !isHidden,
              updateProperties: ['IsHidden']
            })
          )
          if (!res?.payload?.isSuccess) {
            toast(
              AlertWaring({
                title: 'Lưu không thành công',
                description: res?.payload?.errorMessage,
                background: 'warning'
              }),
              {
                toastId: 'alert-save-warning',
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
                title: 'Lưu thành công',
                description: 'Bạn đã lưu thành công'
                // information: 'Tìm hiểu thêm'
              }),
              {
                toastId: 'alert-save-success',

                className: 'bg-toast-custom',
                closeButton: false,
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
              }
            )
            if (companyId) {
              // console.log(companyId)
              dispatch(
                getBannerEdit({
                  id: companyId
                })
              )
            }
          }
        }
      }
    },
    {
      title: 'Chia sẻ hồ sơ',
      icon: 'forward',
      action: async (props) => {
        toggleModalShare()
      }
    }
  ]
  const scrollToElement = (id) => {
    setTimeout(() => {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }, 1000)
  }

  useEffect(() => {
    if (focus) {
      scrollToElement(focus)
    }
  }, [focus])
  useEffect(() => {
    const checkOwner = async () => {
      if (companyId) {
        const res = await dispatch(hasEditPermission({ companyId }))

        if (!res?.payload?.isSuccess) {
          window.location.replace(`/profile-company/${companyId}`)
        } else {
          dispatch(
            getBannerEdit({
              id: companyId
            })
          )
          dispatch(updateMenuEdit(menuEditList))
          dispatch(
            getCultureMediaEdit({
              id: companyId
            })
          )
          dispatch(getAllFaqs({ id: companyId }))
          dispatch(getAllHighLight({ id: companyId }))
          dispatch(getAllDepartmentsEdit({ companyId }))
          dispatch(getAllRecruitmentEdit({ companyId }))
          dispatch(getFaqRoot({ companyId: companyId }))
          dispatch(getAddressBooksCompany(parseInt(companyId)))
        }
      }
    }
    checkOwner()
  }, [companyId])

  useEffect(() => {
    if (tag) {
      dispatch(
        getViewCountCompanyEditmode({
          tag: tag
        })
      )
    }
  }, [tag])
  useEffect(() => {
    dispatch(updateMenuEdit(menuEditList))
  }, [isHidden])
  return (
    <>
      {(loading || uploading) && <LoadingRole />}
      <div className="flex-1">
        <Head>
          <title>Chỉnh sửa doanh nghiệp</title>
        </Head>
        {editmode && !showPreview && (
          <div className="sticky top-0 w-full z-[9999]">
            <div
              className="flex justify-between py-4 px-10 border-b border-grey-3 bg-white "
              style={{
                filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
              }}
            >
              <ButtonIcon
                title="Trang chủ"
                padding="sm:p-[12px_32px] p-2"
                margin="m-0"
                background="bg-white"
                textWeight="sm:text-p18-bold text-p14 font-bold"
                rounded="rounded-[8px] border-0"
                height="h-auto"
                type="button"
                iconName="previousArrow2"
                width="w-auto"
                iconStroke="black"
                onClick={toggleModalBack}
                gap="gap-[8px]"
              />

              <div className="flex gap-4">
                <ButtonIcon
                  title="Lưu nháp"
                  padding="sm:p-[12px_24px] p-2"
                  margin="m-0"
                  background="bg-white"
                  color="text-button"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-fit"
                  type="button"
                  width="w-fit"
                  iconName="saveDraft"
                  iconStroke="#F6BB3A"
                  onClick={handleClickDraftSave}
                  tooltipButton={true}
                />

                <ButtonIcon
                  title={`${showPreview ? 'Chỉnh sửa' : 'Xem trước'}`}
                  margin="m-0"
                  background="bg-white"
                  color="text-button"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconName={`${showPreview ? 'edit' : 'preview'}`}
                  iconStroke="#F6BB3A"
                  onClick={onClickPreview}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />
                <Button
                  title={`Đăng hồ sơ`}
                  width="w-auto"
                  height="h-auto"
                  rounded="rounded-[8px]"
                  color="text-neutral"
                  margin="m-0"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  onClick={() => {
                    handleClickSave()
                  }}
                  tooltipButton={true}
                  padding="sm:p-[12px_24px] p-2"
                />
              </div>
            </div>
          </div>
        )}
        {!editmode && showPreview && (
          <div className="sticky top-0 w-full overflow-hidden z-[9999]">
            <div
              className="flex justify-between items-center py-8 px-10   bg-black/50 "
              style={{
                filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
              }}
            >
              <p className="text-p18 text-white">
                Bạn đang ở chế độ xem trước hồ sơ công ty
              </p>
              <div className="flex gap-4">
                <ButtonIcon
                  title={`Thoát chế độ xem trước`}
                  padding="sm:p-[12px_32px] p-2"
                  margin="m-0"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-button"
                  height="h-auto"
                  type="button"
                  width="w-auto"
                  iconStroke="#F6BB3A"
                  onClick={onClickPreview}
                />
              </div>
            </div>
          </div>
        )}
        {!editmode && showPreview && (
          <div className="absolute  w-full h-full z-10 top-0 "></div>
        )}
        {!showPreview && (
          <EditModeAction
            editmode={editmode}
            menuEdit={menuEdit}
            handleShowEditMode={onClickEdit}
            companyId={companyId}
          />
        )}
        <div className="">
          <BannerEdit
            isEdit={editmode}
            errors={errors}
            handleResetErrors={handleResetErrors}
            seenNumber={views}
          />
        </div>
        <div>
          <InformationEdit
            isEdit={editmode}
            showPreview={showPreview}
            errors={errors}
            handleResetErrors={handleResetErrors}
          />
        </div>

        <div>
          <StaticsEdit
            isEdit={editmode}
            errors={errors}
            setErrors={setErrors}
            handleResetErrors={handleResetErrors}
          />
        </div>

        <div>
          <SliderThumbEdit
            isEdit={editmode}
            errors={errors}
            handleResetErrors={handleResetErrors}
            setUploading={setUploading}
          />
        </div>

        <div>
          <WorkDayEdit
            isEdit={editmode}
            errors={errors}
            handleResetErrors={handleResetErrors}
            setErrors={setErrors}
          />
        </div>
        <div id="department">
          {((isShowDepartments && !editmode) || editmode) && (
            <TeamListEdit
              editmode={editmode}
              isShowDepartments={isShowDepartments}
            />
          )}
        </div>

        <div>
          {((isShowCampaigns && !editmode) || editmode) && (
            <RecruitListEdit
              editmode={editmode}
              isShowCampaigns={isShowCampaigns}
            />
          )}
        </div>
        <div>
          <InternalCourse editmode={editmode} />
        </div>
        <div>
          {((isShowFAQs && !editmode) || editmode) && (
            <QuestionsEdit
              editmode={editmode}
              isShowFAQs={isShowFAQs}
              profile={profile}
            />
          )}
        </div>
        <Modal
          childStyle="w-screen h-fit sm:w-[538px] mt-4 shadow-md p-8 bg-white rounded-2xl"
          open={modalShare}
          toggleModal={toggleModalShare}
        >
          {/* <div className="flex justify-end">
            <div
              className="cursor-pointer hover:opacity-80"
              onClick={toggleModalShare}
            >
              <XProfileIcon name="cross" stroke="#000000" />
            </div>
          </div> */}
          <p className="text-h3 text-center">Chia sẻ hồ sơ công ty</p>
          <div className="flex justify-center item-center gap-6 mt-6 mb-8 ">
            <FacebookShareButton
              url={process.env.NEXT_PUBLIC_HOST_URL + 'profile-company/' + tag}
              quote="Hồ sơ công ty"
              hashtag="#XProfile"
              className="Demo__some-network__share-button"
            >
              <XProfileIcon name="socialFacebook" fill="#000000" />
            </FacebookShareButton>
            <LinkedinShareButton
              id="shareLinkedBusinessAnalyst"
              url={process.env.NEXT_PUBLIC_HOST_URL + 'profile-company/' + tag}
              quote="Hồ sơ công ty"
              hashtag="#XProfile"
              className="Demo__some-network__share-button"
            >
              <XProfileIcon name="socialLinkedIn" fill="#000000" />
            </LinkedinShareButton>
          </div>
          <div className="w-full bg-light-nude rounded-lg py-2 px-6 mb-6">
            <input
              id="select-text"
              className={`text-p18  text-center w-full outline-0 ${
                tooltip ? 'text-blue-light' : 'text-black'
              }`}
              value={
                process.env.NEXT_PUBLIC_HOST_URL + 'profile-company/' + tag
              }
              disabled
            />
          </div>

          <div
            className="group w-fit mx-auto relative"
            onMouseLeave={async () => {
              await delay(200)
              setTooltip(null)
            }}
          >
            <Button
              title="Sao chép link"
              width="md:w-[200px] w-full"
              height="h-[44px]"
              rounded="rounded-[8px]"
              textWeight="sm:text-p18-bold text-p14-bold"
              margin="my-0 mx-auto"
              padding="px-8 py-4"
              onClick={copyText}
            />
            <div
              className="group-hover:opacity-100 transition-opacity bg-gray-800  text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -top-[44px] opacity-0  mx-auto w-max	py-2 px-4"
            >
              {tooltip || 'Nhấn để sao chép link'}
            </div>
          </div>
        </Modal>
        <Modal
          childStyle="w-fit h-fit  mt-4  p-[32px] bg-white rounded-[16px] "
          open={modalBack}
          hiddenCancel={true}
          toggleModal={toggleModalBack}
        >
          <CancelConfirmModal
            title="Các thay đổi chưa lưu"
            desc="Các thay đổi của bạn sẽ mất nếu bạn rời khỏi trang này. Bạn có chắc muốn thoát trang?"
            handleClickContinue={toggleModalBack}
            handleClickCancel={onClickCancel}
          />
        </Modal>
      </div>
      {!GUEST_ROUTES.includes(pathname) && (
        <FooterEditCompany
          FOOTER={FOOTER}
          addressBooks={addressBooksCompany}
          FOOTER_PROFILE={FOOTER_PROFILE}
          editmode={editmode}
          errors={errors}
          handleResetErrors={handleResetErrors}
        />
      )}
    </>
  )
}

export default ProfileCompanyEdit
