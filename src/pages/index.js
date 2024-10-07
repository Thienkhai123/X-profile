const HOME = require('../../public/asset/home.json')
import Head from 'next/head'
import { Fragment, useEffect, useState } from 'react'
import StepAnalytic from 'common/presentation/StepAnalytic'
import FieldCard from 'common/presentation/FieldCard'
import { SETTING_STEPPAGE } from 'common/presentation/SideMenu/contans'
import SideMenu from 'common/presentation/SideMenu'
import JoumeyXprofile from 'common/presentation/Pages/home/JourneyXpofile'
import { useDispatch, useSelector } from 'react-redux'
import {
  getJobByJobCategory,
  getJobByJobCategoryByTag,
  getJobCategories,
  getJobDetail,
  selectJobCategories,
  selectJobDetail,
  selectJobDetailById,
  selectJobs
} from 'store/app/jobSlice'
import { QuizCard, Slider } from 'common/presentation'
import { SwiperSlide } from 'swiper/react'
import { getHomeBlockType, selectHomeBlockType } from 'store/app/surveySlice'
import { authService } from 'store/helper/authService'
import {
  POSITION_BLOCK,
  ROLE_STORAGE,
  SURVEY_STORAGE
} from 'common/config/app.constants'
import useScrollPosition from 'common/hooks/useScrollPosition'
import {
  chooseIdOnScrollPosition,
  scrollToId
} from 'store/helper/functionHelper'
import { QUIZS } from 'common/presentation/Pages/Demo/constants'
import { selectUserProfile } from 'store/app/userSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import {
  getHomeBlocks,
  getSkillType,
  selectAllIds,
  selectHomeBlocks,
  selectHomeQueries,
  selectInitStatics,
  selectSkillType,
  updateHomeQueries,
  updateJobCategoryId,
  updatePositionBlocks,
  updateRoleId,
  updateSelectedJobId,
  updateSideMenuId,
  updateSkillEnumType,
  updateStickyBar
} from 'store/app/homeSlice'
import useDebounce from 'common/hooks/useDebounce'
import dynamic from 'next/dynamic'
import CompanyPage from 'common/container/Company'
import CustomMap from 'common/presentation/CustomMap'
import Image from 'next/image'
import { useRouter } from 'next/router'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import FloatItCareers from 'common/presentation/FloatItCareers'

const DemandSkills = dynamic(() =>
  import('common/presentation/Pages/home/DemandSkills')
)
const CompanyTop = dynamic(() =>
  import('common/presentation/Pages/home/CompantTop')
)
const WorkTop = dynamic(() => import('common/presentation/Pages/home/WorkTop'))
const Introduce = dynamic(() =>
  import('common/presentation/Pages/home/Introduce')
)
const CapacityProfile = dynamic(() =>
  import('common/presentation/Pages/home/CapacityProfile')
)

const renderUIBaseOnJobId = (jobs = [], jobSelectedId = 0, key = null) => {
  const findElement = jobs.find((job) => job?.id === jobSelectedId)
  if (findElement) {
    return findElement[key]
  } else {
    return jobs?.length > 0 ? jobs[0][key] : ''
  }
}

