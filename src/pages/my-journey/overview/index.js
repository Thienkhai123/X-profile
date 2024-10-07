import Head from 'next/head'
import { Fragment } from 'react'

const MyJourneyOverviewPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Hành trình của tôi - Overview</title>
      </Head>

      <div className="min-h-[100vh] relative flex flex-col md:py-[56px] py-6 xl:px-20 px-0  bg-white"></div>
    </Fragment>
  )
}

export default MyJourneyOverviewPage
