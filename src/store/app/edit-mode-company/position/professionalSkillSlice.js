import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getProfilePostionProfessionalSkill = createAsyncThunk(
  APP_TYPES.EDIT.GETPROFILEPOSITIONPROSKILL,
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

export const getAllProfessionalSkillPositionV2 = createAsyncThunk(
  APP_TYPES.EDIT.GETALLPROFESSIONALSKILLPOSITIONV2,
  async (params, { rejectWithValue }) => {
    try {
      const { type } = params || {}
      const { data } = await axios.get(
        api.USERSKILL.GET_ALL_SKILL_V2 + '?type=' + type
      )
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const getProfessionalSkillPositionV2 = createAsyncThunk(
  APP_TYPES.EDIT.GETALLPROSKILLPOSITIONV2,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const { data } = await axios.get(api.DEPARTMENTPOSITION.SKILL, {
        params: {
          departmentPositionId: departmentPositionId,
          isHardSkill: true
        }
      })
      return data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const savePositionProfessionalSkillEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEPOSITIONPROSKILL,
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

const professionalSkill = createSlice({
  name: 'professionalSkill',
  initialState: {
    skillList: [],
    companySkills: [],
    profile: {},
    proSkillsSelected: []
  },
  reducers: {
    updateCompanyProfessionalSkills(state, action) {
      state.companySkills = action.payload
    },
    updateProSkillsSelected(state, action) {
      state.proSkillsSelected = action.payload
    }
  },
  extraReducers: {
    [getAllProfessionalSkillPositionV2.fulfilled]: (state, action) => {
      return {
        ...state,
        skillList: action.payload.data
      }
    },
    [getAllProfessionalSkillPositionV2.rejected]: (state) => {
      return state
    },
    [getProfessionalSkillPositionV2.fulfilled]: (state, action) => {
      return {
        ...state,
        companySkills: action.payload.data,
        proSkillsSelected:
          action.payload.data
            ?.filter((el) => el?.isDisplayChart)
            .map((item) => item?.skillId) || []
      }
    },
    [getProfessionalSkillPositionV2.rejected]: (state) => {
      return state
    },
    [getProfilePostionProfessionalSkill.fulfilled]: (state, action) => {
      return {
        ...state,
        profile: action.payload.data
      }
    },
    [getProfilePostionProfessionalSkill.rejected]: (state) => {
      return state
    }
  }
})

export const selectSkillListProfessionalSkillPosition = (state) =>
  state?.editModeCompany?.position?.professionalSkill?.skillList

export const selectSkillListProfessionalSkillPositionExist = (state) =>
  state?.editModeCompany?.position?.professionalSkill?.companySkills

export const selectProfileProfessionalSkillPosition = (state) =>
  state?.editModeCompany?.position?.professionalSkill?.profile

export const selectProSkillsSelected = (state) =>
  state?.editModeCompany?.position?.professionalSkill?.proSkillsSelected

export const { updateCompanyProfessionalSkills, updateProSkillsSelected } =
  professionalSkill.actions

export default professionalSkill.reducer
