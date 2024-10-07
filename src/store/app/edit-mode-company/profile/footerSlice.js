import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getFooterEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETFOOTEREDIT,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.GET_PROFILE_COMPANY}/${companyId}`
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

export const saveFooterEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEFOOTEREDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(api.EDIT.EDIT_MODE_UPDATE, payload)
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)
export const getAddressBooksCompany = createAsyncThunk(
  APP_TYPES.EDIT.GETADDRESSBOOKS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.EDIT.GET_ADDRESS_BOOKS_COMPANY + '/' + payload
      )
      return response.data
    } catch (err) {
      return err.response.data
    }
  }
)

const footer = createSlice({
  name: 'footer',
  initialState: {
    profile: {},
    updateProperties: ['ContactEmail', 'ContactPhone', 'Address']
  },
  reducers: {
    updateFooterEdit(state, action) {
      state.profile = action.payload
    },
    updateAddressBookCreate(state, action) {
      state.addressBooks = action.payload
    },
    updateFooterSocial(state, action) {
      state.profile = {
        ...state.profile,
        meta: {
          ...state.profile?.meta,
          socials: [...action.payload]
        }
      }
    }
  },
  extraReducers: {
    [saveFooterEdit.fulfilled]: (state, action) => {
      return state
    },
    [getFooterEdit.fulfilled]: (state, action) => {
      return { ...state, profile: action?.payload?.data }
    },
    [getAddressBooksCompany.fulfilled]: (state, action) => {
      return { ...state, addressBooks: action?.payload?.data }
    },
    [getAddressBooksCompany.rejected]: (state, action) => {
      return state
    }
  }
})
export const selectFooterProfile = (state) =>
  state?.editModeCompany?.company?.footer?.profile
export const selectFooterAddressBook = (state) =>
  state?.editModeCompany?.company?.footer?.addressBooks || []

export const { updateFooterEdit, updateFooterSocial, updateAddressBookCreate } =
  footer.actions

export default footer.reducer
