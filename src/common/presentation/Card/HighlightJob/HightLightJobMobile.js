import Image from 'next/image'
import PropTypes from 'prop-types'
import Badge from 'common/presentation/Badge'
import { delay, getDaysAgo, styleOfJob } from 'store/helper/functionHelper'
import { DEFAULT_AVATAR } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import { useDispatch } from 'react-redux'
import {
  changeUserFavoriteCampaign,
  getAllFavoriteCampaigns
} from 'store/app/campaign'
import { useSelector } from 'react-redux'
import {
  getProfile,
  selectUserProfile,
  updateProfile
} from 'store/app/userSlice'
import { toast } from 'react-toastify'
import { Divider } from 'common/presentation/Divider'
import { ToastSuccess } from 'common/presentation/Notification/Toast'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'

export const HightLightJobMobile = (props) => {
  const { isAuthentication, job, handleAction, applied } = props
  const {
    company,
    name,
    maxSalary,
    percent,
    salaryDisplay,
    startTime,
    typeDisplay,
    type,
    cityName,
    recruitmentCampaignId,
    departmentPositionId
  } = job
  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.CAMPAIGN.CHANGEUSERFAVORITECAMPAIGNS)
  )

  const dispatch = useDispatch()
  const { avatarUrl } = company
  const userProfile = useSelector(selectUserProfile)
  const { setting } = userProfile || {}
  const { favoriteCampaignIds } = setting || {}

  let cloneIds = favoriteCampaignIds ? favoriteCampaignIds?.split(',') : []

  const handleClickSave = async (departmentPositionId) => {
    if (isAuthentication) {
      if (departmentPositionId) {
        const result = await dispatch(
          changeUserFavoriteCampaign(departmentPositionId)
        )

        if (result?.payload?.errorMessage) {
          toast(
            AlertError({
              title: 'Lưu không thành công'
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
        } else {
          if (result?.payload?.data) {
            toast(
              AlertSuccess({
                title: 'Lưu thành công'
              }),
              {
                toastId: 'alert-save-success',
                className: 'bg-toast-custom',
                closeButton: false,
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
              }
            )
          } else {
            toast(
              AlertSuccess({
                title: 'Bỏ lưu thành công'
              }),
              {
                toastId: 'alert-save-success',
                className: 'bg-toast-custom',
                closeButton: false,
                position: 'top-center',
                hideProgressBar: true,
                autoClose: 3000
              }
            )
          }

          if (cloneIds.length > 0) {
            if (
              !cloneIds?.includes(departmentPositionId.toString()) &&
              result?.payload?.data
            ) {
              cloneIds?.push(departmentPositionId)
            } else if (
              cloneIds?.includes(departmentPositionId.toString()) &&
              !result?.payload?.data
            ) {
              cloneIds = cloneIds.filter(
                (id) => id !== departmentPositionId.toString()
              )
            }
          } else {
            cloneIds?.push(departmentPositionId)
          }

          const payload = {
            setting: {
              favoriteCampaignIds: cloneIds.toString()
            }
          }
          await Promise.all([
            dispatch(updateProfile(payload)),
            dispatch(getAllFavoriteCampaigns())
          ]).then(() => dispatch(getProfile()))
        }
      }
    } else {
      window.location.replace('/sign-in')
    }
  }

  return (
    // <div className="relative">
    //   <div
    //     className="rounded-[12px] border border-stoke bg-white w-full relative py-[16px]  items-center  px-[16px] cursor-pointer"
    //     onClick={handleAction}
    //   >
    //     <div className="w-full flex ">
    //       <div className="rounded-full border bg-white overflow-hidden min-h-[78px] h-[78px] min-w-[78px] w-[78px] border-stoke">
    //         <Image
    //           alt="org"
    //           src={avatarUrl || DEFAULT_AVATAR}
    //           width={78}
    //           height={78}
    //           quality={100}
    //           objectFit="cover"
    //         />
    //       </div>
    //       <div className="ml-[14px] w-full">
    //         <div className="flex items-start justify-between w-full">
    //           <div className="flex flex-col items-start justify-start">
    //             <p className=" text-p14 font-bold text-neutral line-clamp-2">
    //               {name}
    //             </p>
    //             <div
    //               className=" px-[16px] mt-[10px]  rounded-[6px] py-1 w-fit"
    //               style={{ backgroundColor: styleOfJob(type) }}
    //             >
    //               <p className="text-white  text-p12">{typeDisplay}</p>
    //             </div>
    //           </div>
    //           {!isAuthentication && (
    //             <div className=" px-[14px]  rounded-[6px] py-1">
    //               <button
    //                 disabled={loading}
    //                 onClick={() => handleClickSave(departmentPositionId)}
    //                 className={`w-[44px] h-[44px] rounded-lg ${
    //                   favoriteCampaignIds?.includes(
    //                     departmentPositionId?.toString()
    //                   )
    //                     ? 'bg-button'
    //                     : 'bg-white'
    //                 }  xl:hover:bg-button transition-all border border-button flex items-center justify-center`}
    //               >
    //                 <XProfileIcon name="heartUncheck" fill="white" />
    //               </button>
    //             </div>
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex items-center justify-center gap-[28px] mt-[8px] mb-3">
    //       <div className="flex items-center gap-[8px] ">
    //         <XProfileIcon name="createAt" />
    //         <p className="text-grey-1  text-p12">
    //           {getDaysAgo(new Date(startTime))}
    //           {' ngày trước'}
    //         </p>
    //       </div>

    //       {cityName && (
    //         <div className="flex items-center gap-[8px]">
    //           <XProfileIcon name="location" />
    //           <p className="text-grey-1  text-p12">{cityName}</p>
    //         </div>
    //       )}
    //     </div>
    //     <Divider />
    //     <div className="mt-[8px]">
    //       <Badge
    //         value={
    //           maxSalary === null
    //             ? salaryDisplay
    //             : maxSalary?.toLocaleString() + ' đ/'
    //         }
    //         icon="price"
    //         bg="transparent"
    //         textStyle="text-p14 font-bold text-blue-light"
    //         subValue={maxSalary !== null && ' Month'}
    //         subTextStyle="text-p14 text-blue-light"
    //       />
    //     </div>
    //     {isAuthentication && (
    //       <div className="flex items-center justify-between mt-[9px] relative">
    //         <div className="w-[83%] flex justify-start h-[38px]">
    //           {applied ? (
    //             <Badge
    //               width="100%"
    //               value={`Đã ứng tuyển`}
    //               icon="appliedCheck"
    //               bg="#43A047"
    //               padding="0.7vw 1.389vw"
    //               textStyle="text-p16 text-white"
    //             />
    //           ) : (
    //             <Badge
    //               width="100%"
    //               value={`Mức độ phù hợp: `}
    //               subValue={percent ? `${percent}%` : '0%'}
    //               icon="target"
    //               bg="#FBECCA"
    //               padding="0.7vw 1.389vw"
    //               textStyle="text-p14"
    //               subTextStyle="text-p14-bold text-blue-main"
    //             />
    //           )}
    //         </div>
    //       </div>
    //     )}
    //   </div>
    //   {isAuthentication && (
    //     <div className="px-[8px] rounded-[6px] absolute z-[10] bottom-[16px] right-[16px]">
    //       <button
    //         disabled={loading}
    //         onClick={() => handleClickSave(departmentPositionId)}
    //         className={`w-[38px] h-[38px] rounded-lg ${
    //           favoriteCampaignIds?.includes(departmentPositionId?.toString())
    //             ? 'bg-button'
    //             : 'bg-white'
    //         }  xl:hover:bg-button transition-all border border-button flex items-center justify-center`}
    //       >
    //         <XProfileIcon name="heartUncheck" fill="white" />
    //       </button>
    //     </div>
    //   )}
    // </div>
    <div className="hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all h-full">
      <div className="h-full relative  hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] rounded-2xl overflow-hidden">
        <div className="z-20 absolute  top-[14px] right-[14px] rounded-[6px] ">
          <button
            disabled={loading}
            onClick={() => handleClickSave(departmentPositionId)}
            className={`w-[40px] h-[40px] rounded-lg ${
              cloneIds?.includes(departmentPositionId?.toString())
                ? 'bg-button'
                : 'bg-white'
            }  xl:hover:bg-button transition-all border border-button flex items-center justify-center`}
          >
            <XProfileIcon name="heartUncheck" fill="white" />
          </button>
        </div>

        <div
          className="rounded-2xl h-full border border-grey-4 bg-white w-full relative p-[12px] flex items-center flex-col  cursor-pointer"
          onClick={handleAction}
        >
          <div className="relative w-full h-[55px] bg-background-worktop bg-[length:100%_100%]">
            <div className="rounded-full bg-white border border-grey-4 absolute -bottom-[24px] left-1/2 -translate-x-1/2 overflow-hidden mx-auto h-[56px] w-[56px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <Image
                alt="org"
                src={avatarUrl || DEFAULT_AVATAR}
                layout="fill"
              />
            </div>
          </div>
          {recruitmentCampaignId > 0 ? (
            <div
              className=" px-3 mt-9  rounded-[6px] py-1"
              style={{ backgroundColor: styleOfJob(type) }}
            >
              <p className="text-white text-p12">{typeDisplay}</p>
            </div>
          ) : (
            <div
              className=" px-3 mt-9  rounded-[6px] py-1"
              style={{ backgroundColor: '#CCC' }}
            >
              <p className="text-white text-p12">Đã hết hạn</p>
            </div>
          )}
          <p className="text-p14-worktop-bold h-[56px] text-neutral mt-[8px] text-center line-clamp-2">
            {name}
          </p>
          <div className="flex flex-col  justify-center items-center gap-[8px] mt-[4px] mb-[4px]">
            {recruitmentCampaignId > 0 && (
              <div className="flex  justify-center items-center gap-[8px] ">
                <XProfileIcon name="clock" />
                <p className="text-grey-1 text-p12 text-center">
                  {getDaysAgo(new Date(startTime))}
                  {' ngày trước'}
                </p>
              </div>
            )}
            {cityName && (
              <div className="flex items-center gap-[8px] min-h-[26px]">
                <XProfileIcon name="locationIconCard" />
                <p className="text-grey-1 text-p12">{cityName}</p>
              </div>
            )}
          </div>
          <Divider />
          <div className="mt-[4px] ">
            <Badge
              isActiveIcon={false}
              value={
                maxSalary === null
                  ? salaryDisplay
                  : maxSalary?.toLocaleString() + ' đ/'
              }
              icon="price"
              bg="transparent"
              textStyle="text-p12-bold leading-[26px] text-blue-light whitespace-nowrap"
              subValue={maxSalary !== null && ' tháng'}
              subTextStyle="text-p12-bold leading-[26px] text-blue-light whitespace-nowrap"
            />
          </div>
          {/* {isAuthentication && (
            <div className="w-full mt-2 ">
              {applied ? (
                <Badge
                  value={`Đã ứng tuyển`}
                  icon="appliedCheck"
                  bg="#43A047"
                  padding="0.7vw 1.389vw"
                  textStyle="text-p16 text-white"
                />
              ) : (
                <Badge
                  isActiveIcon={false}
                  value={`Mức độ phù hợp: `}
                  subValue={percent ? `${percent}%` : '0%'}
                  icon="target"
                  bg="#FBECCA"
                  padding="0.7vw 1.389vw"
                  textStyle="text-p16"
                  subTextStyle="text-p16-bold text-blue-main"
                />
              )}
            </div>
          )} */}
        </div>
      </div>
    </div>
  )
}

HightLightJobMobile.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.object,
    name: PropTypes.string,
    minSalary: PropTypes.number,
    maxSalary: PropTypes.number,
    percent: PropTypes.string,
    salaryDisplay: PropTypes.string
  }),
  isAuthentication: PropTypes.bool,
  handleAction: PropTypes.func
}

HightLightJobMobile.defaultProps = {
  job: {
    company: {},
    name: '',
    positions: 0,
    minSalary: 0,
    maxSalary: 0,
    percent: '',
    salaryDisplay: ''
  },
  isAuthentication: false,
  handleAction: () => {}
}
