import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

export const getAllDepartmentPositionsEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETDEPARTMENTPOSITIONS,
  async (params, { rejectWithValue }) => {
    const { departmentId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.EDIT_MODE_GET_DEPARTMENT_POSITIONS}/${departmentId}`
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
export const savePositionsEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEDEPARTMENTPOSITION,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.EDIT.EDIT_MODE_DEPARTMENT_UPDATE,
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
const positionsDepartment = createSlice({
  name: 'positionsDepartment',
  initialState: {
    positions: []
  },
  reducers: {
    updateDepartmentPositions: (state, action) => {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.positions)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          positions: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [getAllDepartmentPositionsEdit.fulfilled]: (state, action) => {
      return { ...state, positions: action?.payload?.data }
    },
    [savePositionsEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})
export const selectAllDepartmentPositionEdit = (state) =>
  state?.editModeCompany?.department?.positions?.positions

export const { updateDepartmentPositions } = positionsDepartment.actions
export default positionsDepartment.reducer
