import React from 'react'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import { HightlightJobCard } from 'common/presentation/Card/HighlightJob'
import PropTypes from 'prop-types'
import useTrans from 'common/hooks/useTrans'
import { useRouter } from 'next/router'

const WorkTop = (props) => {
  const {
    title,
    id,
    jobs,
    isAuthentication,
    roleId,
    jobName,
    handleRedirectWorkTop
  } = props
  const trans = useTrans()
  const { push } = useRouter()
  return (
    <div
      className={`w-full ${
        parseInt(roleId) === 1 ? 'bg-yellow-bg' : 'bg-pink-light'
      }`}
    >
      <div
        id={id}
        className="xl:flex xl:justify-center w-full xl:w-[1140px] xl:min-h-[496.7px] xl:gap-[78px] pb-[40px] px-5 xl:px-0 pt-[40px] mx-auto"
      >
        <div className="xl:w-5/12">
          <div className="mb-8">
            <p className="xl:text-h2 xl:text-left text-center text-p20-bold text-neutral">
              {title} <span>{jobName}</span>
            </p>
          </div>
          <div className="hidden xl:block mb-10">
            <Button
              onClick={handleRedirectWorkTop}
              title="Xem thêm việc làm"
              width="w-[235px]"
              height="h-[48px]"
              padding="py-[12px]"
              rounded="rounded-[12px]"
            />
          </div>
          {/* {roleId === 0 ? (
          <div className="hidden xl:block absolute left-0 ml-[28px]">
            <Image
              width={507}
              height={515}
              src="/images/sheep.png"
              alt=""
              objectFit="cover"
            />
          </div>
        ) : (
          <div className="hidden xl:block absolute left-0 ml-[28px]">
            <Image
              width={524.32}
              height={506}
              src="/images/mouse.png"
              alt=""
              objectFit="cover"
            />
          </div>
        )} */}
        </div>

        <div className="xl:w-7/12 w-full">
          {jobs.length === 0 && (
            <div className="w-full flex flex-col items-center">
              <Image
                src="/images/no-job-found-home.png"
                width={217.686}
                height={243.348}
                alt="no-job-found"
                className="mx-auto"
                quality={100}
              />
              <p className="text-p18 text-grey-1 text-center mt-4">
                {trans.home.empty.jobs}
              </p>
            </div>
          )}
          {jobs?.length > 0 && (
            <div className="grid md:grid-cols-2 grid-cols-2 gap-[20px] ">
              {jobs?.slice(0, 2)?.map((job, ind) => (
                <HightlightJobCard
                  job={job}
                  key={ind}
                  isAuthentication={isAuthentication}
                  handleAction={() => {
                    const { company, departmentId, departmentPositionId } = job
                    const { tag } = company
                    push(
                      `/profile-company/${tag}/${departmentId}/${departmentPositionId}`
                    )
                  }}
                />
              ))}
            </div>
          )}
        </div>
        <div className="xl:hidden flex justify-center mt-6 mb-10">
          <Button
            onClick={handleRedirectWorkTop}
            title="Xem thêm việc làm"
            width="w-[235px]"
            height="h-[48px]"
            padding="py-[12px]"
            rounded="rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

WorkTop.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  jobs: PropTypes.array,
  roleId: PropTypes.number,
  jobName: PropTypes.string,
  handleRedirectWorkTop: PropTypes.func
}

WorkTop.defaultProps = {
  id: '',
  title: '',
  jobs: [],
  isAuthentication: false,
  roleId: 0,
  jobName: '',
  handleRedirectWorkTop: () => {}
}

export default WorkTop
