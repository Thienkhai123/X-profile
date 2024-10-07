import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import SearchItem from './SearchItem'
import useDebounce from 'common/hooks/useDebounce'
import { useDispatch } from 'react-redux'
import {
  getCourse,
  getCourseForSearch,
  selectCourseInSearchBar,
  selectCoursesFilterSearch,
  selectCurrentCategory,
  selectFilterPayloadCategories,
  updateCategoriesFilter,
  updateCourseInSearchBarFilter,
  updateCurrentCategories
} from 'store/app/courseSlice'
import { useSelector } from 'react-redux'
import { RECENT_SEARCH } from 'common/config/app.constants'
import RecentItem from './RecentItem'
import isEmpty from 'lodash/isEmpty'
import CourseOnSearchBar from './CourseOnSearchBar'
import { selectCourses } from 'store/app/courseSlice'
import { useRouter } from 'next/router'
import CategoriesFilter from './CategoriesFilter'

const SearchCourse = (props) => {
  const {
    categoryList,
    coursesInSearch,
    payloadFilter,
    nameCategory,
    handleRedirectToCategoryCourse
  } = props
  const { query } = useRouter()
  const { keyword, categoryId, dev } = query
  const [searchRecentData, setSearchRecentData] = useState([])
  const [valueSearchKeyword, setValueSearchKeyword] = useState(keyword)
  const dispatch = useDispatch()
  const refCategory = useRef()
  const refSearch = useRef()
  // const payloadFilter = useSelector(selectFilterPayloadCategories)
  const coursesFilter = useSelector(selectCoursesFilterSearch)
  const [isShow, setIsShow] = useState({
    categoryCourse: false,
    searchCourse: false
  })
  const handleShowCategory = () => {
    if (isShow.categoryCourse) {
      setIsShow({ ...isShow, categoryCourse: !isShow.categoryCourse })
    }
  }
  const handleShowSearch = () => {
    if (isShow.searchCourse) {
      setIsShow({ ...isShow, searchCourse: !isShow.searchCourse })
    }
  }
  const handleSearchKeyword = async (e) => {
    const valueSearch = e?.target?.value
    setValueSearchKeyword(valueSearch)

    if (valueSearch?.trim().length > 0) {
      const courseFilter = coursesInSearch?.filter((element) =>
        element.name
          .trim()
          .toLowerCase()
          .includes(valueSearch.trim().toLowerCase())
      )
      dispatch(updateCourseInSearchBarFilter(courseFilter))
    } else {
      dispatch(updateCourseInSearchBarFilter([]))
    }
  }
  const handleSubmitSearch = async (e) => {
    e.stopPropagation()
    const valueSearch = valueSearchKeyword
    // Kiểm tra nếu localStorage chưa có danh sách recentSearches, khởi tạo một mảng mới
    let recentSearches = localStorage.getItem(RECENT_SEARCH)
      ? JSON?.parse(localStorage.getItem(RECENT_SEARCH))
      : []
    // Kiểm tra nếu keyword đã tồn tại trong mảng recentSearches, loại bỏ nó để thêm mới ở đầu mảng
    recentSearches = recentSearches?.filter(
      (search) => search?.trim() !== valueSearch?.trim()
    )
    // Thêm keyword mới vào đầu mảng
    if (valueSearch?.trim().length > 0) {
      recentSearches?.unshift(valueSearch)
    }
    // Giới hạn mảng recentSearches chỉ chứa tối đa 3 keyword
    if (recentSearches.length > 3) {
      recentSearches = recentSearches.slice(0, 3)
    }
    // Lưu mảng recentSearches vào localStorage
    localStorage.setItem(RECENT_SEARCH, JSON.stringify(recentSearches))
    setSearchRecentData(JSON.parse(localStorage.getItem(RECENT_SEARCH)))
    // Cập nhật payload filer sau khi submit
    dispatch(updateCategoriesFilter({ ...payloadFilter, keyword: valueSearch }))
    // Chuyển hướng đến trang kết quả tìm kiếm hoặc thực hiện hành động mong muốn
    window.location.href = `/course/search?keyword=${valueSearch}`
  }
  const handleRemoveRecentItemSearch = (searchName) => {
    let recentSearches = JSON.parse(localStorage.getItem(RECENT_SEARCH))
    recentSearches = recentSearches?.filter(
      (search) => search.trim() !== searchName.trim()
    )
    localStorage.setItem(RECENT_SEARCH, JSON.stringify(recentSearches))
    setSearchRecentData(JSON.parse(localStorage.getItem(RECENT_SEARCH)))
  }

  const handleRedirectRecentSearchURL = (valueSearch) => {
    window.location.href = `/course/search?keyword=${valueSearch}`
  }
  const handleLinkCourse = (seoName) => {
    window.location.href = `/course/${seoName}`
  }

  useEffect(() => {
    if (localStorage.getItem(RECENT_SEARCH)) {
      try {
        setSearchRecentData(JSON.parse(localStorage.getItem(RECENT_SEARCH)))
      } catch (error) {}
    }
  }, [])
  useEffect(() => {
    dispatch(getCourseForSearch())
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useOnClickOutside(refCategory, handleShowCategory)
  useOnClickOutside(refSearch, handleShowSearch)
  return (
    <div className="bg-white py-8 flex justify-center">
      <div className="flex flex-wrap xl:flex-nowrap justify-center items-center gap-4 w-[1140px] max-xl:px-2">
        {dev ? (
          <CategoriesFilter
            refCategory={refCategory}
            setIsShow={setIsShow}
            isShow={isShow}
          />
        ) : (
          <div ref={refCategory} className="relative">
            <div
              className=" cursor-pointer min-w-[240px] rounded-lg flex items-center gap-4 pl-6 pr-7 py-3 border border-grey-3"
              onClick={() =>
                setIsShow({
                  ...isShow,
                  searchCourse: false,
                  categoryCourse: !isShow.categoryCourse
                })
              }
            >
              <p className=" sm:text-p18 text-p14 w-full  text-black line-clamp-1">
                {nameCategory || 'Tất cả khoá học'}
              </p>
              <div>
                <XProfileIcon name="arrowDown" stroke="black" />
              </div>
            </div>
            {isShow.categoryCourse && (
              <div className="flex flex-col gap-5 rounded-lg absolute top-16 bg-white z-[100] sm:w-[368px] w-auto p-8 border border-grey-3 shadow-shadow4">
                {categoryList?.map((item, ind) => {
                  const { name, courseCategoryId } = item
                  return (
                    <div
                      onClick={() => {
                        handleRedirectToCategoryCourse(name, courseCategoryId)
                        setIsShow({ ...isShow, categoryCourse: false })
                      }}
                      key={ind}
                    >
                      <p className="text p-18 text-black cursor-pointer  hover:text-semantic  duration-150">
                        {name}
                      </p>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        <div ref={refSearch} className="w-full relative">
          <div
            className="px-6 py-3 flex items-center gap-4 rounded-lg border border-grey-3 w-full"
            onClick={() =>
              setIsShow({
                ...isShow,
                searchCourse: true,
                categoryCourse: false
              })
            }
          >
            <div>
              <XProfileIcon name="searchNavBar" />
            </div>
            <input
              defaultValue={keyword}
              onChange={(e) => handleSearchKeyword(e)}
              maxLength={255}
              className="w-full focus:outline-none sm:text-p18 text-p14 text-neutral"
              placeholder="Tìm kiếm khoá học"
            />
            <div>
              {(valueSearchKeyword?.length > 0 || keyword?.length > 0) && (
                <button
                  className="text-neutral text-p18-bold hover:text-button duration-150 w-[100px]"
                  onClick={handleSubmitSearch}
                >
                  Tìm kiếm
                </button>
              )}
            </div>
          </div>
          {isShow.searchCourse && (
            <div className="flex flex-col gap-5 rounded-lg absolute top-16 bg-white z-50 w-full p-8 border border-grey-3 shadow-shadow4">
              {isEmpty(coursesFilter) ? (
                <div className="w-full flex flex-col gap-4">
                  <p className="sm:text-p18 text-p16 text-grey-1">
                    Tìm kiếm gần đây
                  </p>
                  {searchRecentData?.map((item, index) => (
                    <RecentItem
                      key={index}
                      searchName={item}
                      handleRedirectRecentSearchURL={
                        handleRedirectRecentSearchURL
                      }
                      handleRemoveRecentItemSearch={
                        handleRemoveRecentItemSearch
                      }
                    />
                  ))}
                </div>
              ) : (
                <>
                  {isEmpty(coursesFilter) && (
                    <>Hiện chưa có khoá học nào phù hợp</>
                  )}
                  {coursesFilter?.slice(0, 4)?.map((item, index) => {
                    return (
                      <CourseOnSearchBar
                        {...item}
                        key={index}
                        handleLinkCourse={handleLinkCourse}
                      />
                    )
                  })}
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

SearchCourse.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      categoryChil: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          categoryChil: PropTypes.arrayOf(
            PropTypes.shape({
              title: PropTypes.string
            })
          )
        })
      )
    })
  )
}
SearchCourse.defaultProps = {
  categoryList: [
    {
      title: 'Lorem Ipsum',
      categoryChil: [
        {
          title: 'Backend Developer',
          categoryChil: [
            {
              title: 'Backend Developer'
            },
            {
              title: 'Backend Developer'
            },
            {
              title: 'Backend Developer'
            }
          ]
        },
        {
          title: 'Backend Developer',
          categoryChil: []
        },
        {
          title: 'Backend Developer',
          categoryChil: []
        }
      ]
    }
  ]
}

export default SearchCourse