const renderPositionBlock = (
  blockTypes,
  position,
  ind,
  blocks,
  profile,
  skillType,
  skillEnumType,
  setSkillEnumType,
  handleUpdateQueries,
  roleId,
  selectedJobId,
  jobs
) => {
  const { companies, products, recruitments } = blocks
  const { avatarUrl, name, setting } = profile || {}
  const { characterName } = setting || {}
  const handleRedirectWorkTop = () => {
    window.location.replace(`/jobs?jobId=${selectedJobId}&tabId=1`)
  }
  const handleRedirectCompanyTop = () => {
    window.location.replace(`/jobs?jobId=${selectedJobId}&tabId=2`)
  }

  switch (position) {
    case '0':
      return (
        <DemandSkills
          key={`block-${position}`}
          title={blockTypes[position]}
          id={`block-${ind}`}
          courses={products}
          skillTypes={skillType}
          skillEnumType={skillEnumType}
          setSkillEnumType={(value) => {
            setSkillEnumType(value)
            handleUpdateQueries({
              skillEnumType: value
            })
          }}
        />
      )
    case '1':
      return (
        <CompanyTop
          key={`block-${position}`}
          title={blockTypes[position]}
          id={`block-${ind}`}
          handleRedirectCompanyTop={handleRedirectCompanyTop}
          orgs={companies}
          companyName={jobs?.find((job) => job.id === selectedJobId)?.title}
          roleId={parseInt(roleId)}
        />
      )
    case '2':
      return (
        <WorkTop
          key={`block-${position}`}
          title={blockTypes[position]}
          handleRedirectWorkTop={handleRedirectWorkTop}
          id={`block-${ind}`}
          jobs={recruitments}
          isAuthentication={profile !== null}
          roleId={parseInt(roleId)}
          jobName={jobs?.find((job) => job.id === selectedJobId)?.title}
        />
      )
    case '3':
      return (
        <CapacityProfile
          key={`block-${position}`}
          title={blockTypes[position]}
          id={`block-${ind}`}
          avatarUrl={avatarUrl}
          name={name}
          characterName={characterName}
          roleId={parseInt(roleId)}
          meta={jobs.filter((job) => job?.id === selectedJobId)[0]?.meta}
        />
      )
    default:
      return <Fragment></Fragment>
  }
}

