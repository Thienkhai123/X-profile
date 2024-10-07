import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Pagination from 'common/presentation/Pagination'
import CourseList from 'common/presentation/CourseList'
import FilterCourse from 'common/presentation/FilterCourse'
import SideBarWrapper from 'common/presentation/SideBarWrapper'
import CourseSortTypeForm from 'common/presentation/FilterCourse/CourseSortTypeForm'
import BreadCrumbsDynamic from 'common/presentation/BreadCrumbsDynamic'
import {
  getCourse,
  getCourseCategory,
  selectCourseCategories,
  selectCourseInSearchBar,
  selectCourses,
  selectCoursesByCategories,
  selectCurrentCategory,
  selectCustomCategories,
  selectCustomCategoriesOnSearchBar,
  selectDataPagination,
  selectFilterPayloadCategories,
  updateCategoriesFilter,
  updateCurrentCategories
} from 'store/app/courseSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { useRouter } from 'next/router'
import PaymentMethod from 'common/presentation/SummaryPaymentProduct/PaymentMethod'
import Head from 'next/head'
import SearchCourse from 'common/presentation/Pages/course/Course/Search'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import useDebounce from 'common/hooks/useDebounce'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Image from 'next/image'
import SidebarFilterCourse from 'common/presentation/SidebarFilterCourse'

