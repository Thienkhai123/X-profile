import { useEffect } from 'react'
import Head from 'next/head'

import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'
import AccountView from 'common/presentation/Pages/account-setting/AccountView'
import useTrans from 'common/hooks/useTrans'
import BreadCrumbsDynamic from 'common/presentation/BreadCrumbsDynamic'
import Image from 'next/image'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import MyCourse from 'common/presentation/Pages/account-setting/MyCourse'
import {
  getAllUserCourseLiked,
  getAllUserCourseOwned,
  selecCourseUserOwned,
  selectCoursesLiked,
  selectCoursesOwned,
  selectDataPaginationForCourseOwned
} from 'store/app/courseSlice'
const listBreadCrumbs = [
  {
    name: 'Home',
    link: '/'
  },
  {
    name: 'X-Profile'
  }
]
const InformationPage = () => {
  const dispatch = useDispatch()
  const trans = useTrans()
  const { ACCOUNT_SETTING } = trans
  const userProfile = useSelector(selectUserProfile)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.USER.GETPROFILE) ||
      selectLoading(state, APP_TYPES.COURSE.GETALLUSERCOURSEOWNED)
  )
  const coursesLiked = useSelector(selectCoursesLiked)
  const coursesOwned = useSelector(selecCourseUserOwned)
  const paginationCourseOwned = useSelector(selectDataPaginationForCourseOwned)

  const handleLinkCourse = (productGruid, isUserOwned) => {
    window.location.href = `/course/learn/${productGruid}`
  }
  const handlePageChangeCourseOwned = async (page) => {
    dispatch(getAllUserCourseOwned({ page: page }))
  }

  useEffect(() => {
    dispatch(getAllUserCourseLiked())
    dispatch(getAllUserCourseOwned())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1 pb-[84px] xl:pt-[44px] bg-white xl:bg-inherit">
        <Head>
          <title>Khóa học của tôi - X-Profile</title>
        </Head>

        <div className="px-4 xl:px-0 xl:flex hidden xl:w-[1140px] w-full justify-between mx-auto items-center relative ">
          <p className="xl:text-p28-bold text-p18-bold ">Thiết lập tài khoản</p>
        </div>
        <div className="flex flex-col xl:flex-row relative xl:w-[1140px] w-full gap-[20px] mx-auto xl:mt-6">
          <div className="px-4 xl:px-0 sidebar">
            <AccountView
              connect={ACCOUNT_SETTING?.society}
              actionList={ACCOUNT_SETTING?.accountAction}
            />
          </div>

          <div className="px-4 xl:px-0 xl:w-2/3  w-full">
            <div className=" xl:bg-white xl:p-[36px] rounded-[12px]">
              <MyCourse
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
    </>
  )
}

export default InformationPage
