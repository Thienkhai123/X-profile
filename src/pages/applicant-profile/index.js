import { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import Button from 'common/presentation/Button'
import Modal from 'common/presentation/Modal'
// import BlockModal from 'common/presentation/Pages/applicant-profile/BlockModal'
import DNDComponent from 'common/presentation/Pages/applicant-profile/Dnd'
import useTrans from 'common/hooks/useTrans'
import { useDispatch } from 'react-redux'
import {
  getExportPdf,
  // getExportPdfHtml,
  selectUserProfile
} from 'store/app/userSlice'
import { useSelector } from 'react-redux'
import {
  createListUserTemplateOptionValue,
  getAchivementImages,
  getAllLanguages,
  getAllSkillV2,
  getAllTemplateOption,
  getAllUserSkill,
  getUserPortfolio,
  inActiveTemplate,
  publishPortfolio,
  selectAllTemplateOptions,
  selectFirstLoading,
  selectLanguages,
  selectSkillsAdvance,
  selectSkillsCommon,
  selectTemplateForDnd,
  selectUserPortfolio,
  updateActiveStatusUserTemplateOptionValue,
  updateFirstLoading,
  updateListUserTemplateOptionValue,
  updatePortfolioTag,
  updateUserPortfolio
} from 'store/app/portfolioSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import ProfileView from 'common/presentation/Pages/applicant-profile/ProfileView'
import ProfileEdit from 'common/presentation/Pages/applicant-profile/ProfileEdit'
import { DialogCropImage } from 'common/presentation/Pages/applicant-profile/TemplateContainer/AnotherBlock/dialogCropImages/dialogCropImage'
import { delay, scrollToId, urlToFile } from 'store/helper/functionHelper'
import { uploadImage } from 'store/helper/serviceHelper'
// import EmptyTemplate from 'common/presentation/Pages/applicant-profile/TemplateContainer/EmptyTemplate'
// import BreadCrumbsDynamic from 'common/presentation/BreadCrumbsDynamic'
// import Image from 'next/image'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { NotificationModal } from 'common/presentation/Notification/Modal'
// import html2canvas from 'html2canvas'
import DownloadModal from 'common/presentation/Pages/applicant-profile/DownloadModal'
import { getJobByJobCategory, selectJobDetail } from 'store/app/jobSlice'
// import jsPDF from 'jspdf'
// import Script from 'next/script'
// import { callAddFont, font } from '../../../public/font/arial-normal'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import ButtonIcon from 'common/presentation/ButtonIcon'
import useModal from 'common/hooks/useModal'
import XProfileIcon from 'common/presentation/Icons'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import ButtonOpenToWork from 'common/presentation/ButtonOpenToWork'
import ButtonOpenToWorkMobile from 'common/presentation/ButtonOpenToWorkMobile'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { Slider } from 'common/presentation'
import { SwiperSlide } from 'swiper/react'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import Tippy from '@tippyjs/react'
import tippy, { roundArrow } from 'tippy.js'
import 'tippy.js/dist/svg-arrow.css'

const FIELDLIST = [
  { name: 'facebook', icon: 'socialFacebook', title: 'Facebook', type: 1 },
  // { name: 'youtube', icon: 'socialYoutube', title: 'Youtube' },
  { name: 'linkedin', icon: 'socialLinkedIn', title: 'LinkedIn', type: 2 }
  // { name: 'instagram', icon: 'socialInstagram', title: 'Instagram' }
]

const generateLinkPublish = (tag) => {
  if (process.env.NODE_ENV === 'production') {
    const PREFIX = 'https://'
    const SUFFIX = '.bio'
    return PREFIX + tag + process.env.NEXT_PUBLIC_DOMAIN + SUFFIX
  } else {
    return process.env.NEXT_PUBLIC_HOST_URL + 'profile/' + tag
  }
}

const renderIconsSocial = (name = '', url = '', type = 0) => {
  switch (type) {
    case 1:
      return (
        <FacebookShareButton
          id="shareFacebookPortfolio"
          url={url}
          quote="Portfolio"
          className="Demo__some-network__share-button"
        >
          <XProfileIcon name={name} fill="#000000" />
        </FacebookShareButton>
      )
    case 2:
      return (
        <LinkedinShareButton
          id="shareLinkedinPortfolio"
          url={url}
          quote="Portfolio"
          className="Demo__some-network__share-button"
        >
          <XProfileIcon name={name} fill="#000000" />
        </LinkedinShareButton>
      )
    default:
      return <></>
  }
}

const ApplicantProfilePage = () => {
  const trans = useTrans()
  const { APPLICANT_PROFILE } = trans
  const dispatch = useDispatch()
  const loading = useSelector(
    (state) =>
      selectLoading(
        state,
        APP_TYPES.PORTFOLIO.CREATELISTUSERTEMPLATEOPTIONVALUE
      ) ||
      selectLoading(
        state,
        APP_TYPES.PORTFOLIO.UPDATELISTUSERTEMPLATEOPTIONVALUE
      ) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.UPDATEUSERPORTFOLIO) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETUSERPORTFOLIO) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETALLTEMPLATEOPTION) ||
      selectLoading(state, APP_TYPES.USER.EXPORTPDF) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.PUBLISHPORTFOLIO) ||
      selectLoading(state, APP_TYPES.USERSKILL.GETALLUSERSKILL) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.GETACHIVEMENTIMAGES) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBBYJOBCATEGORY) ||
      selectLoading(
        state,
        APP_TYPES.PORTFOLIO.UPDATEACTIVESTATUSUSERTEMPLATEOPTIONVALUE
      ) ||
      selectLoading(state, APP_TYPES.USER.UPDATEPROFILE) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.INACTIVETEMPLATE)
  )
  const loadingFullScreen = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.PORTFOLIO.UPDATEUSERPORTFOLIO) ||
      selectLoading(state, APP_TYPES.PORTFOLIO.SETOPENTOWORK)
  )
  const blockProfileRef = useRef(null)
  const blockContentRef = useRef(null)
  const blockContainerRef = useRef(null)
  const templateOptions = useSelector(selectAllTemplateOptions)
  const userPortfolio = useSelector(selectUserPortfolio)
  const userProfile = useSelector(selectUserProfile)
  const firstLoading = useSelector(selectFirstLoading)
  const { portfolioId } = userPortfolio || {}

  const templateForDnd = useSelector(selectTemplateForDnd)
  const skillsCommon = useSelector(selectSkillsCommon)
  const languages = useSelector(selectLanguages)
  const skillsAdvanced = useSelector(selectSkillsAdvance)
  const { jobDetail } = useSelector(selectJobDetail)
  const [open, toggleModalOpenToWork] = useState(false)
  const [openToWorkMobile, toggleOpenToWorkMobile] = useState(false)
  const [modalShare, toggleModalShare] = useModal()
  const [modalShareMobile, toggleModalShareMobile] = useState()
  const [modalCreatehGuiId, toggleModalCreateGuiId] = useModal()
  const [tooltip, setTooltip] = useState(null)
  const [loadingPrivacy, setLoadingprivacy] = useState({
    blockIndex: null,
    state: false
  })
  const [editMode, setEditMode] = useState(false)
  const [modalDownload, setModalDownload] = useState(false)
  const [modalDownloadMobile, setModalDownloadMobile] = useState(false)
  const [imageSrc, setImageSrc] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [editingBlockIds, setEditingBlockIds] = useState([])
  const [loadingImage, setLoadingImage] = useState(false)
  const [showError, setShowError] = useState(false)
  const [imageAnotherBlock, setImageAnotherBlock] = useState(null)
  const [guiIdValue, setGuiIdValue] = useState('')
  const [errorTextGuiId, setErrorTextGuiId] = useState('')
  const [userGuiIdValue, setUserGuiIdValue] = useState('')
  const refOptionJobSave = useRef(null)
  const [showOptionDotMobile, setShowOptionDotMobile] = useState(false)
  const handleCloseOptionJobSave = () => setShowOptionDotMobile(false)
  useOnClickOutside(refOptionJobSave, handleCloseOptionJobSave)
  const refShareMobile = useRef(null)
  const handleCloseShareMobile = () => {
    toggleModalShareMobile(false)
  }
  useOnClickOutside(refShareMobile, handleCloseShareMobile)

  const [modals, setModals] = useState({
    cv: {
      success: false,
      error: false
    }
  })

  const toggleModalDownload = async () => {
    if (editingBlockIds.length === 0) {
      setModalDownload(!modalDownload)
    } else {
      const tempEditingBlockIds = [...editingBlockIds]
      tempEditingBlockIds.sort()
      const firstId = tempEditingBlockIds[0]
      scrollToId('block-editing-id-' + firstId)
      setShowError(true)
      await delay(1000)
      alert('Vui lòng lưu thông tin thay đổi')
    }
  }

  const toggleModalDownloadMobile = async () => {
    if (editingBlockIds.length === 0) {
      setModalDownloadMobile(!modalDownloadMobile)
    } else {
      const tempEditingBlockIds = [...editingBlockIds]
      tempEditingBlockIds.sort()
      const firstId = tempEditingBlockIds[0]
      scrollToId('block-editing-id-' + firstId)
      setShowError(true)
      await delay(1000)
      alert('Vui lòng lưu thông tin thay đổi')
    }
  }

  const handleOffShowError = () => {
    setShowError(false)
  }

  const handleEditingId = (id) => {
    if (!editingBlockIds.includes(id)) {
      setEditingBlockIds([...editingBlockIds, id])
      window.onbeforeunload = (e) => {
        e.preventDefault()
        e.returnValue = ''
      }
    }
  }

  const handleRemoveEditingId = (id) => {
    if (editingBlockIds.includes(id)) {
      const tempArr = [...editingBlockIds]
      const existIndex = tempArr.findIndex((el) => el === id)
      if (existIndex !== -1) {
        tempArr.splice(existIndex, 1)
        if (tempArr.length === 0) {
          window.onbeforeunload = function () {
            // blank function do nothing
          }
        }
        setEditingBlockIds([...tempArr])
      }
    }
  }

  const handleCreateElement = async (createList) => {
    const fetchCreateElement = await dispatch(
      createListUserTemplateOptionValue(createList)
    )
    const { data } = unwrapResult(fetchCreateElement)
    if (data) {
      await dispatch(getUserPortfolio())

      toast(
        AlertSuccess({
          title: 'Thông tin của bạn đã được ghi nhận.'
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
  }

  const handleDelete = async (index = null, id, status = false) => {
    if (loadingPrivacy?.blockIndex === null) {
      setLoadingprivacy({ ...loadingPrivacy, blockIndex: index, state: true })
      const fetchUpdateStatus = await dispatch(
        inActiveTemplate({
          templateOptionValueId: id,
          isActive: status
        })
      )
      const res = unwrapResult(fetchUpdateStatus)
      if (res.data) {
        await dispatch(getUserPortfolio())
        toast(
          AlertSuccess({
            title: 'Thông tin của bạn đã được ghi nhận.'
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
        setLoadingprivacy({ ...loadingPrivacy, blockIndex: null, state: false })
      }
    }
  }

  const handleSaveTemplateOption = async (listUpdate = []) => {
    if (listUpdate.length > 0) {
      await dispatch(updateListUserTemplateOptionValue(listUpdate))
      const fetchUserPortfolio = await dispatch(getUserPortfolio())
      const { data } = unwrapResult(fetchUserPortfolio)
      if (data) {
        toast(
          AlertSuccess({
            title: 'Thông tin của bạn đã được ghi nhận.'
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
    }
  }

  const handleInAtiveChildrenTemplate = async (selectedTemplates = []) => {
    const fetchInActiveTemplates = await dispatch(
      updateActiveStatusUserTemplateOptionValue({
        selectedTemplates: selectedTemplates
      })
    )
    const res = unwrapResult(fetchInActiveTemplates)
    if (res) {
      await dispatch(getUserPortfolio())
      toast(
        AlertSuccess({
          title: 'Thông tin của bạn đã được ghi nhận.'
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
  }

  const sortBlockPosition = async (block) => {
    const templateIds = block.map((el) => el.templateOptionId)

    const updateUserPayload = {
      portfolioId,
      jobId: null,
      description: '',
      templateOptionValueIds: templateIds?.toString() || ''
    }
    const fetchSortBlocks = await dispatch(
      updateUserPortfolio(updateUserPayload)
    )
    const { data } = unwrapResult(fetchSortBlocks)
    if (data) {
      toast(
        AlertSuccess({
          title: 'Thông tin của bạn đã được ghi nhận.'
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
      dispatch(getUserPortfolio())
    }
  }

  const handleUploadImageLocal = (file, childrenTemplate, parentId, id) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        setImageSrc(reader.result)
        setOpenModal(true)
      })
    }
  }

  const handleUploadImage = async (file) => {
    setLoadingImage(true)
    const { successMessage } = await uploadImage(file)
    if (successMessage) {
      setImageAnotherBlock(successMessage)
      setLoadingImage(false)
    }
  }

  const handleOnCloseImage = () => {
    setOpenModal(false)
  }

  const handleCropImage = async (src) => {
    if (src) {
      const file = await urlToFile(src)
      handleUploadImage(file)
    }
  }

  const handleEditMode = async () => {
    setEditMode(true)
  }

  const handleViewMode = () => {
    setEditMode(false)
    handleRemoveEditingId(9999999)
  }

  const downloadPdfBeautyVer = async () => {
    toggleModalDownload()
    const res = await dispatch(getExportPdf({ lang: 'en' }))
    // setLoadingPdf(true)
    // const beautifulPdfVersion = document.getElementById('beautiful-pdf')
    // await new Promise(async (resolve) => {
    //   const blockProfile = blockProfileRef?.current
    //   const blockContent = blockContentRef?.current
    //   const blockContainer = blockContainerRef?.current
    //   blockProfile.className = 'break-words pt-[12px]'
    //   blockContent.className =
    //     'xl:w-2/3 w-full bg-white sm:p-[24px] p-[12px] border-l border-grey-4'
    //   blockContainer.className =
    //     'md:flex xl:w-[1140px] w-full gap-[20px] mx-auto mt-[16px] pl-[12px]'
    //   resolve()
    // })
    // html2canvas(beautifulPdfVersion, {
    //   useCORS: true,
    //   allowTaint: true,
    //   logging: false,
    //   // backgroundColor: 'rgb(245 245 242)',
    //   ignoreElements: function (element) {
    //     if (element.classList.contains('ignore-el-pdf')) {
    //       return true
    //     }
    //   }
    // }).then(function (canvas) {
    //   var imgData = canvas.toDataURL()
    //   var imgWidth = 210
    //   var pageHeight = 295
    //   var imgHeight = (canvas.height * imgWidth) / canvas.width
    //   var heightLeft = imgHeight
    //   var doc = new jsPDF('p', 'mm')
    //   var position = 0

    //   doc.addImage(imgData, 'PNG', 0.1, position, imgWidth, imgHeight)
    //   heightLeft -= pageHeight

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight
    //     doc.addPage()
    //     doc.addImage(imgData, 'PNG', 0.1, position, imgWidth, imgHeight)
    //     heightLeft -= pageHeight
    //   }
    //   doc.save('CV_' + user?.name + '_' + currentJob + '.pdf')
    //   const blockProfile = blockProfileRef?.current
    //   const blockContent = blockContentRef?.current
    //   const blockContainer = blockContainerRef?.current
    //   blockProfile.className = 'break-words'
    //   blockContent.className =
    //     'xl:w-2/3 w-full bg-white sm:p-[24px] p-[12px] rounded-[12px]'
    //   blockContainer.className =
    //     'md:flex xl:w-[1140px] w-full gap-[20px] mx-auto mt-[16px] '
    //   setLoadingPdf(false)
    // })
  }
  const downloadPdfBeautyVietnamVer = async () => {
    toggleModalDownload()
    const res = await dispatch(getExportPdf({ lang: 'vi' }))
    // setLoadingPdf(true)
    // const beautifulPdfVersion = document.getElementById('beautiful-pdf')
    // await new Promise(async (resolve) => {
    //   const blockProfile = blockProfileRef?.current
    //   const blockContent = blockContentRef?.current
    //   const blockContainer = blockContainerRef?.current
    //   blockProfile.className = 'break-words pt-[12px]'
    //   blockContent.className =
    //     'xl:w-2/3 w-full bg-white sm:p-[24px] p-[12px] border-l border-grey-4'
    //   blockContainer.className =
    //     'md:flex xl:w-[1140px] w-full gap-[20px] mx-auto mt-[16px] pl-[12px]'
    //   resolve()
    // })
    // html2canvas(beautifulPdfVersion, {
    //   useCORS: true,
    //   allowTaint: true,
    //   logging: false,
    //   // backgroundColor: 'rgb(245 245 242)',
    //   ignoreElements: function (element) {
    //     if (element.classList.contains('ignore-el-pdf')) {
    //       return true
    //     }
    //   }
    // }).then(function (canvas) {
    //   var imgData = canvas.toDataURL()
    //   var imgWidth = 210
    //   var pageHeight = 295
    //   var imgHeight = (canvas.height * imgWidth) / canvas.width
    //   var heightLeft = imgHeight
    //   var doc = new jsPDF('p', 'mm')
    //   var position = 0

    //   doc.addImage(imgData, 'PNG', 0.1, position, imgWidth, imgHeight)
    //   heightLeft -= pageHeight

    //   while (heightLeft >= 0) {
    //     position = heightLeft - imgHeight
    //     doc.addPage()
    //     doc.addImage(imgData, 'PNG', 0.1, position, imgWidth, imgHeight)
    //     heightLeft -= pageHeight
    //   }
    //   doc.save('CV_' + user?.name + '_' + currentJob + '.pdf')
    //   const blockProfile = blockProfileRef?.current
    //   const blockContent = blockContentRef?.current
    //   const blockContainer = blockContainerRef?.current
    //   blockProfile.className = 'break-words'
    //   blockContent.className =
    //     'xl:w-2/3 w-full bg-white sm:p-[24px] p-[12px] rounded-[12px]'
    //   blockContainer.className =
    //     'md:flex xl:w-[1140px] w-full gap-[20px] mx-auto mt-[16px] '
    //   setLoadingPdf(false)
    // })
  }

  const downloadPdfAtsVer = async () => {
    toggleModalDownload()
    const res = await dispatch(getExportPdf())
    // console.log(res.payload);
    // Example pdfmake
    // const html = htmlToPdfmake(res.payload);
    // pdfMake.vfs = pdfFonts.pdfMake.vfs;
    // pdfMake.vfs =
    // pdfMake.fonts = {
    //   Arial: {
    //     "normal": "https://fonts.cdnfonts.com/s/29105/ARIAL.woff"
    //   }
    // }
    // pdfMake.createPdf({ content: html, defaultStyle: { font: "Arial" }, },null, {
    //   Arial: {
    //     normal: "https://fonts.cdnfonts.com/s/29105/ARIAL.woff",
    //     bold: "https://fonts.cdnfonts.com/s/29105/ARIALBD 1.woff",
    //     bolditalics: "https://fonts.cdnfonts.com/s/29105/ARIALBI 1.woff",
    //     italics: "https://fonts.cdnfonts.com/s/29105/ARIALI 1.woff",

    //   }
    // }).download();

    // Example jsPDF
    // jsPDF.API.events.push(["addFonts", callAddFont]);
    // const jsPdf = new jsPDF({
    //   orientation: 'p',
    //   unit: 'pt',
    //   format: false,
    // });
    // await jsPdf.addFont("/font/Arial.ttf", "Arial", "normal");
    // jsPdf.setFont("Arial")
    // jsPdf.setFontSize(10);
    // const htmlContent = res.payload;
    // console.log(htmlContent)
    // jsPdf.html(htmlContent, {
    //   callback: function (doc) {
    //     doc.save(`CV_${fullName}${`_${currentJob}` || ""}.pdf`);
    //   },
    //   x: 10,
    //   y: 10,
    //   width: 575,
    //   windowWidth: 800,
    // });
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

  const handlePublishProfile = async () => {
    const fetchPublishProfile = await dispatch(publishPortfolio())
    const res = unwrapResult(fetchPublishProfile)
    if (res?.data) {
      setUserGuiIdValue(res?.data)
      toggleModalShare()
    } else {
      toggleModalCreateGuiId()
    }
  }

  const handleCheckGuiIdProfile = async () => {
    const fetchPublishProfile = await dispatch(
      publishPortfolio({
        isShowToast: false
      })
    )
    const res = unwrapResult(fetchPublishProfile)
    if (res?.data) {
      toggleModalOpenToWork()
    } else {
      toggleModalCreateGuiId()
    }
  }

  const handleChnageValueGuiId = (val = '') => {
    const re = new RegExp('^[a-zA-Z0-9-]+$')
    if (
      !re.test(val) ||
      val.trim() === '' ||
      !isNaN(parseInt(val)) ||
      val[0] === '-' ||
      val[val?.length - 1] === '-' ||
      val.includes('--')
    ) {
      setErrorTextGuiId('Tên hồ sơ không hợp lệ')
    } else {
      setErrorTextGuiId('')
    }
    setGuiIdValue(val)
  }

  const handleCreateGuiId = async () => {
    const fetchCreateGuiId = await dispatch(updatePortfolioTag({ guiIdValue }))
    const res = unwrapResult(fetchCreateGuiId)
    if (res.data) {
      setUserGuiIdValue(res?.data)
      toggleModalCreateGuiId()
      if (!editMode) {
        toggleModalShare()
      } else {
        toast(
          AlertSuccess({
            title: 'Bây giờ bạn có thể bật tìm việc.'
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
    }
  }

  const createTemplate = async (listTemplate = []) => {
    const { templateOptionValues, portfolioId, templateOptionValueIds } =
      userPortfolio || {}
    const parentTemplate = listTemplate.filter((el) => el.parentId === null)
    const findMissingElement = parentTemplate.filter((el) => {
      const filterEl = templateOptionValues?.find(
        (elVal) => elVal.templateOptionId === el.templateOptionId
      )
      if (filterEl) {
        return filterEl
      }
    })
    const tempArrOptionActiveIds = findMissingElement.map(
      (el) => el.templateOptionId
    )
    if (templateOptionValues?.length > 0) {
      if (tempArrOptionActiveIds.length < parentTemplate.length) {
        const findElementNotExist = parentTemplate.filter(
          (el) => !tempArrOptionActiveIds.includes(el.templateOptionId)
        )
        if (findElementNotExist?.length > 0) {
          const cloneTemplateOptionsNew = [...findElementNotExist]
          const createPayload = cloneTemplateOptionsNew.map((template) => {
            return {
              templateOptionId: template.templateOptionId,
              templateOptionType: template.templateOptionType,
              portfolioId: portfolioId,
              templateOptionName: template.templateOptionName,
              value: template.placeholder,
              isActive: true
            }
          })
          const valueIds = [...tempArrOptionActiveIds]
          createPayload.map((el) => valueIds.push(el.templateOptionId))
          const createNewDataTemplate = async () => {
            const updateUserPayload = {
              portfolioId,
              templateOptionValueIds: valueIds.join(',')
            }
            await Promise.all([
              dispatch(createListUserTemplateOptionValue(createPayload)),
              dispatch(updateUserPortfolio(updateUserPayload))
            ]).then(() => {
              dispatch(getUserPortfolio())
            })
          }
          createNewDataTemplate()
        }
      }
    } else {
      // Create New User Blocks Template
      const cloneTemplateOptions = [...parentTemplate]
      const createPayload = cloneTemplateOptions.map((template) => {
        return {
          templateOptionId: template.templateOptionId,
          templateOptionType: template.templateOptionType,
          portfolioId: portfolioId,
          templateOptionName: template.templateOptionName,
          value: template.placeholder,
          isActive: true
        }
      })
      const valueIds = createPayload.map((el) => el.templateOptionId)
      const createNewDataTemplate = async () => {
        const updateUserPayload = {
          portfolioId,
          templateOptionValueIds: valueIds.join(',')
        }
        await Promise.all([
          dispatch(createListUserTemplateOptionValue(createPayload)),
          dispatch(updateUserPortfolio(updateUserPayload))
        ]).then(() => {
          dispatch(getUserPortfolio())
        })
      }
      createNewDataTemplate()
    }
  }

  useEffect(() => {
    if (
      userProfile?.ownedCompany &&
      Object?.keys(userProfile?.ownedCompany)?.length > 0
    ) {
      window.location.replace('/')
    }
    const fetchInitData = async () => {
      await Promise.all([
        dispatch(getAllTemplateOption()),
        // dispatch(getUserPortfolio()),
        dispatch(getAllSkillV2({ type: 0 })),
        dispatch(getAllSkillV2({ type: 1 })),
        dispatch(getAllUserSkill()),
        dispatch(getAllLanguages()),
        dispatch(getAchivementImages()),
        dispatch(getJobByJobCategory({ id: 0 }))
      ]).then(([res]) => {
        createTemplate(res.payload.data)
        dispatch(updateFirstLoading(false))
      })
    }
    fetchInitData()
    // if (!firstLoading) {
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  if (
    userProfile?.ownedCompany &&
    Object?.keys(userProfile?.ownedCompany)?.length > 0
  ) {
    return <div className="flex-1"></div>
  }

  return (
    <div className="flex-1 pb-[7.75rem] xl:pt-10 pt-6 xl:px-0 px-6 bg-white overflow-hidden">
      {((firstLoading && (loading || loadingImage)) || loadingFullScreen) && (
        <LoadingRole />
      )}
      <Head>
        <title>Hồ sơ năng lực - X-Profile</title>
      </Head>
      {modalDownload && (
        <Modal
          toggleModal={toggleModalDownload}
          open={modalDownload}
          childStyle="w-screen h-fit sm:w-[480px]  shadow-md p-[32px] bg-white rounded-lg"
          // title="Tải về hồ sơ"
          // styleTitle="text-center sm:text-h2 text-p18-bold  mb-2"
        >
          <DownloadModal
            closeModal={toggleModalDownload}
            downloadPdfBeautyVer={downloadPdfBeautyVer}
            downloadPdfBeautyVietnamVer={downloadPdfBeautyVietnamVer}
            downloadPdfAtsVer={downloadPdfAtsVer}
          />
        </Modal>
      )}

      {/* Mobile */}

      <div className="xl:flex hidden xl:w-[1140px] w-full justify-between mx-auto items-center relative mb-8">
        <div className="flex items-center gap-2">
          <p className="sm:text-p28-bold text-p18-bold ">Hồ sơ năng lực</p>
          <div className="relative">
            <Tippy
              animation="shift-away"
              duration={100}
              delay={0}
              appendTo={() => document.body}
              placement="bottom"
              arrow={roundArrow}
              showOnCreate={true}
              // offset={[0, 8]}
              // popperOptions={{ modifiers: [{ name: 'flip', enabled: false }] }}
              content={
                <div className="text-p18 flex justify-center items-center -bottom-[72px] z-50  w-[500px] px-4 py-3 bg-grey-1 rounded-lg text-center text-white ">
                  Bạn có thể thay đổi thứ tự các thông tin bằng cách kéo thả các
                  block bên dưới nhé!
                </div>
              }
            >
              <div className="relative">
                <XProfileIcon name="information" />
              </div>
            </Tippy>
          </div>
        </div>
        <div className="z-10 flex xl:flex-row flex-col items-center sm:gap-3 gap-2">
          <ButtonIcon
            width="sm:w-auto w-full "
            height="sm:h-[48px] h-[36px]"
            rounded="rounded-[8px]"
            title="Tải về hồ sơ"
            background="white border border-grey-3 cursor-careerPath "
            hover="hover:bg-nude"
            textWeight="sm:text-p18-bold text-p14-bold text-black"
            padding="px-8 py-4"
            iconName="inboxIn"
            margin="m-0"
            onClick={toggleModalDownload}
          />
          <ButtonIcon
            width="sm:w-auto w-full "
            height="sm:h-[48px] h-[36px]"
            rounded="rounded-[8px]"
            background="white border border-grey-3 cursor-careerPath "
            hover="hover:bg-nude"
            title="Chia sẻ hồ sơ"
            textWeight="sm:text-p18-bold text-p14-bold text-black"
            padding="px-8 py-4"
            iconName="forward"
            margin="m-0"
            onClick={() => handlePublishProfile()}
          />
          {jobDetail?.length > 0 && (
            <ButtonOpenToWork
              open={open}
              toggleModalOpenToWork={toggleModalOpenToWork}
              userPortfolio={userPortfolio}
              jobDetail={jobDetail}
            />
          )}
        </div>
      </div>
      <div className="xl:hidden">
        <div className="flex justify-end items-center gap-2">
          {jobDetail?.length > 0 && (
            <ButtonOpenToWorkMobile
              open={openToWorkMobile}
              toggleModalOpenToWork={toggleOpenToWorkMobile}
              userPortfolio={userPortfolio}
              jobDetail={jobDetail}
            />
          )}
          <div className="relative" ref={refOptionJobSave}>
            <button
              className=" w-10 h-10    border border-grey-3 rounded-lg  flex  justify-center p-2 items-center "
              onClick={() => setShowOptionDotMobile(!showOptionDotMobile)}
            >
              <XProfileIcon name="menuDot" stroke={'#666666'} />
            </button>
            {showOptionDotMobile && (
              <div className="bg-white max-h-[320px] p-2  shadow-[0_8px_16px_rgba(0,0,0,0.04)] border border-grey-3 z-50 w-[188px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-lg">
                <ButtonIcon
                  width="sm:w-auto w-full "
                  height="h-[44px]"
                  background=" cursor-careerPath "
                  hover="hover:bg-nude"
                  title="Chia sẻ hồ sơ"
                  textWeight="text-p16 text-black"
                  padding="px-4 py-2"
                  iconName="forward"
                  margin="m-0"
                  onClick={() => {
                    toggleModalShareMobile(true),
                      setShowOptionDotMobile(!showOptionDotMobile)
                  }}
                />
                <ButtonIcon
                  width="sm:w-auto w-full "
                  height="h-[44px]"
                  title="Tải về hồ sơ"
                  background="cursor-careerPath "
                  hover="hover:bg-nude"
                  textWeight="sm:text-p16 text-black"
                  padding="px-4 py-2"
                  iconName="inboxIn"
                  margin="m-0"
                  onClick={() => toggleModalDownloadMobile()}
                />
              </div>
            )}
          </div>
        </div>
      </div>
      <div
        id="beautiful-pdf"
        ref={blockContainerRef}
        className="md:flex xl:w-[1140px] w-full gap-6 mx-auto mt-[16px]"
      >
        <div ref={blockProfileRef} className="break-words xl:w-[360px]">
          {editMode && (
            <ProfileEdit
              index={9999999}
              connect={APPLICANT_PROFILE?.society}
              titleButton={APPLICANT_PROFILE?.titleButton}
              handleEditMode={handleViewMode}
              userPortfolio={userPortfolio}
              editingBlockIds={editingBlockIds}
              showError={showError}
              handleOffShowError={handleOffShowError}
              jobDetail={jobDetail}
              handleCheckGuiIdProfile={handleCheckGuiIdProfile}
              toggleModalCreateGuiId={toggleModalCreateGuiId}
              modalCreatehGuiId={modalCreatehGuiId}
              loadingBlock={!firstLoading && loading}

              // open={open}
              // toggleModal={toggleModalOpenToWork}
            />
          )}
          {!editMode && (
            <ProfileView
              connect={APPLICANT_PROFILE?.society}
              titleButton={APPLICANT_PROFILE?.titleButton}
              handleEditMode={handleEditMode}
              userPortfolio={userPortfolio}
            />
          )}
        </div>

        <div ref={blockContentRef} className="xl:flex-1 w-full bg-white">
          <DNDComponent
            // modify={modal}
            data={templateForDnd}
            portfolioId={portfolioId}
            templateOptions={templateOptions}
            skillsCommon={skillsCommon}
            languages={languages}
            skillsAdvanced={skillsAdvanced}
            editingBlockIds={editingBlockIds}
            showError={showError}
            handleDelete={handleDelete}
            handleSaveTemplateOption={handleSaveTemplateOption}
            sortBlockPosition={sortBlockPosition}
            handleCreateElement={handleCreateElement}
            handleInAtiveChildrenTemplate={handleInAtiveChildrenTemplate}
            handleUploadImageLocal={handleUploadImageLocal}
            handleEditingId={handleEditingId}
            handleRemoveEditingId={handleRemoveEditingId}
            handleOffShowError={handleOffShowError}
            imageAnotherBlock={imageAnotherBlock}
            openModal={openModal}
            loadingBlock={!firstLoading && loading}
            loadingPrivacy={!firstLoading && loadingPrivacy}
          />

          <DialogCropImage
            src={imageSrc}
            isVisible={openModal}
            handleOnClose={handleOnCloseImage}
            handleCropImage={handleCropImage}
          />
          <NotificationModal
            icon="tick"
            title={trans.MESSAGE?.createPortfolioSuccess?.title}
            description={trans.MESSAGE?.createPortfolioSuccess?.description}
            btnClickTitle={trans.MESSAGE?.createPortfolioSuccess?.buttonClick}
            open={modals.cv.success}
            onCloseModal={() =>
              setModals({
                ...modals,
                cv: { ...modals.cv, success: !modals.cv.success }
              })
            }
            onClick={() =>
              setModals({
                ...modals,
                cv: { ...modals.cv, success: !modals.cv.success }
              })
            }
          />
          <NotificationModal
            icon="cancelModal"
            title={trans.MESSAGE?.createPortfolioError?.title}
            description={trans.MESSAGE?.createPortfolioError?.description}
            btnClickTitle={trans.MESSAGE?.createPortfolioError?.buttonClick}
            open={modals.cv.error}
            onCloseModal={() =>
              setModals({
                ...modals,
                cv: { ...modals.cv, error: !modals.cv.error }
              })
            }
            onClick={() =>
              setModals({
                ...modals,
                cv: { ...modals.cv, error: !modals.cv.error }
              })
            }
          />
          {/* Mobile Share Test */}
          <div
            className={`${
              modalShareMobile ? 'z-[10000] bg-black/30' : '-z-50 '
            } w-[100vw] h-[100vh] fixed flex justify-center items-end  left-[calc(0%)] top-[calc(0%)] transition-all duration-500 xl:hidden`}
          >
            <div
              ref={refShareMobile}
              className={`w-full h-[340px] bg-white rounded-tl-3xl rounded-tr-3xl transition-all duration-700 ${
                modalShareMobile ? 'translate-y-0' : 'translate-y-full'
              }`}
            >
              <input
                hidden
                id="select-text"
                className={`text-p18  text-center w-full outline-0 ${
                  tooltip ? 'text-blue-light' : 'text-black'
                }`}
                value={generateLinkPublish(userGuiIdValue)}
                disabled
              />
              <div className="relative py-4 flex justify-center items-center border-b border-grey-4">
                <p className="text-p18-bold">Chia sẻ hồ sơ cá nhân</p>
                <div
                  onClick={() => toggleModalShareMobile(false)}
                  className="absolute right-6"
                >
                  <XProfileIcon name="cross" stroke="#000000" />
                </div>
              </div>
              <div className="mt-8 pl-8">
                <Slider
                  breakpoints={{
                    330: {
                      slidesPerView: 3,
                      slidesPerGroup: 1
                    }
                  }}
                  spaceBetween={24}
                >
                  <SwiperSlide>
                    <div
                      onClick={() => copyText()}
                      className="flex flex-col gap-2 w-fit items-center"
                    >
                      <div className="w-14 h-14 !rounded-full border border-grey-4 hover:bg-button flex items-center justify-center">
                        <XProfileIcon name="link2" />
                      </div>
                      <p className="text-p14">Sao chép</p>
                    </div>
                  </SwiperSlide>
                  {FIELDLIST?.map((field, ind) => {
                    const urlPortfolio =
                      process.env.NEXT_PUBLIC_HOST_URL +
                      'profile/' +
                      userGuiIdValue
                    const { icon, type, title } = field || {}
                    return (
                      <SwiperSlide key={ind}>
                        <div className="flex flex-col gap-2 w-fit items-center">
                          <div className="w-14 h-14 !rounded-full border border-grey-4 hover:bg-button flex items-center justify-center">
                            {renderIconsSocial(icon, urlPortfolio, type)}
                          </div>
                          <p className="text-p14">{title}</p>
                        </div>
                      </SwiperSlide>
                    )
                  })}
                </Slider>
              </div>
            </div>
          </div>
          {/* Mobile Share Test */}

          <Modal
            childStyle="w-screen h-fit sm:w-[480px] mt-4 p-[40px] bg-white rounded-[16px]"
            open={modalShare}
            toggleModal={toggleModalShare}
          >
            <p className="text-h3 text-center">Chia sẻ hồ sơ cá nhân</p>
            <div className="flex justify-center item-center gap-6 mt-6 mb-8">
              {FIELDLIST?.map((field, ind) => {
                const urlPortfolio =
                  process.env.NEXT_PUBLIC_HOST_URL + 'profile/' + userGuiIdValue
                const { icon, type } = field || {}
                return (
                  <div key={ind}>
                    {renderIconsSocial(icon, urlPortfolio, type)}
                  </div>
                )
              })}
            </div>
            <div className="w-full bg-light-nude py-2 px-6 mb-6 rounded-lg">
              <input
                id="select-text"
                className={`text-p18  text-center w-full outline-0 ${
                  tooltip ? 'text-blue-light' : 'text-black'
                }`}
                value={generateLinkPublish(userGuiIdValue)}
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
                width="md:w-[240px] w-full"
                height="h-[48px]"
                rounded="rounded-[8px]"
                textWeight="sm:text-p18-bold text-p14-bold"
                margin="my-0 mx-auto"
                padding="px-6"
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
            open={modalCreatehGuiId}
            toggleModal={() => {
              toggleModalCreateGuiId()
              setGuiIdValue('')
            }}
          >
            <div className="flex justify-end"></div>
            <p className="text-h3 text-center">
              Tạo đường dẫn cho hồ sơ của bạn
            </p>
            <div className="flex gap-1 items-center py-2 px-6 ">
              <p className="p-18">xprofile.vn/profile/</p>
              <input
                className={`text-p18 peer w-full outline-0 focus:transition-all focus:duration-500 rounded-lg  border border-semantic px-2
                ${
                  errorTextGuiId ? 'border-semantic-red' : ' border-transparent'
                }
                `}
                minLength={3}
                maxLength={30}
                autoFocus
                value={guiIdValue}
                onChange={(e) => handleChnageValueGuiId(e.target.value)}
              />
            </div>
            <div className=" px-6 mb-4">
              <p className="text-grey-2 text-p14 text-end">
                {30 - (guiIdValue?.length || 0)}
              </p>

              <p className="text-semantic-red text-center h-[24px]">
                {errorTextGuiId}
              </p>
            </div>
            <Button
              title="Xác nhận"
              width="md:w-[240px] w-full"
              height="h-[48px]"
              rounded="rounded-[8px]"
              textWeight="sm:text-p18-bold text-p14-bold"
              margin="my-0 mx-auto"
              padding="px-6"
              disabled={
                errorTextGuiId?.length > 0 ||
                guiIdValue?.length < 3 ||
                guiIdValue?.length > 30
              }
              onClick={() => handleCreateGuiId()}
            />
            <p className="text-grey text-p14">{`(*)`} tối thiểu 3 ký tự</p>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default ApplicantProfilePage