const Search = (props) => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { keyword, categoryId } = query
  const [state, setState] = useState({
    currentType: 'Mới nhất',
    isOpen: false,
    titleMajor: 'Công nghệ thông tin',
    idType: 0
  })
  const categories = useSelector(selectCustomCategories)
  const baseCategories = useSelector(selectCustomCategoriesOnSearchBar)
  const [firstLoading, setFirstLoading] = useState(true)
  const refBtnSort = useRef()
  const courseListByCategory = useSelector(selectCoursesByCategories)
  const nameCategory = useSelector(selectCurrentCategory)
  const paginations = useSelector(selectDataPagination)
  const payloadFilter = useSelector(selectFilterPayloadCategories)
  const dataCourses = useSelector(selectCourseInSearchBar)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.COURSE.GETCOURSECATEGORY) ||
      selectLoading(state, APP_TYPES.COURSE.GETALLPRODUCTCOURSEFILTER)
  )

  const defaultValue = {
    courseType: categoryId
      ? [categoryId]
      : payloadFilter?.courseCategoryIds?.split(','),
    courseValue: [0, 10000000]
  }

  const handleTypeSort = (item) => {
    const { value, content } = item
    setState({
      ...state,
      isOpen: !state?.isOpen,
      currentType: content,
      idType: parseInt(value)
    })
    const payload = {
      ...payloadFilter,
      sort: value
    }

    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }

  const handleActiveDropdown = () => {
    setState({
      ...state,
      isOpen: !state.isOpen
    })
  }
  const handlePageChange = async (page) => {
    const payload = {
      ...payloadFilter,
      pageSize: 6,
      page: page
    }
    await new Promise(async (resolve) => {
      dispatch(getCourse(payload))
      resolve()
    })
  }

  const handleLinkCourse = (productGruid, isUserOwned) => {
    if (isUserOwned) {
      window.location.assign(`/course/learn/${productGruid}`)
    }
    if (isUserOwned === false) {
      window.location.assign(`${productGruid}`)
    }
  }

  useEffect(() => {
    if (query?.categoryId && categories) {
      if (
        categories[0]?.listCategoryIds.includes(parseInt(query?.categoryId))
      ) {
        const item = categories[0]?.filterGroups?.find(
          (x) => x.courseCategoryId === parseInt(query.categoryId)
        )
        setState({ ...state, titleMajor: item.content })
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.categoryId, categories?.filterGroups, categories, dispatch])

  const handleRedirectToCategoryCourse = (name, categoryId) => {
    dispatch(updateCurrentCategories(name))
    window.location.replace('/course/categories?categoryId=' + categoryId)
  }
  const handleOutSideSort = () => {
    const cloneState = { ...state, isOpen: false }
    setState({ ...cloneState })
  }
  useOnClickOutside(refBtnSort, handleOutSideSort)

  const handleGetCourse = async () => {
    const payload = {
      ...payloadFilter,
      pageSize: 6,
      keyword: query?.keyword,
      courseCategoryIds: firstLoading
        ? query?.categoryId
        : payloadFilter?.courseCategoryIds
    }
    setFirstLoading(false)
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }
  useEffect(() => {
    handleGetCourse()
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    dispatch(getCourseCategory())
    // dispatch(getCourse())
  }, [dispatch])

  useEffect(() => {
    if (baseCategories) {
      const tmp = baseCategories?.find(
        (x) => x?.courseCategoryId === parseInt(categoryId)
      )
      if (tmp) {
        dispatch(updateCurrentCategories(tmp?.name))
      }
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCategories, categoryId])

  return (
    <>
      {loading && <LoadingRole />}
      <Head>
        <title>Tìm khóa học - X-Profile</title>
      </Head>
      <div>
        <SearchCourse
          handleRedirectToCategoryCourse={handleRedirectToCategoryCourse}
          nameCategory={nameCategory}
          categoryList={baseCategories}
          payloadFilter={payloadFilter}
          coursesInSearch={dataCourses}
        />
      </div>
      <div className="bg-white w-full h-full">
        <div className="lg:mx-auto ">
          <div className="max-lg:px-5 max-w-[1140px] mx-auto border-b border-stoke pt-3 pb-8">
            <div className="flex items-center justify-center">
              <div className="flex">
                <p className="text-p28-bold lg:text-p20-bold pr-6 flex gap-x-2">
                  Kết quả{' '}
                  <span className="truncate max-w-[230px] ">
                    {keyword &&
                      decodeURIComponent(keyword)?.trim()?.length > 0 &&
                      `"${keyword}"`}
                  </span>
                </p>
                <div>
                  <span className="text-p20-bold border border-grey-4 rounded-3xl text-center px-6 py-0.5">
                    {paginations?.recordsFiltered}
                  </span>
                </div>
              </div>
              <div className="flex flex-col-reverse flex-1 lg:flex-row justify-end  bg-white relative">
                <CourseSortTypeForm
                  refBtnSort={refBtnSort}
                  isOpen={state?.isOpen}
                  idType={state?.idType}
                  currentType={state?.currentType}
                  handleTypeSort={handleTypeSort}
                  handleActiveDropdown={handleActiveDropdown}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-5 flex-col lg:flex-row max-w-[1140px] mx-auto mt-8 ">
            <div className="max-w-[340px] w-full">
              <div className="hidden lg:block  lg:w-[266px] lg:mb-10">
                <SidebarFilterCourse />
              </div>
            </div>
            <div className="bg-white max-lg:mx-5 mx-auto rounded-xl mb-10">
              <div className="flex justify-between flex-wrap  ">
                <div className="lg:hidden ">
                  <SideBarWrapper showIcon nameIcon="filter" title="Lọc">
                    <SidebarFilterCourse />
                  </SideBarWrapper>
                </div>
              </div>
              {courseListByCategory?.length === 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <Image
                    src="/images/Jobs/empty.png"
                    width={200}
                    height={200}
                    objectFit="contain"
                    quality={100}
                  />
                  <div className="text-center text-grey-1 text-p16 mt-4 ">
                    Không tìm thấy kết quả
                  </div>
                </div>
              ) : (
                <div>
                  <CourseList
                    courses={courseListByCategory}
                    handleLinkCourse={handleLinkCourse}
                  />
                </div>
              )}
              {paginations.totalPages > 1 && (
                <div className="flex justify-center lg:justify-between items-center my-4">
                  <Pagination
                    totalPages={paginations?.totalPages}
                    pageSize={6}
                    totalCount={paginations?.recordsTotal}
                    currentPage={paginations?.currentPage}
                    onPageChange={handlePageChange}
                  />
                  <p className="hidden lg:block">
                    Trang {paginations?.currentPage} trên{' '}
                    {paginations?.totalPages}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

Search.propTypes = {}

export default Search
