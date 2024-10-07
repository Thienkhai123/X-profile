import React, { useEffect } from 'react'
import Head from 'next/head'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import InformationDetail from 'common/presentation/Pages/Profile-Company/InformationDetail'
import FieldDetail from 'common/presentation/Pages/Profile-Company/FieldDetail'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import useTrans from 'common/hooks/useTrans'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllDepartment,
  getViewCountDepartment,
  selectAllDepartment,
  selectFunfact,
  selectSkillDepartment
} from 'store/app/departmentSlice'
import { SwiperSlide } from 'swiper/react'
import { SimpleSlider } from 'common/presentation/Swiper/SimpleSlider'
import { selectUserProfile } from 'store/app/userSlice'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import useScrollPosition from 'common/hooks/useScrollPosition'
import useDebounce from 'common/hooks/useDebounce'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import {
  hasEditPermission,
  hasEditPermissionByTagName
} from 'store/app/companySlice'

const ImageSkill = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/ImageSkills')
)

const LineDetail = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/LineDetail')
)

const MessBlock = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/MessBlock')
)

const DetailCompany = () => {
  const trans = useTrans()
  const { PROFILE_COMPANY } = trans
  const dispatch = useDispatch()
  const { push, query, asPath } = useRouter()
  const { departmentId, companyId } = query
  const {
    profile,
    profileCompany,
    images,
    comments,
    departmentPositions,
    recruitment,
    views
  } = useSelector(selectAllDepartment)
  const funFacts = useSelector(selectFunfact)
  const skills = useSelector(selectSkillDepartment)
  const userProfile = useSelector(selectUserProfile)
  const { ownedCompany, characterId } = userProfile || {}
  const { companyId: ownedCompanyId } = ownedCompany || {}
  const scrollPosition = useScrollPosition()
  const debouncedScroll = useDebounce(scrollPosition, 20)
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.DEPARTMENT.GETALLDEPARTMENT)
  )
  const { avatarUrl: avatarCompany } = profileCompany || {}
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: profileCompany?.name,
        href: `profile-company/${profileCompany?.tag}`
      },

      {
        name: profile?.name,
        href: `profile-company/${profileCompany?.tag}/${profile?.departmentId}`
      }
    )
    return titleBreadCrumbs
  }

  const handleLink = (id) => {
    if (id) {
      push(`${asPath}/${id}`)
    }
  }

  useEffect(() => {
    if (departmentId) {
      const checkOwner = async () => {
        if (isNaN(parseInt(companyId))) {
          const res = await dispatch(hasEditPermissionByTagName({ companyId }))
          if (res?.payload?.isSuccess) {
            window.location.replace(
              `/profile-company/${userProfile?.ownedCompany?.companyId}/${departmentId}/edit`
            )
          }
        } else {
          const res = await dispatch(hasEditPermission({ companyId }))

          if (res?.payload?.isSuccess) {
            window.location.replace(
              `/profile-company/${companyId}/${departmentId}/edit`
            )
          }
        }
      }
      checkOwner()
      dispatch(
        getViewCountDepartment({
          tag: companyId,
          departmentId: departmentId
        })
      )
      dispatch(getAllDepartment(query))
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [departmentId])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedScroll])
  if (!profile?.isActive && profileCompany?.tag) {
    window.location.replace(`/profile-company/${profileCompany?.tag}`)
  }
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
      <div>
        <Head>
          <title>
            {(profile?.name || 'Team') +
              (`-${profileCompany?.name}` || '') +
              ' - XProfile'}
          </title>
        </Head>
        <div className="bg-white py-[20px] md:py-[60px] md:px-[150px] px-[20px] relative">
          <div className="max-w-[1140px] mx-auto">
            {profile && (
              <BannerDetail
                profile={profile}
                breadCrumbsTitle={breadCrumbsTitle()}
                seenNumber={views}
              />
            )}
          </div>
        </div>
        <div className=" px-0 max-w-[1140px] xl:flex items-start sm:gap-[40px] gap-[36px] mx-auto sm:py-9 py-5">
          <div className="md:w-1/2 w-full md:mb-0 mb-4">
            {profile && (
              <InformationDetail
                title={PROFILE_COMPANY.detailCompany.titleIntroduceTeam}
                profile={profile}
              />
            )}
            {/* <div className="mt-[44px] sm:w-[746px] w-full mx-auto sm:block  hidden">
            {images?.length > 0 && (
              <SimpleSlider hasArrow={images?.length > 1}>
                {images?.map((image) => {
                  const { imageId, imageUrl } = image
                  return (
                    <SwiperSlide key={`department-image-skill-${imageId}`}>
                      <div className="sm:w-[746px] w-full sm:h-[372px] relative rounded-[8px] overflow-hidden cursor-pointer">
                        {imageUrl && <ImageSkill src={imageUrl} />}
                      </div>
                    </SwiperSlide>
                  )
                })}
              </SimpleSlider>
            )}
          </div> */}
          </div>
          <div className="flex xl:flex-col sm:flex-row flex-col md:w-1/2 w-full  justify-start mt-[20px] sm:gap-[40px] gap-[20px]  xl:mt-0 sm:px-0 px-[28px]">
            {funFacts?.length > 0 && (
              <div className="bg-white rounded-[12px] p-[32px]">
                <FieldDetail
                  FIELDETAIL={funFacts}
                  title={PROFILE_COMPANY.detailCompany.titleFactsContent}
                />
              </div>
            )}
            {/* {skills?.length > 0 && (
            <div className="bg-white rounded-[12px] p-[32px]">
              <FieldDetail
                FIELDETAIL={skills}
                title={PROFILE_COMPANY.detailCompany.titleSkillContent}
              />
            </div>
          )} */}
          </div>
        </div>

        {comments?.length > 0 && (
          <div className="relative sm:pb-[98px] pb-[52px] sm:pt-[88px] pt-[40px] bg-stoke">
            <div className="hidden xl:block absolute right-20">
              <Image
                src={'/images/banner-profile-top.png'}
                width={91.43}
                height={95.13}
                objectFit="contain"
                alt=""
              />
            </div>
            <div className="hidden xl:block absolute left-0 -bottom-1">
              <Image
                src={'/images/bearBossBackground.png'}
                width={405}
                height={389}
                objectFit="contain"
                alt=""
              />
            </div>

            <div className="text-center mb-10 mx-auto max-w-[900px] sm:px-0 px-[16px]">
              <p className="sm:text-h2 text-p20-bold text-neutral">
                {PROFILE_COMPANY.detailCompany.titleMeetingDetail}{' '}
                {profile?.name}
              </p>
              <p className="sm:text-p18 text-p12 text-grey-1 mt-5 sm:px-0 px-[28px]">
                Một vài lời nhắn gửi và chia sẻ từ các thành viên trong team sẽ
                giúp bạn hiểu hơn về team và công ty chúng tôi!
              </p>
            </div>
            {comments?.length > 0 && <MessBlock comments={comments} />}
          </div>
        )}
        {departmentPositions.length > 0 && (
          <div
            className={`xl:pt-[88px] pt-10 xl:pb-[60px] pb-10 ${
              recruitment?.length > 0 ? 'bg-white' : 'bg-light-nude '
            }`}
          >
            <div className="text-center ">
              <p className="sm:text-h2 text-p20-bold text-neutral">
                {PROFILE_COMPANY.titleLineTeam}
              </p>
            </div>
            {departmentPositions.map((el, index) => {
              const { departmentPositions, row } = el
              return (
                <div key={index} className="flex justify-center ">
                  <LineDetail
                    handle={handleLink}
                    departmentPositions={departmentPositions}
                    isFirstRow={row === 0}
                    avatarCompany={avatarCompany}
                  />
                </div>
              )
            })}
          </div>
        )}
        {recruitment?.length > 0 && (
          <div className="xl:pt-[96px] pt-10 xl:pb-[46px] pb-10  bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0">
            <div className="text-center ">
              <p className="xl:text-h2 text-p20-bold text-neutral">
                {trans.PROFILE_COMPANY.titleRecruitDetail}
              </p>
            </div>
            <div>
              <RecruitList
                recruitmentCampaign={recruitment}
                isAuthentication={userProfile !== null}
                id={departmentId}
                ownedCompany={
                  (ownedCompanyId !== null && characterId === 2) ||
                  characterId === 2
                }
              />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default DetailCompany
