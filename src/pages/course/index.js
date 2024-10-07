import CourseItem from 'common/presentation/Card/CourseItem'
import CourseFavoriteList from 'common/presentation/CourseFavoriteList'
import CoursePartnerList from 'common/presentation/CoursePartnerList'
import CoursePopularList from 'common/presentation/CoursePopularList'
import CourseForPersonalList from 'common/presentation/CourseForPersonalList'
import Banner from 'common/presentation/Pages/course/Course/Banner'
import Field from 'common/presentation/Pages/course/Course/Field'
import Head from 'next/head'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllUserCourseLiked,
  getAllUserCourseOwned,
  getCourse,
  getCourseBanner,
  getCourseCategory,
  getCoursePublic,
  getCourseRecommended,
  selectCourseBanner,
  selectCourseCategories,
  selectCoursePublics,
  selectCourseRecommended,
  selectPublics,
  // selectCourseCategories,
  // selectCourses,
  selectCoursesLiked,
  // selectCoursesOwned,
  selectQueries,
  selectRecommended,
  selectFavoriteCourse,
  getCoursesPartner,
  selectCoursesPartner,
  selecPartnerCourse,
  selectCourses,
  selectCourseInSearchBar,
  selectFilterPayloadCategories,
  selectCurrentCategory,
  updateCurrentCategories
} from 'store/app/courseSlice'
import SubHeaderButton from 'common/presentation/SubHeaderButton'
import PaymentMethod from 'common/presentation/SummaryPaymentProduct/PaymentMethod'
import ProductCartItem from 'common/presentation/SummaryPaymentProduct/ProductCartItem'
import Promotion from 'common/presentation/SummaryPaymentProduct/Promotion'
import EstimatePayment from 'common/presentation/SummaryPaymentProduct/EstimatePayment'
import SummaryPaymentProduct from 'common/presentation/SummaryPaymentProduct'
import PartnerXProfile from 'common/presentation/Pages/course/Course/PartnerXProfile'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import SearchCourse from 'common/presentation/Pages/course/Course/Search'
import {
  getProductCourseDetailSeo,
  likeCourseProductGuid
} from 'store/app/courseProductGuidSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const CoursePage = (props) => {
  const { DUMP_COURSE } = props
  const dispatch = useDispatch()
  const queries = useSelector(selectQueries)
  const courses = useSelector(selectCourseInSearchBar)
  const coursesLiked = useSelector(selectFavoriteCourse)
  const baseCategories = useSelector(selectCourseCategories)
  const payloadFilter = useSelector(selectFilterPayloadCategories)
  // const coursesOwned = useSelector(selectCoursesOwned)
  const courseBanner = useSelector(selectCourseBanner)
  const categories = useSelector(selectCourseCategories)
  const recommended = useSelector(selectRecommended)
  const coursePublics = useSelector(selectPublics)
  const nameCategory = useSelector(selectCurrentCategory)

  const coursePartner = useSelector(selecPartnerCourse)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.COURSE.GETALLCOURSESPARTNER) ||
      selectLoading(state, APP_TYPES.COURSE.GETALLUSERCOURSEOWNED) ||
      selectLoading(state, APP_TYPES.COURSE.GETCOURSEBANNER) ||
      selectLoading(state, APP_TYPES.COURSE.GETCOURSERECOMMENDED) ||
      selectLoading(state, APP_TYPES.COURSE.GETCOURSEPUBLIC) ||
      selectLoading(state, APP_TYPES.COURSE.GETALLPRODUCTCOURSEFILTER)
  )
  useEffect(() => {
    dispatch(getCourse({ ...queries, sort: 4 }))
    dispatch(getAllUserCourseLiked())
    dispatch(getAllUserCourseOwned())
    dispatch(getCourseBanner())
    dispatch(getCourseCategory())
    dispatch(getCourseRecommended())
    dispatch(getCoursePublic())
    dispatch(getCoursesPartner())
    dispatch(getAllUserCourseLiked({ pageSize: 100 }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  const handleLinkCourse = (productGruid, isUserOwned) => {
    if (isUserOwned) {
      window.location.assign(`/course/learn/${productGruid}`)
    }
    if (isUserOwned === false) {
      window.location.assign(`course/${productGruid}`)
    }
  }

  const handleFavouriteCourse = async (courseProductGuid, isUserLiked) => {
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
  const handleRedirectToCategoryCourse = (name, categoryId) => {
    dispatch(updateCurrentCategories(name))
    window.location.replace('/course/categories?categoryId=' + categoryId)
  }

  const handleRedirectPage = (categoryId) => {
    window.location.replace('/course/search?categoryId=' + categoryId)
  }

  return (
    <div className="bg-white">
      {loading && <LoadingRole />}
      <Head>
        <title>Khóa học - X-Profile</title>
      </Head>
      <div>
        <SearchCourse
          nameCategory={nameCategory}
          categoryList={baseCategories}
          coursesInSearch={courses}
          payloadFilter={payloadFilter}
          handleRedirectToCategoryCourse={handleRedirectToCategoryCourse}
        />
      </div>
      <div className="my-10">
        <Banner bannerList={courseBanner} />
      </div>

      <CourseForPersonalList
        listCourse={recommended}
        handleFavouriteCourse={handleFavouriteCourse}
        handleLinkCourse={handleLinkCourse}
      />

      <div>
        <CourseFavoriteList
          handleFavouriteCourse={handleFavouriteCourse}
          favoriteList={coursesLiked}
          handleLinkCourse={handleLinkCourse}
        />
      </div>
      <div>
        <CoursePopularList
          handleFavouriteCourse={handleFavouriteCourse}
          listCourse={coursePublics}
          handleLinkCourse={handleLinkCourse}
        />
      </div>
      <div className="mb-10">
        <CoursePartnerList
          handleFavouriteCourse={handleFavouriteCourse}
          handleLinkCourse={handleLinkCourse}
          listCourse={coursePartner}
        />
      </div>
      <div className="mt-[48px]">
        <PartnerXProfile />
      </div>
    </div>
  )
}

export default CoursePage

CoursePage.propTypes = {}
CoursePage.defaultProps = {
  DUMP_COURSE: [
    {
      id: 1,
      name: 'Python Programming For Everyone 1',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 2,
      name: 'Python Programming For Everyone 2',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 3,
      name: 'Python Programming For Everyone 3',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 4,
      name: 'Python Programming For Everyone 4',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 5,
      name: 'Python Programming For Everyone 5',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 6,
      name: 'Python Programming For Everyone 6',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 7,
      name: 'Python Programming For Everyone 7',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    },
    {
      id: 8,
      name: 'Python Programming For Everyone 8',
      imageUrl: '/images/Course/Rectangle_5558.png',
      company: 'Công ty TNHH Soundio',
      totalVideoCount: 27,
      length: 3600,
      finalPrice: 80000,
      basePrice: 100000,
      totalUser: 3000,
      totalComment: 3000
    }
  ]
}
