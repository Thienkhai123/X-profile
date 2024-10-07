export const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST
export const IS_SERVER = typeof window === 'undefined'
export const IS_CLIENT = typeof window !== 'undefined'
export const AUTH_ROUTES = ['/sign-in', '/sign-up']
export const GUEST_ROUTES = [
  '/role',
  '/survey',
  '/sign-in',
  '/sign-up',
  '/forgot-password',
  '/profile-company',
  '/profile-company/[companyId]',
  '/profile-company/[companyId]/[departmentId]',
  '/profile-company/[companyId]/[departmentId]/[departmentPositionId]',
  '/logout'
]
export const COMPANY_ROUTES = [
  '/profile-company/[companyId]',
  '/profile-company/[companyId]/[departmentId]',
  '/profile-company/[companyId]/[departmentId]/[departmentPositionId]'
]
export const USER_ROUTES = [
  '/applicant-profile',
  '/account-setting',
  '/account-setting/information',
  '/account-setting/change-password',
  '/account-setting/job-saved'
]
export const DEFAULT_AVATAR = '/images/default-avatar'

export const REGEX_HTML = /<\/?[a-z][\s\S]*>/i
export const REGEX_PHONE = /([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/
export const REGEX_EMAIL =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
export const REGEX_YOUTUBE_URL =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/
export const REGEX_URL =
  /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
export const REGEXSPECIAL = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

export const OS_LIST = {
  MAC_OS: 'Mac OS',
  IOS: 'IOS',
  WINDOWS: 'Windows',
  ANDROID: 'Android',
  LINUX: 'Linux'
}

export const TEMPLATE_OPTIONS_MAPPING = {
  Other: 'Trải nghiệm khác',
  UserSkillCommon: 'Kỹ năng chung',
  CareerTarget: 'Mục tiêu nghề nghiệp',
  UserExperience: 'Kinh nghiệm làm việc',
  UserAchievement: 'Bảng thành tích',
  UserSkill: 'Kỹ năng chuyên môn',
  UserCertificate: 'Chứng chỉ chuyên môn',
  UserEducation: 'Học vấn',
  UserLanguage: 'Ngôn ngữ'
}

export const ACCESS_TOKEN = 'ACCESS_TOKEN'
export const REFRESH_TOKEN = 'REFRESH_TOKEN'
export const ROLE_STORAGE = 'ROLE'
export const SURVEY_STORAGE = 'SURVEY_STORAGE'
export const POSITION_BLOCK = 'POSITION_BLOCK'
export const LOCALIZATION = 'LOCALIZATION'
export const PRODUCT_GUID = 'PRODUCT_GUID'
export const RECENT_SEARCH = 'RECENT_SEARCH'
export const LG_SCREEN = 1024
