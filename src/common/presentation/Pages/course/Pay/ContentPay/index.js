import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { convertCurrency } from 'store/helper/functionHelper'
import BadgeCourse from 'common/presentation/BadgeCourse'

const ContentCoursePay = (props) => {
  const { description, totalUserAccept, totalComment, skillCourse = [] } = props
  return (
    <div className="xl:w-[1140px]">
      {skillCourse?.length > 0 && (
        <div className="mb-[40px]">
          <p className="text-h3 text-black ">Những kỹ năng bạn sẽ đạt được</p>
          <div className="mt-[32px] flex gap-[16px] flex-wrap">
            {skillCourse?.map((element, ind) => {
              return (
                <div key={ind}>
                  <BadgeCourse
                    padding="8px 16px"
                    bg="#F5F6F7"
                    subValue={element?.skillName}
                    textStyle="text-black text-p16 leading-[28px]"
                    radius="12px"
                    width=""
                  />
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div>
        <p className="text-h3 text-black mb-[8px]">Nội dung khoá học</p>
        {/* <div className="flex gap-[12px] mb-[16px] items-center">
          <XProfileIcon name="user" />
          <p className="sm:text-p16 text-p14 text-grey-1">{totalUserAccept}</p>
          <XProfileIcon name="comment" />
          <p className="sm:text-p16 text-p14 text-grey-1">{totalComment}</p>
        </div> */}
        <pre
          className="sm:text-p16 leading-[28px] text-p12 text-grey-1 mb-[32px]"
          style={{ wordBreak: 'break-word' }}
        >
          {description}
        </pre>
      </div>
      {/* <div
        className="sm:text-p16 text-p12 text-grey-1 mb-[36px]"
        dangerouslySetInnerHTML={{ __html: description }}
      /> */}
    </div>
  )
}

ContentCoursePay.propTypes = { description: PropTypes.string }
ContentCoursePay.defaultProps = {
  description: ''
}

export default ContentCoursePay
