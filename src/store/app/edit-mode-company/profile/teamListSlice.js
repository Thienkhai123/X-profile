import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

export const getAllDepartmentsEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETALLDEPARTMENTEDIT,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.EDIT_MODE_GET_DEPARTMENTS}/${companyId}`
      )
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
export const saveTeamListEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVETEAMLISTEDIT,
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
const teamList = createSlice({
  name: 'teamList',
  initialState: {
    departments: [],
    departmentId: null
  },
  reducers: {
    updateTeamList: (state, action) => {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.departments)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          departments: cloneArr
        }
      }
    },
    updateDepartment: (state, action) => {
      state.departments = action.payload
    }
  },
  extraReducers: {
    [getAllDepartmentsEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        departments: action?.payload?.data
      }
    },
    [saveTeamListEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})
export const selectAllDepartmentsEdit = (state) =>
  state?.editModeCompany?.company?.teamList?.departments

export const selectDepartmentId = (state) =>
  state?.editModeCompany?.company?.teamList?.departmentId

export const { updateTeamList, updateDepartmentId } = teamList.actions
export default teamList.reducer
