import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getBannerEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETBANNEREDIT,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.GET_PROFILE_COMPANY}/${id}`)
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

export const saveBannerEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEBANNEREDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(api.EDIT.EDIT_MODE_UPDATE, payload)
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

const banner = createSlice({
  name: 'banner',
  initialState: {
    profile: {},
    imageUpload: '',
    bannerUpload: '',
    bannerApplyUrl: '',
    updateProperties: ['Name', 'AvatarUrl', 'ShortDescription', 'BannerUrl']
  },
  reducers: {
    updateBannerEdit(state, action) {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload
          // updateProperties: [...state.updateProperties]
        }
      }
    },
    updateAvatarImageUpload: (state, action) => {
      state.imageUpload = action.payload
    },
    updateBannerImageUpload: (state, action) => {
      state.bannerUpload = action.payload
    },
    updateBannerApplyUrl: (state, action) => {
      state.bannerApplyUrl = action.payload
    }
  },
  extraReducers: {
    [saveBannerEdit.fulfilled]: (state, action) => {
      return state
    },
    [getBannerEdit.fulfilled]: (state, action) => {
      return { ...state, profile: action?.payload?.data }
    }
  }
})
export const selectBannerProfile = (state) =>
  state?.editModeCompany?.company?.banner?.profile

export const selectImageAvatarUpload = (state) =>
  state?.editModeCompany?.company?.banner?.imageUpload
export const selectImageBannerUpload = (state) =>
  state?.editModeCompany?.company?.banner?.bannerUpload
export const selectImageBannerApplyUrl = (state) =>
  state?.editModeCompany?.company?.banner?.bannerApplyUrl
export const {
  updateBannerEdit,
  updateAvatarImageUpload,
  updateBannerImageUpload,
  updateBannerApplyUrl
} = banner.actions

export default banner.reducer
