import { async } from '@firebase/util'
import { Slider } from 'common/presentation'
import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import QuestionItem from 'common/presentation/Pages/quiz/questionItem'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  finishExam,
  selectAnswers,
  selectExamDetail,
  selectQuestions,
  startExam,
  updateAnswers
} from 'store/app/examSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { Navigation } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
const CountdownTimer = dynamic(
  () => import('common/presentation/Pages/quiz/CountdownTimer'),
  { ssr: false }
)
const ScreenInProgress = () => {
  const router = useRouter()
  const { examId } = router.query
  const dispatch = useDispatch()
  const [percent, setPercent] = useState(0)
  const questions = useSelector(selectQuestions)
  const examDetail = useSelector(selectExamDetail)
  const answers = useSelector(selectAnswers)
  const userProfile = useSelector(selectUserProfile)
  const [isLastSlide, setIsLastSlide] = useState(false)
  const [isFirstSlide, setIsFirstSlide] = useState(false)

  const { name: userName } = userProfile || {}
  const { name, totalTime, passScore, totalQuestions } = examDetail || {}

  const timer = useMemo(() => {
    const time = parseInt(totalTime) * 1000
    const NOW_IN_MS = new Date().getTime()
    const dateTimeAfterThreeDays = NOW_IN_MS + time
    return dateTimeAfterThreeDays
  }, [totalTime])

  const handleChooseAnswer = (data) => {
    const { index, questionId, answerId } = data
    const newResult = { ...answers }
    newResult[questionId] = {
      exQuestionId: questionId,
      exAnswerId: answerId
    }

    dispatch(updateAnswers(newResult))
  }
  const handleSubmitExam = async () => {
    if (examId && answers) {
      const convertArr = Object.keys(answers).map((key) => answers[key])
      const payload = {
        examGuid: examId,
        answers: convertArr
      }
      const res = await dispatch(finishExam(payload))

      if (res.payload?.isSuccess) {
        window.location.replace(`/exam/${examId}/result`)
      }
    }
  }
  const handleClickBack = () => {
    if (examId) {
      window.location.replace(`/exam/${examId}`)
    }
  }
  useEffect(() => {
    if (examId) {
      dispatch(startExam({ quizId: examId }))
    }
  }, [examId, dispatch])

  useEffect(() => {
    const pc = (Object.keys(answers).length / questions?.length) * 100
    setPercent(Math.ceil(pc))
  }, [Object.keys(answers).length, questions?.length])
  return (
    <div className="flex-1 pb-6">
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        <div className="bg-white py-10 px-4 xl:px-0">
          <div className="xl:max-w-[1104px] mx-auto flex xl:flex-row flex-col justify-between  ">
            <div className=" w-[504px]">
              <div>
                <p className="text-h4">{name}</p>
                <div className="flex items-center gap-2 mt-4">
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="graduationCapIcon" fill="#666666" />
                    <p className="text-p16 text-grey-1">{passScore} điểm</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="clockCountdownIcon" fill="#666666" />
                    <p className="text-p16 text-grey-1">
                      {Math.floor(totalTime / 60)} phút
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <XProfileIcon name="quizQuestion" fill="#666666" />
                    <p className="text-p16 text-grey-1">
                      {Object.keys(answers).length} / {questions?.length} câu
                      hỏi
                    </p>
                  </div>
                </div>
                <div>
                  <div className=" w-full h-2 bg-gray-200 mt-3 mb-5 rounded-full transition-all overflow-hidden  flex">
                    <div
                      className="bg-button transition-all text-p16  text-neutral text-center p-0.5  rounded-full"
                      style={{ width: `${percent}%` }}
                    ></div>
                  </div>
                  <div className="">
                    <p>
                      Bạn đã hoàn thành {percent}% bài kiểm tra. Tiếp tục nào!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className=" ">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2 min-w-[260px] rounded-2xl border border-grey-4 px-4 py-[6px]">
                  <XProfileIcon
                    name="user2"
                    fill="#000"
                    width="20"
                    height="20"
                  />
                  <p className="text-p16 text-black max-w-[200px] overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {userName}
                  </p>
                </div>
                <div className="flex items-center gap-2 rounded-2xl border border-grey-4 px-4 py-[6px]">
                  <XProfileIcon name="videocamera" />
                  <XProfileIcon name="unread" width="20" height="20" />
                </div>
              </div>
              <CountdownTimer
                key="countdown"
                handleSubmitExam={handleSubmitExam}
                targetDate={timer}
                name={name}
              />
            </div>
          </div>
        </div>
        <Swiper
          allowTouchMove={false}
          modules={[Navigation]}
          navigation={{
            nextEl: '.next',
            prevEl: '.prev',
            clickable: true
          }}
          autoHeight={true}
          onSlideChange={(swiper) => {
            setIsLastSlide(swiper?.isEnd), setIsFirstSlide(swiper?.isBeginning)
          }}
        >
          {questions?.map((el, index) => {
            const { position, questionId, question, exQuestionId } = el || {}
            const {
              exAnswers,
              content,
              enumQuestionType,
              imageTemplate,
              detail
            } = question || {}
            return (
              <SwiperSlide key={index}>
                <QuestionItem
                  {...el}
                  answers={exAnswers}
                  questionTitle={content}
                  type={imageTemplate}
                  handleChooseAnswer={handleChooseAnswer}
                  result={answers}
                  questionIndex={index}
                  exQuestionId={exQuestionId}
                  detail={detail}
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <div className="w-full flex justify-center items-center  gap-4 ">
          <button
            disabled={isFirstSlide}
            className="prev disabled:bg-grey-4 disabled:text-black text-neutral w-[150px] flex justify-center cursor-pointer px-4 py-3 rounded-lg bg-button"
          >
            <p className="text-p18-bold ">Trở về</p>
          </button>
          <div className={`${isLastSlide ? 'hidden' : 'block'}`}>
            <button
              disabled={isLastSlide}
              className="next disabled:bg-grey-4 disabled:text-black text-neutral w-[150px] flex justify-center  cursor-pointer px-4 py-3 rounded-lg bg-button"
            >
              <p className="text-p18-bold ">Tiếp theo</p>
            </button>
          </div>
          <div className={`${!isLastSlide ? 'hidden' : 'block'}`}>
            <button
              // disabled={isLastSlide}
              onClick={() => handleSubmitExam()}
              className="next disabled:bg-grey-4 disabled:text-black text-neutral w-[150px] flex justify-center  cursor-pointer px-4 py-3 rounded-lg bg-button"
            >
              <p className="text-p18-bold ">Gửi trả lời</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ScreenInProgress
