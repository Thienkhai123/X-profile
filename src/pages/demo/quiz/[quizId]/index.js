import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getExamDetail, selectExamDetail } from 'store/app/examSlice'
// const res = {
//   testGorilla: null,
//   meta: {
//     testGorilla: null
//   },
//   exQuestions: [],
//   listExamQuestionId: null,
//   score: 0,
//   answers: null,
//   sourceDisplay: 'X-Profile',
//   testTakerId: 0,
//   totalQuestions: 200,
//   examId: 12,
//   name: 'TOEIC TEST',
//   enumExamType: 1,
//   source: 0,
//   passScore: 70,
//   totalTime: 900,
//   highScore: 990,
//   totalPart: 2,
//   userMarkStringList: null,
//   isRandom: true,
//   examGuid: '12bfe1ea-86e3-4107-babb-eb6cf2120b07',
//   hasAntiCheat: false,
//   companyId: null,
//   courseId: null,
//   testGorillaId: null,
//   testGorillaAssessmentId: '',
//   metadata: '{"TestGorilla":null}',
//   createdByUserId: null,
//   updatedByUserId: null,
//   updatedAt: '2023-05-18T16:35:43.623654',
//   createdAt: '2023-05-18T16:35:43.62346',
//   isActive: true,
//   isDeleted: false
// }
const QuizPage = () => {
  const dispatch = useDispatch()
  const examDetail = useSelector(selectExamDetail)
  const { name, totalQuestions, totalTime, passScore, highScore, totalPart } =
    examDetail || {}
  const router = useRouter()
  const { quizId } = router.query

  const handleBack = () => {
    window.location.replace(`/applicant-profile`)
  }
  const handleClickStart = () => {
    window.location.replace(`/demo/quiz/${quizId}/in-progress`)
  }
  console.log(examDetail)

  useEffect(() => {
    dispatch(getExamDetail({ quizId }))
    // setExamDetail(res)
  }, [quizId, dispatch])

  if (!examDetail) {
    return <div className="flex-1">Không tìm thấy bài kiểm tra</div>
  }
  return (
    <div className="flex-1 py-10 bg-white">
      <Head>
        <title>Quiz</title>
      </Head>
      <div>
        <div className=" flex flex-col justify-center items-center  text-center">
          <p className="text-h3 text-neutral">{name}</p>
          <p className="xl:text-p18 text-p16 text-neutral max-w-[492px] mt-6">
            <span className="font-bold">{`Lưu ý: `}</span>
            Nội dung bài kiểm tra năng lực đạt chuẩn quốc tế & được thể hiện
            hoàn toàn bằng Tiếng Anh.
          </p>
          <div className="max-w-[913px] w-full grid grid-cols-2 justify-center items-center gap-[45px] mt-20 mb-[115px]">
            <div className="flex flex-col items-center gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="quizQuestion" />
                <p className="text-p18 text-black">Số câu hỏi</p>
              </div>
              <span className="text-h3 text-black">{totalQuestions}</span>
            </div>
            <div className="flex flex-col items-center gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="clockCountdownIcon" />
                <p className="text-p18 text-black">Thời gian làm bài</p>
              </div>
              <span className="text-h3 text-black">{`${Math.floor(
                totalTime / 60
              )} phút`}</span>
            </div>
            <div className="flex flex-col items-center gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="quizQuestion" />
                <p className="text-p18 text-black">Số phần thi</p>
              </div>
              <span className="text-h3 text-black">{2}</span>
            </div>
            <div className="flex flex-col items-center gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="graduationCapIcon" />
                <p className="text-p18 text-black">Điểm cao nhất</p>
              </div>
              <span className="text-h3 text-black">{990}</span>
            </div>
          </div>
          <div className="flex items-center gap-6 ">
            <ButtonIcon
              background="bg-transparent"
              rounded="rounded-lg border border-grey-3"
              iconName="arrowBackTest"
              title=" Trở về"
              width="w-[154px]"
              height="h-[56px]"
              padding="py-3 px-8"
              margin="m-0"
              textWeight="text-p18-bold whitespace-nowrap"
              iconWidth={18}
              iconHeight={18}
              onClick={handleBack}
            />
            <Button
              title="Bắt đầu"
              width="w-[154px]"
              rounded="rounded-[8px]"
              padding="p-[12px_20px]"
              height="h-[56px]"
              margin="m-0"
              onClick={() => {
                handleClickStart()
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuizPage
