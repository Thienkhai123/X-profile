import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { convertCurrency } from 'store/helper/functionHelper'

const DescriptionSalary = (props) => {
  const {
    title,
    description,
    width,
    defaultDesc,
    value,
    height = '',
    isEdit,

    require = false,

    maxSalaryValue,
    errors = null
  } = props

  return (
    <div
      className={`${width} ${height}  xl:px-[24px] xl:py-[24px] px-[8px] py-[12px] overflow-hidden ${
        isEdit && selectedSortCV.id === 3 ? 'bg-nude' : 'bg-white'
      }   rounded-borderStep 
      ${errors ? 'border border-semantic-red' : ''}`}
      style={{ flexFlow: 'wrap' }}
    >
      <div className="text-center xl:text-start flex">
        {((maxSalaryValue === 0 && value !== 0) ||
          (maxSalaryValue !== 0 &&
            value !== 0 &&
            maxSalaryValue === value)) && (
          <p className="xl:text-p18 text-grey-1 text-p12">{'Mức lương'}</p>
        )}
        {maxSalaryValue !== 0 && maxSalaryValue !== value && (
          <p className="xl:text-p18 text-grey-1 text-p12">{'Khoảng lương'}</p>
        )}
        {maxSalaryValue === 0 && value === 0 && (
          <p className="xl:text-p18 text-grey-1 text-p12">{'Mức lương'}</p>
        )}
        {require && <p className="text-semantic-red">*</p>}
      </div>

      <div className="text-center xl:text-start ">
        {((maxSalaryValue === 0 && value !== 0) ||
          (maxSalaryValue !== 0 &&
            value !== 0 &&
            maxSalaryValue === value)) && (
          <p className="xl:text-p20-bold text-p14-bold text-neutral w-full mt-2 ">
            {convertCurrency(value || 0, false)}
          </p>
        )}
        {maxSalaryValue !== 0 && maxSalaryValue !== value && (
          <div className="flex items-center gap-1 mt-2">
            <p className="xl:text-p20-bold text-p14-bold font-bold text-neutral w-fit  ">
              {convertCurrency(value || 0, false)}
            </p>
            <p className="text-p20-bold">-</p>
            <p className="xl:text-p20-bold text-p14-bold  text-neutral  w-fit ">
              {convertCurrency(maxSalaryValue || 0, false)}
            </p>
          </div>
        )}
        {maxSalaryValue === 0 && value === 0 && (
          <div>
            <p className="w-full xl:text-p20-bold text-p14-bold mt-2 text-neutral py-0  ">
              Lương thoả thuận
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

DescriptionSalary.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DescriptionSalary.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]'
}

export default DescriptionSalary
