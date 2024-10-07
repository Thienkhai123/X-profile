import Image from 'next/image'
import PropTypes from 'prop-types'
import Badge from 'common/presentation/Badge'
import { DEFAULT_AVATAR } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import { Fragment } from 'react'

export const OrgEditCard = (props) => {
  const {
    type,
    handleAction,
    style,
    isActiveIcon,
    handleClickPen = () => {},
    handleActionCard = () => {},
    handleClickDuplicate = () => {}
  } = props

  const { avatarUrl, name, subtitle, recruitmentAmount, companyId, isActive } =
    props.org
  if (type === 'avatar') {
    return (
      <div className="hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all">
        <div className="group relative ">
          <div className="absolute opacity-0 group-hover:opacity-100 flex items-center justify-center rounded-full transition-all ease-out duration-400 bg-white shadow -top-6 right-1 z-50 p-1">
            <div
              onClick={() => handleClickDuplicate()}
              className="gap-2 rounded-full w-[44px] h-[44px]  hover:bg-button flex items-center justify-center p-1 cursor-pointer"
            >
              <XProfileIcon name="duplicate" width="24" height="24" />
            </div>
            <div
              onClick={() => handleClickPen()}
              className="gap-2 rounded-full w-[44px] h-[44px]  hover:bg-button flex items-center justify-center p-1 cursor-pointer"
            >
              <XProfileIcon name="pen" />
            </div>
            <div
              onClick={() => handleAction(companyId)}
              className="gap-2 rounded-full w-[44px] h-[44px] hover:bg-button flex items-center justify-center p-1 cursor-pointer"
            >
              <XProfileIcon
                name={`${isActive ? 'eyeOff2' : 'eye2'}`}
                stroke="#000000"
              />
            </div>
          </div>
          {!isActive && (
            <div className="absolute top-6 left-6 z-30 bg-white p-2 rounded-lg">
              <div className="flex gap-2 items-center justify-center">
                <XProfileIcon
                  name="eyeOff2"
                  stroke="#000000"
                  width={'24'}
                  height={'24'}
                />
                <p className="text-p16">Bản nháp</p>
              </div>
            </div>
          )}
          <div
            className={`rounded-2xl bg-white   w-full min-h-[300px]   relative border border-grey-4  flex items-center flex-col justify-between cursor-pointer hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] pb-[32px]  group  transition-all  `}
            onClick={() => handleActionCard()}
          >
            <div className="relative w-full  h-[166px] ">
              <div className="w-full bg-white overflow-hidden mx-auto ">
                {avatarUrl ? (
                  <Image
                    alt="org"
                    src={avatarUrl || DEFAULT_AVATAR}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                  />
                ) : (
                  <Image
                    alt="org"
                    src={'/images/default-department.png'}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-t-2xl"
                    quality={100}
                  />
                )}
              </div>
            </div>

            <div className="px-6">
              <p className="sm:text-p18-bold text-p14-bold text-center text-neutral mb-1 mt-[18px] group-hover:text-blue-light  line-clamp-1">
                {name || 'Tên phòng ban'}
              </p>
              <div className="group relative text-center mb-11">
                <p className="sm:text-p16 leading-7 text-p12 text-black mb-[16px] break-words h-12 line-clamp-2 group-hover:text-blue-light">
                  {subtitle || 'Mô tả ngắn về phòng ban của bạn'}
                </p>
              </div>
            </div>
            <Badge
              value={recruitmentAmount + ' vị trí tuyển dụng'}
              icon="case"
              bg="#F5F5F2"
            />
          </div>
        </div>
      </div>
    )
  }
  return (
    <div
      className={`rounded-[12px] bg-white  w-full relative  flex items-center flex-col cursor-pointer hover:shadow-xl sm:px-[32px] px-[16px] sm:py-[32px] py-[8px]`}
      onClick={() => handleAction(companyId)}
      style={{ ...style }}
    >
      <div className="sm:mb-4 mb-[8px]">
        <div className="w-[136px] h-[84px] relative">
          <Fragment>
            <div className="sm:block hidden absolute left-0 top-0">
              <XProfileIcon name="orgLeft" />
            </div>
            <div className="relative w-[80px] h-[80px] mx-auto rounded-full overflow-hidden z-10">
              <Image
                alt="org"
                src={avatarUrl || DEFAULT_AVATAR}
                layout="fill"
              />
            </div>
            <div className="sm:block hidden absolute right-0 top-0">
              <XProfileIcon name="orgRight" />
            </div>
          </Fragment>
        </div>
      </div>
      <div className="group relative text-center sm:h-full">
        <span
          className="group-hover:opacity-100 transition-opacity bg-gray-800 px-1 text-sm text-gray-100 rounded-md absolute left-1/2 
    -translate-x-1/2 -translate-y-1/2  opacity-0 sm:m-4 mx-auto w-full sm:py-2"
        >
          {name}
        </span>
        <p className="sm:text-p18-bold text-p14-bold text-neutral mb-1 line-clamp-1 overflow-ellipsis">
          {name}
        </p>
      </div>

      <div className="group relative text-center ">
        <p className="sm:text-p18 text-p12 text-grey-1 mb-[16px] line-clamp-2">
          {subtitle}
        </p>
      </div>
      <div className="hidden flex-1 sm:flex flex-col justify-end">
        <Badge
          value={recruitmentAmount + ' vị trí tuyển dụng'}
          icon="job"
          bg="#F5F5F2"
          isActiveIcon={isActiveIcon}
        />
      </div>
      <div className="sm:hidden flex-1 flex flex-col justify-end">
        <Badge
          value={recruitmentAmount + ' vị trí tuyển dụng'}
          icon="job"
          bg="#F5F5F2"
          isActiveIcon={false}
        />
      </div>
    </div>
  )
}

OrgEditCard.propTypes = {
  org: PropTypes.shape({
    avatarUrl: PropTypes.string,
    name: PropTypes.string,
    subtitle: PropTypes.string,
    recruitmentAmount: PropTypes.number
  }),
  type: PropTypes.string,
  handleAction: PropTypes.func,
  isActiveIcon: PropTypes.bool
}

OrgEditCard.defaultProps = {
  org: {
    avatarUrl: '',
    name: '',
    subtitle: '',
    recruitmentAmount: 0
  },
  type: '',
  handleAction: () => {},
  style: {},
  isActiveIcon: true
}
