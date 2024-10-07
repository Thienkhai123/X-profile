import { GUEST_ROUTES } from 'common/config/app.constants'
import FooterEditCompany from 'common/container/Footer/footerEditCompany'
import useEditMode from 'common/hooks/useEditMode'
import useModal from 'common/hooks/useModal'
import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Modal from 'common/presentation/Modal'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import CancelConfirmModal from 'common/presentation/Pages/edit-mode-company/CancelConfrmModal'
import DeleteConfirmModal from 'common/presentation/Pages/edit-mode-company/DeleteConfirmModal'
import BannerPositionEdit from 'common/presentation/Pages/edit-mode-company/position/banner'
import BannerApplyEdit from 'common/presentation/Pages/edit-mode-company/position/banner-apply'
import BenefitsPositionEdit from 'common/presentation/Pages/edit-mode-company/position/benefits'
import DevRoadmapPosition from 'common/presentation/Pages/edit-mode-company/position/devRoadmapPosition'
import JobDescriptionPositionEdit from 'common/presentation/Pages/edit-mode-company/position/job-description'
import JobRequirementsPositionEdit from 'common/presentation/Pages/edit-mode-company/position/job-requirements'
import ProfessionalSkillsPositionEdit from 'common/presentation/Pages/edit-mode-company/position/professional-skills'
import SoftlSkillsPositionEdit from 'common/presentation/Pages/edit-mode-company/position/soft-skills'
import EditModeAction from 'common/presentation/Pages/Profile-Company/EditModeAction'
import cloneDeep from 'lodash/cloneDeep'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { FacebookShareButton, LinkedinShareButton } from 'react-share'
import { toast } from 'react-toastify'
import { hasEditPermission } from 'store/app/companySlice'
import {
  getViewCountDepartmentPositionEditmode,
  selectDepartmentPositionViews
} from 'store/app/departmentPositionSlice'
import {
  deletePositionEdit,
  getBannerEditPosition,
  getCampaignPriceBannerPosition,
  savePositionBannerEdit,
  selectInitSatePosition,
  updatePositionEdit
} from 'store/app/edit-mode-company/position/bannerSlice'
import {
  getSystemImagesBenefitsPostion,
  selectBenefitsPositoninitState
} from 'store/app/edit-mode-company/position/benefitsSlice'
import { cloneDepartmentPositionEdit } from 'store/app/edit-mode-company/position/cloneSlice'
import { selectJobDescriptionInitState } from 'store/app/edit-mode-company/position/jobDescriptionSlice'
import {
  getProfessionalSkillPositionV2,
  selectSkillListProfessionalSkillPositionExist
} from 'store/app/edit-mode-company/position/professionalSkillSlice'
import {
  getSystemImages,
  selectRoadmapPositionList
} from 'store/app/edit-mode-company/position/roadmapSlice'
import {
  getAllSoftSkillPositionV2,
  selectSkillCompanySoftSkillPosition
} from 'store/app/edit-mode-company/position/softSkillSlice'
import {
  getBannerEdit,
  saveBannerEdit,
  selectBannerProfile
} from 'store/app/edit-mode-company/profile/bannerSlice'
import {
  getAddressBooksCompany,
  selectFooterAddressBook
} from 'store/app/edit-mode-company/profile/footerSlice'
import { selectMenuEdit, updateMenuEdit } from 'store/app/helperSlice'
import { getJobCategory } from 'store/app/userSlice'
import { delay } from 'store/helper/functionHelper'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

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

