import React, { useEffect, useRef, useState } from 'react'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import {
  getChildFaq,
  getCompanyCourse,
  getCompanyProfile,
  getFaqRoot,
  getViewCountCompany,
  hasEditPermission,
  hasEditPermissionByTagName,
  // selectCompanyCourse,
  selectCompanyQueries,
  selectFaq,
  selectProfileCompany,
  selectSidebar,
  updateBlockPositionsCompany,
  updateChooseId,
  // updateCompanyQueries,
  updateFaq,
  updateSideMenu
} from 'store/app/companySlice'
import { SliderThumb } from 'common/presentation/Swiper/SliderThumb'
import { useRouter } from 'next/router'
import isEmpty from 'lodash/isEmpty'
import { getSkillType, selectSkillType } from 'store/app/homeSlice'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import useTrans from 'common/hooks/useTrans'
import SideMenu from 'common/presentation/SideMenu'
import {
  chooseIdCompany,
  getPositionOffsetById,
  scrollToId,
  scrollToIdInElement
} from 'store/helper/functionHelper'
import useScrollPosition from 'common/hooks/useScrollPosition'
import useDebounce from 'common/hooks/useDebounce'
import { unwrapResult } from '@reduxjs/toolkit'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { ACCESS_TOKEN } from 'common/config/app.constants'
import { selectUserProfile } from 'store/app/userSlice'
const Banner = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/Banner')
)
const Statics = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/Statics')
)
const Information = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/Information')
)
const WorkDay = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/WorkDay')
)
const TeamList = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/TeamList')
)
const RecruitList = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/RecruitList')
)
// const DemandSkills = dynamic(() =>
//   import('common/presentation/Pages/home/DemandSkills')
// )
const Questions = dynamic(() =>
  import('common/presentation/Pages/Career-Path/Questions')
)

