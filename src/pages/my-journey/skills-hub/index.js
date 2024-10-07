import { async } from '@firebase/util'
import { unwrapResult } from '@reduxjs/toolkit'
import { ROLE_STORAGE } from 'common/config/app.constants'
import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import XProfileIcon from 'common/presentation/Icons'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'
import BannerRadarChart from 'common/presentation/Pages/my-journey/BannerRadaChart'
import MyJourneyMap from 'common/presentation/Pages/my-journey/MyJourneyMap'
import MyJourneyMapMobile from 'common/presentation/Pages/my-journey/MyJourneyMapMobile'
import MyJourneySideBanner from 'common/presentation/Pages/my-journey/MyJourneySideBanner'
import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import MyJourneySkillItem from 'common/presentation/Pages/my-journey/MyJourneySkillItem'
import { isNaN } from 'lodash'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getExamBySkill } from 'store/app/examSlice'
import {
  getAllJobs,
  selectAllJobs,
  selectFilterModel
} from 'store/app/jobSlice'
import {
  allRelatedJobs,
  getAllUserSkill,
  getJourneySkill,
  getMap,
  selectJourneySkills,
  selectRelatedJobs,
  selectStepMap
} from 'store/app/journeySlice'
import { selectUserProfile } from 'store/app/userSlice'
import useCompetencyMatrix from 'common/hooks/journey/useCompetencyMatrix'
import useCompetencyDetail from 'common/hooks/journey/useCompetencyDetail'
const FAKE_LIST = [
  {
    name: 'Increase Matching Rate'
  },
  {
    name: 'Upgrade Skills'
  },
  {
    name: 'Performance Goals'
  },
  {
    name: 'Careers of Interest'
  }
]
const FAKE_SKILL_LIST = [
  {
    skillName: 'Quản lý công việc',
    percentValue: 80
  },
  {
    skillName: 'Giao tiếp hiệu quả',
    percentValue: 25
  },
  {
    skillName: 'Tìm kiếm insight',
    percentValue: 0
  },
  {
    skillName: 'Đặt câu hỏi',
    percentValue: 55
  }
]
const FAKE_JOB_LIST = []

const RenderEmptySkillUI = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <Image alt="empty" width={200} height={200} src={'/images/empty.svg'} />
      <p className="text-grey-2 text-p18 mt-10">
        Hiện tại bạn chưa làm bài kiểm tra năng lực nào
      </p>
      <Button
        width="w-[287px]"
        height="h-[48px]"
        margin="mt-8"
        title="Đi đến kho kỹ năng"
        rounded="rounded-[8px]"
        onClick={() => console.log('HANDLE FUNCTION')}
      />
    </div>
  )
}

const RenderEmptyJobUI = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="md:block hidden">
        <Image alt="empty" width={200} height={200} src={'/images/empty.svg'} />
      </div>
      <div className="md:hidden">
        <Image alt="empty" width={160} height={160} src={'/images/empty.svg'} />
      </div>
      <p className="text-grey-2 md:text-p18 text-p16 max-w-[286px] md:max-w-full text-center ">
        Hiện chưa có việc làm phù hợp với kỹ năng của bạn
      </p>
    </div>
  )
}
const WrapperBannerRadarChart = () => {
  const { competencyMatrix, fetchCompetencyMatrix } = useCompetencyMatrix()
  useEffect(() => {
    fetchCompetencyMatrix()
  }, [])

  return (
    <Fragment>
      {competencyMatrix === null && (
        <div className="w-full xl:px-[70px] mb-14 xl:h-[480px]">
          <SkeletonBox width="w-full" height="h-full" />
        </div>
      )}
      {competencyMatrix !== null && competencyMatrix?.length === 0 && (
        <p className="text-center text-h5 mb-10 text-red-500">
          Bạn chưa là nhân viên của doanh nghiệp
        </p>
      )}
      {competencyMatrix !== null && competencyMatrix?.length > 0 && (
        <div className="w-full xl:px-[70px] mb-14 xl:h-[480px]">
          <BannerRadarChart competencyMatrix={competencyMatrix} />
        </div>
      )}
    </Fragment>
  )
}

