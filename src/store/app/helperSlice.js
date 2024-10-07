import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

const helper = createSlice({
  name: 'helper',
  initialState: {
    isOwner: false,
    menuEdit: []
  },
  reducers: {
    updateIsOwner(state, action) {
      state.isOwner = action.payload
    },
    updateMenuEdit(state, action) {
      state.menuEdit = action.payload
    }
  },
  extraReducers: {}
})

export const selectIsOwner = (state) => state.helper.isOwner
export const selectMenuEdit = (state) => state.helper.menuEdit

export const { updateIsOwner, updateMenuEdit } = helper.actions

export default helper.reducer