const showErrorCustomText = (
  fieldName = '',
  errors = {},
  setErrors = () => {},
  warningText = 'Bạn chưa điền đủ thông tin!'
) => {
  toast(
    AlertWaring({
      title: warningText
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

const EditPositionPage = () => {
  const dispatch = useDispatch()
  const trans = useTrans()
  const { FOOTER, FOOTER_PROFILE } = trans
  const addressBooks = useSelector(selectFooterAddressBook)
  const router = useRouter()
  const { editmode, handleShowEditMode, handleShowViewMode } = useEditMode()
  const [modalBack, toggleModalBack] = useModal()
  const [modalShare, toggleModalShare] = useModal()
  const menuEdit = useSelector(selectMenuEdit)
  const views = useSelector(selectDepartmentPositionViews)

  const { query, pathname } = router
  const {
    departmentPositionId,
    companyId,
    departmentId,
    editMode: checkEdit
  } = query || {}

  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.EDIT.DELETEPOSITIONEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.UPDATEPOSITIONEDIT) ||
      selectLoading(state, APP_TYPES.EDIT.GETPOSITION) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEPOSITION) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEPOSITIONSOFTSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLSOFTSKILLPOSITIONV2) ||
      selectLoading(state, APP_TYPES.EDIT.GETPROFILEPOSITIONSOFTSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLSKILLPOSITIONSOFTSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEPOSITIONPROSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLPROSKILLPOSITIONV2) ||
      selectLoading(state, APP_TYPES.EDIT.GETPROFILEPOSITIONPROSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.GETALLPROFESSIONALSKILLPOSITIONV2) ||
      selectLoading(state, APP_TYPES.EDIT.GETPROFILEPOSITIONPROSKILL) ||
      selectLoading(state, APP_TYPES.EDIT.GETROADMAPPOSITION) ||
      selectLoading(state, APP_TYPES.EDIT.SAVEROADMAPPOSITION) ||
      selectLoading(state, APP_TYPES.HELPER.GETSYSTEMIMAGES) ||
      selectLoading(state, APP_TYPES.EDIT.CLONEDEPARMENTPOSITION) ||
      selectLoading(state, APP_TYPES.EDIT.POSITIONS.BANNER.DEACTIVATECAMPAIGN)
    // selectLoading(state, APP_TYPES.COMPANY.HASEDITPERMISSION)
  )
  const { profile: profilePosition, profileDepartment } = useSelector(
    selectInitSatePosition
  )

  const {
    jobDescriptionList,
    profile: profileDescription,
    selectedSalary
  } = useSelector(selectJobDescriptionInitState)
  const { averageSalary, employeeAmount, maxSalary } = profileDescription
  const { benefits } = useSelector(selectBenefitsPositoninitState)
  const positionList = useSelector(selectRoadmapPositionList)
  const { isActive } = profilePosition || {}
  const companySoftSkills = useSelector(selectSkillCompanySoftSkillPosition)
  const companyProfessionalSkills = useSelector(
    selectSkillListProfessionalSkillPositionExist
  )

  const profileCompany = useSelector(selectBannerProfile)
  const { applyBannerUrl, tag } = profileCompany || {}
  const [modalConfirm, setModalConfirm] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tooltip, setTooltip] = useState(null)
  const [valuePreview, setValuePreview] = useState({
    jobRequirement: ''
  })

  const [errors, setErrors] = useState(null)

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

  const toggleModal = () => {
    setModalConfirm(!modalConfirm)
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
  const handleClickDelete = async () => {
    if (departmentPositionId) {
      const res = await dispatch(
        deletePositionEdit({
          departmentPositionId: departmentPositionId
        })
      )

      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: res?.payload?.errorMessage
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
            title: 'Bạn đã xoá thành công'
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

        setModalConfirm(false)
        window.location.replace(
          `/profile-company/${companyId}/${departmentId}/edit`
        )
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
  }

  const onClickCancel = () => {
    if (departmentPositionId) {
      dispatch(getBannerEditPosition(query))
      dispatch(getCampaignPriceBannerPosition())
      dispatch(getJobCategory())
      dispatch(getAllSoftSkillPositionV2({ departmentPositionId }))
      dispatch(getProfessionalSkillPositionV2({ departmentPositionId }))
    }
    if (companyId) {
      dispatch(
        getBannerEdit({
          id: companyId
        })
      )
    }
    handleShowViewMode()
    toggleMainHeader()
    if (modalBack) {
      toggleModalBack()
    }
    setShowPreview(false)
    setErrors(null)
  }
  const onClickSave = async () => {
    const jobRequirementEl = document.getElementById(
      'edit-mode-job-description-content'
    )

    const payload = {
      ...profilePosition,
      descriptionTable: jobDescriptionList,
      benefits: [...benefits],
      careerPaths: [...positionList],
      skills: [...companySoftSkills, ...companyProfessionalSkills],
      averageSalary: parseInt(averageSalary) || 0,
      maxSalary: parseInt(maxSalary) || 0,
      employeeAmount: parseInt(employeeAmount),
      companyId: companyId,
      isActive: true,
      departmentId: departmentId,
      departmentPositionId: departmentPositionId,
      requirement:
        jobRequirementEl.innerHTML !== '<br>'
          ? jobRequirementEl?.innerHTML
          : '',
      updateProperties: [
        'Name',
        'ShortDescription',
        'DescriptionTable',
        'Benefits',
        'CareerPaths',
        'Skills',
        'AverageSalary',
        'MaxSalary',
        'EmployeeAmount',
        'Requirement',
        'IsActive',
        profilePosition?.avatarUrl && 'AvatarUrl'
      ]
    }

    if (jobDescriptionList?.length >= 1) {
      const isCheck = false
      const tmp = {}
      jobDescriptionList.forEach((element, key) => {
        if (element?.name === '') {
          const content = {
            id: `jobDescription_name_${key}`
          }
          showErrorCustomArray(
            `jobDescription_name_${key}`,
            tmp,
            setErrors,
            content,
            'jobDescriptionList'
          )
          isCheck = true
        }
        if (element?.childs?.length > 0) {
          element?.childs.forEach((el, ind) => {
            if (el?.name === '') {
              const content = {
                id: `jobDescription_nameChild_${key}_${ind}`
              }
              showErrorCustomArray(
                `jobDescription_nameChild_${key}_${ind}`,
                tmp,
                setErrors,
                content,
                'jobDescriptionList'
              )
              isCheck = true
            }
            if (el?.value === '') {
              const content = {
                id: `jobDescription_valueChild_${key}_${ind}`
              }
              debugger
              showErrorCustomArray(
                `jobDescription_valueChild_${key}_${ind}`,
                tmp,
                setErrors,
                content,
                'jobDescriptionList'
              )
              isCheck = true
            }
          })
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

    if (benefits?.length < 2) {
      showErrorCustom('benefitList', errors, setErrors)
      return
    }

    if (benefits?.length >= 2) {
      const isCheck = false
      const tmp = {}
      benefits.forEach((element, key) => {
        if (element?.name === '') {
          const content = {
            id: `Benefits_name_${key}`
          }
          showErrorCustomArray(
            `Benefits_name_${key}`,
            tmp,
            setErrors,
            content,
            'benefitList'
          )
          isCheck = true
        }
        if (element?.description === '') {
          const content = {
            id: `Benefits_desciption_${key}`
          }
          showErrorCustomArray(
            `Benefits_desciption_${key}`,
            tmp,
            setErrors,
            content,
            'benefitList'
          )
          isCheck = true
        }
        if (element?.imageUrl === '') {
          const content = {
            id: `Benefits_imageUrl_${key}`
          }
          showErrorCustomArray(
            `Benefits_imageUrl_${key}`,
            tmp,
            setErrors,
            content,
            'benefitList'
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

    if (companySoftSkills?.length < 1) {
      showErrorCustom('companySoftSkills', errors, setErrors)
      return
    }

    if (companyProfessionalSkills?.length < 1) {
      showErrorCustom('companyProfessionalSkills', errors, setErrors)
      return
    }
    if (positionList?.length >= 1) {
      const isCheck = false
      const tmp = {}
      positionList.forEach((element, key) => {
        // if (element?.name === '') {
        //   const content = {
        //     id: `roadMap_name_${key}`
        //   }
        //   showErrorCustomArray(
        //     `roadMap_name_${key}`,
        //     tmp,
        //     setErrors,
        //     content,
        //     'roadMap'
        //   )
        //   isCheck = true
        // }
        if (element?.imageUrl === '') {
          const content = {
            id: `roadMap_imageUrl_${key}`
          }
          showErrorCustomArray(
            `roadMap_imageUrl_${key}`,
            tmp,
            setErrors,
            content,
            'roadMap'
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

    if (employeeAmount === null) {
      showErrorCustom('EmployeeAmount', errors, setErrors)
      return
    }

    if (averageSalary === null) {
      showErrorCustom('AverageSalary', errors, setErrors)
      return
    }

    if (
      selectedSalary.id === 2 &&
      parseInt(averageSalary) > parseInt(maxSalary)
    ) {
      showErrorCustomText(
        'AverageSalary',
        errors,
        setErrors,
        'Mức lương tối đa không được nhỏ hơn mức lương tối thiểu'
      )
      return
    }

    if (jobDescriptionList?.length === 0) {
      showErrorCustom('JobDescriptionList', errors, setErrors)
      return
    }

    if (jobRequirementEl?.innerText?.length > 500) {
      showErrorCustomText(
        'Requirement',
        errors,
        setErrors,
        'Yêu cầu công việc tối đa 500 ký tự'
      )
      return
    }
    if (applyBannerUrl?.length > -1 && companyId) {
      const payloadBannerApply = {
        companyId: companyId,
        applyBannerUrl: applyBannerUrl,
        updateProperties: ['ApplyBannerUrl']
      }
      await dispatch(saveBannerEdit(payloadBannerApply))
    }
    const res = await dispatch(savePositionBannerEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
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
      if (res?.payload?.errors) {
        const scrollId = Object?.keys(res?.payload?.errors)[0]
        const findEmptyEl = document.getElementById(scrollId)
        if (findEmptyEl) {
          findEmptyEl.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
          })
        }
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu thành công'
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

      if (departmentPositionId) {
        dispatch(getBannerEditPosition(query))
        dispatch(getCampaignPriceBannerPosition())
        dispatch(getJobCategory())
        onClickCancel()
      }
    }

    // ... add function here
    // handleShowViewMode()
  }
  const onClickDelete = async () => {
    toggleModal()
  }
  const onClickDuplicate = async () => {
    if (departmentPositionId) {
      const res = await dispatch(
        cloneDepartmentPositionEdit({
          departmentPositionId: departmentPositionId
        })
      )
      if (!res?.payload?.isSuccess) {
        toast(
          AlertWaring({
            title: res?.payload?.errorMessage
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
        const { payload } = res
        if (window !== undefined) {
          window.location.replace(
            `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/${payload?.data?.departmentPositionId}/edit`
          )
        }
      }
    }
  }
  const onClickPreview = () => {
    const jobRequirementEl = document.getElementById(
      'edit-mode-job-description-content'
    )

    if (!showPreview) {
      setShowPreview(true)
      setValuePreview({
        ...valuePreview,
        jobRequirement: jobRequirementEl?.innerHTML
      })
      handleShowViewMode()
    } else {
      setShowPreview(false)
      handleShowEditMode()
    }
  }

  // const onClickDraft = async (data) => {
  //   if (departmentPositionId) {
  //     onClickSave()
  //     const res = await dispatch(
  //       savePositionBannerEdit({
  //         ...profilePosition,
  //         departmentPositionId: departmentPositionId,
  //         companyId: companyId,
  //         isActive: data,
  //         updateProperties: ['IsActive']
  //       })
  //     )

  //     if (!res?.payload?.isSuccess) {
  //       toast(
  //         AlertWaring({
  //           title: res?.payload?.errorMessage
  //         }),
  //         {
  //           toastId: 'alert-save-warning',
  //           className: 'bg-toast-custom',
  //           closeButton: false,
  //           position: 'top-center',
  //           hideProgressBar: true,
  //           autoClose: 3000
  //         }
  //       )
  //     } else {
  //       toast(
  //         AlertSuccess({
  //           title: 'Bạn đã lưu thành công'
  //         }),
  //         {
  //           toastId: 'alert-create-success',
  //           className: 'bg-toast-custom',
  //           closeButton: false,
  //           position: 'top-center',
  //           hideProgressBar: true,
  //           autoClose: 3000
  //         }
  //       )

  //       if (departmentPositionId) {
  //         dispatch(getBannerEditPosition(query))
  //       }
  //     }
  //   }
  // }

  const onClickDraft = async () => {
    const jobRequirementEl = document.getElementById(
      'edit-mode-job-description-content'
    )

    const payload = {
      ...profilePosition,
      descriptionTable: jobDescriptionList,
      benefits: [...benefits],
      careerPaths: [...positionList],
      skills: [...companySoftSkills, ...companyProfessionalSkills],
      averageSalary: parseInt(averageSalary) || 0,
      maxSalary: parseInt(maxSalary) || 0,
      employeeAmount: parseInt(employeeAmount) || 0,
      companyId: companyId,
      departmentId: departmentId,
      isActive: false,
      departmentPositionId: departmentPositionId,
      requirement:
        jobRequirementEl.innerHTML !== '<br>'
          ? jobRequirementEl?.innerHTML
          : '',
      updateProperties: [
        'Name',
        'ShortDescription',
        'DescriptionTable',
        'Benefits',
        'CareerPaths',
        'Skills',
        'AverageSalary',
        'MaxSalary',
        'EmployeeAmount',
        'Requirement',
        'IsActive',
        profilePosition?.avatarUrl && 'AvatarUrl'
      ]
    }

    const res = await dispatch(savePositionBannerEdit(payload))
    if (!res?.payload?.isSuccess) {
      toast(
        AlertWaring({
          title: res?.payload?.errorMessage
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
      if (res?.payload?.errors) {
        const scrollId = Object?.keys(res?.payload?.errors)[0]
        const findEmptyEl = document.getElementById(scrollId)
        if (findEmptyEl) {
          findEmptyEl.scrollIntoView({
            behavior: 'auto',
            block: 'center',
            inline: 'center'
          })
        }
      }
    } else {
      toast(
        AlertSuccess({
          title: 'Bạn đã lưu nháp thành công'
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

      if (departmentPositionId) {
        dispatch(getBannerEditPosition(query))
        dispatch(getCampaignPriceBannerPosition())
        dispatch(getJobCategory())
        onClickCancel()
      }
    }

    // ... add function here
    // handleShowViewMode()
  }
  let menuEditList = [
    {
      title: 'Nhân bản',
      icon: 'duplicate',
      action: async (props) => {
        const { departmentPositionId } = props || {}
        if (departmentPositionId) {
          const res = await dispatch(
            cloneDepartmentPositionEdit({
              departmentPositionId: departmentPositionId
            })
          )
          if (!res?.payload?.isSuccess) {
            toast(
              AlertWaring({
                title: res?.payload?.errorMessage
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
            const { payload } = res
            if (window !== undefined) {
              window.location.replace(
                `/profile-company/${payload?.data?.companyId}/${payload?.data?.departmentId}/${payload?.data?.departmentPositionId}/edit`
              )
            }
          }
        }
      }
    },
    {
      title: isActive ? 'Ẩn' : 'Hiện',
      icon: isActive ? 'eyeOff2' : 'eye2',
      action: async (props) => {
        const { companyId, departmentPositionId } = props || {}
        if (departmentPositionId) {
          const res = await dispatch(
            updatePositionEdit({
              ...profilePosition,
              departmentPositionId: departmentPositionId,
              companyId: companyId,
              isActive: !isActive,
              updateProperties: ['IsActive']
            })
          )

          if (!res?.payload?.isSuccess) {
            toast(
              AlertWaring({
                title: res?.payload?.errorMessage
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
                title: 'Bạn đã lưu thành công'
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
            if (departmentPositionId) {
              dispatch(getBannerEditPosition(props))
            }
          }
        }
      }
    },
    {
      title: 'Xóa',
      icon: 'trash',
      action: async (props) => {
        toggleModal()
      }
    },
    {
      title: 'Chia sẻ vị trí',
      icon: 'forward',
      action: async (props) => {
        toggleModalShare()
      }
    }
  ]

  useEffect(() => {
    const el2 = document.getElementById('main-header-company')
    const checkOwner = async () => {
      if (companyId) {
        const res = await dispatch(hasEditPermission({ companyId }))

        if (!res?.payload?.isSuccess) {
          window.location.replace(`/profile-company/${companyId}`)
        } else {
          dispatch(updateMenuEdit(menuEditList))

          if (departmentPositionId) {
            dispatch(getBannerEditPosition(query))
            dispatch(getCampaignPriceBannerPosition())
            dispatch(getJobCategory())
            dispatch(getSystemImages())
            dispatch(getSystemImagesBenefitsPostion())
          }
          if (companyId) {
            dispatch(getAddressBooksCompany(parseInt(companyId)))
            dispatch(
              getBannerEdit({
                id: companyId
              })
            )
          }
        }
      }
    }

    checkOwner()
  }, [departmentId, departmentPositionId, dispatch, companyId])

  useEffect(() => {
    const el2 = document.getElementById('main-header-company')
    if (parseInt(checkEdit) === 1) {
      if (el2.style.display !== 'none') {
        toggleMainHeader()
        handleShowEditMode()
        window.onbeforeunload = (e) => {
          e.preventDefault()
          e.returnValue = ''
        }
      }
    }
  }, [checkEdit])
  useEffect(() => {
    dispatch(updateMenuEdit(menuEditList))
  }, [isActive])
  useEffect(() => {
    if (tag) {
      dispatch(
        getViewCountDepartmentPositionEditmode({
          departmentPositionId: departmentPositionId,
          tag: tag
        })
      )
    }
  }, [tag])
  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1">
        <Head>
          <title>Cập nhật chiến dịch tuyển dụng</title>
        </Head>
        <div className="relative">
          {editmode && !showPreview && (
            <div className="sticky top-0 w-full overflow-hidden z-[9999]">
              <div
                className="flex justify-between py-4 px-10 border-b border-grey-3 bg-white "
                style={{
                  filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
                }}
              >
                <Button
                  title="Hủy"
                  padding="sm:p-[12px_32px] p-2"
                  margin="m-0"
                  background="bg-white"
                  textWeight="sm:text-p18-bold text-p14 font-bold"
                  rounded="rounded-[8px] border border-grey-4"
                  height="h-auto"
                  type="button"
                  onClick={toggleModalBack}
                />

                <div className="flex gap-4">
                  <ButtonIcon
                    title="Xoá công việc"
                    padding="sm:p-[12px_24px] p-2"
                    margin="m-0"
                    background="bg-white"
                    color="text-semantic-red"
                    textWeight="sm:text-p18-bold text-p14 font-bold"
                    rounded="rounded-[8px] border border-semantic-red"
                    height="h-auto"
                    type="button"
                    width="w-auto"
                    iconName="trash"
                    iconStroke="#DB2E24"
                    iconFill="#DB2E24"
                    onClick={onClickDelete}
                    tooltipButton={true}
                  />
                  <ButtonIcon
                    title="Tạo bản sao"
                    padding="sm:p-[12px_24px] p-2"
                    margin="m-0"
                    background="bg-white"
                    color="text-button"
                    textWeight="sm:text-p18-bold text-p14 font-bold"
                    rounded="rounded-[8px] border border-button"
                    height="h-auto"
                    type="button"
                    width="w-auto"
                    iconName="clone"
                    iconStroke="#F6BB3A"
                    onClick={onClickDuplicate}
                    tooltipButton={true}
                  />
                  <ButtonIcon
                    title={`${'Lưu nháp'}`}
                    padding="sm:p-[12px_24px] p-2"
                    margin="m-0"
                    background="bg-white"
                    color="text-button"
                    textWeight="sm:text-p18-bold text-p14 font-bold"
                    rounded="rounded-[8px] border border-button"
                    height="h-auto"
                    type="button"
                    width="w-auto"
                    iconName={`${'saveDraft'}`}
                    iconStroke="#F6BB3A"
                    tooltipButton={true}
                    onClick={() => {
                      onClickDraft()
                    }}
                  />
                  <ButtonIcon
                    title={`${showPreview ? 'Chỉnh sửa' : 'Xem trước'}`}
                    padding="sm:p-[12px_24px] p-2"
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
                  />
                  <Button
                    title={`${'Đăng công việc'}`}
                    width="w-auto"
                    height="h-auto"
                    rounded="rounded-[8px]"
                    padding="sm:p-[12px_32px] p-2"
                    color="text-neutral"
                    margin="m-0"
                    textWeight="sm:text-p18-bold text-p14 font-bold"
                    tooltipButton={true}
                    onClick={() => {
                      onClickSave()
                    }}
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
                  Bạn đang ở chế độ xem trước phòng ban
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
              departmentId={departmentId}
              companyId={companyId}
              departmentPositionId={departmentPositionId}
            />
          )}
          <div>
            <BannerPositionEdit
              pageEditMode={editmode}
              editmode={editmode}
              errors={errors}
              handleResetErrors={handleResetErrors}
              views={views}
            />
          </div>
          <div>
            <JobDescriptionPositionEdit
              pageEditMode={editmode}
              errors={errors}
              setErrors={setErrors}
              handleResetErrors={handleResetErrors}
              showErrorCustomArray={showErrorCustomArray}
            />
          </div>
          <div>
            <BenefitsPositionEdit
              pageEditMode={editmode}
              errors={errors}
              setErrors={setErrors}
              handleResetErrors={handleResetErrors}
            />
          </div>
          <div>
            <JobRequirementsPositionEdit
              pageEditMode={editmode}
              showPreview={showPreview}
              errors={errors}
              handleResetErrors={handleResetErrors}
              valuePreview={valuePreview?.jobRequirement}
            />
          </div>
          <div>
            <SoftlSkillsPositionEdit
              errors={errors}
              pageEditMode={editmode}
              handleResetErrors={handleResetErrors}
            />
          </div>
          <div>
            <ProfessionalSkillsPositionEdit
              errors={errors}
              pageEditMode={editmode}
              handleResetErrors={handleResetErrors}
            />
          </div>
          <div>
            <DevRoadmapPosition
              pageEditMode={editmode}
              errors={errors}
              handleResetErrors={handleResetErrors}
            />
          </div>
          <div>
            <BannerApplyEdit pageEditMode={editmode} />
          </div>
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
          <p className="text-h3 text-center">Chia sẻ vị trí công việc</p>
          <div className="flex justify-center item-center gap-6 mt-6 mb-8 ">
            <FacebookShareButton
              url={
                process.env.NEXT_PUBLIC_HOST_URL +
                'profile-company/' +
                tag +
                '/' +
                departmentId +
                '/' +
                departmentPositionId
              }
              quote="Hồ sơ công ty"
              hashtag="#XProfile"
              className="Demo__some-network__share-button"
            >
              <XProfileIcon name="socialFacebook" fill="#000000" />
            </FacebookShareButton>
            <LinkedinShareButton
              id="shareLinkedBusinessAnalyst"
              url={
                process.env.NEXT_PUBLIC_HOST_URL +
                'profile-company/' +
                tag +
                '/' +
                departmentId +
                '/' +
                departmentPositionId
              }
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
                process.env.NEXT_PUBLIC_HOST_URL +
                'profile-company/' +
                tag +
                '/' +
                departmentId +
                '/' +
                departmentPositionId
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
          childStyle="w-fit h-fit  mt-4 shadow-md p-[32px] bg-white rounded-lg"
          toggleModal={toggleModal}
          open={modalConfirm}
        >
          <DeleteConfirmModal
            title="Bạn có chắc muốn xóa vị trí này?"
            desc="Khi xóa vị trí này, mọi thông tin về vị trí công việc sẽ bị xóa. Nếu không chắc chắn, bạn có thể tạm ẩn nhé!"
            handleClickDelete={handleClickDelete}
            handleClickCancel={toggleModal}
          />
        </Modal>
        <Modal
          childStyle="w-fit h-fit  mt-4  p-[32px] bg-white rounded-lg"
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
          addressBooks={addressBooks}
          FOOTER={FOOTER}
          FOOTER_PROFILE={FOOTER_PROFILE}
        />
      )}
    </>
  )
}

export default EditPositionPage
