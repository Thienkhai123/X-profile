import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'

export const getInternalCourse = createAsyncThunk(
  APP_TYPES.EDIT.GETINTERNALCOURSE,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.EDIT.GET_INTERNAL_COURSE}?CompanyId=${companyId}`
      )
      return response.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

export const likeCourseProductGuid = createAsyncThunk(
  APP_TYPES.COURSE.CHANGECOURSELIKESTATUS,
  async (payload, { rejectWithValue }) => {
    try {
      const { productGuid, isLike } = payload
      const response = await axios.post(
        `${api.COURSE.CHANGE_COURSE_LIKE_STATUS}?productGuid=${productGuid}&isLike=${isLike}`
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

export const getAllUserCourseLiked = createAsyncThunk(
  APP_TYPES.COURSE.GETALLUSERCOURSELIKED,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_ALL_USER_COURSE_LIKED, {
        params
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const internalCourse = createSlice({
  name: 'internalCourse',
  initialState: {
    course: [],
    coursesLiked: []
  },
  reducers: {},
  extraReducers: {
    [getInternalCourse.fulfilled]: (state, action) => {
      return { ...state, course: action?.payload?.data }
    },
    [likeCourseProductGuid.fulfilled]: (state, action) => {
      return state
    },
    [likeCourseProductGuid.rejected]: (state) => {
      return state
    },
    [getAllUserCourseLiked.fulfilled]: (state, action) => {
      return {
        ...state,
        coursesLiked: action.payload
      }
    },
    [getAllUserCourseLiked.rejected]: (state) => {
      return state
    }
  }
})

export const selectCourse = (state) =>
  state.editModeCompany.company.internalCourse.course
export const selectCoursesLiked = (state) =>
  state.editModeCompany.company.internalCourse.coursesLiked

export const selectInternalCourse = createSelector(
  [selectCourse, selectCoursesLiked],
  (courses, courseLiked) => {
    let result = []
    const listCourseUserLiked = courseLiked?.data || []

    courses?.forEach((item) => {
      let tmpItem = {
        ...item,
        company: item?.company || 'Công ty TNHH X-Profile',
        imageUrl: item?.imageUrl,
        finalPrice: item?.sellingPrice,
        name: item?.name,
        basePrice: item?.basePrice,
        length: item?.course?.totalSeconds,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUserCount: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        productGuid: item?.productGuid,
        courseGuid: item?.course?.courseGuid,
        shortDescription: item?.shortDescription || item?.fullDescription,
        seoName: item?.seoName,
        isUserOwned: item?.isUserOwned
      }
      const checkReplaceItem = listCourseUserLiked?.some(
        (x) => x?.productId === tmpItem?.productId
      )
      if (checkReplaceItem) {
        tmpItem = { ...tmpItem, isUserLiked: true }
        result?.push(tmpItem)
      } else {
        result?.push(tmpItem)
      }
    })
    return result
  }
)

// export const {} = internalCourse.actionss

export default internalCourse.reducer
