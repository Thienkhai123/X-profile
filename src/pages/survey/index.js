import SurveyListQuests from 'common/presentation/Pages/Survey/SurveyListQuestions'
import SurveyQuestion from 'common/presentation/Pages/Survey/SurveyQuestion'
import SurveyStep from 'common/presentation/Pages/Survey/SurveyStep'
import Head from 'next/head'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  getPublishedSurvey,
  selectPublishedSurveys
} from 'store/app/surveySlice'
import { ACCESS_TOKEN, ROLE_STORAGE } from 'common/config/app.constants'
import SurveyDecided from 'common/presentation/Pages/Survey/SurveyDecided'
import { useRouter } from 'next/router'
import useTrans from 'common/hooks/useTrans'
import { selectUserProfile } from 'store/app/userSlice'
import Image from 'next/image'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'
import LoadingRole from 'common/presentation/Loading/LoadingRole'

const SurveyPage = () => {
  const trans = useTrans()
  const dispatch = useDispatch()
  const router = useRouter()
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.SURVEY.GETPUBLISHEDSURVEY) ||
      selectLoading(state, APP_TYPES.JOB.GETJOBBYJOBCATEGORY) ||
      selectLoading(state, APP_TYPES.SURVEY.POSTSURVEY)
  )
  const { SURVEY } = trans
  const { Survey, QuestionMyWant, QuestionMyNeed, decided, titleHeader } =
    SURVEY
  const [role, setRole] = useState(null)
  const surveys = useSelector(selectPublishedSurveys)
  const userProfile = useSelector(selectUserProfile)

  const [typeSurvey, setTypeSurvey] = useState(0)

  const amountType = () => {
    if (typeSurvey < 3) {
      setTypeSurvey(typeSurvey + 1)
    }
  }
  const unAmountType = () => {
    if (typeSurvey >= 0) {
      setTypeSurvey(typeSurvey - 1)
    }
  }

  const [surveyResult, setSurveyResult] = useState({
    first: [],
    second: []
  })

  const handleChooseSurveyFirst = (ids) => {
    setSurveyResult({ ...surveyResult, first: ids })
  }

  const handleClearSurveyFirst = () => {
    setSurveyResult({ ...surveyResult, first: [] })
  }

  const handleChooseSurveySecond = (ids) => {
    setSurveyResult({ ...surveyResult, second: ids })
  }

  const handleClearSurveySecond = () => {
    setSurveyResult({ ...surveyResult, second: [] })
  }

  useEffect(() => {
    dispatch(getPublishedSurvey())
    if (localStorage.getItem(ACCESS_TOKEN)) {
      setRole(userProfile?.setting?.characterId)
    } else {
      const role = localStorage.getItem(ROLE_STORAGE)
      if (role === null) {
        router.push('/role')
      } else {
        if (parseInt(role) === 2) {
          router.push('/')
        } else {
          setRole(role)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile])

  if (role === null) {
    return <div className="flex-1"></div>
  }

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1 flex flex-col w-full mx-auto relative">
        <Head>
          <title>{titleHeader}</title>
        </Head>
        {typeSurvey === 0 && (
          <div className="duration-300 flex-[1_1_0]">
            <SurveyQuestion SETTING={Survey} amountType={amountType} />
          </div>
        )}
        {typeSurvey === 1 && (
          <div className="ml-5 mr-5 xl:ml-0 xl:mr-0 flex-1 z-[2]">
            <SurveyListQuests
              titleBackButton={QuestionMyWant?.titleBackButton}
              titleButton={QuestionMyWant?.titleButton}
              unAmountType={unAmountType}
              amountType={amountType}
              SURVEYS={surveys[0]?.answers}
              typeSurvey={typeSurvey}
              title={QuestionMyWant.title}
              textDescription={QuestionMyWant.description}
              role={parseInt(role)}
              handleChooseAnswer={handleChooseSurveyFirst}
              handleClearSurveyFirst={handleClearSurveyFirst}
              listSurvey={surveyResult.first}
            />
          </div>
        )}
        {typeSurvey === 2 && (
          <div className="ml-5 mr-5 xl:ml-0 xl:mr-0 flex-1 z-[2]">
            <SurveyListQuests
              titleBackButton={QuestionMyNeed?.titleBackButton}
              titleButton={QuestionMyNeed?.titleButton}
              unAmountType={unAmountType}
              amountType={amountType}
              typeSurvey={typeSurvey}
              SURVEYS={surveys[1]?.answers}
              title={QuestionMyNeed.title}
              textDescription={QuestionMyNeed.description}
              role={parseInt(role)}
              handleChooseAnswer={handleChooseSurveySecond}
              handleClearSurveyFirst={handleClearSurveySecond}
              listSurvey={surveyResult.second}
            />
          </div>
        )}
        {typeSurvey === 3 && (
          <div
            className={`${
              typeSurvey === 3
                ? 'ml-5 mr-5 xl:ml-0 xl:mr-0 flex-1 z-[2]'
                : 'hidden '
            }`}
          >
            <SurveyDecided
              unAmountType={unAmountType}
              surveyResult={surveyResult}
              decided={decided}
            />
          </div>
        )}
        {typeSurvey !== 0 && (
          <div className="mt-8 pb-8 xl:w-[1141px] w-full mx-auto mb-8 xl:mb-0 relative z-[2] sm:px-0 px-[10vw]">
            <SurveyStep typeSurvey={typeSurvey} />
          </div>
        )}
        <div className="absolute h-[408px] w-full bottom-0">
          <div className="relative h-[408px] w-full bottom-0">
            <Image
              alt="survey-background"
              src={
                parseInt(role) === 0
                  ? '/images/sheep-survey.png'
                  : '/images/mouse-survey.png'
              }
              placeholder="blur"
              blurDataURL={
                parseInt(role) === 0
                  ? '/images/sheep-survey.png'
                  : '/images/mouse-survey.png'
              }
              layout="fill"
              objectFit="cover"
              quality={100}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default SurveyPage
