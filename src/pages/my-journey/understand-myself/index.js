import useTrans from 'common/hooks/useTrans'
import { AlertWaring } from 'common/presentation/Notification/Toast/AlertWaring'
import MyJourneyMap from 'common/presentation/Pages/my-journey/MyJourneyMap'
import MyJourneyMapMobile from 'common/presentation/Pages/my-journey/MyJourneyMapMobile'
import MyJourneyQuizCard from 'common/presentation/Pages/my-journey/MyJourneyQuizCard'
import MyJourneySideBanner from 'common/presentation/Pages/my-journey/MyJourneySideBanner'
import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { getMap, selectStepMap } from 'store/app/journeySlice'

const FAKE_LIST = [
  {
    title: 'Trắc nghiệm MBTI - Khám phá tính cách',
    description:
      'Trắc Nghiệm MBTI là bài test tính cách phổ biến nhất để bạn dễ dàng định hướng nghề nghiệp.',
    time: 5200,
    question: 100
  },
  {
    title: 'Trắc nghiệm AQ -  Chỉ số vượt khó',
    description:
      'Trắc Nghiệm AQ dùng để đo lường khả năng đối diện và giải quyết trước những áp lực, thử thách, thay đổi.',
    time: 5200,
    question: 100
  },
  {
    title: 'Trắc nghiệm IQ - Chỉ số thông minh',
    description:
      'Trắc nghiệm IQ là bài test đung để đo lường trí thông minh và khả năng tư duy của não bộ.',
    time: 5200,
    question: 100
  },
  {
    title: 'Trắc nghiệm EQ - Chỉ số thông minh cảm xúc',
    description:
      'Trắc nghiệm EQ là bài test dùng để đo lường trí tưởng tượng, khả năng nhận biết cảm xúc và sáng tạo.',
    time: 5200,
    question: 100
  }
]

const FAKE_LIST_SURVEY = [
  {
    title: 'Bài test MBTI',
    surveyName: 'Bạn thuộc nhóm tính cách INFP - Người lý tưởng hoá',
    description:
      'Khá trầm lặng, kín đáo và tốt bụng. Thỉnh thoảng bạn khá nhạy cảm nên cũng dễ bị tổn thương. Bạn là người sáng tạo, độc đáo và giàu trí tưởng tượng. '
  }
]

const UnderstandYourselfPage = () => {
  const trans = useTrans()
  const dispatch = useDispatch()
  const { MY_JOURNEY } = trans

  const selectStep = useSelector(selectStepMap)

  const handleSurvey = () => {
    toast(
      AlertWaring({
        title:
          'Bài trắc nghiệm này vẫn đang được phát triển, bạn chờ thêm một chút nữa nhé!'
      }),
      {
        toastId: 'alert-create-success',
        className: 'bg-toast-custom',
        closeButton: false,
        position: 'top-center',
        hideProgressBar: true,
        autoClose: 3000
      }
    )
  }
  const stageId = selectStep
  const roleId = parseInt(localStorage.getItem('ROLE')) || 0

  useEffect(() => {
    dispatch(getMap())
  }, [dispatch])

  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - Hiểu bản thân</title>
      </Head>
      <div className="min-h-[100vh] relative flex flex-col">
        <div className="flex-1  bg-white">
          <div className="xl:max-w-[1440px] md:py-[56px] py-6 md:px-20 px-0 mx-auto">
            <h1 className="text-center xl:mb-[56px] mb-4 md:text-[28px] text-p16  mx-auto">
              Khám phá bản thân trong nghề nghiệp
            </h1>
            <div className="mb-[56px] xl:w-[1140px] xl:block hidden mx-auto relative group pointer-events-none">
              <MyJourneyMap state={stageId} role={roleId} />
            </div>
            <div className="xl:hidden px-6">
              <MyJourneyMapMobile state={stageId} role={roleId} />
            </div>
            <div className="xl:flex gap-8 justify-center">
              <div className="xl:min-w-[280px] ">
                <MyJourneySideMenu actionList={MY_JOURNEY?.journeyAction} />
              </div>

              <div className="flex flex-col md:gap-6 gap-4 flex-1 md:px-0 px-6">
                {FAKE_LIST_SURVEY.length > 0 && (
                  <p className="md:text-p20-bold text-p16-bold text-neutral">
                    Trắc nghiệm đã làm
                  </p>
                )}
                <div className=" xl:flex-1 flex flex-col gap-[24px] ">
                  {FAKE_LIST_SURVEY.map((el, ind) => (
                    <MyJourneyQuizCard
                      {...el}
                      key={ind}
                      typeCard={1}
                      handleSurvey={handleSurvey}
                    />
                  ))}
                </div>
                {FAKE_LIST_SURVEY.length > 0 && (
                  <p className="md:text-p20-bold text-p16-bold text-neutral">
                    Trắc nghiệm cần làm
                  </p>
                )}
                <div className=" xl:flex-1 flex flex-col md:gap-6 gap-4 ">
                  {FAKE_LIST.map((el, ind) => (
                    <MyJourneyQuizCard
                      {...el}
                      key={ind}
                      typeCard={0}
                      handleSurvey={handleSurvey}
                    />
                  ))}
                </div>
              </div>

              <div className="xl:w-[279px] xl:block hidden ">
                <MyJourneySideBanner
                  listSuggest={MY_JOURNEY?.suggestList}
                  title="Gợi ý các ngành nghề phù hợp với INFP"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default UnderstandYourselfPage
