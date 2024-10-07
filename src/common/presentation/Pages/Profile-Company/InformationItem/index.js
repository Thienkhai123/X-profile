import React from 'react'
import PropTypes from 'prop-types'

const InformationItem = (props) => {
  const { title, description, width, height = '' } = props
  return (
    <div
      className={`${width} ${height} xl:px-[24px] xl:py-[24px] px-[8px] py-[12px]  bg-white  rounded-borderStep`}
      style={{ flexFlow: 'wrap' }}
    >
      <div className="text-center xl:text-start">
        <p className="xl:text-p18 text-grey-1 text-p12">{title}</p>
      </div>
      <div className="text-center xl:text-start mt-2">
        <p className=" xl:text-p20-bold text-p14-bold mt-2 text-neutral">
          {description}
        </p>
      </div>
    </div>
  )
}

InformationItem.propTypes = {
  title: PropTypes.string,
  width: PropTypes.string,
  description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
}
InformationItem.defaultProps = {
  title: 'Số năm thành lập',
  width: 'xl:w-[270px] w-[162px]',
  description: '10 năm'
}

export default InformationItem
