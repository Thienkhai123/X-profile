import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getDocumentCategories = createAsyncThunk(
  APP_TYPES.JOURNEY.GETDOCUMENTCATEGORIES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.JOURNEY.GET_DOCUMENT_CATEGORIES}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getDocuments = createAsyncThunk(
  APP_TYPES.JOURNEY.GETDOCUMENTS,
  async (params, { rejectWithValue }) => {
    const { documentCategoryId } = params
    try {
      const response = await axios.get(
        `${api.JOURNEY.GET_DOCUMENT}?documentCategoryId=${documentCategoryId}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getSuggestedSkills = createAsyncThunk(
  APP_TYPES.JOURNEY.GETSUGGESTEDSKILLS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.JOURNEY.GET_SUGGESTED_SKILLS}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getRelatedCoursesBySkill = createAsyncThunk(
  APP_TYPES.JOURNEY.GETRELATEDCOURSEBYSKILL,
  async (params, { rejectWithValue }) => {
    const { skillId } = params
    try {
      const response = await axios.get(
        `${api.JOURNEY.GET_RELATED_COURSE_BY_SKILL}?skillId=${skillId}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getRelatedBlogsBySkill = createAsyncThunk(
  APP_TYPES.JOURNEY.GETRELATEDBLOGSBYSKILL,
  async (params, { rejectWithValue }) => {
    const { skillId } = params
    try {
      const response = await axios.get(
        `${api.JOURNEY.GET_RELATED_BLOGS_BY_SKILL}?skillId=${skillId}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const technicalPortal = createSlice({
  name: 'technicalPortal',
  initialState: {
    categories: [],
    documents: [],
    suggestedSkills: []
  },
  reducers: {},
  extraReducers: {
    [getDocumentCategories.fulfilled]: (state, action) => {
      return {
        ...state,
        categories: action.payload.data
      }
    },
    [getDocumentCategories.rejected]: (state) => {
      return state
    },
    [getDocuments.fulfilled]: (state, action) => {
      return {
        ...state,
        documents: action.payload.data
      }
    },
    [getDocuments.rejected]: (state) => {
      return state
    },
    [getSuggestedSkills.fulfilled]: (state, action) => {
      return {
        ...state,
        suggestedSkills: action.payload.data
      }
    },
    [getSuggestedSkills.rejected]: (state) => {
      return state
    }
  }
})
export const selectInitTechnicalPortal = (state) => state.technicalPortal

export default technicalPortal.reducer
