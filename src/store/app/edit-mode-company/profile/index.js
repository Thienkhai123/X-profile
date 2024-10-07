import { combineReducers } from 'redux'
import bannerSlice from './bannerSlice'
import DemandSkillsSlice from './demandSkillsSlice'
import informationSlice from './informationSlice'
import QuestionsSlice from './questionsSlice'
import recruitListSlice from './recruitListSlice'
import staticsSlice from './staticsSlice'
import teamListSlice from './teamListSlice'
import workDaySlice from './workDaySlice'
import thumbSlice from './thumbSlice'
import internalCourse from './internalCourseSlice'
import footerSlice from './footerSlice'

export const profileCompanyEM = combineReducers({
  banner: bannerSlice,
  footer: footerSlice,
  workDay: workDaySlice,
  demandSkills: DemandSkillsSlice,
  information: informationSlice,
  questions: QuestionsSlice,
  recruitList: recruitListSlice,
  statics: staticsSlice,
  teamList: teamListSlice,
  thumb: thumbSlice,
  internalCourse: internalCourse
})
