import LoadingRole from 'common/presentation/Loading/LoadingRole'
import SearchCV from 'common/presentation/Pages/cv-database/SearchCV'
import StepAnalytic from 'common/presentation/StepAnalytic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { selectUserProfile } from 'store/app/userSlice'
import { APP_TYPES } from 'store/types'
import { selectLoading } from 'store/ui/loadingSlice'

const CvDatabasePage = () => {
  const loading = useSelector(
    (state) =>
      selectLoading(state, APP_TYPES.CV.GETALLCV) ||
      selectLoading(state, APP_TYPES.CV.GETMORECV) ||
      selectLoading(state, APP_TYPES.CV.INVITETOCAMPAIGN)
  )
  const CV_TAB = [
    {
      id: 1,
      logoSVG: 'cv',
      // icon: '/images/bearBoss1.png',
      title: 'Kho CV',
      href: '#'
    }
    // {
    //   id: 2,
    //   logoSVG: 'cv',
    //   // icon: '/images/bearBoss1.png',
    //   title: 'Tab2',
    //   href: '#'
    // }
  ]
  const dispatch = useDispatch()
  const router = useRouter()
  const userProfile = useSelector(selectUserProfile)
  const { setting } = userProfile || {}
  const { characterId } = setting || {}
  const { query } = router
  const [choosedStepId, setChooseStepId] = useState(null)
  const handleChoose = async (id) => {
    router.replace({
      query: {
        ...query,
        tabId: id
      }
    })
    // setChooseStepId(id)
  }
  useEffect(() => {
    setChooseStepId(1)

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
  if (!userProfile || characterId !== 2) {
    return <></>
  }
  return (
    <div className="flex-1">
      <Head>
        <title>Kho CV</title>
      </Head>
      {loading && <LoadingRole />}
      <div className="">
        <StepAnalytic
          SETTING_STEP={CV_TAB}
          handleChoose={handleChoose}
          choosedStepId={choosedStepId}
          showIcon={true}
          styleEleText="sm:text-p16 text-p14"
        />
        {choosedStepId === 1 && (
          <div className={` flex justify-center`}>
            <div className="w-full">
              <SearchCV />
            </div>
          </div>
        )}
        {choosedStepId === 2 && (
          <div className={` flex justify-center`}>
            <div className="w-full">{/* <SearchCompany /> */}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CvDatabasePage
