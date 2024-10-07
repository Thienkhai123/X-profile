import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import BannerCourseDetail from 'common/presentation/Pages/course/CourseDetail/BannerDetail'
import Chapter from 'common/presentation/Pages/course/CourseDetail/Chapter'
import CourseContent from 'common/presentation/Pages/course/CourseDetail/CourseContent'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import {
  actionForLesson,
  createCommentForLesson,
  deleteCommentForLesson,
  disLikeCommentForLesson,
  getAllCommentForLesson,
  getLessonDetail,
  getProductCourseDetailSeo,
  getProductResentUserList,
  getReplyCommentForLesson,
  getUserLessonProgress,
  likeCommentForLesson,
  selectAmountPages,
  selectChapterCourse,
  selectCommentListLesson,
  selectContentComment,
  selectCourse,
  selectLessonCourseDetail,
  selectLessonProgress,
  selectProfile,
  selectTotalPages,
  unDisLikeCommentForLesson,
  unLikeCommentForLesson,
  updateContentComment,
  updateCurrentPageComment
} from 'store/app/courseLearnSlice'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import LoadingRoleBlock from 'common/presentation/Loading/LoadingRoleBlock'
import Script from 'next/script'
import { saveAs } from 'file-saver'

const CourseDetailPage = (props) => {
  const { chapter, courseVideos } = props

  const dispatch = useDispatch()
  const router = useRouter()
  const { courseId } = router.query

  const courseDetail = useSelector(selectCourse)
  const chapterCourse = useSelector(selectChapterCourse)
  const lessonCourse = useSelector(selectLessonCourseDetail)
  const comment = useSelector(selectCommentListLesson)
  const profile = useSelector(selectProfile)
  const lessProgress = useSelector(selectLessonProgress)
  const content = useSelector(selectContentComment)
  const page = useSelector(selectAmountPages)
  const totalCommentPages = useSelector(selectTotalPages)
  const { banner, productDetail, lessonList, checkIsUserOwned } = courseDetail
  const { resultChapterTables, resultChapterTablesSort, lessonDefault } =
    chapterCourse

  const { comments, resultComment, amountComment } = comment
  const { lessconContent, videoContent, exam, metadata } = lessonCourse
  const { userComment } = profile
  const { progressList, lessonNote } = lessProgress
  const [chapterId, setChapterId] = useState(-1)
  const [video, setVideo] = useState({})
  const [resetForm, setResetForm] = useState(false)
  const [loadingCreateCmt, setLoadingCreateCmt] = useState(false)
  const [timeline, setTimeline] = useState(0)

  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: 'Khoá học',
        href: `course`
      },
      {
        name: productDetail?.course?.courseCategory?.name || '',
        href: `course/categories?categoryId=${productDetail?.course?.courseCategoryId}`
      },
      {
        name: productDetail?.course?.name || '',
        href: `course`
      }
    )
    return titleBreadCrumbs
  }

  const handleClickExam = (lessonId, guid) => {
    if (courseId !== undefined && lessonDefault?.lessonId !== undefined) {
      dispatch(
        getLessonDetail({
          seoName: encodeURI(courseId),
          lessonId: lessonId
        })
      )
      dispatch(
        getAllCommentForLesson({
          lessonId: lessonId,
          page: 1,
          type: true
        })
      )
      dispatch(updateCurrentPageComment(1))
    }
    if (window !== undefined && (guid !== null || guid !== undefined)) {
      window.location.assign(`/exam/${guid}`)
    }
  }

  const handleNoteLession = async (note) => {
    if (note !== null) {
      const payload = {
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        note: note,
        action: 0
      }
      await dispatch(actionForLesson(payload))
      await dispatch(getUserLessonProgress({ seoName: encodeURI(courseId) }))
    }
  }

  const handleReadDoneLession = async () => {
    const payload = {
      lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
      isDone: true,
      action: 1
    }
    await dispatch(actionForLesson(payload))
    dispatch(getUserLessonProgress({ seoName: encodeURI(courseId) }))
  }

  const handleReadMoreComment = () => {
    if (totalCommentPages > page) {
      dispatch(updateCurrentPageComment((page += 1)))
      dispatch(
        getAllCommentForLesson({
          lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
          page: page,
          type: false
        })
      )
    }
  }

  const handleLikeComent = async (lessonComentId) => {
    await dispatch(likeCommentForLesson({ lessonComentId: lessonComentId }))
    dispatch(
      getAllCommentForLesson({
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        page: 1,
        type: true
      })
    )
    dispatch(updateCurrentPageComment(page))
  }

  const handleUnLikeComent = async (lessonComentId) => {
    await dispatch(unLikeCommentForLesson({ lessonComentId: lessonComentId }))
    dispatch(
      getAllCommentForLesson({
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        page: 1,
        type: true
      })
    )
    dispatch(updateCurrentPageComment(page))
  }

  const handleDisLikeComent = async (lessonComentId) => {
    await dispatch(disLikeCommentForLesson({ lessonComentId: lessonComentId }))
    dispatch(
      getAllCommentForLesson({
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        page: 1,
        type: true
      })
    )
    dispatch(updateCurrentPageComment(page))
  }

  const handleUnDisLikeComent = async (lessonComentId) => {
    await dispatch(
      unDisLikeCommentForLesson({ lessonComentId: lessonComentId })
    )
    dispatch(
      getAllCommentForLesson({
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        page: 1,
        type: true
      })
    )
    dispatch(updateCurrentPageComment(page))
  }

  const handleDeleteComent = async (lessonComentId) => {
    await dispatch(deleteCommentForLesson({ lessonComentId: lessonComentId }))
    dispatch(
      getAllCommentForLesson({
        lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
        page: 1,
        type: true
      })
    )
    dispatch(updateCurrentPageComment(1))
  }

  const handleCreateComment = async () => {
    // const timeline = JSON.parse(localStorage.getItem('time_Vidseo_Course'))
    setLoadingCreateCmt(true)
    const payload = {
      lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
      content: content,
      parentId: null,
      timelineInSeconds: Math.floor(timeline) //Timevideo
    }
    const res = await dispatch(createCommentForLesson(payload))
    if (res?.meta?.requestStatus === 'fulfilled') {
      dispatch(
        getAllCommentForLesson({
          lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
          page: 1,
          type: true
        })
      )
      dispatch(updateContentComment(''))
      setLoadingCreateCmt(false)
    } else {
      setLoadingCreateCmt(false)
    }
  }

  const handleCreateCommentParent = async (data) => {
    // const timeline = JSON.parse(localStorage.getItem('time_Vidseo_Course'))
    setLoadingCreateCmt(true)
    const payload = {
      lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
      content: data?.content,
      parentId: data?.lessonCommentId
      // timelineInSeconds: Math.floor(timeline) //Timevideo
    }
    const res = await dispatch(createCommentForLesson(payload))
    if (res?.meta?.requestStatus === 'fulfilled') {
      dispatch(
        getAllCommentForLesson({
          lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
          page: 1,
          type: true
        })
      )
      setLoadingCreateCmt(false)
    } else {
      setLoadingCreateCmt(false)
    }
  }

  const handleDownloadFile = (fileName, fileURL) => {
    if (fileName.endsWith('.pdf')) {
      saveAs(fileURL, fileName)
    } else {
      window.open(fileURL)
    }
  }

  const handleDone = (guid) => {
    if (window !== undefined && (guid !== null || guid !== undefined)) {
      window.location.assign(`/exam/${guid}`)
    } else {
      toast(
        AlertError({
          title: 'Khóa học đang cập nhật bài kiểm tra!'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  //choose Video Course
  useEffect(() => {
    if (chapterId !== -1) {
      const contentVideo = lessonList?.find(
        (element) => element.lessonId === chapterId
      )
      setVideo({
        videoId: contentVideo?.lessonId,
        url: contentVideo?.videoUrl
      })
    } else {
      setVideo({
        videoId: lessonDefault?.lessonId,
        url: lessonDefault?.videoUrl
      })
    }
  }, [chapterId])

  //Get Api
  useEffect(() => {
    if (courseId !== undefined) {
      dispatch(getProductCourseDetailSeo({ seoName: encodeURI(courseId) }))
      dispatch(getProductResentUserList({ seoName: encodeURI(courseId) }))
    }
  }, [dispatch, courseId])

  useEffect(() => {
    if (courseId !== undefined && lessonDefault?.lessonId !== undefined) {
      dispatch(
        getLessonDetail({
          seoName: encodeURI(courseId),
          lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId
        })
      )
      dispatch(
        getAllCommentForLesson({
          lessonId: chapterId !== -1 ? chapterId : lessonDefault?.lessonId,
          page: 1,
          type: true
        })
      )
      dispatch(getUserLessonProgress({ seoName: encodeURI(courseId) }))
      dispatch(updateCurrentPageComment(1))
    }
  }, [dispatch, courseId, chapterId, lessonDefault?.lessonId])

  if (!productDetail) {
    return (
      <div className="flex-1">
        <LoadingRoleBlock />
      </div>
    )
  }

  if (!checkIsUserOwned) {
    toast(
      AlertError({
        title: 'Chưa mua khóa học này!'
      }),
      {
        toastId: 'alert-save-warning',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
    setTimeout(() => {
      if (window !== undefined) {
        window.location.assign('/course')
      }
    }, 2000)
  }

  const TOKEN = localStorage.getItem('ACCESS_TOKEN')
  if (TOKEN === null) {
    toast(
      AlertError({
        title: 'Chưa đăng nhập tài khoản',
        background: 'error'
      }),
      {
        toastId: 'alert-save-warning',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
    setTimeout(() => {
      if (window !== undefined) {
        window.location.assign('/sign-in')
      }
    }, 2000)
  }
  return (
    <div className="bg-white">
      <Head>
        <title>{`${
          productDetail?.course?.name || ''
        } - Khóa học - X-Profile`}</title>
      </Head>
      <p id="button-lable" className="hidden"></p>
      <button id="overlay-button" className="hidden" />
      <Script src="/asset/js/bundle.js?v=1" strategy="afterInteractive" />

      <div className="mb-[49px]">
        <BannerCourseDetail
          {...banner}
          handleDone={handleDone}
          titleBreadCrumbs={breadCrumbsTitle()}
          finishedVideoAmount={progressList?.length || 0}
        />
      </div>
      <div className="flex justify-center">
        <div className="flex flex-wrap justify-between xl:w-[1140px] w-full  mb-[32px]  ">
          <div>
            <Chapter
              {...chapter}
              resultChapterTables={resultChapterTablesSort}
              setChapterId={setChapterId}
              chapterId={chapterId === -1 ? lessonDefault?.lessonId : chapterId}
              handleClickExam={handleClickExam}
            />
          </div>
          <div>
            <CourseContent
              loadingCreateCmt={loadingCreateCmt}
              setTimeline={setTimeline}
              chapterId={chapterId}
              lessonNote={lessonNote}
              amountComment={amountComment}
              userComment={userComment}
              resetForm={resetForm}
              comments={resultComment}
              video={videoContent}
              lessconContent={lessconContent}
              metadata={metadata}
              handleNoteLession={handleNoteLession}
              handleReadDoneLession={handleReadDoneLession}
              handleCreateComment={handleCreateComment}
              handleLikeComent={handleLikeComent}
              handleUnLikeComent={handleUnLikeComent}
              handleDisLikeComent={handleDisLikeComent}
              handleUnDisLikeComent={handleUnDisLikeComent}
              handleCreateCommentParent={handleCreateCommentParent}
              handleDeleteComent={handleDeleteComent}
              handleReadMoreComment={handleReadMoreComment}
              checkCurrentPage={totalCommentPages > page}
              handleDownloadFile={handleDownloadFile}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

CourseDetailPage.propTypes = {}
CourseDetailPage.defaultProps = {
  chapter: {},
  courseVideos: []
}

export default CourseDetailPage
