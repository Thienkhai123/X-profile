import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import BannerCoursePay from 'common/presentation/Pages/course/Pay/BannerPay'
import ContentCoursePay from 'common/presentation/Pages/course/Pay/ContentPay'
import CourseRelatedList from 'common/presentation/Pages/course/Pay/CourseRelatedList'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import IntroduceCourseChapterTable from 'common/presentation/Card/IntroduceCourseChapterTable'
import CourseChapterTableList from 'common/presentation/CourseChapterTableList'
import {
  getAllProductCourse,
  getProductCourseDetail,
  getProductCourseDetailSeo,
  getProductResentUserList,
  likeCourseProductGuid,
  selectChapterProductGuid,
  selectProductCourseByCategory,
  selectProductGuid
} from 'store/app/courseProductGuidSlice'
import { PRODUCT_GUID } from 'common/config/app.constants'
import Head from 'next/head'
import { getAllUserCourseLiked } from 'store/app/courseSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { selectLoading } from 'store/ui/loadingSlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { APP_TYPES } from 'store/types'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import ContentCourseComboPay from 'common/presentation/Pages/course/Pay/ContentCourseComboPay'

const Pay = (props) => {
  const dispatch = useDispatch()

  const router = useRouter()
  const { productGuid } = router.query
  const productGuidDetail = useSelector(selectProductGuid)
  const productCoursesCategory = useSelector(selectProductCourseByCategory)
  const chapterProductGuid = useSelector(selectChapterProductGuid)
  const { banner, contentCourse, productDetail, skillCourse, typeCourseCombo } =
    productGuidDetail
  const { resultChapterTables, course } = chapterProductGuid
  const loading = useSelector((state) =>
    selectLoading(
      state,
      APP_TYPES.COURSE.GETPRODUCTCOURSEDETAILSEO ||
        APP_TYPES.COURSE.GETPRODUCTRECENTUSERLIST ||
        APP_TYPES.COURSE.CHANGECOURSELIKESTATUS ||
        APP_TYPES.COURSE.GETALLPRODUCTCOURSE
    )
  )
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

  const handleCheckToken = () => {
    const TOKEN = localStorage.getItem('ACCESS_TOKEN')
    if (TOKEN === null) {
      toast(
        AlertError({
          title: 'Chưa đăng nhập tài khoản'
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
  }

  const handleLinkCourse = (productGruid, isUserOwned) => {
    handleCheckToken()
    if (isUserOwned) {
      window.location.assign(`/course/learn/${productGruid}`)
    }
    if (isUserOwned === false) {
      window.location.assign(`${productGruid}`)
    }
  }

  const handlePaymentCourse = (productGuid, isUserOwned) => {
    localStorage.setItem(
      PRODUCT_GUID,
      productGuidDetail?.productDetail?.productGuid
    )
    handleCheckToken()
    if (isUserOwned) {
      window.location.assign(`/course/learn/${productGuid}`)
    }
    if (isUserOwned === false) {
      window.location.assign(`/course/${productGuid}/payment`)
    }
  }

  const handleFavouriteCourse = async (courseProductGuid, isUserLiked) => {
    handleCheckToken()
    if (isUserLiked) {
      await dispatch(
        likeCourseProductGuid({ productGuid: courseProductGuid, isLike: false })
      )
    } else {
      await dispatch(
        likeCourseProductGuid({ productGuid: courseProductGuid, isLike: true })
      )
    }
    dispatch(getProductCourseDetailSeo({ seoName: productGuid }))
  }

  const handleFavouriteCourseList = async (courseProductGuid, isUserLiked) => {
    handleCheckToken()
    if (isUserLiked) {
      const likedCourse = await dispatch(
        likeCourseProductGuid({ productGuid: courseProductGuid, isLike: false })
      )
      const res = unwrapResult(likedCourse)
      if (res?.isSuccess) {
        dispatch(getAllUserCourseLiked({ pageSize: 100 }))
      }
    } else {
      const likedCourse = await dispatch(
        likeCourseProductGuid({ productGuid: courseProductGuid, isLike: true })
      )
      const res = unwrapResult(likedCourse)
      if (res?.isSuccess) {
        dispatch(getAllUserCourseLiked({ pageSize: 100 }))
      }
    }
  }

  useEffect(() => {
    if (productGuid !== undefined) {
      dispatch(getProductCourseDetailSeo({ seoName: productGuid }))
      dispatch(getProductResentUserList({ seoName: productGuid }))
    }
    if (productDetail?.course?.courseCategory?.courseCategoryId !== undefined) {
      dispatch(
        getAllProductCourse({
          courseCategoryIds:
            productDetail?.course?.courseCategory?.courseCategoryId
        })
      )
    }
    dispatch(getAllUserCourseLiked({ pageSize: 100 }))
  }, [
    dispatch,
    productGuid,
    productDetail?.course?.courseCategory?.courseCategoryId
  ])

  return (
    <div>
      {loading && <LoadingRole />}
      <Head>
        <title>{`${
          productDetail?.course?.name || ''
        } - Khóa học - X-Profile`}</title>
      </Head>
      <div>
        <BannerCoursePay
          {...banner}
          titleBreadCrumbs={breadCrumbsTitle()}
          handlePaymentCourse={handlePaymentCourse}
          handleFavouriteCourse={handleFavouriteCourse}
          typeCourseCombo={typeCourseCombo}
        />
      </div>
      <div className="bg-white pb-[60px] xl:px-0 px-[20px] xl:flex flex-col items-center">
        {typeCourseCombo && (
          <div>
            <ContentCourseComboPay skillCourse={skillCourse} />
          </div>
        )}
        {!typeCourseCombo && (
          <>
            <div>
              <ContentCoursePay {...contentCourse} skillCourse={skillCourse} />
            </div>
            <div>
              <CourseChapterTableList
                {...course}
                resultChapterTables={resultChapterTables}
              />
            </div>
          </>
        )}
        <div>
          <CourseRelatedList
            listCourse={productCoursesCategory}
            handleLinkCourse={handleLinkCourse}
            handleFavouriteCourse={handleFavouriteCourseList}
          />
        </div>
      </div>
    </div>
  )
}

Pay.propTypes = {}
Pay.defaultProps = {
  DUMP_COURSE: []
}

export default Pay
