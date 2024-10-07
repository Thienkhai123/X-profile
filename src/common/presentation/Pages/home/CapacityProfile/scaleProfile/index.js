import React from 'react'
import PropTypes from 'prop-types'
const ScaleProfile = (props) => {
  const {
    roleId = 0,
    title,
    precent,
    templateForDnd = [],
    checkTemplateIsActiveIsActive = {}
  } = props
  return (
    <div className="w-full">
      <div className="flex mb-[16px] gap-[8px]">
        <p className="text-p18 text-neutral">{title}</p>
        <p className="text-p18-bold text-neutral">{precent}</p>
      </div>
      <div className="flex justify-between w-full">
        {roleId === 0 && (
          <>
            <div className={`w-full h-[12px] rounded mr-1 bg-[#E29D98]`}></div>
            {templateForDnd.map((e, ind) => {
              return (
                <div
                  key={ind}
                  className={`w-full h-[12px]  rounded mr-1 ${
                    checkTemplateIsActiveIsActive(e)
                      ? 'bg-[#E29D98]'
                      : 'bg-[#F5F5F2]'
                  }`}
                ></div>
              )
            })}
          </>
        )}
        {roleId === 1 && (
          <>
            <div className={`w-full h-[12px] rounded mr-1 bg-[#EDC66E]`}></div>
            {templateForDnd.map((e, ind) => {
              return (
                <div
                  key={ind}
                  className={`w-full h-[12px]  rounded mr-1 ${
                    checkTemplateIsActiveIsActive(e)
                      ? 'bg-[#EDC66E]'
                      : 'bg-[#F5F5F2]'
                  }`}
                ></div>
              )
            })}
          </>
        )}
      </div>
    </div>
  )
}

ScaleProfile.propTypes = { title: PropTypes.string, precent: PropTypes.string }
ScaleProfile.defaultProps = {
  title: 'Tỉ lệ hoàn thành hồ sơ:',
  precent: 'Basic - 14%'
}
export default ScaleProfile
