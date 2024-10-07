import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import JobInformation from 'common/presentation/Pages/Profile-Company/InformationJob'
import RadarChart from 'common/presentation/Pages/Profile-Company/RadarChart'
import LineDetail from 'common/presentation/Pages/Profile-Company/LineDetail'
import { LINES } from 'common/presentation/Pages/Demo/constants'
import ContentDayJob from 'common/presentation/Pages/Profile-Company/ContentDayJob'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import NewPaperJob from 'common/presentation/Pages/Profile-Company/NewsPaperJob'
import useTrans from 'common/hooks/useTrans'
import { useRouter } from 'next/router'
import {
  getDepartmentPosition,
  getUserStatus,
  getViewCountDepartmentPosition,
  selectDepartmentPosition,
  selectUserStatus
} from 'store/app/departmentPositionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Fragment } from 'react'
import { selectUserProfile } from 'store/app/userSlice'
import SkillSoft from 'common/presentation/Pages/Profile-Company/SkillSoft'
import SkillAdvenced from 'common/presentation/Pages/Profile-Company/SkillAdvanced'
import useScrollPosition from 'common/hooks/useScrollPosition'
import useDebounce from 'common/hooks/useDebounce'
import Modal from 'common/presentation/Modal'
import ApplyModal from 'common/presentation/Pages/Profile-Company/ApplyModal'
import { NotificationModal } from 'common/presentation/Notification/Modal'
import { async } from '@firebase/util'
import { canApply, sendApply } from 'store/app/campaign'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import DevRoadmapPositionViewItem from 'common/presentation/Pages/edit-mode-company/position/devRoadmapPosition/devRoadmapPositionViewItem'
import DevRoadmapPositionView from 'common/presentation/Pages/edit-mode-company/position/devRoadmapPosition/devRoadmapPositionView'
import BenefitsPositionViewMode from 'common/presentation/Pages/edit-mode-company/position/benefits/benefitsPositionViewMode'
import {
  hasEditPermission,
  hasEditPermissionByTagName
} from 'store/app/companySlice'
import { getExamBySkill } from 'store/app/examSlice'
import { toast } from 'react-toastify'
import { ToastError } from 'common/presentation/Notification/Toast/ToastError'
import { unwrapResult } from '@reduxjs/toolkit'
import JobRequirementsPositionViewMode from 'common/presentation/Pages/edit-mode-company/position/job-requirements/jobRequirementsPositionViewMode'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import { getAllUserSkill } from 'store/app/portfolioSlice'

