import Head from 'next/head'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getAllExam, selectAllExam } from 'store/app/examSlice'

const QuizPage = () => {
  const dispatch = useDispatch()
  const listExam = useSelector(selectAllExam)
  useEffect(() => {
    dispatch(getAllExam())
  }, [dispatch])
  return (
    <div className="flex-1">
      <Head>
        <title>Quiz</title>
      </Head>
    </div>
  )
}

export default QuizPage
