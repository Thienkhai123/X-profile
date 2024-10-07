import React from 'react'
import PropTypes from 'prop-types'
import ProcessBarCourse from './ProcessBarCourse'
// import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import dynamic from 'next/dynamic'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import Button from 'common/presentation/Button'
import {
  convertRegisterCourse,
  getPercentage
} from 'store/helper/functionHelper'

const Image = dynamic(() => import('next/image'), { ssr: false })

const BannerCourseDetail = (props) => {
  const {
    intructorName = '',
    nameCourse,
    imageUrl,
    videoAmount = 0,
    finishedVideoAmount = 0,
    certificate = '',
    productDemo,
    titleBreadCrumbs = [],
    handleDone = () => {},
    handleUploadProduct = () => {},
    guid,
    finalExamId,
    userAcceptList = [],
    userAcceptCourse
    // skillMatchingPercentage = 0
  } = props

  const skillMatchingPercentage = () => {
    if (
      getPercentage(finishedVideoAmount, videoAmount) >= 0 &&
      getPercentage(finishedVideoAmount, videoAmount) <= 100
    ) {
      return getPercentage(finishedVideoAmount, videoAmount)
    } else {
      return 0
    }
  }

  return (
    <div className="py-[32px] px-[20px] xl:px-0 ">
      <div className="flex justify-center px-[20px] xl:px-0 mb-[32px]">
        <div className="flex xl:w-[1140px] w-full ">
          <BreadCrumbs
            type={true}
            typeArrow={true}
            // styleBread="sm:text-p16 text-p14 text-grey-1"
            classNameTypeLast="text-black"
            classNameType="sm:text-[16px] text-p14 text-grey-1 font-normal leading-[28px]"
            nameList={titleBreadCrumbs}
          />
        </div>
      </div>
      <div className="xl:flex justify-center">
        <div className="xl:flex xl:w-[1140px] w-full pl-[1px] pr-[4px]">
          <div className="xl:mr-[40px] mr-0 xl:min-w-[434px]">
            <div className="mb-[16px] h-[211px] ">
              <Image
                src={imageUrl || `/images/Course/Rectangle_5558.png`}
                alt=""
                width={434}
                height={211}
                quality={100}
                objectFit="cover"
                className="rounded-borderStep"
              />
            </div>
            <div className="flex gap-[8px] items-center relative h-[40px]">
              {userAcceptList.length > 0 && (
                <div className="flex  min-w-[96px] ">
                  {userAcceptList.slice(0, 3)?.map((e, ind) => {
                    const { imageUrl } = e
                    return (
                      <div
                        key={ind}
                        className={`bg-grey-4 p-[1px]  rounded-full absolute top-0`}
                        style={{
                          left: ind * 28
                        }}
                      >
                        <div className={`relative w-[40px] h-[40px] `}>
                          <Image
                            src={imageUrl}
                            alt=""
                            layout="fill"
                            objectFit="cover"
                            className="rounded-full"
                          />
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
              <p className="sm:text-[16px] text-p14 font-normal text-black leading-[28px]">
                {convertRegisterCourse(userAcceptCourse)} học viên đã tham gia
                khoá học
              </p>
            </div>
            {/* <div className="flex gap-[12px] items-center">
            <XProfileIcon name="check" fill="#294F9B" />
            <p className="sm:text-p18 text-p14 text-neutral">
              Bạn đã hoàn thành{' '}
              <span className="text-blue-light">{finishedVideoAmount}</span>{' '}
              trong <span className="text-blue-light">{videoAmount}</span> bài
              giảng
            </p>
          </div> */}
          </div>
          <div className="flex flex-col xl:w-full w-auto">
            <div className="flex flex-col gap-[16px] mb-[51px]">
              <p className="text-h3 text-black ">{nameCourse}</p>
              <p className="sm:text-[18px] font-bold text-p14-bold  text-black leading-[30px]">
                Giảng viên :{' '}
                <span className="sm:text-[18px] font-normal   text-black text-p14">
                  {intructorName}
                </span>
              </p>
              {/* <p className="text-p20 text-neutral">
            Lĩnh vực : <span className="text-p20-bold">{titleField}</span>
          </p> */}
              <p className="sm:text-[18px] font-bold text-p14-bold  text-black leading-[30px]">
                Đạt được qua khoá học :{' '}
                <span className="sm:text-[18px] font-normal  text-black text-p14 leading-[30px]">
                  {certificate ? `Digital Certificate` : ''}
                  {certificate && productDemo && ' / '}
                  {productDemo ? ` Sản phẩm demo cuối khoá` : ''}
                </span>
              </p>
            </div>
            <div className="xl:w-[651px] w-full ">
              <ProcessBarCourse
                skillMatchingPercentage={skillMatchingPercentage()}
              />
            </div>
            {skillMatchingPercentage() === 100 && finalExamId !== null && (
              <div className="flex flex-wrap gap-[16px] mt-[34px]">
                <button
                  className="hover:opacity-80 duration-150 bg-button flex gap-[8px] justify-center items-center rounded-[8px] w-[209px] h-[44px]"
                  onClick={() => handleDone(guid)}
                >
                  <XProfileIcon name="documentTest" />
                  <p className="text-black sm:text-p18-bold text-p14-bold">
                    Làm bài test
                  </p>
                </button>
                {/* <button
                  className="hover:opacity-80 duration-150 bg-button flex gap-[8px] justify-center items-center rounded-[8px] w-[225px] h-[44px]"
                  onClick={() => handleUploadProduct()}
                >
                  <XProfileIcon name="addProductCourse" />
                  <p className="text-black sm:text-p18-bold text-p14-bold">
                    Nộp sản phẩm
                  </p>
                </button> */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

BannerCourseDetail.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  titleTeacher: PropTypes.string,
  titleField: PropTypes.string,
  titleSkilled: PropTypes.string,
  nameCourse: PropTypes.string,
  userAcceptList: PropTypes.any
}
BannerCourseDetail.defaultProps = {
  description: '',
  title: '',
  titleTeacher: '',
  titleField: '',
  titleSkilled: '',
  nameCourse: 'Cẩm nang từ A-Z Photoshop cho Designer mới bắt đầu',
  userAcceptList: [
    {
      imageUrl: ''
    },
    {
      imageUrl: ''
    },
    {
      imageUrl: ''
    }
  ]
}

export default BannerCourseDetail
