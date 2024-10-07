import axios from 'axios'
import { api } from 'common/config'

export const getCompetencyMatrix = async () => {
  try {
    const response = await axios.get(api.JOURNEY.GET_COMPETENCY_MATRIX)
    return response.data
  } catch (err) {
    return err
  }
}

export const getCompetencyDetail = async () => {
  try {
    const response = await axios.get(api.JOURNEY.GET_COMPETENCY_DETAIL)
    return response.data
  } catch (err) {
    return err
  }
}
