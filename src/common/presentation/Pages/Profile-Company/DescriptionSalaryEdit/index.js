import React, { Fragment, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { convertVietNamCurrency } from 'store/helper/functionHelper'
import {
  selectSalarySelected,
  updateSelectedSalaryOption
} from 'store/app/edit-mode-company/position/jobDescriptionSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

const DescriptionSalaryEdit = (props) => {
  const {
    title,
    description,
    width,
    defaultDesc,
    value,
    height = '',
    isEdit,
    disable = false,
    maxLength,
    require = false,
    onChange = () => {},
    handleResetSalary = () => {},
    onChangeMaxSalaryField = () => {},
    maxSalaryValue,
    errors = null
  } = props
  const dispatch = useDispatch()
  const SORTCV_DATA = [
    { id: 1, name: 'Mức lương', description: '' },
    {
      id: 2,
      name: 'Khoảng lương'
    },
    {
      id: 3,
      name: 'Lương thoả thuận'
    }
  ]
  const [showSalaryOption, setShowSalaryOption] = useState(false)

  const selectedSalary = useSelector(selectSalarySelected)
  const handleSelectSalary = (value) => {
    dispatch(
      updateSelectedSalaryOption({
        id: value?.id,
        name: value?.name
      })
    )
    handleResetSalary()
    setShowSalaryOption(false)
  }
  const refSortCVOpt = useRef(null)
  const handleCloseSortCVOpt = () => setShowSalaryOption(false)
  useOnClickOutside(refSortCVOpt, handleCloseSortCVOpt)
  const EditMode = (
    <Fragment>
      <div className="relative" ref={refSortCVOpt}>
        <button
          className=" xl:min-w-[132px] w-full flex gap-2   items-center"
          onClick={() => setShowSalaryOption(!showSalaryOption)}
        >
          {selectedSalary?.id === 1 ? (
            <Fragment>
              <div className="text-center xl:text-start flex">
                <p className="xl:text-p18 text-grey-1 text-p12">
                  {SORTCV_DATA[0].name}
                </p>
                {require && <p className="text-semantic-red">*</p>}
              </div>

              <XProfileIcon name="arrowDown" />
            </Fragment>
          ) : (
            <Fragment>
              <div className="text-center xl:text-start flex">
                <p className="xl:text-p18 text-grey-1 text-p12">
                  {selectedSalary?.name}
                </p>
                {require && <p className="text-semantic-red">*</p>}
              </div>
              <XProfileIcon name="arrowDown" />
            </Fragment>
          )}
        </button>
        {showSalaryOption && (
          <div className="bg-white max-h-[154px] p-2 drop-shadow-[0_16px_24px_0_#0000000A] border border-grey-4 z-50 w-[208px]  overflow-x-hidden absolute top-8 left-0 rounded-[12px]">
            {SORTCV_DATA?.map((sort) => (
              <div
                key={sort?.id}
                className="flex transition-all justify-between rounded-lg items-center px-4 hover:bg-light-nude py-2 cursor-pointer"
                onClick={() => handleSelectSalary(sort)}
              >
                <div className="w-full">
                  <div className="w-full flex items-center justify-between">
                    <p className="text-p18  text-neutral">{sort?.name}</p>
                    {/* {selectedSalary.id === sort?.id && (
                      <XProfileIcon name="check" />
                    )} */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="text-center xl:text-start ">
        <Fragment>
          {selectedSalary?.id === 1 && (
            <input
              placeholder={defaultDesc}
              value={value || ''}
              pattern="\d*"
              onChange={(e) => onChange(e?.target.value)}
              onInput={(e) =>
                (e.target.value = e.target.value.slice(0, maxLength))
              }
              onKeyDown={(e) =>
                ['e', 'E', '+', '-', '.'].includes(e.key) && e.preventDefault()
              }
              min={0}
              type="number"
              className="w-full mt-2 disabled:text-grey-1 py-0 font-bold focus:outline-none appearance-none text-p20 placeholder:text-grey-3 placeholder:font-bold"
            />
          )}
          {selectedSalary.id === 2 && (
            <div className="flex items-center gap-1 mt-[6px]">
              <input
                placeholder={'0'}
                value={value || ''}
                pattern="\d*"
                onChange={(e) => onChange(e?.target.value)}
                onKeyDown={(e) =>
                  ['e', 'E', '+', '-', '.'].includes(e.key) &&
                  e.preventDefault()
                }
                onInput={(e) =>
                  (e.target.value = e.target.value.slice(0, maxLength))
                }
                min={0}
                type="number"
                className="w-full border border-grey-3  rounded-lg text-center disabled:text-grey-1 py-0 font-bold focus:outline-none appearance-none text-p20 placeholder:text-grey-3 placeholder:font-bold"
              />
              <p className="text-p20-bold">-</p>
              <input
                placeholder={'0'}
                value={maxSalaryValue || ''}
                pattern="\d*"
                onChange={(e) => onChangeMaxSalaryField(e?.target.value)}
                onKeyDown={(e) =>
                  ['e', 'E', '+', '-', '.'].includes(e.key) &&
                  e.preventDefault()
                }
                onInput={(e) =>
                  (e.target.value = e.target.value.slice(0, maxLength))
                }
                min={0}
                type="number"
                className="w-full border border-grey-3  rounded-lg text-center disabled:text-grey-1 py-0 font-bold focus:outline-none appearance-none text-p20 placeholder:text-grey-3 placeholder:font-bold"
              />
            </div>
          )}
          {selectedSalary.id === 3 && (
            <input
              placeholder={'Không có mức lương cụ thể'}
              value={'Không có mức lương cụ thể'}
              disabled={true}
              min={0}
              type="number"
              className="w-full mt-2 disabled:text-grey-1 py-0 font-bold focus:outline-none appearance-none text-p20 placeholder:text-grey-1 placeholder:font-bold"
            />
          )}
        </Fragment>
      </div>
    </Fragment>
  )
  const DivMode = (
    <Fragment>
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
        {/* {require && <p className="text-semantic-red">*</p>} */}
      </div>

      <div className="text-center xl:text-start ">
        {((maxSalaryValue === 0 && value !== 0) ||
          (maxSalaryValue !== 0 &&
            value !== 0 &&
            maxSalaryValue === value)) && (
          <p className="xl:text-p20-bold text-p14-bold text-neutral w-full mt-2 ">
            {convertVietNamCurrency(value || 0, false)}
          </p>
        )}
        {maxSalaryValue !== 0 && maxSalaryValue !== value && (
          <div className="flex items-center gap-1 mt-2">
            <p className="xl:text-p20-bold text-p14-bold font-bold text-neutral w-fit  ">
              {convertVietNamCurrency(value || 0, false)}
            </p>
            <p className="text-p20-bold">-</p>
            <p className="xl:text-p20-bold text-p14-bold  text-neutral  w-fit ">
              {convertVietNamCurrency(maxSalaryValue || 0, false)}
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
    </Fragment>
  )
  useEffect(() => {
    if (value === 0 && maxSalaryValue === 0) {
      dispatch(updateSelectedSalaryOption(SORTCV_DATA[2]))
    } else {
      if (maxSalaryValue !== 0 && maxSalaryValue !== value) {
        dispatch(updateSelectedSalaryOption(SORTCV_DATA[1]))
      } else {
        dispatch(updateSelectedSalaryOption(SORTCV_DATA[0]))
      }
    }
  }, [isEdit])
  return (
    <div
      className={`${width} ${height}  xl:px-[24px] xl:py-[24px] px-[8px] py-[12px]  ${
        isEdit && selectedSalary.id === 3 ? 'bg-nude' : 'bg-white'
      }   rounded-borderStep 
      ${errors ? 'border border-semantic-red' : ''}`}
      style={{ flexFlow: 'wrap' }}
    >
      {isEdit ? EditMode : DivMode}
    </div>
  )
}

DescriptionSalaryEdit.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DescriptionSalaryEdit.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]'
}

export default DescriptionSalaryEdit
