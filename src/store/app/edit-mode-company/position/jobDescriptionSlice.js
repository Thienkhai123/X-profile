import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { getBannerEditPosition } from './bannerSlice'

export const getJobDescription = createAsyncThunk(
  APP_TYPES.EDIT.GETJOBDESCRIPTION,
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
export const savejobDescriptionEdit = createAsyncThunk(
  APP_TYPES.EDIT.SAVEJOBDESCRIPTION,
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

const jobDescription = createSlice({
  name: 'jobDescription',
  initialState: {
    jobDescriptionList: [],
    jobDescriptionDefault: [],
    systemImages: [],
    profile: {},
    selectedSalary: { id: null, name: '' }
  },
  reducers: {
    updateJobDescription(state, action) {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.jobDescriptionList)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          jobDescriptionList: cloneArr
        }
      }
    },
    addJobDescription(state, action) {
      return {
        ...state,
        jobDescriptionList: [...state.jobDescriptionList, { ...action.payload }]
      }
    },
    addChildJobDescription(state, action) {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.jobDescriptionList)
      cloneArr[id] = {
        ...cloneArr[id],
        childs: [...cloneArr[id]?.childs, { ...action.payload }]
      }

      if (id > -1) {
        return {
          ...state,
          jobDescriptionList: cloneArr
        }
      }
    },

    removeJobDescription: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.jobDescriptionList]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          jobDescriptionList: cloneArr
        }
      }
    },
    updateJobDescriptionEdit(state, action) {
      state.profile = action.payload
    },
    updateSelectedSalaryOption(state, action) {
      state.selectedSalary = action.payload
    }
  },
  extraReducers: {
    [getBannerEditPosition.fulfilled]: (state, action) => {
      const [departmentPosition, companyProfile, departmentProfile] =
        action.payload
      return {
        ...state,
        profile: departmentPosition.data?.data,
        jobDescriptionList:
          departmentPosition.data?.data?.meta?.descriptionTable || [],
        jobDescriptionDefault:
          departmentPosition.data?.data?.meta?.descriptionTable || []
      }
    },
    [savejobDescriptionEdit.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectJobDescriptionInitState = (state) =>
  state?.editModeCompany?.position?.jobDescription
export const selectSalarySelected = (state) =>
  state?.editModeCompany?.position?.jobDescription?.selectedSalary
export const {
  updateJobDescription,
  addJobDescription,
  addChildJobDescription,
  removeJobDescription,
  updateJobDescriptionEdit,
  updateSelectedSalaryOption
} = jobDescription.actions

export default jobDescription.reducer
