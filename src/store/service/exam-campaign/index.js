import axios from 'axios'
import { api } from 'common/config'

export const getExamCampaignDetail = async (params) => {
  try {
    const response = await axios.get(
      api.EXAM_CAMPAIGN.GET_EXAM_CAMPAIGN_DETAIL,
      {
        params: params
      }
    )
    return response.data
  } catch (err) {
    return err
  }
}
