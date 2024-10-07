import React, { useEffect } from 'react'
import GenaralField from 'common/presentation/Pages/Career-Path/GeneralField'
import Image from 'next/image'
import TopCompanies from 'common/presentation/Pages/Career-Path/TopCompany'
import WorkDay from 'common/presentation/Pages/Profile-Company/WorkDay'
import { useDispatch } from 'react-redux'
import {
  getTopCompanies,
  getTopCompaniesByTag,
  selectCoreSkillByLevelId,
  selectCoreSkillByLevelIdTag,
  selectJobDetailByTagCareerPath,
  selectJobDetailCareerPath,
  selectLevelId,
  selectRoleId,
  selectSoftSkillByLevelId,
  selectSoftSkillByLevelIdTag,
  selectTopCompanies,
  selectTopCompaniesByTag,
  updateRoleId
} from 'store/app/careerPathSlice'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import SkillSoft from 'common/presentation/Pages/Profile-Company/SkillSoft'
import { authService } from 'store/helper/authService'
import { getAllUserSkill, getUserPortfolio } from 'store/app/portfolioSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import { ROLE_STORAGE } from 'common/config/app.constants'
import SkillAdvenced from 'common/presentation/Pages/Profile-Company/SkillAdvanced'
import Questions from 'common/presentation/Pages/Career-Path/Questions'
import { scrollToIdInElement } from 'store/helper/functionHelper'
import {
  getJobByTag,
  getJobChildFaq,
  getJobChildFaqByTag,
  getJobDetail,
  getJobFaqRoot,
  getJobFaqRootByTag,
  getJobWorkingDay,
  getJobWorkingDayByTag,
  selectJobFaq,
  selectJobFaqByTag,
  selectJobWorkingDay,
  selectJobWorkingDayByTag,
  updateJobFaq,
  updateJobFaqByTag
} from 'store/app/jobSlice'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import Panzoom from '@panzoom/panzoom'
import { getExamBySkill } from 'store/app/examSlice'
import { toast } from 'react-toastify'
import { getProfile, selectUserProfile } from 'store/app/userSlice'
import isNaN from 'lodash/isNaN'
import Head from 'next/head'
import NavbarCompany from 'common/container/Header/navbarCompany'
import useTrans from 'common/hooks/useTrans'
import FooterCompany from 'common/container/Footer/footerCompany'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import {
  CareerMapCSItSuport,
  CareerMapCSNetworking,
  CareerMapCSSecurityIntelligence,
  CareerMapCSSoftwareDeveloper,
  CareerMapCSSystemEngineering,
  CareerMapItBa,
  CareerMapItInteractionDesign,
  CareerMapItSoftwareEngineer
} from 'common/container/career-path/maps'
import { drawMapCrpDetail } from 'store/helper/drawMapCrp'
import { CareerMapItSoftwareQualityControl } from 'common/container/career-path/maps/it/software-quality-control'

const STATICTAGS = [
  'ba',
  'tester',
  'uiux',
  'dev',
  'software-architecture',
  'techlead',
  'ui-designer',
  'ux-designer',
  'ux-writer',
  'qa',
  'tester',
  'cto',
  'product-owner',
  'security-operations-analyst',
  'security-analyst',
  'security-administrator',
  'system-engineer',
  'system-administrator',
  'system-analyst',
  'cloud-architect',
  'cbs-cto',
  'hoci',
  'principal-software-engineer',
  'devops-engineer',
  'security-engineer',
  'cbs',
  'machine-learning-engineer',
  'network-technician',
  'network-administrator',
  'database-architect',
  'database-administrator',
  'it-support-specialist',
  'help-desk-technician'
]

const DEV_LIST = [
  'ba',
  'tester',
  'uiux',
  'dev',
  'software-architecture',
  'techlead',
  'ui-designer',
  'ux-designer',
  'ux-writer',
  'qa',
  'tester',
  'cto',
  'product-owner'
]

