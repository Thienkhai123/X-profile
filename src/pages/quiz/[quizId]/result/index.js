import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import CircularProgressScore from 'common/presentation/Pages/CircularProgressScore'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getResult, selectResult } from 'store/app/examSlice'

const ResultQuizPage = () => {
  const router = useRouter()
  const { quizId } = router.query
  const dispatch = useDispatch()
  const result = useSelector(selectResult)
  const {
    timeConsumedDisplay,
    scoreDisplay,
    totalScore,
    exam,
    score,
    enumUserExamResultDisplay,
    meta
  } = result || {}
  const { name, totalTime, passScore } = exam || {}
  const { totalCorrects, totalFails, totalQuestions } = meta || {}

  useEffect(() => {
    dispatch(getResult({ quizId }))
  }, [quizId])
  return (
    <div className=" bg-white xl:py-14 xl:pt-20 py-10">
      <Head>
        <title>Exam</title>
      </Head>
      <div>
        <div className=" flex flex-col justify-center items-center gap-10 text-center">
          <div className="relative sm:w-[560px] w-screen  xl:h-[762px] h-[662px] drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
            <div className="hidden xl:block">
              <Image
                src={'/images/resultBg.png'}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="absolute top-0 left-0 sm:w-[560px] w-screen p-10 pt-[60px]   ">
              <div className="absolute -top-12 left-10  w-24 h-24 rounded-full flex items-center justify-center">
                <div className=" w-20 h-20 rounded-full bg-button-2 flex items-center justify-center">
                  <XProfileIcon
                    name={
                      score >= passScore
                        ? 'confettiMinimalistic'
                        : 'documentQuiz'
                    }
                  />
                </div>
              </div>
              <div className="  flex flex-col justify-center items-center">
                <div className="sm:flex hidden  items-center gap-10">
                  <div className="flex flex-col gap-4">
                    <p className="text-p18 whitespace-nowrap">
                      Bạn đã hoàn thành bài kiểm tra!
                    </p>
                    <div className="flex flex-col gap-4">
                      <p className="text-p18 text-grey-1 text-left">
                        Số điểm đạt được:
                      </p>
                      <p className="text-h3 text-button-2 text-left">{`${score}/${totalScore}`}</p>
                    </div>
                  </div>
                  <CircularProgressScore
                    size={160}
                    strokeWidth={8}
                    value={Math.ceil((score / totalScore) * 100)}
                    passScore={100}
                    isPass={score >= passScore ? true : false}
                    strokeColor={
                      score < passScore
                        ? '#DB2E24'
                        : score >= passScore
                        ? '#294F9B'
                        : ''
                    }
                  />
                </div>
                {/* <div
              className={`w-full my-6 rounded-lg p-[12px_20px] ${
                score < passScore
                  ? 'bg-[#EA2A2A]'
                  : score >= passScore
                  ? 'bg-[#317AE8]'
                  : ''
              }`}
            >
              <p className="text-p18-bold text-white">
                {enumUserExamResultDisplay}
              </p>
            </div> */}
                <div className="w-full mt-10">
                  <div className="flex items-center justify-between pb-6 border-b  border-grey-4">
                    <p className="text-p18-bold text-black max-w-[300px] overflow-ellipsis overflow-hidden whitespace-nowrap ">
                      {name}
                    </p>
                    <p
                      className={`text-p18-bold ${
                        score < passScore
                          ? 'text-[#DB2E24]'
                          : score >= passScore
                          ? 'text-[#378711]'
                          : ''
                      }`}
                    >
                      {enumUserExamResultDisplay}
                    </p>
                  </div>
                  <div className="flex items-center justify-between py-6 border-b  border-grey-4">
                    <p className="text-p18 text-grey-1">Thời gian làm bài</p>
                    <p>{timeConsumedDisplay}</p>
                  </div>
                  <div className="flex items-center justify-between py-6 border-b  border-grey-4">
                    <p className="text-p18 text-grey-1">Số câu hỏi</p>
                    <p>{totalQuestions}</p>
                  </div>
                  <div className="flex items-center justify-between py-6 border-b  border-grey-4">
                    <p className="text-p18 text-grey-1">Trả lời đúng</p>
                    <p>{totalCorrects} câu</p>
                  </div>
                  <div className="flex items-center justify-between py-6 ">
                    <p className="text-p18 text-grey-1">Trả lời sai/bỏ qua</p>
                    <p>{totalFails} câu</p>
                  </div>
                </div>
              </div>
              <div className="w-full mt-8 grid grid-cols-2  gap-4 ">
                <Button
                  title="Thi lại"
                  width="w-full"
                  background="bg-white "
                  rounded="rounded-[8px] border border-button-2"
                  padding="p-[12px_20px]"
                  height="h-[52px]"
                  color="text-button-2"
                  onClick={() => {
                    if (quizId) {
                      window.location.replace(`/quiz/${quizId}`)
                    }
                  }}
                />
                <Button
                  title="Trở về hồ sơ"
                  width="w-full"
                  background="bg-button-2"
                  rounded="rounded-[8px]"
                  padding="p-[12px_20px]"
                  color="text-white"
                  height="h-[52px]"
                  onClick={() => {
                    window.location.replace(`/applicant-profile`)
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultQuizPage
