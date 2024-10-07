import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import Link from 'next/link'

const SolutionRecruitment = (props) => {
  const {
    title,
    name,
    decsription,
    titleButton,
    titleResearch,
    handleCreateProfile
  } = props

  return (
    <div className=" flex  justify-center px-5 xl:px-0  py-4 xl:py-0">
      <div className="flex  justify-between xl:h-[605px] pb-[20px]  xl:relative lg:w-[1440px] md:pl-[72px] pl-0 xl:pt-[72px]">
        <div className="hidden xl:block ">
          <Image
            width={200.12}
            height={181.26}
            placeholder="blur"
            blurDataURL="/images/triangleSolution.png"
            src="/images/triangleSolution.png"
            alt=""
            objectFit="contain"
            quality={100}
          />
        </div>
        <div className="flex w-full flex-wrap md:flex-nowrap justify-center items-center  xl:absolute xl:top-[146px] xl:left-[182px] xl:w-[1089px] ">
          <div className="lg:mr-[142px] hidden xl:block">
            <Image
              width={625}
              height={440}
              placeholder="blur"
              blurDataURL="/images/Giaiphaptuyendung1.webp"
              src="/images/Giaiphaptuyendung1.webp"
              alt=""
              objectFit="contain"
              quality={100}
            />
          </div>
          <div className="xl:max-w-[480px] w-full ">
            <div className="mb-[12px] xl:max-w-[392px] max-w-[242px] text-center mx-auto xl:mx-0 lg:text-start">
              <p className="text-blue-light xl:text-h2 text-p20-bold">
                {title}
                <span className="text-neutral xl:text-h2 text-p20-bold">
                  với {name}
                </span>
              </p>
            </div>
            <div className="md:mb-[48px] mb-[20px] max-w-[307px] xl:max-w-none text-center lg:text-start">
              <div
                className="xl:text-p18 text-p12 leading-7  text-neutral"
                dangerouslySetInnerHTML={{ __html: decsription }}
              />
            </div>
            <div className="xl:mb-[24px] w-full flex items-center justify-center lg:justify-start">
              <div className=" xl:hidden w-[192px] h-[174px]">
                <Image
                  width={578}
                  height={522}
                  placeholder="blur"
                  blurDataURL="/images/Giai_Phap_Tuyen_Dung_Mobile.webp"
                  src="/images/Giai_Phap_Tuyen_Dung_Mobile.webp"
                  alt=""
                  objectFit="contain"
                  quality={100}
                />
              </div>
              <Button
                width="xl:min-w-[133px] w-full"
                height="h-[48px]"
                padding="py-4 px-8"
                title={titleButton}
                color="text-neutral"
                rounded="rounded-lg"
                textWeight="text-p14-bold xl:text-p18-bold"
                onClick={() => handleCreateProfile()}
              />
            </div>
            <div className="hidden xl:flex xl:flex-row flex-col items-center gap-4 cursor-pointer justify-center lg:justify-start">
              <div className="mr-[8px]">
                <XProfileIcon name="book" />
              </div>
              <a
                href="https://blog.xprofile.vn/category/huong-dan/"
                rel="noreferrer"
                target="_blank"
              >
                <p className="text-p16-bold text-blue-2">{titleResearch}</p>
              </a>
            </div>
          </div>
        </div>
        <div className="hidden xl:flex items-end">
          <Image
            width={162.326}
            height={387.428}
            placeholder="blur"
            blurDataURL="/images/3.png"
            src="/images/3.png"
            alt=""
            objectFit="contain"
            quality={100}
          />
        </div>
      </div>
    </div>
  )
}

SolutionRecruitment.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string,
  decsription: PropTypes.string,
  titleButton: PropTypes.string,
  titleResearch: PropTypes.string,
  handleCreateProfile: PropTypes.func
}
SolutionRecruitment.defaultProps = {
  title: 'Giải pháp tuyển dụng ',
  name: 'X-Profile',
  decsription:
    '<span>Nền tảng cung cấp giải pháp xây dựng thương hiệu và hồ sơ tuyển dụng tin cậy.<br /> Bạn có đang tìm kiếm ứng viên tiềm năng?</span>',
  titleButton: 'Tạo hồ sơ',
  titleResearch: 'Tìm hiểu cách bắt đầu với X-Profile',
  handleCreateProfile: () => {}
}

export default SolutionRecruitment
