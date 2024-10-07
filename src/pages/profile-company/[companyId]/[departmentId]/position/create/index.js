import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import { LINES } from 'common/presentation/Pages/Demo/constants'
import DevRoadmapPositionView from 'common/presentation/Pages/edit-mode-company/position/devRoadmapPosition/devRoadmapPositionView'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import ContentDayJob from 'common/presentation/Pages/Profile-Company/ContentDayJob'
import JobInformation from 'common/presentation/Pages/Profile-Company/InformationJob'

import RadarChart from 'common/presentation/Pages/Profile-Company/RadarChart'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import SkillAdvenced from 'common/presentation/Pages/Profile-Company/SkillAdvanced'
import SkillSoft from 'common/presentation/Pages/Profile-Company/SkillSoft'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { createDepartmentPosition } from 'store/app/departmentPositionSlice'

const CreatePositionPage = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const trans = useTrans()
  const { companyId, departmentId } = router.query
  const { PROFILE_COMPANY, POSITION_TEMPLATE, DEPARTMENT_TEMPLATE } =
    trans || {}
  const {
    profile,
    profile_company: profileCompany,
    skillNecessary,
    skillProfessional,
    roleId,
    departmentPositions,
    recruitment
  } = POSITION_TEMPLATE || {}
  const { skills, isShowChart, userMatchingPercentage } = profile || {}
  const { profile: profileDepartment } = DEPARTMENT_TEMPLATE || { profile: {} }

  const handleClickCreate = async () => {
    if (companyId) {
      const res = await dispatch(
        createDepartmentPosition({ companyId, departmentId })
      )
      if (res?.payload?.data?.departmentPositionId) {
        window.location.replace(
          `/profile-company/${companyId}/${departmentId}/${res?.payload?.data?.departmentPositionId}/edit`
        )
      }
    }
  }
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: profileCompany?.name,
        href: `profile-company/${profileCompany?.companyId}`
      },
      {
        name: profileDepartment.name,
        href: `profile-company/${profileCompany?.companyId}/${profileDepartment?.departmentId}`
      },
      {
        name: profile.name,
        href: `profile-company/${profileCompany?.companyId}/${profileDepartment?.departmentId}/${profile?.departmentPositionId}`
      }
    )
    return titleBreadCrumbs
  }

  return (
    <div className="flex-1">
      <Head>
        <title>Tạo chiến dịch tuyển dụng</title>
      </Head>
      <div className="relative">
        <div className="fixed w-screen h-full z-[90] top-0"></div>
        <div className="flex justify-end pr-14 bg-[#33333389] sticky top-[60px] z-[100] py-9 ">
          <Button
            title="Nhập thông tin công việc"
            width="w-[300px]"
            height="h-auto"
            rounded="rounded-[8px]"
            padding="p-[12px_32px]"
            color="text-white"
            textWeight="sm:text-p18-bold text-p14 font-bold"
            onClick={() => handleClickCreate()}
          />
        </div>
        <div>
          <div>
            {profile && (
              <div className="flex justify-center bg-white h-auto xl:py-[60px]  xl:px-0  px-5 py-10 relative ">
                <BannerDetail
                  profile={profile}
                  breadCrumbsTitle={breadCrumbsTitle()}
                />
              </div>
            )}
            {profile && (
              <div className="flex justify-center xl:pt-20 xl:pb-[100px] py-10 xl:px-0 px-[16px]">
                <div className="flex flex-wrap gap-[40px] md:flex-nowrap max-w-[1140px] justify-center xl:justify-start">
                  <div className="mb-5 xl:mb-0">
                    <JobInformation
                      title={PROFILE_COMPANY?.jobDetail?.titleJobDescription}
                      description={profile?.description}
                      employeeAmount={profile?.employeeAmount}
                      recruitmentAmount={profile?.recruitmentAmount}
                      averageSalary={profile?.averageSalary}
                    />
                  </div>
                  <div>
                    {isShowChart && (
                      <RadarChart
                        skills={skills}
                        title={PROFILE_COMPANY.jobDetail.titleRelevance}
                        numeral={userMatchingPercentage}
                        titleApplyButton={
                          PROFILE_COMPANY.jobDetail.titleRelevanceButton
                        }
                        descriptionDefault={
                          PROFILE_COMPANY.jobDetail.descriptionRelevance
                        }
                        titleButton={PROFILE_COMPANY.jobDetail.titleApplyJob}
                        showApply={recruitment?.length > 0}
                        // userProfile={userProfile}
                        isShowRadarChart={
                          skills?.length > 3 && skills?.length <= 6
                        }
                      />
                    )}
                  </div>
                </div>
              </div>
            )}
            {skillNecessary?.length > 0 && (
              <div
                className={`flex justify-center xl:py-20  xl:px-0  px-5 py-10 ${
                  roleId === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
                }`}
              >
                <SkillSoft
                  title={PROFILE_COMPANY?.jobDetail.titleGenaralSkillsJob}
                  description={
                    PROFILE_COMPANY?.jobDetail.descriptionGenaralSkillsJob
                  }
                  PROFILE_COMPANY={PROFILE_COMPANY}
                  skillProfessional={skillProfessional}
                  roleId={roleId}
                />
              </div>
            )}
            {skillProfessional?.length > 0 && (
              <div className="flex justify-center xl:py-20  xl:px-0  px-5 py-10 bg-blue-light-opacity">
                <SkillAdvenced
                  title={PROFILE_COMPANY?.jobDetail?.titleAdvancedSkillsJob}
                  description={
                    PROFILE_COMPANY?.jobDetail?.descriptionAdvancedSkillsJob
                  }
                  PROFILE_COMPANY={PROFILE_COMPANY}
                  skillNecessary={skillNecessary}
                  roleId={roleId}
                />
              </div>
            )}
            {departmentPositions?.length > 0 && (
              <div className="py-20 bg-white ">
                {departmentPositions.map((el, index) => {
                  const { departmentPositions, row } = el
                  const { meta } = departmentPositions[0] || {}
                  const { careerPaths } = meta || {}

                  return (
                    <div key={index} className="xl:flex justify-center ">
                      <DevRoadmapPositionView positionList={careerPaths} />
                    </div>
                  )
                })}
              </div>
            )}
            {recruitment?.length > 0 && (
              <div className="bg-background-profile pt-[92px] pb-[92px] pl-5 pr-5 xl:pl-0 xl:pr-0 flex justify-center">
                <ContentDayJob
                  name={profileCompany?.name}
                  title={PROFILE_COMPANY.jobDetail.titleApplyJob}
                  titleDay={PROFILE_COMPANY.jobDetail.day}
                  titleButton={PROFILE_COMPANY.jobDetail.titleApplyButton}
                  showApply={recruitment?.length > 0}
                />
              </div>
            )}

            {recruitment?.length > 0 && (
              <div className=" pb-[100px] bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0">
                <div className="text-center mb-10">
                  <p className="text-h2 text-neutral">
                    {PROFILE_COMPANY.titleRecruitDetail}
                  </p>
                </div>
                <div>
                  <RecruitList
                    recruitmentCampaign={recruitment}
                    id={recruitment[0].id}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePositionPage
