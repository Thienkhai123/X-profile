import Head from 'next/head'
// import { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import {
//   getJobByJobCategory,
//   getJobCategory,
//   selectJobCategories,
//   selectJobDetail
// } from 'store/app/jobSlice'

const AccountPage = () => {
  // const dispatch = useDispatch()
  // const jobCategories = useSelector(selectJobCategories)
  // const jobDetail = useSelector(selectJobDetail)
  // console.log(jobCategories)
  // console.log(jobDetail)
  // useEffect(() => {
  //   dispatch(getJobCategory())
  //   dispatch(getJobByJobCategory({ id: 1 }))
  // }, [dispatch])
  return (
    <div>
      <Head>
        <title>Tài khoản của tôi</title>
      </Head>
    </div>
  )
}

export default AccountPage
