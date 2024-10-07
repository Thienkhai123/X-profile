import { data } from 'jquery'
import { getExamCampaignDetail } from '../../../store/service/exam-campaign'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import moment from 'moment'

const useExamCampaign = () => {
  const { query } = useRouter()
  const { examCampaignId } = query || {}
  const [examCampaignDetail, setExamCampaignDetail] = useState()
  const fetchExamCampaignDetail = async () => {
    const { data } = await getExamCampaignDetail({
      guid: examCampaignId
    })
    if (data) {
      const tmpStart = moment(data?.startAt)
      const tmpEnd = moment(data?.endAt)
      const tmpNow = moment(new Date())
      const canJoin = tmpStart?.isBefore(tmpNow) && tmpEnd?.isAfter(tmpNow)
      setExamCampaignDetail({
        ...data,
        start: tmpStart?.format('LLL'),
        end: tmpEnd?.format('LLL'),
        canJoin: canJoin
      })
    }
  }

  useEffect(() => {
    if (examCampaignId) {
      fetchExamCampaignDetail()
    }
  }, [])

  return {
    examCampaignDetail
  }
}

export default useExamCampaign
