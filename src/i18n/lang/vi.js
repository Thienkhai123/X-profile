const PROFILE_COMPANY = require('../../../public/asset/profile-company.vi.json')
const HEADER = require('../../../public/asset/header.vi.json')
const FOOTER = require('../../../public/asset/footer.vi.json')
const FOOTER_PROFILE = require('../../../public/asset/Footer_Profile.vi.json')
const ROLE = require('../../../public/asset/role.vi.json')
const SURVEY = require('../../../public/asset/survey.vi.json')
const APPLICANT_PROFILE = require('../../../public/asset/applicant_profile.vi.json')
const ACCOUNT_SETTING = require('../../../public/asset/account_Setting.vi.json')
const JOBS = require('../../../public/asset/jobs.vi.json')
const NOTIFICATION = require('../../../public/asset/notification.vi.json')
const MESSAGE = require('../../../public/asset/message.vi.json')
const DEPARTMENT_TEMPLATE = require('../../../public/asset/derpartmentTemplate.json')
const POSITION_TEMPLATE = require('../../../public/asset/positionTemplate.json')
const MY_JOURNEY = require('../../../public/asset/my_journey.vi.json')

const vi = {
  PROFILE_COMPANY: PROFILE_COMPANY,
  HEADER: HEADER,
  FOOTER: FOOTER,
  FOOTER_PROFILE: FOOTER_PROFILE,
  ROLE: ROLE,
  SURVEY: SURVEY,
  APPLICANT_PROFILE: APPLICANT_PROFILE,
  ACCOUNT_SETTING: ACCOUNT_SETTING,
  JOBS: JOBS,
  NOTIFICATION: NOTIFICATION,
  MESSAGE: MESSAGE,
  DEPARTMENT_TEMPLATE: DEPARTMENT_TEMPLATE,
  POSITION_TEMPLATE: POSITION_TEMPLATE,
  MY_JOURNEY: MY_JOURNEY,
  home: {
    title: 'Chào mừng tới Mio!',
    content: 'Bắt đầu một bài viết nào',
    noneProfileTitle: 'Bạn chưa có hồ sơ năng lực?',
    noneProfileDescription:
      'Hãy tạo hồ sơ của riêng bạn trên X-Profile để thể hiện đầy đủ năng lực của bản thân, đánh giá độ phù hợp với các vị trí ngành nghề hấp dẫn và gây ấn tượng với các nhà tuyển dụng uy tín.',
    noneProfileButton: 'Tạo hồ sơ',
    empty: {
      course: 'Chưa có khóa học phù hợp',
      orgs: 'Hiện chưa có thông tin công ty phù hợp',
      jobs: 'Hiện chưa có việc làm phù hợp'
    }
  },
  error: {
    survey: {
      emptySurvey: 'Vui lòng hoàn thành khảo sát để tiếp tục'
    }
  }
}

export default vi
