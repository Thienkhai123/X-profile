import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { getBannerEditPosition } from './bannerSlice'

export const getSystemImagesBenefitsPostion = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BENEFITS.GETSYSTEMIMAGES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.HELPER.GET_BENEFITS_IMAGES, params)
      return response?.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)
export const getBenefits = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BENEFITS.GETBENEFITS,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const response = await axios.get(
        `${api.EDIT.EDIT_GET_POSITION}/${departmentPositionId}`
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
export const saveBenefitsEdit = createAsyncThunk(
  APP_TYPES.EDIT.POSITIONS.BENEFITS.SAVEBENEFITS,
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

const benefits = createSlice({
  name: 'benefits',
  initialState: {
    profile: {},
    benefits: [],
    benefitsDefault: [],
    systemImages: []
  },
  reducers: {
    // updatePositionBannerEdit(state, action) {
    //   state.profile = action.payload
    // }
    addBenefit: (state, action) => {
      return {
        ...state,
        benefits: [...state.benefits, { ...action.payload }]
      }
    },
    updateBenefit: (state, action) => {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.benefits)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          benefits: cloneArr
        }
      }
    },
    removeBenefit: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.benefits]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          benefits: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [getSystemImagesBenefitsPostion.fulfilled]: (state, action) => {
      return {
        ...state,
        systemImages: action.payload
      }
    },
    [getBannerEditPosition.fulfilled]: (state, action) => {
      const [departmentPosition, companyProfile, departmentProfile] =
        action.payload
      return {
        ...state,
        benefits: departmentPosition.data?.data?.meta?.benefits || [],
        benefitsDefault: departmentPosition.data?.data?.meta?.benefits || []
      }
    },
    [saveBenefitsEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectSystemImagesBenefitsPositon = (state) =>
  state?.editModeCompany?.position?.benefits?.systemImages
export const selectBenefitsPositoninitState = (state) =>
  state?.editModeCompany?.position?.benefits

export const { addBenefit, updateBenefit, removeBenefit } = benefits.actions
export default benefits.reducer
