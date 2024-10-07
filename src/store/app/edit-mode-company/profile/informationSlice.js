import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import { getBannerEdit } from './bannerSlice'

const INFORMATION_DATA = {
  profile: {
    description: '',
    addressBooks: [],
    employeeAmount: '',
    averageSalary: 0,
    recruitmentAmount: '',
    establishDate: '2020-12-20T00:00:00',
    websiteUrl: '',
    googleMapUrl: ''
  }
}
const LIST_IMAGE = {
  data: [
    { imgUrl: '/images/logoMobile.png' },
    { imgUrl: '/images/logoMobile.png' },
    { imgUrl: '/images/logoMobile.png' },
    { imgUrl: '/images/logoMobile.png' },
    { imgUrl: '/images/logoMobile.png' }
  ]
}

export const getInformationEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETINFORMATIONEDIT,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.GET_PROFILE_COMPANY}/${id}`)
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
export const saveInformationEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEINFORMATIONEDIT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(api.EDIT.EDIT_MODE_UPDATE, payload)
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
export const getAllImages = createAsyncThunk(
  APP_TYPES.EDIT.GETALLIMAGES,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.GET_IMAGES_COMPANY}/${id}`)
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
const information = createSlice({
  name: 'information',
  initialState: {
    profile: {},
    listImage: [],
    updateProperties: [
      // 'EstablishDate',
      'Description',
      // 'WebsiteUrl',
      // 'GoogleMapUrl',
      'Images',
      'WebsiteLinkTitle'
    ]
  },
  reducers: {
    updateInformationEdit(state, action) {
      return {
        ...state,
        profile: {
          ...state.profile,
          ...action.payload
          // updateProperties: [...state.updateProperties]
        }
      }
    },
    updateImagesEdit(state, action) {
      return {
        ...state,
        listImage: action.payload,
        profile: {
          ...state.profile
          // updateProperties: [...state.updateProperties]
        }
      }
    },
    addImagesEdit(state, action) {
      return {
        ...state,
        listImage: [...state.listImage, action.payload],
        profile: {
          ...state.profile
          // updateProperties: [...state.updateProperties]
        }
      }
    },
    removeImagesEdit: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.listImage]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          listImage: cloneArr,
          profile: {
            ...state.profile
            // updateProperties: [...state.updateProperties]
          }
        }
      }
    }
  },
  extraReducers: {
    [saveInformationEdit.fulfilled]: (state, action) => {
      return state
    },
    [getBannerEdit.fulfilled]: (state, action) => {
      return { ...state, profile: action?.payload?.data }
    },
    [getAllImages.fulfilled]: (state, action) => {
      return { ...state, listImage: action?.payload }
    }
  }
})

export const selectInformationProfile = (state) =>
  state?.editModeCompany?.company?.information?.profile

export const selectImagesInformation = (state) =>
  state?.editModeCompany?.company?.information?.listImage

export const {
  updateInformationEdit,
  updateImagesEdit,
  removeImagesEdit,
  addImagesEdit
} = information.actions

export default information.reducer
