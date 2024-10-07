import React from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import Trend from '../Trend'
import BreadCrumbs from '../BreadCrumbs'
import { useRouter } from 'next/router'

const GenaralField = (props) => {
  const {
    title,
    description,
    averageSalary,
    newJobAmount,
    growthTrend,
    avatarUrl,
    workWithJobs
  } = props
  const { query } = useRouter()
  const { categoryId } = query

  return (
    <div className="xl:flex xl:justify-center h-auto xl:min-h-[522px] md:pb-4 pb-8  bg-white">
      <div className="xl:flex xl:justify-center xl:pt-10 pt-8">
        <div className="hidden xl:relative xl:ml-[67px]  w-auto xl:block xl:mb-20  xl:mr-16">
          <Image
            src={avatarUrl}
            width={426}
            height={400}
            quality={100}
            alt=""
            objectFit="contain"
          />
        </div>
        <div className="xl:ml-16 xl:px-0 px-6">
          <div className="mb-2">
            <BreadCrumbs jobName={title} jobCategoryId={categoryId} />
          </div>
          <div className="mb-3 md:block hidden">
            <p className="sm:text-h1 xl:max-w-[558px] text-p20-bold sm:text-start text-center">
              {title}
            </p>
          </div>
          <div className="xl:hidden block w-[51.7vw] h-[48.69vw] mx-auto md:my-5 mt-4 mb-2">
            <Image
              src={avatarUrl}
              width={582}
              height={547.77}
              quality={100}
              alt=""
              objectFit="contain"
            />
          </div>
          <div className="mb-2 md:hidden">
            <p className="sm:text-h1 xl:max-w-[558px] text-p20-bold sm:text-start text-center">
              {title}
            </p>
          </div>
          <div className="sm:mb-8 mb-4 xl:px-0 px-4">
            <div className="xl:w-[558px] w-auto">
              <p className="sm:text-p18 text-p14 xl:text-start text-center font-normal text-grey-1">
                {description}
              </p>
            </div>
          </div>
          <div className="flex flex-col  xl:flex-row xl:justify-between gap-2 px-4 xl:px-0">
            <div className="flex flex-col xl:items-start items-center xl:gap-4 gap-2">
              <p className="text-p16 xl:text-p18 md:text-grey-1 text-black">
                Mức lương trung bình
              </p>
              <p className="text-p20-bold text-blue-light">{averageSalary}</p>
            </div>
            <div className=" flex flex-col xl:items-start items-center gap-4 flex-wrap">
              <p className="text-p16 xl:text-p18 md:text-grey-1 text-black">
                Thường làm việc với
              </p>
              <div className="flex flex-wrap gap-2 xl:w-[306px] w-[256px] justify-center xl:justify-normal ">
                {workWithJobs?.map((job, ind) => {
                  const { name = '' } = job || {}
                  return (
                    <div
                      key={ind}
                      className="bg-button rounded-[40px] py-2 md:px-4 px-3"
                    >
                      <p className="md:text-p14 text-p12 font-bold text-white text-ellipsis ">
                        {name}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          {/* <div className="flex md:flex-row flex-col md:justify-between items-center sm:gap-0 gap-8">
            <Trend
              src="/images/career_path/salary.png"
              title="Mức lương trung bình"
              description={averageSalary}
            />
            <Trend
              title="Xu hướng phát triển"
              description={growthTrend}
              src="/images/career_path/develop.png"
              showIcon
            />
            <Trend
              title="Cơ hội việc làm"
              description={newJobAmount}
              src="/images/career_path/job.png"
            />
          </div> */}
        </div>
      </div>
    </div>
  )
}

GenaralField.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  averageSalary: PropTypes.string,
  newJobAmount: PropTypes.string,
  growthTrend: PropTypes.string,
  avatarUrl: PropTypes.string
}
GenaralField.defaultProps = {
  title: '',
  description: '',
  averageSalary: '',
  newJobAmount: '',
  growthTrend: '',
  avatarUrl: '/images/career_path/BA 4.png'
}

export default GenaralField
