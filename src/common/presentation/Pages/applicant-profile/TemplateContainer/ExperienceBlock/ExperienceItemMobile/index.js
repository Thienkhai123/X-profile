import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import moment from 'moment'
import { delay } from 'store/helper/functionHelper'
import useOnClickOutside from 'common/hooks/useClickOutSide'

const ExperienceItemMobile = (props) => {
  const {
    TimeOfExp,
    UnitOfTime,
    Title,
    SubTitle,
    Time,
    Description,
    group,
    editMode,
    handleRemoveItem,
    isDisable,
    handleChangeValueItem,
    autoFocus,
    handleChangeValueItems,
    version,
    showHidden = true,
    handleSelectedItem = () => {},
    showEditTool = true
  } = props
  const [hidden, setHidden] = useState(showHidden)
  const [displayTime, setDisplayTime] = useState('')
  const menuActionRef = useRef(null)
  const [menuAction, setMenuAction] = useState(false)
  const handleCloseMenuAction = () => setMenuAction(false)
  useOnClickOutside(menuActionRef, handleCloseMenuAction)

  const ViewMode = (
    <div
      onClick={() => setHidden(!hidden)}
      className={`border-[2px] rounded-borderStep border-stoke  sm:px-[30px] px-4 sm:py-4 py-2`}
    >
      <div className="sm:flex justify-between items-center h-full  ">
        <div className="flex h-full items-center w-full">
          {/* <button
            onClick={() => {
              if (!isDisable) {
                setHidden(!hidden)
              }
            }}
          >
            <div className="pr-[28px] py-[15px]">
              <div
                className={`${hidden ? 'transition rotate-180' : 'transition'}`}
              >
                <XProfileIcon
                  name="vector5"
                  fill={hidden ? '#294F9B' : '#999999'}
                />
              </div>
            </div>
          </button> */}
          {/* <div className="mr-[18px] bg-stoke rounded-borderStep p-8 h-[80px] w-[80px] text-center flex flex-col items-center justify-center">
            <p className="sm:text-h3 text-p20-bold text-blue-light">
              {TimeOfExp}
            </p>
            <p className="sm:text-p14 text-p12 text-neutral">{UnitOfTime}</p>
          </div> */}
          <div className="flex justify-between gap-4 w-full">
            <div className="flex-1">
              <div className="flex flex-col justify-between">
                <div
                  className="inline-block"
                  style={{
                    wordBreak: 'break-word'
                  }}
                >
                  <p className="text-p16-bold text-black">{Title}</p>
                </div>
                <div
                  className="inline-block"
                  style={{
                    wordBreak: 'break-word'
                  }}
                >
                  <p className=" text-p14 text-grey-1">{SubTitle}</p>
                </div>
                <div className="">
                  <p className=" text-p14 text-grey-1">{displayTime}</p>
                </div>
              </div>
            </div>
            {showEditTool && (
              <div ref={menuActionRef} className="relative">
                <div
                  onClick={(e) => {
                    setMenuAction(!menuAction), e.stopPropagation()
                  }}
                >
                  <XProfileIcon name="menuDot" />
                </div>
                {menuAction && (
                  <div className="absolute right-0 p-2 z-30 rounded-lg border border-grey-4 bg-white flex flex-col items-center justify-center">
                    <div
                      className="cursor-careerPath px-4 py-2 flex items-center gap-2"
                      onClick={() => handleSelectedItem(group)}
                    >
                      <XProfileIcon name="pen" />
                      <p className="text-p16">Sửa</p>
                    </div>
                    <div
                      className="cursor-careerPath px-4 py-2 flex items-center gap-2"
                      onClick={() => handleRemoveItem(group)}
                    >
                      <XProfileIcon name="trash" />
                      <p className="text-p16">Xoá</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div>
        {Description && (
          <pre
            className={`whitespace-pre-wrap	text-p14 font-normal text-black break-words ${
              hidden
                ? 'opacity-100 duration-300  mt-[15px] pt-[15px] border-t-2 h-auto'
                : 'hidden h-0 duration-300'
            }`}
          >
            {Description}
          </pre>
        )}
        {!Description && (
          <pre
            className={`whitespace-pre-wrap	text-p14 font-normal text-grey-2 break-words ${
              hidden
                ? 'opacity-100 duration-300  mt-[15px] pt-[15px] border-t-2 h-auto'
                : 'hidden h-0 duration-300'
            }`}
          >
            {
              'Từ ... đến ... :\nVị trí:\nThành tích: (Thay vì viết mô tả công việc, hãy nêu rõ một vài thành tích nổi bật của bạn khi làm việc tại vị trí này, kèm theo số liệu tương ứng để gây ấn tượng nhé)\n\nTừ 2016 đến 2022 :\nVị trí: Marketing Executive\nThành tích: Xây dựng thành công fanpage với 100.000 người theo dõi'
            }
          </pre>
        )}
      </div>
    </div>
  )

  useEffect(() => {
    if (Time) {
      const times = Time.split(' - ')
      if (times?.length === 2) {
        const tempStartDate = moment(new Date(times[0])).format('YYYY')
        const tempEndDate = moment(new Date(times[1])).format('YYYY')
        if (tempEndDate === 'Invalid date') {
          setDisplayTime(tempStartDate + '-' + times[1])
          return
        }
        if (!isNaN(tempStartDate)) {
          setDisplayTime(tempStartDate + '-' + tempEndDate)
          return
        }
      } else {
        const tempStartDate = moment(new Date()).format('YYYY')
        const tempEndDate = moment(new Date()).format('YYYY')
        setDisplayTime(tempStartDate + '-' + tempEndDate)
      }
    }
  }, [Time, TimeOfExp, UnitOfTime])

  // if (editMode) {
  //   return EditMode
  // }

  return ViewMode
}

ExperienceItemMobile.propTypes = {
  TimeOfExp: PropTypes.string,
  UnitOfTime: PropTypes.string,
  Title: PropTypes.string,
  SubTitle: PropTypes.string,
  Time: PropTypes.string,
  Description: PropTypes.string,
  group: PropTypes.any,
  editMode: PropTypes.bool,
  editingId: PropTypes.any,
  isDisable: PropTypes.bool,
  autoFocus: PropTypes.bool,
  version: PropTypes.number,
  handleEditingItem: PropTypes.func,
  handleSaveItem: PropTypes.func,
  handleChangeValueItem: PropTypes.func,
  handleChangeValueItems: PropTypes.func
}
ExperienceItemMobile.defaultProps = {
  TimeOfExp: '',
  UnitOfTime: '',
  Title: '',
  SubTitle: '',
  Time: '',
  Description: '',
  group: null,
  editMode: false,
  editingId: null,
  isDisable: false,
  autoFocus: false,
  version: 0,
  handleEditingItem: () => {},
  handleSaveItem: () => {},
  handleChangeValueItem: () => {},
  handleChangeValueItems: () => {}
}

export default ExperienceItemMobile
