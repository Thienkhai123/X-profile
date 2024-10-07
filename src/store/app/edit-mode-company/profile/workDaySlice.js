import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { getBannerEdit } from './bannerSlice'

export const getAllWorkingDays = createAsyncThunk(
  APP_TYPES.EDIT.GETWORKINGDAYS,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.WORKINGDAY}/${id}`)
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

export const getProfileEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETPROFILEEDIT,
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

export const saveWorkingDays = createAsyncThunk(
  APP_TYPES.EDIT.SAVEWORKINGDAYS,
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

export const getWorkingDayImages = createAsyncThunk(
  APP_TYPES.EDIT.GETIMAGEWORKINGDAYS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.HELPER.GETWORKINGDAYIMAGES)
      return response
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

const workDay = createSlice({
  name: 'workDay',
  initialState: {
    logo: '',
    workingDayCaption: '',
    profile: {},
    editItem: {},
    itemList: [],
    logoList: []
  },
  reducers: {
    addItemList: (state, action) => {
      return {
        ...state,
        itemList: [...state.itemList, { ...action.payload }]
      }
    },
    updateItemList: (state, action) => {
      const { id } = action.payload
      const workdayList = cloneDeep(state.itemList)
      const workdayItem = {
        ...workdayList[id],
        ...action.payload
      }
      const tempList = [...workdayList]
      tempList[id] = { ...workdayItem }
      if (id > -1) {
        return {
          ...state,
          itemList: tempList
        }
      }
    },
    removeItem: (state, action) => {
      const { id } = action.payload
      const workdayList = cloneDeep(state.itemList)
      const removeList = workdayList.filter((e, ind) => ind !== id)
      if (id > -1) {
        return {
          ...state,
          itemList: removeList
        }
      }
    },
    updatePosition: (state, action) => {
      return {
        ...state,
        itemList: action.payload
      }
    },
    updateworkingDayCaption: (state, action) => {
      return {
        ...state,
        workingDayCaption: action.payload
      }
    }
  },
  extraReducers: {
    [saveWorkingDays.fulfilled]: (state, action) => {
      return state
    },
    [getAllWorkingDays.fulfilled]: (state, action) => {
      return { ...state, itemList: action?.payload?.data }
    },
    [getWorkingDayImages.fulfilled]: (state, action) => {
      return { ...state, logoList: action?.payload?.data }
    },
    [getBannerEdit.fulfilled]: (state, action) => {
      return { ...state, profile: action?.payload?.data }
    }
  }
})

export const selectItemList = (state) =>
  state.editModeCompany.company.workDay.itemList

export const selectLogoList = (state) =>
  state.editModeCompany.company.workDay.logoList

export const selectEditItem = (state) =>
  state.editModeCompany.company.workDay.editItem

export const selectProfileEdit = (state) =>
  state.editModeCompany.company.workDay.profile

export const selectworkingDayCaption = (state) =>
  state.editModeCompany.company.workDay.workingDayCaption

export const {
  addItemList,
  updatePosition,
  updateItemList,
  removeItem,
  updateworkingDayCaption
} = workDay.actions

export default workDay.reducer