const MyJourneySkillsHubPage = () => {
  const trans = useTrans()
  const dispatch = useDispatch()
  const { push, query } = useRouter()

  const selectStep = useSelector(selectStepMap)
  const selectSkills = useSelector(selectJourneySkills)
  const { genaralSkill, advencedSkill, skillIdList } = selectSkills
  const profile = useSelector(selectUserProfile)
  const { ownedCompany, setting } = profile || {}
  const { characterId } = setting || {}
  const filterModel = useSelector(selectFilterModel)
  const listJob = useSelector(selectRelatedJobs)
  const { MY_JOURNEY } = trans
  const roleStorage = localStorage.getItem(ROLE_STORAGE)
  const stageId = selectStep
  const roleId = parseInt(localStorage.getItem('ROLE')) || 0

  const handleLink = (companyId, departmentId, departmentPositionId) => {
    if (departmentId) {
      push(
        `/profile-company/${companyId}/${departmentId}/${departmentPositionId}`
      )
    } else {
      push(`/profile-company/${companyId}/${id}/${departmentPositionId}`)
    }
  }

  const handleExam = async (skillId) => {
    if (!isNaN(skillId)) {
      const fetchExam = await dispatch(getExamBySkill({ skillId }))
      const res = unwrapResult(fetchExam)
      if (res?.data) {
        window.open(`/exam/${res?.data?.examGuid}`)
      } else {
        toast(
          AlertWaring({
            title: res?.errorMessage
          }),
          {
            toastId: 'alert-save-warning',
            className: 'bg-toast-custom',
            closeButton: false,
            position: 'top-center',
            hideProgressBar: true,
            autoClose: 3000
          }
        )
      }
    } else {
      toast(
        AlertWaring({
          title: 'Kỹ năng này không có bài kiểm tra'
        }),
        {
          toastId: 'alert-save-warning',
          className: 'bg-toast-custom',
          closeButton: false,
          position: 'top-center',
          hideProgressBar: true,
          autoClose: 3000
        }
      )
    }
  }

  useEffect(() => {
    dispatch(getMap())
    dispatch(getJourneySkill())
    dispatch(getAllUserSkill())
    return () => {}
  }, [dispatch])

  useEffect(() => {
    dispatch(allRelatedJobs(skillIdList))
  }, [dispatch, skillIdList])

  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - My Skills Hub</title>
      </Head>
      <div className="min-h-[100vh] relative flex flex-col md:py-[56px] py-6 xl:px-20 px-0  bg-white  ">
        <div className="flex-1  max-w-[1280px] xl:mx-auto">
          <div className="xl:max-w-[1440px] mx-auto">
            <p className="text-center xl:mb-11 mb-4 md:text-p28-bold text-p16  mx-auto">
              My Competencies Matrix
            </p>
            <div className="hidden xl:block">
              <WrapperBannerRadarChart />
            </div>

            <div className="xl:flex gap-8">
              <div className="xl:w-[280px] ">
                <MyJourneySideMenu actionList={MY_JOURNEY?.journeyActionNew} />
              </div>

              <div className="xl:flex-1 flex flex-col items-center gap-6 xl:px-0 px-6">
                <div className="max-w-[657px] w-full xl:w-[657px]">
                  {/* <p className="xl:mb-6 mb-4 xl:text-p20-bold text-p16-bold">
                    Job Competencies
                  </p> */}
                  {[...genaralSkill, ...advencedSkill]?.length === 0 && (
                    <RenderEmptySkillUI />
                  )}
                  {[...genaralSkill, ...advencedSkill]?.length > 0 && (
                    <div className="flex flex-col xl:gap-6 gap-4">
                      <div className="border rounded-3xl border-grey-4 p-8">
                        <p className="xl:mb-6 mb-4 xl:text-p20-bold text-p16-bold">
                          Job Competencies
                        </p>
                        {genaralSkill?.map((el, ind) => {
                          const { skillName, percentValue, skillId } = el
                          return (
                            <MyJourneySkillItem
                              skillId={skillId}
                              skillName={skillName}
                              percentValue={percentValue}
                              key={ind}
                              handleExam={handleExam}
                            />
                          )
                        })}
                      </div>

                      <div className="border rounded-3xl border-grey-4 p-8">
                        <p className="xl:mb-6 mb-4 xl:text-p20-bold text-p16-bold">
                          Techincal Competencies
                        </p>
                        {advencedSkill?.map((el, ind) => {
                          const { skillName, percentValue, skillId } = el
                          return (
                            <MyJourneySkillItem
                              skillId={skillId}
                              skillName={skillName}
                              currentRole={roleStorage}
                              percentValue={percentValue}
                              key={ind}
                              handleExam={handleExam}
                            />
                          )
                        })}
                      </div>
                    </div>
                  )}
                </div>

                {/* <div className="xl:max-w-[657px] w-full xl:w-[657px]">
                  <p className="xl:mb-6 mb-4 xl:text-p20-bold text-p16-bold text-left">
                    Việc làm liên quan
                  </p>
                  {listJob?.length === 0 && <RenderEmptyJobUI />}
                  <div className=" grid grid-cols-2 xl:gap-6 gap-2 items-stretch">
                    {listJob?.length > 0 &&
                      listJob?.slice(0, 20)?.map((job, ind) => {
                        const {
                          companyId,
                          company,
                          departmentId,
                          departmentPositionId
                        } = job
                        const { tag } = company
                        return (
                          <HightlightJobCard
                            showHeart={
                              !(
                                (!companyId && characterId === 2) ||
                                characterId === 2
                              )
                            }
                            job={job}
                            key={ind}
                            isAuthentication={
                              !(
                                (!companyId && characterId === 2) ||
                                characterId === 2
                              ) && profile !== null
                            }
                            handleAction={() =>
                              handleLink(
                                tag,
                                departmentId,
                                departmentPositionId
                              )
                            }
                          />
                        )
                      })}
                  </div>
                </div> */}
              </div>

              <div className="xl:w-[279px] xl:block hidden">
                <MyJourneySideBanner
                  title="Tích luỹ thêm nhiều kỹ năng, để có thể thu hút được nhiều cơ hội việc làm tốt đến với bạn!"
                  listSuggest={FAKE_LIST}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MyJourneySkillsHubPage
