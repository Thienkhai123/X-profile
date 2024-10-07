import React, { useRef } from 'react'
import PropTypes from 'prop-types'
import PropressBar from 'common/presentation/ProgressBar'
import XProfileIcon from 'common/presentation/Icons'
import { getPercentage } from 'store/helper/functionHelper'

const ProcessBarCourse = (props) => {
  const { skillMatchingPercentage = 0, percentValue = 100 } = props
  return (
    <div className="flex items-center gap-[11px]">
      <div className="w-full">
        <div
          className=" mb-[10px] flex justify-end"
          style={{
            width: `${skillMatchingPercentage}%`,
            marginLeft: skillMatchingPercentage < 50 && '68px'
          }}
        >
          <div className="relative ">
            <div>
              {skillMatchingPercentage >= 50 ? (
                <XProfileIcon name="processbarMessLesson" />
              ) : (
                <XProfileIcon name="processbarMessLesson50" />
              )}
            </div>

            <div className="flex justify-center">
              <div className="absolute   top-[5px] ">
                <p className="sm:text-p16-bold text-p12-bold font-semibold text-black">
                  {getPercentage(skillMatchingPercentage, percentValue)}%
                </p>
              </div>
            </div>
          </div>
        </div>

        <PropressBar
          skillMatchingPercentage={skillMatchingPercentage}
          type="rounded-[24px]"
          percentValue={100}
          backgroundOut="bg-grey-4"
          background="bg-button"
        />
      </div>
      <div className="pt-[28px]">
        <XProfileIcon
          name="cupCourse"
          fill={skillMatchingPercentage === 100 ? '#F6BB3A' : '#CCCCCC'}
        />
      </div>
    </div>
  )
}

ProcessBarCourse.propTypes = {}
ProcessBarCourse.defaultProps = {}

export default ProcessBarCourse
