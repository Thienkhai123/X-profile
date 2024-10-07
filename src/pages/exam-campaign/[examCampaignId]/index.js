import { useSelector } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'
import { Fragment } from 'react'
import Head from 'next/head'
import ExamCampaignScreenStart from '../../../common/presentation/Pages/exam-campaign/ExamCampaignScreenStart'
import useExamCampaign from 'common/hooks/exam-campaign/useExamCampaign'

const ExamCampaignPage = () => {
  const userProfile = useSelector(selectUserProfile)
  const { name: userName } = userProfile || {}
  const { examCampaignDetail } = useExamCampaign()
  const handleClick = () => {
    window.location.assign(`/exam/${examCampaignDetail?.examGuid}`)
  }
  return (
    <Fragment>
      <Head>
        <title>Làm bài kiểm tra</title>
      </Head>

      <div className="flex-1 pb-[80px] bg-white sm:px-0 px-4">
        <div className="xl:max-w-[1039px] mx-auto pt-10">
          <ExamCampaignScreenStart
            userName={userName || '[UserName]'}
            examTitle={examCampaignDetail?.name || '[Tên_Kỳ_Thi]'}
            examCampaignDetail={examCampaignDetail}
            handleClick={handleClick}
          />
        </div>
      </div>
    </Fragment>
  )
}

export default ExamCampaignPage
