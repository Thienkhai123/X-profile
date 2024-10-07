import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { authService } from 'store/helper/authService'
import { POSITION_BLOCK, SURVEY_STORAGE } from 'common/config/app.constants'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

export const getPublishedSurvey = createAsyncThunk(
  APP_TYPES.SURVEY.GETPUBLISHEDSURVEY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.SURVEY.GET_PUBLISHED_SURVEY, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getPublishedPostion = createAsyncThunk(
  APP_TYPES.SURVEY.GETPUBLISHEDPOSTION,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.SURVEY.GET_PUBLISHED_POSTION, {
        params
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getHomeBlockType = createAsyncThunk(
  APP_TYPES.SURVEY.GETHOMEBLOCKTYPE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.SURVEY.GET_HOME_BLOCK_TYPE, {
        params
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const postSurvey = createAsyncThunk(
  APP_TYPES.SURVEY.POSTSURVEY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.SURVEY.POST_SURVEY, payload)
      if (!authService.getAccessToken()) {
        localStorage.setItem(
          POSITION_BLOCK,
          response.data.data.setting.homeBlockPosistion
        )
        localStorage.setItem(SURVEY_STORAGE, JSON.stringify(payload))
      }
      window.location.replace('/')
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertWaring({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-save-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )

          break
        default:
      }
      return rejectWithValue(err.response.data)
    }
  }
)

const survey = createSlice({
  name: 'survey',
  initialState: {
    publishedSurvey: {
      surveys: []
    },
    publishedPosition: '',
    homeBlockType: {},
    queries: {
      surveyAnswerIds: ''
    }
  },
  reducers: {
    updateQueries(state, action) {
      return { ...state, queries: action.payload }
    }
  },
  extraReducers: {
    [getPublishedSurvey.fulfilled]: (state, action) => {
      return {
        ...state,
        publishedSurvey: action.payload.data
      }
    },
    [getPublishedSurvey.rejected]: (state) => {
      return state
    },
    [getPublishedPostion.fulfilled]: (state, action) => {
      return {
        ...state,
        publishedPosition: action.payload.data
      }
    },
    [getPublishedPostion.rejected]: (state) => {
      return state
    },
    [getHomeBlockType.fulfilled]: (state, action) => {
      return {
        ...state,
        homeBlockType: action.payload.data
      }
    },
    [getHomeBlockType.rejected]: (state) => {
      return state
    }
  }
})

export const selectQueries = (state) => state.survey.queries
export const selectPublishedSurveys = (state) =>
  state.survey.publishedSurvey.surveys
export const selectPublishedPosition = (state) => state.survey.publishedPosition
export const selectHomeBlockType = (state) => state.survey.homeBlockType

export default survey.reducer
