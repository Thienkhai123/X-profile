import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import { useRouter } from 'next/router'
import SearchFilter from '../SearchFilter'
import Modal from 'common/presentation/Modal'
import FilterModal from '../FilterModal'
import { useDispatch } from 'react-redux'
import {
  getAllJobs,
  loadMoreJobs,
  selectAllJobs,
  selectFilterModel,
  selectIsMaxPage,
  selectJobCities,
  selectTotalAllJobs,
  updateFilter
} from 'store/app/jobSlice'
import useInfiniteScroll from 'common/hooks/useInfiniteScroll'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import useTrans from 'common/hooks/useTrans'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Image from 'next/image'

const SearchJob = (props) => {
  const { isAuthentication, ownedCompany } = props
  const trans = useTrans()
  const jobs = useSelector(selectAllJobs)
  const isMaxPage = useSelector(selectIsMaxPage)
  const filterModel = useSelector(selectFilterModel)
  const cities = useSelector(selectJobCities)
  const totalData = useSelector(selectTotalAllJobs)
  const { push, query } = useRouter()
  const [moreFilter, setMoreFilter] = useState(false)
  const [firstLoading, setFirstLoading] = useState(false)
  const [showPriorityOpt, setShowPriorityOpt] = useState(false)
  const [selectedPriority, setSelectedPriority] = useState({
    id: null,
    name: ''
  })
  const refPriorityOpt = useRef(null)
  const isLoading = useSelector((state) =>
    selectLoading(state, APP_TYPES.JOB.GETALLJOBS)
  )
  const isLoadingMore = useSelector((state) =>
    selectLoading(state, APP_TYPES.JOB.LOADMOREJOB)
  )

  const PRIOTIRY_DATA = [
    { id: 0, name: 'Việc mới đăng' },
    { id: 1, name: 'Lương cao nhất' }
  ]

  const dispatch = useDispatch()

  const handleScroll = () => {
    const footerHeight = 392

    if (
      window.innerHeight + window.pageYOffset >=
        document.body.offsetHeight - footerHeight &&
      !isMaxPage &&
      !isLoadingMore
    ) {
      dispatch(updateFilter({ page: filterModel.page + 1 }))
      dispatch(loadMoreJobs({ page: filterModel.page + 1, keyword: keyword }))
    }
  }
  const handleSelectPriority = (value) => {
    setSelectedPriority({
      id: value?.id,
      name: value?.name
    })
    setShowPriorityOpt(false)
  }
  const handleLink = (companyId, departmentId, departmentPositionId) => {
    if (departmentId) {
      push(
        `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
      )
    } else {
      push(`/profile-company/${companyId}/${id}/${departmentPositionId}`)
    }
  }
  const toggleModal = () => {
    setMoreFilter(!moreFilter)
  }
  const handleClosePriorityOpt = () => setShowPriorityOpt(false)
  useOnClickOutside(refPriorityOpt, handleClosePriorityOpt)
  const [selectedCity, setSelectedCity] = useState({
    cityId: null,
    name: ''
  })
  const [keyword, setKeyword] = useState('')

  const handleClickSearch = () => {
    const query = {
      ...filterModel,
      page: 1,
      keyword: keyword,
      cityId: selectedCity?.cityId
    }
    dispatch(updateFilter(query))
    dispatch(getAllJobs(query))
  }
  useInfiniteScroll(handleScroll)

  useEffect(() => {
    const fetchFilterJob = async () => {
      await new Promise(async (resolve) => {
        dispatch(
          getAllJobs({
            ...filterModel,
            page: 1,
            keyword: query?.keyword || '',
            jobs: query?.jobId || ''
          })
        )
        resolve()
      })
    }
    if (query.keyword || query?.jobId) {
      fetchFilterJob()
    } else {
      dispatch(getAllJobs(filterModel))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query.keyword, query?.jobId])

  useEffect(() => {
    return () => {
      dispatch(updateFilter({ page: 1 }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!jobs) {
    return <></>
  }
  return (
    <div className="w-full bg-white xl:bg-inherit">
      <SearchFilter
        handleClickMore={toggleModal}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setKeyword={setKeyword}
        handleClickSearch={handleClickSearch}
        isLoading={isLoading}
      />
      <div className="flex justify-center w-full sm:w-auto">
        <div className="sm:w-[80vw] px-[16px] xl:px-0 w-full">
          <div className="flex  items-center justify-between sm:my-[32px] my-[16px] ">
            <p className=" xl:text-p20-bold text-p16-bold text-black  ">
              <span className="">{totalData}</span>{' '}
              {`${trans.JOBS.jobsCount}
              ${
                filterModel.cityId
                  ? `${trans.JOBS.jobsCountIn} ${
                      cities.find((city) => city.cityId === filterModel?.cityId)
                        ?.name
                    }`
                  : ''
              }`}
            </p>
            <div className=" sm:w-auto w-fit">
              <div className="relative" ref={refPriorityOpt}>
                <button
                  className=" xl:min-w-[200px] min-w-[200px] flex gap-4 justify-between bg-white border-grey-3 border rounded-lg px-6 py-2 items-center"
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

          {jobs.length > 0 ? (
            <div className=" grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gird1480:grid-cols-4 xl:gap-5 gap-2 mb-5">
              {jobs.map((job, index) => {
                const {
                  companyId,
                  company,
                  departmentId,
                  departmentPositionId
                } = job
                const { tag } = company
                return (
                  <HightlightJobCard
                    showHeart={!ownedCompany}
                    key={index}
                    job={job}
                    isAuthentication={!ownedCompany && isAuthentication}
                    handleAction={() =>
                      handleLink(tag, departmentId, departmentPositionId)
                    }
                  />
                )
              })}
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

          {(isLoadingMore || isLoading) && (
            <div className="sm:w-[1140px] flex justify-center items-center">
              <div className="w-full my-5 grid grid-cols-1 xl:grid-cols-3 gap-5 ">
                <SkeletonBox width="w-full" />
                <SkeletonBox width="w-full" />
                <SkeletonBox width="w-full" />
              </div>
            </div>
          )}
        </div>
      </div>

      <Modal
        childStyle="w-screen h-fit sm:w-[810px] mt-4 p-[40px] bg-white rounded-[16px]"
        toggleModal={toggleModal}
        open={moreFilter}
      >
        <FilterModal setMoreFilter={setMoreFilter} />
      </Modal>
    </div>
  )
}

SearchJob.propTypes = {}

export default SearchJob
