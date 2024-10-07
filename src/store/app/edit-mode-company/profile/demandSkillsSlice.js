import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

const demandSkills = createSlice({
  name: 'demandSkills',
  initialState: {},
  reducers: {},
  extraReducers: {}
})

export default demandSkills.reducer
