import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getProfilePostionSoftSkill = createAsyncThunk(
  APP_TYPES.EDIT.GETPROFILEPOSITIONSOFTSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const response = await axios.get(
        `${api.EDIT.EDIT_GET_POSITION}/${departmentPositionId}`
      )
      return response?.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)

export const getAllSkillPostionSoftSkill = createAsyncThunk(
  APP_TYPES.EDIT.GETALLSKILLPOSITIONSOFTSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { type } = params || {}
      const { data } = await axios.get(
        api.USERSKILL.GET_ALL_SKILL_V2 + '?type=' + type
      )
      return data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)

export const getAllSoftSkillPositionV2 = createAsyncThunk(
  APP_TYPES.EDIT.GETALLSOFTSKILLPOSITIONV2,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const { data } = await axios.get(api.DEPARTMENTPOSITION.SKILL, {
        params: {
          departmentPositionId: departmentPositionId,
          isHardSkill: false
        }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const savePositionSoftSkillEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEPOSITIONSOFTSKILL,
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

const softSkill = createSlice({
  name: 'softSkill',
  initialState: {
    skillList: [],
    companySkills: [],
    profile: {},
    softSkillsSelected: []
  },
  reducers: {
    updateCompanySkills(state, action) {
      state.companySkills = action.payload
    },
    updateSoftSkillsSelected(state, action) {
      state.softSkillsSelected = action.payload
    }
  },
  extraReducers: {
    [getAllSoftSkillPositionV2.fulfilled]: (state, action) => {
      return {
        ...state,
        companySkills: action.payload.data,
        softSkillsSelected:
          action.payload.data
            ?.filter((el) => el?.isDisplayChart)
            ?.map((item) => item?.skillId) || []
      }
    },
    [getAllSoftSkillPositionV2.rejected]: (state) => {
      return state
    },
    [getProfilePostionSoftSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload.data
      }
    },
    [getProfilePostionSoftSkill.rejected]: (state) => {
      return state
    },

    [getAllSkillPostionSoftSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        skillList: action.payload.data
      }
    },
    [getAllSkillPostionSoftSkill.rejected]: (state) => {
      return state
    }
  }
})

export const selectSkillListSoftSkillPosition = (state) =>
  state?.editModeCompany?.position?.softSkill?.skillList

export const selectSkillCompanySoftSkillPosition = (state) =>
  state?.editModeCompany?.position?.softSkill?.companySkills

export const selectProfilePositionSoftSkill = (state) =>
  state?.editModeCompany?.position?.softSkill?.profile

export const selectSoftSkillsSelected = (state) =>
  state?.editModeCompany?.position?.softSkill?.softSkillsSelected

export const { updateCompanySkills, updateSoftSkillsSelected } =
  softSkill.actions

export default softSkill.reducer
