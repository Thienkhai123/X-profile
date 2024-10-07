import React from 'react'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'

const InformationYearItemEdit = (props) => {
  const {
    title,
    description,
    width,
    defaultDesc,
    height = '',
    selectedDate,
    onChange = () => {},
    isValidate = false
  } = props

  return (
    <div
      className={`${width} ${height} xl:px-[20px] xl:py-[20px] px-[8px] py-[12px]  bg-white  rounded-borderStep`}
      style={{ flexFlow: 'wrap' }}
    >
      <div className="text-center xl:text-start">
        <p className="xl:text-p18 text-grey-2 text-p12">
          {title}
          {isValidate && (
            <span className="xl:text-p18 text-semantic-red">*</span>
          )}
        </p>
      </div>
      <div className="text-center xl:text-start">
        <DatePicker
          dateFormat="dd/MM/yyyy"
          dateFormatCalendar="MMMM"
          placeholder={defaultDesc}
          selected={selectedDate}
          onChange={(date) => onChange(date)}
          showYearDropdown
          yearDropdownItemNumber={30}
          scrollableYearDropdown
          // onKeyDown={(e) => {
          //   e.preventDefault()
          // }}
          maxDate={new Date()}
          className="xl:text-p28-bold text-neutral text-p14  w-full   appearance-none  "
        />
      </div>
    </div>
  )
}

InformationYearItemEdit.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
InformationYearItemEdit.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]',
  description: '10 năm'
}

export default InformationYearItemEdit
