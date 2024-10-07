import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { convertCurrency } from 'store/helper/functionHelper'
import BadgeCourse from 'common/presentation/BadgeCourse'

const ContentCourse = (props) => {
  const { description, totalUserAccept, totalComment, skillCourse = [] } = props
  return (
    <div>
      {skillCourse?.length > 0 && (
        <div className="mb-[32px]">
          <p className="sm:text-h4 text-p16-bold text-neutral ">
            Những kỹ năng bạn sẽ đạt được
          </p>
          <div className="mt-[24px]  flex gap-[16px] flex-wrap">
            {skillCourse?.map((element, ind) => {
              return (
                <div key={ind}>
                  <BadgeCourse
                    padding="8px 16px"
                    bg="#F5F6F7"
                    subValue={element?.skillName}
                    textStyle="text-black text-p16 "
                    radius="12px"
                    width=""
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}
      <div className="mb-[24px] w-full">
        <p className="sm:text-h4 text-p16-bold text-black mb-[8px]">
          Nội dung khoá học
        </p>
        <p
          className="sm:text-p16 leading-[28px] text-p12 text-grey-1 "
          style={{ wordBreak: 'break-word' }}
        >
          {description}
        </p>
      </div>
    </div>
  )
}

ContentCourse.propTypes = { description: PropTypes.string }
ContentCourse.defaultProps = {
  description: ' '
}

export default ContentCourse
