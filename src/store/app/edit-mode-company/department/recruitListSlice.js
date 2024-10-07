import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import { getBannerEdit } from './bannerSlice'

export const getRecruitmentEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETRECRUITMENT,
  async (params, { rejectWithValue }) => {
    const { departmentId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.EDIT_GET_RECRUITMENT_DEPARMENT}/${departmentId}`
      )
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
const recruitmentList = createSlice({
  name: 'recruitList',
  initialState: {
    recruitment: []
  },
  reducers: {},
  extraReducers: {
    [getRecruitmentEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        recruitment: action?.payload?.data || []
      }
    },
    [getRecruitmentEdit.rejected]: (state, action) => {
      return { ...state }
    }
  }
})
export const selectRecruitment = (state) =>
  state?.editModeCompany?.department?.recruitmentList?.recruitment

export default recruitmentList.reducer
