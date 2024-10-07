import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import moment from 'moment'
import { useRef } from 'react'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const EducationItem = (props) => {
  const {
    nameSchool,
    subject,
    group,
    handleRemoveItem = () => {},
    handleSelectedItem = () => {},
    handleEditMobile = () => {},
    showEditTool,
    timeStart,
    timeEnd
  } = props
  const [displayTime, setDisplayTime] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const btnRef = useRef()

  const handleClickOutSide = () => setIsOpen(false)
  useOnClickOutside(btnRef, handleClickOutSide)

  useEffect(() => {
    const tempStartDate = moment(new Date(timeStart)).format('YYYY')
    const tempEndDate = moment(new Date(timeEnd)).format('YYYY')
    if (tempEndDate === 'Invalid date') {
      setDisplayTime(tempStartDate + '-' + 'Hiện tại')
      return
    }
    if (!isNaN(tempStartDate)) {
      setDisplayTime(tempStartDate + '-' + tempEndDate)
      return
    }
  }, [timeEnd, timeStart])

  return (
    <>
      <div className="flex justify-between items-start my-6">
        <div className="flex items-start gap-4 w-full group cursor-pointer">
          <div className="mt-1">
            <XProfileIcon name="cap" />
          </div>
          <div className="flex flex-col">
            <p className="text-black text-p18-bold line-clamp-2">
              {nameSchool}
            </p>
            <p className="text-grey-1 text-p14 xl:text-p16 line-clamp-2">
              {subject} • {displayTime}
            </p>
          </div>
        </div>
        {showEditTool && (
          <div ref={btnRef} className="relative">
            <div onClick={() => setIsOpen(!isOpen)} className="xl:hidden">
              <XProfileIcon name="menuDot" />
            </div>
            {isOpen && (
              <div
                className="w-[120px] h-fit p-2 border border-grrey-4 z-20 rounded-lg bg-white 
               flex flex-col  absolute -top-10 right-8 shadow-blur16"
              >
                <div className=" items-center gap-4 xl:hidden flex flex-col ">
                  <div
                    className="cursor-pointer flex gap-3 px-3 py-2"
                    onClick={() => handleEditMobile(group)}
                  >
                    <XProfileIcon name="pen" />
                    <span className="text-p16">Sửa</span>
                  </div>
                  <div
                    className="cursor-pointer flex gap-3 px-3 py-2"
                    onClick={() => handleRemoveItem(group)}
                  >
                    <XProfileIcon name="trash" />
                    <span className="text-p16">Xoá</span>
                  </div>
                </div>
              </div>
            )}
            <div className=" items-center gap-4 hidden xl:flex">
              <div
                className="cursor-pointer"
                onClick={() => handleSelectedItem(group)}
              >
                <XProfileIcon name="pen" />
              </div>
              <div
                className="cursor-pointer"
                onClick={() => handleRemoveItem(group)}
              >
                <XProfileIcon name="trash" />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

EducationItem.propTypes = {
  nameSchool: PropTypes.string,
  subject: PropTypes.string,
  group: PropTypes.number,
  handleRemoveItem: PropTypes.func,
  handleSelectedItem: PropTypes.func,
  showEditTool: PropTypes.bool,
  timeStart: PropTypes.string,
  timeEnd: PropTypes.string
}
EducationItem.defaultProps = {
  handleRemoveItem: () => {},
  handleSelectedItem: () => {},
  showEditTool: true,
  group: 0,
  nameSchool: '',
  subject: '',
  timeStart: '',
  timeEnd: ''
}

export default EducationItem
