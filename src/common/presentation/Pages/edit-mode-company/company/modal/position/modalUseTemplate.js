import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'

import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

import DevRoadmapPositionView from 'common/presentation/Pages/edit-mode-company/position/devRoadmapPosition/devRoadmapPositionView'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import ContentDayJob from 'common/presentation/Pages/Profile-Company/ContentDayJob'
import DescriptionItemEdit from 'common/presentation/Pages/Profile-Company/DescriptionItemEdit'
import DescriptionSalaryEdit from 'common/presentation/Pages/Profile-Company/DescriptionSalaryEdit'
import JobInformation from 'common/presentation/Pages/Profile-Company/InformationJob'
import JobDescriptionTable from 'common/presentation/Pages/Profile-Company/JobDecriptionTable'

import RadarChart from 'common/presentation/Pages/Profile-Company/RadarChart'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import SkillAdvenced from 'common/presentation/Pages/Profile-Company/SkillAdvanced'
import SkillSoft from 'common/presentation/Pages/Profile-Company/SkillSoft'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import {
  createDepartmentPosition,
  getAllJobLevels,
  getTemplateByJobLevel,
  selectDepartmentPosition
} from 'store/app/departmentPositionSlice'
import { getAllDepartmentPositionsEdit } from 'store/app/edit-mode-company/department/positionsDepartmentSlice'
import BenefitsPositionViewMode from '../../../position/benefits/benefitsPositionViewMode'
import JobRequirementsPositionViewMode from '../../../position/job-requirements/jobRequirementsPositionViewMode'
import DropdownTemplatePositionJob from 'common/presentation/DropdownTemplatePositionJob'
import { useEffect, useRef, useState } from 'react'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useSelector } from 'react-redux'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingRole from 'common/presentation/Loading/LoadingRole'

