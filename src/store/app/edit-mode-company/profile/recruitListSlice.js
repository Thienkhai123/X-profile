import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import { getBannerEdit } from './bannerSlice'
export const getAllRecruitmentEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETRECRUITMENTCAMPAIGN,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.EDIT_GET_RECRUITMENT_CAMPAIGN}/${companyId}`
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
const recruitList = createSlice({
  name: 'recruitList',
  initialState: {
    recruitmentCampaign: [],
    recruitmentSelected: [],
    recruitmentSelectedDefault: []
  },
  reducers: {
    updateRecruitmentSelected(state, action) {
      state.recruitmentSelected = action.payload
    }
  },
  extraReducers: {
    [getBannerEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        recruitmentSelected:
          action?.payload?.data?.meta?.preferedCampaignIds || [],
        recruitmentSelectedDefault:
          action?.payload?.data?.meta?.preferedCampaignIds || []
      }
    },
    [getAllRecruitmentEdit.fulfilled]: (state, action) => {
      return { ...state, recruitmentCampaign: action?.payload?.data }
    }
  }
})
export const selectInitRecruitList = (state) =>
  state?.editModeCompany?.company?.recruitList

export const { updateRecruitmentSelected } = recruitList.actions
export default recruitList.reducer
