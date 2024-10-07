import React, { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import OverviewFilterWrapper from './OverviewFilterWrapper'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import * as yup from 'yup'
import ReactSlider from 'react-slider'
import { convertCurrency } from 'store/helper/functionHelper'
import { useDispatch } from 'react-redux'
import {
  getCourse,
  getCourseCategory,
  updateCategoriesFilter,
  updateCurrentCategories
} from 'store/app/courseSlice'
import useDebounce from 'common/hooks/useDebounce'
import { isEmpty } from 'lodash'
import { useRouter } from 'next/router'
const FilterCourse = (props) => {
  const { filterList, defaultValue, payloadFilter, listCategory } = props
  const { query } = useRouter()

  const dispatch = useDispatch()
  const schema = yup.object().shape({
    courseType: yup.string(),
    courseValue: yup.array().nullable()
  })
  const {
    register,
    control,
    handleSubmit,
    getValues,
    watch,
    reset,
    setValue,
    formState: { errors }
  } = useForm({
    mode: 'onChange',
    defaultValues: defaultValue,
    resolver: yupResolver(schema)
  })
  const listCategoryId = watch('courseType')

  const onSubmitFilter = async (data) => {
    const { courseType } = data
    const payload = {
      ...payloadFilter,
      pageSize: 6,
      keyword: query?.keyword,
      courseCategoryIds: courseType?.toString() || ''
    }
    const item = listCategory.find(
      (x) => x.courseCategoryId === parseInt(courseType)
    )
    dispatch(updateCurrentCategories(item?.name))
    dispatch(updateCategoriesFilter(payload))
    dispatch(getCourse(payload))
  }

  return (
    <form
      onChange={handleSubmit(onSubmitFilter)}
      className="bg-white w-full h-fit flex flex-col flex-auto rounded-xl "
    >
      <div>
        <OverviewFilterWrapper
          register={register}
          filterList={filterList}
          defaultValue={listCategoryId}
        />
      </div>
    </form>
  )
}

FilterCourse.propTypes = {}

export default FilterCourse
