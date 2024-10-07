import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import Image from 'next/image'
import XProfileIcon from 'common/presentation/Icons'
import CommentForm from '../CommentForm'
import { secondsToHms } from 'store/helper/functionHelper'
import moment from 'moment'

const CommentItem = (props) => {
  const {
    avatarUrl,
    name,
    timeLine,
    description,
    numberLike,
    numberDislike,
    commentChil = [],
    Component,
    ComponentForm,
    hiddenCommentChil = false,
    showComment = true,
    lessonComentId,
    timeCommented,
    createAt,
    handleChooseId = () => {},
    setHiddenForm = () => {},
    handleLikeComent = () => {},
    handleUnLikeComent = () => {},
    handleDisLikeComent = () => {},
    handleUnDisLikeComent = () => {},
    handleDeleteComent = () => {},
    hiddenForm,
    actionLikeComment,
    actionDisLikeComment,
    userComment,
    checkCreateByUser,
    checkUserCreateByCourse,
    setFocusForm = () => {},
    chapterId
  } = props
  const [isShow, setIsShow] = useState({ delete: false, dot: false })
  const [role, setRole] = useState(0)
  const [like, setLike] = useState({
    type: false,
    totalLike: numberLike
  })
  const [disLike, setDisLike] = useState({
    type: false,
    totalDisLike: numberDislike
  })

  const proccessTimeCommented = () => {
    const dayCmt = createAt.slice(0, 10)
    const timeCmt = createAt.slice(11, 19)
    const timeReplace = dayCmt.replaceAll('-', '')
    const dayAndTime = timeReplace + ',' + timeCmt
    const timeCommented = moment(dayAndTime, 'YYYYMMDD,h:mm:ss').fromNow()
    return timeCommented
  }

  const checkUserLike = actionLikeComment?.some(
    (element) => element === userComment?.userId
  )
  const checkUserDisLike = actionDisLikeComment?.some(
    (element) => element === userComment?.userId
  )

  useEffect(() => {
    const role = JSON.parse(localStorage.getItem('ROLE'))
    if (role) {
      setRole(role)
    }
  }, [])

  return (
    <div
      className={`flex gap-[16px] w-full`}
      onMouseMove={() => setIsShow({ ...isShow, dot: true })}
      onMouseLeave={() => setIsShow({ ...isShow, dot: false, delete: false })}
    >
      <div className="w-auto h-auto flex flex-col items-center ">
        <div className="min-w-[48px] max-w-[48px] min-h-[48px] max-h-[48px]  rounded-full z-[10] relative">
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
          {checkUserCreateByCourse && (
            <div className="absolute z-[10] bottom-0 right-0">
              <XProfileIcon name="starCourse" />
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col  w-full">
        <div className="flex justify-between relative">
          <div className="xl:flex items-center ">
            <p
              className="sm:text-[18px] font-bold leading-[30px] text-p14-bold line-clamp-1 text-black  min-w-[40px] max-w-[340px]  "
              style={{
                wordBreak: 'break-word'
              }}
            >
              {name}
            </p>
            <p className="sm:text-[16px] leading-[28px] font-normal text-p12 text-grey-1 ml-[8px] w-[200px]">
              tại {secondsToHms(timeLine)}
            </p>
          </div>
          {checkCreateByUser && (
            <>
              <div
                className={`duration-150  ${
                  isShow.dot ? 'opacity-1 cursor-pointer' : 'opacity-0 h-0'
                }`}
                onClick={() => setIsShow({ ...isShow, delete: !isShow.delete })}
              >
                <XProfileIcon name="dot" />
              </div>
              {isShow.delete && isShow.dot && (
                <div
                  className="absolute bg-white rounded-[8px] p-[8px] w-[177px] right-0 top-[18px] cursor-pointer"
                  onClick={() => {
                    handleDeleteComent(lessonComentId)
                    setIsShow({ ...isShow, delete: false, dot: false })
                  }}
                >
                  <div className="hover:bg-light-nude duration-150 px-[20px] py-[4px] rounded-[8px]">
                    <p className="sm:text-p18 text-p14 text-black">
                      Xoá bình luận
                    </p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p
          className="sm:text-[16px] leading-[28px] font-normal text-p12 text-black mt-[4px] "
          style={{ wordBreak: 'break-word' }}
        >
          {description}
        </p>
        <div className="flex gap-[20px] mt-[16px]">
          <p className="sm:text-[16px] leading-[28px] font-normal text-p14 text-grey-1 flex items-center">
            {proccessTimeCommented()}
          </p>
          <div
            className="flex gap-[8px] cursor-pointer"
            onClick={() => {
              if (checkUserLike) {
                handleUnLikeComent(lessonComentId)
              } else {
                handleLikeComent(lessonComentId)
              }
            }}
          >
            {!checkUserLike && <XProfileIcon name="unLikeComment" />}
            {checkUserLike && <XProfileIcon name="likeComment" />}
            <p className="sm:text-p18 text-p14 text-grey-1">{numberLike}</p>
          </div>
          {/* <div
            className="flex gap-[8px] cursor-pointer"
            onClick={() => {
              if (checkUserDisLike) {
                handleUnDisLikeComent(lessonComentId)
              } else {
                handleDisLikeComent(lessonComentId)
              }
            }}
          >
            {!checkUserDisLike && <XProfileIcon name="unDisLikeComment" />}
            {checkUserDisLike && <XProfileIcon name="disLikeComment" />}
            <p className="sm:text-p18 text-p14 text-grey-1">{numberDislike}</p>
          </div> */}
          <p
            className="sm:hover:text-semantic sm:text-[18px] font-bold leading-[30px] text-p14 hover:text-semantic duration-100 text-grey-1 cursor-pointer"
            onClick={() => {
              setHiddenForm(!hiddenForm)
              setFocusForm(true)
            }}
          >
            Trả lời
          </p>
        </div>
      </div>
    </div>
  )
}

CommentItem.propTypes = {
  avatarUrl: PropTypes.string,
  name: PropTypes.string,
  timeLine: PropTypes.any,
  description: PropTypes.string,
  numberLike: PropTypes.number,
  numberDislike: PropTypes.number,
  timeCommented: PropTypes.number
}
CommentItem.defaultProps = {
  avatarUrl: '/images/avatar.png',
  name: 'Invest fx',
  timeLine: '11:48',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. In feugiat dui a velit commodo, in sagittis odio imperdiet. Praesent rutrum, metus et luctus viverra, nisl risus pharetra nisi, at aliquet felis justo et velit.',
  numberLike: 0,
  numberDislike: 0,
  timeCommented: 2
}

export default CommentItem