const CareerPathId = (props) => {
  const dispatch = useDispatch()
  const { query } = useRouter()
  const { id } = query || {}
  const roleId = useSelector(selectRoleId)
  const levelId = useSelector(selectLevelId)
  const isQueryIdNaN = isNaN(parseInt(query.id))
  const trans = useTrans()
  const { HEADER, FOOTER } = trans
  const topCompanies = useSelector((state) =>
    isQueryIdNaN ? selectTopCompaniesByTag(state) : selectTopCompanies(state)
  )
  const workingDays = useSelector((state) =>
    isQueryIdNaN ? selectJobWorkingDayByTag(state) : selectJobWorkingDay(state)
  )
  const jobDetail = useSelector((state) =>
    isQueryIdNaN
      ? selectJobDetailByTagCareerPath(state)
      : selectJobDetailCareerPath(state)
  )
  const jobFaqs = useSelector((state) =>
    isQueryIdNaN ? selectJobFaqByTag(state) : selectJobFaq(state)
  )
  const skillSoft = useSelector((state) =>
    isQueryIdNaN
      ? selectSoftSkillByLevelIdTag(state, levelId)
      : selectSoftSkillByLevelId(state, levelId)
  )
  const skillCore = useSelector((state) =>
    isQueryIdNaN
      ? selectCoreSkillByLevelIdTag(state, levelId)
      : selectCoreSkillByLevelId(state, levelId)
  )
  const userProfile = useSelector(selectUserProfile)

  const { description, name, backgroundUrl, meta, tag, workWithJobs } =
    jobDetail || {}

  // Lấy detail by tag khi truy cập từ header (Lộ trình nghề nghiệp)
  const detailLevel = jobDetail?.jobLevels?.find(
    (x) => x?.meta?.tag === query?.level
  )
  const isJobLevelMatchingName = detailLevel?.name === name
  const detailLevelJobName = detailLevel ? detailLevel?.name : name

  const isTyping = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.JOB.CHILDFAQ) ||
      selectLoading(state, APP_TYPES.JOB.CHILDFAQBYTAG)
  )
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.PORTFOLIO.GETUSERPORTFOLIO) ||
      selectLoading(state, APP_TYPES.CAREERPATH.GETTOPCOMPANIES) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBDETAIL) ||
      selectLoading(state, APP_TYPES.JOB.JOBFAQROOT) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBWORKINGDAY)
  )

  const reInitCTA = async (tagName) => {
    const element = document.getElementById('main-frame')
    if (element) {
      if (window.innerWidth > 600) {
        Panzoom(element, {
          minScale: 1,
          canvas: true,
          contain: 'outside',
          animate: true,
          cursor: 'move',
          startScale: 1.5
        })
      } else {
        Panzoom(element, {
          minScale: 1,
          canvas: true,
          contain: 'outside',
          animate: true,
          cursor: 'move',
          startScale: 1.6
        })
      }
      switch (tagName) {
        case 'dev':
          drawMapCrpDetail('se-map-crp')
          break
        case 'cto':
          drawMapCrpDetail('se-map-crp')
          break
        case 'product-owner':
          drawMapCrpDetail('se-map-crp')
          break
        case 'software-architecture':
          drawMapCrpDetail('se-map-crp')
          break
        case 'techlead':
          drawMapCrpDetail('se-map-crp')
          break
        case 'ba':
          drawMapCrpDetail('ba-map-crp')
          break
        case 'ui-designer':
          drawMapCrpDetail('id-map-crp')
          break
        case 'ux-designer':
          drawMapCrpDetail('id-map-crp')
          break
        case 'ux-writer':
          drawMapCrpDetail('id-map-crp')
          break
        case 'qa':
          drawMapCrpDetail('sqc-map-crp')
          break
        case 'tester':
          drawMapCrpDetail('sqc-map-crp')
          break
        case 'security-operations-analyst':
          drawMapCrpDetail('cs-si-map-crp')
          break
        case 'security-analyst':
          drawMapCrpDetail('cs-si-map-crp')
          break
        case 'security-administrator':
          drawMapCrpDetail('cs-si-map-crp')
          break
        case 'system-engineer':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'system-administrator':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'system-analyst':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'cloud-architect':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'cbs-cto':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'hoci':
          drawMapCrpDetail('cs-se-map-crp')
          break
        case 'principal-software-engineer':
          drawMapCrpDetail('cs-sd-map-crp')
          break
        case 'devops-engineer':
          drawMapCrpDetail('cs-sd-map-crp')
          break
        case 'security-engineer':
          drawMapCrpDetail('cs-sd-map-crp')
          break
        case 'cbs':
          drawMapCrpDetail('cs-sd-map-crp')
          break
        case 'machine-learning-engineer':
          drawMapCrpDetail('cs-network-map-crp')
          break
        case 'network-technician':
          drawMapCrpDetail('cs-network-map-crp')
          break
        case 'network-administrator':
          drawMapCrpDetail('cs-network-map-crp')
          break
        case 'database-architect':
          drawMapCrpDetail('cs-is-map-crp')
          break
        case 'database-administrator':
          drawMapCrpDetail('cs-is-map-crp')
          break
        case 'it-support-specialist':
          drawMapCrpDetail('cs-is-map-crp')
          break
        case 'help-desk-technician':
          drawMapCrpDetail('cs-is-map-crp')
          break

        default:
          break
      }
    }
  }

  const handleAnswer = async (content, faqAnswerId) => {
    if (!isTyping) {
      const updateJobFaqAction = isQueryIdNaN ? updateJobFaqByTag : updateJobFaq
      const getJobChildFaqAction = isQueryIdNaN
        ? getJobChildFaqByTag
        : getJobChildFaq
      dispatch(updateJobFaqAction({ content: content, type: 2 }))
      await dispatch(
        getJobChildFaqAction({
          jobId: id,
          faqAnswerId: faqAnswerId,
          event: () => scrollToIdInElement('wrapper-faqs')
        })
      )
      scrollToIdInElement('wrapper-faqs')
    }
  }

  const handleClickExam = async (skillId) => {
    if (!isNaN(skillId)) {
      const fetchExam = await dispatch(getExamBySkill({ skillId }))
      const res = unwrapResult(fetchExam)
      if (res?.data) {
        window.open(`/exam/${res?.data?.examGuid}`)
      } else {
        toast(
          AlertWaring({
            // title: res?.errorMessage
            title:
              'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
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
    } else {
      toast(
        AlertWaring({
          title:
            'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
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

  useEffect(() => {
    const fetchInitData = async () => {
      if (authService.getAccessToken()) {
        const profile = await dispatch(getUserPortfolio())
        const { data } = unwrapResult(profile)
        if (data) {
          dispatch(updateRoleId(data?.user?.setting?.characterId))
        }
      } else {
        const role = localStorage.getItem(ROLE_STORAGE)
        if (role) {
          dispatch(updateRoleId(role))
        }
      }

      const actions = []
      if (isQueryIdNaN) {
        actions.push(
          getTopCompaniesByTag({ tag: id }),
          getJobWorkingDayByTag({ tag: id }),
          getJobByTag({ tag: id }),
          getJobFaqRootByTag({ tag: id }),
          getAllUserSkill()
        )
      } else {
        actions.push(
          getTopCompanies({ jobId: id }),
          getJobWorkingDay({ jobId: id }),
          getJobDetail({ jobId: id }),
          getJobFaqRoot({ jobId: id }),
          getAllUserSkill()
        )
      }
      await Promise.all(actions.map((action) => dispatch(action)))
    }
    if (id) {
      fetchInitData()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  useEffect(() => {
    if (tag) {
      dispatch(getProfile())
      reInitCTA(tag)
    }
  }, [tag])

  if (jobDetail === null) {
    return (
      <div className="flex-1">
        <p className="text-h1 text-center mt-[60px]">
          Không tìm thấy thông tin
        </p>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>{`Lộ trình nghề nghiệp - ${
          detailLevel?.name || ''
        } ${name} - X-Profile`}</title>
      </Head>
      <div className="min-h-[100vh] relative flex flex-col">
        <NavbarCompany
          typeNavbar="top"
          NAVIGATION={HEADER}
          isLogin={userProfile}
          info={userProfile}
        />
        {loading && <LoadingRole />}
        <div className="flex-1">
          <div>
            <GenaralField
              workWithJobs={workWithJobs}
              description={description}
              title={!isJobLevelMatchingName ? detailLevelJobName : name}
              avatarUrl={backgroundUrl}
              growthTrend={detailLevel?.meta?.growthTrend || meta?.growthTrend}
              averageSalary={
                detailLevel?.meta?.averageSalary || meta?.averageSalary
              }
              newJobAmount={
                detailLevel?.meta?.newJobAmount || meta?.newJobAmount
              }
            />
          </div>
          <div id="career-path-1">
            {STATICTAGS.includes(tag) && (
              <div className="md:py-[68px] py-8">
                <p className="sm:text-h2 text-p20-bold text-center text-black mb-[12px]">
                  Lộ trình nghề {name}
                </p>
                <p className="max-w-[1000px] text-center sm:text-p18 text-p12 text-grey-1 mx-auto mb-[32px] sm:px-0 px-10">
                  {description}
                </p>
                <div className="w-[70vw] h-[56vw] mx-auto relative lg:rounded-3xl rounded-xl">
                  <div
                    id="main-frame"
                    className={`w-[70vw] h-[56vw] ${
                      DEV_LIST.includes(tag)
                        ? 'bg-background-frame'
                        : 'bg-background-frame-cs'
                    } bg-no-repeat bg-contain bg-center`}
                  >
                    {tag === 'ba' && (
                      <div className="animate-grow">
                        <CareerMapItBa />
                      </div>
                    )}
                    {tag === 'ui-designer' && (
                      <div className="animate-grow">
                        <CareerMapItInteractionDesign />
                      </div>
                    )}
                    {tag === 'ux-designer' && (
                      <div className="animate-grow">
                        <CareerMapItInteractionDesign />
                      </div>
                    )}
                    {tag === 'ux-writer' && (
                      <div className="animate-grow">
                        <CareerMapItInteractionDesign />
                      </div>
                    )}
                    {tag === 'dev' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareEngineer />
                      </div>
                    )}
                    {tag === 'cto' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareEngineer />
                      </div>
                    )}
                    {tag === 'product-owner' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareEngineer />
                      </div>
                    )}
                    {tag === 'software-architecture' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareEngineer />
                      </div>
                    )}
                    {tag === 'techlead' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareEngineer />
                      </div>
                    )}
                    {tag === 'qa' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareQualityControl />
                      </div>
                    )}
                    {tag === 'tester' && (
                      <div className="animate-grow">
                        <CareerMapItSoftwareQualityControl />
                      </div>
                    )}
                    {tag === 'security-operations-analyst' && (
                      <div className="animate-grow">
                        <CareerMapCSSecurityIntelligence />
                      </div>
                    )}
                    {tag === 'security-analyst' && (
                      <div className="animate-grow">
                        <CareerMapCSSecurityIntelligence />
                      </div>
                    )}
                    {tag === 'security-administrator' && (
                      <div className="animate-grow">
                        <CareerMapCSSecurityIntelligence />
                      </div>
                    )}
                    {tag === 'system-engineer' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'system-administrator' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'system-analyst' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'cloud-architect' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'cbs-cto' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'hoci' && (
                      <div className="animate-grow">
                        <CareerMapCSSystemEngineering />
                      </div>
                    )}
                    {tag === 'principal-software-engineer' && (
                      <div className="animate-grow">
                        <CareerMapCSSoftwareDeveloper />
                      </div>
                    )}
                    {tag === 'devops-engineer' && (
                      <div className="animate-grow">
                        <CareerMapCSSoftwareDeveloper />
                      </div>
                    )}
                    {tag === 'security-engineer' && (
                      <div className="animate-grow">
                        <CareerMapCSSoftwareDeveloper />
                      </div>
                    )}
                    {tag === 'cbs' && (
                      <div className="animate-grow">
                        <CareerMapCSSoftwareDeveloper />
                      </div>
                    )}
                    {tag === 'machine-learning-engineer' && (
                      <div className="animate-grow">
                        <CareerMapCSNetworking />
                      </div>
                    )}
                    {tag === 'network-technician' && (
                      <div className="animate-grow">
                        <CareerMapCSNetworking />
                      </div>
                    )}
                    {tag === 'network-administrator' && (
                      <div className="animate-grow">
                        <CareerMapCSNetworking />
                      </div>
                    )}
                    {tag === 'database-architect' && (
                      <div className="animate-grow">
                        <CareerMapCSItSuport />
                      </div>
                    )}
                    {tag === 'database-administrator' && (
                      <div className="animate-grow">
                        <CareerMapCSItSuport />
                      </div>
                    )}
                    {tag === 'it-support-specialist' && (
                      <div className="animate-grow">
                        <CareerMapCSItSuport />
                      </div>
                    )}
                    {tag === 'help-desk-technician' && (
                      <div className="animate-grow">
                        <CareerMapCSItSuport />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div
            id="career-path-2"
            className={`flex justify-center xl:py-20  xl:px-0  px-6 py-8  bg-yellow-careers `}
          >
            <SkillSoft
              skillProfessional={skillSoft}
              roleId={roleId}
              imageRole0="/images/career_path/soft_skill.png"
              imageRole1="/images/career_path/soft_skill.png"
              title="Kỹ năng chung cần thiết"
              description="Những kỹ năng chung cần thiết mà nhà tuyển dụng yêu cầu cho vị trí này."
              handleDoExam={handleClickExam}
              canDoExam={true}
            />
          </div>
          <div className="flex justify-center xl:py-20  xl:px-0  px-6 py-8 bg-light-blue">
            <SkillAdvenced
              imageBoss="/images/career_path/hard_skill.png"
              skillNecessary={skillCore}
              roleId={roleId}
              title="Kỹ năng chuyên môn"
              description="Để ứng tuyển cho vị trí này, nhà tuyển dụng mong muốn bạn có những nghiệp vụ dưới đây."
              handleDoExam={handleClickExam}
              canDoExam={true}
            />
          </div>
          {workingDays?.length > 0 && (
            <div id="career-path-4" className="bg-stoke">
              <WorkDay
                title={`Một ngày làm việc ${name}`}
                workingDays={workingDays}
                description={`Chia sẻ của “người trong ngành” về cách họ làm việc trong một ngày\nsẽ giúp bạn hình dung ra được công việc của một ${name} diễn ra như thế nào.`}
              />
            </div>
          )}
          {jobFaqs?.length > 0 && (
            <div
              id="career-path-3"
              className="xl:flex bg-stoke xl:justify-center w-full xl:pt-[120px] xl:pb-[120px] sm:px-10 px-6 xl:pl-0 xl:pr-0 pb-10 pt-10"
            >
              <Questions
                faqs={jobFaqs}
                handleAnswer={handleAnswer}
                isTyping={isTyping}
                title="Trò chuyện với chúng tôi"
              />
            </div>
          )}

          <div id="career-path-5" className="bg-white md:bg-transparent">
            <TopCompanies
              title="Khám phá top doanh nghiệp trong lĩnh vực"
              topCompanies={topCompanies}
            />
          </div>
          <div id="career-path-6" className="">
            <a
              target="_blank"
              href="https://www.facebook.com/groups/vietcodecangay"
              rel="noopener noreferrer"
              className="sm:h-[304px] h-[200px] w-full relative"
            >
              <div className="sm:block hidden">
                <Image
                  alt="join-us"
                  placeholder="blur"
                  blurDataURL="/images/Banner_JoinUs1.webp"
                  src="/images/Banner_JoinUs1.webp"
                  width={4320}
                  height={912}
                  objectFit="cover"
                  quality={100}
                />
              </div>
              <div className="sm:hidden block">
                <Image
                  alt="join-us"
                  placeholder="blur"
                  blurDataURL="/images/Banner_JoinUs1.webp"
                  src="/images/Banner_JoinUs1.webp"
                  width={1125}
                  height={417}
                  objectFit="cover"
                  quality={100}
                />
              </div>
            </a>
          </div>
        </div>
        <FooterCompany FOOTER={FOOTER} />
      </div>
    </>
  )
}

CareerPathId.propTypes = {}

export default CareerPathId
