import Image from 'next/image'
import PropTypes from 'prop-types'
import Badge from 'common/presentation/Badge'
import { DEFAULT_AVATAR } from 'common/config/app.constants'
import XProfileIcon from 'common/presentation/Icons'
import { Fragment } from 'react'

export const OrgCard = (props) => {
  const { type, handleAction, style, isActiveIcon } = props

  const {
    avatarUrl,
    name,
    subtitle,
    recruitmentAmount,
    companyId,
    isActive,
    tag
  } = props.org
  if (type === 'avatar') {
    return (
      <div className="hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all h-full">
        <div
          className={`rounded-2xl bg-white h-full  w-full min-h-[300px]   relative  flex items-center flex-col justify-between cursor-pointer hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] pb-[32px]  group  transition-all  `}
          onClick={() => handleAction(tag)}
        >
          <div className="relative w-full h-[166px] ">
            <div className=" bg-white overflow-hidden mx-auto">
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
            <p className="sm:text-p18-bold  text-p14-bold text-center text-neutral mb-1 mt-[16px] group-hover:text-blue-light  line-clamp-1">
              {name}
            </p>
            <div className="group relative text-center mb-11  ">
              <p className="sm:text-p16 text-p12 text-grey-1 mb-[16px] xl:h-[48px] break-words line-clamp-2 group-hover:text-blue-light">
                {subtitle}
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
    )
  }
  return (
    <div className="hover:pb-1 hover:pt-0 pb-0 pt-1 transition-all h-full">
      <div
        className={`rounded-[12px] xl:border-none border border-grey-4 bg-white  w-full relative  flex items-center flex-col cursor-pointer hover:shadow-[0_16px_20px_rgba(0,0,0,0.04)] sm:px-[24px] px-[8px] sm:py-[24px] py-[16px]`}
        onClick={() => handleAction(tag)}
        style={{ ...style }}
      >
        <div className="sm:mb-4 mb-[8px]">
          <div className="w-[136px] xl:h-[84px] h-[56px] relative">
            <Fragment>
              <div className="sm:block hidden absolute left-0 top-0">
                <XProfileIcon name="orgLeft" />
              </div>
              <div className="relative xl:w-[80px] w-[56px] h-[56px] xl:h-[80px] border border-grey-4 bg-white mx-auto rounded-full overflow-hidden z-10">
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
        <div className="group relative text-center ">
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

        <div className="group relative text-center xl:mb-[16px] mb-[12px]">
          <p className="sm:text-p16 text-p12 text-grey-1 xl:leading-[24px] leading-[26px]  line-clamp-2 xl:h-[48px] h-[52px] ">
            {subtitle}
          </p>
        </div>
        <div className="hidden flex-1 sm:flex flex-col justify-end">
          <Badge
            value={recruitmentAmount + ' vị trí tuyển dụng'}
            icon="case"
            bg="#F5F5F2"
            isActiveIcon={isActiveIcon}
            padding="4px 16px"
            spacing="8px"
          />
        </div>
        <div className="sm:hidden flex-1 flex flex-col justify-end">
          <Badge
            value={recruitmentAmount + ' vị trí tuyển dụng'}
            icon="case"
            bg="#F5F5F2"
            padding="4px 8px"
            isActiveIcon={false}
          />
        </div>
      </div>
    </div>
  )
}

OrgCard.propTypes = {
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

OrgCard.defaultProps = {
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
