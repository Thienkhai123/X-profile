import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllDepartment = createAsyncThunk(
  APP_TYPES.DEPARTMENT.GETALLDEPARTMENT,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentId, companyId } = params
      const profile = await axios.get(
        `${api.DEPARTMENT.PROFILE}/${departmentId}`
      )
      const profileCompany = await axios.get(
        `${api.COMPANY.PROFILE}/${companyId}`
      )
      const images = await axios.get(`${api.DEPARTMENT.IMAGE}/${departmentId}`)
      const funFact = await axios.get(
        `${api.DEPARTMENT.FUNFACT}/${departmentId}`
      )
      const skill = await axios.get(`${api.DEPARTMENT.SKILL}/${departmentId}`)
      const comments = await axios.get(
        `${api.DEPARTMENT.COMMENT}/${departmentId}`
      )
      const departmentPositions = await axios.get(
        `${api.DEPARTMENT.DEPARTMENTPOSITION}/${departmentId}`
      )
      const recruitment = await axios.get(
        `${api.DEPARTMENT.RECRUITMENT}/${departmentId}`
      )

      const response = await Promise.all([
        profile,
        profileCompany,
        images,
        funFact,
        skill,
        comments,
        departmentPositions,
        recruitment
      ])
      // if (response[0].data.data?.companyId !== parseInt(companyId)) {
      //   return rejectWithValue(profile.data)
      // }
      if (response[1].data.data?.tag !== companyId) {
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
export const createDepartment = createAsyncThunk(
  APP_TYPES.EDIT.CREATEDEPARTMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.EDIT.EDIT_MODE_CREATE_DEPARTMENT,
        payload
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   // case 401:
      //   //   window.location.replace('/sign-in')
      //   //   break
      //   // default:
      // }
      return err.response.data
    }
  }
)

export const getViewCountDepartment = createAsyncThunk(
  APP_TYPES.DEPARTMENT.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const dateLocal = localStorage.getItem('XPD')
      if (dateLocal === null) {
        const response = await axios.post(
          api.DEPARTMENT.UPDATE_VIEW_COUNT,
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
            const response = await axios.get(api.DEPARTMENT.GET_VIEW_COUNT, {
              params: params
            })
            return response.data
          } else {
            const response = await axios.post(
              api.DEPARTMENT.UPDATE_VIEW_COUNT,
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

export const getViewCountDepartmentEditmode = createAsyncThunk(
  APP_TYPES.DEPARTMENT.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.DEPARTMENT.GET_VIEW_COUNT, {
        params: params
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const department = createSlice({
  name: 'department',
  initialState: {
    profile: {},
    profileCompany: {},
    images: [],
    funFact: [],
    skill: [],
    comments: [],
    departmentPositions: [],
    recruitment: [],
    views: 0
  },
  reducers: {},
  extraReducers: {
    [getAllDepartment.fulfilled]: (state, action) => {
      const [
        profile,
        profileCompany,
        images,
        funFact,
        skill,
        comments,
        departmentPositions,
        recruitment
      ] = action.payload
      return {
        ...state,
        profile: profile.data.data,
        profileCompany: profileCompany.data.data,
        images: images.data.data,
        funFact: funFact.data.data,
        skill: skill.data.data,
        comments: comments.data.data,
        departmentPositions: departmentPositions.data.data,
        recruitment: recruitment.data.data
      }
    },
    [getAllDepartment.rejected]: (state) => {
      return {
        ...state,
        profile: null
      }
    },
    [createDepartment.fulfilled]: (state) => {
      return state
    },
    [getViewCountDepartment.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountDepartment.rejected]: (state) => {
      return state
    },
    [getViewCountDepartmentEditmode.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountDepartmentEditmode.rejected]: (state) => {
      return state
    }
  }
})

export const selectAllDepartment = (state) => state.department
export const selectDepartmentViews = (state) => state.department.views

export const selectFunfact = (state) => {
  const response = []
  const funfact = state.department.funFact
  funfact?.map((el) => {
    response.push({
      title: el?.name,
      description: el?.description,
      src: el?.imageUrl
    })
  })
  return response
}

export const selectSkillDepartment = (state) => {
  const response = []
  const skills = state.department.skill
  skills?.map((el) => {
    response.push({
      title: el.name
    })
  })
  return response
}

export default department.reducer
