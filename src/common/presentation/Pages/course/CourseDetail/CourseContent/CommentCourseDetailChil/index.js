import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CommentItem from '../CommentItem'
import CommentFormItem from '../CommentFormItem'
import CommentForm from '../CommentForm'
import LoadingComment from 'common/presentation/Loading/LoadingComment'

const CommentCourseDetailChil = (props) => {
  const {
    element,
    commentChil,
    userComment,
    handleCreateCommentParent,
    handleLikeComent = () => {},
    handleUnLikeComent = () => {},
    handleDisLikeComent = () => {},
    handleUnDisLikeComent = () => {},
    handleDeleteComent = () => {},
    chapterId,
    loadingCreateCmt = false
  } = props

  const [showComment, setShowComment] = useState(false)
  const [hiddenForm, setHiddenForm] = useState(false)
  const [focusForm, setFocusForm] = useState(false)

  useEffect(() => {
    setShowComment(false)
  }, [chapterId])

  return (
    <div>
      <div>
        <CommentItem
          {...element}
          userComment={userComment}
          setHiddenForm={setHiddenForm}
          hiddenForm={hiddenForm}
          handleLikeComent={handleLikeComent}
          handleUnLikeComent={handleUnLikeComent}
          handleDisLikeComent={handleDisLikeComent}
          handleUnDisLikeComent={handleUnDisLikeComent}
          handleDeleteComent={handleDeleteComent}
          setFocusForm={setFocusForm}
        />
      </div>
      {!showComment && commentChil.length > 0 && (
        <div>
          {commentChil.length > 1 && (
            <div className="mt-[24px] flex w-auto">
              <div className="min-w-[64px] flex items-baseline justify-end pr-[8px]"></div>
              <p
                className="sm:text-p16-bold text-p14-bold text-button-2  duration-150 hover:opacity-80 cursor-pointer flex items-center"
                onClick={() => {
                  setShowComment(true)
                }}
              >
                Xem tất cả {commentChil.length} trả lời
              </p>
            </div>
          )}
          <div className=" mt-[24px] flex w-full relative z-[1000]">
            <div className="min-w-[64px] flex items-baseline justify-end pr-[8px]"></div>
            <CommentItem
              {...commentChil[commentChil.length - 1]}
              userComment={userComment}
              hiddenForm={hiddenForm}
              handleLikeComent={handleLikeComent}
              handleUnLikeComent={handleUnLikeComent}
              handleDisLikeComent={handleDisLikeComent}
              handleDeleteComent={handleDeleteComent}
              handleUnDisLikeComent={handleUnDisLikeComent}
              setHiddenForm={setHiddenForm}
              setFocusForm={setFocusForm}
            />
          </div>
        </div>
      )}
      {commentChil?.map(
        (element, index) =>
          showComment && (
            <div
              key={index}
              className={`flex duration-150 my-[24px] h-auto opacity-1  `}
            >
              <div className="min-w-[64px] max-h-[48px] flex items-baseline justify-end "></div>
              <div className={`flex flex-col gap-[42px] duration-150 w-full`}>
                <CommentItem
                  {...element}
                  userComment={userComment}
                  hiddenForm={hiddenForm}
                  handleLikeComent={handleLikeComent}
                  handleUnLikeComent={handleUnLikeComent}
                  handleDisLikeComent={handleDisLikeComent}
                  handleDeleteComent={handleDeleteComent}
                  handleUnDisLikeComent={handleUnDisLikeComent}
                  setHiddenForm={setHiddenForm}
                  setFocusForm={setFocusForm}
                />
              </div>
            </div>
          )
      )}
      {hiddenForm && (
        <div className={`flex w-full duration-150 h-auto opacity-1 mt-[20px] `}>
          <div className="min-w-[64px] max-h-[48px] flex items-baseline justify-end "></div>
          <CommentFormItem
            {...userComment}
            loadingCreateCmt={loadingCreateCmt}
            focusForm={focusForm}
            setHiddenForm={setHiddenForm}
            hiddenSubmit={true}
            lessonCommentId={element?.lessonComentId}
            handleCreateComment={handleCreateCommentParent}
          />
        </div>
      )}
    </div>
  )
}

CommentCourseDetailChil.propTypes = {}
CommentCourseDetailChil.defaultProps = {}

export default CommentCourseDetailChil
