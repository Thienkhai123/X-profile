import React from 'react'
import PropTypes from 'prop-types'
import PropressBar from 'common/presentation/ProgressBar'
import XProfileIcon from 'common/presentation/Icons'

const SkillItem = (props) => {
  const { title } = props
  return (
    <div>
      <div className="mb-3">
        <p className="text-h3">{title}</p>
      </div>
      <div className="xl:flex mt-2 mb-2">
        <div className="xl:w-[220px] w-auto">
          <div>
            <p className="text-p20-bold text-grey-1">Communication</p>
          </div>
        </div>
        <div className="mr-1">
          <div className="xl:flex xl:justify-center xl:items-center h-full">
            <div className="w-[269px] ">
              {/* <PropressBar
                type=""
                background="bg-[#F7BB3A]"
                percentValue="w-[90%]"
              /> */}
            </div>
          </div>
        </div>
        <div className="hidden xl:block ml-1">
          <XProfileIcon name="cup" />
        </div>
      </div>
    </div>
  )
}

SkillItem.propTypes = {
  title: PropTypes.string
}
SkillItem.defaultProps = {
  title: 'Kỹ năng mềm'
}

export default SkillItem
