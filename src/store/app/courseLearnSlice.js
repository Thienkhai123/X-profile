import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import _ from 'lodash'

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

export const getLessonDetail = createAsyncThunk(
  APP_TYPES.COURSE.GETLESSONDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const { seoName, lessonId } = params

      const response = await axios.get(
        `${api.COURSE.GET_LESSON_DETAIL}/${seoName}/${lessonId}`
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

export const getUserLessonProgress = createAsyncThunk(
  APP_TYPES.COURSE.GETUSERLESSONPROGRESS,
  async (params, { rejectWithValue }) => {
    try {
      const { seoName } = params
      const response = await axios.get(
        `${api.COURSE.GET_USER_LESSON_PROGRESS}?seoName=${seoName}`
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

export const getAllCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.GETALLCOMMENTFORLESSON,
  async (params, { rejectWithValue }) => {
    try {
      const {
        lessonId,
        page,
        pageSize = 15,
        type,
        pageReply = 1,
        pageSizeReply = 15
      } = params
      const comments = await axios.get(
        `${api.LESSON.GET_ALL_COMMENT_FOR_LESSON}?lessonId=${lessonId}&page=${page}&pageSize=${pageSize}`
      )
      const lessonComments = comments.data.data
      const totalPages = lessonComments?.totalPages

      const childComment = await Promise.all(
        lessonComments?.data?.map(async (item) => {
          if (item.childLessonComments) {
            const res = await axios.get(
              `${api.LESSON.GET_REPLY_COMMENT_FOR_LESSON}?parentId=${item?.lessonCommentId}&lessonId=${lessonId}&page=${pageReply}&pageSize=${pageSizeReply}`
            )
            return { ...item, childComment: res.data.data.data }
          } else {
            return []
          }
        })
      )
      return { childComment, type, totalPages, lessonComments }
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getReplyCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.GETREPLYCOMMENTFORLESSON,
  async (params, { rejectWithValue }) => {
    try {
      const { seoName, parentId, lessonId, page = 1 } = params

      const response = await axios.get(
        `${api.LESSON.GET_REPLY_COMMENT_FOR_LESSON}?parentId=${parentId}&lessonId=${lessonId}&page=${page}&pageSize=${pageSize}`
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

export const createCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.CREATECOMMENTFORLESSON,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        api.LESSON.CREATE_COMMENT_FOR_LESSON,
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

export const actionForLesson = createAsyncThunk(
  APP_TYPES.LESSON.LESSONACTION,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.LESSON.LESSON_ACTION, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const likeCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.LIKECOMMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonComentId } = payload
      const response = await axios.post(
        `${api.LESSON.LIKE_COMMENT}?lessonCommentId=${lessonComentId}`
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

export const unLikeCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.UNLIKECOMMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonComentId } = payload
      const response = await axios.post(
        `${api.LESSON.UNLIKE_COMMENT}?lessonCommentId=${lessonComentId}`
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

export const disLikeCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.DISLIKECOMMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonComentId } = payload
      const response = await axios.post(
        `${api.LESSON.DISLIKE_COMMENT}?lessonCommentId=${lessonComentId}`
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

export const unDisLikeCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.UNLIKECOMMENT,
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonComentId } = payload
      const response = await axios.post(
        `${api.LESSON.UN_DISLIKE_COMMENT}?lessonCommentId=${lessonComentId}`
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

export const deleteCommentForLesson = createAsyncThunk(
  APP_TYPES.LESSON.DELETECOMMENTFORLESSON,
  async (payload, { rejectWithValue }) => {
    try {
      const { lessonComentId } = payload
      const response = await axios.post(
        `${api.LESSON.DELETE_COMMENT_FOR_LESSON}?lessonCommentId=${lessonComentId}`
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

export const getLessonLicense = createAsyncThunk(
  APP_TYPES.LESSON.GETLESSONLICENSE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.LESSON.GET_LESSON_LICENSE, {
        params: params
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

const courseLearn = createSlice({
  name: 'courseLearn',
  initialState: {
    productGuidCourseDetailSeo: {},
    lessonDetail: {},
    userLessonProgress: [],
    contentComment: '',
    contentCommentChil: '',
    commnetList: [],
    replyComments: [],
    amountPages: 1,
    totalCommentPage: 0,
    lessonComments: {},
    recentUserList: []
  },
  reducers: {
    updateContentComment(state, action) {
      state.contentComment = action.payload
    },
    updateContentCommentChil(state, action) {
      state.contentCommentChil = action.payload
    },
    updateCurrentPageComment(state, action) {
      state.amountPages = action.payload
    }
  },
  extraReducers: {
    [getProductCourseDetailSeo.fulfilled]: (state, action) => {
      return {
        ...state,
        productGuidCourseDetailSeo: action.payload.data
      }
    },
    [getProductCourseDetailSeo.rejected]: (state) => {
      return state
    },

    [getLessonDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        lessonDetail: action.payload.data
      }
    },
    [getLessonDetail.rejected]: (state) => {
      return state
    },

    [getUserLessonProgress.fulfilled]: (state, action) => {
      return {
        ...state,
        userLessonProgress: action.payload.data
      }
    },
    [getUserLessonProgress.rejected]: (state) => {
      return state
    },

    [getAllCommentForLesson.fulfilled]: (state, action) => {
      if (action.payload.type) {
        return {
          ...state,
          totalCommentPage: action.payload.totalPages,
          lessonComments: action.payload.lessonComments,
          commnetList: action.payload.childComment
        }
      } else {
        return {
          ...state,
          totalCommentPage: action.payload.totalPages,
          lessonComments: action.payload.lessonComments,
          commnetList: [...state.commnetList, ...action.payload.childComment]
        }
      }
    },

    [getAllCommentForLesson.rejected]: (state) => {
      return state
    },

    [getReplyCommentForLesson.fulfilled]: (state, action) => {
      return {
        ...state,
        replyComments: action.payload.data
      }
    },
    [getReplyCommentForLesson.rejected]: (state) => {
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

    //post
    [createCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [createCommentForLesson.rejected]: (state) => {
      return state
    },
    [actionForLesson.fulfilled]: (state, action) => {
      return state
    },
    [actionForLesson.rejected]: (state) => {
      return state
    },
    [deleteCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [deleteCommentForLesson.rejected]: (state) => {
      return state
    },
    [likeCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [likeCommentForLesson.rejected]: (state) => {
      return state
    },
    [unLikeCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [unLikeCommentForLesson.rejected]: (state) => {
      return state
    },
    [disLikeCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [disLikeCommentForLesson.rejected]: (state) => {
      return state
    },
    [unDisLikeCommentForLesson.fulfilled]: (state, action) => {
      return state
    },
    [unDisLikeCommentForLesson.rejected]: (state) => {
      return state
    }
  }
})

export const selectCourseDetailSeo = (state) =>
  state.courseLearn.productGuidCourseDetailSeo
export const selectLessonDetail = (state) => state.courseLearn.lessonDetail
export const selectUserLessonProgress = (state) =>
  state.courseLearn.userLessonProgress
export const selectContentComment = (state) => state.courseLearn.contentComment
export const selectContentCommentChill = (state) =>
  state.courseLearn.contentCommentChil
export const selectCommentList = (state) => state.courseLearn.commnetList
export const selectLessonComment = (state) => state.courseLearn.lessonComments
export const selectTotalPages = (state) => state.courseLearn.totalCommentPage
export const selectAmountPages = (state) => state.courseLearn.amountPages
export const selectReplyCommentList = (state) => state.courseLearn.replyComments
export const selectProductRecentUserList = (state) =>
  state.courseLearn.recentUserList
export const selectUser = (state) => state.user.profile

export const selectCourse = createSelector(
  [selectCourseDetailSeo, selectProductRecentUserList],
  (product, recentUserList) => {
    const userAccept = []
    recentUserList?.forEach((element) => {
      if (element?.avatarUrl !== null && element?.avatarUrl !== undefined) {
        const tmp = {
          imageUrl: element?.avatarUrl
        }
        userAccept.push(tmp)
      }
    })

    const banner = {
      nameCourse: product?.name,
      description: product?.shortDescription,
      price: product?.basePrice,
      priceSale: product?.sellingPrice,
      intructorName: product?.course?.trainer?.name,
      userAcceptCourse: product?.course?.totalUserCount,
      certificate: product?.course?.certificateId,
      productDemo: product?.course?.metadata?.productDemo,
      seoName: product?.seoName,
      isUserOwned: product?.isUserOwned,
      imageUrl: product?.imageUrl,
      guid: product?.course?.finalExamExamGuid,
      finalExamId: product?.course?.finalExamId,
      videoAmount:
        product?.course?.metadata?.totalTextLessons +
        product?.course?.metadata?.totalVideoLessons,
      userAcceptList: userAccept
    }
    const productDetail = _.isEmpty(product) ? undefined : product
    const lessonList = product?.course?.lessons
    const contentCourse = {
      description: product?.course?.fullDescription,
      totalUserAccept: product?.course?.totalUserCount,
      totalComment: product?.course?.totalComments
    }
    const checkIsUserOwned = product?.isUserOwned

    return {
      banner,
      contentCourse,
      productDetail,
      lessonList,
      checkIsUserOwned
    }
  }
)

export const selectChapterCourse = createSelector(
  [selectCourseDetailSeo, selectUserLessonProgress],
  (product, productProgess) => {
    const course = {
      totalVideoCount: product?.course?.videoAmount,
      length: product?.course?.totalSeconds
    }

    const chappterList = product?.course?.chapters.filter(
      (element) =>
        element?.parentChapterName === null && element?.parentId === null
    )

    const chapterLessonIsDone = []
    product?.course?.lessons?.forEach((element) => {
      const chappterIsDone = productProgess.find(
        (item) => element?.lessonId === item?.lessonId
      )
      if (chappterIsDone) {
        const lessionDone = { ...element, isDone: true }
        chapterLessonIsDone.push(lessionDone)
      } else {
        const lessionDone = { ...element, isDone: false }
        chapterLessonIsDone.push(lessionDone)
      }
    })

    const lessonsParentIdNull = chapterLessonIsDone.filter(
      (element) =>
        element?.chapter?.parentId === null || element?.chapter === null
    )

    const lessonsParentId = chapterLessonIsDone.filter(
      (element) => element?.chapter?.parentId !== null
    )

    const sortPositon = (positionFirst, positionSeccond) => {
      return positionFirst?.position - positionSeccond?.position
    }

    const resultPartList = []
    product?.course?.chapters.forEach((element) => {
      const tmpChapterItem = {
        ...element,
        lessonList: lessonsParentId
          .filter((e) => e.chapterId === element.chapterId)
          ?.sort(sortPositon)
      }
      resultPartList.push(tmpChapterItem)
    })

    const resultChapterTables = []

    chappterList?.forEach((element) => {
      const timeParentId = []
      const timeParentIdNull = []
      const totalTimeParentId = lessonsParentId?.filter(
        (e) => e?.chapter?.parentId === element?.chapterId
      )
      const totalTimeParentIdNull = lessonsParentIdNull?.filter(
        (e) => e?.chapterId === element?.chapterId
      )
      totalTimeParentId?.forEach((e) => {
        timeParentId.push(e.totalSeconds)
      })
      totalTimeParentIdNull?.forEach((e) => {
        timeParentIdNull.push(e.totalSeconds)
      })

      const tmpPartItem = {
        ...element,
        partCourseList: resultPartList
          .filter((e) => e?.parentId === element?.chapterId)
          ?.sort(sortPositon),
        lessonCourseList: lessonsParentIdNull
          .filter((e) => e?.chapterId === element?.chapterId)
          ?.sort(sortPositon),
        totalTimeParendId: _.sum(timeParentId),
        totalTimeParendIdNull: _.sum(timeParentIdNull)
      }
      resultChapterTables.push(tmpPartItem)
    })

    const resultChapterTablesSort = resultChapterTables?.sort(sortPositon)

    let lessonDefault = {}
    if (resultChapterTablesSort[0]?.partCourseList?.length > 0) {
      lessonDefault =
        resultChapterTablesSort[0]?.partCourseList[0]?.lessonList[0]
    } else {
      lessonDefault = resultChapterTablesSort[0]?.lessonCourseList[0]
    }

    return {
      resultChapterTables,
      resultChapterTablesSort,
      course,
      lessonDefault
    }
  }
)

export const selectLessonCourseDetail = createSelector(
  selectLessonDetail,
  (lesson) => {
    const lessconContent = {
      attachments: lesson?.attachments,
      description: lesson?.description,
      name: lesson?.name
    }
    const videoContent = {
      videoId: lesson?.lessonId,
      url: lesson?.videoUrl,
      lessonType: lesson?.enumLessonType,
      content: lesson?.content,
      image: '/images/Thumbnail.png',
      isDrmVideo: lesson?.metadata?.isDrmVideo || false,
      uploadStatus: lesson?.metadata?.uploadStatus || 0,
      lessonId: lesson?.lessonId
    }
    const exam = {
      examGuid: lesson?.exam?.examGuid
    }
    const metadata = lesson?.metadata || {}

    return { lessconContent, videoContent, exam, metadata }
  }
)

export const selectLessonProgress = createSelector(
  [selectUserLessonProgress, selectLessonDetail, selectCourseDetailSeo],
  (lessonProgress, lessonDetail, product) => {
    const lessonNote = lessonProgress?.find(
      (element) => element?.lessonId === lessonDetail?.lessonId
    )

    const lessonList = []
    product?.course?.lessons?.forEach((element) => {
      if (element?.chapter?.parentId !== null) {
        const tmp = {
          lessonId: element?.lessonId
        }
        lessonList.push(tmp)
      }
    })

    const progressList = []
    lessonProgress?.forEach((element) => {
      if (element?.isDone) {
        const tmpProgress = {
          lessonId: element?.lessonId,
          isDone: element?.isDone
        }
        progressList.push(tmpProgress)
      }
    })
    return { progressList, lessonNote }
  }
)

export const selectCommentListLesson = createSelector(
  [selectCommentList, selectUser, selectCourseDetailSeo, selectLessonComment],
  (commentData, profile, courseDetail, lessonComment) => {
    const comments = commentData
    const userId = profile?.userId
    const createCourseById = courseDetail?.course?.trainer?.userId
    const totalComments = lessonComment?.recordsTotal
    const resultComment = []
    const amountCommentChill = []
    if (comments) {
      comments?.forEach((element) => {
        const commentChil = []
        const actionLikeComment = []
        const actionDisLikeComment = []
        const tmpCmt = {
          avatarUrl: element?.createdByUser?.avatarUrl,
          name: element?.createdByUser?.name,
          timeLine: element?.timelineInSeconds,
          description: element?.content,
          numberLike: element?.totalLikes,
          numberDislike: element?.totalDislikes,
          lessonComentId: element?.lessonCommentId,
          checkCreateByUser: element?.createdByUserId === userId,
          checkUserCreateByCourse:
            element?.createdByUserId === createCourseById,
          createAt: element?.createdAt,
          commentChil: element?.childComment?.forEach((e) => {
            const actionLikeComment = []
            const actionDisLikeComment = []
            const tmpCmtChil = {
              avatarUrl: e?.createdByUser?.avatarUrl,
              name: e?.createdByUser?.name,
              timeLine: element?.timelineInSeconds,
              description: e?.content,
              numberLike: e?.totalLikes,
              numberDislike: e?.totalDislikes,
              lessonComentId: e?.lessonCommentId,
              createAt: e?.createdAt,
              checkCreateByUser: e?.createdByUserId === userId,
              checkUserCreateByCourse: e?.createdByUserId === createCourseById,
              actionLikeComment: e?.lessonCommentActions.forEach((e) => {
                if (e?.action === 0) {
                  actionLikeComment.push(e?.createdByUserId)
                }
              }),
              actionDisLikeComment: e?.lessonCommentActions.forEach((e) => {
                if (e?.action === 1) {
                  actionDisLikeComment.push(e?.createdByUserId)
                }
              })
            }
            commentChil.push({
              ...tmpCmtChil,
              actionLikeComment,
              actionDisLikeComment
            })
          }),
          actionLikeComment: element?.lessonCommentActions.forEach((e) => {
            if (e?.action === 0) {
              actionLikeComment.push(e?.createdByUserId)
            }
          }),
          actionDisLikeComment: element?.lessonCommentActions.forEach((e) => {
            if (e?.action === 1) {
              actionDisLikeComment.push(e?.createdByUserId)
            }
          })
        }
        resultComment.push({
          ...tmpCmt,
          commentChil,
          actionLikeComment,
          actionDisLikeComment
        })
        amountCommentChill.push(commentChil.length)
      })
    }

    const amountComment = totalComments
    return { resultComment, amountComment }
  }
)

export const selectProfile = createSelector(selectUser, (profile) => {
  const userComment = {
    userId: profile?.userId,
    avatarUrl: profile?.avatarUrl,
    name: profile?.name
  }
  return { userComment }
})

export const {
  updateContentComment,
  updateContentCommentChil,
  updateCurrentPageComment
} = courseLearn.actions

export default courseLearn.reducer
