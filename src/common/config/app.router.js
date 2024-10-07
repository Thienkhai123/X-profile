import AuthLayout from 'layouts/AuthLayout'
import CompanyLayout from 'layouts/CompanyLayout'
import GuestLayout from 'layouts/GuestLayout'

const PAGE_CONFIG = {
  ROOT: {
    url: '/',
    layout: AuthLayout
  },
  HOME: {
    url: '/home',
    layout: AuthLayout
  },
  demo: {
    url: '/demo',
    layout: AuthLayout
  },
  demoDetail: {
    url: '/demo/[id]',
    layout: AuthLayout
  },
  DEMO_DND: {
    url: '/demo/dnd',
    layout: AuthLayout
  },
  EDMO_QUIZ: {
    url: '/demo/quiz/[quizId]',
    layout: AuthLayout
  },
  DEMO_QUIZ_RESULT: {
    url: '/demo/quiz/[quizId]/result',
    layout: AuthLayout
  },
  DEMO_QUIZ_INPROGRESS: {
    url: '/demo/quiz/[quizId]/in-progress',
    layout: AuthLayout
  },
  demoDesign: {
    url: '/demo/design',
    layout: AuthLayout
  },
  DEMO_NOTIFICATION: {
    url: '/demo/notification',
    layout: AuthLayout
  },
  DEMO_SUBDIRECTION: {
    url: '/demo/subdirection',
    layout: AuthLayout
  },
  DEMO_BASETABLE: {
    url: '/demo/base-table',
    layout: AuthLayout
  },
  // PROFILE_COMPANY: {
  //   url: '/profile-company',
  //   layout: AuthLayout
  // },
  PROFILE_COMPANY_DETAIL: {
    url: '/profile-company/[companyId]',
    layout: AuthLayout
  },
  PROFILE_COMPANY_DETAIL_EDIT: {
    url: '/profile-company/[companyId]/edit',
    layout: CompanyLayout
  },
  PROFILE_COMPANY_DEPARTMENT: {
    url: '/profile-company/[companyId]/[departmentId]',
    layout: AuthLayout
  },
  PROFILE_COMPANY_CREATE: {
    url: '/profile-company/[companyId]/department/create',
    layout: AuthLayout
  },
  PROFILE_COMPANY_EDIT: {
    url: '/profile-company/[companyId]/[departmentId]/edit',
    layout: CompanyLayout
  },
  PROFILE_COMPANY_POSITION: {
    url: '/profile-company/[companyId]/[departmentId]/[departmentPositionId]',
    layout: AuthLayout
  },
  PROFILE_COMPANY_POSITION_CREATE: {
    url: '/profile-company/[companyId]/[departmentId]/position/create',
    layout: AuthLayout
  },
  PROFILE_COMPANY_POSITION_EDIT: {
    url: '/profile-company/[companyId]/[departmentId]/[departmentPositionId]/edit',
    layout: CompanyLayout
  },
  CV_DATABASE: {
    url: '/cv-database',
    layout: AuthLayout
  },
  ORDER: {
    url: '/order',
    layout: AuthLayout
  },
  ABOUT_JOB: {
    url: '/about-job',
    layout: AuthLayout
  },
  // CAREER_PATH: {
  //   url: '/career-path/[categoryId]',
  //   layout: AuthLayout
  // },
  // CAREER_PATH_DETAIL: {
  //   url: '/career-path/[categoryId]/[id]',
  //   layout: AuthLayout
  // },
  ROLE: {
    url: '/role',
    layout: AuthLayout
  },
  DISCOVERY_COMPANY: {
    url: '/discovery-company',
    layout: AuthLayout
  },
  JOBS: {
    url: '/jobs',
    layout: AuthLayout
  },
  JOB_DETAIL: {
    url: '/job-detail',
    layout: AuthLayout
  },
  SURVEY: {
    url: '/survey',
    layout: AuthLayout
  },
  APPLY_JOB: {
    url: '/apply-job',
    layout: AuthLayout
  },
  RESULT_TEST: {
    url: '/result-test',
    layout: AuthLayout
  },
  APPLICANT_PROFILE: {
    url: '/applicant-profile',
    layout: AuthLayout
  },
  COURSE: {
    url: '/course',
    layout: AuthLayout
  },
  COURSE_CATEGORIES: {
    url: '/course/categories',
    layout: AuthLayout
  },
  COURSE_SEARCH: {
    url: '/course/search',
    layout: AuthLayout
  },
  COURSE_LIST: {
    url: '/course/list',
    layout: AuthLayout
  },
  COURSE_DETAIL: {
    url: '/course/learn/[courseId]',
    layout: AuthLayout
  },
  COURSE_PAY: {
    url: '/course/[productGuid]',
    layout: AuthLayout
  },
  PAYMENT: {
    url: '/course/[productGuid]/payment',
    layout: AuthLayout
  },
  PAYMENT_RESULT: {
    url: '/course/[productGuid]/result',
    layout: AuthLayout
  },
  EXAM: {
    url: '/exam/[examId]',
    layout: AuthLayout
  },
  EXAM_CAMPAIGN: {
    url: '/exam-campaign/[examCampaignId]',
    layout: AuthLayout
  },
  EXAM_QUIZ_RESULT: {
    url: '/exam/[examId]/result',
    layout: AuthLayout
  },
  EXAM_RESULT: {
    url: '/exam-result',
    layout: AuthLayout
  },
  ACCOUNT: {
    url: '/account',
    layout: AuthLayout
  },
  ACCOUNT_PERSONAL: {
    url: '/account-setting/personal-information',
    layout: AuthLayout
  },
  ACCOUNT_APPLICATION_HISTORY: {
    url: '/account-setting/applicationHistory',
    layout: AuthLayout
  },
  ACCOUNT_MYCOURSE: {
    url: '/account-setting/courses',
    layout: AuthLayout
  },
  ACCOUNT_STUDY_PROCESS: {
    url: '/account/study-process',
    layout: AuthLayout
  },
  ACCOUNT_FAVOURITE_LIBARY: {
    url: '/account/favourite-library',
    layout: AuthLayout
  },
  ACCOUNT_ACHIEVEMENT: {
    url: '/account/achievement',
    layout: AuthLayout
  },

  ACCOUNT_REWARD_POINT: {
    url: '/account/reward-point',
    layout: AuthLayout
  },
  COMMUNITY: {
    url: '/community',
    layout: AuthLayout
  },
  SIGN_IN: {
    url: '/sign-in',
    layout: GuestLayout
  },
  LINKEDIN: {
    url: '/linkedinn',
    layout: GuestLayout
  },
  SIGN_UP: {
    url: '/sign-up',
    layout: GuestLayout
  },
  FORGOT_PASSWORD: {
    url: '/forgot-password',
    layout: AuthLayout
  },
  LOGOUT: {
    url: '/logout',
    layout: GuestLayout
  },
  WELCOME: {
    url: '/welcome',
    layout: AuthLayout
  },

  ACCOUNT_SETTING_INFORMATION: {
    url: '/account-setting/information',
    layout: AuthLayout
  },
  ACCOUNT_SETTING_CHANGEPASSWORD: {
    url: '/account-setting/change-password',
    layout: AuthLayout
  },
  ACCOUNT_SETTING_JOBSAVESD: {
    url: '/account-setting/job-saved',
    layout: AuthLayout
  },
  LIST_QUIZ: {
    url: '/quiz',
    layout: AuthLayout
  },
  QUIZ: {
    url: '/quiz/[quizId]',
    layout: AuthLayout
  },
  QUIZ_RESULT: {
    url: '/quiz/[quizId]/result',
    layout: AuthLayout
  },
  QUIZ_INPROGRESS: {
    url: '/quiz/[quizId]/in-progress',
    layout: AuthLayout
  },
  DEVELOPMENT: {
    url: '/development',
    layout: AuthLayout
  },
  MAP_DEMO: {
    url: '/demo/map',
    layout: AuthLayout
  },
  MY_JOURNEY_UNDERSTAND_MYSELF: {
    url: '/my-journey/understand-myself',
    layout: AuthLayout
  },
  MY_JOURNEY_MY_SKILL: {
    url: '/my-journey/my-skill',
    layout: AuthLayout
  },
  MY_JOURNEY_SKILL_DATABASE: {
    url: '/my-journey/skill-database',
    layout: AuthLayout
  },
  MY_JOURNEY: {
    url: '/my-journey',
    layout: AuthLayout
  },
  MY_JOURNEY_OVERVIEW: {
    url: '/my-journey/overview',
    layout: AuthLayout
  },
  MY_JOURNEY_COMPETENCIES_MATRIX: {
    url: '/my-journey/competencies-matrix',
    layout: AuthLayout
  },
  MY_JOURNEY_SKILLS_HUB: {
    url: '/my-journey/skills-hub',
    layout: AuthLayout
  },
  MY_JOURNEY_TECHNICAL_PORTAL: {
    url: '/my-journey/technical-portal',
    layout: AuthLayout
  },
  MY_JOURNEY_PERFORMANCE_ENDORSE: {
    url: '/my-journey/performance-endorse',
    layout: AuthLayout
  },
  MY_JOURNEY_MY_COURSE: {
    url: '/my-journey/my-course',
    layout: AuthLayout
  },
  VNPAY_POLICY: {
    url: '/policy/chinh-sach-vnpay',
    layout: AuthLayout
  },
  TERMS_OF_USE: {
    url: '/policy/dieu-khoan-su-dung',
    layout: AuthLayout
  },
  PRIVACY_POLICY: {
    url: '/policy/chinh-sach-bao-mat',
    layout: AuthLayout
  },
  PAYMENT_POLICY: {
    url: '/policy/chinh-sach-thanh-toan',
    layout: AuthLayout
  },
  FAQS_PAGE: {
    url: '/policy/cau-hoi-thuong-gap',
    layout: AuthLayout
  }

  // CONFIRMATION: {
  //   url: '/confirmation',
  //   layout: AuthLayout
  // }
}

export default PAGE_CONFIG
