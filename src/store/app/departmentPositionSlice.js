import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getDepartmentPosition = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.PROFILE,
  async (params, { rejectWithValue }) => {
    try {
      const { id, departmentId, companyId } = params
      const profile = await axios.get(`${api.DEPARTMENTPOSITION.PROFILE}/${id}`)
      const profileDepartment = await axios.get(
        `${api.DEPARTMENT.PROFILE}/${departmentId}`
      )
      const profileCompany = await axios.get(
        `${api.COMPANY.PROFILE}/${companyId}`
      )

      const skillNecessary = await axios.get(api.DEPARTMENTPOSITION.SKILL, {
        params: {
          departmentPositionId: id,
          isHardSkill: false
        }
      })
      const skillProfessional = await axios.get(api.DEPARTMENTPOSITION.SKILL, {
        params: {
          departmentPositionId: id,
          isHardSkill: true
        }
      })
      const departmentPositions = await axios.get(
        `${api.DEPARTMENT.DEPARTMENTPOSITION}/${departmentId}`
      )
      const recruitment = await axios.get(
        `${api.DEPARTMENT.RECRUITMENT}/${departmentId}`
      )

      const response = await Promise.all([
        profile,
        profileDepartment,
        profileCompany,
        skillNecessary,
        skillProfessional,
        departmentPositions,
        recruitment
      ])
      if (
        response[0].data.data?.departmentId !== parseInt(departmentId) ||
        response[2].data.data?.tag !== companyId
      ) {
        return rejectWithValue(profile.data)
      }
      return response
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getUserStatus = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.USERSTATUS,
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params

      const response = await axios.get(`${api.DEPARTMENT.GETUSERSTATUS}/${id}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllJobLevels = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.GETALLJOBLEVELS,
  async (params, { rejectWithValue }) => {
    try {
      const { isCompetencyOnly = false } = params

      const response = await axios.get(
        `${api.DEPARTMENT.GET_ALL_JOB_LEVELS}?isCompetencyOnly=${isCompetencyOnly}`
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

export const getTemplateByJobLevel = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.GETTEMPLATEBYJOBLEVEL,
  async (params, { rejectWithValue }) => {
    try {
      const { jobLevelId } = params

      const response = await axios.get(
        `${api.DEPARTMENT.GET_TEMPLATE_BY_JOB_LEVEL}?jobLevelId=${jobLevelId}`
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

export const createDepartmentPosition = createAsyncThunk(
  APP_TYPES.EDIT.CREATEDEPARTMENTPOSITION,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.EDIT.EDIT_MODE_CREATE_POSITION,
        payload
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

export const getViewCountDepartmentPosition = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const dateLocal = localStorage.getItem('XPD')
      if (dateLocal === null) {
        const response = await axios.post(
          api.DEPARTMENTPOSITION.UPDATE_VIEW_COUNT,
          params
        )
        localStorage.setItem('XPD', btoa(new Date()))
        return response.data
      } else {
        let dateDecode = null
        try {
          dateDecode = atob(dateLocal)
        } catch (err) {
          throw 401
        }
        if (isNaN(new Date(dateDecode).getTime())) {
          throw 401
        } else {
          const duration =
            (new Date().getTime() - new Date(dateDecode).getTime()) / 1000
          if (duration < 30) {
            const response = await axios.get(
              api.DEPARTMENTPOSITION.GET_VIEW_COUNT,
              {
                params: params
              }
            )
            return response.data
          } else {
            const response = await axios.post(
              api.DEPARTMENTPOSITION.UPDATE_VIEW_COUNT,
              params
            )
            localStorage.setItem('XPD', btoa(new Date()))
            return response.data
          }
        }
      }
    } catch (err) {
      if (err === 401) {
        window.location.replace('/logout')
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getViewCountDepartmentPositionEditmode = createAsyncThunk(
  APP_TYPES.DEPARTMENTPOSITION.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.DEPARTMENTPOSITION.GET_VIEW_COUNT, {
        params: params
      })
      return response.data
    } catch (err) {
      if (err === 401) {
        window.location.replace('/logout')
      }
      return rejectWithValue(err.response)
    }
  }
)

const departmentPosition = createSlice({
  name: 'DepartmentPosition',
  initialState: {
    profile: {},
    profileDepartment: {},
    profileCompany: {},
    skillNecessary: [],
    skillProfessional: [],
    departmentPositions: [],
    recruitment: [],
    roleId: 1,
    userStatus: {},
    views: 0,
    allJobLevelsTemplate: [],
    templateByJob: {}
  },
  reducers: {},
  extraReducers: {
    [getDepartmentPosition.fulfilled]: (state, action) => {
      const [
        profile,
        profileDepartment,
        profileCompany,
        skillNecessary,
        skillProfessional,
        departmentPositions,
        recruitment
      ] = action.payload

      return {
        ...state,
        profile: profile.data.data,
        profileDepartment: profileDepartment.data.data,
        profileCompany: profileCompany.data.data,
        skillNecessary: skillNecessary?.data?.data,
        skillProfessional: skillProfessional?.data?.data,
        departmentPositions: departmentPositions.data.data,
        recruitment: recruitment.data.data
      }
    },
    [getDepartmentPosition.rejected]: (state) => {
      return {
        ...state,
        profile: null
      }
    },
    [getUserStatus.fulfilled]: (state, action) => {
      return {
        ...state,
        userStatus: action.payload.data
      }
    },
    [getUserStatus.rejected]: (state, action) => {
      return {
        ...state,
        userStatus: null
      }
    },
    [getViewCountDepartmentPosition.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountDepartmentPosition.rejected]: (state) => {
      return state
    },
    [getViewCountDepartmentPositionEditmode.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountDepartmentPositionEditmode.rejected]: (state) => {
      return state
    },
    [getAllJobLevels.fulfilled]: (state, action) => {
      return {
        ...state,
        allJobLevelsTemplate: action.payload.data
      }
    },
    [getAllJobLevels.rejected]: (state, action) => {
      return state
    },
    [getTemplateByJobLevel.fulfilled]: (state, action) => {
      return {
        ...state,
        templateByJob: action.payload.data
      }
    },
    [getTemplateByJobLevel.rejected]: (state, action) => {
      return state
    }
  }
})

export const selectDepartmentPosition = (state) => state.departmentPosition
export const selectDepartmentPositionViews = (state) =>
  state.departmentPosition.views

export const selectUserStatus = (state) => state.departmentPosition?.userStatus

export default departmentPosition.reducer
