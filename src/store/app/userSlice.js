import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { AUTH_ROUTES } from 'common/config/app.constants'
import { pickCharacter } from './homeSlice'
import { saveData } from 'store/helper/functionHelper'
import { authService } from 'store/helper/authService'
import jsPDF from 'jspdf'

export const getProfile = createAsyncThunk(
  APP_TYPES.USER.GETPROFILE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.USER.GET_PROFILE, params)
      const url = window.location.pathname
      if (AUTH_ROUTES.includes(url)) {
        window.location.replace('/')
      }
      return response.data
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

export const updateProfile = createAsyncThunk(
  APP_TYPES.USER.UPDATEPROFILE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(api.USER.UPDATE_PROFILE, payload)
      return response.data
    } catch (err) {
      switch (
        err.response.status
        // case 401:
        //   window.location.replace('/sign-in')
        //   return rejectWithValue(err.response)
        // default:
      ) {
      }
      return err.response
    }
  }
)

export const updatePersonalProfile = createAsyncThunk(
  APP_TYPES.USER.UPDATEPERSONALPROFILE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.USER.UPDATE_PERSONAL_PROFILE,
        payload
      )
      return response.data
    } catch (err) {
      switch (
        err.response.status
        // case 401:
        //   window.location.replace('/sign-in')
        //   return rejectWithValue(err.response)
        // default:
      ) {
      }
      return err.response
    }
  }
)
export const getJobCategory = createAsyncThunk(
  APP_TYPES.JOB.GETJOBBYJOBCATEGORY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_JOB_BY_JOB_CATEGORY, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          return rejectWithValue(err.response)
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getExportPdf = createAsyncThunk(
  APP_TYPES.USER.EXPORTPDF,
  async (payload, { rejectWithValue }) => {
    try {
      const { lang = '' } = payload || {}
      window.open(
        api.USER.EXPORT_PDF +
          '?token=' +
          authService.getAccessToken() +
          '&lang=' +
          lang
      )
      return {}
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          return rejectWithValue(err.response)
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getExportPdfHtml = createAsyncThunk(
  APP_TYPES.USER.EXPORTPDFHTML,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.USER.EXPORT_PDF_HTML + '?token=' + authService.getAccessToken()
      )

      // const printWindow = window.open('', '', 'height=400,width=800')
      // printWindow.document.write(response.data)
      // printWindow.document.close()
      // printWindow.print()
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          return rejectWithValue(err.response)
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const user = createSlice({
  name: 'user',
  initialState: {
    profile: {},
    categories: [],
    jobDetail: {},
    settings: null,
    editMode: false,
    jobCategory: [],
    roleId: null,
    avatarUpload: '',
    socialLink: [
      {
        type: 'website',
        typeDisplay: 'Website',
        icon: 'socialWebsiteIcon',
        isShow: true,
        url: ''
      },
      {
        type: 'facebook',
        typeDisplay: 'Facebook',
        icon: 'socialFacebook',
        isShow: true,
        url: ''
      },
      {
        type: 'linkedIn',
        typeDisplay: 'Linkedin',
        icon: 'socialLinkedIn',
        isShow: true,
        url: ''
      },
      {
        type: 'instagram',
        typeDisplay: 'Instagram',
        icon: 'socialInstagram',
        isShow: true,
        url: ''
      },
      {
        type: 'behance',
        typeDisplay: 'Behance',
        icon: 'socialBehanceIcon',
        isShow: true,
        url: ''
      },
      {
        type: 'gitHub',
        typeDisplay: 'GitHub',
        icon: 'socialGithub',
        isShow: true,
        url: ''
      },
      {
        type: 'dribbble',
        typeDisplay: 'Dribbble',
        icon: 'socialDribbble',
        isShow: true,
        url: ''
      },
      {
        type: 'tiktok',
        typeDisplay: 'Tiktok',
        icon: 'socialTiktok',
        isShow: true,
        url: ''
      },
      {
        type: 'youtube',
        typeDisplay: 'Youtube',
        icon: 'socialYoutube',
        isShow: true,
        url: ''
      }
    ],
    socialsResult: []
  },
  reducers: {
    updateEditMode(state, action) {
      return {
        ...state,
        editMode: action.payload
      }
    },
    updateAvatarUpload: (state, action) => {
      state.avatarUpload = action.payload
    },
    updateUserProfile: (state, action) => {
      state.profile = action.payload
    },
    updateUserSocial: (state, action) => {
      state.socialsResult = action.payload
    }
  },
  extraReducers: {
    [getProfile.fulfilled]: (state, action) => {
      const tempSocial = [
        ...state.socialLink,
        ...(action.payload.data?.setting?.socials || [])
      ].reduce((acc, x) => {
        acc[x.type] = { ...(acc[x.type] || {}), ...x }
        return acc
      }, {})
      return {
        ...state,
        profile: action.payload.data,
        roleId: action.payload.data?.setting?.characterId,
        socialsResult: Object.values(tempSocial) || []
      }
    },
    [getProfile.rejected]: (state) => {
      return {
        ...state,
        profile: null
      }
    },
    [updateProfile.fulfilled]: (state) => {
      return state
    },
    [updateProfile.rejected]: (state) => {
      return state
    },
    [updatePersonalProfile.fulfilled]: (state) => {
      return state
    },
    [updatePersonalProfile.rejected]: (state) => {
      return state
    },
    [pickCharacter.fulfilled]: (state, action) => {
      return {
        ...state,
        settings: action.payload.data
      }
    },
    [getJobCategory.rejected]: (state) => {
      return state
    },
    [getJobCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        jobCategory: action.payload.data
      }
    },
    [getExportPdfHtml.rejected]: (state) => {
      return state
    },
    [getExportPdfHtml.fulfilled]: (state, action) => {
      return {
        ...state
      }
    }
  }
})

export const selectUserProfile = (state) => state.user.profile
export const selectUserSocial = (state) => state.user.socialsResult
export const selectRoleIdUser = (state) => state.user.roleId
export const selectAvatarUpload = (state) => state.user.avatarUpload

export const selectUserProfileCandidates = (state) => {
  const { name, email, setting, phone, avatarUrl } = state.user.profile || {}
  const { jobName } = setting || {}
  return {
    avatarUrl,
    name,
    email,
    industry: jobName,
    information: [
      { icon: 'card', title: 'Họ và tên', description: name },
      {
        icon: 'career',
        title: 'Vị trí ứng tuyển',
        description: jobName
      },
      { icon: 'email', title: 'Email', description: email },
      {
        icon: 'phone',
        title: 'Số điện thoại',
        description: phone || 'UnKnown'
      },
      {
        icon: 'team',
        title: 'Lĩnh vực',
        description: 'No decription.'
      }
    ]
  }
}
export const selectJobCategory = (state) => state.user.jobCategory
export const selectEditMode = (state) => state.user.editMode

export const selectSettings = (state) => state.user.settings

export const {
  updateEditMode,
  updateAvatarUpload,
  updateUserProfile,
  updateUserSocial
} = user.actions

export default user.reducer
