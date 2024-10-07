import Image from 'next/image'
import PropTypes from 'prop-types'
import Badge from 'common/presentation/Badge'
import { DEFAULT_AVATAR } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import { Fragment, useState } from 'react'

export const DepartmentPositionEditCard = (props) => {
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

  const [hover, setHover] = useState(false)
  if (type === 'avatar') {
    return (
      <div className="relative hover:pb-1 hover:pt-0 pb-0 pt-1 ">
        <div
          onMouseLeave={() => setHover(false)}
          onMouseMove={() => setHover(true)}
          className={`absolute opacity-0 flex items-center justify-center rounded-full transition-all ease-out duration-400 bg-white shadow top-[-20px] right-3 z-50 p-1 ${
            hover ? 'opacity-100' : ''
          }`}
        >
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
        <div
          className="h-full relative mt-5"
          onMouseLeave={() => setHover(false)}
          onMouseMove={() => setHover(true)}
        >
          {!isActive && (
            <div className="absolute top-6 left-6 z-30 bg-white p-2 rounded-lg shadow-shadow4 border border-grey-4">
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
            className={`rounded-[12px] bg-white p-6   w-full min-h-[300px] h-full  relative border border-grey-4  flex items-center flex-col justify-between cursor-pointer hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)]   transition-all  `}
            onClick={() => handleActionCard()}
          >
            <div className="relative bg-background-worktop group-hover:bg-background-worktop-hover  w-full bg-[length:100%_100%] h-[88px] ">
              <div className="rounded-full bg-white absolute -bottom-[40px] left-1/2 -translate-x-1/2 overflow-hidden mx-auto xl:h-[100px] xl:w-[100px] h-[106px] w-[106px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.04)]">
                {avatarUrl && (
                  <Image
                    alt="org"
                    src={avatarUrl || DEFAULT_AVATAR}
                    layout="fill"
                    objectFit="cover"
                  />
                )}
              </div>
            </div>

            <p className="sm:text-p18-bold text-p14-bold text-center text-neutral mb-1 mt-[48px] group-hover:text-white  line-clamp-1">
              {name}
            </p>
            <div className=" relative text-center px-5  ">
              <p className="sm:text-p16 text-p12 text-grey-1 mb-[16px] break-words line-clamp-2 group-hover:text-white h-12">
                {subtitle}
              </p>
            </div>
            <div
              className={`${
                recruitmentAmount > 0 ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Badge
                value={recruitmentAmount + ' vị trí tuyển dụng'}
                textStyle="text-grey-1  sm:text-p14-bold text-p12"
                icon="case"
                bg="#F5F5F2"
              />
            </div>
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

DepartmentPositionEditCard.propTypes = {
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

DepartmentPositionEditCard.defaultProps = {
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
