import React, { useEffect, useState } from 'react'
import StepAnalytic from 'common/presentation/StepAnalytic'
import { SETTING_TAB } from 'common/presentation/Pages/Jobs/contant'
import SearchCompany from 'common/presentation/Pages/Jobs/SearchCompany'
import SearchJob from 'common/presentation/Pages/Jobs/SearchJob'
import { useSelector } from 'react-redux'
import {
  getAllJobs,
  isMaxPage,
  selectAllJobs,
  selectIsMaxPage,
  updateFilter
} from 'store/app/jobSlice'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { selectUserProfile } from 'store/app/userSlice'
import { getAllCities, searchJobCompaniesQueries } from 'store/app/searchSlice'
import Head from 'next/head'
import { useRouter } from 'next/router'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'

const Jobs = (props) => {
  const profile = useSelector(selectUserProfile)
  const { ownedCompany, setting } = profile || {}
  const { characterId } = setting || {}
  const { companyId } = ownedCompany || {}
  const dispatch = useDispatch()
  const router = useRouter()
  const { query } = router
  const [choosedStepId, setChooseStepId] = useState(null)
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.JOB.GETALLCITIES) ||
      selectLoading(state, APP_TYPES.JOB.GETALLJOBS) ||
      selectLoading(state, APP_TYPES.JOB.LOADMOREJOB) ||
      selectLoading(state, APP_TYPES.JOB.GETALLCOMPANIES) ||
      selectLoading(state, APP_TYPES.JOB.LOADMORECOMPANY)
  )
  const handleChoose = async (id) => {
    await dispatch(updateFilter({ page: 1 }))
    await dispatch(searchJobCompaniesQueries({ page: 1 }))
    router.replace({
      query: {
        ...query,
        tabId: id
      }
    })
    // setChooseStepId(id)
  }

  useEffect(() => {
    dispatch(getAllCities())
    setChooseStepId(2)

    if (query?.tabId) {
      const multiTab = ['1', '2'] // tạo số tabId , sau này có thêm thì add thêm
      if (multiTab.includes(query?.tabId)) {
        setChooseStepId(parseInt(query?.tabId))
      } else {
        router.replace({
          query: {
            ...query,
            tabId: parseInt(multiTab[0]) // chọn tabId đầu tiên
          }
        })
      }
    }
  }, [dispatch, query?.tabId])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex-1">
        <Head>
          <title>Việc làm IT - X-Profile</title>
          <script
            dangerouslySetInnerHTML={{
              __html: `history.scrollRestoration = "manual"`
            }}
          />
        </Head>
        <div className="">
          <StepAnalytic
            SETTING_STEP={SETTING_TAB}
            handleChoose={handleChoose}
            choosedStepId={choosedStepId}
            styleEleText="sm:text-p18-bold text-p16"
            showIcon={true}
          />
          {choosedStepId === 1 && (
            <div className={` flex justify-center`}>
              <div className="w-full">
                <SearchJob
                  isAuthentication={profile !== null}
                  ownedCompany={
                    (!companyId && characterId === 2) || characterId === 2
                  }
                />
              </div>
            </div>
          )}
          {choosedStepId === 2 && (
            <div className={` flex justify-center`}>
              <div className="w-full">
                <SearchCompany />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

Jobs.propTypes = {}

export default Jobs
