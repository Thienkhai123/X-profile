import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import useModal from 'common/hooks/useModal'
import Modal from 'common/presentation/Modal'
import ModalAddExercise from '../ModalAddExercise'

const ExerciseCourseDetail = (props) => {
  const [open, toggleModal] = useModal()

  const handleUploadFile = () => {
    toggleModal()
  }

  return (
    <div>
      <div
        className="min-h-[120px] flex justify-center items-center rounded-[16px] cursor-pointer"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, #999999, #999999 10px, transparent 10px, transparent 20px), repeating-linear-gradient(90deg, #999999, #999999 10px, transparent 10px, transparent 20px), repeating-linear-gradient(180deg, #999999, #999999 10px, transparent 10px, transparent 20px), repeating-linear-gradient(270deg, #999999, #999999 10px, transparent 10px, transparent 20px)',
          backgroundSize: '1px 100%, 100% 1px, 1px 100% , 100% 1px',
          backgroundPosition: '0 0, 0 0, 100% 0, 0 100%',
          backgroundRepeat: 'no-repeat'
        }}
        onClick={() => {
          handleUploadFile()
        }}
      >
        <div className="flex gap-[8px] ">
          <XProfileIcon name="uploadFile" />
          <p className="sm:text-p18 text-p14 text-grey-1">
            Đăng tải bài tập của bạn
          </p>
        </div>
      </div>
      <Modal
        toggleModal={toggleModal}
        open={open}
        // modalStyle="w-[100vw] h-[100vh] p-2  px-[20px] flex justify-center items-start fixed bg-black/30 z-[200] left-[calc(0%)] top-[calc(0%)] z-[9999]"
        // childStyle="w-screen h-fit sm:w-[600px] mt-4 shadow-md p-4 bg-white rounded-lg max-h-[85vh] min-h-[50vh] overflow-y-scroll custom-scrollbar absolute top-1/3"
      >
        <ModalAddExercise handleUploadFile={handleUploadFile} />
      </Modal>
    </div>
  )
}

ExerciseCourseDetail.propTypes = {}
ExerciseCourseDetail.defaultProps = {}

export default ExerciseCourseDetail
