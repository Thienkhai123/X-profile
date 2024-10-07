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
import { Fragment } from 'react'
import Button from 'common/presentation/Button'
import { AlertError } from 'common/presentation/Notification/Toast/AlertError'
import { AlertSuccess } from 'common/presentation/Notification/Toast/AlertSuccess'

export const HightlightJobPC = (props) => {
  const {
    isAuthentication,
    job,
    handleAction,
    applied,
    step,
    titleButton,
    disableButton,
    showHeart,
    disableTitle,
    timeRemaining,
    showTimeRemaining,
    isTemplate = false,
    handleClickButton = () => {}
  } = props
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
    <div className="hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all ">
      <div className="relative  hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] rounded-xl overflow-hidden">
        {showHeart && (
          <div className="z-20 absolute px-[14px] top-6 right-[24px] rounded-[6px] py-1">
            <button
              disabled={loading}
              onClick={() => handleClickSave(departmentPositionId)}
              className={`w-[44px] h-[44px] rounded-lg ${
                cloneIds?.includes(departmentPositionId?.toString())
                  ? 'bg-button'
                  : 'bg-white'
              }  hover:bg-button transition-all border border-button flex items-center justify-center`}
            >
              <XProfileIcon name="heartUncheck" fill="white" />
            </button>
          </div>
        )}
        {timeRemaining && showTimeRemaining && (
          <div className="z-20 absolute px-4 py-2 top-[25px] left-0 rounded-r-3xl bg-semantic-green flex items-center gap-2">
            <XProfileIcon name="history2" />
            <p className="text-p14 text-white">Còn lại {timeRemaining} giờ</p>
          </div>
        )}

        <div
          className="rounded-2xl  border border-grey-4 bg-white w-full relative p-6 flex items-center flex-col  cursor-pointer"
          onClick={handleAction}
        >
          <div className="relative w-full h-[88px] bg-[url('/images/job-background.png')] bg-[length:100%_100%]">
            <div
              className="absolute w-full h-full left-0 top-0"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0))'
              }}
            ></div>
            <div className="rounded-full bg-white border border-grey-4 absolute -bottom-[24px] left-1/2 -translate-x-1/2 overflow-hidden mx-auto h-[100px] w-[100px] drop-shadow-[0_4px_16px_rgba(0,0,0,0.04)]">
              <Image
                alt="org"
                src={avatarUrl || DEFAULT_AVATAR}
                layout="fill"
              />
            </div>
          </div>
          {recruitmentCampaignId > 0 ? (
            <div
              className=" px-[14px] mt-9  rounded-[6px] py-1"
              style={{ backgroundColor: styleOfJob(type) }}
            >
              <p className="text-white text-p16">{typeDisplay}</p>
            </div>
          ) : (
            <div
              className=" px-[14px] mt-9  rounded-[6px] py-1"
              style={{ backgroundColor: '#CCC' }}
            >
              <p className="text-white text-p16">Đã hết hạn</p>
            </div>
          )}
          <p className="text-p20-worktop-bold h-[56px] text-neutral mt-4 text-center line-clamp-2">
            {name}
          </p>
          <div className="flex items-center gap-[12px] mt-4 mb-3">
            {recruitmentCampaignId > 0 && (
              <div className="flex items-center gap-[8px] ">
                <XProfileIcon name="clock" />
                {!isTemplate ? (
                  <p className="text-grey-1 text-p14">
                    {getDaysAgo(new Date(startTime))}
                    {' ngày trước'}
                  </p>
                ) : (
                  <p className="text-grey-1 text-p14">Số ngày</p>
                )}
              </div>
            )}
            {cityName && (
              <div className="flex items-center gap-[8px]">
                <XProfileIcon name="locationIconCard" />
                <p className="text-grey-1 text-p14">{cityName}</p>
              </div>
            )}
          </div>
          <Divider />
          <div className="mt-2">
            <Badge
              isActiveIcon={false}
              value={
                maxSalary === null
                  ? salaryDisplay
                  : maxSalary?.toLocaleString() + ' đ/'
              }
              icon="price"
              bg="transparent"
              textStyle="text-p16-bold text-blue-light"
              subValue={maxSalary !== null && ' Tháng'}
              subTextStyle="text-p14-bold text-blue-light"
            />
          </div>
          {isAuthentication && (
            <div className="w-full mt-2 ">
              {step !== undefined ? (
                <Fragment>
                  <Button
                    title={disableButton ? disableTitle : titleButton || ''}
                    rounded="rounded-lg"
                    background={'bg-button'}
                    disabled={disableButton}
                    disableBackground={
                      step === 5
                        ? 'disabled:bg-[#FFF2F1]'
                        : 'disabled:bg-[#FBECCA] '
                    }
                    disableColor={
                      step === 5 ? 'text-semantic-red' : 'text-neutral'
                    }
                    hover={disableButton ? '' : 'hover:opacity-80'}
                    color={'text-neutral'}
                    padding="py-[8px] px-8"
                    height="h-auto"
                    margin=""
                    width="w-full"
                    textWeight={`${
                      disableButton ? 'text-p18' : 'text-p18-bold'
                    }`}
                    onClick={(e) => handleClickButton(e)}
                  />
                </Fragment>
              ) : (
                <Fragment>
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
                </Fragment>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

HightlightJobPC.propTypes = {
  job: PropTypes.shape({
    company: PropTypes.object,
    name: PropTypes.string,
    minSalary: PropTypes.number,
    maxSalary: PropTypes.number,
    percent: PropTypes.string,
    salaryDisplay: PropTypes.string
  }),
  isAuthentication: PropTypes.bool,
  handleAction: PropTypes.func,
  showHeart: PropTypes.bool
}

HightlightJobPC.defaultProps = {
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
  showHeart: true,
  handleAction: () => {}
}
