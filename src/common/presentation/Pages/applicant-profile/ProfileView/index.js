import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'
import ProgressProfileBar from '../ProgressProfileBar'
import { selectTemplateForDnd } from 'store/app/portfolioSlice'

const ICONS = {
  facebook: 'socialFacebook',
  twitter: 'socialTwitter',
  linkedIn: 'socialLinkedIn',
  instagram: 'socialInstagram',
  behance: 'socialBehanceIcon',
  zalo: 'socialZalo',
  youtube: 'socialYoutube',
  telegram: 'socialTelegram',
  blog: 'socialFacebook',
  tiktok: 'socialTiktok',
  gitHub: 'socialGithub',
  dribbble: 'socialDribbble',
  website: 'socialWebsiteIcon'
}
const TYPES = {
  1: 'Full-time',
  2: 'Part-time',
  3: 'Freelancer'
}
const ProfileView = (props) => {
  const {
    handleEditMode,
    userPortfolio = {},
    isViewPublic = false,
    isHiddenStatusOpenToWork = false
  } = props

  const { user, fullName, description, education } = userPortfolio || {}
  const userProfile = useSelector(selectUserProfile)
  const { avatarUrl, email, phone, name, setting, cityName } = isViewPublic
    ? user
    : userProfile || {}
  const { currentJob, displayName, jobName, socials, characterId } =
    setting || {}
  const templateForDnd = useSelector(selectTemplateForDnd)
  const [jobSetting, setJobSetting] = useState({
    temp: {
      turnOn: false,
      type: []
    },
    current: {
      turnOn: false,
      type: []
    }
  })
  const convertTypesToText = (types = []) => {
    const result = ''
    types?.map((type, ind) => {
      if (ind > 0) {
        result += ' • ' + TYPES[type]
      } else {
        result += TYPES[type]
      }
    })
    return result
  }
  // const [topPosition, setTopPosition] = useState(0)

  // useEffect(() => {
  //   setTopPosition(getPositionSticky('side-bar-profile-view'))
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [])
  const checkTemplateIsActiveIsActive = (e) => {
    if (e?.templateOptionName === 'CareerTarget') {
      if (
        e.isActive === true &&
        e.children[0]?.CareerTargetDescription?.value !== ''
      )
        return true
      else return false
    } else {
      if (e.isActive === true && Object.keys(e?.children).length !== 0)
        return true
      else return false
    }
  }
  const presentComplete = () => {
    const fullfillLength = templateForDnd?.length + 1
    let present = (100 - fullfillLength) / templateForDnd?.length
    const totalPresentIsActive = templateForDnd.filter(
      (e) => checkTemplateIsActiveIsActive(e) === true
    )
    present += Math.floor((totalPresentIsActive?.length / fullfillLength) * 100)
    return present
  }
  useEffect(() => {
    setJobSetting({
      ...jobSetting,
      current: {
        turnOn: userPortfolio?.isOpenToWork || false,
        type: userPortfolio?.metadata?.workTypes
      },
      temp: {
        turnOn: userPortfolio?.isOpenToWork || false,
        type: userPortfolio?.metadata?.workTypes
      }
    })
  }, [userPortfolio?.metadata?.workTypes])

  return (
    <div
      id="side-bar-profile-view"
      className="rounded-borderStep z-10 bg-[#F5F6F7] xl:w-[360px] xl:p-8 p-6 w-full  xl:mb-0 mb-[24px] sticky"
    >
      {/* {isViewPublic && (
        <div
          className={`relative w-full h-[141px] rounded-tl-[12px] rounded-tr-[12px] overflow-hidden ${
            isViewPublic ? 'bg-pink-light' : 'bg-white'
          }`}
        >
          <div className="absolute left-6 top-0">
            <XProfileIcon name="flagXprofile" />
          </div>
        </div>
      )} */}
      <div className="relative">
        <div className="rounded-full border border-grey-4 bg-white w-24 h-24 xl:w-[160px] xl:h-[160px]  mx-auto  overflow-hidden flex justify-center items-center relative">
          {/* {avatarUrl && ( */}
          <Image
            layout="fill"
            src={
              avatarUrl !== null && avatarUrl !== ''
                ? avatarUrl
                : parseInt(characterId) === 0
                ? '/images/DefaultAvatarCuu.png'
                : parseInt(characterId) === 1
                ? '/images/DefaultAvatarChuot.png'
                : parseInt(characterId) === 2
                ? '/images/DefaultAvatarGau.png'
                : '/images/DefaultAvatarCuu.png'
            }
            alt=""
            objectFit="cover"
            priority={true}
            quality={100}
          />
          {/* )} */}
        </div>
        {!isViewPublic && (
          <div className="hidden xl:block absolute top-0 right-0  ignore-el-pdf">
            <button
              className="w-14 h-14 flex group items-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.04)] justify-center border border-nude bg-white transition-all hover:bg-button rounded-full"
              onClick={() => handleEditMode()}
            >
              <XProfileIcon name="pen" />
              <span className="absolute  text-p16 hidden xl:group-hover:flex justify-center items-center right-44 translate-x-full w-[110px] px-4 py-3 bg-grey-1 rounded-lg text-center text-white before:content-[''] before:absolute before:top-1/2  before:left-[100%] before:rotate-180 before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-grey-1">
                Chỉnh sửa
              </span>
            </button>
          </div>
        )}
        {!isViewPublic && (
          <div className="xl:hidden absolute top-0 right-0  ignore-el-pdf">
            <button
              className="w-14 h-14 flex group items-center drop-shadow-[0_16px_24px_rgba(0,0,0,0.04)] justify-center border border-nude bg-white transition-all hover:bg-button rounded-full"
              onClick={() => {
                window.location.href = '/account-setting/information'
              }}
            >
              <XProfileIcon name="pen" />
              <span className="absolute  text-p16 hidden xl:group-hover:flex justify-center items-center right-44 translate-x-full w-[110px] px-4 py-3 bg-grey-1 rounded-lg text-center text-white before:content-[''] before:absolute before:top-1/2  before:left-[100%] before:rotate-180 before:-translate-y-1/2 before:border-8 before:border-y-transparent before:border-l-transparent before:border-r-grey-1">
                Chỉnh sửa
              </span>
            </button>
          </div>
        )}
      </div>
      <div className="sm:pt-[32px] pt-[12px] px-auto text-center mb-[36px]">
        <p className="text-blue-light sm:text-h3 text-p20-bold break-words line-clamp-3">
          {name}
        </p>

        <p className="mt-1 xl:text-p18 text-p16 text-neutral text-center">
          {jobSetting.current.turnOn
            ? jobSetting.current.turnOn && jobSetting.current.type?.length > 0
              ? convertTypesToText(jobSetting.current.type)
              : ''
            : !isHiddenStatusOpenToWork
            ? 'Bạn đang tắt trạng thái tìm việc'
            : ''}
        </p>
      </div>
      {!isViewPublic && (
        <div className="xl:mt-12 xl:mb-9">
          <ProgressProfileBar
            characterId={characterId}
            percentValue={presentComplete()}
          />
        </div>
      )}
      {/* <div className="w-full ">
        <Divider />
      </div> */}
      <div className="">
        {/* <div className="pt-[28px] ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="card" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Họ và tên
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p12 text-neutral break-words line-clamp-3">
              {name}
            </p>
          </div>
        </div> */}
        <div className="pt-[28px] ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="caseFill" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p16-bold text-blue-light">
              Nghề nghiệp
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p16 text-neutral break-words line-clamp-3">
              {currentJob || 'Chưa có nghề nghiệp'}
            </p>
          </div>
        </div>
        <div className="pt-8 ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="letterFill" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p16-bold text-blue-light">
              Email
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p16 text-neutral break-words line-clamp-3">
              {email}
            </p>
          </div>
        </div>
        <div className="pt-8 ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="phoneFill" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p16-bold text-blue-light ">
              Số điện thoại
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p16 text-neutral ">
              {phone || 'Chưa có số điện thoại'}
            </p>
          </div>
        </div>
        <div className="pt-8 ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="mapPointFill" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p16-bold text-blue-light">
              Địa điểm
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p16 text-neutral break-words line-clamp-3">
              {cityName || 'Chưa có địa điểm'}
            </p>
          </div>
        </div>

        {/* <div className="pt-[28px] ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="team" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Lĩnh vực
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p12 text-neutral break-words line-clamp-3">
              {description || 'Chưa có'}
            </p>
          </div>
        </div> */}
        {/* <div className="pt-[28px] ">
          <div className="flex mb-[8px] items-center">
            <div className="mr-[16px]">
              <XProfileIcon name="team" fill="#294F9B" />
            </div>
            <p className="sm:text-p18-bold text-p14-bold text-blue-light">
              Học vấn
            </p>
          </div>
          <div>
            <p className="sm:text-p18 text-p12 text-neutral break-words line-clamp-3">
              {education || 'Chưa có'}
            </p>
          </div>
        </div> */}
        <div className="flex items-center sm:mt-8 mt-[12px] gap-4 flex-wrap w-full mx-auto">
          {socials?.map((el, ind) => {
            if (el?.url !== '') {
              return (
                <Link href={el.url} key={ind}>
                  <a
                    className=" flex items-center justify-center w-11 h-11 rounded-full border group border-grey-4"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="group-hover:hidden">
                      <XProfileIcon name={ICONS[el.type]} fill="#000000" />
                    </div>
                    <div className="group-hover:block hidden">
                      <XProfileIcon name={ICONS[el.type]} fill="#F6BB3A" />
                    </div>
                  </a>
                </Link>
              )
            }
          })}
        </div>
        {/* {!isViewPublic && (
          <Button
            title="Sửa"
            rounded="rounded-[8px]"
            background={'bg-[#F6BB3A]'}
            color="text-neutral"
            padding="py-[8px] px-[20px]"
            width="w-full xl:hidden block"
            height="h-[48px]"
            textWeight={'sm:text-p18 text-p14 font-bold'}
            onClick={() => handleEditMode()}
            margin="mt-[24px]"
          />
        )} */}
      </div>
    </div>
  )
}

export default ProfileView
