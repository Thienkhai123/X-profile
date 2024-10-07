import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { getJobDetail, getJobByTag } from './jobSlice'

export const getTopCompanies = createAsyncThunk(
  APP_TYPES.CAREERPATH.GETTOPCOMPANIES,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId } = params
      const response = await axios.get(api.CAREERPATH.GET_TOP_COMPANIES, {
        params: { jobId: jobId }
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getTopCompaniesByTag = createAsyncThunk(
  APP_TYPES.CAREERPATH.GETTOPCOMPANIESBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params
      const response = await axios.get(
        `${api.CAREERPATH.GET_TOP_JOB_COMPANY_BY_TAG}/${tag}`
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const careerPath = createSlice({
  name: 'careerPath',
  initialState: {
    positionsCareer: {
      BA: {
        JC_BA: {
          x: 63.8,
          y: 35.9,
          w: 6.3,
          h: 6.1,
          url: '/images/BA/BA.png',
          id: 1
        },
        J_BA: {
          x: 56.4,
          y: 31.7,
          w: 4.4,
          h: 4.4,
          url: '/images/BA/BA2.png',
          id: 1
        },
        J_JUNIOR: {
          x: 61.8,
          y: 32.5,
          w: 4,
          h: 3.2,
          url: '/images/BA/BA Junior.png',
          id: 1
        },
        J_SENIOR: {
          x: 49.9,
          y: 31.7,
          w: 4.4,
          h: 4.4,
          url: '/images/BA/BA Senior.png'
        },
        'Management Consultant': {
          x: 56.3,
          y: 37.6,
          w: 4.4,
          h: 4.4,
          url: '/images/BA/Management Consultant.png'
        }
      },
      DEV: {
        JC_DEV: {
          x: 14.9,
          y: 19.1,
          w: 6.3,
          h: 6.1,
          url: '/images/DEV/DEV.png',
          id: 1
        },
        J_JUNIOR: {
          x: 27.7,
          y: 21.5,
          w: 4,
          h: 3.2,
          url: '/images/DEV/Junior Developer.png',
          id: 1
        },
        J_SENIOR: {
          x: 27.7,
          y: 17.5,
          w: 4,
          h: 3.2,
          url: '/images/DEV/Senior Developer.png',
          id: 1
        },
        J_ARCHITECH: {
          x: 27.4,
          y: 12.6,
          w: 4.4,
          h: 4.4,
          url: '/images/DEV/Architect.png',
          id: 1
        },
        J_TECHLEAD: {
          x: 19.7,
          y: 12.6,
          w: 4.4,
          h: 4.4,
          url: '/images/DEV/TechLead.png',
          id: 1
        },
        J_PRODUCTMANAGER: {
          x: 20.8,
          y: 19.9,
          w: 5.2,
          h: 4.07,
          url: '/images/DEV/Product Manager.png',
          id: 1
        }
      },
      UI_UX: {
        JC_UIUX_DESIGN: {
          x: 29,
          y: 36,
          w: 6.3,
          h: 6.1,
          url: '/images/UI_UX/UIUX DESIGN.png',
          id: 1
        },
        J_UX_WRITTER: {
          x: 23.7,
          y: 33,
          w: 4.4,
          h: 4.4,
          url: '/images/UI_UX/UX Writer.png',
          id: 1
        },
        J_UX_UI_TEAMLEADER: {
          x: 15.7,
          y: 33,
          w: 4.4,
          h: 4.4,
          url: '/images/UI_UX/UIUX TeamLeader.png',
          id: 1
        },
        J_JUNIOR: {
          x: 24,
          y: 38.9,
          w: 4,
          h: 3.2,
          url: '/images/UI_UX/UIUX Junior.png',
          id: 1
        },
        J_SENIOR: {
          x: 15.85,
          y: 38.9,
          w: 4,
          h: 3.2,
          url: '/images/UI_UX/UIUX Senior.png',
          id: 1
        }
      },
      TESTER: {
        JC_TESTER: {
          x: 45.5,
          y: 12.7,
          w: 6.3,
          h: 6.1,
          url: '/images/TESTER/TESTER.png',
          id: 1
        },
        J_FRESHER_TESTER: {
          x: 52,
          y: 12.8,
          w: 4,
          h: 3.2,
          url: '/images/TESTER/Fresher Tester.png',
          id: 1
        },
        J_JUNIOR_TESTER: {
          x: 61.2,
          y: 12.8,
          w: 4,
          h: 3.2,
          url: '/images/TESTER/Junior Tester.png',
          id: 1
        },
        J_TEST_LEAD: {
          x: 60.9,
          y: 16.7,
          w: 4.4,
          h: 4.4,
          url: '/images/TESTER/Senior Tester.png',
          id: 1
        },
        J_SENIOR: {
          x: 54.5,
          y: 16.7,
          w: 4.4,
          h: 4.4,
          url: '/images/TESTER/TestLead.png',
          id: 1
        },
        J_TEST_MANAGER: {
          x: 48.1,
          y: 20.5,
          w: 5.02,
          h: 4.07,
          url: '/images/DEV/Product Manager.png',
          id: 1
        }
      },
      GENERAL: {
        JC_CTO: {
          x: 39.5,
          y: 21.5,
          w: 6.5,
          h: 5.1,
          url: '/images/GENERAL/CTO.png',
          id: 1
        },
        JC_PO: {
          x: 34,
          y: 27.2,
          w: 6.5,
          h: 5.1,
          url: '/images/GENERAL/PO.png',
          id: 1
        },
        JC_PROJECT_MANAGER: {
          x: 40,
          y: 31.4,
          w: 6.5,
          h: 5.1,
          url: '/images/GENERAL/Project Manager.png',
          id: 1
        },
        JC_SYSTEM_ADMIN: {
          x: 11,
          y: 9,
          w: 4.4,
          h: 4.4,
          url: '/images/GENERAL/SYSTEM ADMIN.png',
          id: 1
        }
      }
    },
    suitables: [
      {
        title: 'Niềm đam mê công nghệ',
        shortDescription:
          'Bạn kiên nhẫn và không cảm thấy chán nản hay ngại khó khi phải ngồi hàng giờ liền trước máy tính để nghiên cứu về công nghệ và viết một phần mềm, ứng dụng,....',
        avatar: '/images/career_path/favourite.png'
      },
      {
        title: 'Thông minh và có óc sáng tạo',
        shortDescription:
          'Bạn có thể phân tích vấn đề nhanh chóng, tối ưu hóa một giải thuật hay sáng tạo những giải pháp hữu hiệu để giảm thiểu thời gian viết mã và mang lại hiệu quả tốt.',
        avatar: '/images/career_path/idea.png'
      },
      {
        title: 'Sự chính xác trong công việc',
        shortDescription:
          'Nếu bạn là người có đầu óc tổ chức và tư duy hệ thống, có thể sắp xếp mọi thứ theo cấu trúc và quy trình tuần tự, bạn có tiềm năng để trở thành người trong ngành đấy.',
        avatar: '/images/career_path/tool.png'
      }
    ],
    careerMap: {
      BA: [
        {
          id: 1,
          x: 0.7969,
          y: 0.765,
          w: 0.077,
          h: 0.1386,
          name: 'BA',
          imgUrl: '/images/BA/BA.png',
          highlightImgUrl: '/images/BA/BA_light.png',
          tag: 'ba'
        },
        {
          id: 1,
          x: 0.71,
          y: 0.68,
          w: 0.054,
          h: 0.09,
          name: 'Business Analyst',
          imgUrl: '/images/BA/BA2.png',
          highlightImgUrl: '/images/BA/BA2_light.png',
          tag: 'ba'
        },
        {
          id: 1,
          x: 0.625,
          y: 0.68,
          w: 0.054,
          h: 0.09,
          name: 'BA Senior',
          imgUrl: '/images/BA/BA Senior.png',
          highlightImgUrl: '/images/BA/BA Senior_light.png',
          tag: 'ba'
        },
        {
          id: 1,
          x: 0.71,
          y: 0.81,
          w: 0.066,
          h: 0.088,
          name: 'Management Consultant',
          imgUrl: '/images/BA/Management Consultant.png',
          highlightImgUrl: '/images/BA/Management Consultant_light.png',
          tag: 'ba'
        },
        {
          id: 1,
          x: 0.773,
          y: 0.697,
          w: 0.052,
          h: 0.069,
          name: 'BA Junior',
          imgUrl: '/images/BA/BA Junior.png',
          highlightImgUrl: '/images/BA/BA Junior_light.png',
          tag: 'ba'
        }
      ],
      UXUI: [
        {
          id: 1,
          x: 0.362,
          y: 0.762,
          w: 0.07347,
          h: 0.14,
          name: 'UIUX',
          imgUrl: '/images/UI_UX/UIUX DESIGN.png',
          highlightImgUrl: '/images/UI_UX/UIUX DESIGN_light.png',
          tag: 'uiux'
        },
        {
          id: 1,
          x: 0.198,
          y: 0.709,
          w: 0.054,
          h: 0.09,
          name: 'UIUX TeamLeader',
          imgUrl: '/images/UI_UX/UIUX TeamLeader.png',
          highlightImgUrl: '/images/UI_UX/UIUX TeamLeader_light.png',
          tag: 'uiux'
        },
        {
          id: 1,
          x: 0.3,
          y: 0.709,
          w: 0.054,
          h: 0.09,
          name: 'UX Writer',
          imgUrl: '/images/UI_UX/UX Writer.png',
          highlightImgUrl: '/images/UI_UX/UX Writer_light.png',
          tag: 'uiux'
        },
        {
          id: 1,
          x: 0.3,
          y: 0.837,
          w: 0.052,
          h: 0.069,
          name: 'UIUX Junior',
          imgUrl: '/images/UI_UX/UIUX Junior.png',
          highlightImgUrl: '/images/UI_UX/UIUX Junior_light.png',
          tag: 'uiux'
        },
        {
          id: 1,
          x: 0.195,
          y: 0.837,
          w: 0.054,
          h: 0.09,
          name: 'UIUX Senior',
          imgUrl: '/images/UI_UX/UIUX Senior.png',
          highlightImgUrl: '/images/UI_UX/UIUX Senior_light.png',
          tag: 'uiux'
        }
      ],
      DEV: [
        {
          id: 0,
          x: 0.19,
          y: 0.405,
          w: 0.0765,
          h: 0.14,
          name: 'DEV',
          imgUrl: '/images/DEV/DEV.png',
          highlightImgUrl: '/images/DEV/DEV_light.png',
          tag: 'dev'
        },
        {
          id: 41,
          x: 0.246,
          y: 0.277,
          w: 0.054,
          h: 0.09,
          name: 'TechLead',
          imgUrl: '/images/DEV/TechLead.png',
          highlightImgUrl: '/images/DEV/TechLead_light.png',
          tag: 'dev'
        },
        {
          id: 40,
          x: 0.342,
          y: 0.277,
          w: 0.054,
          h: 0.09,
          name: 'Architect',
          imgUrl: '/images/DEV/Architect.png',
          highlightImgUrl: '/images/DEV/Architect_light.png',
          tag: 'dev'
        },
        {
          id: 38,
          x: 0.344,
          y: 0.46,
          w: 0.052,
          h: 0.069,
          name: 'Junior Developer',
          imgUrl: '/images/DEV/Junior Developer.png',
          highlightImgUrl: '/images/DEV/Junior Developer_light.png',
          tag: 'dev'
        },
        {
          id: 39,
          x: 0.344,
          y: 0.37,
          w: 0.054,
          h: 0.09,
          name: 'Senior Developer',
          imgUrl: '/images/DEV/Senior Developer.png',
          highlightImgUrl: '/images/DEV/Senior Developer_light.png',
          tag: 'dev'
        },
        {
          id: 42,
          x: 0.26,
          y: 0.428,
          w: 0.066,
          h: 0.088,
          name: 'Product Manager',
          imgUrl: '/images/DEV/Product Manager.png',
          highlightImgUrl: '/images/DEV/Product Manager_light.png',
          tag: 'dev'
        },
        {
          id: 43,
          x: 0.137,
          y: 0.192,
          w: 0.054,
          h: 0.09,
          name: 'SYSTEM ADMIN',
          imgUrl: '/images/GENERAL/SYSTEM ADMIN.png',
          highlightImgUrl: '/images/GENERAL/SYSTEM ADMIN_light.png',
          tag: ''
        }
      ],
      TESTER: [
        {
          id: 1,
          x: 0.57,
          y: 0.275,
          w: 0.07347,
          h: 0.14,
          name: 'TESTER',
          imgUrl: '/images/TESTER/TESTER.png',
          highlightImgUrl: '/images/TESTER/TESTER_light.png',
          tag: 'tester'
        },
        {
          id: 1,
          x: 0.6835,
          y: 0.36,
          w: 0.054,
          h: 0.09,
          name: 'TestLead',
          imgUrl: '/images/TESTER/TestLead.png',
          highlightImgUrl: '/images/TESTER/TestLead_light.png',
          tag: 'tester'
        },
        {
          id: 1,
          x: 0.76,
          y: 0.36,
          w: 0.054,
          h: 0.09,
          name: 'Senior Tester',
          imgUrl: '/images/TESTER/Senior Tester.png',
          highlightImgUrl: '/images/TESTER/Senior Tester_light.png',
          tag: 'tester'
        },
        {
          id: 1,
          x: 0.649,
          y: 0.273,
          w: 0.052,
          h: 0.069,
          name: 'Fresher Tester',
          imgUrl: '/images/TESTER/Fresher Tester.png',
          highlightImgUrl: '/images/TESTER/Fresher Tester_light.png',
          tag: 'tester'
        },
        {
          id: 1,
          x: 0.763,
          y: 0.273,
          w: 0.052,
          h: 0.069,
          name: 'Junior Tester',
          imgUrl: '/images/TESTER/Junior Tester.png',
          highlightImgUrl: '/images/TESTER/Junior Tester_light.png',
          tag: 'tester'
        },
        {
          id: 1,
          x: 0.602,
          y: 0.44,
          w: 0.066,
          h: 0.088,
          name: 'Test Manager',
          imgUrl: '/images/TESTER/Test Manager.png',
          highlightImgUrl: '/images/TESTER/Test Manager_light.png',
          tag: 'tester'
        }
      ],
      GENERAL: [
        {
          id: 1,
          x: 0.494,
          y: 0.463,
          w: 0.0765,
          h: 0.1,
          name: 'CTO',
          imgUrl: '/images/GENERAL/CTO.png',
          highlightImgUrl: '/images/GENERAL/CTO_light.png'
        },
        {
          id: 1,
          x: 0.43,
          y: 0.59,
          w: 0.0765,
          h: 0.1,
          name: 'PO',
          imgUrl: '/images/GENERAL/PO.png',
          highlightImgUrl: '/images/GENERAL/PO_light.png'
        },
        {
          id: 1,
          x: 0.5,
          y: 0.69,
          w: 0.0765,
          h: 0.1,
          name: 'Project Manager',
          imgUrl: '/images/GENERAL/Project Manager.png',
          highlightImgUrl: '/images/GENERAL/Project Manager_light.png'
        }
      ]
    },
    careerMapJobs: {
      3: {
        background: '/images/BA/BA_background.png',
        name: 'BA',
        width: 0.5,
        height: 0.338,
        levels: [
          {
            id: 0,
            x: 0.7484,
            y: 0.3427,
            w: 0.2645,
            h: 0.41,
            name: 'BA',
            imgUrl: '/images/BA/BA.png',
            highlightImgUrl: '/images/BA/BA_light.png',
            tag: 'ba'
          },
          {
            id: 7,
            x: 0.42,
            y: 0.0877,
            w: 0.1789,
            h: 0.276,
            name: 'Business Analyst',
            imgUrl: '/images/BA/BA2.png',
            highlightImgUrl: '/images/BA/BA2_light.png',
            tag: 'ba'
          },
          {
            id: 9,
            x: 0.14,
            y: 0.0877,
            w: 0.1789,
            h: 0.276,
            name: 'BA Senior',
            imgUrl: '/images/BA/BA Senior.png',
            highlightImgUrl: '/images/BA/BA Senior_light.png',
            tag: 'ba'
          },
          {
            id: 44,
            x: 0.398,
            y: 0.4546,
            w: 0.2645,
            h: 0.3,
            name: 'Management Consultant',
            imgUrl: '/images/BA/Management Consultant.png',
            highlightImgUrl: '/images/BA/Management Consultant_light.png',
            tag: 'ba'
          },
          {
            id: 8,
            x: 0.644,
            y: 0.129,
            w: 0.1857,
            h: 0.22,
            name: 'BA Junior',
            imgUrl: '/images/BA/BA Junior.png',
            highlightImgUrl: '/images/BA/BA Junior_light.png',
            tag: 'ba'
          }
        ]
      },
      14: {
        background: '/images/UI_UX/UIUX_background.png',
        name: 'UIUX',
        width: 0.5,
        height: 0.2596385,
        levels: [
          {
            id: 0,
            x: 0.777,
            y: 0.2436,
            w: 0.225,
            h: 0.47,
            name: 'UIUX',
            imgUrl: '/images/UI_UX/UIUX DESIGN.png',
            highlightImgUrl: '/images/UI_UX/UIUX DESIGN_light.png',
            tag: 'uiux'
          },
          {
            id: 45,
            x: 0.271,
            y: 0.05,
            w: 0.1645,
            h: 0.318,
            name: 'UIUX TeamLeader',
            imgUrl: '/images/UI_UX/UIUX TeamLeader.png',
            highlightImgUrl: '/images/UI_UX/UIUX TeamLeader_light.png',
            tag: 'uiux'
          },
          {
            id: 48,
            x: 0.584,
            y: 0.05,
            w: 0.1645,
            h: 0.318,
            name: 'UX Writer',
            imgUrl: '/images/UI_UX/UX Writer.png',
            highlightImgUrl: '/images/UI_UX/UX Writer_light.png',
            tag: 'uiux'
          },
          {
            id: 47,
            x: 0.5837,
            y: 0.487,
            w: 0.16144,
            h: 0.2378,
            name: 'UIUX Junior',
            imgUrl: '/images/UI_UX/UIUX Junior.png',
            highlightImgUrl: '/images/UI_UX/UIUX Junior_light.png',
            tag: 'uiux'
          },
          {
            id: 46,
            x: 0.271,
            y: 0.422,
            w: 0.1645,
            h: 0.318,
            name: 'UIUX Senior',
            imgUrl: '/images/UI_UX/UIUX Senior.png',
            highlightImgUrl: '/images/UI_UX/UIUX Senior_light.png',
            tag: 'uiux'
          }
        ]
      },
      12: {
        background: '/images/TESTER/TESTER_background.png',
        name: 'TESTER',
        width: 0.5,
        height: 0.338,
        levels: [
          {
            id: 0,
            x: 0.02536,
            y: 0.007,
            w: 0.267,
            h: 0.412,
            name: 'TESTER',
            imgUrl: '/images/TESTER/TESTER.png',
            highlightImgUrl: '/images/TESTER/TESTER_light.png',
            tag: 'tester'
          },
          {
            id: 49,
            x: 0.39,
            y: 0.275,
            w: 0.187,
            h: 0.2785,
            name: 'TestLead',
            imgUrl: '/images/TESTER/TestLead.png',
            highlightImgUrl: '/images/TESTER/TestLead_light.png',
            tag: 'tester'
          },
          {
            id: 37,
            x: 0.6648,
            y: 0.275,
            w: 0.187,
            h: 0.2785,
            name: 'Senior Tester',
            imgUrl: '/images/TESTER/Senior Tester.png',
            highlightImgUrl: '/images/TESTER/Senior Tester_light.png',
            tag: 'tester'
          },
          {
            id: 35,
            x: 0.28,
            y: 0.004,
            w: 0.1837,
            h: 0.21,
            name: 'Fresher Tester',
            imgUrl: '/images/TESTER/Fresher Tester.png',
            highlightImgUrl: '/images/TESTER/Fresher Tester_light.png',
            tag: 'tester'
          },
          {
            id: 36,
            x: 0.67,
            y: 0.004,
            w: 0.1837,
            h: 0.21,
            name: 'Junior Tester',
            imgUrl: '/images/TESTER/Junior Tester.png',
            highlightImgUrl: '/images/TESTER/Junior Tester_light.png',
            tag: 'tester'
          },
          {
            id: 50,
            x: 0.113,
            y: 0.51,
            w: 0.2248,
            h: 0.26,
            name: 'Test Manager',
            imgUrl: '/images/TESTER/Test Manager.png',
            highlightImgUrl: '/images/TESTER/Test Manager_light.png',
            tag: 'tester'
          }
        ]
      },
      13: {
        background: '/images/DEV/DEV_background.png',
        name: 'DEV',
        width: 0.5,
        height: 0.367895,
        levels: [
          {
            id: 0,
            x: 0.246,
            y: 0.531,
            w: 0.22847,
            h: 0.33245,
            name: 'DEV',
            imgUrl: '/images/DEV/DEV.png',
            highlightImgUrl: '/images/DEV/DEV_light.png',
            tag: 'dev'
          },
          {
            id: 41,
            x: 0.411,
            y: 0.209,
            w: 0.16,
            h: 0.218,
            name: 'TechLead',
            imgUrl: '/images/DEV/TechLead.png',
            highlightImgUrl: '/images/DEV/TechLead_light.png',
            tag: 'dev'
          },
          {
            id: 40,
            x: 0.67,
            y: 0.209,
            w: 0.16,
            h: 0.218,
            name: 'Architect',
            imgUrl: '/images/DEV/Architect.png',
            highlightImgUrl: '/images/DEV/Architect_light.png',
            tag: 'dev'
          },
          {
            id: 38,
            x: 0.7,
            y: 0.6544,
            w: 0.157,
            h: 0.164,
            name: 'Junior Developer',
            imgUrl: '/images/DEV/Junior Developer.png',
            highlightImgUrl: '/images/DEV/Junior Developer_light.png',
            tag: 'dev'
          },
          {
            id: 39,
            x: 0.67,
            y: 0.4,
            w: 0.16,
            h: 0.218,
            name: 'Senior Developer',
            imgUrl: '/images/DEV/Senior Developer.png',
            highlightImgUrl: '/images/DEV/Senior Developer_light.png',
            tag: 'dev'
          },
          {
            id: 42,
            x: 0.45,
            y: 0.572,
            w: 0.192,
            h: 0.2,
            name: 'Product Manager',
            imgUrl: '/images/DEV/Product Manager.png',
            highlightImgUrl: '/images/DEV/Product Manager_light.png',
            tag: 'dev'
          },
          {
            id: 43,
            x: 0.0937,
            y: 0.012,
            w: 0.16,
            h: 0.218,
            name: 'SYSTEM ADMIN',
            imgUrl: '/images/GENERAL/SYSTEM ADMIN.png',
            highlightImgUrl: '/images/GENERAL/SYSTEM ADMIN_light.png',
            tag: ''
          }
        ]
      }
    },
    topCompanies: [],
    topCompaniesByTag: [],
    roleId: 0,
    levelId: 0,
    showMoreLevel: false,
    jobDetail: {},
    jobDetailByTag: {}
  },
  reducers: {
    updateRoleId(state, action) {
      return { ...state, roleId: action.payload }
    },
    updateLevelId(state, action) {
      return { ...state, levelId: action.payload }
    },
    updateShowMoreLevel(state, action) {
      return { ...state, showMoreLevel: action.payload }
    }
  },
  extraReducers: {
    [getTopCompanies.fulfilled]: (state, action) => {
      return {
        ...state,
        topCompanies: action.payload.data
      }
    },
    [getTopCompanies.rejected]: (state) => {
      return state
    },
    [getTopCompaniesByTag.fulfilled]: (state, action) => {
      return {
        ...state,
        topCompaniesByTag: action.payload.data
      }
    },
    [getTopCompaniesByTag.rejected]: (state) => {
      return state
    },
    [getJobDetail.fulfilled]: (state, action) => {
      const jobLevels = action.payload.data?.jobLevels || []
      return {
        ...state,
        jobDetail: action.payload.data,
        levelId:
          jobLevels?.length > 0
            ? jobLevels[0]?.meta?.tag || jobLevels[0]?.jobLevelId
            : 0
      }
    },
    [getJobDetail.rejected]: (state) => {
      return {
        ...state,
        jobDetail: null
      }
    },
    [getJobByTag.fulfilled]: (state, action) => {
      const jobLevels = action.payload.data?.jobLevels || []
      return {
        ...state,
        jobDetailByTag: action.payload.data,
        levelId:
          jobLevels?.length > 0
            ? jobLevels[0]?.meta?.tag || jobLevels[0]?.jobLevelId
            : 0
      }
    },
    [getJobByTag.rejected]: (state) => {
      return {
        ...state,
        jobDetailByTag: null
      }
    }
  }
})

export const selectPositionsCareer = (state) => state.careerPath.positionsCareer
export const selectSuitables = (state) => state.careerPath.suitables
export const selectTopCompanies = (state) => state.careerPath.topCompanies
export const selectTopCompaniesByTag = (state) =>
  state.careerPath.topCompaniesByTag
export const selectRoleId = (state) => state.careerPath.roleId
export const selectLevelId = (state) => state.careerPath.levelId
export const selectShowMoreLevel = (state) => state.careerPath.showMoreLevel
export const selectJobDetailCareerPath = (state) => state.careerPath.jobDetail
export const selectJobDetailByTagCareerPath = (state) =>
  state.careerPath.jobDetailByTag
export const selectCareerMap = (state) => {
  let temp = { ...state.careerPath.careerMap }
  let result = {}
  if (typeof window !== 'undefined') {
    Object.keys(temp).map((job) => {
      temp[job].map((detail) => {
        const { imgUrl, name, highlightImgUrl } = detail
        let tempResult = {}

        let tempImage = new window.Image()
        tempImage.src = imgUrl
        let tempHightlightImage = new window.Image()
        tempHightlightImage.src = highlightImgUrl
        tempResult[name] = [
          { ...detail, img: tempImage, highlightImg: tempHightlightImage }
        ]

        result = { ...result, ...tempResult }
      })
    })

    return result
  }
  return {}
}

export const selectCareerMapByJobId = (state, id) => {
  let temp = { ...state.careerPath.careerMapJobs[id] }
  let result = { ...temp }

  if (typeof window !== 'undefined' && id) {
    Object.keys(temp).map((key) => {
      const tempArr = []
      temp.levels.map((detail) => {
        const { imgUrl, name, highlightImgUrl } = detail
        let tempImage = new window.Image()
        tempImage.src = imgUrl
        let tempHightlightImage = new window.Image()
        tempHightlightImage.src = highlightImgUrl
        tempArr.push({
          ...detail,
          img: tempImage,
          highlightImg: tempHightlightImage
        })

        result = { ...result, levels: tempArr }
      })
    })

    return result
  }
  return {}
}

export const selectLevelInfoLeft = (state) => {
  const { jobLevels } = state.careerPath.jobDetailByTag || []
  const arr = []
  if (jobLevels?.length > 0) {
    const cloneArr = [...jobLevels]
    const sortArr = cloneArr?.sort((a, b) => a.position - b.position)
    let i = 0
    while (i < 3 && i < sortArr.length) {
      arr.push(sortArr[i])
      i++
    }
  }
  return arr
}

export const selectLevelInfoRight = (state) => {
  const { jobLevels } = state.careerPath.jobDetailByTag || []
  const arr = []
  if (jobLevels?.length > 3) {
    const cloneArr = [...jobLevels]
    const sortArr = cloneArr?.sort((a, b) => a.position - b.position)
    let i = 3
    while (i < 6 && i < sortArr.length) {
      arr.push(sortArr[i])
      i++
    }
  }
  return arr
}

export const selectLevelInfoMore = (state) => {
  const { jobLevels } = state.careerPath.jobDetailByTag || []
  const arr = []
  if (jobLevels?.length > 6) {
    const cloneArr = [...jobLevels]
    const sortArr = cloneArr?.sort((a, b) => a.position - b.position)
    let i = 6
    while (i < sortArr.length) {
      arr.push(sortArr[i])
      i++
    }
    return arr
  }
}
export const selectTotalLevel = createSelector(
  [selectLevelInfoMore, selectLevelInfoRight, selectLevelInfoLeft],
  (moreLevel, rightLevel, leftLevel) => {
    const result = []
    const totalLevel = [
      ...(leftLevel || []),
      ...(rightLevel || []),
      ...(moreLevel || [])
    ]
    totalLevel.forEach((item) => {
      const tmp = {
        id: item?.meta?.tag || item?.jobLevelId,
        icon: '/images/career_path/level_avatar.png',
        title: item?.name,
        tag: item?.meta?.tag
      }
      result.push(tmp)
    })
    return result
  }
)
export const selectSoftSkillByLevelId = (state, id) => {
  const { jobLevels } = state.careerPath.jobDetail || []
  const { jobSkills } = state.careerPath.jobDetail || []
  const result = []
  if (jobLevels?.length > 0 && jobSkills?.length > 0) {
    const jobLevelById = jobLevels.find((level) => {
      if (!isNaN(id)) {
        return level?.jobLevelId === id
      } else {
        return level?.meta?.tag === id
      }
    })
    if (jobLevelById) {
      const { meta } = jobLevelById
      const { skillValues } = meta
      jobSkills?.map((skill) => {
        const { type } = skill
        if (type === 0 || type === 5) {
          skillValues?.map((skillVal) => {
            if (skillVal.skillId === skill.skillId) {
              const { value } = skillVal || {}
              result.push({
                name: skill?.name,
                skillMatchingPercentage: 0,
                percentage: value,
                skillId: skillVal?.skillId
              })
            }
          })
        }
      })
    }
  }

  return result
}
export const selectSoftSkillByLevelIdTag = (state, id) => {
  const { jobLevels } = state.careerPath.jobDetailByTag || []
  const { jobSkills } = state.careerPath.jobDetailByTag || []
  const result = []
  if (jobLevels?.length > 0 && jobSkills?.length > 0) {
    const jobLevelById = jobLevels.find((level) => {
      if (!isNaN(id)) {
        return level?.jobLevelId === id
      } else {
        return level?.meta?.tag === id
      }
    })
    if (jobLevelById) {
      const { meta } = jobLevelById
      const { skillValues } = meta
      jobSkills?.map((skill) => {
        const { type } = skill
        if (type === 0 || type === 5) {
          skillValues?.map((skillVal) => {
            if (skillVal.skillId === skill.skillId) {
              const { value } = skillVal || {}
              result.push({
                name: skill?.name,
                skillMatchingPercentage: 0,
                percentage: value,
                skillId: skillVal?.skillId
              })
            }
          })
        }
      })
    }
  }

  return result
}

export const selectCoreSkillByLevelId = (state, id) => {
  const { jobLevels } = state.careerPath.jobDetail || []
  const { jobSkills } = state.careerPath.jobDetail || []
  const userSkill = state.portfolio.userSkills || []
  const skillConvertObject = {}
  userSkill?.map((el) => {
    const { skillId, percentageComplete } = el || {}
    skillConvertObject[skillId] = percentageComplete
  })
  const result = []
  if (jobLevels?.length > 0 && jobSkills?.length > 0) {
    const jobLevelById = jobLevels.find((level) => {
      if (!isNaN(id)) {
        return level?.jobLevelId === id
      } else {
        return level?.meta?.tag === id
      }
    })
    if (jobLevelById) {
      const { meta } = jobLevelById
      const { skillValues } = meta
      jobSkills?.map((skill) => {
        const { type } = skill
        if (type === 1 || type === 6) {
          skillValues?.map((skillVal) => {
            if (skillVal.skillId === skill.skillId) {
              const { value } = skillVal || {}
              result.push({
                name: skill?.name,
                skillMatchingPercentage: skillConvertObject[skillVal?.skillId],
                percentage: value,
                skillId: skillVal?.skillId
              })
            }
          })
        }
      })
    }
  }

  return result
}
export const selectCoreSkillByLevelIdTag = (state, id) => {
  const { jobLevels } = state.careerPath.jobDetailByTag || []
  const { jobSkills } = state.careerPath.jobDetailByTag || []
  const userSkill = state.portfolio.userSkills || []
  const skillConvertObject = {}
  userSkill?.map((el) => {
    const { skillId, percentageComplete } = el || {}
    skillConvertObject[skillId] = percentageComplete
  })
  const result = []
  if (jobLevels?.length > 0 && jobSkills?.length > 0) {
    const jobLevelById = jobLevels.find((level) => {
      if (!isNaN(id)) {
        return level?.jobLevelId === id
      } else {
        return level?.meta?.tag === id
      }
    })
    if (jobLevelById) {
      const { meta } = jobLevelById
      const { skillValues } = meta
      jobSkills?.map((skill) => {
        const { type } = skill
        if (type === 1 || type === 6) {
          skillValues?.map((skillVal) => {
            if (skillVal.skillId === skill.skillId) {
              const { value } = skillVal || {}
              result.push({
                name: skill?.name,
                skillMatchingPercentage: skillConvertObject[skillVal?.skillId],
                percentage: value,
                skillId: skillVal?.skillId
              })
            }
          })
        }
      })
    }
  }

  return result
}

export const { updateRoleId, updateLevelId, updateShowMoreLevel } =
  careerPath.actions

export default careerPath.reducer
