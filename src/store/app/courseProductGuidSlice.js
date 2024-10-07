import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import _, { isEmpty } from 'lodash'

const helperCheckDemoAndCertificate = (c, d) => {
  if (c) {
    return c?.name
  }
 if (d) {
  return "Sản phẩm demo cuối khóa"
 }
}

export const getProductCourseDetail = createAsyncThunk(
  APP_TYPES.COURSE.GETPRODUCTCOURSEDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api.COURSE.GET_PRODUCT_COURSE_DETAIL}/${params.productGuid}`
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

export const getProductCourseDetailSeo = createAsyncThunk(
  APP_TYPES.COURSE.GETPRODUCTCOURSEDETAILSEO,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api.COURSE.GET_PRODUCT_COURSE_DETAIL_SEO}/${params.seoName}`
      )
      if (response?.data?.data?.seoName !== params.seoName) {
        return rejectWithValue(response.data)
      }
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getProductResentUserList = createAsyncThunk(
  APP_TYPES.COURSE.GETPRODUCTRECENTUSERLIST,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api.COURSE.GET_PRODUCT_RECENT_USER_LIST}/${params.seoName}`
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

export const getAllProductCourse = createAsyncThunk(
  APP_TYPES.COURSE.GETALLPRODUCTCOURSE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        api.COURSE.GET_ALL_PRODUCT_COURSE,
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

const courseProductGuid = createSlice({
  name: 'courseProductGuid',
  initialState: {
    productCourseCategory: [],
    productGuidCourseDetail: {},
    productGuidCourseDetailSeo: {},
    recentUserList: []
  },
  reducers: {},
  extraReducers: {
    [getProductCourseDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        productGuidCourseDetail: action.payload.data
      }
    },
    [getProductCourseDetail.rejected]: (state) => {
      return state
    },

    [getProductCourseDetailSeo.fulfilled]: (state, action) => {
      return {
        ...state,
        productGuidCourseDetailSeo: action.payload.data
      }
    },
    [getProductCourseDetailSeo.rejected]: (state) => {
      return state
    },
    [getAllProductCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        productCourseCategory: action.payload.data.data
      }
    },
    [getAllProductCourse.rejected]: (state) => {
      return state
    },
    [getProductResentUserList.fulfilled]: (state, action) => {
      return {
        ...state,
        recentUserList: action.payload.data
      }
    },
    [getProductResentUserList.rejected]: (state) => {
      return state
    },

    [likeCourseProductGuid.fulfilled]: (state, action) => {
      return state
    },
    [likeCourseProductGuid.rejected]: (state) => {
      return state
    }
  }
})

export const selectProductCourseCategory = (state) =>
  state.courseProductGuid.productCourseCategory
export const selectProductGuidCourseDetail = (state) =>
  state.courseProductGuid.productGuidCourseDetail
export const selectProductGuidCourseDetailSeo = (state) =>
  state.courseProductGuid.productGuidCourseDetailSeo
export const selectProductRecentUserList = (state) =>
  state.courseProductGuid.recentUserList
export const selectCoursesLiked = (state) => state.course.coursesLiked

export const selectProductGuid = createSelector(
  [selectProductGuidCourseDetailSeo, selectProductRecentUserList],
  (product, recentUserList) => {
    const bannerProductGuid = {
      isUserLiked: product?.isUserLiked,
      productGuid: product?.productGuid,
      title: product?.name,
      description: product?.shortDescription,
      price: product?.basePrice,
      priceSale: product?.sellingPrice,
      intructorName: product?.course?.trainer?.name,
      userAcceptCourse: product?.course?.totalUserCount,
      certificate: product?.course?.certificate,
      productDemo: product?.course?.metadata?.productDemo,
      titleBannerCourse: !product?.course?.certificate && !product?.course?.metadata?.productDemo? "Đang được cập nhật" :helperCheckDemoAndCertificate(product?.course?.certificate, product?.course?.metadata?.productDemo ),
      author: product?.course?.companyName
        ? product?.course?.companyName
        : 'X-Profile',
      level:
        product?.course?.metadata?.level === null
          ? ''
          : product?.course?.metadata?.level === 0
          ? 'Cơ bản'
          : product?.course?.metadata?.level === 1
          ? 'Trung bình'
          : product?.course?.metadata?.level === 2 && 'Nâng cao',
      imageUrl: product?.imageUrl || '/images/Course/Rectangle_5558.png',
      seoName: product?.seoName,
      isUserOwned: product?.isUserOwned
    }

    const userAcceptList = []
    recentUserList?.forEach((element) => {
      if (element?.avatarUrl !== null && element?.avatarUrl !== undefined) {
        const tmp = {
          imageUrl: element?.avatarUrl
        }
        userAcceptList.push(tmp)
      }
    })
    const banner = { ...bannerProductGuid, userAcceptList }
    const productDetail = _.isEmpty(product) ? undefined : product
    const skillCourse = product?.course?.courseSkills
    const contentCourse = {
      description: product?.course?.fullDescription,
      totalUserAccept: product?.course?.totalUserCount,
      totalComment: product?.course?.totalComments
    }

    let typeCourseCombo = false
    let url = new URL(window.location.href)
    let params = new URLSearchParams(url.search)
    let queryValue = params.get('dev')

    if (queryValue === 'combo') {
      typeCourseCombo = true
    } else {
      typeCourseCombo = false
    }

    return {
      banner,
      contentCourse,
      productDetail,
      skillCourse,
      typeCourseCombo
    }
  }
)

export const selectChapterProductGuid = createSelector(
  selectProductGuidCourseDetailSeo,
  (product) => {
    const course = {
      totalVideoCount: product?.course?.videoAmount,
      length: product?.course?.totalSeconds
    }

    const chappterList = product?.course?.chapters.filter(
      (element) =>
        element?.parentChapterName === null && element?.parentId === null
    )

    const lessonsParentIdNull = product?.course?.lessons.filter(
      (element) =>
        element?.chapter?.parentId === null || element?.chapter === null
    )

    const lessonsParentId = product?.course?.lessons.filter(
      (element) => element?.chapter?.parentId !== null
    )

    const sortPositon = (positionFirst, positionSeccond) => {
      return positionFirst?.position - positionSeccond?.position
    }

    const resultPartList = []
    product?.course?.chapters.forEach((element) => {
      let timeCourse = []
      const tmpChapterItem = {
        ...element,
        totalVideos: lessonsParentId.filter(
          (e) => e?.chapterId === element?.chapterId && e?.enumLessonType === 0
        ).length,
        totolTime: lessonsParentId.forEach((e) => {
          if (e?.chapterId === element?.chapterId && e?.enumLessonType === 0) {
            timeCourse.push(e?.totalSeconds)
          }
        }),
        lessonList: lessonsParentId.filter(
          (e) => e?.chapterId === element?.chapterId
        )
      }
      resultPartList.push({ ...tmpChapterItem, timeCourse })
    })

    const resultChapterTables = []

    chappterList?.forEach((element) => {
      const timeParentId = []
      const timeParentIdNull = []
      let videoParentId = []
      let videoParentIdNull = 0

      const partCourseList = resultPartList
        .filter((e) => e?.parentId === element?.chapterId)
        ?.sort(sortPositon)

      const lessonList = lessonsParentIdNull
        .filter((e) => e?.chapterId === element?.chapterId)
        ?.sort(sortPositon)

      const lessonCourses = []
      for (let i = 0; i < lessonList.length; i += 4) {
        const arraySlice = lessonList.slice(i, i + 4)
        lessonCourses.push(arraySlice)
      }
      // số lượng video và thời gian khóa học có phần
      partCourseList?.forEach((e) => {
        videoParentId.push(e?.totalVideos)
      })
      partCourseList?.forEach((e) => {
        timeParentId.push(_.sum(e?.timeCourse))
      })

      // số lượng video và thời gian khóa học không có phần
      const totalParentIdNull = lessonsParentIdNull?.filter(
        (e) => e?.chapterId === element?.chapterId
      )
      totalParentIdNull?.forEach((e) => {
        timeParentIdNull.push(e?.totalSeconds)
      })
      totalParentIdNull?.forEach((e) => {
        if (e?.enumLessonType === 0) {
          videoParentIdNull += 1
        }
      })
      const tmpPartItem = {
        ...element,
        partCourseList: partCourseList,
        lessonCourseList: lessonCourses,
        totalTimeParendId: _.sum(timeParentId),
        totalTimeParendIdNull: _.sum(timeParentIdNull),
        totalVideo: _.sum(videoParentId) + videoParentIdNull
      }
      resultChapterTables.push(tmpPartItem)
    })
    return {
      resultChapterTables,
      course
    }
  }
)

export const selectProductCourseByCategory = createSelector(
  [selectProductCourseCategory, selectCoursesLiked],
  (courses, courseLiked) => {
    let result = []
    const listCourseUserLiked = courseLiked?.data || []
    courses?.forEach((item) => {
      let tmpCategory = {
        ...item,
        isCompanyCourse:
          isEmpty(item?.companyId) && isEmpty(item?.course?.companyId)
            ? true
            : false,
        company: item?.company || 'Công ty TNHH X-Profile',
        imageUrl: item?.imageUrl,
        finalPrice: item?.course?.price,
        name: item?.course?.name,
        basePrice: item?.course?.basePrice,
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
        (x) => x?.productId === tmpCategory?.productId
      )
      if (checkReplaceItem) {
        tmpCategory = { ...tmpCategory, isUserLiked: true }
        result?.push(tmpCategory)
      } else {
        result?.push(tmpCategory)
      }
    })
    return result
  }
)
export const selectProductCourseDetailForPayment = createSelector(
  selectProductGuidCourseDetail,
  (courseDetail) => {
    const productDetail = {
      productName: courseDetail?.course?.name,
      priceSale: courseDetail?.sellingPrice,
      price: courseDetail?.basePrice,
      imageUrl: courseDetail?.imageUrl,
      company: courseDetail?.company || 'Công ty TNHH X-Profile',
      seoName: courseDetail?.seoName,
      isCourseFree: courseDetail?.sellingPrice === 0 ? true : false
    }
    const estimateInformation = {
      total: courseDetail?.sellingPrice,
      finalPayment: courseDetail?.sellingPrice
    }
    const payment = {}

    return { productDetail, estimateInformation, payment }
  }
)
export const { updateQueries } = courseProductGuid.actions

export default courseProductGuid.reducer
