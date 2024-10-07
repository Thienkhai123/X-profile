import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import Image from 'next/image'

const ReferenCourseDetail = (props) => {
  const { title, attachments = [], handleDownloadFile = () => {} } = props
  const [chooseId, setChooseId] = useState(-1)

  return (
    <div className="flex flex-col gap-[20px]">
      {attachments?.map((element, ind) => {
        const { fileName, fileURL, attachmentId } = element
        return (
          <div
            key={ind}
            className="flex gap-[16px] items-center cursor-pointer"
            onMouseLeave={() => setChooseId(-1)}
            onMouseMove={() => setChooseId(attachmentId)}
          >
            <div>
              <XProfileIcon
                name="downloadFile"
                fill={chooseId === attachmentId ? '#317AE8' : '#666666'}
              />
            </div>
            <div
              className="sm:text-p16 text-p12 text-grey-1 cursor-pointer hover:text-semantic "
              onClick={() => {
                handleDownloadFile(fileName, fileURL)
              }}
            >
              {fileName}
            </div>
          </div>
        )
      })}
      {attachments.length < 1 && (
        <div className="flex flex-col items-center mt-[10px]">
          <Image
            src="/images/Course/NullDocument.png"
            alt=""
            width={80}
            height={54}
          />
          <p className="mt-[8px] sm:text-p14 text-p12 text-[#757575]">
            Khóa học hiện chưa có tài liệu
          </p>
        </div>
      )}
    </div>
  )
}

ReferenCourseDetail.propTypes = { title: PropTypes.string }
ReferenCourseDetail.defaultProps = { title: 'Cycle_Timeline_Indicator.mq5' }

export default ReferenCourseDetail
