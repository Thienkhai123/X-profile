import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getDepartmentReview = createAsyncThunk(
  APP_TYPES.EDIT.GETREVIEWS,
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params || {}
      const response = await axios.get(`${api.EDIT.EDIT_GET_COMMENTS}/${id}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const saveDepartmentReviewEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEDEPARTMENTINTROEDIT,
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

const review = createSlice({
  name: 'review',
  initialState: {
    avatarUrlUpload: '',
    comments: []
  },
  reducers: {
    updateAvatarUrl: (state, action) => {
      state.avatarUrlUpload = action.payload
    },
    updateComment: (state, action) => {
      state.comments = action.payload
    },
    addComment: (state, action) => {
      state.comments = [...state.comments, { ...action.payload }]
    }
  },
  extraReducers: {
    [getDepartmentReview.fulfilled]: (state, action) => {
      return { ...state, comments: action?.payload?.data }
    },

    [saveDepartmentReviewEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectReviewEdit = (state) =>
  state.editModeCompany.department.review.comments

export const selectAvatarUrlUpload = (state) =>
  state.editModeCompany.department.review.avatarUrlUpload

export const selectProfileDeparment = (state) =>
  state.editModeCompany.department.banner.profileDepartment

export const selectCommentDefault = (state) =>
  state.editModeCompany.department.review.commentDefault

export const { updateAvatarUrl, updateComment, addComment } = review.actions

export default review.reducer
