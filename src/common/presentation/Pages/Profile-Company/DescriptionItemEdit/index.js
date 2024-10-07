import React from 'react'
import PropTypes from 'prop-types'

const DescriptionItemEdit = (props) => {
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
    errors = null
  } = props
  return (
    <div
      className={`${width} ${height}  xl:px-[24px] xl:py-[24px] px-[8px] py-[12px] ${
        disable && isEdit ? 'bg-nude' : 'bg-white'
      }   rounded-borderStep 
      ${errors ? 'border border-semantic-red' : ''}`}
      style={{ flexFlow: 'wrap' }}
    >
      <div className="text-center xl:text-start flex">
        <p className="xl:text-p18 text-grey-1 text-p12">{title}</p>
        {require && isEdit && <p className="text-semantic-red">*</p>}
      </div>
      <div className="text-center xl:text-start mt-2">
        {isEdit ? (
          <input
            placeholder={defaultDesc}
            value={value || ''}
            disabled={disable}
            pattern="\d*"
            onChange={(e) => onChange(e?.target.value)}
            onInput={(e) =>
              (e.target.value = e.target.value.slice(0, maxLength))
            }
            min="0"
            type="number"
            className="w-full disabled:text-grey-1 py-0 font-bold focus:outline-none appearance-none text-p20 placeholder:text-grey-3 placeholder:font-bold"
          />
        ) : (
          <p className="xl:text-p20-bold  text-neutral text-p14 w-full mt-2 ">
            {description !== 0 ? description : defaultDesc}
          </p>
        )}
      </div>
    </div>
  )
}

DescriptionItemEdit.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
DescriptionItemEdit.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]'
}

export default DescriptionItemEdit