const ProfileCompanyDetail = () => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans
  const dispatch = useDispatch()
  const router = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const prevRef = useRef(null)
  const swiperRef = useRef(null)
  const nextRef = useRef(null)
  const { companyId } = router.query
  const scrollPosition = useScrollPosition()
  const {
    medias,
    profile,
    images,
    workingDays,
    departments,
    recruitmentCampaign,
    views
  } = useSelector(selectProfileCompany)
  const { meta } = profile || {}

  const { isShowDepartments, isShowFAQs, isShowCampaigns } = meta || {}
  // const course = useSelector(selectCompanyCourse)
  const queries = useSelector(selectCompanyQueries)
  // const skillType = useSelector(selectSkillType)
  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany, characterId } = userProfile || {}
  const { companyId: ownedCompanyId } = ownedCompany || {}
  const { blocksY, chooseId, sideMenu } = useSelector(selectSidebar)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.COMPANY.COURSE) ||
      selectLoading(state, APP_TYPES.COMPANY.ROOTFAQ) ||
      selectLoading(state, APP_TYPES.COMPANY.GETPROFILECOMPANY) ||
      selectLoading(state, APP_TYPES.HOME.GETSKILLTYPE)
    // selectLoading(state, APP_TYPES.COMPANY.HASEDITPERMISSION) ||
    // selectLoading(state, APP_TYPES.COMPANY.CHILDFAQ)
  )
  const isTyping = useSelector((state) =>
    selectLoading(state, APP_TYPES.COMPANY.CHILDFAQ)
  )
  const faqs = useSelector(selectFaq)
  const { highlight, name } = profile || {}
  const { skillEnumType } = queries || {}

  const debouncedScroll = useDebounce(scrollPosition, 20)

  const handleStep = async (ID) => {
    scrollToId(`block-${ID}`)
  }

  const handlechooseId = (ID) => {
    dispatch(updateChooseId(ID))
  }

  useEffect(() => {
    if (companyId) {
      const handleGetFaq = async () => {
        const fetchFaq = await dispatch(getFaqRoot({ companyId: companyId }))
        const res = unwrapResult(fetchFaq)
        if (res.data) {
          dispatch(
            updateBlockPositionsCompany(getPositionOffsetById(6, 'block'))
          )
        } else {
          const cloneSideMenu = [...sideMenu]
          cloneSideMenu.pop()
          dispatch(updateSideMenu(cloneSideMenu))
          dispatch(
            updateBlockPositionsCompany(getPositionOffsetById(5, 'block'))
          )
        }
      }

      dispatch(
        getCompanyCourse({
          companyId: companyId,
          skillEnumType: '0'
        })
      )
      dispatch(
        getViewCountCompany({
          tag: companyId
        })
      )
      if (isNaN(companyId)) {
        dispatch(
          getCompanyProfile({
            id: companyId
          })
        )
      }
      handleGetFaq()
      dispatch(getSkillType())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [companyId])
  useEffect(() => {
    const checkOwner = async () => {
      if (companyId) {
        if (isNaN(companyId)) {
          const res = await dispatch(hasEditPermissionByTagName({ companyId }))
          if (res?.payload?.isSuccess) {
            window.location.replace(
              `/profile-company/${userProfile?.ownedCompany?.companyId}/edit`
            )
          }
        } else {
          const res = await dispatch(hasEditPermission({ companyId }))

          if (res?.payload?.isSuccess) {
            window.location.replace(`/profile-company/${companyId}/edit`)
          } else {
            window.location.replace(`/`)
          }
        }
      }
    }
    checkOwner()
  }, [companyId])

  // useEffect(() => {
  //   if (activeIndex > 0) {
  //     setActiveIndex(activeIndex + 1)
  //     const swiper = swiperRef?.current?.swiper
  //     swiper?.slideTo(activeIndex + 1)
  //   } else {
  //     setActiveIndex(activeIndex + 1)
  //   }
  // }, [highlight?.length])
  const convertSideMenu = () => {
    const menu = []
    let number = 1
    const block = [
      '#block-0',
      '#block-1',
      '#block-2',
      '#block-3',
      '#block-4',
      '#block-5'
    ]
    const blockData = [
      profile !== {},
      medias.length > 0,
      workingDays.length > 0,
      departments.length > 0,
      recruitmentCampaign.length > 0,
      faqs.length > 0
    ]
    sideMenu.map((e, ind) => {
      if (e.href === block[ind]) {
        const tempItem = {
          ...sideMenu[ind],
          isActive: blockData[ind],
          numberTitle: blockData[ind] === true ? `0${number++}` : e.numberTitle
        }
        menu.push(tempItem)
      }
    })
    return menu
  }

  useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    let tokenRedirect = params.get('token')
    if (tokenRedirect) {
      const pathname = window.location.pathname
      localStorage.setItem(ACCESS_TOKEN, tokenRedirect)
      window.location.replace(pathname)
    }
  }, [])

  useEffect(() => {
    if (queries) {
      dispatch(
        getCompanyCourse({
          companyId: companyId,
          skillEnumType: queries?.skillEnumType || '0'
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queries])

  useEffect(() => {
    if (!isEmpty(profile)) {
      chooseIdCompany(scrollPosition, blocksY, handlechooseId, chooseId)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedScroll])

  if (profile && Object?.keys(profile)?.length === 0) {
    return <div className="flex-1"></div>
  }

  if (!profile) {
    return (
      <div className="flex-1 py-[40px]">
        <p className="text-h2 text-neutral text-center ">
          Không tìm thấy thông tin doanh nghiệp
        </p>
      </div>
    )
  }

  const checkHighlight = () => {
    const isActiveList = []
    highlight?.map((item, ind) => {
      const { content, imageId, imageUrl, title } = item
      const isActive = content !== '' && imageUrl !== ''
      isActiveList.push(isActive)
    })
    const isActive = isActiveList.find((e) => e === true)
    if (isActive === true) {
      return true
    } else {
      return false
    }
  }
  return (
    <>
      {loading && <LoadingRole />}
      <div>
        <Head>
          <title>{(profile?.name || 'Company') + ' - X-Profile'}</title>
        </Head>
        {profile && (
          <div className="flex justify-center   h-auto">
            <Banner profile={profile} seenNumber={views} />
          </div>
        )}

        <div id="block-0">
          {profile && (
            <div className="flex justify-center xl:pt-[116px] pt-[20px] px-5 xl:px-0 mb-10">
              <Information
                profile={profile}
                listImages={images}
                title={PROFILE_COMPANY.profileCompany.titleInformation}
                titleMoreButton={PROFILE_COMPANY.profileCompany.titleMoreButton}
                titleMapButon={PROFILE_COMPANY.profileCompany.titleMapButton}
              />
            </div>
          )}
        </div>

        {checkHighlight() && (
          <div className="flex justify-center  bg-stoke h-auto xl:pt-[88px] xl:pb-[60px] py-[40px] px-5 xl:px-0">
            <Statics
              prevRef={prevRef}
              activeIndex={activeIndex}
              nextRef={nextRef}
              highlight={highlight}
              highlightTitle={profile?.meta?.highlightTitle}
            />
          </div>
        )}

        <div id="block-1">
          {medias.length > 0 && (
            <div className="relative">
              <div className="absolute left-0 top-[50%] md:block hidden">
                <Image
                  alt=""
                  placeholder="blur"
                  blurDataURL="/images/profileCompanyLeft.png"
                  src="/images/profileCompanyLeft.png"
                  width={138}
                  height={138}
                  quality={100}
                />
              </div>
              <div className="absolute right-0 -bottom-60 md:block hidden z-10">
                <Image
                  alt=""
                  placeholder="blur"
                  blurDataURL="/images/profileComanyRightBottom.png"
                  src="/images/profileComanyRightBottom.png"
                  width={138}
                  height={138}
                  quality={100}
                />
              </div>

              <div className="text-center xl:mb-10 mb-[12px] xl:pt-[80px] pt-[20px] relative">
                <div className="absolute right-10 -bottom-5 md:block hidden">
                  <Image
                    alt=""
                    placeholder="blur"
                    blurDataURL="/images/profileComanyRightTop.png"
                    src="/images/profileComanyRightTop.png"
                    width={112}
                    height={112}
                    quality={100}
                  />
                </div>
                <p className="xl:text-h2 text-neutral text-p20-bold">
                  {PROFILE_COMPANY.profileCompany.titleCulture}
                </p>
              </div>
              {!isEmpty(medias) && (
                <div className="max-w-[500px] md:max-w-[800px] xl:max-w-[946px] mx-auto mt-[20px] xl:mb-[100px] px-5 xl:px-0">
                  <SliderThumb
                    breakpoints={{
                      330: {
                        slidesPerView: 1.5,
                        slidesPerGroup: 1
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
                    hasArrow
                    list={medias}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div id="block-2">
          {workingDays.length > 0 && (
            <div className="pt-[64px] ">
              <WorkDay
                title={PROFILE_COMPANY.profileCompany.titleWorkDay}
                description={profile?.meta?.workingDayCaption}
                workingDays={workingDays}
                stylePage={1}
              />
            </div>
          )}
        </div>
        {isShowDepartments && (
          <div id="block-3">
            {departments.length > 0 && (
              <div>
                <div className="text-center xl:pt-[92px] pt-[32px] xl:mb-0 mb-[20px] xl:px-0 px-[16px]">
                  <p className="xl:text-h2 text-p20-bold text-neutral">
                    {PROFILE_COMPANY.profileCompany.titleTeam + ' ' + name}
                  </p>
                </div>
                <div className="max-w-[1140px] mx-auto xl:pb-12 pb-[32px] px-0">
                  <TeamList
                    departments={departments}
                    handleAction={(departmentId) =>
                      router.push(router.asPath + '/' + departmentId)
                    }
                  />
                </div>
              </div>
            )}
          </div>
        )}

        <div id="block-4">
          {recruitmentCampaign.length > 0 && isShowCampaigns && (
            <div className="xl:pt-[53px] py-5 xl:pb-[83px] bg-background-profile xl:pl-0 xl:pr-0 px-5 xl:px-0">
              <div className="text-center  ">
                <p className="xl:text-h2 text-p20-bold text-neutral">
                  {PROFILE_COMPANY.profileCompany.titleRecruit}
                </p>
              </div>
              <div className="max-w-[1140px] mx-auto ">
                {recruitmentCampaign.length > 0 && (
                  <RecruitList
                    recruitmentCampaign={recruitmentCampaign}
                    isAuthentication={userProfile !== null}
                    ownedCompany={
                      (ownedCompanyId !== null && characterId === 2) ||
                      characterId === 2
                    }
                  />
                )}
                {recruitmentCampaign.length === 0 && (
                  <p className="xl:text-p18 text-p14">
                    {PROFILE_COMPANY.profileCompany.titleEmptyRecruitment}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>

        {/* <div id="block-5" className="flex justify-center py-[120px]">
        <DemandSkills
          title={PROFILE_COMPANY.profileCompany.titleDemandSkills}
          type="profileCompany"
          courses={course}
          skillEnumType={skillEnumType}
          setSkillEnumType={(value) => {
            dispatch(updateCompanyQueries({ skillEnumType: value }))
          }}
          skillTypes={skillType}
          isLoading={loading}
          height="h-[331px]"
        />
      </div> */}
        {isShowFAQs && (
          <div id="block-5">
            {faqs.length > 0 && (
              <div className="xl:flex xl:justify-center w-full xl:pt-[120px] xl:pb-[120px] px-5 xl:px-0 pb-10 pt-10 bg-background-profile">
                {!isEmpty(faqs) && (
                  <Questions
                    faqs={faqs}
                    handleAnswer={async (content, id) => {
                      if (!isTyping) {
                        dispatch(updateFaq({ content: content, type: 2 }))
                        await dispatch(
                          getChildFaq({
                            companyId: companyId,
                            faqAnswerId: id,
                            event: () => scrollToIdInElement('wrapper-faqs')
                          })
                        )
                        scrollToIdInElement('wrapper-faqs')
                      }
                    }}
                    isTyping={isTyping}
                    titleQuestions={
                      PROFILE_COMPANY.profileCompany.titleQuestions
                    }
                  />
                )}
              </div>
            )}
          </div>
        )}

        <div className="fixed top-1/3 m-2 z-[900] hidden xl:block">
          {convertSideMenu()?.map((p, index) => {
            return (
              <div className="mb-1" key={index}>
                {p.isActive && (
                  <SideMenu
                    element={p}
                    handleStep={handleStep}
                    chooseId={chooseId}
                    id={p?.id}
                    numberTitle={p?.numberTitle}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default ProfileCompanyDetail
