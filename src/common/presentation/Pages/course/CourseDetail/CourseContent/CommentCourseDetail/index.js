import React, { Fragment, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import CommentItem from '../CommentItem'
import Image from 'next/image'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import CommentForm from '../CommentForm'
import CommentCourseDetailChil from '../CommentCourseDetailChil'
import { SteppedLineTo } from 'react-lineto'
import { useSelector } from 'react-redux'
import { selectAmountPages } from 'store/app/courseLearnSlice'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import isUndefined from 'lodash/isUndefined'
import LoadingComment from 'common/presentation/Loading/LoadingComment'

const PRIOTIRY_DATA = [
  { id: 0, name: 'Mới nhất' },
  { id: 1, name: 'Tất cả' },
  { id: 2, name: 'Track time' }
]

const CommentCourseDetail = (props) => {
  const {
    amountComment,
    avatarUrl,
    comments,
    userComment,
    commentList,
    checkCurrentPage,
    handleCreateComment = () => {},
    handleCreateCommentParent = () => {},
    handleLikeComent = () => {},
    handleUnLikeComent = () => {},
    handleDisLikeComent = () => {},
    handleUnDisLikeComent = () => {},
    handleDeleteComent = () => {},
    handleReadMoreComment = () => {},
    chapterId,
    loadingCreateCmt = false
  } = props
  const refPriorityOpt = useRef(null)

  const [showPriorityOpt, setShowPriorityOpt] = useState(false)
  const [hiddenForm, setHiddenForm] = useState(-1)

  const [selectedPriority, setSelectedPriority] = useState({
    id: 0,
    name: ''
  })
  const handleSelectPriority = (value) => {
    if (showPriorityOpt) {
      if (!isUndefined(value?.id) && !isUndefined(value?.name)) {
        setSelectedPriority({
          id: value?.id,
          name: value?.name
        })
      } else {
        setSelectedPriority(PRIOTIRY_DATA[0])
      }
      setShowPriorityOpt(false)
    }
  }

  useOnClickOutside(refPriorityOpt, handleSelectPriority)

  return (
    <div>
      <div className="flex justify-between pb-[24px] border-b border-grey-4">
        <p className="text-neutral sm:text-[18px] font-bold leading-[32px] text-p14-bold">
          {amountComment} Bình luận
        </p>
        <div className="flex gap-[8px]">
          <div className="relative" ref={refPriorityOpt}>
            <button
              className="rounded-[8px] xl:min-w-[200px] bg-white w-full flex justify-between px-[24px] py-[8px] items-center border border-grey-4"
              onClick={() => setShowPriorityOpt(!showPriorityOpt)}
            >
              {selectedPriority.id === 0 ? (
                <Fragment>
                  <p className="sm:text-[18px] leading-[30px] font-normal text-p14  text-black">
                    {PRIOTIRY_DATA[0].name}
                  </p>
                  <XProfileIcon name="arrowDown" stroke="#000000" />
                </Fragment>
              ) : (
                <Fragment>
                  <p className="sm:text-[18px] leading-[30px] font-normal text-p14 text-black ">
                    {selectedPriority.name}
                  </p>
                  <XProfileIcon name="arrowDown" stroke="#000000" />
                </Fragment>
              )}
            </button>
            {showPriorityOpt && (
              <div className="bg-white max-h-[190px] z-50 min-w-[200px] sm:w-full overflow-x-hidden absolute sm:top-[50px] top-[20px] rounded-[12px] border border-grey-4 shadow-[0px_16px_24px_rgba(0, 0, 0, 0.04)]">
                {PRIOTIRY_DATA?.map((priority) => (
                  <div
                    key={priority?.id}
                    className="flex justify-between items-center px-[24px] hover:bg-light-nude py-[10px]"
                    onClick={() => handleSelectPriority(priority)}
                  >
                    <p className="sm:text-[18px] leading-[30px] font-normal text-p14 text-black">
                      {priority?.name}
                    </p>
                    {selectedPriority.id === priority?.id && (
                      <XProfileIcon name="check" />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="pt-[24px]">
        <CommentForm
          loadingCreateCmt={loadingCreateCmt}
          handleCreateComment={handleCreateComment}
          {...userComment}
        />
        <div className="mt-[60px] flex flex-col gap-[24px] ">
          {comments?.map((e, ind) => {
            return (
              <div key={ind} className="relative">
                <CommentCourseDetailChil
                  loadingCreateCmt={loadingCreateCmt}
                  chapterId={chapterId}
                  userComment={userComment}
                  element={e}
                  commentChil={e?.commentChil}
                  hiddenForm={hiddenForm}
                  setHiddenForm={setHiddenForm}
                  handleLikeComent={handleLikeComent}
                  handleUnLikeComent={handleUnLikeComent}
                  handleDisLikeComent={handleDisLikeComent}
                  handleUnDisLikeComent={handleUnDisLikeComent}
                  handleCreateCommentParent={handleCreateCommentParent}
                  handleDeleteComent={handleDeleteComent}
                />
              </div>
            )
          })}
        </div>
      </div>
      {comments.length >= 15 && checkCurrentPage && (
        <div className="pt-[32px] flex justify-center relative z-[10000]">
          <Button
            title="Xem thêm 15 bình luận"
            width="w-[265px] "
            height="h-[44px]"
            rounded="rounded-[8px]"
            color="text-black"
            textWeight="sm:text-p18-bold text-p14-bold"
            background="bg-grey-4"
            onClick={() => {
              handleReadMoreComment()
            }}
          />
        </div>
      )}
    </div>
  )
}

CommentCourseDetail.propTypes = {
  amountComment: PropTypes.number,
  commentList: PropTypes.arrayOf(
    PropTypes.shape({
      avatarUrl: PropTypes.string,
      name: PropTypes.string,
      timeLine: PropTypes.string,
      description: PropTypes.string,
      numberLike: PropTypes.number,
      numberDislike: PropTypes.number,
      commentChil: PropTypes.arrayOf(
        PropTypes.shape({
          avatarUrl: PropTypes.string,
          name: PropTypes.string,
          timeLine: PropTypes.string,
          description: PropTypes.string,
          numberLike: PropTypes.number,
          numberDislike: PropTypes.number
        })
      )
    })
  )
}
CommentCourseDetail.defaultProps = {
  amountComment: 2,
  commentList: [
    {
      id: 1,
      avatarUrl: '/images/avatar.png',
      name: 'Invest fx',
      timeLine: '11:48',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
      numberLike: 0,
      numberDislike: 0,
      commentChil: [
        {
          avatarUrl: '/images/avatar.png',
          name: 'Invest fx',
          timeLine: '11:48',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
          numberLike: 0,
          numberDislike: 0
        },
        {
          avatarUrl: '/images/avatar.png',
          name: 'Invest fx',
          timeLine: '11:48',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
          numberLike: 0,
          numberDislike: 0
        }
      ]
    },
    {
      id: 2,
      avatarUrl: '/images/avatar.png',
      name: 'Invest fx',
      timeLine: '11:48',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
      numberLike: 0,
      numberDislike: 0,
      commentChil: [
        {
          avatarUrl: '/images/avatar.png',
          name: 'Invest fx',
          timeLine: '11:48',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
          numberLike: 0,
          numberDislike: 0
        }
      ]
    }
  ]
}

export default CommentCourseDetail
