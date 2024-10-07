import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { selectJobCities } from 'store/app/jobSlice'
import SearchFilter from '../../Jobs/SearchFilter'
import SearchCVFilter from '../SearchCVFilter'
import CvTutorial from '../CvTutorial'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import Image from 'next/image'
import CvCard from '../CvCard'
import {
  getAllCV,
  getAllRecruitmentCv,
  getAllRecruitmentFilter,
  inviteToCampaign,
  loadMoreCV,
  selectInitCv,
  updateQueryCV,
  updateRecruitmentTestSelected
} from 'store/app/cvSlice'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import CvFilter from '../CvFilter'
import { useForm } from 'react-hook-form'
import Button from 'common/presentation/Button'
import Modal from 'common/presentation/Modal'
import CvInviteTestModal from '../CvInviteTestModal'
import useTrans from 'common/hooks/useTrans'
import useModal from 'common/hooks/useModal'
import { selectUserProfile } from 'store/app/userSlice'
import { toast } from 'react-toastify'

import CreateRecruitmentModal from '../CreateRecruitmentModal'
import CreateCompanyModal from '../CreateCompanyModal'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

const SearchCV = (props) => {
  const {} = props
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans
  const [modal, toggleModal] = useModal()
  const schema = yup.object().shape({})
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema),
    // mode: 'onChange',
    defaultValues: {}
  })

  const { push, query } = useRouter()
  const [showTutorial, setShowTutorial] = useState(true)
  const [showSortCVOpt, setShowSortCVOpt] = useState(false)
  const [selectedSortCV, setSelectedSortCV] = useState({
    id: null,
    name: ''
  })
  const [showCreateRecruitmentModal, toggleShowCreateRecruitmentModal] =
    useModal()
  const [showCreateCompanyModal, toggleShowCreateCompanyModal] = useModal()
  const [portfolioEditing, setPortfolioEditting] = useState(null)
  const toggleTutorial = () => {
    setShowTutorial(!showTutorial)
  }
  const showInviteModal = (e, portfolioId) => {
    e.stopPropagation()
    toggleModal()
    if (portfolioId) {
      setPortfolioEditting(portfolioId)
    }
  }
  const {
    allCV,
    recruitmentFilter,
    timeType,
    recruitments,
    recruitmentTestSelected,
    queryFilter,
    meta
  } = useSelector(selectInitCv)
  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany } = userProfile || {}
  const { companyId } = ownedCompany || {}
  const { currentPage, totalPages, recordsTotal } = meta || {}
  const SORTCV_DATA = [
    { id: 1, name: 'Tất cả', description: '' },
    {
      id: 2,
      name: 'Bài test X-profile',
      description:
        'Ưu tiên hiển thị ứng viên phù hợp nhất với bài test của X-profile'
    },
    {
      id: 3,
      name: 'Hiển thị bài test doanh nghiệp',
      description:
        'Ưu tiên hiển thị ứng viên phù hợp nhất với bài test của doanh nghiệp'
    },
    { id: 0, name: 'Hồ sơ mới', description: '' }
  ]

  const dispatch = useDispatch()

  const handleSelectSortCV = (value) => {
    setSelectedSortCV({
      id: value?.id,
      name: value?.name
    })
    setShowSortCVOpt(false)
  }
  const [selectedCity, setSelectedCity] = useState({
    cityId: null,
    name: ''
  })
  const [keyword, setKeyword] = useState('')

  const handleClickSearch = () => {
    dispatch(
      updateQueryCV({
        ...queryFilter,
        page: 1,
        keyword: keyword,
        cityId: selectedCity?.cityId
      })
    )
  }
  const handleClickLoadMore = () => {
    dispatch(loadMoreCV({ ...queryFilter, page: currentPage + 1 }))
  }
  const refSortCVOpt = useRef(null)
  const handleCloseSortCVOpt = () => setShowSortCVOpt(false)
  useOnClickOutside(refSortCVOpt, handleCloseSortCVOpt)

  const resetFilter = () => {
    reset({ recruitment: '', type: false })
    dispatch(updateQueryCV({}))
  }
  const handleClickInvite = async (e) => {
    if (portfolioEditing && recruitmentTestSelected) {
      const res = await dispatch(
        inviteToCampaign({
          portfolioId: portfolioEditing,
          recruitmentCampaignId: recruitmentTestSelected
        })
      )
      if (!res?.payload?.isSuccess) {
        toast(
          AlertError({
            title: 'Mời không thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      } else {
        toast(
          AlertSuccess({
            title: 'Bạn đã mời thành công'
          }),
          {
            toastId: 'alert-create-success',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )

        dispatch(updateRecruitmentTestSelected(''))
      }
      toggleModal()
    }
  }
  const handleClickCard = (guid) => {
    if (guid) {
      window.open(`/profile/${guid}`)
    } else {
      toast(
        AlertError({
          title: 'Hồ sơ này đang trong trạng thái không tìm việc!'
        }),
        {
          toastId: 'alert-create-success',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }
  const handleClickCreateRecruitment = () => {
    if (companyId) {
      toggleShowCreateRecruitmentModal()
    } else {
      toggleShowCreateCompanyModal()
    }
    document.body.style.overflow = 'hidden'
  }
  useEffect(() => {
    // const { type, recruitment } = getValues()
    if (watch().recruitment || watch().type || selectedSortCV?.id !== null) {
      dispatch(
        updateQueryCV({
          ...queryFilter,
          page: 1,
          recruitmentCampaignId: getValues()?.recruitment,
          workTypes: getValues()?.type,
          sort: selectedSortCV.id !== null ? selectedSortCV.id : 1
        })
      )
    }
  }, [watch().recruitment, watch().type, selectedSortCV?.id])
  useEffect(() => {
    dispatch(getAllCV(queryFilter))
    dispatch(getAllRecruitmentCv({ companyId }))
  }, [dispatch, queryFilter])
  return (
    <div className="w-full bg-white">
      <SearchCVFilter
        title={'Tìm kiếm ứng viên'}
        selectedCity={selectedCity}
        setSelectedCity={setSelectedCity}
        setKeyword={setKeyword}
        handleClickSearch={handleClickSearch}
      />

      <div className="flex justify-center w-full sm:w-auto">
        <div className="sm:w-[80vw] px-[16px] xl:px-0 w-full">
          {showTutorial && (
            <CvTutorial
              closeTutorial={toggleTutorial}
              onClickCreate={handleClickCreateRecruitment}
            />
          )}
          <div className="w-full flex items-start gap-10 mt-8">
            <div className="w-4/6 ">
              <div className="flex items-center justify-between">
                <p className="text-p20-bold">{`${
                  recordsTotal || 0
                } ứng viên`}</p>
                <div className="relative" ref={refSortCVOpt}>
                  <button
                    className=" xl:min-w-[200px] border border-grey-3 rounded-lg w-full flex gap-2 justify-between py-[10px] px-[24px] items-center"
                    onClick={() => setShowSortCVOpt(!showSortCVOpt)}
                  >
                    {selectedSortCV.id === null ? (
                      <Fragment>
                        <p className="sm:text-p18 text-p14  text-neutral ">
                          {SORTCV_DATA[0].name}
                        </p>
                        <XProfileIcon name="arrowDown" />
                      </Fragment>
                    ) : (
                      <Fragment>
                        <p className="sm:text-p18 text-p14  text-neutral ">
                          {selectedSortCV.name}
                        </p>
                        <XProfileIcon name="arrowDown" />
                      </Fragment>
                    )}
                  </button>
                  {showSortCVOpt && (
                    <div className="bg-white max-h-[320px] px-2 py-4 drop-shadow-[0_16px_24px_0_#0000000A] border border-grey-3 z-50 min-w-[360px] sm:w-full overflow-x-hidden absolute sm:top-[64px] top-[50px] right-0 rounded-[12px]">
                      {SORTCV_DATA?.map((sort) => (
                        <div
                          key={sort?.id}
                          className="flex transition-all justify-between rounded-lg items-center px-[24px] hover:bg-light-nude py-[10px]"
                          onClick={() => handleSelectSortCV(sort)}
                        >
                          <div className="w-full">
                            <div className="w-full flex items-center justify-between">
                              <p className="sm:text-p18 text-p14 text-neutral">
                                {sort?.name}
                              </p>
                              {selectedSortCV.id === sort?.id && (
                                <XProfileIcon name="check" />
                              )}
                            </div>
                            {sort?.description?.length > 0 && (
                              <p className="sm:text-p14 text-p12 text-grey-1">
                                {sort?.description}
                              </p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-6">
                {allCV?.map((cv, index) => {
                  const {
                    matchingScore,
                    metadata,
                    avatarUrl,
                    displayName,
                    name,
                    currentJob,
                    fullName,
                    portfolioId,
                    characterId
                  } = cv

                  const { workTypes, guid } = metadata || {}
                  return (
                    <CvCard
                      handleClickCard={handleClickCard}
                      toggleModal={toggleModal}
                      showInviteModal={showInviteModal}
                      isShowMatching={
                        queryFilter?.recruitmentCampaignId ||
                        queryFilter?.workTypes?.length > 0
                      }
                      key={index}
                      avatarUrl={avatarUrl}
                      name={fullName}
                      jobTitle={currentJob}
                      percent={matchingScore}
                      type={workTypes}
                      portfolioId={portfolioId}
                      guid={guid}
                      characterId={characterId}
                    />
                  )
                })}
              </div>
              {currentPage < totalPages && (
                <div className="w-full flex justify-center mt-8">
                  <Button
                    title="Xem thêm ứng viên"
                    rounded="rounded-lg"
                    background={'bg-grey-4'}
                    color={'text-neutral'}
                    padding="py-3 px-8"
                    height="h-auto"
                    width="w-full"
                    margin=""
                    onClick={() => handleClickLoadMore()}
                  />
                </div>
              )}
            </div>
            <div className="w-2/6 sticky -top-[72px] pt-[74px]">
              <CvFilter
                recruitmentFilter={recruitmentFilter}
                timeType={timeType}
                register={register}
                // onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                resetFilter={resetFilter}
                handleClickCreateRecruitment={handleClickCreateRecruitment}
              />
            </div>
          </div>
        </div>
      </div>
      <Modal
        open={modal}
        toggleModal={toggleModal}
        childStyle="w-screen h-fit sm:w-[1024px] max-h-[780px]  mt-4 shadow-md p-[40px] relative bg-white rounded-lg"
        title="Các vị trí đang tuyển dụng"
        styleTitle="text-p28-bold text-neutral"
      >
        <CvInviteTestModal
          trans={PROFILE_COMPANY}
          toggleModal={toggleModal}
          recruitmentCampaign={recruitments}
          recruitmentSelected={recruitmentTestSelected}
          handleClickInvite={handleClickInvite}
          // recruitmentSelectedDefault={recruitmentSelectedDefault}
        />
      </Modal>
      <Modal
        open={showCreateRecruitmentModal}
        toggleModal={toggleShowCreateRecruitmentModal}
        useClickOutside={false}
        childStyle="w-screen h-fit sm:w-[1024px] max-h-[810px]  mt-4 shadow-md p-10 relative bg-white rounded-2xl"
        // title="Các vị trí đang tuyển dụng"
        hiddenCancel={true}
        styleTitle="text-p28-bold text-neutral"
      >
        <CreateRecruitmentModal
          toggleShowCreateRecruitmentModal={toggleShowCreateRecruitmentModal}
        />
      </Modal>

      <Modal
        open={showCreateCompanyModal}
        toggleModal={toggleShowCreateCompanyModal}
        useClickOutside={false}
        childStyle="w-screen h-fit sm:w-[480px] max-h-[365px]  shadow-md p-8 relative bg-white rounded-2xl"
        // title="Các vị trí đang tuyển dụng"
        hiddenCancel={true}
        styleTitle="text-p28-bold text-neutral"
      >
        <CreateCompanyModal
          toggleShowCreateCompanyModal={toggleShowCreateCompanyModal}
        />
      </Modal>
    </div>
  )
}

SearchCV.propTypes = {}

export default SearchCV
