import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllFavoriteCampaigns = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETALLUSERFAVORITECAMPAIGNS,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.CAMPAIGN.GET_USER_FAVORITE_CAMPAIGNS,
        {
          params: query
        }
      )
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
export const getMoreFavoriteCampaigns = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETMOREUSERFAVORITECAMPAIGNS,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.CAMPAIGN.GET_USER_FAVORITE_CAMPAIGNS,
        {
          params: query
        }
      )
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
export const getAllAppliedCampaigns = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETALLUSERAPPLIEDCAMPAIGNS,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.CAMPAIGN.GET_USER_APPLIED_CAMPAIGNS,
        {
          params: query
        }
      )
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
export const getUserCampaignFeedback = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETUSERCAMPAIGNFEEDBACK,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.CAMPAIGN.GET_USER_CAMPAIGN_FEEDBACK)
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
export const userUpdateAcceptInterview = createAsyncThunk(
  APP_TYPES.CAMPAIGN.USERACCEPTINTERVIEWCAMPAIGNS,
  async (query, { rejectWithValue }) => {
    const { userRecruitmentCampaignId } = query
    try {
      const response = await axios.post(
        `${api.CAMPAIGN.USER_ACCEPT_INTERVIEW_CAMPAIGN}/${userRecruitmentCampaignId}`
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
export const getUserAcceptInterview = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETUSERACCEPTINTERVIEWCAMPAIGNS,
  async (query, { rejectWithValue }) => {
    const { userRecruitmentCampaignId } = query
    try {
      const response = await axios.get(
        `${api.CAMPAIGN.GET_USER_ACCEPT_INTERVIEW_CAMPAIGN}/${userRecruitmentCampaignId}`
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
export const getMoreAppliedCampaigns = createAsyncThunk(
  APP_TYPES.CAMPAIGN.GETMOREUSERAPPLIEDCAMPAIGNS,
  async (query, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.CAMPAIGN.GET_USER_APPLIED_CAMPAIGNS,
        {
          params: query
        }
      )
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

export const sendApply = createAsyncThunk(
  APP_TYPES.CAMPAIGN.APPLY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.CAMPAIGN.APPLY, payload)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      return err.response.data
    }
  }
)
export const rejectCampaign = createAsyncThunk(
  APP_TYPES.CAMPAIGN.REJECT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.CAMPAIGN.REJECT, payload)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      return err.response.data
    }
  }
)
export const reviewCampaign = createAsyncThunk(
  APP_TYPES.CAMPAIGN.REVIEW,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.CAMPAIGN.REVIEW, payload)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      return err.response.data
    }
  }
)
export const canApply = createAsyncThunk(
  APP_TYPES.CAMPAIGN.CANAPPLY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.CAMPAIGN.CAN_APPLY, payload)
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      return err.response.data
    }
  }
)
export const changeUserFavoriteCampaign = createAsyncThunk(
  APP_TYPES.CAMPAIGN.CHANGEUSERFAVORITECAMPAIGNS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.CAMPAIGN.CHANGE_USER_FAVORITE_CAMPAIGNS +
          '?departmentPositionId=' +
          params
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      // return rejectWithValue(err.response)
    }
  }
)

const campaign = createSlice({
  name: 'campaign',
  initialState: {
    userFavoriteCampaigns: [],
    userAppliedCampaigns: [],
    metaFavoriteCampaigns: {},
    metaAppliedCampaigns: {},
    userAcceptInterview: {},
    userCampaignFeedback: []
  },
  reducers: {},
  extraReducers: {
    [getAllFavoriteCampaigns.fulfilled]: (state, action) => {
      return {
        ...state,
        userFavoriteCampaigns: action.payload.data?.data,
        metaFavoriteCampaigns: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },
    [getMoreFavoriteCampaigns.fulfilled]: (state, action) => {
      return {
        ...state,
        userFavoriteCampaigns: [
          ...state.userFavoriteCampaigns,
          ...action.payload.data?.data
        ],
        metaFavoriteCampaigns: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },
    [getUserAcceptInterview.fulfilled]: (state, action) => {
      return {
        ...state,
        userAcceptInterview: action.payload.data
      }
    },
    [changeUserFavoriteCampaign.fulfilled]: (state, action) => {
      return state
    },
    [sendApply.fulfilled]: (state, action) => {
      return state
    },
    [rejectCampaign.fulfilled]: (state, action) => {
      return state
    },
    [rejectCampaign.rejected]: (state, action) => {
      return state
    },
    [sendApply.rejected]: (state, action) => {
      return state
    },
    [reviewCampaign.fulfilled]: (state, action) => {
      return state
    },
    [reviewCampaign.rejected]: (state, action) => {
      return state
    },
    [userUpdateAcceptInterview.fulfilled]: (state, action) => {
      return state
    },
    [userUpdateAcceptInterview.rejected]: (state, action) => {
      return state
    },
    [canApply.fulfilled]: (state, action) => {
      return state
    },
    [getAllAppliedCampaigns.fulfilled]: (state, action) => {
      return {
        ...state,
        userAppliedCampaigns: action.payload.data?.data,
        metaAppliedCampaigns: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },
    [getMoreAppliedCampaigns.fulfilled]: (state, action) => {
      return {
        ...state,
        userAppliedCampaigns: [
          ...state.userAppliedCampaigns,
          ...action.payload.data?.data
        ],
        metaAppliedCampaigns: {
          currentPage: action.payload.data?.currentPage,
          currentRecords: action.payload.data?.currentRecords,
          pageSize: action.payload.data?.pageSize,
          totalPages: action.payload.data?.totalPages,
          recordsTotal: action.payload.data?.recordsTotal
        }
      }
    },
    [getUserCampaignFeedback.fulfilled]: (state, action) => {
      return {
        ...state,
        userCampaignFeedback: action.payload?.data
      }
    }
  }
})
export const selectAllInitCampaigns = (state) => state?.campaign

export const selectAllFavoriteCampaigns = (state) =>
  state?.campaign?.userFavoriteCampaigns

export const selectAllAppliedCampaigns = (state) =>
  state?.campaign?.userAppliedCampaigns

export const selectAllUserCampaignFeedback = (state) =>
  state?.campaign?.userCampaignFeedback

export default campaign.reducer
