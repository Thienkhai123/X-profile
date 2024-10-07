import useTrans from 'common/hooks/useTrans'

import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import Head from 'next/head'
import { Fragment, useEffect, useRef, useState } from 'react'

import MyJourneyMap from 'common/presentation/Pages/my-journey/MyJourneyMap'
import { getMap, selectStepMap } from 'store/app/journeySlice'
import { useDispatch } from 'react-redux'

import { useSelector } from 'react-redux'
import MyJourneyMapMobile from 'common/presentation/Pages/my-journey/MyJourneyMapMobile'

import MyCourse from 'common/presentation/Pages/account-setting/MyCourse'
import {
  getAllUserCourseLiked,
  getAllUserCourseOwned,
  selecCourseUserOwned,
  selectDataPaginationForCourseOwned
} from 'store/app/courseSlice'
import { selectUserProfile } from 'store/app/userSlice'

const MyJourneyMyCoursePage = () => {
  const trans = useTrans()
  const { MY_JOURNEY } = trans
  const dispatch = useDispatch()
  const selectStep = useSelector(selectStepMap)
  const coursesOwned = useSelector(selecCourseUserOwned)
  const paginationCourseOwned = useSelector(selectDataPaginationForCourseOwned)
  const userProfile = useSelector(selectUserProfile)
  const handleLinkCourse = (productGruid, isUserOwned) => {
    window.location.href = `/course/learn/${productGruid}`
  }
  const handlePageChangeCourseOwned = async (page) => {
    dispatch(getAllUserCourseOwned({ page: page }))
  }

  const stageId = selectStep
  const roleId = parseInt(localStorage.getItem('ROLE')) || 0

  useEffect(() => {
    dispatch(getMap())
    dispatch(getAllUserCourseLiked())
    dispatch(getAllUserCourseOwned())
  }, [])

  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - My Course</title>
      </Head>
      <div className="min-h-[100vh] relative flex flex-col">
        <div className="flex-1  bg-white">
          <div className="xl:max-w-[1440px] md:py-[56px] py-6 sm:px-20 px-0 mx-auto">
            <h1 className="text-center xl:mb-11 mb-4 md:text-p28-bold text-p16  mx-auto">
              Explore your career journey
            </h1>
            <div className="mb-[56px] xl:w-[1140px] xl:block hidden mx-auto relative group pointer-events-none">
              <MyJourneyMap state={stageId} role={roleId} />
            </div>
            <div className="xl:hidden px-6">
              <MyJourneyMapMobile state={stageId} role={roleId} />
            </div>
            <div className="xl:flex gap-8 justify-center">
              <div className="xl:min-w-[280px] ">
                <MyJourneySideMenu actionList={MY_JOURNEY?.journeyActionNew} />
              </div>
              <div className="flex flex-col flex-1 w-full max-w-[965px] relative px-5 md:px-0">
                <p className="md:text-p28-bold text-p16-bold text-black">
                  My Course
                </p>
                <MyCourse
                  title=""
                  listCourseUserOwned={coursesOwned}
                  paginationCourseOwned={paginationCourseOwned}
                  handlePageChangeCourseOwned={handlePageChangeCourseOwned}
                  handleLinkCourse={handleLinkCourse}
                  // {...userProfile}
                  isAuthentication={userProfile !== null}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MyJourneyMyCoursePage
