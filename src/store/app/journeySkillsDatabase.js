import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

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
export const getUserJobs = createAsyncThunk(
  APP_TYPES.JOURNEY.GETUSERJOBS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.JOURNEY.GET_USER_JOBS}`)
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
export const getSkillsByJobs = createAsyncThunk(
  APP_TYPES.JOURNEY.GETSKILLSBYJOBS,
  async (params, { rejectWithValue }) => {
    const { jobId } = params
    try {
      const response = await axios.get(
        `${api.JOURNEY.GET_SKILL_BY_JOBS}?jobId=${jobId}&skillType=6`
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

const journeySkillsDatabase = createSlice({
  name: 'journeySkillsDatabase',
  initialState: {
    suggestedSkills: [],
    skillByJobs: [],
    relatedCourse: [],
    relatedBlog: [],
    userJobs: []
  },
  reducers: {},
  extraReducers: {
    [getSuggestedSkills.fulfilled]: (state, action) => {
      return {
        ...state,
        suggestedSkills: action.payload.data
      }
    },
    [getSuggestedSkills.rejected]: (state) => {
      return state
    },
    [getRelatedCoursesBySkill.fulfilled]: (state, action) => {
      return {
        ...state,
        relatedCourse: action.payload.data
      }
    },
    [getRelatedCoursesBySkill.rejected]: (state) => {
      return state
    },
    [getRelatedBlogsBySkill.fulfilled]: (state, action) => {
      return {
        ...state,
        relatedBlog: action.payload.data
      }
    },
    [getRelatedBlogsBySkill.rejected]: (state) => {
      return state
    },
    [getUserJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        userJobs: action.payload.data
      }
    },
    [getUserJobs.rejected]: (state) => {
      return state
    },
    [getSkillsByJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        skillByJobs: action.payload.data
      }
    },
    [getUserJobs.rejected]: (state) => {
      return state
    }
  }
})
export const selectInitSkillsDatabase = (state) => state.journeySkillsDatabase

export default journeySkillsDatabase.reducer