export default function Home() {
  const { XProfile, titleField, titleDiscovery, titleSelfTest } = HOME
  const dispatch = useDispatch()
  const { chooseSideMenuId, selectedJobId, roleId } = useSelector(selectAllIds)
  const { positionBlocks, skillEnumType, showStickyBar } =
    useSelector(selectInitStatics)
  const homeBlocks = useSelector(selectHomeBlocks)
  const userProfile = useSelector(selectUserProfile)
  const skillType = useSelector(selectSkillType)
  const queries = useSelector(selectHomeQueries)
  const jobCategories = useSelector(selectJobCategories)
  const { workWithJobs } = useSelector(selectJobDetailById) || {}
  const scrollPosition = useScrollPosition()
  // const debouncedScroll = useDebounce(scrollPosition, 20)
  const [floatingCareers, setFloatingCareers] = useState(false)
  const [tagSelected, setTagSelected] = useState('it')
  console.log(tagSelected)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.JOB.GETJOBBYJOBCATEGORY) ||
      selectLoading(state, APP_TYPES.HOME.GETHOMEBLOCKS) ||
      selectLoading(state, APP_TYPES.SURVEY.GETHOMEBLOCKTYPE) ||
      selectLoading(state, APP_TYPES.HOME.GETSKILLTYPE) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBCATEGORY) ||
      selectLoading(state, APP_TYPES.USER.GETPROFILE)
  )
  const handleStep = async (ID) => {
    scrollToId(`block-${ID}`)
  }

  const setSkillEnumType = (value) => {
    dispatch(updateSkillEnumType(value))
  }

  const handleUpdateQueries = (query) => {
    dispatch(updateHomeQueries(query))
    dispatch(getJobDetail(query))
  }

  const setChooseSideMenuId = (id) => {
    dispatch(updateSideMenuId(id))
  }

  const handleUpdateStickyBar = (val) => {
    dispatch(updateStickyBar(val))
  }
  const handleCloseFloatingCareers = () => {
    setFloatingCareers(false)
  }
  const homeBlockTypes = useSelector(selectHomeBlockType)
  const { jobDetail } = useSelector(selectJobDetail)
  const jobs = useSelector(selectJobs)
  useEffect(() => {
    const timer = setTimeout(() => {
      setFloatingCareers(true)
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  useEffect(() => {
    const fetchJob = async (surveyStore) => {
      const fetchJobByJobCategory = await dispatch(
        getJobByJobCategoryByTag({
          // id: userProfile?.setting?.jobId
          tag: tagSelected
        })
      )
      const jobResponse = unwrapResult(fetchJobByJobCategory)

      dispatch(
        updateSelectedJobId(
          JSON.parse(surveyStore)?.jobId || jobResponse?.data[0]?.jobId
        )
      )
      // dispatch(
      //   getHomeBlocks({
      //     jobId: JSON.parse(surveyStore)?.jobId || jobResponse?.data[0]?.jobId,
      //     skillEnumType: '0'
      //   })
      // )
      handleUpdateQueries({
        jobId: JSON.parse(surveyStore)?.jobId || jobResponse?.data[0]?.jobId,
        skillEnumType: '0'
      })
    }
    const fetchProfile = async () => {
      const fetchJobCategory = await dispatch(
        getJobByJobCategoryByTag({
          // id: userProfile?.setting?.jobId
          tag: tagSelected
        })
      )
      const jobResponse = unwrapResult(fetchJobCategory)
      if (userProfile) {
        let tempPosition = userProfile?.setting?.homeBlockPosistion || '0,1,2,3'
        tempPosition = tempPosition
          .split(',')
          .filter((el) => el !== '0')
          .join(',')
        dispatch(updatePositionBlocks(tempPosition))
        if (jobResponse?.data) {
          const findElement = jobResponse?.data?.find(
            (job) => job?.jobId === userProfile?.setting?.jobId
          )
          dispatch(
            updateSelectedJobId(
              findElement
                ? userProfile?.setting?.jobId
                : jobResponse?.data?.length > 0
                ? jobResponse?.data[0]?.jobId
                : 0
            )
          )
        }
        dispatch(updateRoleId(userProfile?.setting?.characterId))
        // dispatch(
        //   getHomeBlocks({
        //     jobId:
        //       userProfile?.setting?.jobId ||
        //       (jobResponse?.data?.length > 0 ? jobResponse?.data[0]?.jobId : 0),
        //     skillEnumType: queries?.skillEnumType || '0'
        //   })
        // )
        handleUpdateQueries({
          jobId:
            userProfile?.setting?.jobId ||
            (jobResponse?.data?.length > 0 ? jobResponse?.data[0]?.jobId : 0),
          skillEnumType: queries?.skillEnumType || '0'
        })
        // dispatch(
        //   getJobDetail({ jobId: queries?.jobId || userProfile?.setting?.jobId })
        // )
      }
    }
    dispatch(getHomeBlockType())
    dispatch(getSkillType())
    dispatch(getJobCategories())

    if (userProfile) {
      fetchProfile()
    } else {
      const surveyStore = localStorage.getItem(SURVEY_STORAGE)
      let positionStore = localStorage.getItem(POSITION_BLOCK)

      const role = localStorage.getItem(ROLE_STORAGE)

      if (surveyStore) {
        fetchJob(surveyStore)
      }
      if (positionStore) {
        positionStore = positionStore
          .split(',')
          .filter((el) => el !== '0')
          .join(',')
        dispatch(updatePositionBlocks(positionStore))
      }
      if (role) {
        dispatch(updateRoleId(role))
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tagSelected])

  useEffect(() => {
    if (queries) {
      if (authService.getAccessToken()) {
        dispatch(
          getHomeBlocks({
            jobId: queries?.jobId || userProfile?.setting?.jobId,
            skillEnumType: queries?.skillEnumType || '0'
          })
        )
      } else {
        const surveyStore = localStorage.getItem(SURVEY_STORAGE)
        if (surveyStore) {
          dispatch(
            getHomeBlocks({
              jobId: queries?.jobId || surveyStore?.jobId,
              skillEnumType: queries?.skillEnumType || '0'
            })
          )
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  useEffect(() => {
    chooseIdOnScrollPosition(
      scrollPosition,
      setChooseSideMenuId,
      handleUpdateStickyBar,
      showStickyBar,
      chooseSideMenuId
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrollPosition])

  const router = useRouter()
  const { push } = router

  const handleDiscover = () => {
    push('/development')
  }

  if (roleId === null) {
    return <div className="flex-1"></div>
  }

  if (parseInt(roleId) === 2) {
    return <CompanyPage />
  }

  return (
    <>
      {loading && <LoadingRole />}
      <div>
        <Head>
          <title>X-Profile - Giải pháp xây dựng thương hiệu tuyển dụng</title>
        </Head>

        {floatingCareers && (
          <div className="hidden xl:block">
            <FloatItCareers
              handleCloseFloatingCareers={handleCloseFloatingCareers}
            />
          </div>
        )}
        <div className="">
          <JoumeyXprofile
            title={XProfile.title}
            description={XProfile.description}
            button={XProfile.button}
            link={XProfile.link}
            roleId={parseInt(roleId)}
          />
        </div>
        {roleId !== null && parseInt(roleId) === 0 && (
          <div className="max-w-[500px] md:max-w-[800px] xl:max-w-[1140px] mx-auto xl:my-[88px] my-10">
            <p className="xl:text-h2 text-p20-bold text-center text-neutral mb-[40px]">
              {titleSelfTest}
            </p>
            <div className="hidden xl:block">
              <Slider
                breakpoints={{
                  330: {
                    slidesPerView: 2,
                    slidesPerGroup: 2
                  },
                  1100: {
                    slidesPerView: 3,
                    slidesPerGroup: 3
                  },
                  1280: {
                    slidesPerView: 4,
                    slidesPerGroup: 4
                  }
                }}
              >
                {QUIZS.map((quiz, ind) => (
                  <SwiperSlide key={ind}>
                    <QuizCard quiz={quiz} handleDiscover={handleDiscover} />
                  </SwiperSlide>
                ))}
              </Slider>
            </div>
            <div className="xl:hidden grid grid-cols-2 gap-4 px-4">
              {QUIZS.map((quiz, ind) => (
                <SwiperSlide key={ind}>
                  <QuizCard quiz={quiz} handleDiscover={handleDiscover} />
                </SwiperSlide>
              ))}
            </div>
          </div>
        )}
        <div
          // xl:top-[59px]
          className={`sticky top-0 z-30 ${
            showStickyBar
              ? 'h-full transition duaration-300'
              : 'h-full opacity-0 transition duration-300'
          }`}
        >
          <div className="max-h-[64px]">
            <StepAnalytic
              SETTING_STEP={jobs}
              handleChoose={(value) => {
                dispatch(updateSelectedJobId(value))
                handleUpdateQueries({ jobId: value })
              }}
              choosedStepId={selectedJobId}
              slideId={jobs.findIndex((job) => job?.id === selectedJobId)}
            />
          </div>
        </div>
        <div id="blockDiscover">
          <div
            className={`${
              roleId !== null && parseInt(roleId) === 0
                ? 'bg-background-home-overview'
                : 'bg-[#f5f5f2]'
            } bg-no-repeat bg-cover bg-top sm:pt-[64px] pt-0 pb-[28px]`}
          >
            <p className=" text-xl font-bold lg:text-h2 text-neutral text-center mb-[38px] sm:block hidden">
              {titleDiscovery}
            </p>
            <div className="mx-auto w-fit h-[600px] xl:h-auto sm:block hidden">
              {roleId !== null && (
                <CustomMap
                  roleId={roleId?.toString()}
                  jobs={jobCategories}
                  tagSelected={tagSelected}
                  setTagSelected={setTagSelected}
                />
              )}
            </div>
            {jobDetail?.length > 0 && (
              <div>
                <p className="mt-[20px] font-bold xl:text-h3 text-p20-bold text-center">
                  {titleField}
                </p>
              </div>
            )}
            {jobDetail?.length > 0 && selectedJobId && (
              <div
                key={showStickyBar}
                className="mt-[36px] max-w-[100vw] xl:max-w-[960px] mx-auto"
              >
                <Slider
                  key={jobDetail?.length}
                  breakpoints={{
                    330: {
                      centeredSlides: true,
                      slidesPerView: 2.3,
                      slidesPerGroup: 1,
                      slideToClickedSlide: true
                    },
                    1100: {
                      slidesPerView: 3,
                      slidesPerGroup: 1
                    },
                    1280: {
                      slidesPerView: 5,
                      slidesPerGroup: 1
                    }
                  }}
                  hasArrow={jobDetail.length > 5}
                  initialIndex={jobs.findIndex(
                    (job) => job?.id === selectedJobId
                  )}
                >
                  {jobDetail.map((job) => (
                    <SwiperSlide key={job?.jobId}>
                      <FieldCard
                        id={job?.jobId}
                        title={job?.name}
                        roleId={parseInt(roleId)}
                        meta={job?.meta}
                        logo={job?.avatarUrl}
                        selected={selectedJobId === job?.jobId}
                        onSelected={(value) => {
                          dispatch(updateSelectedJobId(value))
                          handleUpdateQueries({ jobId: value })
                        }}
                      />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
            )}
          </div>
        </div>
        <div id="block-4">
          {jobDetail?.length > 0 && (
            <Introduce
              title={renderUIBaseOnJobId(jobs, selectedJobId, 'title')}
              description={renderUIBaseOnJobId(
                jobs,
                selectedJobId,
                'description'
              )}
              meta={renderUIBaseOnJobId(jobs, selectedJobId, 'meta')}
              backgroundUrl={renderUIBaseOnJobId(
                jobs,
                selectedJobId,
                'backgroundUrl'
              )}
              selectedJobId={renderUIBaseOnJobId(jobs, selectedJobId, 'id')}
              roleId={parseInt(roleId)}
              workWithJobs={workWithJobs}
            />
          )}
        </div>
        <div className="flex flex-col w-auto justify-center items-center">
          {positionBlocks
            ?.split(',')
            .map((p, ind) =>
              renderPositionBlock(
                homeBlockTypes,
                p,
                ind,
                homeBlocks,
                userProfile,
                skillType,
                skillEnumType,
                setSkillEnumType,
                handleUpdateQueries,
                roleId,
                selectedJobId,
                jobs
              )
            )}
        </div>

        {roleId !== null && parseInt(roleId) === 1 && (
          <div className="bg-stoke pb-10  xl:py-[88px]">
            <div className="max-w-[500px] md:max-w-[800px] xl:max-w-[1140px] mx-auto  my-0 ">
              <p className="xl:text-h2 text-p20-bold text-center text-neutral mb-[40px]">
                {titleSelfTest}
              </p>
              <div className="hidden xl:block">
                <Slider
                  breakpoints={{
                    330: {
                      slidesPerView: 2,
                      slidesPerGroup: 2
                    },
                    1100: {
                      slidesPerView: 3,
                      slidesPerGroup: 3
                    },
                    1280: {
                      slidesPerView: 4,
                      slidesPerGroup: 2
                    }
                  }}
                >
                  {QUIZS.map((quiz, ind) => (
                    <SwiperSlide key={ind}>
                      <QuizCard quiz={quiz} handleDiscover={handleDiscover} />
                    </SwiperSlide>
                  ))}
                </Slider>
              </div>
              <div className="xl:hidden grid grid-cols-2 gap-4 px-4">
                {QUIZS.map((quiz, ind) => (
                  <SwiperSlide key={ind}>
                    <QuizCard quiz={quiz} />
                  </SwiperSlide>
                ))}
              </div>
            </div>
          </div>
        )}
        <div className="">
          <a
            target="_blank"
            href="https://www.facebook.com/groups/vietcodecangay"
            rel="noopener noreferrer"
            className="block sm:h-[304px] h-[139px] w-full relative"
          >
            <Image
              alt="join-us"
              placeholder="blur"
              blurDataURL="/images/Banner_JoinUs1.webp"
              src="/images/Banner_JoinUs1.webp"
              layout="fill"
              width={4320}
              height={912}
              objectFit="cover"
              quality={100}
            />
          </a>
        </div>
        <div className="fixed top-1/3 m-2 z-[900]  xl:block hidden">
          <div className="mb-1">
            <SideMenu
              element={SETTING_STEPPAGE[4]}
              handleStep={handleStep}
              chooseId={chooseSideMenuId}
              id={4}
              numberTitle={'01'}
            />
          </div>
          {positionBlocks?.split(',').map((p, index) => {
            return (
              <div className="mb-1" key={index}>
                <SideMenu
                  element={SETTING_STEPPAGE[parseInt(p)]}
                  handleStep={handleStep}
                  chooseId={chooseSideMenuId}
                  id={index}
                  numberTitle={'0' + (index + 2)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
