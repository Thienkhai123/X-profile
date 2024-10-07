import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { toast } from 'react-toastify'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'

export const getUserCart = createAsyncThunk(
  APP_TYPES.ORDER.GETUSERCART,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.ORDER.GET_USER_CART, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getUserOrderHistory = createAsyncThunk(
  APP_TYPES.ORDER.GETUSERORDERHISTORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.ORDER.GET_USER_ORDER_HISTORY, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getUserOrderHistoryDetail = createAsyncThunk(
  APP_TYPES.ORDER.GETUSERORDERHISTORYDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api.ORDER.GET_USER_ORDER_HISTORY_DETAIL + params.id}`,
        params
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const addCourseToCart = createAsyncThunk(
  APP_TYPES.ORDER.ADDCOURSETOCART,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.ORDER.ADD_COURSE_TO_CART, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const removeCourseFromCart = createAsyncThunk(
  APP_TYPES.ORDER.REMOVECOURSEFROMCART,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.ORDER.REMOVE_COURSE_FROM_CART,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const checkOut = createAsyncThunk(
  APP_TYPES.ORDER.CHECKOUT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.ORDER.CHECKOUT + '/' + payload?.guid
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const createSingleOrder = createAsyncThunk(
  APP_TYPES.ORDER.CREATESINGLEORDER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.ORDER.CREATE_SINGLE_ORDER, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          toast(
            AlertWaring({
              title: err?.response?.data
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

        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getPaymentMethod = createAsyncThunk(
  APP_TYPES.PAYMENT.PAYMENTGATEWAY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.PAYMENT.GET_PAYMENT_GATEWAY, params)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const order = createSlice({
  name: 'order',
  initialState: {
    userCart: {},
    orderHistory: {},
    orderHistoryDetail: {},
    singleOrder: {},
    paymentMethod: {},
    currentPaymentMethod: null
  },
  reducers: {
    updateCurrentPaymentMethod(state, action) {
      return { ...state, currentPaymentMethod: action.payload }
    }
  },
  extraReducers: {
    [getUserCart.fulfilled]: (state, action) => {
      return {
        ...state,
        cart: action.payload.data
      }
    },
    [getUserCart.rejected]: (state) => {
      return state
    },
    [getUserOrderHistory.fulfilled]: (state, action) => {
      return {
        ...state,
        orderHistory: action.payload.data
      }
    },
    [getUserOrderHistory.rejected]: (state) => {
      return state
    },
    [getUserOrderHistoryDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        orderHistoryDetail: action.payload.data
      }
    },
    [getUserOrderHistoryDetail.rejected]: (state) => {
      return state
    },
    [addCourseToCart.fulfilled]: (state) => {
      return state
    },
    [addCourseToCart.rejected]: (state) => {
      return state
    },
    [removeCourseFromCart.fulfilled]: (state) => {
      return state
    },
    [removeCourseFromCart.rejected]: (state) => {
      return state
    },
    [checkOut.fulfilled]: (state) => {
      return state
    },
    [checkOut.rejected]: (state) => {
      return state
    },
    [createSingleOrder.fulfilled]: (state) => {
      return state
    },
    [createSingleOrder.rejected]: (state) => {
      return state
    },
    [getPaymentMethod.fulfilled]: (state, action) => {
      return {
        ...state,
        paymentMethod: action.payload
      }
    },
    [getPaymentMethod.rejected]: (state) => {
      return state
    }
  }
})

export const selectUserCart = (state) => state.order.userCart
export const selectUserOrderHistory = (state) => state.order.orderHistory
export const selectPaymentMethod = (state) => state.order.paymentMethod
export const selectCurrentPaymentMethod = (state) =>
  state.order.currentPaymentMethod
export const selectUserOrderHistoryDetail = (state) =>
  state.order.orderHistoryDetail

// SELECTOR
export const selectDataPaymentMethod = createSelector(
  selectPaymentMethod,
  (paymentMethod) => {
    let paymentMomo = []
    let paymentVnpay = []
    let paymentVisa = []
    let paymentDifferent = []
    if (paymentMethod) {
      paymentMethod?.data?.forEach((item) => {
        if (item?.name === 'momo') {
          const tmpItem = {
            idRadio: item?.name,
            value: item?.paymentGatewayId,
            content: item?.displayName,
            imgUrls: item?.imageUrl
          }
          if (item?.isActive) {
            paymentMomo.push(tmpItem)
          }
        } else if (item?.name === 'vnpay') {
          const tmpItem = {
            idRadio: item?.name,
            value: item?.paymentGatewayId,
            content: item?.displayName,
            imgUrls: item?.imageUrl
          }
          if (item?.isActive) {
            paymentVnpay.push(tmpItem)
          }
        } else if (item?.name === 'visa') {
          const tmpItem = {
            idRadio: item?.name,
            value: item?.paymentGatewayId,
            content: item?.displayName,
            imgUrls: item?.imageUrl
          }
          if (item?.isActive) {
            paymentVisa.push(tmpItem)
          }
        } else {
          const tmpItem = {
            idRadio: item?.name,
            value: item?.paymentGatewayId,
            content: item?.displayName,
            imgUrls: item?.imageUrl
          }
          paymentDifferent.push(tmpItem)
        }
      })
    }

    return { paymentMomo, paymentDifferent, paymentVnpay, paymentVisa }
  }
)
export const { updateCurrentPaymentMethod } = order.actions
export default order.reducer
