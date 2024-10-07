import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { getBannerEdit } from './bannerSlice'

const HIGHLIGHT_DATA = {
  data: [
    // {
    //   title: 'Năm thành lập.',
    //   content: '3+',
    //   imageId: 33,
    //   imageUrl:
    //     'https://he44r2a3tgobj.vcdn.cloud/p/Image/fbba432e-cb12-44ef-9f37-574d508820a1.png',
    //   email: 'support@saigonmio.com',
    //   firstPhone: '0906993834',
    //   secondPhone: null
    // },
    // {
    //   title: 'Chứng chỉ cho đơn vị cung cấp dịch vụ  IT hàng đầu.',
    //   content: '65',
    //   imageId: 34,
    //   imageUrl:
    //     'https://he44r2a3tgobj.vcdn.cloud/p/Image/d90e22c8-15bc-4bc8-9785-475aed2a3c89.png',
    //   email: 'support@saigonmio.com',
    //   firstPhone: '0906993834',
    //   secondPhone: null
    // },
    // {
    //   title: 'Dự án giúp doanh nghiệp chuyển đổi số thành công.',
    //   content: '1600+',
    //   imageId: 33,
    //   imageUrl:
    //     'https://he44r2a3tgobj.vcdn.cloud/p/Image/fbba432e-cb12-44ef-9f37-574d508820a1.png',
    //   email: 'support@saigonmio.com',
    //   firstPhone: '0906993834',
    //   secondPhone: null
    // }
  ]
}
export const getAllHighLight = createAsyncThunk(
  APP_TYPES.EDIT.GETALLHIGHLIGHT,
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
export const saveStaticsEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVESTATICSEDIT,
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
export const getAchivementImagesEdit = createAsyncThunk(
  APP_TYPES.EDIT.GETACHIVEMENTIMAGES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.HELPER.GET_ACHIVEMENT_IMAGES, params)
      return response?.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response
    }
  }
)
const statics = createSlice({
  name: 'statics',
  initialState: {
    highlight: [],
    achivementImages: [],
    profile: {}
  },
  reducers: {
    addHighlight: (state, action) => {
      return {
        ...state,
        highlight: [...state.highlight, { ...action.payload }]
      }
    },
    updateStaticEdit(state, action) {
      return {
        ...state,
        profile: action.payload
      }
    },
    removeHighlight: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.highlight]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          highlight: cloneArr
        }
      }
    },
    updateHighlight: (state, action) => {
      const { id, title, content, imageUrl, imageId } = action.payload
      const cloneArr = cloneDeep(state.highlight)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          highlight: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [getBannerEdit.fulfilled]: (state, action) => {
      return { ...state, highlight: action?.payload?.data?.highlight || [] }
    },
    [getAllHighLight.fulfilled]: (state, action) => {
      return { ...state, profile: action?.payload?.data }
    },
    [getAllHighLight.rejected]: (state, action) => {
      return state
    },
    [getAchivementImagesEdit.fulfilled]: (state, action) => {
      return {
        ...state,
        achivementImages: action.payload
      }
    }
  }
})
export const selectHighlightEdit = (state) =>
  state?.editModeCompany?.company?.statics?.highlight
export const selectHighlightProfile = (state) =>
  state?.editModeCompany?.company?.statics?.profile
export const selectAchivementImagesEdit = (state) =>
  state?.editModeCompany?.company?.statics?.achivementImages

export const {
  addHighlight,
  removeHighlight,
  updateHighlight,
  updateStaticEdit
} = statics.actions
export default statics.reducer
