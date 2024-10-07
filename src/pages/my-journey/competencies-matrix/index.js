import { Fragment, useEffect } from 'react'
import Head from 'next/head'
import useTrans from 'common/hooks/useTrans'
import AccordionDocument from 'common/presentation/Pages/my-journey/AccordionDocument'
import BannerRadarChart from 'common/presentation/Pages/my-journey/BannerRadaChart'
import MyJourneySideBanner from 'common/presentation/Pages/my-journey/MyJourneySideBanner'
import MyJourneySideMenu from 'common/presentation/Pages/my-journey/MyJourneySideMenu'
import SkeletonBox from 'common/presentation/Skeleton/SkeletonBox'
import useCompetencyMatrix from 'common/hooks/journey/useCompetencyMatrix'
import useCompetencyDetail from 'common/hooks/journey/useCompetencyDetail'

const FAKE_LIST = [
  {
    name: 'Increase Matching Rate'
  },
  {
    name: 'Upgrade Skills'
  },
  {
    name: 'Performance Goals'
  },
  {
    name: 'Careers of Interest'
  }
]

const WrapperBannerRadarChart = () => {
  const { competencyMatrix, fetchCompetencyMatrix } = useCompetencyMatrix()
  useEffect(() => {
    fetchCompetencyMatrix()
  }, [])

  return (
    <Fragment>
      {competencyMatrix === null && (
        <div className="w-full xl:px-[70px] mb-14 xl:h-[480px]">
          <SkeletonBox width="w-full" height="h-full" />
        </div>
      )}
      {competencyMatrix !== null && competencyMatrix?.length === 0 && (
        <p className="text-center text-h5 mb-10 text-red-500">
          Bạn chưa là nhân viên của doanh nghiệp
        </p>
      )}
      {competencyMatrix !== null && competencyMatrix?.length > 0 && (
        <div className="w-full xl:px-[70px] mb-14 xl:h-[480px]">
          <BannerRadarChart competencyMatrix={competencyMatrix} />
        </div>
      )}
    </Fragment>
  )
}

const WrapperAccordionDocument = () => {
  const { competencyDetail, fetchCompetencyDetail } = useCompetencyDetail()
  useEffect(() => {
    fetchCompetencyDetail()
  }, [])

  return (
    <Fragment>
      {competencyDetail === null && <SkeletonBox width="w-full" />}
      {competencyDetail !== null && competencyDetail?.length === 0 && (
        <p className="text-center text-h5 mb-10 text-red-500">
          Chưa có tài liệu phù hợp
        </p>
      )}
      {competencyDetail !== null && competencyDetail?.length > 0 && (
        <div className="flex flex-col gap-6">
          {competencyDetail?.map((cmd, index) => {
            return <AccordionDocument key={`cmd-${index}`} {...cmd} />
          })}
        </div>
      )}
    </Fragment>
  )
}

const MyJourneyCompetenciesMatrixPage = () => {
  const trans = useTrans()
  const { MY_JOURNEY } = trans

  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - My Competencies Matrix</title>
      </Head>

      <div className="min-h-[100vh] relative flex flex-col md:py-[56px] py-6 bg-white xl:px-1">
        <div className="flex-1 xl:w-[1280px] xl:mx-auto">
          <p className="md:text-h3 text-p16-bold text-neutral text-center mb-5">
            My Competencies Matrix
          </p>
          <div className="hidden xl:block">
            <WrapperBannerRadarChart />
          </div>

          <div className="xl:flex flex-row gap-8">
            <div className="xl:w-[280px] w-full">
              <MyJourneySideMenu actionList={MY_JOURNEY?.journeyActionNew} />
            </div>

            <div className="flex-1">
              <WrapperAccordionDocument />
            </div>

            <div className="xl:w-[279px] xl:block hidden">
              <MyJourneySideBanner
                title="Set your career goals now!"
                listSuggest={FAKE_LIST}
              />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  )
}

export default MyJourneyCompetenciesMatrixPage
