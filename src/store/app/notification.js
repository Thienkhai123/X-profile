import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllNotification = createAsyncThunk(
  APP_TYPES.NOTIFICATION.GETALLNOTIFICATION,
  async (params, { rejectWithValue }) => {
    const { page } = params
    try {
      const response = await axios.get(
        api.NOTIFICATION.GET_ALL_NOTIFICATION + '?page=' + page
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const loadMoreNotification = createAsyncThunk(
  APP_TYPES.NOTIFICATION.LOADMORENOTIFICATIONS,
  async (params, { rejectWithValue }) => {
    const { page } = params
    try {
      const response = await axios.get(
        api.NOTIFICATION.GET_ALL_NOTIFICATION + '?page=' + page || 1,
        params
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

export const updateReadNotification = createAsyncThunk(
  APP_TYPES.NOTIFICATION.READNOTIFICATIONS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.NOTIFICATION.READ_NOTIFICATIONS,
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
      return rejectWithValue(err.response)
    }
  }
)
export const removeNotification = createAsyncThunk(
  APP_TYPES.NOTIFICATION.REMOVENOTIFICATIONS,
  async (payload, { rejectWithValue }) => {
    const { userNotificationId } = payload
    try {
      const response = await axios.post(
        api.NOTIFICATION.REMOVE_NOTIFICATIONS + '/' + userNotificationId
      )
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)
export const clickNotification = createAsyncThunk(
  APP_TYPES.NOTIFICATION.CLICKNOTIFICATIONS,
  async (payload, { rejectWithValue }) => {
    const { userNotificationId } = payload
    try {
      const response = await axios.post(api.NOTIFICATION.CLICK_NOTIFICATIONS, {
        userNotificationId: userNotificationId
      })
      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   case 401:
      //     window.location.replace('/sign-in')
      //     break
      //   default:
      // }
      return rejectWithValue(err.response)
    }
  }
)

const notification = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    query: { page: 1 },
    totalPage: 0,
    currentPage: 1
  },
  reducers: {
    updateQuery: (state, action) => {
      return {
        ...state,
        query: { ...state.query, ...action.payload }
      }
    },
    updateCurrentPage: (state, action) => {
      return {
        ...state,
        currentPage: action.payload
      }
    }
  },
  extraReducers: {
    [getAllNotification.fulfilled]: (state, action) => {
      return {
        ...state,
        totalPage: action.payload.totalPage,
        notifications: action.payload.data,
        currentPage: 1
      }
    },
    [loadMoreNotification.fulfilled]: (state, action) => {
      return {
        ...state,
        notifications: [...state.notifications, ...action.payload.data],
        currentPage: state.currentPage + 1
      }
    },
    [updateReadNotification.fulfilled]: (state, action) => {
      return state
    },
    [removeNotification.fulfilled]: (state, action) => {
      return state
    },
    [clickNotification.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectNotificationQuery = (state) => state?.notification?.query
export const selectNotificationTotalPage = (state) =>
  state?.notification?.totalPage
export const selectNotificationCurrentPage = (state) =>
  state?.notification?.currentPage

export const selectNotificationNotRead = (state) =>
  state?.notification?.notifications?.filter((noti) => !noti?.isRead)

export const selectAllNotifications = (state) =>
  state?.notification?.notifications
export const { updateQuery, updateCurrentPage } = notification.actions
export default notification.reducer
