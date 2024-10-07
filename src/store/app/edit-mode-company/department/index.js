import { combineReducers } from 'redux'
import bannerSlice from './bannerSlice'
import cloneSlice from './cloneSlice'
import introSlice from './introSlice'
import positionsDepartmentSlice from './positionsDepartmentSlice'
import reviewSlice from './reviewSlice'
import recruitmentListSlice from './recruitListSlice'

export const departmentCompanyEM = combineReducers({
  banner: bannerSlice,
  intro: introSlice,
  review: reviewSlice,
  positions: positionsDepartmentSlice,
  clone: cloneSlice,
  recruitmentList: recruitmentListSlice
})
