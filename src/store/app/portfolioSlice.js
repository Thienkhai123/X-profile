import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { toast } from 'react-toastify'
import {
  addChildrenToExistParentTemplate,
  addChildrenToParentTemplate
} from 'store/helper/functionHelper'
import { authService } from 'store/helper/authService'
import moment from 'moment'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

export const getAllTemplateOption = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETALLTEMPLATEOPTION,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        api.PORTFOLIO.GET_ALL_TEMPLATE_OPTION,
        params
      )
      return data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          if (authService.getAccessToken()) {
            authService.logOut()
            window.location.replace('/logout')
          }
        case 400:
          if (authService.getAccessToken()) {
            window.location.replace('/logout')
          }
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllSkill = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api.USERSKILL.GET_ALL_SKILL, params)
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const getAllSkillV2 = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLSKILLV2,
  async (params, { rejectWithValue }) => {
    try {
      const { type } = params || {}
      const { data } = await axios.get(
        api.USERSKILL.GET_ALL_SKILL_V2 + '?type=' + type
      )
      return {
        data: data,
        type: type
      }
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const getAllUserSkill = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLUSERSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api.USERSKILL.GET_ALL_USER_SKILL, params)
      return data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/logout')
      //     return
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const getAllLanguages = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLLANGUAGE,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        api.USERSKILL.GET_ALL_USER_LANGUAGES,
        params
      )
      return data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/logout')
      //     return
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllUserSkillByTagName = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLUSERSKILLBYTAG,
  async (params, { rejectWithValue }) => {
    const { tag = '' } = params || {}
    try {
      const { data } = await axios.get(
        api.USERSKILL.GET_ALL_USERSKILL_BY_TAG + tag
      )
      return data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/logout')
      //     return
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

export const getAchivementImages = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETACHIVEMENTIMAGES,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(
        api.PORTFOLIO.GET_ACHIVEMENT_IMAGES,
        params
      )
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const getUserPortfolio = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETUSERPORTFOLIO,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api.PORTFOLIO.GET_USER_PORTFOLIO, params)
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const createUserTemplateOptionValue = createAsyncThunk(
  APP_TYPES.PORTFOLIO.CREATEUSERTEMPLATEOPTIONVALUE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.PORTFOLIO.CREATE_USER_TEMPLATE_OPTION_VALUE,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-create-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const createListUserTemplateOptionValue = createAsyncThunk(
  APP_TYPES.PORTFOLIO.CREATELISTUSERTEMPLATEOPTIONVALUE,
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        api.PORTFOLIO.CREATE_LIST_USER_TEMPLATE_OPTION_VALUE,
        payload
      )
      return data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-save-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateListUserTemplateOptionValue = createAsyncThunk(
  APP_TYPES.PORTFOLIO.UPDATELISTUSERTEMPLATEOPTIONVALUE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.PORTFOLIO.UPDATE_LIST_USER_TEMPLATE_OPTION_VALUE,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateUserPortfolio = createAsyncThunk(
  APP_TYPES.PORTFOLIO.UPDATEUSERPORTFOLIO,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.PORTFOLIO.UPDATE_USER_PORTFOLIO,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const updateActiveStatusUserTemplateOptionValue = createAsyncThunk(
  APP_TYPES.PORTFOLIO.UPDATEACTIVESTATUSUSERTEMPLATEOPTIONVALUE,
  async (payload, { rejectWithValue }) => {
    try {
      const { selectedTemplates } = payload
      const response = await Promise.all(
        selectedTemplates.map(
          (opt) =>
            new Promise(async (resolve) => {
              const { templateOptionValueId, isActive } = opt
              const { data } = await axios.post(
                api.PORTFOLIO.UPDATE_ACTIVE_STATUS_USER_TEMPLATE_OPTION_VALUE,
                {
                  templateOptionValueId,
                  isActive
                }
              )
              resolve(data)
            })
        )
      )
      return response
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const inActiveTemplate = createAsyncThunk(
  APP_TYPES.PORTFOLIO.INACTIVETEMPLATE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.PORTFOLIO.UPDATE_ACTIVE_STATUS_USER_TEMPLATE_OPTION_VALUE,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const publishPortfolio = createAsyncThunk(
  APP_TYPES.PORTFOLIO.PUBLISHPORTFOLIO,
  async (payload, { rejectWithValue }) => {
    const { isShowToast = true } = payload || {}
    try {
      const response = await axios.post(api.PORTFOLIO.PUBLISH_PORTFOLIO)
      if (response?.data && isShowToast) {
        toast(
          AlertSuccess({
            title: 'Thông tin của bạn đã được ghi nhận.'
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
      }
      return response.data
    } catch (err) {
      toast(
        AlertError({
          title: err.response.data.errorMessage
        }),
        {
          toastId: 'alert-update-error',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
      return rejectWithValue(err.response.data)
    }
  }
)

export const setOpenToWork = createAsyncThunk(
  APP_TYPES.PORTFOLIO.SETOPENTOWORK,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.PORTFOLIO.SET_OPEN_TO_WORK, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const updatePortfolioTag = createAsyncThunk(
  APP_TYPES.PORTFOLIO.UPDATEPORTFOLIOTAG,
  async (payload, { rejectWithValue }) => {
    try {
      const { guiIdValue = '' } = payload || {}
      const response = await axios.post(
        api.PORTFOLIO.UPDATE_PORTFOLIO_TAG + guiIdValue
      )
      if (response?.data) {
        toast(
          AlertSuccess({
            title: 'Thông tin của bạn đã được ghi nhận.'
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
      }
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-update-error',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)
export const checkTagName = createAsyncThunk(
  APP_TYPES.PORTFOLIO.CHECKTAGNAME,
  async (payload, { rejectWithValue }) => {
    const { tag } = payload
    try {
      const response = await axios.post(
        `${api.PORTFOLIO.CHECK_TAG_NAME}/${tag}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response
    }
  }
)

export const getAllQuestionHints = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETALLQUESTIONHINTS,
  async (params, { rejectWithValue }) => {
    const { tag = '' } = params
    try {
      const { data } = await axios.get(
        api.PORTFOLIO.GET_ALL_QUESTION_HINTS + `/${tag}`
      )
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)
export const getUserApplyStatus = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETUSERAPPLYSTATUS,
  async (params, { rejectWithValue }) => {
    const { tag = '' } = params
    try {
      const { data } = await axios.get(
        api.PORTFOLIO.GET_USER_APPLY_STATUS + `/${tag}`
      )
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)
export const inviteUserApply = createAsyncThunk(
  APP_TYPES.PORTFOLIO.INVITEUSERAPPLY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.PORTFOLIO.INVITE_USER_APPLY, params)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      // return rejectWithValue(err.response)
    }
  }
)
export const getAllContent = createAsyncThunk(
  APP_TYPES.PORTFOLIO.GETALLCONTENT,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api.PORTFOLIO.GET_ALL_CONTENT, params)
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const portfolio = createSlice({
  name: 'portfolio',
  initialState: {
    profile: {},
    userPortfolio: {},
    templateOptions: [],
    skills: [],
    skillsAdvanced: [],
    skillsCommon: [],
    userSkills: [],
    languages: [],
    achivementImages: [],
    firstLoading: true,
    commonQuestions: [],
    professionalQuestions: [],
    contentPDF: {},
    applyStatus: null
  },
  reducers: {
    updateFirstLoading: (state, action) => {
      return {
        ...state,
        firstLoading: action.payload
      }
    }
  },
  extraReducers: {
    [getAllTemplateOption.fulfilled]: (state, action) => {
      return {
        ...state,
        templateOptions: action.payload.data
      }
    },
    [getAllTemplateOption.rejected]: (state) => {
      return state
    },
    [getUserPortfolio.fulfilled]: (state, action) => {
      return {
        ...state,
        userPortfolio: action.payload.data
      }
    },
    [getUserPortfolio.rejected]: (state) => {
      return state
    },
    [getAllSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        skills: action.payload.data
      }
    },
    [getAllSkill.rejected]: (state) => {
      return state
    },
    [getAllUserSkillByTagName.fulfilled]: (state, action) => {
      return {
        ...state,
        userSkills: action.payload.data
      }
    },
    [getAllUserSkillByTagName.rejected]: (state) => {
      return state
    },
    [getAllSkillV2.fulfilled]: (state, action) => {
      const { type, data } = action.payload
      if (type === 1) {
        return {
          ...state,
          skillsAdvanced: data.data
        }
      } else {
        return {
          ...state,
          skillsCommon: data.data
        }
      }
    },
    [getAllSkillV2.rejected]: (state) => {
      return state
    },
    [getAllUserSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        userSkills: action.payload.data
      }
    },
    [getAllUserSkill.rejected]: (state) => {
      return state
    },
    [getAllLanguages.fulfilled]: (state, action) => {
      return {
        ...state,
        languages: action.payload.data
      }
    },
    [getAllLanguages.rejected]: (state) => {
      return state
    },
    [getAchivementImages.fulfilled]: (state, action) => {
      return {
        ...state,
        achivementImages: action.payload.data
      }
    },
    [getAchivementImages.rejected]: (state) => {
      return state
    },
    [checkTagName.fulfilled]: (state, action) => {
      return state
    },
    [getAllQuestionHints.fulfilled]: (state, action) => {
      const { commonQuestions = [], professionalQuestions = [] } =
        action.payload.data || {}
      return {
        ...state,
        commonQuestions: commonQuestions,
        professionalQuestions: professionalQuestions
      }
    },
    [getAllQuestionHints.rejected]: (state, action) => {
      return state
    },
    [getUserApplyStatus.fulfilled]: (state, action) => {
      const { status } = action.payload.data || {}
      return {
        ...state,
        applyStatus: status
      }
    },
    [getUserApplyStatus.rejected]: (state, action) => {
      return state
    },
    [getAllContent.rejected]: (state, action) => {
      return {
        ...state
      }
    },
    [getAllContent.fulfilled]: (state, action) => {
      return { ...state, contentPDF: action.payload.data }
    },
    [inviteUserApply.fulfilled]: (state) => {
      return state
    },
    [inviteUserApply.rejected]: (state) => {
      return state
    }
  }
})

export const selectAllTemplateOptions = (state) => {
  let temp = []
  const templateOptions = state.portfolio.templateOptions
  templateOptions.forEach((item1) => {
    let tempItem1 = { ...item1, children: {} }
    templateOptions.forEach((item2) => {
      if (item2.parentId === item1.templateOptionId) {
        tempItem1.children[item2.templateOptionKey] = item2
      }
    })
    if (tempItem1.parentId === null) {
      temp.push(tempItem1)
    }
  })
  return temp
}

export const selectUserPortfolio = (state) => state.portfolio.userPortfolio
export const selectAllSkill = (state) => state.portfolio.skills
export const selectSkillsCommon = (state) => state.portfolio.skillsCommon
export const selectSkillsAdvance = (state) => state.portfolio.skillsAdvanced
export const selectUserSkill = (state) => state.portfolio.userSkills
export const selectLanguages = (state) => state.portfolio.languages
export const selectContentPDF = (state) => state.portfolio.contentPDF
export const selectAchivementImages = (state) =>
  state.portfolio.achivementImages

export const selectTemplateValue = (state) => {
  const templateOptionValues =
    state?.portfolio?.userPortfolio?.templateOptionValues || []

  return addChildrenToParentTemplate(templateOptionValues)
}

export const selectTemplateForDnd = (state) => {
  const templateOptionValues =
    state?.portfolio?.userPortfolio?.templateOptionValues || []
  const tempValues = addChildrenToExistParentTemplate(templateOptionValues)
  const response = []
  const ids = []
  if (Object.keys(tempValues).length > 0) {
    const templateOptionValueIds =
      state?.portfolio?.userPortfolio?.templateOptionValueIds || ''
    templateOptionValueIds?.split(',')?.map((id) => {
      const existElement = tempValues.find(
        (element) => element.templateOptionId === parseInt(id)
      )
      if (existElement && !ids.includes(existElement.templateOptionId)) {
        response.push(existElement)
        ids.push(existElement.templateOptionId)
      }
    })
  }
  return response
}

export const selectTemplateForDndViewMode = (
  state,
  templateOptionValues = [],
  templateOptionValueIds = ''
) => {
  const tempValues = addChildrenToExistParentTemplate(templateOptionValues)
  const response = []
  const ids = []
  if (Object.keys(tempValues).length > 0) {
    templateOptionValueIds?.split(',')?.map((id) => {
      const existElement = tempValues.find(
        (element) => element.templateOptionId === parseInt(id)
      )
      if (existElement && !ids.includes(existElement.templateOptionId)) {
        response.push(existElement)
        ids.push(existElement.templateOptionId)
      }
    })
  }
  return response
}
export const selectFirstLoading = (state) => state.portfolio.firstLoading

export const selectAllQuestionHints = (state) => {
  return {
    commonQuestions: state.portfolio.commonQuestions,
    professionalQuestions: state.portfolio.professionalQuestions
  }
}
export const selectApplyStatus = (state) => state.portfolio.applyStatus

export const selectATSContent = createSelector(selectContentPDF, (content) => {
  const jobExperiences = []
  const languages = []
  const achievements = []
  const certificates = []
  const commonSkills = []
  const specializedSkills = []
  const educations = []
  const otherExperiences = []

  content?.jobExperiences?.forEach((element) => {
    const timeTo = moment(element?.to).format('YYYY/DD')
    const timeForm = moment(element?.from).format('YYYY/DD')
    const tmp = {
      skillName: element?.name,
      company: element?.place,
      description: element?.description,
      time: element?.customTimeString || timeTo + ' - ' + timeForm
    }
    jobExperiences.push(tmp)
  })

  content?.languages?.forEach((element) => {
    const tmp = {
      title: element?.name
    }
    languages.push(tmp)
  })

  content?.educations?.forEach((element) => {
    const timeTo = moment(element?.to).format('YYYY')
    const timeForm = moment(element?.from).format('YYYY')
    const tmp = {
      schoolName: element?.name,
      academicYear: element?.place,
      timeLearn: timeTo.toString() + '-' + timeForm.toString()
    }
    educations.push(tmp)
  })

  content?.commonSkills?.forEach((element) => {
    const tmp = {
      title: element?.name
    }
    commonSkills.push(tmp)
  })

  content?.specializedSkills?.forEach((element) => {
    const tmp = {
      title: element?.name
    }
    specializedSkills.push(tmp)
  })

  content?.achievements?.forEach((element) => {
    const time = moment(element?.time).format('DD/YYYY')
    const tmp = {
      title: element?.name,
      time: element?.customTimeString || time
    }
    achievements.push(tmp)
  })

  content?.certificates?.forEach((element) => {
    const tmp = {
      title: element?.name,
      time: element?.time
    }
    certificates.push(tmp)
  })

  content?.otherExperiences?.forEach((element) => {
    const tmp = {
      title: element?.name,
      description: element?.description
    }
    otherExperiences.push(tmp)
  })

  const contentPDF = {
    name: content?.name,
    mail: content?.email,
    numberPhone: content?.phone,
    address: content?.address || '',
    introduce: content?.description || '',
    workExperience: jobExperiences || [],
    educations: educations || [],
    language: languages || [],
    generalSkills: commonSkills || [],
    professionalSkills: specializedSkills || [],
    certifications: certificates || [],
    achievement: achievements || [],
    experiences: otherExperiences || []
  }

  return contentPDF
})

export const { updateFirstLoading } = portfolio.actions

export default portfolio.reducer
