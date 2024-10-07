import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import CommentCourseDetail from './CommentCourseDetail'
import dynamic from 'next/dynamic'
import XProfileIcon from 'common/presentation/Icons'
import ReferenCourseDetail from './ReferenCourseDetail'
import ExerciseCourseDetail from './ExerciseCourseDetail'
import DocumentCourse from './DocumentCourse'
import Button from 'common/presentation/Button'
import NoteModal from './NoteModal'

const VideoCourse = dynamic(() => import('./VideoCourse'), {
  ssr: false
})

const STEP_VIDEO = [
  { id: 0, title: 'Tổng quan' },
  { id: 1, title: 'Tài liệu' }
  // { id: 2, title: 'Bài tập' },
  // { id: 3, title: 'Bình luận' }
]

const STEP_SLIDER = [
  { id: 0, title: 'Tổng quan' },
  { id: 1, title: 'Tài liệu' }
  // { id: 2, title: 'Bài tập' },
  // { id: 3, title: 'Bình luận' }
]

const STEP_DOCUMENT = [
  { id: 0, title: 'Tổng quan' },
  { id: 1, title: 'Tài liệu' },
  // { id: 2, title: 'Bài tập' },
  { id: 3, title: 'Bình luận' }
]

const CourseContent = (props) => {
  const {
    description,
    video,
    lessconContent,
    metadata,
    lessonNote,
    resetForm,
    comments,
    checkCurrentPage,
    handleCreateComment = () => {},
    handleCreateCommentParent = () => {},
    handleLikeComent = () => {},
    handleUnLikeComent = () => {},
    handleDisLikeComent = () => {},
    handleUnDisLikeComent = () => {},
    handleDeleteComent = () => {},
    handleNoteLession = () => {},
    handleReadDoneLession = () => {},
    userComment,
    amountComment,
    handleReadMoreComment = () => {},
    chapterId,
    setTimeline,
    loadingCreateCmt = false,
    handleDownloadFile = () => {}
  } = props

  const { isDrmVideo, uploadStatus, lessonId } = video || {}
  const { pdfUrl, pptxUrl } = metadata || {}
  const [step, setStep] = useState(0)
  const handleChoose = (id) => {
    setStep(id)
  }

  useEffect(() => {
    setStep(0)
  }, [chapterId])

  return (
    <div>
      <div className="h-full relative xl:w-[771px] w-full bg-white rounded-[8px] xl:px-[32px] xl:pt-[24px] xl:pb-[32px] px-[8px] py-[8px] border border-grey-4">
        {video?.url && video?.lessonType === 0 && (
          <div className="xl:mb-[30px] mb-[20px] xl:h-[405px] h-full pt-[8px]">
            <VideoCourse
              {...video}
              handleReadDoneLession={handleReadDoneLession}
              chapterId={chapterId}
              setTimeline={setTimeline}
              lessonId={lessonId}
              isDrmVideo={isDrmVideo}
              uploadStatus={uploadStatus}
            />
          </div>
        )}

        <div className="flex mb-[32px]">
          {video?.lessonType === 0 &&
            video?.lessonType !== 6 &&
            STEP_VIDEO.map((element, ind) => {
              return (
                <p
                  key={ind}
                  className={`py-[8px] sm:text-[18px] font-normal leading-[30px] text-p14 hover:cursor-pointer border-b-[3px]  min-w-[140px] text-center ${
                    step === element.id
                      ? 'border-blue-light  text-blue-light duration-100'
                      : 'text-grey-1  border-grey-4 '
                  }`}
                  id={element.id}
                  onClick={() => handleChoose(element.id)}
                >
                  {element.title}
                </p>
              )
            })}
          {(video?.lessonType === 4 || video?.lessonType === 6) &&
            STEP_DOCUMENT.map((element, ind) => {
              return (
                <p
                  key={ind}
                  className={`py-[8px] sm:text-[18px] font-normal leading-[30px] text-p14 hover:cursor-pointer border-b-[3px]  min-w-[140px] text-center ${
                    step === element.id
                      ? 'border-blue-light text-blue-light duration-100'
                      : 'text-grey-1 border-grey-4'
                  }`}
                  id={element.id}
                  onClick={() => handleChoose(element.id)}
                >
                  {element.title}
                </p>
              )
            })}
          {video?.lessonType === 5 &&
            video?.lessonType !== 6 &&
            STEP_SLIDER.map((element, ind) => {
              return (
                <p
                  key={ind}
                  className={`py-[8px] sm:text-[18px] font-normal leading-[30px] text-p14 hover:cursor-pointer border-b-[3px]  min-w-[140px] text-center ${
                    step === element.id
                      ? 'border-blue-light text-blue-light duration-100'
                      : 'text-grey-1 border-grey-4'
                  }`}
                  id={element.id}
                  onClick={() => handleChoose(element.id)}
                >
                  {element.title}
                </p>
              )
            })}
          <div className=" relative border-b-[3px] border-grey-4 flex items-end justify-end w-full">
            <NoteModal
              handleNoteLession={handleNoteLession}
              lessonNote={lessonNote}
            />
          </div>
        </div>
        {step === 0 && (
          <>
            {video?.lessonType === 4 && (
              <div className=" h-full mt-[24px]">
                <DocumentCourse {...video} />
                <div className="xl:mt-[32px] mt-[20px] flex justify-center">
                  {lessonNote?.isDone && (
                    <div className="h-[48px] py-[8px] px-[32px] flex justify-center items-center rounded-[8px] gap-[8px] bg-grey-4">
                      <XProfileIcon name="checkDone" />
                      <p className="text-[18px] font-bold leading-[30px] text-black">
                        Đã học
                      </p>
                    </div>
                  )}
                  {!lessonNote?.isDone && (
                    <Button
                      title="Đánh dấu đã đọc"
                      width="w-[218px] "
                      height="h-[48px]"
                      rounded="rounded-[8px]"
                      background="bg-button"
                      disableBackground="disabled:bg-[#43A047]"
                      color="text-black"
                      textWeight="sm:text-p18-bold text-p14-bold"
                      margin="m-0"
                      onClick={() => {
                        handleReadDoneLession()
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            {video?.lessonType === 6 && pdfUrl && (
              <div className="h-fit">
                <div
                  class="embed-responsive mb-8 overflow-hidden rounded-lg"
                  style={{ height: '700px' }}
                >
                  <embed
                    src={`${pdfUrl}`}
                    type="application/pdf"
                    width="100%"
                    height="100%"
                  />
                </div>
                <div className="xl:mt-[32px] mt-[20px] flex justify-center">
                  {lessonNote?.isDone && (
                    <div className="h-[48px] py-[8px] px-[32px] flex justify-center items-center rounded-[8px] gap-[8px] bg-grey-4">
                      <XProfileIcon name="checkDone" />
                      <p className="text-[18px] font-bold leading-[30px] text-black">
                        Đã học
                      </p>
                    </div>
                  )}
                  {!lessonNote?.isDone && (
                    <Button
                      margin="m-0"
                      title="Đánh dấu đã đọc"
                      width="w-[218px] "
                      height="h-[48px]"
                      rounded="rounded-[8px]"
                      background="bg-button"
                      color="text-black"
                      textWeight="sm:text-p18-bold text-p14-bold"
                      onClick={() => {
                        handleReadDoneLession()
                      }}
                    />
                  )}
                </div>
              </div>
            )}
            {video?.lessonType === 0 && video?.url && (
              <>
                {lessconContent?.description && (
                  <p className="text-p16 leading-[28px] text-grey-1 mb-[32px]">
                    {lessconContent?.description || ''}
                  </p>
                )}
                <div className="p-[32px] rounded-borderStep bg-light-blue">
                  <CommentCourseDetail
                    {...lessconContent}
                    loadingCreateCmt={loadingCreateCmt}
                    checkCurrentPage={checkCurrentPage}
                    amountComment={amountComment}
                    handleLikeComent={handleLikeComent}
                    handleUnLikeComent={handleUnLikeComent}
                    handleDisLikeComent={handleDisLikeComent}
                    handleUnDisLikeComent={handleUnDisLikeComent}
                    handleCreateComment={handleCreateComment}
                    comments={comments}
                    chapterId={chapterId}
                    userComment={userComment}
                    handleCreateCommentParent={handleCreateCommentParent}
                    handleDeleteComent={handleDeleteComent}
                    handleReadMoreComment={handleReadMoreComment}
                  />
                </div>
              </>
            )}
            {video?.lessonType === 5 && (
              <>
                {lessconContent?.content && (
                  <p className="text-p20 leading-[32px] font-bold text-black mb-[8px]">
                    {lessconContent?.content || ''}
                  </p>
                )}
                {lessconContent?.description && (
                  <p className="text-p16 leading-[28px] text-grey-1 mb-[24px]">
                    {lessconContent?.description || ''}
                  </p>
                )}
                {pptxUrl && (
                  <div className="xl:h-[707px] mb-[32px]">
                    <iframe
                      src={`${pptxUrl || ''}`}
                      type="application/ppt"
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
                <div className="p-[32px] rounded-borderStep bg-light-blue">
                  <CommentCourseDetail
                    {...lessconContent}
                    loadingCreateCmt={loadingCreateCmt}
                    checkCurrentPage={checkCurrentPage}
                    amountComment={amountComment}
                    handleLikeComent={handleLikeComent}
                    handleUnLikeComent={handleUnLikeComent}
                    handleDisLikeComent={handleDisLikeComent}
                    handleUnDisLikeComent={handleUnDisLikeComent}
                    handleCreateComment={handleCreateComment}
                    comments={comments}
                    chapterId={chapterId}
                    userComment={userComment}
                    handleCreateCommentParent={handleCreateCommentParent}
                    handleDeleteComent={handleDeleteComent}
                    handleReadMoreComment={handleReadMoreComment}
                  />
                </div>
              </>
            )}
          </>
        )}
        {step === 1 && (
          <div className=" pb-[32px] rounded-borderStep ">
            <ReferenCourseDetail
              {...lessconContent}
              handleDownloadFile={handleDownloadFile}
            />
          </div>
        )}
        {step === 2 && (
          <div className="pt-[32px] pb-[32px] rounded-borderStep ">
            <ExerciseCourseDetail />
          </div>
        )}
        {step === 3 && (
          <div className="mt-[32px]">
            <div className="pt-[16px] pb-[32px] px-[24px] rounded-borderStep bg-light-blue">
              <CommentCourseDetail
                {...lessconContent}
                loadingCreateCmt={loadingCreateCmt}
                checkCurrentPage={checkCurrentPage}
                amountComment={amountComment}
                handleLikeComent={handleLikeComent}
                handleUnLikeComent={handleUnLikeComent}
                handleDisLikeComent={handleDisLikeComent}
                handleUnDisLikeComent={handleUnDisLikeComent}
                handleCreateComment={handleCreateComment}
                comments={comments}
                chapterId={chapterId}
                userComment={userComment}
                handleCreateCommentParent={handleCreateCommentParent}
                handleDeleteComent={handleDeleteComent}
                handleReadMoreComment={handleReadMoreComment}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

CourseContent.propTypes = { description: PropTypes.string }
CourseContent.defaultProps = {
  description: ''
}

export default CourseContent
