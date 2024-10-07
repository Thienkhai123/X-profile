import { combineReducers } from 'redux'
import bannerSlice from './bannerSlice'
import softSkillSlice from './softSkillSlice'
import professionalSkillSlice from './professionalSkillSlice'
import roadmapSlice from './roadmapSlice'
import benefitsSlice from './benefitsSlice'
import jobDescriptionSlice from './jobDescriptionSlice'
import cloneSlice from './cloneSlice'

export const positionCompanyEM = combineReducers({
  banner: bannerSlice,
  softSkill: softSkillSlice,
  professionalSkill: professionalSkillSlice,
  roadmap: roadmapSlice,
  benefits: benefitsSlice,
  jobDescription: jobDescriptionSlice,
  clone: cloneSlice
})
