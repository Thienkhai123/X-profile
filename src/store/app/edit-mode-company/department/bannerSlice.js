import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
export const getBannerEditDepartment = createAsyncThunk(
  APP_TYPES.EDIT.GETDEPARTMENT,
  async (params, { rejectWithValue }) => {
    const { departmentId, companyId } = params
    try {
      const departmentProfile = await axios.get(
        `${api.EDIT.EDIT_GET_DEPARTMENT}/${departmentId}`
      )
      const companyProfile = await axios.get(
        `${api.EDIT.GET_PROFILE_COMPANY}/${companyId}`
      )
      const response = await Promise.all([departmentProfile, companyProfile])
      return response
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      let pathname = window.location.pathname.replace(`/${departmentId}`, '')
      window.location.replace(pathname)
      return rejectWithValue(err.response)
    }
  }
)
export const saveDepartmentBannerEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEDEPARTMENTBANNEREDIT,
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
export const deleteDepartmentEdit = createAsyncThunk(
  APP_TYPES.EDIT.DELETEDEPARTMENTEDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.EDIT.EDIT_MODE_DEPARTMENT_DELETE,
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
export const updateDepartmentEdit = createAsyncThunk(
  APP_TYPES.EDIT.UPDATEDEPARTMENTEDIT,
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
const banner = createSlice({
  name: 'banner',
  initialState: {
    profileDepartment: {},
    profileCompany: {},
    imageUpload: ''
  },
  reducers: {
    updateDepartmentBannerEdit(state, action) {
      state.profileDepartment = action.payload
    },
    updateDepartmentBannerImageUpload: (state, action) => {
      state.imageUpload = action.payload
    }
  },
  extraReducers: {
    [getBannerEditDepartment.fulfilled]: (state, action) => {
      const [departmentProfile, companyProfile] = action.payload
      return {
        ...state,
        profileDepartment: departmentProfile.data.data,
        profileCompany: companyProfile.data.data
      }
    },
    [saveDepartmentBannerEdit.fulfilled]: (state, action) => {
      return state
    },
    [deleteDepartmentEdit.fulfilled]: (state, action) => {
      return state
    },
    [updateDepartmentEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})
export const selectInitSateDepartment = (state) =>
  state?.editModeCompany?.department?.banner
export const selectDepartmentImageAvatarUpload = (state) =>
  state?.editModeCompany?.department?.banner?.imageUpload
export const { updateDepartmentBannerEdit, updateDepartmentBannerImageUpload } =
  banner.actions
export default banner.reducer
