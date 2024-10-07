import Button from 'common/presentation/Button'
import ButtonIcon from 'common/presentation/ButtonIcon'
import XProfileIcon from 'common/presentation/Icons'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getExamDetail, selectExamDetail } from 'store/app/examSlice'

const ScreenStartExam = (props) => {
  const { handleClickStart = () => {} } = props
  const dispatch = useDispatch()
  const examDetail = useSelector(selectExamDetail)
  const { name, totalQuestions, totalTime, passScore } = examDetail || {}
  const router = useRouter()
  const { examId } = router.query
  const handleBack = () => {
    window.location.replace(`/exam/${examId}`)
  }

  if (!examDetail) {
    return <div className="flex-1">Không tìm thấy bài kiểm tra</div>
  }
  return (
    <div className="flex-1 pt-10">
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
          <div className="flex flex-col xl:flex-row justify-center items-center gap-8 mt-20 mb-52">
            <div className="flex flex-col gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="quizQuestion" />
                <p className="text-p18 text-black">Số câu hỏi</p>
              </div>
              <span className="text-h3 text-black">{totalQuestions}</span>
            </div>
            <div className="flex flex-col gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="clockCountdownIcon" />
                <p className="text-p18 text-black">Thời gian làm bài</p>
              </div>
              <span className="text-h3 text-black">{`${Math.floor(
                totalTime / 60
              )} phút`}</span>
            </div>
            <div className="flex flex-col gap-2 border border-grey-4 rounded-2xl px-16 py-8">
              <div className="flex items-center gap-2">
                <XProfileIcon name="graduationCapIcon" />
                <p className="text-p18 text-black">Điểm đạt</p>
              </div>
              <span className="text-h3 text-black">{passScore}</span>
            </div>
          </div>
          <div className="flex items-center gap-6">
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

export default ScreenStartExam
