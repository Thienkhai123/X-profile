import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllCities = createAsyncThunk(
  APP_TYPES.JOB.GETALLCITIES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_ALL_CITIES)
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

export const getAllJobsCompanies = createAsyncThunk(
  APP_TYPES.JOB.GETALLCOMPANIES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.JOB.GET_ALL_COMPANIES, params)
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

export const loadMoreCompanies = createAsyncThunk(
  APP_TYPES.JOB.LOADMORECOMPANY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.JOB.GET_ALL_COMPANIES, params)
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

const search = createSlice({
  name: 'search',
  initialState: {
    cities: [],
    jobCompanies: [],
    queries: {
      page: 1
    },
    isMaxPage: false,
    PriotiryData: [
      { id: 0, name: 'Cập nhật gần nhất' },
      { id: 1, name: 'Phù hợp nhất' }
    ],
    totalData: null
  },
  reducers: {
    searchJobCompaniesQueries(state, action) {
      return { ...state, queries: { ...state.queries, ...action.payload } }
    }
  },
  extraReducers: {
    [getAllCities.fulfilled]: (state, action) => {
      return {
        ...state,
        cities: action.payload.data
      }
    },
    [getAllJobsCompanies.fulfilled]: (state, action) => {
      return {
        ...state,
        jobCompanies: action.payload.data,
        isMaxPage: action.payload.data.length < 12,
        totalData: action.payload.totalData || 0
      }
    },
    [loadMoreCompanies.fulfilled]: (state, action) => {
      return {
        ...state,
        isMaxPage: action.payload.data.length < 12,
        jobCompanies: [...state.jobCompanies, ...action.payload.data]
      }
    },
    [loadMoreCompanies.rejected]: (state) => {
      return state
    }
  }
})

export const selectAllCities = (state) => state.search.cities
export const selectIsMaxPage = (state) => state.search.isMaxPage

export const selectAllJobsCompanies = (state) => state.search.jobCompanies
export const selectTotalAllJobsCompanies = (state) => state.search.totalData
export const selectSearchQueries = (state) => state.search.queries
export const selectPriotiryData = (state) => state.search.PriotiryData
export const { searchJobCompaniesQueries } = search.actions

export default search.reducer
