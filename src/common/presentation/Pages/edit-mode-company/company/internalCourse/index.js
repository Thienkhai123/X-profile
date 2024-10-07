import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import BlockEditorContainer from 'common/container/block-editor'
import useTrans from 'common/hooks/useTrans'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import InternalCourseEditMode from './internalCourseEdit'
import InternalCourseViewMode from './internalCourseViewMode'
import HideShowBlock from 'common/presentation/Pages/Profile-Company/HideShowBlock'
import {
  getAllUserCourseLiked,
  getInternalCourse,
  likeCourseProductGuid,
  selectInternalCourse
} from 'store/app/edit-mode-company/profile/internalCourseSlice'
import { unwrapResult } from '@reduxjs/toolkit'

const InternalCourse = (props) => {
  const { editmode = false, isShowCampaigns = false } = props

  const dispatch = useDispatch()
  const trans = useTrans()
  const router = useRouter()
  const { companyId } = router.query
  const { PROFILE_COMPANY } = trans

  const handleFavouriteCourseList = async (courseProductGuid, isUserLiked) => {
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

  const course = useSelector(selectInternalCourse)

  useEffect(() => {
    dispatch(getInternalCourse({ companyId: companyId }))
    dispatch(getAllUserCourseLiked({ pageSize: 100 }))
  }, [dispatch])

  return (
    <div className="relative ">
      <BlockEditorContainer
        editmode={editmode}
        editState={
          <div>
            {/* <HideShowBlock
              editMode={editmode}
              //   isShowBlock={isShowDepartments}
              //   handleChangeIsShow={handleChangeIsShow}
            /> */}
            <InternalCourseEditMode trans={PROFILE_COMPANY} />
          </div>
        }
        viewState={
          <InternalCourseViewMode
            trans={PROFILE_COMPANY}
            internalCourses={course}
            handleFavouriteCourseList={handleFavouriteCourseList}
          />
        }
      />
    </div>
  )
}

InternalCourse.propTypes = {}
InternalCourse.defaultProps = {}

export default InternalCourse
