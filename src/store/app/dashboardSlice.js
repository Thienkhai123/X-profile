import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllCompanyDashboard = createAsyncThunk(
  APP_TYPES.COMPANYREPORT.GETDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.COMPANYREPORT.DETAIL, params)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const getPastCompanyDashboard = createAsyncThunk(
  APP_TYPES.COMPANYREPORT.GETPASTDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.COMPANYREPORT.DETAIL, params)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const getTotalDashboard = createAsyncThunk(
  APP_TYPES.COMPANYREPORT.GETGENERAL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COMPANYREPORT.GENERAL)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const getAllDepartmentPositionsFilter = createAsyncThunk(
  APP_TYPES.COMPANYREPORT.GETALLDEPARTMENTPOSITIONS,
  async (params, { rejectWithValue }) => {
    const { tag } = params
    try {
      const response = await axios.get(
        `${api.COMPANYREPORT.GET_ALL_DEPARTMENT_POSITIONS}?tag=${tag}`
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

const dashboard = createSlice({
  name: 'dashboard',
  initialState: {
    dashboardData: [],
    dashboardPastData: [],
    departmentPositionsFilter: [],
    queryFilter: {},
    meta: {},
    totalGeneral: 0,
    timeType: [
      { type: null, typeDisplay: 'Tất cả' },
      { type: 1, typeDisplay: 'Fulltime' },
      { type: 2, typeDisplay: 'Part-time' },
      { type: 3, typeDisplay: 'Freelance' }
    ]
  },
  reducers: {
    updateRecruitmentTestSelected(state, action) {
      state.recruitmentTestSelected = action.payload
    },
    updateQueryDashboard(state, action) {
      state.queryFilter = action.payload
    }
  },
  extraReducers: {
    [getAllCompanyDashboard.fulfilled]: (state, action) => {
      return {
        ...state,
        dashboardData: action.payload.data
      }
    },
    [getPastCompanyDashboard.fulfilled]: (state, action) => {
      return {
        ...state,
        dashboardPastData: action.payload.data
      }
    },
    [getTotalDashboard.fulfilled]: (state, action) => {
      return {
        ...state,
        totalGeneral: action.payload.data?.totalEndUsers || 0
      }
    },
    [getAllDepartmentPositionsFilter.fulfilled]: (state, action) => {
      return {
        ...state,
        departmentPositionsFilter: action.payload.data
      }
    }
    // [getAllRecruitmentCv.fulfilled]: (state, action) => {
    //   return {
    //     ...state,
    //     recruitments: action.payload.data,
    //     recruitmentFilter: action.payload.data?.map((el) => ({
    //       name: el?.name,
    //       recruitmentCampaignId: el?.recruitmentCampaignId
    //     }))
    //   }
    // }
  }
})

export const selectInitDashboard = (state) => state.dashboard
// export const selectIsMaxPage = (state) => state.search.isMaxPage

// export const selectAllJobsCompanies = (state) => state.search.jobCompanies

// export const selectQueryDashboard = (state) => state.dashboard.queries
// export const selectPriotiryData = (state) => state.search.PriotiryData
export const { updateQueryDashboard } = dashboard.actions

export default dashboard.reducer
