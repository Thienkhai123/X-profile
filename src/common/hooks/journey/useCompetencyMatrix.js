import { useState } from 'react'
import { getCompetencyMatrix } from 'store/service/journey'

const useCompetencyMatrix = () => {
  const [competencyMatrix, setCompetencyMatrix] = useState(null)
  const fetchCompetencyMatrix = async () => {
    const { isSuccess, data } = await getCompetencyMatrix()
    if (isSuccess) {
      setCompetencyMatrix(data)
    } else {
      setCompetencyMatrix([])
    }
  }
  return {
    competencyMatrix,
    fetchCompetencyMatrix
  }
}

export default useCompetencyMatrix
