import Button from 'common/presentation/Button'
import Image from 'next/image'
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'

const Introduce = (props) => {
  const {
    title,
    description,
    titleSalary,
    titleWork,
    titleTrends,
    backgroundUrl,
    meta,
    roleId,
    selectedJobId,
    titleDataSource,
    descriptionDataSource,
    workWithJobs
  } = props

  const {
    averageSalary,
    growthTrend,
    mouseBackgroundColor,
    newJobAmount,
    sheepBackgroundColor
  } = meta || {}

  const { push } = useRouter()
  const handleLick = () => {
    push(`/career-path/it/${selectedJobId}`)
  }

  return (
    <Fragment>
      <div
        className=" h-auto  pt-[40px] pb-[40px] xl:pb-[88px] xl:pt-[100px] px-4 xl:pl-0 xl:pr-0"
        style={{
          backgroundColor:
            roleId === 0 ? sheepBackgroundColor : mouseBackgroundColor
        }}
      >
        <div className="xl:flex xl:justify-between items-center  xl:items-center xl:w-[1140px] mx-auto xl:gap-[60px]">
          <div className="xl:w-1/3 ">
            <div className="mb-3">
              <p className="xl:text-p36-bold text-p20-bold  text-center xl:text-left text-neutral ">
                {title}
              </p>
            </div>
            <div className="mb-8">
              <p className="text-grey-1 xl:text-p16 text-p12 text-justify xl:text-left xl:px-0 px-4 leading-7 ">
                {description}
              </p>
            </div>
            <div className="hidden xl:block">
              <Button
                title="Tìm hiểu"
                width="w-[141px]"
                height="h-[48px]"
                rounded="rounded-lg"
                onClick={() => handleLick()}
              />
            </div>
          </div>
          <div className="relative xl:w-1/3 ">
            <Image
              src={backgroundUrl || '/images/bearBoss.png'}
              width={400}
              height={377}
              alt=""
              objectFit="contain"
              className="mx-auto"
              quality={100}
            />
          </div>
          <div className="xl:w-1/3">
            <div className="mb-10 ">
              <div>
                <p className="text-grey-1 xl:text-p16 text-p14">
                  {titleSalary}
                </p>
              </div>
              <div>
                <p className="text-neutral xl:text-p32-bold text-p18-bold">
                  {averageSalary}
                </p>
              </div>
            </div>

            {workWithJobs && (
              <div>
                <p className="text-grey-1 text-p18">Thường làm việc cùng với</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  {workWithJobs?.map((job, ind) => {
                    const { name = '' } = job || {}
                    return (
                      <div
                        key={ind}
                        className={`${
                          roleId === 1 ? 'bg-button ' : 'bg-pink-dark '
                        } rounded-[40px] py-2 px-4`}
                      >
                        <p className="text-p14 text-white text-ellipsis ">
                          {name}
                        </p>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="xl:hidden flex justify-center mt-6">
              <Button
                title="Tìm hiểu"
                width="w-[117px]"
                heght="h-[48px]"
                onClick={() => handleLick()}
              />
            </div>
          </div>
        </div>
        <div className=" mt-4 xl:w-[1140px]  mx-auto">
          <p className="sm:text-p14 text-grey-1 text-p12">
            {titleDataSource} {descriptionDataSource}
          </p>
        </div>
      </div>
    </Fragment>
  )
}

export default Introduce

Introduce.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  titleSalary: PropTypes.string,
  titleWork: PropTypes.string,
  titleTrends: PropTypes.string,
  backgroundUrl: PropTypes.string,
  meta: PropTypes.object,
  roleId: PropTypes.number,
  titleDataSource: PropTypes.string,
  descriptionDataSource: PropTypes.string,
  workWithJobs: PropTypes.array
}
Introduce.defaultProps = {
  title: '',
  description: '',
  titleSalary: 'Mức lương trung bình',
  titleWork: 'Cơ hội việc làm',
  titleTrends: 'Xu hướng phát triển',
  backgroundUrl: null,
  meta: {},
  roleId: 0,
  titleDataSource: 'Nguồn dữ liệu:',
  descriptionDataSource:
    'Vietnam IT Market Report 2022 - TOPDEV, Job Go và một số nguồn khác',
  workWithJobs: []
}
