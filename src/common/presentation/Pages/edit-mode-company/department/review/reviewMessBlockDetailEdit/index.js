import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import XProfileIcon from 'common/presentation/Icons'
import { Avatar } from 'common/presentation/Avatar'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import useOnClickOutside from 'common/hooks/useClickOutSide'
import { useDispatch } from 'react-redux'
import {
  updateAvatarUrl,
  updateIndComment
} from 'store/app/edit-mode-company/department/reviewSlice'
import PropressBar from 'common/presentation/ProgressBar'

const ReviewMessBlockDetailEdit = (props) => {
  const {
    toggleModal = () => {},
    editmode,
    comment,
    onsubmit = () => {},
    handleDelete = () => {},
    keyComment,
    setInd = () => {},
    autofocus = false,
    persent,
    checkUpload,
    isErrorsDescription,
    isErrorsContent,
    isErrorsName
  } = props
  const { avatarUrl } = comment

  const [focus, setFocus] = useState(false)

  const dispatch = useDispatch()

  const handleUploadAvatarUrl = (file) => {
    const imageFile = file[0]
    if (imageFile) {
      const reader = new FileReader()
      reader.readAsDataURL(imageFile)
      reader.addEventListener('load', () => {
        dispatch(updateAvatarUrl(reader.result))
        toggleModal()
      })
    }
  }

  return (
    <div className="relative  xl:w-full bg-white p-5 xl:px-28 pt-[72px] pb-12 shadow-[0px_0px_20px_rgba(0,0,0,0.1)] rounded-xl">
      {editmode && (
        <div className="flex gap-[12px] items-center absolute top-6 right-6">
          <div
            className=" w-[56px] h-[56px] z-30 rounded-full bg-white border border-grey-4 hover:bg-button flex justify-center items-center cursor-pointer"
            onClick={() => handleDelete(keyComment)}
          >
            <XProfileIcon name="trash" stroke="#000000" />
          </div>
        </div>
      )}
      <div className="hidden xl:block absolute left-10 top-10">
        <Image
          src="/images/comment-left.png"
          width={58.63}
          height={61}
          alt=""
        />
      </div>
      <div className="hidden xl:block absolute right-10 top-10">
        <Image
          src="/images/comment-right.png"
          width={58.63}
          height={61}
          alt=""
        />
      </div>
      <div className="mb-[20px]">
        {editmode ? (
          <input
            id={`Comment_quote_${keyComment}`}
            autoFocus={autofocus}
            className={`swiper-no-swiping hover:border-semantic hover:border-b border-transparent border-b transition-all outline-none focus:border-semantic focus:border-b  bg-inherit focus:outline-none w-full sm:text-p18-bold text-p16-bold text-black `}
            placeholder="Nhập trích dẫn yêu thích (nếu có)"
            defaultValue={comment?.quote}
            onChange={(e) =>
              onsubmit({ ...comment, ind: keyComment, quote: e.target.value })
            }
          />
        ) : (
          <p
            className=" bg-inherit w-full sm:text-p18-bold text-p16-bold text-black line-clamp-1"
            style={{ wordBreak: 'break-word' }}
          >
            {comment?.quote}
          </p>
        )}
      </div>
      <div>
        {editmode ? (
          <textarea
            id={`Comment_content_${keyComment}`}
            className={`swiper-no-swiping  hover:border-b resize-none border-b transition-all outline-none focus:border-b-[1px]  bg-inherit focus:outline-none w-full sm:text-p18 text-p16 ${
              isErrorsContent
                ? 'border-semantic-red'
                : 'border-transparent hover:border-semantic focus:border-semantic'
            }`}
            rows="4"
            cols="50"
            defaultValue={comment?.content}
            maxLength={400}
            placeholder="Nhập cảm nhận của thành viên trong Team, giới hạn 400 ký tự."
            onChange={(e) =>
              onsubmit(
                { ...comment, ind: keyComment, content: e.target.value },
                `Comment_content_${keyComment}`
              )
            }
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
          />
        ) : (
          <p
            className="bg-inherit w-full sm:text-p18 text-p16 min-h-[112px]"
            style={{ wordBreak: 'break-word' }}
          >
            {comment?.content}
          </p>
        )}
        {!isErrorsContent && (
          <p className="text-end xl:text-p14 text-p12 text-grey-2 min-h-[20px]">
            {focus
              ? 400 - (comment?.content !== '' ? comment?.content?.length : 0)
              : ''}
          </p>
        )}
        {isErrorsContent && (
          <p className="text-p16 text-end leading-[28px] text-semantic-red ">
            Không được bỏ trống
          </p>
        )}
      </div>
      <div className="pt-10 flex justify-between items-center">
        <div className="flex gap-[22px] items-center">
          <div className="relative">
            <div className="relative  flex flex-col items-center justify-center rounded-full border border-[#EDEDE8] xl:w-[120px] h-[120px] w-full">
              {avatarUrl !== '' && (
                <div>
                  {editmode && (
                    <div className="bg-white right-0 bottom-0 absolute z-[1000] flex items-center justify-center rounded-full border border-[#EDEDE8] w-[56px] h-[56px]">
                      <input
                        id={`input-file-review-avatarUrl-${keyComment}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (!(checkUpload && persent <= 100)) {
                            handleUploadAvatarUrl(e.target.files)
                            setInd(keyComment)
                            e.target.value = ''
                          }
                        }}
                        disabled={!editmode}
                      />
                      <label
                        htmlFor={`input-file-review-avatarUrl-${keyComment}`}
                        className=" flex justify-center items-center cursor-pointer "
                      >
                        <XProfileIcon name="uploadLogo" />
                      </label>
                    </div>
                  )}
                  <div className=" flex justify-center items-center cursor-pointer ">
                    <Image
                      src={avatarUrl}
                      height={120}
                      width={120}
                      objectFit="cover"
                      alt=""
                      quality={100}
                      className="rounded-full"
                    />
                  </div>
                </div>
              )}
              {avatarUrl === '' && (
                <>
                  {editmode ? (
                    <div className="rounded-full bg-white">
                      <input
                        id={`input-file-review-avatarUrl-${keyComment}`}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          if (!(checkUpload && persent <= 100)) {
                            handleUploadAvatarUrl(e.target.files)
                            setInd(keyComment)
                            e.target.value = ''
                          }
                        }}
                        disabled={!editmode}
                      />
                      <label
                        htmlFor={`input-file-review-avatarUrl-${keyComment}`}
                        className=" w-[24px] h-[24px] cursor-pointer "
                      >
                        <Image
                          src="/images/uploadAvatarEdit.png"
                          height={60}
                          width={60}
                          objectFit="contain"
                          alt=""
                          quality={100}
                        />
                      </label>
                    </div>
                  ) : (
                    <div className=" flex justify-center items-center cursor-pointer ">
                      <Image
                        src="/images/avatar_default.png"
                        height={120}
                        width={120}
                        objectFit="cover"
                        alt=""
                        quality={100}
                        className="rounded-full"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
            {checkUpload && persent <= 100 && (
              <div className="w-full mt-[12px] absolute">
                <PropressBar
                  background="bg-[#ECB14E]"
                  backgroundOut="bg-[#E6E6E6]"
                  type={1}
                  skillMatchingPercentage={persent}
                  percentValue={100}
                />
              </div>
            )}
          </div>

          <div>
            {editmode ? (
              <input
                id={`Comment_name_${keyComment}`}
                className={`swiper-no-swiping  border-b outline-none  transition-all bg-inherit  focus:outline-none w-full sm:text-p20-bold text-p18-bold  text-blue-light ${
                  isErrorsName
                    ? 'xl:w-[390px] border-semantic-red'
                    : 'border-transparent hover:border-semantic focus:border-semantic'
                }`}
                placeholder="Nhập tên thành viên"
                defaultValue={comment?.name}
                onChange={(e) =>
                  onsubmit(
                    {
                      ...comment,
                      ind: keyComment,
                      name: e.target.value
                    },
                    `Comment_name_${keyComment}`
                  )
                }
              />
            ) : (
              <p className="bg-inherit mb-[8px] line-clamp-1 break-words xl:w-[390px] w-full sm:text-p20-bold text-p18-bold  text-blue-light">
                {comment?.name}
              </p>
            )}
            {isErrorsName && (
              <p className="xl:w-[390px] w-full text-p16 text-end text-semantic-red leading-[28px]">
                Không được bỏ trống
              </p>
            )}
            {editmode ? (
              <input
                id={`Comment_description_${keyComment}`}
                className={`swiper-no-swiping border-b outline-none mt-[8px] transition-all focus:outline-none w-full sm:text-p16 text-p14 text-neutral bg-inherit ${
                  isErrorsDescription
                    ? 'xl:w-[390px] border-semantic-red'
                    : 'border-transparent hover:border-semantic focus:border-semantic'
                }`}
                placeholder="Nhập chức danh"
                value={comment?.description}
                onChange={(e) =>
                  onsubmit(
                    {
                      ...comment,
                      ind: keyComment,
                      description: e.target.value
                    },
                    `Comment_description_${keyComment}`
                  )
                }
              />
            ) : (
              <p className="xl:w-[390px] w-full sm:text-p16 text-p14 line-clamp-1 break-words text-neutral bg-inherit">
                {comment?.description}
              </p>
            )}
            {isErrorsDescription && (
              <p className="xl:w-[390px] w-full text-p16 text-end text-semantic-red leading-[28px]">
                Không được bỏ trống
              </p>
            )}
          </div>
        </div>
        <div className="hidden sm:block">
          <XProfileIcon name="answer" width="40" height="36" />
        </div>
        <div className="block sm:hidden">
          <XProfileIcon name="answer" width="24" height="23" />
        </div>
      </div>
    </div>
  )
}

ReviewMessBlockDetailEdit.propTypes = {
  type: PropTypes.number,
  comment: PropTypes.object
}
ReviewMessBlockDetailEdit.defaultProps = {
  type: 0,
  comment: {}
}

export default ReviewMessBlockDetailEdit
