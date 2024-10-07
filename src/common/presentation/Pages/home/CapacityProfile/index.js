import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import useTrans from 'common/hooks/useTrans'
import Button from 'common/presentation/Button'
import { useRouter } from 'next/router'
import { authService } from 'store/helper/authService'
import {
  selectTemplateForDnd,
  selectUserPortfolio
} from 'store/app/portfolioSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import IntroduceProfile from './introduceProfile'
import RequestProfile from './requestProfile'
import { selectCapacityProfile } from 'store/app/homeSlice'
import IntroduceProfileMobile from './introduceProfileMobile'

const CapacityProfile = (props) => {
  const {
    title,
    id,
    description,
    roleId = 0,
    layoutFirst,
    layoutSecond,
    meta
  } = props

  const userPorfolio = useSelector(selectUserPortfolio)
  const templateForDnd = useSelector(selectTemplateForDnd)
  const contant = useSelector(selectCapacityProfile)
  const dispatch = useDispatch()
  const trans = useTrans()
  const { push } = useRouter()
  const [token, setToken] = useState(null)

  const handleLinkPortfolio = () => {
    if (authService.getAccessToken()) {
      window.location.replace('/applicant-profile')
    } else {
      push('/sign-in')
    }
  }

  useEffect(() => {
    if (authService.getAccessToken()) {
      setToken(authService.getAccessToken())
    }
  }, [dispatch])

  if (token === null || userPorfolio?.templateOptionValues?.length === 0) {
    return (
      <div
        id={id}
        className="flex justify-center h-auto w-auto bg-stoke  xl:w-full  xl:h-[855px] xl:pb-0 px-5 xl:px-0 "
      >
        <div className="flex justify-between xl:w-[1335px] pt-[40px] pb-[40px]">
          <div className="hidden xl:flex items-end">
            <Image width={125} height={125} src={layoutFirst} alt="" />
          </div>
          <div>
            <h2 className="text-center text-neutral text-p36-bold mb-[12px]">
              {title}
            </h2>
            <div className="text-center mt-[8px] mb-[40px]">
              <p className="text-neutral text-p18">{description}</p>
            </div>
            <div className="xl:flex xl:justify-center xl:items-center ">
              <div className="sm:flex gap-[62px] items-center h-full xl:w-[1140px] xl:h-[567px] bg-white border rounded-[24px] p-[56px]">
                <div className="sm:w-1/2 w-full">
                  {roleId === 0 && (
                    <Image
                      placeholder="blur"
                      blurDataURL="/images/CapacityProfile/capacityProfile0.png"
                      src="/images/CapacityProfile/capacityProfile0.png"
                      width={540}
                      height={483}
                      alt="capacity-profile0"
                      quality={100}
                    />
                  )}
                  {roleId === 1 && (
                    <Image
                      placeholder="blur"
                      blurDataURL="/images/CapacityProfile/capacityProfile1.png"
                      src="/images/CapacityProfile/capacityProfile1.png"
                      width={540}
                      height={483}
                      alt="capacity-profile1"
                      quality={100}
                    />
                  )}
                </div>
                <div className="sm:w-1/2 w-full flex flex-col justify-center ">
                  <p className="mb-[28px] text-h3">
                    {trans.home.noneProfileTitle}
                  </p>
                  <p className="mb-[40px] text-p18">
                    {trans.home.noneProfileDescription}
                  </p>
                  <Button
                    title={trans.home.noneProfileButton}
                    rounded="rounded-[8px]"
                    background={'bg-button'}
                    color="text-neutral"
                    padding="py-[10px] px-[20px]"
                    height="h-[48px]"
                    width="w-[152px]"
                    textWeight={'text-p18 font-bold'}
                    onClick={handleLinkPortfolio}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="hidden xl:block ">
            <Image
              width={125}
              height={125}
              src={layoutSecond}
              alt=""
              quality={100}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      id={id}
      className="flex justify-center h-auto w-auto bg-stoke  xl:w-full   xl:pb-0 px-5 xl:px-0 "
    >
      <div className="flex justify-between xl:w-[1335px] pt-[80px] pb-[80px]">
        <div className="hidden xl:flex items-end">
          <Image
            width={125}
            height={125}
            src={layoutFirst}
            alt=""
            quality={100}
          />
        </div>
        <div>
          <h2 className="text-center text-neutral xl:text-p36-bold text-p20-bold mb-[12px]">
            {title}
          </h2>
          <div className="text-center mt-[8px] mb-[40px]">
            <p className="text-neutral xl:text-p18 text-p14">{description}</p>
          </div>
          <div className="xl:flex xl:justify-center xl:items-center ">
            <div className="hidden xl:flex gap-[40px] h-full xl:w-[1059px]  bg-white border rounded-xl py-[32px] px-[32px]">
              <div>
                <IntroduceProfile
                  roleId={roleId}
                  porfolio={userPorfolio}
                  handleLinkPortfolio={handleLinkPortfolio}
                />
              </div>
              <RequestProfile
                roleId={roleId}
                templateForDnd={
                  templateForDnd.length !== 0 ? templateForDnd : contant
                }
              />
            </div>
            <div className="xl:hidden">
              <IntroduceProfileMobile meta={meta} roleId={roleId} />
            </div>
          </div>
        </div>
        <div className="hidden xl:block ">
          <Image
            width={125}
            height={125}
            src={layoutSecond}
            alt=""
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

CapacityProfile.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  characterName: PropTypes.string,
  layoutFirst: PropTypes.string,
  layoutSecond: PropTypes.string,
  titleLocation: PropTypes.string,
  titleAddress: PropTypes.string
}

CapacityProfile.defaultProps = {
  id: '',
  title: '',
  description:
    'Hoàn thiện hồ sơ của bạn với các kỹ năng cần thiết để gây ấn tượng với nhà tuyển dụng nhé!',
  avatarUrl: '',
  name: 'Hoài thương',
  characterName: '',
  layoutFirst: '/images/leftTriangleCapacityProfileHome.png',
  layoutSecond: '/images/rightTtriangleCapacityProfileHome.png',
  titleLocation: 'Thêm vị trí công việc',
  titleAddress: 'Thêm địa điểm làm việc'
}

export default CapacityProfile
