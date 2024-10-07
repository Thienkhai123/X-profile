import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const cloneDepartmentPositionEdit = createAsyncThunk(
  APP_TYPES.EDIT.CLONEDEPARMENTPOSITION,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const response = await axios.post(
        `${api.EDIT.EDIT_CLONE_DEPARMENT_POSITION}/${departmentPositionId}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)

const clone = createSlice({
  name: 'clone',
  initialState: {},
  reducers: {},
  extraReducers: {
    [cloneDepartmentPositionEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export default clone.reducer
