import { configureStore } from '@reduxjs/toolkit'
import auth from './app/authSlice'
import course from './app/courseSlice'
import courseProductGuid from './app/courseProductGuidSlice'
import courseLearn from './app/courseLearnSlice'
import job from './app/jobSlice'
import search from './app/searchSlice'
import order from './app/orderSlice'
import survey from './app/surveySlice'
import theme from './ui/themeSlice'
import ui from './ui/loadingSlice'
import user from './app/userSlice'
import home from './app/homeSlice'
import company from './app/companySlice'
import department from './app/departmentSlice'
import departmentPosition from './app/departmentPositionSlice'
import portfolio from './app/portfolioSlice'
import careerPath from './app/careerPathSlice'
import campaign from './app/campaign'
import notification from './app/notification'
import { editMode } from './app/edit-mode-company'
import helper from './app/helperSlice'
import demoSlice from './app/demoSlice'
import examSlice from './app/examSlice'
import cvSlice from './app/cvSlice'
import landingSlice from './app/landingSlice'
import dashboardSlice from './app/dashboardSlice'
import technicalPortalSlice from './app/technicalPortalSlice'
import journey from './app/journeySlice'
import journeySkillsDatabase from './app/journeySkillsDatabase'

const middlewares = []

if (process.env.NODE_ENV === 'development') {
  const { createLogger } = require(`redux-logger`)
  const logger = createLogger({
    collapsed: (logEntry) => !logEntry.error
  })

  middlewares.push(logger)
}

export const store = configureStore({
  reducer: {
    auth: auth,
    course: course,
    courseLearn: courseLearn,
    courseProductGuid: courseProductGuid,
    job: job,
    search: search,
    order: order,
    survey: survey,
    theme: theme,
    ui: ui,
    user: user,
    home: home,
    company: company,
    department: department,
    departmentPosition: departmentPosition,
    portfolio: portfolio,
    careerPath: careerPath,
    campaign: campaign,
    notification: notification,
    editModeCompany: editMode,
    helper: helper,
    demo: demoSlice,
    exam: examSlice,
    cv: cvSlice,
    landing: landingSlice,
    dashboard: dashboardSlice,
    technicalPortal: technicalPortalSlice,
    journeySkillsDatabase: journeySkillsDatabase,
    journey: journey
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false
    }).concat(middlewares),
  devTools: process.env.NODE_ENV === 'development'
})
