import LoadingRole from 'common/presentation/Loading/LoadingRole'
import ExamScreenCheckCamera from 'common/presentation/Pages/exam/ExamScreenCheckCamera'
import ExamScreenStart from 'common/presentation/Pages/exam/ExamScreenStart'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getExamDetail, selectExamDetail } from 'store/app/examSlice'
import { selectUserProfile } from 'store/app/userSlice'
import { authService } from 'store/helper/authService'

const ExamPage = () => {
  const [screen, setScreen] = useState(1)
  const [token, setToken] = useState('')
  const [checkScreenDevice, setCheckScreenDevice] = useState(null)
  const examDetail = useSelector(selectExamDetail)
  const userProfile = useSelector(selectUserProfile)
  const { name: userName } = userProfile || {}
  const { name, hasAntiCheat } = examDetail || {}
  const router = useRouter()
  const { examId } = router.query
  const handleChangeScreen = (num) => {
    setScreen(num)
  }
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getExamDetail({ quizId: examId }))
  }, [examId, dispatch])
  useEffect(() => {
    const userToken = authService.getAccessToken()
    if (userToken) {
      setToken(userToken)
      if (window.innerWidth > 1024) {
        setCheckScreenDevice(true)
      } else {
        setCheckScreenDevice(false)
      }
    }
  }, [])
  if (hasAntiCheat === false) {
    window.location.href = `/quiz/${examId}`
    return (
      <div className="flex-1">
        <LoadingRole />
      </div>
    )
  }

  if (checkScreenDevice === null) {
    return <div className="flex-1"></div>
  }

  if (checkScreenDevice === false) {
    return (
      <div className="flex-1 pt-10 pb-[80px] bg-white px-4">
        <p className="text-h4">
          Vui lòng mở trình duyệt làm bài thi trên desktop!
        </p>
      </div>
    )
  }

  return (
    <Fragment>
      <Head>
        <title>Làm bài kiểm tra</title>
      </Head>
      <Script src="/asset/js/srs.sdk.js" />

      <div className="flex-1 pb-[80px] bg-white sm:px-0 px-4">
        {screen === 1 && (
          <div className="xl:max-w-[1039px] mx-auto pt-10">
            <ExamScreenStart
              userName={userName || '[UserName]'}
              handleChangeScreen={handleChangeScreen}
              examTitle={name || '[Tên_Bài_Thi]'}
            />
          </div>
        )}

        {screen === 2 && (
          <div className="mx-auto">
            <ExamScreenCheckCamera
              handleChangeScreen={handleChangeScreen}
              token={token}
              examTitle={name || '[Tên_Bài_Thi]'}
            />
          </div>
        )}
      </div>
    </Fragment>
  )
}

export default ExamPage
