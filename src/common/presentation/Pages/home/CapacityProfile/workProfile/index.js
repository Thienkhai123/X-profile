import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const WorkProfile = (props) => {
  const { startIcon, placeholder, endIcon } = props
  return (
    <div className="flex justify-between items-center">
      <div>
        <XProfileIcon name={startIcon} />
      </div>
      <div className="w-full mr-[6.34px] ml-[4px]">
        <input
          className="bg-inherit w-full text-p14 font-normal normal-case text-grey-1"
          placeholder={placeholder}
        />
      </div>
      <div>
        <button aria-label="add-job-position">
          <XProfileIcon name={endIcon} />
        </button>
      </div>
    </div>
  )
}

WorkProfile.propTypes = {
  startIcon: PropTypes.string,
  placeholder: PropTypes.string,
  endIcon: PropTypes.string
}

WorkProfile.defaultProps = {
  startIcon: 'career',
  placeholder: '',
  endIcon: 'add'
}

export default WorkProfile
