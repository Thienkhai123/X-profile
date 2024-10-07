import React, { Fragment, useEffect, useRef, useState } from 'react'
import CompanyChart from '../CompanyChart'
import 'react-day-picker/dist/style.css'
import StepAnalytic from 'common/presentation/StepAnalytic'
import DashBoardStepAnalytic from 'common/presentation/DashBoardStepAnalytic'
import CircularProgressScore from 'common/presentation/Pages/CircularProgressScore'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import InterviewDashboard from '../InterviewDashboard'
import { selectUserProfile } from 'store/app/userSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  getAllCompanyDashboard,
  getAllDepartmentPositionsFilter,
  getPastCompanyDashboard,
  getTotalDashboard,
  selectInitDashboard,
  updateQueryDashboard
} from 'store/app/dashboardSlice'
import moment from 'moment'
import {
  getAllDepartmentsEdit,
  selectAllDepartmentsEdit
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { DayPicker } from 'react-day-picker'
import { vi } from 'date-fns/locale'
const SETTING_TAB = [
  {
    id: 1,
    // logoSVG: 'caseFill',
    // icon: '/images/bearBoss1.png',
    title: 'Tổng quan',
    href: '#'
  },
  {
    id: 2,
    // logoSVG: 'buildingsFill',
    // icon: '/images/bearBoss1.png',
    title: 'Thị trường nhân sự',
    href: '#'
  }
]
const SORT_RECRUITMENT_DATA = [
  {
    id: 0,
    value: 'Chiến dịch tuyển dụng'
  },
  {
    id: 1,
    value: 'Chiến dịch tuyển dụng 1'
  },
  {
    id: 2,
    value: 'Chiến dịch tuyển dụng 2'
  }
]
const SORT_DEPARTMENT_DATA = [
  {
    id: 0,
    value: 'Tất cả phòng ban'
  },
  {
    id: 1,
    value: 'Phòng ban 1'
  },
  {
    id: 2,
    value: 'Phòng ban 2'
  }
]
const CompanyBoard = (props) => {
  const {} = props
  const userProfile = useSelector(selectUserProfile)
  const departmentList = useSelector(selectAllDepartmentsEdit)
  const {
    dashboardData,
    queryFilter,
    timeType,
    departmentPositionsFilter,
    totalGeneral,
    dashboardPastData
  } = useSelector(selectInitDashboard) || {}
  const { applicants, totalPrice } = dashboardData || {}
  const { applicants: applicantsPast, totalPrice: totalPricePast } =
    dashboardPastData || {}
  const { ownedCompany } = userProfile || {}
  const { companyId, tag, name } = ownedCompany || {}
  const dispatch = useDispatch()
  const [choosedStepId, setChooseStepId] = useState(1)
  const handleChoose = (id) => {
    setChooseStepId(id)
  }

  const [showSortDateOpt, setShowSortDateOpt] = useState(false)
  const today = new Date()
  const [selectedDay, setSelectedDay] = useState(today)
  const [range, setRange] = useState({ from: undefined, to: undefined })

  const [sortData, setSortData] = useState([
    {
      id: 1,
      minValue: moment(new Date()).format('MM/DD/YYYY'),
      maxValue: moment(new Date()).format('MM/DD/YYYY'),
      pastMinValue: moment().subtract(1, 'days').format('MM/DD/YYYY'),
      pastMaxValue: moment().subtract(1, 'days').format('MM/DD/YYYY'),
      textDisplay: moment(new Date()).format('DD/MM/YYYY'),
      dateTypeDisplay: 'Hôm nay',
      dataType: 'day'
    },
    {
      id: 2,
      dateTypeDisplay: 'Tuần này',

      dataType: 'week',
      textDisplay: `${moment()
        .startOf('week')
        .format('DD/MM/YYYY')} - ${moment()
        .endOf('week')
        .format('DD/MM/YYYY')}`,
      minValue: moment().startOf('week').format('MM/DD/YYYY'),
      maxValue: moment().endOf('week').format('MM/DD/YYYY'),
      pastMinValue: moment()
        .subtract(1, 'week')
        .startOf('week')
        .format('MM/DD/YYYY'),
      pastMaxValue: moment()
        .subtract(1, 'week')
        .endOf('week')
        .format('MM/DD/YYYY')
    },
    {
      id: 3,
      dateTypeDisplay: 'Tháng này',

      dataType: 'month',
      textDisplay: `${moment()
        .startOf('month')
        .format('DD/MM/YYYY')} - ${moment()
        .endOf('month')
        .format('DD/MM/YYYY')}`,
      minValue: moment().startOf('month').format('MM/DD/YYYY'),
      maxValue: moment().endOf('month').format('MM/DD/YYYY'),
      pastMinValue: moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('MM/DD/YYYY'),
      pastMaxValue: moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('MM/DD/YYYY')
    },
    {
      id: 4,
      dateTypeDisplay: '3 tháng qua',
      dataType: 'threeMonth',
      textDisplay: `${moment()
        .subtract(2, 'month')
        .startOf('month')
        .format('DD/MM/YYYY')} - ${moment()
        .endOf('month')
        .format('DD/MM/YYYY')}`,
      minValue: moment()
        .subtract(2, 'month')
        .startOf('month')
        .format('MM/DD/YYYY'),
      maxValue: moment().endOf('month').format('MM/DD/YYYY'),
      pastMinValue: moment()
        .subtract(1, 'month')
        .startOf('month')
        .format('MM/DD/YYYY'),
      pastMaxValue: moment()
        .subtract(1, 'month')
        .endOf('month')
        .format('MM/DD/YYYY')
    },
    {
      id: 5,
      dateTypeDisplay: 'Tất cả',
      dataType: 'all',
      textDisplay: ``,
      minValue: moment(new Date(2020, 0, 0)).format('MM/DD/YYYY'),
      maxValue: moment().endOf('month').format('MM/DD/YYYY'),
      pastMinValue: '',
      pastMaxValue: ''
    }
  ])
  const [selectedSortDate, setSelectedSortDate] = useState(sortData[0])
  const [showFilter, setShowFilter] = useState(false)
  const [showCustomFilter, setShowCustomFilter] = useState(false)
  const refSortDateOpt = useRef(null)
  const [selectedSortRecruitment, setSelectedSortRecruitment] = useState(
    SORT_RECRUITMENT_DATA[0]
  )
  const [selectedSortDepartment, setSelectedSortDepartment] = useState(
    SORT_DEPARTMENT_DATA[0]
  )
  const [selectedSortJobType, setSelectedSortJobType] = useState(timeType[0])

  const handleSelectSortRecruitment = (value) => {
    setSelectedSortRecruitment({
      id: value?.departmentPositionId,
      value: value?.name
    })
    dispatch(
      updateQueryDashboard({
        ...queryFilter,
        departmentPositionId: value?.departmentPositionId
      })
    )
  }
  const handleSelectSortDepartment = (value) => {
    setSelectedSortDepartment({
      id: value?.departmentId,
      value: value?.name
    })
    dispatch(
      updateQueryDashboard({
        ...queryFilter,
        departmentId: value?.departmentId
      })
    )
  }
  const handleSelectSortJobType = (value) => {
    setSelectedSortJobType({
      type: value?.type,
      typeDisplay: value?.typeDisplay
    })
    dispatch(
      updateQueryDashboard({
        ...queryFilter,
        recruitmentCampaignType: value?.type
      })
    )
  }

  const handleCloseSortDateOpt = () => setShowSortDateOpt(false)
  useOnClickOutside(refSortDateOpt, handleCloseSortDateOpt)
  const handleSelectSortDate = (value) => {
    setRange({ from: undefined, to: undefined })
    setSelectedSortDate({
      id: value.id,
      dateTypeDisplay: value.dateTypeDisplay,
      dataType: value.dataType,
      textDisplay: value.textDisplay,
      minValue: value.minValue,
      maxValue: value.maxValue,
      pastMaxValue: value.pastMaxValue,
      pastMinValue: value.pastMinValue
    })
    dispatch(
      updateQueryDashboard({
        ...queryFilter,
        startAt: value.minValue,
        endAt: value.maxValue
      })
    )
    setShowSortDateOpt(false)
    setShowCustomFilter(false)
  }
  const handleClearFilter = () => {
    dispatch(
      updateQueryDashboard({
        startAt: selectedSortDate?.minValue,
        endAt: selectedSortDate?.maxValue
      })
    )
    setSelectedSortDepartment(SORT_DEPARTMENT_DATA[0])
    setSelectedSortRecruitment(SORT_RECRUITMENT_DATA[0])
    setSelectedSortJobType(timeType[0])
  }

  useEffect(() => {
    if (range !== undefined) {
      if (range.from !== undefined && range.to !== undefined) {
        setSelectedSortDate({
          id: 6,
          dateTypeDisplay: 'Tuỳ chọn',
          dataType: 'custom',
          textDisplay: `${moment(new Date(range.from)).format('DD/MM/YYYY')} -
            ${moment(new Date(range.to)).format('DD/MM/YYYY')}
          `,
          minValue: moment(new Date(range.from)).format('MM/DD/YYYY'),
          maxValue: moment(new Date(range.to)).format('MM/DD/YYYY'),
          pastMaxValue: '',
          pastMinValue: ''
        })
        dispatch(
          updateQueryDashboard({
            ...queryFilter,
            startAt: moment(new Date(range.from)).format('MM/DD/YYYY'),
            endAt: moment(new Date(range.to)).format('MM/DD/YYYY')
          })
        )
        setShowSortDateOpt(false)
      }
    }
  }, [range])
  useEffect(() => {
    if (companyId) {
      dispatch(getAllDepartmentsEdit({ companyId }))
      dispatch(getAllDepartmentPositionsFilter({ tag }))
    }
    dispatch(getTotalDashboard())
  }, [companyId, tag])
  useEffect(() => {
    if (companyId) {
      dispatch(getAllCompanyDashboard({ ...queryFilter, companyId: companyId }))
      dispatch(
        getPastCompanyDashboard({
          ...queryFilter,
          companyId: companyId,
          startAt: selectedSortDate?.pastMinValue,
          endAt: selectedSortDate?.pastMaxValue
        })
      )
    } else {
      setChooseStepId(2)
    }
  }, [companyId, queryFilter])

  return (
    <div className="bg-blue-light pt-[64px] pb-[88px] xl:px-0 px-[12px]">
      <div className="xl:w-[1140px] w-full mx-auto">
        {companyId && (
          <div>
            <p
              style={{ wordBreak: 'break-word' }}
              className="xl:text-h2  text-white "
            >
              {`Xin chào,`}{' '}
              <span className="text-button ">{name || 'Gấu Xanh'}</span>
            </p>
          </div>
        )}
        <div
          className={`flex xl:flex-row flex-col ${
            companyId ? 'items-center' : 'items-start'
          } justify-between my-4`}
        >
          {companyId ? (
            <DashBoardStepAnalytic
              SETTING_STEP={SETTING_TAB}
              handleChoose={handleChoose}
              choosedStepId={choosedStepId}
              styleEleText="sm:text-p18-bold text-p16"
              showIcon={true}
            />
          ) : (
            <div>
              <p className="text-h2 text-white">Thị trường nhân sự</p>
            </div>
          )}
          {choosedStepId === 1 && selectedSortDate && (
            <div className="flex items-center gap-4">
              {(queryFilter?.departmentPositionId ||
                queryFilter?.departmentId ||
                queryFilter?.recruitmentCampaignType) && (
                <div onClick={() => handleClearFilter()} className="w-fit">
                  <p className="text-p16 cursor-pointer text-white">
                    Xoá bộ lọc
                  </p>
                </div>
              )}
              <div
                onClick={() => setShowFilter(!showFilter)}
                className=" w-14 h-14 rounded-2xl bg-dark-blue cursor-pointer flex items-center justify-center"
              >
                <div className="w-fit relative">
                  <XProfileIcon name="filterFill" />
                  {(queryFilter?.departmentPositionId ||
                    queryFilter?.departmentId ||
                    queryFilter?.recruitmentCampaignType) && (
                    <div className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#FC816E]"></div>
                  )}
                </div>
              </div>
              <div className="relative" ref={refSortDateOpt}>
                <button
                  className=" xl:min-w-[400px] bg-dark-blue rounded-2xl w-full flex gap-2 justify-between py-[13px] px-6 items-center"
                  onClick={() => setShowSortDateOpt(!showSortDateOpt)}
                >
                  {/* {selectedSortDate.id === null ? (
                  <Fragment>
                    <p className="sm:text-p18 text-p14  text-white ">
                      {SORT_DATA[0].name}
                    </p>
                    <XProfileIcon name="arrowDown" />
                  </Fragment>
                ) : ( */}
                  <Fragment>
                    <p className="sm:text-p18 text-p14  text-white ">
                      <span className="text-p18-bold">
                        {selectedSortDate?.dateTypeDisplay}
                        {selectedSortDate?.textDisplay !== '' && ':'}{' '}
                      </span>
                      {selectedSortDate?.textDisplay}
                    </p>
                    <XProfileIcon name="altArrowDown" />
                  </Fragment>
                  {/* )} */}
                </button>
                {showSortDateOpt && (
                  <div className="flex absolute sm:top-[64px] top-[50px] right-0 drop-shadow-[0_16px_24px_0_#0000000A] ">
                    <div
                      className={`bg-[#162A66] border border-[#2E50B0]  px-2 py-4  custom-scrollbar1 z-50 min-w-[360px] max-w-[400px] sm:w-full overflow-x-hidden ${
                        showCustomFilter
                          ? 'rounded-l-2xl border-r-[#0B2156]'
                          : 'rounded-2xl'
                      } `}
                    >
                      {sortData?.map((sort) => (
                        <Fragment key={sort?.id}>
                          <div
                            className="flex cursor-pointer transition-all justify-between rounded-2xl items-center p-4 hover:bg-[#0B2156] "
                            onClick={() => handleSelectSortDate(sort)}
                          >
                            <div className="w-full">
                              <div className="w-full flex items-center justify-between">
                                <p className="sm:text-p18 text-p14 text-white">
                                  {/* <span className="text-p18-bold">
                                  {sort.dateTypeDisplay}:{' '}
                                </span> */}
                                  {sort?.dateTypeDisplay}
                                </p>
                                {/* {selectedSortDate.id === sort?.id && (
                            <XProfileIcon name="check" />
                          )} */}
                              </div>
                            </div>
                          </div>
                          <div className="px-5 last:hidden">
                            <div className="w-full h-0.5 bg-[#0B2156] my-2 "></div>
                          </div>
                        </Fragment>
                      ))}
                      <div
                        className={`flex cursor-pointer transition-all justify-between rounded-2xl items-center p-4 hover:bg-[#0B2156] ${
                          showCustomFilter ? 'bg-[#0B2156]' : ''
                        }`}
                        onClick={() => setShowCustomFilter(true)}
                      >
                        <div className="w-full">
                          <div className="w-full flex items-center justify-between">
                            <p className="sm:text-p18 text-p14 text-white">
                              Tuỳ chọn
                            </p>
                            <div className="rotate-180">
                              <XProfileIcon name="arrowLeft" fill="#fff" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div
                      className={`bg-[#162A66]  border-[#2E50B0] ${
                        showCustomFilter
                          ? 'px-2 py-4 min-w-[360px] rounded-r-2xl border-l-[#0B2156] border'
                          : 'px-0 py-0 min-w-0'
                      } transition-all duration-300  custom-scrollbar1 z-50  max-w-[400px] sm:w-full overflow-x-hidden  `}
                    >
                      <DayPicker
                        id="datePicker"
                        locale={vi}
                        mode="range"
                        className={`w-0 p-0 ${
                          showCustomFilter ? 'block' : 'hidden'
                        }`}
                        required
                        selected={range}
                        onSelect={setRange}
                        modifiersStyles={{
                          selected: {
                            backgroundColor: '#ECEEF0',
                            color: '#294F9B'
                          }
                        }}
                        styles={{
                          table: { color: 'white', fontSize: '16px' },
                          caption: { color: 'white' }
                        }}
                        // defaultMonth={pastMonth}
                        // selected={range}
                        // onSelect={setRange}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          {choosedStepId === 2 && (
            <div className="flex h-14 bg-dark-blue rounded-2xl py-2 px-6 gap-4 items-center">
              <div className="w-6 h-6 ">
                <XProfileIcon name="smileCircle" width="24" height="24" />
              </div>

              <p className="text-p16  text-white">
                Số lượng ứng viên hiện có trên nền tảng:{' '}
              </p>
              <p className="text-h4 text-white">{totalGeneral}</p>
            </div>
          )}
        </div>
        {choosedStepId === 1 && (
          <InterviewDashboard
            departmentPositionsFilter={departmentPositionsFilter}
            queryFilter={queryFilter}
            timeType={timeType}
            departmentList={departmentList}
            showFilter={showFilter}
            applicants={applicants}
            applicantsPast={applicantsPast}
            totalPrice={totalPrice}
            totalPricePast={totalPricePast}
            rateDateType={selectedSortDate?.dataType}
            selectedSortRecruitment={selectedSortRecruitment}
            selectedSortDepartment={selectedSortDepartment}
            selectedSortJobType={selectedSortJobType}
            handleSelectSortRecruitment={handleSelectSortRecruitment}
            handleSelectSortDepartment={handleSelectSortDepartment}
            handleSelectSortJobType={handleSelectSortJobType}
          />
        )}
        {choosedStepId === 2 && <CompanyChart />}
      </div>
    </div>
  )
}

export default CompanyBoard
