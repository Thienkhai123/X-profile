import { async } from '@firebase/util'
import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import BannerDepartmentEdit from 'common/presentation/Pages/edit-mode-company/department/banner'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import FieldDetail from 'common/presentation/Pages/Profile-Company/FieldDetail'
import InformationDetail from 'common/presentation/Pages/Profile-Company/InformationDetail'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { createDepartment } from 'store/app/departmentSlice'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
const ImageSkill = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/ImageSkills')
)

const LineDetail = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/LineDetail')
)

const MessBlock = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/MessBlock')
)
const CreateDepartmentPage = () => {
  const trans = useTrans()
  const { DEPARTMENT_TEMPLATE, PROFILE_COMPANY } = trans || {}
  const {
    profile,
    profile_company,
    funFacts,
    comments,
    departmentPositions,
    recruitment
  } = DEPARTMENT_TEMPLATE || {}
  const dispatch = useDispatch()

  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.EDIT.CREATEDEPARTMENT)
  )
  const router = useRouter()
  const { companyId } = router.query
  const handleClickCreate = async () => {
    if (companyId) {
      const res = await dispatch(createDepartment({ companyId }))
      if (res?.payload?.data?.departmentId) {
        window.location.replace(
          `/profile-company/${companyId}/${res?.payload?.data?.departmentId}/edit`
        )
      }
    }
  }
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: profile_company?.name,
        href: `/test`
      },

      {
        name: profile?.name,
        href: `/test`
      }
    )
    return titleBreadCrumbs
  }
  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1 ">
        <Head>
          <title>Tạo phòng ban doanh nghiệp</title>
        </Head>

        <div className="relative">
          <div className="fixed w-screen h-full z-[99] top-0"></div>
          <div className="flex justify-end pr-14 bg-[#33333389] sticky top-[60px] z-[100] py-9 ">
            <Button
              title="Nhập thông tin phòng ban"
              width="w-[300px]"
              height="h-auto"
              rounded="rounded-[8px]"
              padding="p-[12px_32px]"
              color="text-white"
              textWeight="sm:text-p18-bold text-p14 font-bold"
              onClick={() => handleClickCreate()}
            />
          </div>
          <div className="bg-white py-[20px] md:py-[60px] md:px-[150px] px-[20px] relative">
            <div className="max-w-[1140px] mx-auto">
              {profile && (
                <BannerDetail
                  profile={profile}
                  breadCrumbsTitle={breadCrumbsTitle()}
                />
              )}
            </div>
          </div>
          <div className=" px-[16px] sm:px-0 max-w-[1140px] xl:flex sm:gap-[40px] gap-[36px] mx-auto sm:pt-[80px] pt-[20px] sm:pb-[114px] pb-[20px]">
            <div>
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
            <div className="flex xl:flex-col sm:flex-row flex-col justify-start mt-[20px] sm:gap-[40px] gap-[20px] w-full xl:mt-0 sm:px-0 px-[28px]">
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
                  Một vài lời nhắn gửi và chia sẻ từ các thành viên trong team
                  sẽ giúp bạn hiểu hơn về team và công ty chúng tôi!
                </p>
              </div>
              {comments?.length > 0 && <MessBlock comments={comments} />}
            </div>
          )}
          {departmentPositions?.length > 0 && (
            <div className="py-20 bg-white ">
              <div className="text-center mb-10">
                <p className="sm:text-h2 text-p20-bold text-neutral">
                  {PROFILE_COMPANY.titleLineTeam}
                </p>
              </div>
              {departmentPositions?.map((el, index) => {
                const { departmentPositions, row } = el

                return (
                  <div key={index} className="flex justify-center ">
                    <LineDetail
                      departmentPositions={departmentPositions}
                      isFirstRow={row === 0}
                    />
                  </div>
                )
              })}
            </div>
          )}
          {recruitment?.length > 0 && (
            <div className="pt-[96px] pb-[100px]  bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0">
              <div className="text-center mb-10">
                <p className="text-h2 text-neutral">
                  {trans.PROFILE_COMPANY.titleRecruitDetail}
                </p>
              </div>
              <div>
                <RecruitList
                  recruitmentCampaign={recruitment}
                  // isAuthentication={userProfile !== null}
                  id={recruitment[0]?.departmentId}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default CreateDepartmentPage
