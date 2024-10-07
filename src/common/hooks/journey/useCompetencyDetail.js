import { useState } from 'react'
import { getCompetencyDetail } from 'store/service/journey'

const useCompetencyDetail = () => {
  const [competencyDetail, setCompetencyDetail] = useState(null)
  const fetchCompetencyDetail = async () => {
    const { isSuccess, data } = await getCompetencyDetail()
    if (isSuccess) {
      const result = []
      data?.companyCompetencyProficiencies?.forEach((element) => {
        const tmpKn = []
        const tmpAb = []
        const { companyCompetencyProficiencyKnowledges, level, name } = element
        const thisKnowledges = companyCompetencyProficiencyKnowledges?.filter(
          (el) => el?.level === level
        )
        thisKnowledges?.forEach((el) => {
          el?.metadata?.classifications?.forEach((thisClass) => {
            const { name, items } = thisClass
            if (name === 'knowledge') {
              tmpKn.push(...items)
            } else {
              tmpAb.push(...items)
            }
          })
        })
        result.push({
          name: name,
          level: level,
          knowledges: tmpKn,
          abilities: tmpAb
        })
      })
      setCompetencyDetail(result || [])
    } else {
      setCompetencyDetail([])
    }
  }
  return {
    competencyDetail,
    fetchCompetencyDetail
  }
}

export default useCompetencyDetail
