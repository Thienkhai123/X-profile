import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getDepartmentIntro = createAsyncThunk(
  APP_TYPES.EDIT.GETPROFILEINTRO,
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params || {}
      const response = await axios.get(`${api.EDIT.EDIT_GET_DEPARTMENT}/${id}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getDepartmentIntroFunfact = createAsyncThunk(
  APP_TYPES.EDIT.GETFUNCFACTINTRO,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentId } = params || {}
      const response = await axios.get(
        `${api.DEPARTMENT.FUNFACT}/${departmentId}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const saveDepartmentIntroEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEDEPARTMENTINTROEDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.EDIT.EDIT_MODE_DEPARTMENT_UPDATE,
        payload
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return err.response.data
    }
  }
)

export const getDepartmentFunFactImages = createAsyncThunk(
  APP_TYPES.HELPER.GETFUNFACTIMAGES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.HELPER.GET_FUNFACT_IMAGES}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const intro = createSlice({
  name: 'intro',
  initialState: {
    profile: null,
    profileEdit: null,
    avatarUrlUpload: '',
    funfacts: [],
    funfactsDefault: [],
    funfactImages: []
  },
  reducers: {
    updateAvatarUrl: (state, action) => {
      state.avatarUrlUpload = action.payload
    },
    updateProfileEdit: (state, action) => {
      state.profileEdit = { ...action.payload }
    },
    updateFunfactIntro: (state, action) => {
      state.funfacts = [...action.payload]
    }
  },
  extraReducers: {
    [getDepartmentIntro.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload.data,
        profileEdit: action.payload.data
      }
    },
    [getDepartmentIntro.rejected]: (state) => {
      return state
    },
    [saveDepartmentIntroEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload.data,
        profileEdit: action.payload.data
      }
    },
    [saveDepartmentIntroEdit.rejected]: (state) => {
      return state
    },
    [getDepartmentIntroFunfact.rejected]: (state) => {
      return state
    },
    [getDepartmentIntroFunfact.fulfilled]: (state, action) => {
      return {
        ...state,
        funfacts: action.payload.data,
        funfactsDefault: action.payload.data
      }
    },
    [getDepartmentFunFactImages.fulfilled]: (state, action) => {
      return {
        ...state,
        funfactImages: action.payload
      }
    }
  }
})

export const selectProfileEditIntro = (state) =>
  state.editModeCompany.department.intro.profileEdit

export const selectAvatarUrlUpload = (state) =>
  state.editModeCompany.department.intro.avatarUrlUpload

export const selectProfileIntro = (state) =>
  state.editModeCompany.department.intro.profile

export const selectFunFactImages = (state) =>
  state.editModeCompany.department.intro.funfactImages

export const selectFunfactsIntro = (state) => {
  const response = []
  const funfact = state.editModeCompany.department.intro.funfacts
  funfact?.map((el) => {
    response.push({
      title: el?.name,
      description: el?.description,
      src: el?.imageUrl
    })
  })
  return response
}

export const selectFunfactsEditIntro = (state) =>
  state.editModeCompany.department.intro.funfacts

export const selectFunfactsDefaultEditIntro = (state) =>
  state.editModeCompany.department.intro.funfactsDefault

export const { updateAvatarUrl, updateProfileEdit, updateFunfactIntro } =
  intro.actions

export default intro.reducer
