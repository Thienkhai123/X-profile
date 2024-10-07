import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import InformationItem from '../InformationItem'
import SkeletonText from 'common/presentation/Skeleton/SkeletonText'
import { convertCurrency } from 'store/helper/functionHelper'
import JobDescriptionTable from '../JobDecriptionTable'
import DescriptionSalaryEdit from '../DescriptionSalaryEdit'
import DescriptionSalary from '../DescriptionSalary'

const JobInformation = (props) => {
  const {
    title,
    description,
    employeeAmount,
    recruitmentAmount,
    averageSalary,
    maxSalary,
    descriptionTable
  } = props

  return (
    <div className="w-auto">
      <div className="mb-3 text-center xl:text-start">
        {title ? (
          <p className="sm:text-h2 text-p16-bold text-neutral">{title}</p>
        ) : (
          <SkeletonText width="w-[210px]" height="h-[58px]" />
        )}
      </div>
      <div className="mb-10 text-center xl:text-start ">
        {descriptionTable ? (
          <JobDescriptionTable jobDescriptionList={descriptionTable} />
        ) : description ? (
          <div
            className="sm:text-p18 text-p12 text-grey-1"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <div className="flex flex-col gap-[10px]">
            <SkeletonText width="w-full" height="h-[30px]" />
            <SkeletonText width="w-full" height="h-[30px]" />
            <SkeletonText width="w-full" height="h-[30px]" />
          </div>
        )}
      </div>
      <div className="grid xl:flex gap-4 grid-cols-3 md:grid-cols-2 xl:grid-cols-3">
        <div>
          {employeeAmount !== undefined ? (
            <InformationItem
              title="Số lượng nhân sự"
              description={`${employeeAmount} người`}
              width="xl:w-[230px] w-auto"
              height="min-h-[81px] sm:min-h-[112px] h-full xl:h-auto"
            />
          ) : (
            <SkeletonText width="w-[234px]" height="h-[112px]" />
          )}
        </div>

        <div>
          {recruitmentAmount !== undefined ? (
            <InformationItem
              title="Số lượng cần tuyển"
              description={`${recruitmentAmount} người`}
              width="xl:w-[230px] w-auto"
              height="min-h-[81px] sm:min-h-[112px] h-full xl:h-auto"
            />
          ) : (
            <SkeletonText width="w-[234px]" height="h-[112px]" />
          )}
        </div>
        <div>
          {averageSalary !== undefined ? (
            <DescriptionSalary
              value={averageSalary}
              maxSalaryValue={maxSalary}
              width="xl:w-[388px] w-auto"
              height="h-full xl:h-auto"
              // height="min-h-[81px] sm:min-h-[112px]"
            />
          ) : (
            <SkeletonText width="w-[234px]" height="h-[112px]" />
          )}
        </div>
      </div>
    </div>
  )
}

JobInformation.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  employeeAmount: PropTypes.number,
  recruitmentAmount: PropTypes.number,
  averageSalary: PropTypes.number
}
JobInformation.defaultProps = {
  title: '',
  description: '',
  employeeAmount: 0,
  recruitmentAmount: 0,
  averageSalary: 0
}

export default JobInformation
