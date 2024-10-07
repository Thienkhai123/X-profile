import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import {
  getCourse,
  selectFilterPayloadCategories,
  updateCategoriesFilter
} from 'store/app/courseSlice'
import { useDispatch } from 'react-redux'

const useProductFilter = (props) => {
  const payloadFilter = useSelector(selectFilterPayloadCategories)
  const dispatch = useDispatch()

  const handleCheckPriceFree = (value) => {
    let minPrice = payloadFilter?.minPrice
    let maxPrice = payloadFilter?.maxPrice
    let isFreeCourseChecked = !payloadFilter?.isFreeCourseChecked
    let isPaidCourseChecked = payloadFilter?.isPaidCourseChecked

    if (isPaidCourseChecked && !isFreeCourseChecked) {
      // Nếu Paid đang check trước đó còn Free đã check mà nhấn thì sẽ vô đây
      minPrice = 1
      maxPrice = 10000000
    } else if (isPaidCourseChecked) {
      // Nếu Paid đang check trước đó còn Free chưa check mà nhấn thì sẽ vô đây
      minPrice = 0
      maxPrice = 10000000
    } else if (!isPaidCourseChecked && !isFreeCourseChecked) {
      // Cả 2 đều không check thì trả về toàn bộ
      minPrice = 0
      maxPrice = 10000000
    } else {
      minPrice = 0
      maxPrice = 0
    }
    const payload = {
      ...payloadFilter,
      minPrice,
      maxPrice,
      isFreeCourseChecked
    }
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }

  const handleCheckPricePaid = (value) => {
    let minPrice = payloadFilter?.minPrice
    let maxPrice = payloadFilter?.maxPrice
    let isPaidCourseChecked = !payloadFilter?.isPaidCourseChecked
    let isFreeCourseChecked = payloadFilter?.isFreeCourseChecked

    if (isFreeCourseChecked && !isPaidCourseChecked) {
      minPrice = 0
      maxPrice = 0
    } else if (isFreeCourseChecked) {
      // Nếu Free đang check trước đó còn Paid chưa check mà nhấn thì sẽ vô đây
      minPrice = 0
      maxPrice = 10000000
    } else if (!isPaidCourseChecked && !isFreeCourseChecked) {
      // Cả 2 đều không check thì trả về toàn bộ
      minPrice = 0
      maxPrice = 10000000
    } else {
      minPrice = 1
      maxPrice = 10000000
    }
    const payload = {
      ...payloadFilter,
      minPrice,
      maxPrice,
      isPaidCourseChecked
    }
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }

  const handleCheckCourseIsFormCompany = (val) => {
    let isFromCompany
    let isFromCompanyChecked = payloadFilter?.isFromCompanyChecked // false
    if (val) {
      if (isFromCompanyChecked) {
        // Check 1 trong 2 đang được check thì sẽ không gửi nữa
        isFromCompany = undefined
      } else {
        // Nếu không có check cái nào thì call danh sách khoá học của company
        isFromCompany = false
      }
    } else {
      // Case này sẽ vào khi uncheck
      if (isFromCompanyChecked) {
        isFromCompany = undefined
      } else {
        isFromCompany = true
      }
    }
    const payload = {
      ...payloadFilter,
      isFromCompanyChecked: !payloadFilter?.isFromCompanyChecked,
      isFromCompany
    }
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }

  const handleCheckCourseIsFormPartner = (val) => {
    let isFromCompany
    let isFromCompanyChecked = payloadFilter?.isFromCompanyChecked

    if (val) {
      if (isFromCompanyChecked) {
        // Check 1 trong 2 đang được check thì sẽ không gửi nữa
        isFromCompany = undefined
      } else {
        // Nếu không có check cái nào thì call danh sách khoá học của đối tác
        isFromCompany = true
      }
    } else {
      // Case này sẽ vào khi uncheck, trường hợp tương tự case trên
      if (isFromCompanyChecked) {
        isFromCompany = undefined
      } else {
        isFromCompany = false
      }
    }
    const payload = {
      ...payloadFilter,
      isFromCompany,
      isFromCompanyChecked: !payloadFilter?.isFromCompanyChecked
    }
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }
  const handleCheckLevelCourse = (val) => {
    let arrayLevelCourse = [...payloadFilter?.arrayLevelCourse]
    if (!arrayLevelCourse?.includes(val)) {
      arrayLevelCourse.push(val)
    } else {
      // Nếu đã có item mà nhấn vào tiếp thì sẽ xoá level đó ra khỏi mảng
      const indexSplice = arrayLevelCourse.findIndex((x) => x === val)
      arrayLevelCourse.splice(indexSplice, 1)
    }
    dispatch(
      updateCategoriesFilter({
        ...payloadFilter,
        arrayLevelCourse,
        level: arrayLevelCourse.toString()
      })
    )
    dispatch(
      getCourse({ ...payloadFilter, level: arrayLevelCourse.toString() })
    )
  }
  return {
    handleCheckPriceFree,
    handleCheckPricePaid,
    handleCheckCourseIsFormCompany,
    handleCheckCourseIsFormPartner,
    handleCheckLevelCourse
  }
}

useProductFilter.propTypes = {}

export default useProductFilter
