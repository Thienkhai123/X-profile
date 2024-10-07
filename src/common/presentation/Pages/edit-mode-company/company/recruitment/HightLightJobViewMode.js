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

export const HightLightJobViewMode = (props) => {
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

  return (
    <div className="pb-2">
      <div className="relative hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all">
        <div
          className="rounded-[12px] border border-stoke bg-white w-full hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] relative py-4 flex items-center flex-col px-[20px] cursor-pointer"
          onClick={handleAction}
        >
          <div className="relative w-full h-[88px] bg-background-worktop bg-[length:100%_100%]">
            <div className="rounded-full bg-white absolute -bottom-[24px] left-1/2 -translate-x-1/2 overflow-hidden mx-auto h-[100px] w-[100px] drop-shadow-[0_0_20px_rgba(0,0,0,0.25)]">
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
                {' Days ago'}
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
              isActiveIcon={false}
              bg="transparent"
              textStyle="text-p16-bold text-blue-light"
              subValue={maxSalary !== null && ' Tháng'}
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

HightLightJobViewMode.propTypes = {
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

HightLightJobViewMode.defaultProps = {
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