const DetailJob = () => {
  const trans = useTrans()
  const dispatch = useDispatch()
  const router = useRouter()
  const scrollPosition = useScrollPosition()
  const debouncedScroll = useDebounce(scrollPosition, 20)
  const departmentPosition = useSelector(selectDepartmentPosition)

  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany, characterId } = userProfile || {}
  const { companyId: ownedCompanyId } = ownedCompany || {}
  const {
    profile,
    profileDepartment,
    profileCompany,
    recruitment,
    skillNecessary,
    skillProfessional,
    departmentPositions,
    roleId,
    views
  } = departmentPosition
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.CAMPAIGN.CANAPPLY) ||
      selectLoading(state, APP_TYPES.DEPARTMENTPOSITION.PROFILE)
  )
  const { PROFILE_COMPANY } = trans
  const { departmentPositionId, departmentId, companyId } = router.query
  const { isShowChart, userMatchingPercentage, skills, name, meta } =
    profile || {}
  const { benefits, careerPaths } = meta || {}
  const { applyBannerUrl } = profileCompany?.meta || {}

  const { recruitmentCampaignId } =
    recruitment.find(
      (e) => e.departmentPositionId === parseInt(departmentPositionId)
    ) || {}

  const [applyModal, setApplyModal] = useState({
    open: false,
    success: false,
    error: false,
    errorMessage: 'Có lỗi xảy ra!'
  })

  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    if (profileDepartment?.isActive) {
      titleBreadCrumbs.push(
        {
          name: profileCompany.name,
          href: `profile-company/${profileCompany.tag}`
        },
        {
          name: profileDepartment.name,
          href: `profile-company/${profileCompany.tag}/${profileDepartment.departmentId}`
        },
        {
          name: profile.name,
          href: `profile-company/${profileCompany.tag}/${profileDepartment.departmentId}/${profile.departmentPositionId}`
        }
      )
    } else {
      titleBreadCrumbs.push(
        {
          name: profileCompany.name,
          href: `profile-company/${profileCompany.tag}`
        },
        {
          name: profile.name,
          href: `profile-company/${profileCompany.tag}/${profileDepartment.departmentId}/${profile.departmentPositionId}`
        }
      )
    }
    return titleBreadCrumbs
  }
  const toggleModal = () => {
    setApplyModal({ ...applyModal, open: !applyModal.open })
  }

  const checkApply = async () => {
    if (userProfile) {
      const res = await dispatch(
        canApply({
          recruitmentCampaignId: recruitmentCampaignId
        })
      )
      if (res?.payload?.data === 0 || res?.payload?.data === null) {
        setApplyModal({ ...applyModal, open: true })
      }
      if (res?.payload?.data === 1) {
        toast(
          AlertWaring({
            title: 'Tài khoản của bạn đã bị khóa!'
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
      if (res?.payload?.data === 2) {
        setApplyModal({
          ...applyModal,
          error: true,
          open: false,
          errorMessage: 'Bạn đã ứng tuyển vị trí này rồi!'
        })
      }
      if (res?.payload?.data === 3) {
        toast(
          AlertWaring({
            title: 'Tin tuyển dụng không hợp lệ hoặc đã hết hạn!'
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
      window.location.replace(
        `/sign-in?companyId=${companyId}&departmentId=${departmentId}&departmentPositionId=${departmentPositionId}`
      )
    }
  }

  const handleDoExam = async (skillId) => {
    if (userProfile) {
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
      window.location.replace(
        `/sign-in?companyId=${companyId}&departmentId=${departmentId}&departmentPositionId=${departmentPositionId}`
      )
    }
  }

  const handleSub = (id) => {
    if (id !== undefined) {
      window.location.href = `${id}`
    }
  }

  useEffect(() => {
    const checkOwner = async () => {
      if (isNaN(parseInt(companyId))) {
        const res = await dispatch(hasEditPermissionByTagName({ companyId }))
        if (res?.payload?.isSuccess) {
          window.location.replace(
            `/profile-company/${userProfile?.ownedCompany?.companyId}/${departmentId}/${departmentPositionId}/edit`
          )
        }
      } else {
        const res = await dispatch(hasEditPermission({ companyId }))

        if (res?.payload?.isSuccess) {
          window.location.replace(
            `/profile-company/${companyId}/${departmentId}/${departmentPositionId}/edit`
          )
        }
      }
    }
    checkOwner()
  }, [dispatch])

  useEffect(() => {
    if (departmentPositionId) {
      dispatch(
        getDepartmentPosition({
          id: departmentPositionId,
          departmentId: departmentId,
          companyId: companyId
        })
      )
      dispatch(
        getViewCountDepartmentPosition({
          departmentPositionId: departmentPositionId,
          tag: companyId
        })
      )
      dispatch(getAllUserSkill())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentPositionId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedScroll])

  if (!profile) {
    return (
      <div className="flex-1">
        <p className="text-h2 text-neutral text-center mt-[40px]">
          Không tìm thấy thông tin
        </p>
      </div>
    )
  }

  return (
    <>
      {loading && <LoadingRole />}
      <Fragment>
        <div>
          <Head>
            <title>
              {(profile?.name || 'Position') +
                (`-${profileDepartment.name}` || '') +
                (`-${profileCompany?.name}` || '') +
                ' - XProfile'}
            </title>
            <meta
              property="og:image"
              content={profile?.meta?.avatarUrl || profile?.imageUrl}
            />
          </Head>
          {profile && (
            <div className="flex justify-center bg-white h-full xl:py-[60px]  xl:px-0  px-5 py-10 relative ">
              <BannerDetail
                checkApply={checkApply}
                recruitmentCampaignId={recruitmentCampaignId}
                applyModal={applyModal}
                profile={profile}
                breadCrumbsTitle={breadCrumbsTitle()}
                showApply={
                  recruitment?.length > 0 &&
                  !ownedCompanyId &&
                  characterId !== 2
                }
                seenNumber={views}
              />
            </div>
          )}
          {profile && (
            <div className="flex justify-center xl:pt-20 xl:pb-[100px] py-10 xl:px-0 px-[16px]">
              <div className="flex flex-wrap gap-[40px] md:flex-nowrap max-w-[1140px] justify-center xl:justify-start">
                <div className="mb-5 xl:mb-0">
                  <JobInformation
                    title={PROFILE_COMPANY.jobDetail.titleJobDescription}
                    description={profile?.description}
                    employeeAmount={profile?.employeeAmount}
                    recruitmentAmount={profile?.recruitmentAmount}
                    averageSalary={profile?.averageSalary}
                    maxSalary={profile?.maxSalary}
                    descriptionTable={profile?.meta?.descriptionTable}
                  />
                </div>
                <div className="xl:pt-[68px]">
                  <RadarChart
                    skills={[...skillNecessary, ...skillProfessional]}
                    title={PROFILE_COMPANY.jobDetail.titleRelevance}
                    numeral={userMatchingPercentage}
                    titleApplyButton={
                      PROFILE_COMPANY.jobDetail.titleRelevanceButton
                    }
                    descriptionDefault={
                      PROFILE_COMPANY.jobDetail.descriptionRelevance
                    }
                    titleButton={PROFILE_COMPANY.jobDetail.titleApplyJob}
                    handleApply={checkApply}
                    showApply={
                      recruitment?.length > 0 &&
                      !ownedCompanyId &&
                      characterId !== 2
                    }
                    userProfile={userProfile}
                    isShowRadarChart={
                      skillNecessary?.filter((el) => el?.isDisplayChart)
                        .length +
                        skillProfessional?.filter((el) => el?.isDisplayChart)
                          .length >=
                      3
                    }
                  />
                </div>
              </div>
            </div>
          )}
          {benefits?.length > 0 && (
            <div className="bg-stoke xl:py-12 py-10">
              <BenefitsPositionViewMode benefitsList={benefits} />
            </div>
          )}
          {profile?.meta?.requirement && (
            <div className="bg-white">
              <div className="py-9 px-10">
                <JobRequirementsPositionViewMode
                  content={profile?.meta?.requirement}
                />
              </div>
            </div>
          )}
          {skillNecessary.length > 0 && (
            <div
              className={`flex justify-center xl:py-20  xl:px-0  px-5 py-10 ${
                roleId === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
              }`}
            >
              <SkillSoft
                imageRole0="/images/Edit/soft_skill.png"
                imageRole1="/images/Edit/soft_skill.png"
                title={PROFILE_COMPANY?.jobDetail.titleGenaralSkillsJob}
                description={
                  PROFILE_COMPANY?.jobDetail.descriptionGenaralSkillsJob
                }
                PROFILE_COMPANY={PROFILE_COMPANY}
                skillProfessional={skillNecessary}
                roleId={roleId}
                handleDoExam={handleDoExam}
                canDoExam={true}
              />
            </div>
          )}
          {skillProfessional.length > 0 && (
            <div className="flex justify-center xl:py-20  xl:px-0  px-5 py-10 bg-light-blue">
              <SkillAdvenced
                imageBoss="/images/Edit/hard_skill.png"
                title={PROFILE_COMPANY?.jobDetail?.titleAdvancedSkillsJob}
                description={
                  PROFILE_COMPANY?.jobDetail?.descriptionAdvancedSkillsJob
                }
                PROFILE_COMPANY={PROFILE_COMPANY}
                skillNecessary={skillProfessional}
                roleId={roleId}
                handleDoExam={handleDoExam}
                canDoExam={true}
              />
            </div>
          )}
          {careerPaths?.length > 0 && (
            <div
              className={`xl:py-20 py-10 ${
                recruitment?.length > 0 ? 'bg-white' : 'bg-light-nude'
              }  `}
            >
              {/* {departmentPositions.map((el, index) => {
                const { departmentPositions, row } = el
                const { meta } = departmentPositions[0] || {}
                const { careerPaths } = meta || {} */}

              {/* return ( */}
              <div className="xl:flex justify-center ">
                <DevRoadmapPositionView positionList={careerPaths} />
              </div>
              {/* )
              })} */}
            </div>
          )}
          {recruitment?.length > 0 && (
            <div className="bg-background-profile pt-[92px] pb-[92px] pl-5 pr-5 xl:pl-0 xl:pr-0 flex justify-center">
              <ContentDayJob
                name={profileCompany?.name}
                title={PROFILE_COMPANY.jobDetail.titleApplyJob}
                titleDay={PROFILE_COMPANY.jobDetail.day}
                titleButton={PROFILE_COMPANY.jobDetail.titleApplyButton}
                handleApply={checkApply}
                showApply={
                  recruitment?.length > 0 &&
                  !ownedCompanyId &&
                  characterId !== 2
                }
                applyBannerUrl={applyBannerUrl}
              />
            </div>
          )}

          {recruitment.length > 0 && (
            <div className=" xl:pb-[106px] bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0">
              <div className="text-center ">
                <p className="xl:text-h2 text-p20-bold text-neutral">
                  {PROFILE_COMPANY.titleRecruitDetail}
                </p>
              </div>
              <div>
                <RecruitList
                  recruitmentCampaign={recruitment}
                  id={departmentId}
                  isAuthentication={userProfile !== null}
                  ownedCompany={
                    (ownedCompanyId !== null && characterId === 2) ||
                    characterId === 2
                  }
                />
              </div>
            </div>
          )}
          {/* <div className="px-5 xl:pt-[72px] xl:pb-[60px] py-5 xl:py-4 h-auto bg-neutral flex justify-center">
          <NewPaperJob
            title={PROFILE_COMPANY.jobDetail.titleNewPaper}
            description={PROFILE_COMPANY.jobDetail.descriptionNewPaper1}
            description2={PROFILE_COMPANY.jobDetail.descriptionNewPaper2}
            placeholder={PROFILE_COMPANY.jobDetail.placeholder}
            titleButton={PROFILE_COMPANY.jobDetail.titleFollowButton}
            name={profileCompany?.name}
            logoCompany={profileCompany?.avatarUrl}
          />
        </div> */}
          <Modal
            toggleModal={toggleModal}
            open={applyModal.open}
            modalStyle="w-[100vw] h-[100vh] p-2  px-[20px] flex justify-center items-center fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)] z-[9999]"
            childStyle="w-screen h-fit sm:w-[800px] mt-4 shadow-md p-4 bg-white rounded-lg max-h-[85vh] overflow-y-scroll custom-scrollbar"
          >
            <ApplyModal
              profile={profile}
              profileCompany={profileCompany}
              recruitment={recruitment}
              departmentPositionId={router?.query?.departmentPositionId}
              setApplyModal={setApplyModal}
              applyModal={applyModal}
            />
          </Modal>
          <NotificationModal
            icon="tick"
            title={trans.MESSAGE?.applyCVSuccess?.title}
            description={trans.MESSAGE?.applyCVSuccess?.description}
            btnClickTitle={trans.MESSAGE?.applyCVSuccess?.buttonClick}
            btnCancelTitle={trans.MESSAGE?.applyCVSuccess?.buttonCancel}
            open={applyModal.success}
            onClick={() => {
              router.push('/applicant-profile')
            }}
            onCancel={() =>
              setApplyModal({
                ...applyModal,
                success: false
              })
            }
            onCloseModal={() =>
              setApplyModal({
                ...applyModal,
                success: !applyModal.success
              })
            }
          />
          <NotificationModal
            icon="cancelModal"
            title={trans.MESSAGE?.applyCVError?.title}
            description={
              applyModal?.errorMessage ||
              trans.MESSAGE?.applyCVError?.description
            }
            // btnClickTitle={trans.MESSAGE?.applyCVError?.buttonClick}
            // btnCancelTitle={trans.MESSAGE?.applyCVError?.buttonCancel}
            // btnClickTitle={trans.MESSAGE?.applyCVError?.buttonCancel}
            open={applyModal.error}
            hiddenClickButton={true}
            onClick={() =>
              setApplyModal({
                ...applyModal,
                error: false
              })
            }
            onCloseModal={() =>
              setApplyModal({
                ...applyModal,
                error: !applyModal.error
              })
            }
          />
        </div>
      </Fragment>
    </>
  )
}

export default DetailJob
