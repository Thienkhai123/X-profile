import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const cloneDepartmentEdit = createAsyncThunk(
  APP_TYPES.EDIT.CLONEDEPARMENT,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentId } = params || {}
      const response = await axios.post(
        `${api.EDIT.EDIT_CLONE_DEPARMENT}/${departmentId}`
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
    [cloneDepartmentEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export default clone.reducer
