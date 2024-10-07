import { combineReducers } from 'redux'
import { profileCompanyEM } from './profile'
import { departmentCompanyEM } from './department'
import { positionCompanyEM } from './position'

export const editMode = combineReducers({
  company: profileCompanyEM,
  department: departmentCompanyEM,
  position: positionCompanyEM
})
