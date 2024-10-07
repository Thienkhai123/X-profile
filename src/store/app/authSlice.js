import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { toast } from 'react-toastify'
import { ACCESS_TOKEN } from 'common/config/app.constants'
import { loginAfterSignup } from 'store/helper/serviceHelper'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

export const login = createAsyncThunk(
  APP_TYPES.AUTH.LOGIN,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.AUTH.LOGIN, payload)
      if (response?.data) {
        const urlParams = new URLSearchParams(window.location?.search)
        const companyId = urlParams.get('companyId')
        const departmentId = urlParams.get('departmentId')
        const departmentPositionId = urlParams.get('departmentPositionId')
        const route = urlParams.get('route')
        if (companyId && departmentId && departmentPositionId) {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace(
            `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
          )
        } else if (route) {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace(`/${route}`)
        } else {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace('/')
        }
      }
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertError({
              title: 'Thông tin tài khoản không tồn tại trên hệ thống.'
            }),
            {
              toastId: 'alert-save-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const loginByToken = createAsyncThunk(
  APP_TYPES.AUTH.LOGINBYTOKEN,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.AUTH.LOGIN_BY_TOKEN, payload)
      if (response?.data) {
        const urlParams = new URLSearchParams(window.location?.search)
        const companyId = urlParams.get('companyId')
        const departmentId = urlParams.get('departmentId')
        const departmentPositionId = urlParams.get('departmentPositionId')
        const route = urlParams.get('route')
        if (companyId && departmentId && departmentPositionId) {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace(
            `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
          )
        } else if (route) {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace(`/${route}`)
        } else {
          localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
          window.location.replace('/')
        }
      }
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertWaring({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-save-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getTokenByFirebase = createAsyncThunk(
  APP_TYPES.AUTH.GETTOKENBYFIREBASE,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.AUTH.GET_TOKEN_BY_FIREBASE, payload)
      // if (response?.data) {
      //   localStorage.setItem(ACCESS_TOKEN, response.data.data.renewToken)
      //   window.location.replace('/')
      // }
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertWaring({
              title: err.response.data.errorMessage
            }),
            {
              toastId: 'alert-save-warning',
              className: 'bg-toast-custom',
              closeButton: false,
              position: 'top-center',
              hideProgressBar: true,
              autoClose: 3000
            }
          )
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const registerAccount = createAsyncThunk(
  APP_TYPES.AUTH.REGISTER,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.AUTH.REGISTER, payload)
      // if (response.data) {
      //   loginAfterSignup(payload.email, payload.password)
      // }
      return {
        ...response.data,
        email: payload.email,
        password: payload.password
      }
    } catch (err) {
      switch (err.response.status) {
        case 400:
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const registerVerify = createAsyncThunk(
  APP_TYPES.AUTH.REGISTERVERIFY,
  async (payload) => {
    try {
      const response = await axios.post(api.AUTH.REGISTER_VERIFY + payload)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

export const registerVerifyCode = createAsyncThunk(
  APP_TYPES.AUTH.REGISTERVERIFYCODE,
  async (payload) => {
    try {
      const response = await axios.post(api.AUTH.REGISTER_VERIFY_CODE + payload)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

export const getCity = createAsyncThunk(
  APP_TYPES.AUTH.GETCITY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.AUTH.GET_CITY)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const forgotPasswordSendEmail = createAsyncThunk(
  APP_TYPES.AUTH.FORGOTPASSWORDSENDEMAIL,
  async (payload) => {
    try {
      const response = await axios.post(
        api.AUTH.FORGOT_PASSWORD_SEND_EMAIL,
        payload
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

export const forgotPasswordUpdate = createAsyncThunk(
  APP_TYPES.AUTH.FORGOTPASSWORDUPDATE,
  async (payload) => {
    try {
      const response = await axios.post(
        api.AUTH.FORGOT_PASSWORD_UPDATE,
        payload
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

const Auth = createSlice({
  name: 'Auth',
  initialState: {
    city: [],
    registerPayload: {},
    email: null,
    password: null
  },
  reducers: {},
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [login.rejected]: (state) => {
      return state
    },
    [loginByToken.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [loginByToken.rejected]: (state) => {
      return state
    },
    [registerAccount.fulfilled]: (state, action) => {
      const { email, password, data } = action.payload
      return {
        ...state,
        ...data,
        email: email,
        password: password
      }
    },
    [registerAccount.rejected]: (state) => {
      return state
    },
    [registerVerify.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [registerVerify.rejected]: (state) => {
      return state
    },
    [registerVerifyCode.fulfilled]: (state, action) => {
      return action.payload.data
    },
    [registerVerifyCode.rejected]: (state) => {
      return state
    },
    [getCity.fulfilled]: (state, action) => {
      return { ...state, city: action.payload.data }
    },
    [getCity.rejected]: (state) => {
      return state
    }
  }
})

export const selectCity = (state) => {
  const cities = state.auth.city || []
  let sortedCities = [...cities]
  sortedCities.sort((a, b) => a?.name?.localeCompare(b?.name))
  return [...sortedCities]
}
export const selectEmailPassword = (state) => {
  return { email: state.auth.email, password: state.auth.password }
}

export default Auth.reducer
