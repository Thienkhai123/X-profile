import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { OrgCard } from 'common/presentation/Card'
import SearchCompanyFilter from '../searchCompanyFilter'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import {
  getAllJobsCompanies,
  loadMoreCompanies,
  searchJobCompaniesQueries,
  selectAllCities,
  selectAllJobsCompanies,
  selectIsMaxPage,
  selectPriotiryData,
  selectSearchQueries,
  selectTotalAllJobsCompanies
} from 'store/app/searchSlice'
import { useDispatch } from 'react-redux'
import useInfiniteScroll from 'common/hooks/useInfiniteScroll'
import SkeletonBanner from 'common/presentation/Skeleton/SkeletonBanner'
import { useRouter } from 'next/router'
import useTrans from 'common/hooks/useTrans'
import Image from 'next/image'

const SearchCompany = (props) => {
  const trans = useTrans()
  const { JOBS } = trans
  const { push } = useRouter()
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.JOB.GETALLCOMPANIES)
  )
  const loadingMore = useSelector((state) =>
    selectLoading(state, APP_TYPES.JOB.LOADMORECOMPANY)
  )
  const refOpt = useRef(null)
  const [showOpt, setShowOpt] = useState(false)
  const [firstLoading, setFirstLoading] = useState(false)
  const [contentFilter, setContentFilter] = useState('')
  const [selectedCity, setSelectedCity] = useState({
    id: 0,
    name: JOBS.titleAllSelect
  })

  const handleSelectJob = (value) => {
    setSelectedCity({
      id: value?.cityId,
      name: value?.name
    })
    setShowOpt(false)
  }

  const refPriorityOpt = useRef(null)
  const [showPriorityOpt, setShowPriorityOpt] = useState(false)
  const handleClosePriorityOpt = () => setShowPriorityOpt(false)
  useOnClickOutside(refPriorityOpt, handleClosePriorityOpt)
  const [selectedPriority, setSelectedPriority] = useState({
    id: null,
    name: ''
  })
  const PRIOTIRY_DATA = useSelector(selectPriotiryData)

  const handleSelectPriority = (value) => {
    setSelectedPriority({
      id: value?.id,
      name: value?.name
    })
    setShowPriorityOpt(false)
  }

  const handleSubmit = () => {
    const queries = {
      page: 1,
      keyword: contentFilter,
      cityId: selectedCity?.id === 0 ? null : selectedCity?.id
    }
    handleJobsCompaniesQueries(queries)
  }
  const handleCloseOpt = () => setShowOpt(false)
  useOnClickOutside(refOpt, handleCloseOpt)

  const cities = useSelector(selectAllCities)
  const jobsCompanies = useSelector(selectAllJobsCompanies)
  const totalData = useSelector(selectTotalAllJobsCompanies)
  const queries = useSelector(selectSearchQueries)
  const isMaxPage = useSelector(selectIsMaxPage)
  const dispatch = useDispatch()

  const handleJobsCompaniesQueries = async (query) => {
    dispatch(searchJobCompaniesQueries(query))
    dispatch(getAllJobsCompanies(query))
  }

  const handleAction = (companyId) => {
    push(`/profile-company/${companyId}`)
  }
  const handleScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - 392 &&
      !isMaxPage &&
      !loadingMore
    ) {
      dispatch(searchJobCompaniesQueries({ page: queries.page + 1 }))
      dispatch(
        loadMoreCompanies({ page: queries.page + 1, keyword: contentFilter })
      )
    }
  }
  useInfiniteScroll(handleScroll)
  useEffect(() => {
    dispatch(getAllJobsCompanies(queries))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    return () => {
      dispatch(searchJobCompaniesQueries({ page: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex-1 ">
      <div className="flex justify-center bg-white px-[16px] xl:px-[0px]">
        <div className="xl:py-[32px]  py-[16px] sm:w-[80vw] w-full">
          <div className="hidden xl:block mb-[16px]">
            <p className="sm:text-h3 text-p18-bold text-neutral">
              {JOBS.title}
            </p>
          </div>
          <SearchCompanyFilter
            titlePlaceholder={JOBS.titlePlaceholder}
            locationName={cities}
            titleButton={JOBS.titleButton}
            showOpt={showOpt}
            selectedCity={selectedCity}
            handleSelectJob={handleSelectJob}
            refOpt={refOpt}
            setShowOpt={setShowOpt}
            setContentFilter={setContentFilter}
            handleSubmit={handleSubmit}
            titleAllselect={JOBS.titleAllSelect}
          />
        </div>
      </div>
      <div className="xl:bg-light-nude bg-white  w-full flex flex-col items-center  sm:py-[32px] py-[8px] px-[16px] xl:px-[0px]">
        <div className="flex justify-between xl:w-[80vw] w-full sm:pb-[32px] pb-[16px] items-center">
          <p className="xl:text-p20-bold text-p16-bold text-black  ">
            {totalData + ' '}
            <span className="">
              {JOBS.company + ''}
              {cities.find((e) => e.cityId === queries?.cityId) === undefined
                ? ''
                : ' ở ' + cities.find((e) => e.cityId === queries?.cityId).name}
            </span>
          </p>

          <div className="sm:w-auto w-fit">
            {/* <XProfileIcon name="eye" width="20" height="20" />
            <p className="sm:text-p18 text-p14 text-grey-1">{`${trans.JOBS.Priority}:`}</p> */}
            <div className="relative" ref={refPriorityOpt}>
              <button
                className=" xl:min-w-[200px] min-w-[200px] gap-4 flex justify-between bg-white border-grey-3 border rounded-lg px-6 py-2 items-center"
                onClick={() => setShowPriorityOpt(!showPriorityOpt)}
              >
                {selectedPriority.id === null ? (
                  <Fragment>
                    <p className="sm:text-p18 text-p16  text-black ">
                      {PRIOTIRY_DATA[0].name}
                    </p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                ) : (
                  <Fragment>
                    <p className="sm:text-p18 text-p16  text-black ">
                      {selectedPriority.name}
                    </p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                )}
              </button>
              {showPriorityOpt && (
                <div className="bg-white max-h-[190px] z-50 border border-grey-3 min-w-[200px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] rounded-lg">
                  {PRIOTIRY_DATA?.map((priority) => (
                    <div
                      key={priority?.id}
                      className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px] cursor-pointer"
                      onClick={() => handleSelectPriority(priority)}
                    >
                      <p className="text-p16  ">{priority?.name}</p>
                      {selectedPriority.id === priority?.id && (
                        <XProfileIcon name="check" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        {loading && (
          <div className="flex justify-center">
            <div className="w-[80vw] grid lg:grid-cols-4 grid-cols-2 sm:gap-[20px] gap-[16px] py-[20px]">
              {[...Array(4)].map(() => (
                <>
                  <SkeletonBanner />
                </>
              ))}
            </div>
          </div>
        )}
        {!loading && (
          <div>
            <div className="sm:w-[80vw] w-full">
              {jobsCompanies?.length > 0 ? (
                <div className="grid lg:grid-cols-4 grid-cols-2 sm:gap-[20px] gap-[16px] ">
                  {jobsCompanies.map((org, ind) => (
                    <OrgCard org={org} key={ind} handleAction={handleAction} />
                  ))}
                </div>
              ) : (
                <div className="py-[88px]">
                  <div className="w-[200px] h-[200px] relative mx-auto">
                    <Image
                      src="/images/Jobs/empty.png"
                      alt=""
                      layout="fill"
                      quality={100}
                    />
                  </div>
                  <p className="sm:text-p18 text-p14 text-grey-1 text-center mt-[40px]">
                    Không tìm thấy kết quả
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

SearchCompany.propTypes = {
  title: PropTypes.string,
  titlePlaceholder: PropTypes.string,
  titleButton: PropTypes.string,
  locationName: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  ),
  option: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  ),
  filterBestList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string
    })
  ),
  company: PropTypes.string,
  titleOptionShow: PropTypes.string,
  skeleton: PropTypes.arrayOf(PropTypes.string)
}
SearchCompany.defaultProps = {
  title: 'Tìm kiếm công ty',
  titlePlaceholder: 'Tìm kiếm việc làm',
  titleButton: 'Tìm kiếm',
  locationName: [{ name: 'TP.Hồ chí minh' }],
  company: 'công ty',
  titleOptionShow: 'Ưu tiên hiển thị',
  filterBestList: [{ title: 'Phù hợp nhất' }]
}

export default SearchCompany
