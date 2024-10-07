import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getBannerEditPosition = createAsyncThunk(
  APP_TYPES.EDIT.GETPOSITION,
  async (params, { rejectWithValue }) => {
    const { departmentPositionId, companyId, departmentId } = params || {}
    try {
      const departmentPosition = await axios.get(
        `${api.EDIT.EDIT_GET_POSITION}/${departmentPositionId}`
      )
      const departmentProfile = await axios.get(
        `${api.EDIT.EDIT_GET_DEPARTMENT}/${departmentId}`
      )
      const companyProfile = await axios.get(
        `${api.EDIT.GET_PROFILE_COMPANY}/${companyId}`
      )
      const response = await Promise.all([
        departmentPosition,
        companyProfile,
        departmentProfile
      ])
      return response
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      let pathname = window.location.pathname.replace(
        `/${departmentPositionId}`,
        ''
      )
      window.location.replace(pathname)
      return err.response
    }
  }
)

export const getDetailRecruitmentCampaign = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BANNER.GETDETAILRECRUITMENTCAMPAIGN,
  async (params, { rejectWithValue }) => {
    try {
      const { recruitmentCampaignId } = params || {}
      const response = await axios.get(
        `${api.EDIT.GET_DETAI_RECRUITMENT_CAMPAIGN}?recruitmentCampaignId=${recruitmentCampaignId}`
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response.data
    }
  }
)
export const savePositionBannerEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEPOSITION,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.EDIT.EDIT_MODE_POSITION_UPDATE,
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
export const deletePositionEdit = createAsyncThunk(
  APP_TYPES.EDIT.DELETEPOSITIONEDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.EDIT.EDIT_MODE_POSITION_DELETE,
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
export const updatePositionEdit = createAsyncThunk(
  APP_TYPES.EDIT.UPDATEPOSITIONEDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.EDIT.EDIT_MODE_POSITION_UPDATE,
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

export const getCampaignPriceBannerPosition = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BANNER.GETCAMPAIGNPRICE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.EDIT.EDIT_GET_CAMPAIGN_PRICE}`)

      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)

export const createRecruitmentCampaign = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BANNER.CREATERECRUITMENTCAMPAIGN,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.EDIT.EDIT_CREATE_RECRUITMENT_CAMPAIGN,
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

export const deactivateCampaign = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BANNER.DEACTIVATECAMPAIGN,
  async (params, { rejectWithValue }) => {
    try {
      const { recruitmentCampaignId } = params || {}
      const response = await axios.post(
        `${api.EDIT.EDIT_MODE_DEACTIVATE_CAMPAIGN}/${recruitmentCampaignId}`
      )

      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)

const banner = createSlice({
  name: 'banner',
  initialState: {
    profile: null,
    profileEdit: null,
    profileCompany: {},
    profileDepartment: {},
    imageUpload: '',
    campaignPrice: {},
    detailRecruitmentCampaign: {}
  },
  reducers: {
    updatePositionBannerEdit(state, action) {
      state.profile = action.payload
    },
    updatePositionBannerImageUpload: (state, action) => {
      state.imageUpload = action.payload
    }
  },
  extraReducers: {
    [getBannerEditPosition.fulfilled]: (state, action) => {
      const [departmentPosition, companyProfile, departmentProfile] =
        action.payload
      return {
        ...state,
        profile: departmentPosition.data.data,
        profileEdit: departmentPosition.data.data,
        profileCompany: companyProfile.data.data,
        profileDepartment: departmentProfile.data.data
      }
    },
    [getBannerEditPosition.rejected]: (state) => {
      return state
    },
    [savePositionBannerEdit.fulfilled]: (state, action) => {
      return state
    },
    [updatePositionEdit.fulfilled]: (state, action) => {
      return state
    },
    [deletePositionEdit.fulfilled]: (state, action) => {
      return state
    },
    [getCampaignPriceBannerPosition.fulfilled]: (state, action) => {
      return { ...state, campaignPrice: action.payload.data }
    },
    [getDetailRecruitmentCampaign.fulfilled]: (state, action) => {
      return {
        ...state,
        detailRecruitmentCampaign: action.payload.data
      }
    },
    [getDetailRecruitmentCampaign.rejected]: (state) => {
      return state
    }
  }
})
export const selectInitSatePosition = (state) =>
  state?.editModeCompany?.position?.banner
export const selectDetailRecruitmentCampaign = (state) =>
  state?.editModeCompany?.position?.banner?.detailRecruitmentCampaign
export const selectCampaignPrice = (state) =>
  state?.editModeCompany?.position?.banner?.campaignPrice

export const { updatePositionBannerEdit, updatePositionBannerImageUpload } =
  banner.actions

export default banner.reducer
