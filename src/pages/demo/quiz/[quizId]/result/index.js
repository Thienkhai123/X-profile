import Button from 'common/presentation/Button'
import XProfileIcon from 'common/presentation/Icons'
import CircularProgressScore from 'common/presentation/Pages/CircularProgressScore'
import ProgressResultBar from 'common/presentation/Pages/quiz/ProgressResultBar'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getResult, selectResult } from 'store/app/examSlice'
const LISTENING = [
  'Cursus natoque sociosqu sodales tincidunt feugiat vulputate dapibus. Justo mattis lobortis etiam nisi magnis.',
  'Sit ridiculus quis leo egestas consectetuer',
  'Sit ridiculus quis leo egestas consectetuer',
  'Sit ridiculus quis leo egestas consectetuer',
  'Sit ridiculus quis leo egestas consectetuer',
  'Sit ridiculus quis leo egestas consectetuer',
  'Sit ridiculus quis leo egestas consectetuer'
]
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
  const {
    totalCorrects,
    totalFails,
    totalQuestions,
    totalToeicListeningCorrect,
    totalToeicListeningCount,
    totalToeicListeningScore,
    totalToeicReadingCorrect,
    totalToeicReadingCount,
    totalToeicReadingScore,
    toeicListeningComments,
    toeicReadingComments,
    toeicOverall
  } = meta || {}

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
          <div className="relative sm:w-[1000px] w-screen  xl:h-[960px]  drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)]">
            <div className="hidden xl:block">
              <Image
                src={'/images/resultBgNew1.png'}
                layout="fill"
                alt=""
                objectFit="contain"
              />
            </div>
            <div className="absolute top-0 left-0 sm:w-[1000px] w-screen p-[50px] pt-[60px]   ">
              <div className="absolute -top-11 left-[113px]  w-24 h-24 rounded-full flex items-center justify-center">
                <div className=" w-[90px] h-[90px] rounded-full bg-button-2 flex items-center justify-center">
                  <XProfileIcon
                    name={
                      score >= passScore
                        ? 'confettiMinimalistic'
                        : 'documentQuiz'
                    }
                  />
                </div>
              </div>
              <div className="flex items-start justify-center mt-[30px] mb-[43px]">
                <div className="w-[347px] flex items-start flex-col">
                  <p className="text-p18-bold text-button-2">TOEIC TEST</p>
                  <div className="w-full border-r border-grey-4 pr-[46px]">
                    <div className="h-[26px] w-full border-b border-grey-4"></div>
                    <div className="pt-6 pb-[18px] flex items-center justify-between border-b border-grey-4">
                      <p className="text-p18 text-grey-1">Listening</p>
                      <p className="text-p18 text-black">
                        {totalToeicListeningCorrect}/100
                      </p>
                    </div>
                    <div className="pt-6 pb-[18px] flex items-center justify-between border-b border-grey-4">
                      <p className="text-p18 text-grey-1">Reading</p>
                      <p className="text-p18 text-black">
                        {totalToeicReadingCorrect}/100
                      </p>
                    </div>
                  </div>
                </div>
                <div className="w-[308px] flex items-start flex-col pl-[30px]">
                  <p className="text-p18-bold text-button-2">LISTENING</p>
                  <div className="w-full border-r border-grey-4 pr-5">
                    <div className="pt-7 pb-[18px] flex items-center justify-between">
                      <ProgressResultBar
                        percentValue={totalToeicListeningScore}
                      />
                    </div>
                    <p className="text-p18-bold text-button-2 text-left mt-5">
                      READING
                    </p>
                    <div className="pt-7  flex items-center justify-between ">
                      <ProgressResultBar
                        percentValue={totalToeicReadingScore}
                      />
                    </div>
                  </div>
                </div>
                <div className=" flex items-start flex-col pl-[43px]">
                  <div>
                    <p className="text-p18-bold text-button-2 ">TOTAL SCORE</p>
                    <div>
                      <div className="h-[26px] w-full "></div>
                      <div className=" flex items-center justify-center bg-white drop-shadow-[0_8px_16px_rgba(0,0,0,0.04)] rounded-full w-[110px] h-[110px]">
                        {/* <span
                        className={`text-h3 ${
                          isPass ? 'text-[#294F9B]' : 'text-[#DB2E24]'
                        }`}
                      >{`150`}</span> */}
                        <span className={`text-h3 text-[#DB2E24]`}>
                          {Math.floor(
                            totalToeicListeningScore + totalToeicReadingScore
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-[18px]">
                <div className="relative w-[440px] h-[398px]">
                  <Image
                    src={'/images/testCommentBg.png'}
                    layout="fill"
                    alt=""
                    objectFit="contain"
                  />
                  <div className="absolute w-[440px] h-[398px] pt-[25px] px-10 pb-[46px]">
                    <p className="text-p18-bold text-button-2">LISTENING</p>
                    <div className="flex flex-col items-start gap-4 mt-4 max-h-[304px] overflow-y-auto custom-scrollbar1">
                      {toeicListeningComments?.map((item, index) => (
                        <p
                          className="text-start text-p16 text-grey-1 leading-7"
                          key={index}
                        >
                          {index + 1}.{item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="relative w-[440px] h-[398px]">
                  <Image
                    src={'/images/testCommentBg.png'}
                    layout="fill"
                    alt=""
                    objectFit="contain"
                  />
                  <div className="absolute w-[440px] h-[398px] pt-[25px] px-10 pb-[46px]">
                    <p className="text-p18-bold text-button-2">READING</p>
                    <div className="flex flex-col items-start gap-4 mt-4 max-h-[304px] overflow-y-auto custom-scrollbar1">
                      {toeicReadingComments?.map((item, index) => (
                        <p
                          className="text-start text-p16 text-grey-1 leading-7"
                          key={index}
                        >
                          {index + 1}.{item}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[26px] ">
                <div className="border-b border-grey-4 pb-2 w-[300px]">
                  <p className="text-start text-p18-bold text-button-2">
                    OVERALL
                  </p>
                </div>
                <div className="max-h-28 overflow-y-auto custom-scrollbar1">
                  <p className="mt-4 text-grey-1 text-p16 text-start">
                    {toeicOverall || ''}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full  flex items-center justify-center ">
            <Button
              title="Trở về hồ sơ"
              width="w-[228px]"
              background="bg-button-2"
              rounded="rounded-[8px]"
              padding="p-[13px_32px]"
              color="text-white"
              height="h-[56px]"
              onClick={() => {
                window.location.replace(`/applicant-profile`)
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultQuizPage
