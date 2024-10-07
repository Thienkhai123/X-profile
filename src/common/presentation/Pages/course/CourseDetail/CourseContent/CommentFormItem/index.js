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
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import isEmpty from 'lodash/isEmpty'
import LoadingComment from 'common/presentation/Loading/LoadingComment'

const CommentFormItem = (props) => {
  const {
    avatarUrl,
    hiddenSubmit = false,
    handleCreateComment = () => {},
    lessonCommentId,
    setHiddenForm,
    resetForm,
    focusForm,
    loadingCreateCmt = false
  } = props

  const [role, setRole] = useState(0)
  const schema = yup.object().shape({
    content: yup.string().required('không được để trống')
  })
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    resolver: yupResolver(schema),
    mode: 'onChange',
    defaultValues: {
      lessonCommentId: lessonCommentId
    }
  })

  const { content } = watch() || {}

  const handleSubmitKeyDown = (lessonCommentId) => {
    if (!isEmpty(content?.trim())) {
      const tmp = {
        lessonCommentId: lessonCommentId,
        content: content
      }
      handleCreateComment(tmp)
      setValue('content', '')
      setHiddenForm(false)
    }
  }

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
      <form
        className="w-full rounded-[8px] "
        id={`idFormChil${lessonCommentId}`}
      >
        <div className="bg-white rounded-[8px] px-[24px] py-[16px] min-h-[136px] flex flex-col justify-between">
          <textarea
            maxLength={500}
            disabled={loadingCreateCmt}
            rows={2}
            name="content"
            {...register('content')}
            className="w-full focus:outline-none resize-none custom-scrollbar placeholder:text-grey-3 sm:text-[18px] font-normal leading-[30px]"
            placeholder="Nhập bình luận..."
            onKeyDown={(e) => {
              if (e.code === 'Enter') {
                handleSubmitKeyDown(lessonCommentId)
              }
            }}
          />
          <div className="flex justify-end -mr-[8px] ">
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
              onClick={handleSubmit((e) => {
                if (!isEmpty(e.content.trim())) {
                  const tmp = {
                    lessonCommentId: lessonCommentId,
                    content: e.content.trim()
                  }
                  handleCreateComment(tmp)
                  setHiddenForm(false)
                }
              })}
            >
              {loadingCreateCmt ? (
                <LoadingComment />
              ) : (
                <XProfileIcon
                  name="sendComment"
                  fill={isEmpty(content?.trim()) ? '#E6E6E6' : '#294F9B'}
                />
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

CommentFormItem.propTypes = {
  avatarUrl: PropTypes.string
}
CommentFormItem.defaultProps = {
  avatarUrl: '/images/avatar.png'
}

export default CommentFormItem
