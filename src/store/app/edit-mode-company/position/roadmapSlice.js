import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { getBannerEditPosition } from './bannerSlice'

// export const getAllSoftSkillPositionV2 = createAsyncThunk(
//   APP_TYPES.EDIT.GETALLSOFTSKILLPOSITIONV2,
//   async (params, { rejectWithValue }) => {
//     try {
//       const { type } = params || {}
//       const { data } = await axios.get(
//         api.USERSKILL.GET_ALL_SKILL_V2 + '?type=' + type
//       )
//       return data
//     } catch (err) {
//       return rejectWithValue(err.response)
//     }
//   }
// )
export const getRoadmapEditPosition = createAsyncThunk(
  APP_TYPES.EDIT.GETROADMAPPOSITION,
  async (params, { rejectWithValue }) => {
    try {
      const { departmentPositionId } = params || {}
      const response = await axios.get(
        `${api.EDIT.EDIT_GET_POSITION}/${departmentPositionId}`
      )

      return response.data
    } catch (err) {
      // switch (err.response.status) {
      //   default:
      //
      return err.response.data
    }
  }
)
export const saveRoadmapPositionEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEROADMAPPOSITION,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.patch(
        api.EDIT.EDIT_MODE_POSITION_UPDATE,
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
export const getSystemImages = createAsyncThunk(
  APP_TYPES.HELPER.GETSYSTEMIMAGES,
  async (params, { rejectWithValue }) => {
    try {
      const res = await axios.get(api.HELPER.GET_SYSTEM_IMAGES, params)
      return res.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const roadmap = createSlice({
  name: 'roadmap',
  initialState: {
    positionList: [],
    systemImages: [],
    imageUrl: ''
  },
  reducers: {
    updatePositionListEdit(state, action) {
      const { id, title, content, imageUrl, imageId } = action.payload
      const cloneArr = cloneDeep(state.positionList)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          positionList: cloneArr
        }
      }
    },
    addPositionListEdit(state, action) {
      return {
        ...state,
        positionList: [...state.positionList, { ...action.payload }]
      }
    },
    uploadLogo(state, action) {
      return { ...state, imageUrl: action.payload }
    },
    removeRoadmap: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.positionList]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          positionList: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [getSystemImages.fulfilled]: (state, action) => {
      return {
        ...state,
        systemImages: action.payload
      }
    },
    [getBannerEditPosition.fulfilled]: (state, action) => {
      const [departmentPosition, companyProfile, departmentProfile] =
        action.payload
      return {
        ...state,
        positionList: departmentPosition.data?.data?.meta?.careerPaths || []
      }
    },
    [saveRoadmapPositionEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectRoadmapPositionList = (state) =>
  state?.editModeCompany?.position?.roadmap?.positionList
export const selectImageUrl = (state) =>
  state?.editModeCompany?.position?.roadmap?.imageUrl

export const selectSystemImages = (state) =>
  state?.editModeCompany?.position?.roadmap?.systemImages

export const {
  updatePositionListEdit,
  addPositionListEdit,
  uploadLogo,
  removeRoadmap
} = roadmap.actions

export default roadmap.reducer
