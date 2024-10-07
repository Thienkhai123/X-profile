import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const SurveyBack = (props) => {
  const { unAmountType, titleBackButton } = props
  return (
    <div className="flex items-center mt-[37px]  w-auto md:justify-center ">
      <button
        className="pr-[15px] pl-[15px] pt-3 pb-3 bg-white rounded-full hidden sm:block"
        onClick={() => unAmountType()}
      >
        <XProfileIcon name="vector4" />
      </button>
      <button
        className="pr-[15px] pl-[15px] pt-3 pb-3 bg-white rounded-full block sm:hidden "
        onClick={() => unAmountType()}
      >
        <XProfileIcon name="vector4" width="4.2" height="8.4" />
      </button>
      <div className="ml-3 hidden xl:block">
        <p className="text-base text-grey-1 font-normal">{titleBackButton}</p>
      </div>
    </div>
  )
}

SurveyBack.propTypes = {}

export default SurveyBack
