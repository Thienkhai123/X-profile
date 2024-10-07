const PROFILE_COMPANY = require('../../../public/asset/profile-company.en.json')
const HEADER = require('../../../public/asset/header.en.json')
const FOOTER = require('../../../public/asset/footer.en.json')
const FOOTER_PROFILE = require('../../../public/asset/Footer_Profile.en.json')
const ROLE = require('../../../public/asset/role.en.json')
const SURVEY = require('../../../public/asset/survey.en.json')
const APPLICANT_PROFILE = require('../../../public/asset/applicant_profile.en.json')
const JOBS = require('../../../public/asset/jobs.en.json')
const NOTIFICATION = require('../../../public/asset/notification.en.json')
const MESSAGE = require('../../../public/asset/message.en.json')

const en = {
  PROFILE_COMPANY: PROFILE_COMPANY,
  HEADER: HEADER,
  FOOTER: FOOTER,
  FOOTER_PROFILE: FOOTER_PROFILE,
  ROLE: ROLE,
  SURVEY: SURVEY,
  APPLICANT_PROFILE: APPLICANT_PROFILE,
  JOBS: JOBS,
  NOTIFICATION: NOTIFICATION,
  MESSAGE: MESSAGE,
  home: {
    title: 'Welcome to Mio!',
    content: 'Getting started by writting a post',
    noneProfileTitle: 'Bạn chưa có hồ sơ năng lực?',
    noneProfileDescription:
      'Hãy tạo hồ sơ của riêng bạn trên X-Profile để thể hiện đầy đủ năng lực của bản thân, đánh giá độ phù hợp với các vị trí ngành nghề hấp dẫn và gây ấn tượng với các nhà tuyển dụng uy tín.',
    noneProfileButton: 'Tạo hồ sơ ngay',
    empty: {
      course: 'No course found',
      orgs: 'No company found',
      jobs: 'No job found'
    }
  },
  error: {
    survey: {
      emptySurvey: 'Please complete survey to continue'
    }
  }
}

export default en
