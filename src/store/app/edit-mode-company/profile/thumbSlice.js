import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'

export const createImageSlideThumb = createAsyncThunk(
  'editmode/company/createImageSlideThumb',
  async (params, { rejectWithValue }) => {
    try {
      return params
    } catch (err) {}
  }
)
export const getCultureMediaEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETCULTUREMEDIAEDIT,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.CULTUREMEDIA}/${id}`)
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
export const saveCultureMediaEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVECULTUREMEDIAEDIT,
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

const thumb = createSlice({
  name: 'thumb',
  initialState: {
    listImage: [],
    medias: [],
    openModal: false,
    imageUpload: '',
    descriptionUpload: ''
  },
  reducers: {
    toogleModal: (state, action) => {
      state.openModal = action.payload
    },
    updateImageUpload: (state, action) => {
      state.imageUpload = action.payload
    },
    updateDescriptionUpload: (state, action) => {
      state.descriptionUpload = action.payload
    },
    updateItemDescription(state, action) {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.listImage)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          listImage: cloneArr
        }
      }
    },
    updateListImage: (state, action) => {
      state.listImage = action.payload
    },
    removeCultureMediaImages: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.listImage]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          listImage: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [createImageSlideThumb.fulfilled]: (state, action) => {
      return { ...state, listImage: action.payload }
    },
    [getCultureMediaEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        listImage: action.payload.data,
        medias: action.payload.data
      }
    },
    [saveCultureMediaEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectInitialState = (state) => state.editModeCompany.company.thumb
export const selectCultureMedias = (state) =>
  state.editModeCompany.company.thumb.listImage

export const {
  toogleModal,
  updateImageUpload,
  updateListImage,
  removeCultureMediaImages,
  updateDescriptionUpload,
  updateItemDescription
} = thumb.actions

export default thumb.reducer