const ModalUseTemplatePosition = ({ handleToggleModal = () => {} }) => {
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.DEPARTMENTPOSITION.GETTEMPLATEBYJOBLEVEL)
  )
  const trans = useTrans()
  const { PROFILE_COMPANY, POSITION_TEMPLATE, DEPARTMENT_TEMPLATE } =
    trans || {}
  const { profile: profileDepartment } = DEPARTMENT_TEMPLATE || { profile: {} }
  const [activeDropdownPositionJob, setActiveDropdownPositionJob] =
    useState(false)
  const { allJobLevelsTemplate, templateByJob } = useSelector(
    selectDepartmentPosition
  )
  const [jobLevelIdSelected, setJobLevelIdSelected] = useState(null)
  const [listJobPosition, setListJobPosition] = useState([])
  const [currentJobPosition, setCurrentJobPosition] = useState('')
  const [dataTemplatePosition, setDataTemplatePosition] = useState(
    POSITION_TEMPLATE['Default']
  )
  const {
    profile,
    profile_company: profileCompany,
    skillNecessary,
    skillProfessional,
    roleId,
    departmentPositions,
    recruitment
  } = dataTemplatePosition || {}
  const {
    skills,
    isShowChart,
    userMatchingPercentage,
    jobDescriptionList,
    benefitsList,
    jobRequirement,
    roadmapPosition
  } = profile || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { companyId, departmentId, dev } = router.query

  const handleClickCreate = async () => {
    if (companyId) {
      const res = await dispatch(
        createDepartmentPosition({
          companyId,
          departmentId,
          jobLevelId: jobLevelIdSelected
        })
      )
      if (res?.payload?.data?.departmentPositionId) {
        // window.location.replace(
        //   `/profile-company/${companyId}/${departmentId}/${res?.payload?.data?.departmentPositionId}/edit`
        // )
        toast(
          AlertSuccess({
            title: 'Đã tạo vị trí thành công'
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

        dispatch(getAllDepartmentPositionsEdit({ departmentId, companyId }))

        handleToggleModal()
      } else {
        toast(
          AlertError({
            title: res?.payload?.errorMessage || 'Lưu không thành công'
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
  }
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: 'Profile công ty',
        href: `/`
      },
      {
        name: 'Department',
        href: `/`
      },
      {
        name:
          profile?.name !== 'Tên vị trí'
            ? profile?.name
            : 'Job position' || 'Job position',
        href: `/`
      }
    )
    return titleBreadCrumbs
  }
  const queryJobPositionByName = (val) => {
    const tempArr = [...allJobLevelsTemplate]
    const filterListJobPosition = tempArr?.filter((job) =>
      job?.name?.toLowerCase().includes(val?.toLowerCase())
    )
    setListJobPosition(filterListJobPosition)
  }
  const handleChooseJobPosition = (name, jobLevelId) => {
    setJobLevelIdSelected(jobLevelId)
    setCurrentJobPosition(name)
    // setDataTemplatePosition(POSITION_TEMPLATE[name])
    setActiveDropdownPositionJob(!activeDropdownPositionJob)
  }
  const handleClearJobPosition = (e) => {
    e.stopPropagation()
    setCurrentJobPosition('')
    setDataTemplatePosition(POSITION_TEMPLATE['Default'])
  }
  const handleActiveDropdown = (name) => {
    setActiveDropdownPositionJob(true)
    setListJobPosition(allJobLevelsTemplate)
  }
  const handleCloseDropdown = () => {
    setActiveDropdownPositionJob(false)
  }
  const getAllJobLevelsTemplate = async () => {
    const res = await dispatch(getAllJobLevels({ isCompetencyOnly: false }))
    if (res?.payload?.isSuccess) {
      setListJobPosition(res?.payload?.data || [])
    }
  }
  const getTemplate = async () => {
    if (jobLevelIdSelected) {
      const res = await dispatch(
        getTemplateByJobLevel({ jobLevelId: jobLevelIdSelected })
      )
      if (res?.payload?.isSuccess) {
        const {
          name,
          description,
          shortDescription,
          descriptionTable,
          meta,
          skills,
          userMatchingPercentage
        } = res?.payload?.data || {}
        let result = {
          profile: {
            name: name,
            shortDescription: description || 'Mô tả vị trí công việc',
            maxRecruitment:
              POSITION_TEMPLATE['Default']?.profile?.maxRecruitment,
            maxStaff: POSITION_TEMPLATE['Default']?.profile?.maxStaff,
            jobDescriptionList:
              meta?.descriptionTable ||
              POSITION_TEMPLATE['Default']?.profile?.jobDescriptionList,
            maxSalaryValue:
              POSITION_TEMPLATE['Default']?.profile?.maxSalaryValue,
            meta: {
              avatarUrl: '/images/positionTemplate1.png'
            },
            benefitsList: POSITION_TEMPLATE['Default']?.profile?.benefitsList,
            jobRequirement:
              meta?.requirement ||
              POSITION_TEMPLATE['Default']?.profile?.jobRequirement,
            roadmapPosition:
              POSITION_TEMPLATE['Default']?.profile?.roadmapPosition,
            skills:
              skills?.length > 0
                ? skills
                : POSITION_TEMPLATE['Default']?.profile?.skills,
            isShowChart: true,
            userMatchingPercentage: userMatchingPercentage
          },
          skillNecessary:
            skills?.filter((e) => e.type === 0 || e.type === 5).length > 0
              ? skills?.filter((e) => e.type === 0 || e.type === 5)
              : POSITION_TEMPLATE['Default']?.skillNecessary,
          skillProfessional:
            skills?.filter((e) => e.type === 1 || e.type === 6).length > 0
              ? skills?.filter((e) => e.type === 1 || e.type === 6)
              : POSITION_TEMPLATE['Default']?.skillProfessional,
          meta: {},
          recruitment: POSITION_TEMPLATE['Default']?.recruitment
        }
        setDataTemplatePosition(result)
      } else {
        setDataTemplatePosition(POSITION_TEMPLATE['Default'])
      }
    }
  }
  useEffect(() => {
    getTemplate()
  }, [jobLevelIdSelected])
  useEffect(() => {
    getAllJobLevelsTemplate()
  }, [])
  return (
    <div className="relative animate-bottomToTop h-screen pb-[80px]">
      {loading && <LoadingRole />}
      <div
        // Z index 101 để che được hover mục kĩ năng chung cần thiết
        className="flex justify-between py-4 px-10 sticky top-0 border-b border-grey-3 z-[101]"
        style={{
          filter: '-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
        }}
      >
        <Button
          title="Huỷ"
          padding="sm:p-[12px_32px] p-2"
          margin="m-0"
          background="bg-white"
          textWeight="sm:text-p18-bold text-p14 font-bold"
          rounded="rounded-[8px] border border-grey-3"
          height="h-auto"
          type="button"
          onClick={handleToggleModal}
        />
        <div className="flex gap-6 justify-center items-center">
          <DropdownTemplatePositionJob
            handleCloseDropdown={handleCloseDropdown}
            queryJobPositionByName={queryJobPositionByName}
            listJobPosition={listJobPosition}
            handleActiveDropdown={handleActiveDropdown}
            handleClearJobPosition={handleClearJobPosition}
            currentJobPosition={currentJobPosition}
            handleChooseJobPosition={handleChooseJobPosition}
            activeDropdown={activeDropdownPositionJob}
          />

          <Button
            title="Sử dụng template này"
            width="sm:w-[300px] w-auto"
            height="h-auto"
            rounded="rounded-[8px]"
            padding="sm:p-[12px_32px] p-2"
            color="text-neutral"
            margin="m-0"
            textWeight="sm:text-p18-bold text-p14 font-bold"
            onClick={() => handleClickCreate()}
          />
        </div>
      </div>

      <div className="overflow-y-scroll h-full">
        <div>
          {profile && (
            <div className="flex justify-center bg-white h-auto xl:py-[60px]  xl:px-0  px-5 py-10 relative ">
              <div className="absolute  w-full h-full z-10 top-0 "></div>

              <BannerDetail
                isTemplate={true}
                profile={profile}
                breadCrumbsTitle={breadCrumbsTitle()}
              />
            </div>
          )}
          {profile && (
            <div className="flex justify-center xl:pt-20 xl:pb-[100px] py-10 xl:px-0 px-[16px] relative">
              <div className="absolute bg-light-nude  w-full h-full z-10  top-0 "></div>

              <div className="flex flex-wrap gap-[40px] bg-light-nude z-20 md:flex-nowrap max-w-[1140px] justify-center xl:justify-start">
                <div className="mb-5 xl:mb-0 ">
                  <p className="sm:text-h2 text-p16-bold text-neutral">
                    {PROFILE_COMPANY?.jobDetail?.titleJobDescription}
                  </p>
                  {/* <JobInformation
                    title={PROFILE_COMPANY?.jobDetail?.titleJobDescription}
                    description={profile?.description}
                    employeeAmount={profile?.employeeAmount}
                    recruitmentAmount={profile?.recruitmentAmount}
                    averageSalary={profile?.averageSalary}
                  /> */}
                  <JobDescriptionTable
                    jobDescriptionList={jobDescriptionList}
                  />
                  <div className="w-full mt-4 flex gap-4 mb-5 justify-center xl:justify-start ">
                    <div className="w-fit">
                      <DescriptionItemEdit
                        maxLength={3}
                        title={'Số lượng nhân sự'}
                        description={`${profile.maxRecruitment || 0}`}
                        value={profile.maxRecruitment}
                        defaultDesc="Số lượng"
                        require={true}
                        width="xl:w-[230px] w-[162px]"
                      />
                    </div>
                    <div className="w-fit">
                      <DescriptionItemEdit
                        title={'Số lượng cần tuyển'}
                        description={profile.maxStaff}
                        width="xl:w-[230px] w-[162px]"
                      />
                    </div>
                    <div className="w-fit">
                      <DescriptionSalaryEdit
                        title={'Mức lương'}
                        value={profile.maxSalaryValue}
                        maxSalaryValue={profile.maxSalaryValue}
                        width="xl:w-[388px] w-[162px]"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {isShowChart && (
                    <RadarChart
                      isTemplate={true}
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
                      showApply={true}
                      // userProfile={userProfile}
                      isShowRadarChart={true}
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {benefitsList?.length > 0 && (
            <div className="bg-stoke mt-[-3.25rem] ">
              <div className="pt-[88px] pb-[72px]">
                <BenefitsPositionViewMode benefitsList={benefitsList} />
              </div>
            </div>
          )}
          {jobRequirement?.length > 0 && (
            <JobRequirementsPositionViewMode content={jobRequirement} />
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
                imageRole0="/images/Edit/soft_skill.png"
                imageRole1="/images/Edit/soft_skill.png"
                PROFILE_COMPANY={PROFILE_COMPANY}
                skillProfessional={skillNecessary}
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
                imageBoss="/images/Edit/hard_skill.png"
                PROFILE_COMPANY={PROFILE_COMPANY}
                skillNecessary={skillProfessional}
                roleId={roleId}
              />
            </div>
          )}
          {roadmapPosition?.length > 0 && (
            <div className="py-[76px]">
              <DevRoadmapPositionView positionList={roadmapPosition} />
            </div>
          )}
          {/* {departmentPositions?.length > 0 && (
            <div className="py-20 bg-white relative">
              <div className="absolute  w-full h-full z-10 top-0 "></div>

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
          )} */}
          {recruitment?.length > 0 && (
            <div className="bg-background-profile pt-[92px] pb-[92px] pl-5 pr-5 xl:pl-0 xl:pr-0 flex justify-center relative">
              <div className="absolute  w-full h-full z-10 top-0 "></div>

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
            <div className=" pb-[100px] bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0 relative">
              <div className="absolute  w-full h-full z-10 top-0 "></div>

              <div className="text-center mb-10">
                <p className="text-h2 text-neutral">
                  {PROFILE_COMPANY.titleRecruitDetail}
                </p>
              </div>
              <div>
                <RecruitList
                  isTemplate={true}
                  recruitmentCampaign={recruitment}
                  id={recruitment[0].id}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ModalUseTemplatePosition
