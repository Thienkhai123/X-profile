import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { isEmpty } from 'lodash'

export const getCourse = createAsyncThunk(
  APP_TYPES.COURSE.GETALLPRODUCTCOURSEFILTER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_ALL_PRODUCT_COURSE, {
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
export const getCourseForSearch = createAsyncThunk(
  APP_TYPES.COURSE.GETALLPRODUCTCOURSEFORSEARCH,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_ALL_PRODUCT_COURSE, {
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
export const getCoursesPartner = createAsyncThunk(
  APP_TYPES.COURSE.GETALLCOURSESPARTNER,
  async (params, { rejectWithValue }) => {
    params = {
      isFromCompany: true
    }
    try {
      const response = await axios.get(api.COURSE.GET_ALL_PRODUCT_COURSE, {
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

export const getAllUserCourseOwned = createAsyncThunk(
  APP_TYPES.COURSE.GETALLUSERCOURSEOWNED,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_ALL_USER_COURSE_OWNED, {
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

export const getCourseDetail = createAsyncThunk(
  APP_TYPES.COURSE.GETCOURSEDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_COURSE_DETAIL, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getCourseBanner = createAsyncThunk(
  APP_TYPES.COURSE.GETCOURSEBANNER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_COURSE_BANNER, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getCourseCategory = createAsyncThunk(
  APP_TYPES.COURSE.GETCOURSECATEGORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_COURSE_CATEGORY, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getCourseRecommended = createAsyncThunk(
  APP_TYPES.COURSE.GETCOURSERECOMMENDED,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.COURSE.GET_COURSE_RECOMMENDED,
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

export const getCoursePublic = createAsyncThunk(
  APP_TYPES.COURSE.GETCOURSEPUBLIC,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COURSE.GET_COURSE_PUBLIC, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const addNewCourseComment = createAsyncThunk(
  APP_TYPES.COURSE.ADDNEWCOURSECOMMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.COURSE.ADD_NEW_COURSE_COMMENT,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          // toast.error('Thông tin đăng nhập không chính xác!', {
          //   toastId: 'Auth_error',
          //   position: 'bottom-left',
          //   autoClose: 3000
          // })
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const changeCourseLikeStatus = createAsyncThunk(
  APP_TYPES.COURSE.CHANGECOURSELIKESTATUS,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.COURSE.CHANGE_COURSE_LIKE_STATUS,
        payload
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
          // toast.error('Thông tin đăng nhập không chính xác!', {
          //   toastId: 'Auth_error',
          //   position: 'bottom-left',
          //   autoClose: 3000
          // })
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const course = createSlice({
  name: 'course',
  initialState: {
    queries: {
      keyword: '',
      page: 1
    },
    payloadFilter: {
      courseType: [],
      sort: '',
      courseValue: [0, 10000000],
      pageSize: 6,
      courseCategoryIds: '',
      minPrice: 0,
      maxPrice: 10000000,
      page: 1,
      keyword: '',
      isFromCompanyChecked: false,
      isFreeCourseChecked: false,
      isPaidCourseChecked: false,
      arrayLevelCourse: [],
      level: ''
    },
    courses: [],
    coursesSearch: [],
    coursesLiked: [],
    coursesOwned: [],
    courseBanner: [],
    categories: [],
    recommended: [],
    coursePublic: [],
    coursePartner: [],
    comment: {},
    currentCategory: '',
    courseInSearchBar: []
  },
  reducers: {
    updateQueries(state, action) {
      return { ...state, queries: action.payload }
    },
    updateCategoriesFilter(state, action) {
      return { ...state, payloadFilter: action.payload }
    },
    updateCourseInSearchBarFilter(state, action) {
      return { ...state, courseInSearchBar: action.payload }
    },
    updateCurrentCategories(state, action) {
      return { ...state, currentCategory: action.payload }
    }
  },
  extraReducers: {
    [getCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        courses: action.payload
      }
    },
    [getCourse.rejected]: (state) => {
      return state
    },
    [getCourseForSearch.fulfilled]: (state, action) => {
      return {
        ...state,
        coursesSearch: action.payload
      }
    },
    [getCourseForSearch.rejected]: (state) => {
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
    },
    [getAllUserCourseOwned.fulfilled]: (state, action) => {
      return {
        ...state,
        coursesOwned: action.payload
      }
    },
    [getAllUserCourseOwned.rejected]: (state) => {
      return state
    },
    [getCourseDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        data: action.payload
      }
    },
    [getCourseDetail.rejected]: (state) => {
      return state
    },

    [getCourseCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        categories: action.payload.data
      }
    },
    [getCourseCategory.rejected]: (state) => {
      return state
    },
    [getCourseBanner.fulfilled]: (state, action) => {
      return {
        ...state,
        courseBanner: action.payload.data
      }
    },
    [getCourseBanner.rejected]: (state) => {
      return state
    },
    [getCourseRecommended.fulfilled]: (state, action) => {
      return {
        ...state,
        recommended: action.payload.data.data
      }
    },
    [getCourseRecommended.rejected]: (state) => {
      return state
    },
    [getCoursePublic.fulfilled]: (state, action) => {
      return {
        ...state,
        coursePublic: action.payload.data.data
      }
    },
    [getCoursePublic.rejected]: (state) => {
      return state
    },
    [addNewCourseComment.fulfilled]: (state, action) => {
      return {
        ...state,
        comment: action.payload
      }
    },
    [addNewCourseComment.rejected]: (state) => {
      return state
    },
    [changeCourseLikeStatus.fulfilled]: (state, action) => {
      return {
        ...state,
        comment: action.payload
      }
    },
    [changeCourseLikeStatus.rejected]: (state) => {
      return state
    },
    [getCoursesPartner.fulfilled]: (state, action) => {
      return {
        ...state,
        coursePartner: action.payload
      }
    },
    [getCoursesPartner.rejected]: (state) => {
      return state
    }
  }
})

export const selectCourses = (state) => state.course.courses
export const selectCoursesSearch = (state) => state.course.coursesSearch
export const selectCoursesLiked = (state) => state.course.coursesLiked
export const selectCoursesOwned = (state) => state.course.coursesOwned
export const selectCourseBanner = (state) => state.course.courseBanner
export const selectCourseCategories = (state) => state.course.categories
export const selectCourseRecommended = (state) => state.course.recommended
export const selectCoursePublics = (state) => state.course.coursePublic
export const selectProductSeoCourseDetail = (state) =>
  state.course.productSeoCourseDetail
export const selectQueries = (state) => state.course.queries
export const selectFilterPayloadCategories = (state) =>
  state.course.payloadFilter
export const selectCoursesPartner = (state) => state.course.coursePartner
export const selectCurrentCategory = (state) => state.course.currentCategory
export const selectCoursesFilterSearch = (state) =>
  state.course.courseInSearchBar

// SELECTOR
export const selectCustomCategories = createSelector(
  selectCourseCategories,
  (categories) => {
    let result = []
    const filterGroups = []
    const tmpListCategoryIds = []
    categories.forEach((item) => {
      tmpListCategoryIds.push(item.courseCategoryId)
      const tmpItem = {
        courseCategoryId: item.courseCategoryId,
        content: item.name,
        value: item.courseCategoryId
      }
      filterGroups.push(tmpItem)
    })
    result = [
      {
        listCategoryIds: tmpListCategoryIds,
        title: 'Danh mục liên quan',
        nameField: 'courseType',
        filterGroups: [...filterGroups]
      }
    ]
    return result
  }
)
export const selectCustomCategoriesOnSearchBar = createSelector(
  selectCourseCategories,
  (categories) => {
    const itemAllCourse = {
      courseCategoryId: '',
      name: 'Tất cả khoá học'
    }
    let result = [itemAllCourse, ...categories]
    return result
  }
)

export const selectRecommended = createSelector(
  [selectCourseRecommended, selectCoursesLiked],
  (courses, courseLiked) => {
    const listCourseUserLiked = courseLiked?.data || []
    let result = []
    courses?.forEach((item) => {
      let tmpItem = {
        ...item,
        company: item?.company || 'Công ty TNHH X-Profile',
        isCompanyCourse:
          isEmpty(item?.companyId) && isEmpty(item?.course?.companyId)
            ? true
            : false,
        imageUrl: item?.imageUrl,
        finalPrice: item?.sellingPrice,
        name: item?.course?.name,
        basePrice: item?.basePrice,
        length: item?.course?.totalSeconds,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUserCount: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        productGuid: item?.productGuid,
        id: item?.courseId,
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

export const selectPublics = createSelector(
  [selectCoursePublics, selectCoursesLiked],
  (courses, courseLiked) => {
    const listCourseUserLiked = courseLiked?.data || []
    let result = []
    courses?.forEach((item) => {
      let tmpItem = {
        ...item,
        company: item?.company || 'Công ty TNHH X-Profile',
        isCompanyCourse:
          isEmpty(item?.companyId) && isEmpty(item?.course?.companyId)
            ? true
            : false,
        imageUrl: item?.imageUrl,
        finalPrice: item?.sellingPrice,
        name: item?.course?.name,
        basePrice: item?.basePrice,
        length: item?.course?.totalSeconds,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUserCount: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        productGuid: item?.productGuid,
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

export const selectCoursesByCategories = createSelector(
  selectCourses,
  (courses) => {
    let result = []
    courses?.data?.data?.forEach((item) => {
      const tmpItem = {
        ...item,
        company: item?.company || 'Công ty TNHH X-Profile',
        isCompanyCourse:
          isEmpty(item?.companyId) && isEmpty(item?.course?.companyId)
            ? true
            : false,
        imageUrl: item?.imageUrl,
        finalPrice: item?.sellingPrice,
        name: item?.course?.name,
        basePrice: item?.basePrice,
        length: item?.course?.totalSeconds,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUser: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        productGuid: item?.productGuid,
        shortDescription: item?.shortDescription || item?.fullDescription
      }
      result.push(tmpItem)
    })
    return result
  }
)

export const selectDataPagination = createSelector(selectCourses, (courses) => {
  const result = {
    currentPage: courses?.data?.currentPage,
    currentRecords: courses?.data?.currentRecords,
    recordsFiltered: courses?.data?.recordsFiltered,
    recordsTotal: courses?.data?.recordsTotal,
    totalPages: courses?.data?.totalPages,
    pageSize: courses?.data?.pageSize
  }
  return result
})
export const selectFavoriteCourse = createSelector(
  [selectCourses, selectCoursesLiked],
  (courses, courseLiked) => {
    let result = []
    const listCourseUserLiked = courseLiked?.data || []
    const listCourseFavorite = courses?.data?.data || []
    listCourseFavorite?.forEach((item) => {
      let tmpItemLiked = {
        ...item,
        isCompanyCourse:
          isEmpty(item?.companyId) && isEmpty(item?.course?.companyId)
            ? true
            : false,
        name: item?.course?.name,
        finalPrice: item?.sellingPrice,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUser: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        shortDescription: item?.shortDescription || item?.fullDescription,
        length: item?.course?.totalSeconds,
        isUserOwned: item?.isUserOwned,
        seoName: item?.seoName
      }
      const checkReplaceItem = listCourseUserLiked?.some(
        (x) => x?.productId === tmpItemLiked?.productId
      )
      if (checkReplaceItem) {
        tmpItemLiked = { ...tmpItemLiked, isUserLiked: true }
        result?.push(tmpItemLiked)
      } else {
        result?.push(tmpItemLiked)
      }
    })
    return result
  }
)
export const selecPartnerCourse = createSelector(
  [selectCoursesPartner, selectCoursesLiked],
  (courses, courseLiked) => {
    let result = []
    const listCourseUserLiked = courseLiked?.data || []

    courses?.data?.data?.forEach((item) => {
      let tmpItemLiked = {
        ...item,
        name: item?.course?.name,
        finalPrice: item?.sellingPrice,
        totalVideoCount: item?.course?.metadata?.totalVideoLessons,
        totalUserCount: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        shortDescription: item?.shortDescription || item?.fullDescription,
        length: item?.course?.totalSeconds
      }
      const checkReplaceItem = listCourseUserLiked?.some(
        (x) => x?.productId === tmpItemLiked?.productId
      )
      if (checkReplaceItem) {
        tmpItemLiked = { ...tmpItemLiked, isUserLiked: true }
        result?.push(tmpItemLiked)
      } else {
        result?.push(tmpItemLiked)
      }
    })
    return result
  }
)
export const selecCourseUserOwned = createSelector(
  selectCoursesOwned,
  (courses) => {
    let result = []
    courses?.data?.forEach((item) => {
      const tmpItem = {
        ...item,
        company: item?.company || 'Công ty TNHH X-Profile',
        finalPrice: item?.sellingPrice,
        length: item?.course?.totalSeconds,
        totalVideoCount: item?.videoAmount,
        totalUserCount: item?.course?.totalUserCount,
        totalComment: item?.course?.totalComments,
        id: item?.courseId,
        productGuid: item?.productGuid
      }
      result.push(tmpItem)
    })
    return result
  }
)

export const selectDataPaginationForCourseOwned = createSelector(
  selectCoursesOwned,
  (courses) => {
    const result = {
      currentPage: courses?.currentPage,
      currentRecords: courses?.currentRecords,
      recordsFiltered: courses?.recordsFiltered,
      recordsTotal: courses?.recordsTotal,
      totalPages: courses?.totalPages,
      pageSize: courses?.pageSize
    }
    return result
  }
)
export const selectCourseInSearchBar = createSelector(
  selectCoursesSearch,
  (courses) => {
    const result = []
    courses?.data?.data?.forEach((item) => {
      const tmp = {
        imageUrl: item?.imageUrl,
        name: item?.course?.name,
        category: item?.company || 'Công ty TNHH X-Profile',
        seoName: item?.seoName
      }
      result.push(tmp)
    })
    return result
  }
)

export const {
  updateQueries,
  updateCategoriesFilter,
  updateCourseInSearchBarFilter,
  updateCurrentCategories
} = course.actions

export default course.reducer
