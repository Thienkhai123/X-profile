import React from 'react'
import PropTypes from 'prop-types'

const InformationItemEdit = (props) => {
  const {
    title,
    description,
    width,
    defaultDesc,
    height = '',
    isEdit,
    type,
    isOpacity,
    onChange,
    disabled,
    maxLength,
    min,
    max,
    isValidate = false
  } = props
  return (
    <div
      className={`${width} ${height} ${
        isEdit && isOpacity && 'bg-nude'
      } xl:px-[20px] xl:py-[20px] px-[8px] py-[12px]  bg-white  rounded-borderStep`}
      style={{ flexFlow: 'wrap' }}
    >
      <div className="text-center xl:text-start">
        <p className="xl:text-p18 text-grey-1 text-p12">
          {title}
          {isValidate && (
            <span className="xl:text-p18 text-semantic-red">*</span>
          )}
        </p>
      </div>
      <div className="text-center xl:text-start">
        {!isEdit && (
          <p className="xl:text-h3 text-black text-p14  w-full ">
            {description !== 0 ? description : defaultDesc}
          </p>
        )}
        {isEdit && (
          <input
            placeholder={defaultDesc}
            className="xl:text-p28-bold text-neutral text-p14 disabled:text-grey-1 font-bold w-full outline-0 focus:transition-all focus:duration-500 focus:border-b focus:border-semantic"
            value={description}
            type={type}
            min={min}
            onChange={(e) => onChange(e.target.value)}
            disabled={disabled}
            maxLength={maxLength}
            max={max}
          />
        )}
      </div>
    </div>
  )
}

InformationItemEdit.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  isOpacity: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
}
InformationItemEdit.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]',
  description: 0,
  type: 'number',
  isOpacity: false,
  onChange: () => {},
  disabled: false
}

export default InformationItemEdit
