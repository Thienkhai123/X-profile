import React, { useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import PropressBar from 'common/presentation/ProgressBar'

const ModalAddExercise = (props) => {
  const { nameFile, sizeFile, percentUpload, handleUploadFile } = props

  const [modal, setModal] = useState({
    hover: false
  })

  return (
    <div className="flex flex-col gap-[16px]">
      <div
        className="min-h-[120px] flex justify-center items-center rounded-[16px] cursor-pointer group"
        style={{
          backgroundImage: `repeating-linear-gradient(0deg, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          }, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          } 10px, transparent 10px, transparent 20px), repeating-linear-gradient(90deg, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          }, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          } 10px, transparent 10px, transparent 20px), repeating-linear-gradient(180deg, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          }, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          } 10px, transparent 10px, transparent 20px), repeating-linear-gradient(270deg, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          }, ${
            modal.hover ? '#F6BB3A' : ' #999999'
          } 10px, transparent 10px, transparent 20px)`,
          backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
          backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={() => {
          handleUploadFile()
        }}
        onMouseMove={() => setModal({ ...modal, hover: true })}
        onMouseLeave={() => setModal({ ...modal, hover: false })}
      >
        <div className="flex flex-wrap items-center gap-[8px] duration-150">
          <XProfileIcon
            name="uploadFile"
            fill={modal.hover ? '#F6BB3A' : '#666666'}
          />
          <p className="sm:text-p18 text-p14 text-grey-1 group-hover:text-button ">
            Đăng tải bài tập của bạn
          </p>
        </div>
      </div>
      <div className="min-h-[120px] border border-grey-4 flex justify-between p-[32px]  rounded-[16px] cursor-pointer ">
        <div className="flex flex-wrap  gap-[20px] duration-150">
          <div className="mt-[4px]">
            <XProfileIcon name="uploadFile" fill={'#666666'} />
          </div>
          <div>
            <p className="sm:text-p18 text-p14 text-grey-1  mb-[8px]">
              {nameFile}
            </p>
            <p className="sm:text-p18 text-p14 text-grey-1  ">{sizeFile}</p>
          </div>
          <div className="w-[291px] flex gap-[16px]">
            <div className="w-full  mt-[12px]">
              <PropressBar
                //   skillMatchingPercentage={100}
                type="rounded-[24px]"
                percentValue={100}
                backgroundOut="bg-grey-3"
                background="bg-button"
              />
            </div>
            <p className="sm:text-p16 text-p14 text-button mt-[4px]">
              {percentUpload}%
            </p>
          </div>
        </div>
        <div>
          <XProfileIcon name="cancel" width="13" height="13" />
        </div>
      </div>
    </div>
  )
}

ModalAddExercise.propTypes = {
  nameFile: PropTypes.string,
  sizeFile: PropTypes.string,
  percentUpload: PropTypes.number
}
ModalAddExercise.defaultProps = {
  nameFile: 'Project_namefinal.zip',
  sizeFile: '1.9MB',
  percentUpload: 50
}

export default ModalAddExercise
