import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import BannerDetail from 'common/presentation/Pages/Profile-Company/BannerDetail'
import FieldDetail from 'common/presentation/Pages/Profile-Company/FieldDetail'
import InformationDetail from 'common/presentation/Pages/Profile-Company/InformationDetail'
import RecruitList from 'common/presentation/Pages/Profile-Company/RecruitList'
import dynamic from 'next/dynamic'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { createDepartment } from 'store/app/departmentSlice'
import {
  getAllDepartmentsEdit,
  updateDepartmentId
} from 'store/app/edit-mode-company/profile/teamListSlice'
import { delay } from 'store/helper/functionHelper'

const LineDetail = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/LineDetail')
)

const MessBlock = dynamic(() =>
  import('common/presentation/Pages/Profile-Company/MessBlock')
)
const ModalUseTemplateDepartment = ({
  handleToggleModal = () => {},
  handleToggleModalEdit = () => {}
}) => {
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

  const router = useRouter()
  const { companyId } = router.query
  const handleClickCreate = async () => {
    if (companyId) {
      const res = await dispatch(createDepartment({ companyId }))
      if (res?.payload?.data?.departmentId) {
        // window.location.replace(
        //   `/profile-company/${companyId}/${res?.payload?.data?.departmentId}/edit`
        // )
        handleToggleModal()
        dispatch(getAllDepartmentsEdit({ companyId }))
        toast(
          AlertSuccess({
            title: 'Đã tạo phòng ban thành công'
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
  const breadCrumbsTitle = () => {
    const titleBreadCrumbs = []
    titleBreadCrumbs.push(
      {
        name: profile_company?.name,
        href: `#`
      },

      {
        name: profile?.name,
        href: `/test`
      }
    )
    return titleBreadCrumbs
  }
  return (
    <div className="relative animate-bottomToTop h-screen pb-[80px]">
      <div
        className="flex justify-between py-4 px-10 sticky top-0 border-b border-grey-3"
        style={{
          filter: 'drop-shadow(0px 16px 24px rgba(0, 0, 0, 0.04))'
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
      <div className="overflow-y-scroll h-full">
        <div className="bg-white py-[20px] md:py-[60px] md:px-[150px] px-[20px] relative">
          <div className="max-w-[1140px] mx-auto relative">
            <div className="absolute  w-full h-full z-10 top-0 "></div>

            {profile && (
              <BannerDetail
                profile={profile}
                breadCrumbsTitle={breadCrumbsTitle()}
              />
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute bg-light-nude  w-full h-full z-[1]  top-0 "></div>
          <div className=" px-[16px] sm:px-0 max-w-[1140px] xl:flex sm:gap-[40px] gap-[36px] mx-auto sm:pt-[80px] pt-[20px] sm:pb-[114px] pb-[20px]">
            <div className="z-20">
              {profile && (
                <InformationDetail
                  title={PROFILE_COMPANY.detailCompany.titleIntroduceTeam}
                  profile={profile}
                />
              )}
            </div>
            <div className=" z-20 flex xl:flex-col sm:flex-row flex-col justify-start mt-[20px] sm:gap-[40px] gap-[20px] w-full xl:mt-0 sm:px-0 px-[28px]">
              {funFacts?.length > 0 && (
                <div className="bg-white rounded-[12px] p-[32px]">
                  <FieldDetail
                    FIELDETAIL={funFacts}
                    title={PROFILE_COMPANY.detailCompany.titleFactsContent}
                  />
                </div>
              )}
            </div>
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
        {departmentPositions?.length > 0 && (
          <div className="py-20 bg-white relative">
            <div className="absolute  w-screen h-full z-10 top-0 "></div>
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
          <div className="pt-[96px] pb-[100px]  bg-background-profile pl-5 pr-5 xl:pl-0 xl:pr-0 relative">
            <div className="absolute  w-screen h-full z-10 top-0 "></div>
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
  )
}

export default ModalUseTemplateDepartment
