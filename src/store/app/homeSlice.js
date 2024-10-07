import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const pickCharacter = createAsyncThunk(
  APP_TYPES.HOME.PICKCHARACTER,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.HOME.PICK_CHARACTER, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

export const getHomeBlocks = createAsyncThunk(
  APP_TYPES.HOME.GETHOMEBLOCKS,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId, skillEnumType } = params
      const getProductByJobId = await axios.get(api.HOME.GET_PRODUCT_BY_JOBID, {
        params: { jobId: jobId, skillEnumType: skillEnumType || '0' }
      })
      const getTopJobCompany = await axios.get(api.HOME.GET_TOP_JOB_COMPANY, {
        params: { jobId: jobId }
      })
      const getRecruitmentCampaignByJobId = await axios.get(
        api.HOME.GET_RECRUITMENT_CAMPAIGN_BY_JOBID,
        {
          params: { jobId: jobId }
        }
      )

      const response = Promise.all([
        getProductByJobId,
        getTopJobCompany,
        getRecruitmentCampaignByJobId
      ])

      return response
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getSkillType = createAsyncThunk(
  APP_TYPES.HOME.GETSKILLTYPE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.HOME.GET_SKILLTYPE, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const sendHomeFeedback = createAsyncThunk(
  APP_TYPES.HOME.HOMEFEEDBACK,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.HOME.HOME_FEEDBACK, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

const home = createSlice({
  name: 'home',
  initialState: {
    roleId: null,
    blocks: {
      products: [],
      companies: [],
      recruitments: []
    },
    skillType: {},
    queries: null,
    positionBlocks: '0,1,2,3',
    skillEnumType: '0',
    chooseSideMenuId: 4,
    choosedStepId: 1,
    selectedJobId: 0,
    showStickyBar: false,
    capacityProfileDefault: [
      { value: 'Mục tiêu nghề nghiệp', isActive: false },
      { value: 'Chứng chỉ chuyên môn', isActive: false },
      { value: 'Kĩ năng công việc', isActive: false },
      { value: 'Bảng thành tích', isActive: false },
      { value: 'Kinh nghiệm làm việc', isActive: false },
      { value: 'Trải nghiệm khác', isActive: false },
      { value: 'Kĩ năng chung', isActive: false }
    ]
  },
  reducers: {
    updateRoleId(state, action) {
      return { ...state, roleId: action.payload }
    },
    updateHomeQueries(state, action) {
      return { ...state, queries: { ...state.queries, ...action.payload } }
    },
    updatePositionBlocks(state, action) {
      return { ...state, positionBlocks: action.payload }
    },
    updateSkillEnumType(state, action) {
      return { ...state, skillEnumType: action.payload }
    },
    updateSideMenuId(state, action) {
      return { ...state, chooseSideMenuId: action.payload }
    },
    updateSelectedJobId(state, action) {
      return { ...state, selectedJobId: action.payload }
    },
    updateStickyBar(state, action) {
      return { ...state, showStickyBar: action.payload }
    }
  },
  extraReducers: {
    [pickCharacter.fulfilled]: (state, action) => {
      return {
        ...state,
        character: action.payload.data
      }
    },
    [pickCharacter.rejected]: (state) => {
      return state
    },
    [getHomeBlocks.fulfilled]: (state, action) => {
      const [products, companies, recruitments] = action.payload
      return {
        ...state,
        blocks: {
          products: products.data.data,
          companies: companies.data.data,
          recruitments: recruitments.data.data
        }
      }
    },
    [getHomeBlocks.rejected]: (state) => {
      return state
    },
    [getSkillType.fulfilled]: (state, action) => {
      return {
        ...state,
        skillType: action.payload.data
      }
    },
    [getSkillType.rejected]: (state) => {
      return state
    }
  }
})

export const selectHomeBlocks = (state) => state.home.blocks
export const selectCapacityProfile = (state) =>
  state.home.capacityProfileDefault
export const selectSkillType = (state) => state.home.skillType
export const selectHomeQueries = (state) => state.home.queries
export const selectInitStatics = (state) => {
  return {
    positionBlocks: state.home.positionBlocks,
    skillEnumType: state.home.skillEnumType,
    showStickyBar: state.home.showStickyBar
  }
}
export const selectAllIds = (state) => {
  return {
    chooseSideMenuId: state.home.chooseSideMenuId,
    choosedStepId: state.home.choosedStepId,
    selectedJobId: state.home.selectedJobId,
    roleId: state.home.roleId
  }
}

export const {
  updateRoleId,
  updateHomeQueries,
  updatePositionBlocks,
  updateSkillEnumType,
  updateSideMenuId,
  updateSelectedJobId,
  updateStickyBar,
  updateJobCategoryId
} = home.actions

export default home.reducer
