import React from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'

const ReviewEditMode = (props) => {
  const {
    onClickEdit = {},
    onClickCancel = {},
    editmode = false,
    onClickSaveReview = {}
  } = props
  return (
    <div className=" flex justify-end max-w-[1440px]">
      {editmode ? (
        <>
          <button onClick={() => onClickSaveReview()}>
            <div className="w-[40px] h-[40px] cursor-pointer transition-all flex items-center justify-center p-1 border border-transparent hover:border-grey-1 hover:bg-nude hover:rounded-full">
              <XProfileIcon name="save" />
            </div>
          </button>
          <button onClick={() => onClickCancel()}>
            <div className="w-[40px] h-[40px] cursor-pointer transition-all flex items-center justify-center p-1 border border-transparent hover:border-grey-1 hover:bg-nude hover:rounded-full">
              <XProfileIcon name="cancel" />
            </div>
          </button>
        </>
      ) : (
        <button onClick={() => onClickEdit()}>
          <div className="w-[40px] h-[40px] cursor-pointer transition-all flex items-center justify-center p-1 border border-transparent hover:border-grey-1 hover:bg-nude hover:rounded-full">
            <XProfileIcon name="edit" />
          </div>
        </button>
      )}
    </div>
  )
}

ReviewEditMode.propTypes = {}
ReviewEditMode.defaultProps = {}

export default ReviewEditMode
