import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

const CV_DATA = {
  data: [
    {
      id: 0,
      name: 'Tiffany Yeh',
      avatarUrl: '/images/avatarDepartmentTemplate.png',
      jobTitle: 'Senior Graphic Designer',
      type: 'Full time • Part-time',
      percent: 0
    },
    {
      id: 1,
      name: 'Justin Mezzell',
      avatarUrl: '/images/avatar.png',
      jobTitle: 'Senior Graphic Designer',
      type: 'Full time • Part-time',
      percent: 80
    },
    {
      id: 2,
      name: 'Monty Hayton',
      avatarUrl: '/images/positionTemplate.png',
      jobTitle: 'Senior Graphic Designer',
      type: 'Full time • Part-time',
      percent: 70
    },
    {
      id: 3,
      name: 'Monty Hayton',
      avatarUrl: '/images/avatarDepartmentTemplate.png',
      jobTitle: 'Senior Graphic Designer',
      type: 'Full time • Part-time',
      percent: 40
    },
    {
      id: 4,
      avatarUrl: '/images/avatarDepartmentTemplate.png',
      name: 'Tiffany Yeh',
      jobTitle: 'Senior Graphic Designer',
      type: 'Full time • Part-time',
      percent: 50
    }
  ]
}
const RECRUITMENT_FILTER = {
  data: [
    { jobId: 0, jobTitle: 'Graphic Designer' },
    { jobId: 1, jobTitle: 'IT Support' },
    { jobId: 2, jobTitle: 'Fullstack Developer (Java/Angular/MySQL) ' },
    { jobId: 3, jobTitle: 'Senior Mobile Engineer - IOS, Mobile Team' },
    { jobId: 4, jobTitle: 'Product Marketing Manager' }
  ]
}
export const getAllCV = createAsyncThunk(
  APP_TYPES.CV.GETALLCV,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.CV.GET_ALL_CV, {
        params: query,
        paramsSerializer: {
          indexes: null // by default: false
        }
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getAllRecruitmentFilter = createAsyncThunk(
  APP_TYPES.CV.GETALLRECRUITMENTFILTER,
  async (params, { rejectWithValue }) => {
    try {
      // const response = await axios.post(api.JOB.GET_ALL_COMPANIES, params)
      return RECRUITMENT_FILTER
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
export const loadMoreCV = createAsyncThunk(
  APP_TYPES.CV.GETMORECV,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.CV.GET_ALL_CV, {
        params: query,
        paramsSerializer: {
          indexes: null // by default: false
        }
      })
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
export const getAllRecruitmentCv = createAsyncThunk(
  APP_TYPES.CV.GETALLRECRUITMENTCV,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.CV.GET_ALL_RECRUITMENT}/${companyId}`
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
export const inviteToCampaign = createAsyncThunk(
  APP_TYPES.CV.INVITETOCAMPAIGN,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.CV.INVITE_TO_CAMPAIGN, params)
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

const cv = createSlice({
  name: 'cv',
  initialState: {
    allCV: [],
    recruitmentFilter: [],
    recruitments: [],
    recruitmentTestSelected: '',
    inviteCampaignSelected: '',
    queryFilter: {},
    meta: {},
    timeType: [
      { type: 1, typeDisplay: 'Fulltime' },
      { type: 2, typeDisplay: 'Part-time' },
      { type: 3, typeDisplay: 'Freelance' }
    ],
    queries: {
      page: 1
    },
    isMaxPage: false
  },
  reducers: {
    updateRecruitmentTestSelected(state, action) {
      state.recruitmentTestSelected = action.payload
    },
    updateinviteCampaignSelected(state, action) {
      state.inviteCampaignSelected = action.payload
    },
    updateQueryCV(state, action) {
      state.queryFilter = action.payload
    }
  },
  extraReducers: {
    [getAllCV.fulfilled]: (state, action) => {
      return {
        ...state,
        allCV: action.payload.data?.data,
        meta: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },

    [loadMoreCV.fulfilled]: (state, action) => {
      return {
        ...state,
        allCV: [...state.allCV, ...action.payload.data?.data],
        meta: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },
    [getAllRecruitmentCv.fulfilled]: (state, action) => {
      return {
        ...state,
        recruitments: action.payload.data,
        recruitmentFilter: action.payload.data?.map((el) => ({
          name: el?.name,
          recruitmentCampaignId: el?.recruitmentCampaignId
        }))
      }
    },
    [inviteToCampaign.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectInitCv = (state) => state.cv
// export const selectIsMaxPage = (state) => state.search.isMaxPage

// export const selectAllJobsCompanies = (state) => state.search.jobCompanies

// export const selectSearchQueries = (state) => state.search.queries
// export const selectPriotiryData = (state) => state.search.PriotiryData
export const {
  updateRecruitmentTestSelected,
  updateQueryCV,
  updateinviteCampaignSelected
} = cv.actions

export default cv.reducer
