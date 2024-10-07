import React, { Fragment, useRef, useState } from 'react'
import XProfileIcon from 'common/presentation/Icons'
import SaveJobStepAnalytic from '../JobSavedEdit/SaveJobStepAnalytic'
import { CourseCard } from 'common/presentation/Card'
import CourseItem from 'common/presentation/Card/CourseItem'
import CourseUserOwnedList from 'common/presentation/CourseUserOwnedList'
import Pagination from 'common/presentation/Pagination'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const MyCourse = (props) => {
  const {
    title = 'Khóa học của tôi',
    isAuthentication,
    listCourseUserOwned,
    paginationCourseOwned,
    handlePageChangeCourseOwned,
    handleLinkCourse
  } = props
  const JOBSAVE_STEP = [
    { id: 0, title: 'Khoá học đã mua ', href: '#' },
    { id: 1, title: 'Các khoá đã học', href: '#' }
  ]
  const [choosedStepId, setChooseStepId] = useState(0)
  const refSortCVOpt = useRef(null)
  const [showOptionCourse, setShowOptionCourse] = useState(false)
  const handleCloseOptionCourse = () => setShowOptionCourse(false)
  useOnClickOutside(refSortCVOpt, handleCloseOptionCourse)
  const handleChoose = async (id) => {
    // if (id === 0) {
    //   dispatch(getAllFavoriteCampaigns({}))
    // } else {
    //   dispatch(getAllAppliedCampaigns({}))
    // }
    setChooseStepId(id)
    handleCloseOptionCourse()
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="xl:block hidden text-p20-bold text-neutral ">{title}</p>
        {/* <div className="relative xl:block hidden ">
          <div className="absolute  inset-y-0 left-2 flex items-center pl-2">
            <XProfileIcon name="search" />
          </div>
          <input
            className="py-3 w-full xl:min-w-[360px] pl-11 bg-light-nude rounded-lg"
            placeholder="Tìm kiếm"
            maxLength={255}
            // onChange={(e) => setKeyword(e.target.value)}
          />
        </div> */}
      </div>
      <div className="">
        <div className="hidden xl:block ">
          <SaveJobStepAnalytic
            marginBottom="mb-[40px]"
            SETTING_STEP={JOBSAVE_STEP}
            handleChoose={handleChoose}
            choosedStepId={choosedStepId}
            breakpoints={{
              330: {
                slidesPerView: 2,
                slidesPerGroup: 1
              },
              750: {
                slidesPerView: 3,
                slidesPerGroup: 1
              }
            }}
          />
        </div>
        <div className="xl:hidden mb-4">
          <div className="relative flex justify-end" ref={refSortCVOpt}>
            <button
              className=" w-[218px] border border-grey-3 rounded-lg  flex gap-2 justify-between py-[10px] px-4 items-center"
              onClick={() => setShowOptionCourse(!showOptionCourse)}
            >
              <Fragment>
                <p className="text-p16  text-neutral ">
                  {JOBSAVE_STEP[choosedStepId].title}
                </p>
                <XProfileIcon name="arrowDown" />
              </Fragment>
            </button>
            {showOptionCourse && (
              <div className="bg-white max-h-[320px] p-2  shadow-[0_8px_16px_rgba(0,0,0,0.04)] border border-grey-3 z-50 w-[218px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-lg">
                {JOBSAVE_STEP?.map((step) => (
                  <div
                    key={step?.id}
                    className="flex transition-all justify-between rounded-lg items-center px-4 py-2"
                    onClick={() => handleChoose(step.id)}
                  >
                    <div className="w-full">
                      <div className="w-full flex items-center justify-between">
                        <p className=" text-p16 text-neutral">{step?.title}</p>
                        {/* {choosedStepId === step?.id && (
                          <XProfileIcon name="check" />
                        )} */}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {choosedStepId === 0 && (
          <>
            <CourseUserOwnedList
              listCourseUserOwned={listCourseUserOwned}
              handleLinkCourse={handleLinkCourse}
            />
            {paginationCourseOwned?.totalPages > 1 && (
              <div className="flex justify-end items-center">
                <Pagination
                  totalPages={paginationCourseOwned?.totalPages}
                  pageSize={paginationCourseOwned?.pageSize}
                  totalCount={paginationCourseOwned?.recordsTotal}
                  currentPage={paginationCourseOwned?.currentPage}
                  onPageChange={handlePageChangeCourseOwned}
                />
              </div>
            )}
          </>
        )}
        {choosedStepId === 1 && (
          <>
            <CourseUserOwnedList
              listCourseUserOwned={listCourseUserOwned}
              handleLinkCourse={handleLinkCourse}
            />
            {paginationCourseOwned?.totalPages > 1 && (
              <div className="flex justify-end items-center">
                <Pagination
                  totalPages={paginationCourseOwned?.totalPages}
                  pageSize={paginationCourseOwned?.pageSize}
                  totalCount={paginationCourseOwned?.recordsTotal}
                  currentPage={paginationCourseOwned?.currentPage}
                  onPageChange={handlePageChangeCourseOwned}
                />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default MyCourse
