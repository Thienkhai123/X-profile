import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import Button from 'common/presentation/Button'
import BreadCrumbs from 'common/presentation/breadCrumbs'
import {
  convertCurrency,
  convertRegisterCourse
} from 'store/helper/functionHelper'
import InformationCourse from 'common/presentation/InformationCourse'

const BannerCoursePay = (props) => {
  const {
    description,
    title,
    price,
    priceSale,
    intructorName,
    userAcceptCourse,
    userAcceptList,
    titleBannerCourse,
    titleBreadCrumbs,
    imageUrl,
    isUserOwned,
    seoName,
    productGuid,
    isUserLiked,
    handlePaymentCourse = () => {},
    handleFavouriteCourse = () => {},
    author = 'X-Profile',
    level,
    typeCourseCombo
  } = props
  return (
    <div className="bg-white pt-[32px] px-[20px] xl:px-0">
      <div className="flex justify-center mb-[32px]">
        <div className="flex w-[1140px] ">
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
      <div className="xl:flex justify-center gap-[48px] ">
        <div className="sm:mb-0 mb-[12px]">
          <div className="mb-[16px]">
            <Image
              src={imageUrl}
              alt=""
              width={434}
              height={211}
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
            <p className="text-p16 leading-[28px] text-black">
              {convertRegisterCourse(userAcceptCourse)} học viên đã tham gia
              khoá học
            </p>
          </div>
        </div>
        <div className="xl:w-[658px] w-auto">
          <div className="flex flex-col gap-[8px] w-full mb-[24px]">
            <p className="sm:text-h3 text-p20-bold text-black">{title}</p>
            <p className="sm:text-p16 leading-[28px] text-p12 text-black">
              {description}
            </p>
            <p className="sm:text-p16 leading-[28px] text-p12 text-grey-1">
              Khóa học bởi{' '}
              <span className="sm:text-p16 leading-[28px] text-p12 text-button-2">
                {author}
              </span>
            </p>
          </div>
          <div className="flex gap-[16px] items-center mb-[16px]">
            <Fragment>
              {priceSale <= 0 ? (
                <>
                  <p className="sm:text-h4 text-p18-bold text-semantic-red">
                    Miễn phí
                  </p>
                  <p className="sm:text-p18 leading-[30px] text-p16 text-grey-1 line-through">
                    {convertCurrency(price)}
                  </p>
                </>
              ) : price > 0 && priceSale <= price ? (
                <>
                  <p className="sm:text-h4 text-p18-bold text-button-2">
                    {convertCurrency(priceSale)}
                  </p>
                  <p className="sm:text-p18 leading-[30px] text-p16 text-grey-1 line-through">
                    {convertCurrency(price)}
                  </p>
                  {typeCourseCombo && (
                    <div className="px-[16px] rounded-full bg-light-nude ">
                      <p className="text-button-2 text-p12-bold italic leading-[26px]">
                        Giá ưu đãi cho riêng bạn
                      </p>
                    </div>
                  )}
                </>
              ) : (
                price >= 0 &&
                priceSale >= price && (
                  <p className="text-p14-bold lg:text-p18-bold text-black">
                    {convertCurrency(priceSale)}
                  </p>
                )
              )}
            </Fragment>
          </div>
          <div className="flex flex-wrap justify-center sm:justify-start gap-[16px] items-center">
            <button
              className="flex gap-[8px] justify-center items-center rounded-[8px] border border-[#F6BB3A] bg-inherit w-[272px] h-[48px]"
              onClick={() => handleFavouriteCourse(productGuid, isUserLiked)}
            >
              <XProfileIcon
                name="heartUncheck"
                width="24"
                height="24"
                fill={isUserLiked ? '#F7BB3A' : 'none'}
              />
              <p className="text-[#F6BB3A] sm:text-p18-bold text-p14-bold">
                {isUserLiked ? 'Đã thêm vào yêu thích' : 'Thêm vào yêu thích'}
              </p>
            </button>
            {isUserOwned ? (
              <Button
                title="Chi tiết khóa học"
                height="h-[48px]"
                width="w-[190px]"
                rounded="rounded-[8px]"
                color="text-black"
                margin="mt-0"
                textWeight="sm:text-p18-bold text-p14-bold"
                onClick={() => handlePaymentCourse(seoName, isUserOwned)}
              />
            ) : (
              <Button
                title="Mua khoá học"
                height="h-[48px]"
                width="w-[190px]"
                rounded="rounded-[8px]"
                color="text-black"
                margin="mt-0"
                textWeight="sm:text-p18-bold text-p14-bold"
                onClick={() => handlePaymentCourse(seoName, isUserOwned)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div className="flex flex-col xl:flex-row  xl:w-[1140px] xl:my-[80px] my-[20px] gap-[8px] xl:gap-0">
          <InformationCourse
            title="Giảng viên"
            description={intructorName}
            name="smileCircleProductGuid"
          />
          <InformationCourse
            title="Đạt được qua khoá học"
            description={titleBannerCourse}
            name="handStarsProductGuid"
          />
          <InformationCourse
            title="Trình độ"
            description={level}
            name="starProductGuid"
          />
        </div>
      </div>
    </div>
  )
}

BannerCoursePay.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  price: PropTypes.number,
  priceSale: PropTypes.number,
  intructorName: PropTypes.string,
  resultCourse: PropTypes.any,
  userAcceptCourse: PropTypes.any,
  userAcceptList: PropTypes.arrayOf(
    PropTypes.shape({
      imageUrl: PropTypes.string,
      position: PropTypes.number
    })
  )
}
BannerCoursePay.defaultProps = {
  description: '',
  title: '',
  price: 0,
  priceSale: 0,
  intructorName: '',
  certificate: '',
  productDemo: '',
  userAcceptCourse: 0,
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

export default BannerCoursePay
