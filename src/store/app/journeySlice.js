import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { element } from 'prop-types'
import logger from 'redux-logger'
import _, { forEach, isEmpty } from 'lodash'

export const getMap = createAsyncThunk(
  APP_TYPES.JOURNEY.GETMAP,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.JOURNEY.GET_MAP}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJourneySkill = createAsyncThunk(
  APP_TYPES.JOURNEY.GETSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.JOURNEY.GET_SKILL}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllUserSkill = createAsyncThunk(
  APP_TYPES.USERSKILL.GETALLUSERSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(api.USERSKILL.GET_ALL_USER_SKILL, params)
      return data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/logout')
      //     return
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

export const allRelatedJobs = createAsyncThunk(
  APP_TYPES.JOURNEY.RELATEDJOBS,
  async (params, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(api.JOURNEY.RELATED_JOBS, params)
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const journey = createSlice({
  name: 'journey',
  initialState: {
    step: 0,
    skills: [],
    userSkills: [],
    relatedJobs: []
  },
  reducers: {},
  extraReducers: {
    [getMap.fulfilled]: (state, action) => {
      return {
        ...state,
        step: action.payload.data
      }
    },
    [getMap.rejected]: (state) => {
      return state
    },

    [getJourneySkill.fulfilled]: (state, action) => {
      return {
        ...state,
        skills: action.payload.data
      }
    },
    [getJourneySkill.rejected]: (state) => {
      return state
    },

    [getAllUserSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        userSkills: action.payload.data
      }
    },
    [getAllUserSkill.rejected]: (state) => {
      return state
    },

    [allRelatedJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        relatedJobs: action.payload.data
      }
    },
    [allRelatedJobs.rejected]: (state) => {
      return state
    }
  }
})

export const selectStepMap = (state) =>
  state.journey.step.step !== null ? state.journey.step.step + 1 : 1
export const selectSkills = (state) => state.journey.skills
export const selectUserSkills = (state) => state.journey.userSkills
export const selectRelatedJobs = (state) => state.journey.relatedJobs
export const selectJourneySkills = createSelector(
  [selectSkills, selectUserSkills],
  (skills, userSkills) => {
    const skillList = skills || []
    const userSkillList = userSkills || []
    let genaralSkill = []
    let advencedSkill = []
    let skillIdList = []
    skillList.forEach((element) => {
      if (element?.type === 0 || element?.type === 5) {
        let persent = 0
        userSkillList?.forEach((e) => {
          if (e?.skillId === element?.skillId) {
            persent = e?.percentageComplete
          }
        })

        const tmp = {
          skillId: element?.skillId,
          skillName: element?.name,
          examId: element?.examId,
          percentValue: persent
        }
        genaralSkill.push(tmp)
      } else if (element?.type === 1 || element?.type === 6) {
        let persent = 0
        userSkillList?.forEach((e) => {
          if (e?.skillId === element?.skillId) {
            persent = e?.percentageComplete
          }
        })
        const tmp1 = {
          skillId: element?.skillId,
          skillName: element?.name,
          examId: element?.examId,
          percentValue: persent
        }
        advencedSkill.push(tmp1)
      }
    })
    const skillRelated = [...genaralSkill, ...advencedSkill]
    skillRelated?.forEach((element) => {
      if (element?.percentValue > 0) {
        skillIdList.push(element?.skillId)
      }
    })
    return { genaralSkill, advencedSkill, skillIdList }
  }
)

export default journey.reducer
