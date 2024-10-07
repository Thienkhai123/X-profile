import Image from 'next/image'
import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const ResultStatus = (props) => {
  const { status } = props

  if (status === 1) {
    return (
      <div className="w-fit h-7 px-3 bg-[#16C09861] border border-[#00B087] rounded flex items-center justify-center select-none">
        <p className="text-p14 text-[#008767]">Passed</p>
      </div>
    )
  }
  if (status === 2) {
    return (
      <div className="w-fit h-7 px-3 bg-[#FFC5C5] border border-[#DF0404] rounded flex items-center justify-center select-none">
        <p className="text-p14 text-[#DF0404]">Failed</p>
      </div>
    )
  }

  return (
    <div className="h-7 w-[93px] bg-[#F1F1F161] border border-[#E0E0E0] rounded flex items-center justify-center select-none">
      <p className="text-p14 text-[#949494]">_</p>
    </div>
  )
}

ResultStatus.propTypes = {}

ResultStatus.defaultProps = {}

export default ResultStatus
