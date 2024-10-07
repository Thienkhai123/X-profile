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
import { updateRecruitmentSelected } from 'store/app/edit-mode-company/profile/recruitListSlice'

export const HightLightJobEditMode = (props) => {
  const {
    isAuthentication,
    job,
    handleAction,
    applied,
    recruitmentSelected = []
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

  let cloneIds = [...recruitmentSelected] || []

  const handleClickSave = async (recruitmentCampaignId) => {
    if (recruitmentCampaignId) {
      if (cloneIds.length > 0) {
        if (!cloneIds?.includes(recruitmentCampaignId)) {
          cloneIds?.push(recruitmentCampaignId)
        } else if (cloneIds?.includes(recruitmentCampaignId)) {
          cloneIds = cloneIds.filter((id) => id !== recruitmentCampaignId)
        }
      } else {
        cloneIds?.push(recruitmentCampaignId)
      }

      // const payload = {
      //   setting: {
      //     favoriteCampaignIds: cloneIds.toString()
      //   }
      // }
      // await Promise.all([
      //   dispatch(updateProfile(cloneIds.toString())),
      //   dispatch(getAllFavoriteCampaigns())
      // ]).then(() => dispatch(getProfile()))
      dispatch(updateRecruitmentSelected(cloneIds))
    }
  }

  return (
    <div>
      <div className="relative">
        <div className="z-20 absolute px-[14px] top-[24px] right-[24px] rounded-[6px] py-1">
          <button
            disabled={loading}
            onClick={() => handleClickSave(recruitmentCampaignId)}
            className={`w-[32px] h-[32px] rounded-md ${
              recruitmentSelected?.includes(recruitmentCampaignId)
                ? 'bg-button'
                : 'bg-white'
            }   transition-all border-2 border-button flex items-center justify-center`}
          >
            {recruitmentSelected?.includes(recruitmentCampaignId) && (
              <XProfileIcon name="quizCheck" width="12.5" height="10.5" />
            )}
          </button>
        </div>

        <div
          className="rounded-[12px] border border-stoke bg-white w-full relative p-6 flex items-center flex-col  cursor-pointer"
          onClick={() => handleClickSave(recruitmentCampaignId)}
        >
          <div className="relative w-full h-[88px]  bg-background-worktop bg-[length:100%_100%]">
            <div
              className="absolute w-full h-full left-0 top-0"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.08)), url('/images/job-background.png')"
              }}
            ></div>
            <div className="rounded-full bg-white border border-light-nude  absolute -bottom-[24px] left-1/2 -translate-x-1/2 overflow-hidden mx-auto h-[100px] w-[100px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]">
              <Image
                alt="org"
                src={avatarUrl || DEFAULT_AVATAR}
                layout="fill"
              />
            </div>
          </div>
          <div
            className=" px-[14px] mt-9  rounded-[6px] py-1"
            style={{ backgroundColor: styleOfJob(type) }}
          >
            <p className="text-white text-p16">{typeDisplay}</p>
          </div>
          <p className="text-p20-worktop-bold h-[56px] text-neutral mt-4 text-center line-clamp-2">
            {name}
          </p>
          <div className="flex items-center gap-[12px] mt-[10px] mb-3">
            <div className="flex items-center gap-[8px] ">
              <XProfileIcon name="createAt" />
              <p className="text-grey-1 text-p14">
                {getDaysAgo(new Date(startTime))}
                {' ngày trước'}
              </p>
            </div>

            <div className="flex items-center gap-[8px]">
              <XProfileIcon name="location" />
              <p className="text-grey-1 text-p14">{cityName}</p>
            </div>
          </div>
          <Divider />
          <div className="mt-2">
            <Badge
              value={
                maxSalary === null
                  ? salaryDisplay
                  : maxSalary?.toLocaleString() + ' đ/'
              }
              // icon="price"
              isActiveIcon={false}
              bg="transparent"
              textStyle="text-p16-bold text-blue-light"
              subValue={maxSalary !== null && ' tháng'}
              subTextStyle="text-p14 text-blue-light"
            />
          </div>
          {isAuthentication && (
            <div className="w-full mt-[9px] ">
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
          )}
        </div>
      </div>
    </div>
  )
}

HightLightJobEditMode.propTypes = {
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

HightLightJobEditMode.defaultProps = {
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
