import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Button from 'common/presentation/Button'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import {
  selectContentComment,
  updateContentComment
} from 'store/app/courseLearnSlice'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import isEmpty from 'lodash/isEmpty'
import LoadingComment from 'common/presentation/Loading/LoadingComment'

const CommentForm = (props) => {
  const {
    avatarUrl,
    hiddenSubmit = false,
    handleCreateComment = () => {},
    loadingCreateCmt = false
  } = props

  const [role, setRole] = useState(0)
  const dispath = useDispatch()

  const checkContent = useSelector(selectContentComment)
  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('ROLE'))
    if (role) {
      setRole(role)
    }
  }, [])
  return (
    <div className="flex gap-[16px] w-full">
      <div className="min-w-[48px] max-w-[48px] h-[48px] relative rounded-full">
        <Image
          src={
            avatarUrl
              ? avatarUrl
              : role === 0
              ? '/images/DefaultAvatarCuu.png'
              : role === 1
              ? '/images/DefaultAvatarChuot.png'
              : role === 2
              ? '/images/DefaultAvatarGau.png'
              : '/images/DefaultAvatarCuu.png'
          }
          alt="avartar"
          layout="fill"
          objectFit="cover"
          className="rounded-full"
        />
      </div>
      <form className="w-full rounded-[8px] ">
        <div className="bg-white rounded-[8px] px-[24px] py-[16px] min-h-[136px] flex flex-col justify-between">
          <textarea
            rows={2}
            maxLength={500}
            disabled={loadingCreateCmt}
            className="w-full focus:outline-none resize-none custom-scrollbar placeholder:text-grey-3 sm:text-[18px] font-normal leading-[30px]"
            placeholder="Nhập bình luận..."
            value={checkContent}
            onChange={(e) => dispath(updateContentComment(e.target.value))}
            onKeyDown={(e) => {
              if (e.code === 'Enter' && !isEmpty(checkContent.trim())) {
                handleCreateComment()
              }
            }}
          />
          <div className="flex justify-end -mr-[8px]">
            {/* <div className="flex gap-[16px]">
              <div className="cursor-pointer">
                <XProfileIcon name="smileComment" />
              </div>
              <div className="cursor-pointer">
                <XProfileIcon name="uploadImgComment" />
              </div>
            </div> */}
            <div
              className="cursor-pointer"
              onClick={() =>
                !isEmpty(checkContent.trim()) && handleCreateComment()
              }
            >
              {loadingCreateCmt ? (
                <LoadingComment />
              ) : (
                <XProfileIcon
                  name="sendComment"
                  fill={_.isEmpty(checkContent.trim()) ? '#E6E6E6' : '#294F9B'}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

CommentForm.propTypes = {
  avatarUrl: PropTypes.string
}
CommentForm.defaultProps = {
  avatarUrl: '/images/avatar.png'
}

export default CommentForm
