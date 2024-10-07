import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { delay } from 'store/helper/functionHelper'
import { SETTING_STEPPAGE_PROFILE_COMPANY } from 'common/presentation/SideMenu/contans'

export const getCompanyProfile = createAsyncThunk(
  APP_TYPES.COMPANY.GETPROFILECOMPANY,
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params
      const cultureMedia = await axios.get(`${api.COMPANY.CULTUREMEDIA}/${id}`)
      const profile = await axios.get(`${api.COMPANY.PROFILE}/${id}`)
      const images = await axios.get(`${api.COMPANY.IMAGE}/${id}`)
      const workingDays = await axios.get(`${api.COMPANY.WORKINGDAY}/${id}`)
      const departments = await axios.get(`${api.COMPANY.DEPARTMENT}/${id}`)
      const addressBooks = await axios.get(
        `${api.COMPANY.GET_ADDRESS_BOOKS_COMPANY_BY_TAG}/${id}`
      )
      const recruitmentCampaign = await axios.get(
        `${api.COMPANY.RECRUITMENTCAMPAIGN}/${id}`
      )
      const response = await Promise.all([
        cultureMedia,
        profile,
        images,
        workingDays,
        departments,
        recruitmentCampaign,
        addressBooks
      ])
      return response
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getCompanyCourse = createAsyncThunk(
  APP_TYPES.COMPANY.COURSE,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COMPANY.COURSE, {
        params: params
      })
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 400:
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const hasEditPermission = createAsyncThunk(
  APP_TYPES.COMPANY.HASEDITPERMISSION,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.COMPANY.HASEDITPERMISSION}?companyId=${companyId}`
      )
      return response.data
    } catch (err) {
      switch (
        err.response.status
        // case 400:
        //   if (companyId) {
        //     window.location.replace(`/profile-company/${companyId}`)
        //   }
        //   break
        // default:
      ) {
      }
      return err.response.data
    }
  }
)

export const hasEditPermissionByTagName = createAsyncThunk(
  APP_TYPES.COMPANY.HASEDITPERMISSIONBYTAGNAME,
  async (params, { rejectWithValue }) => {
    const { companyId } = params
    try {
      const response = await axios.get(
        `${api.COMPANY.HASEDITPERMISSIONBYTAGNAME}?tag=${companyId}`
      )
      return response.data
    } catch (err) {
      switch (
        err.response.status
        // case 400:
        //   if (companyId) {
        //     window.location.replace(`/profile-company/${companyId}`)
        //   }
        //   break
        // default:
      ) {
      }
      return err.response.data
    }
  }
)

export const getFaqRoot = createAsyncThunk(
  APP_TYPES.COMPANY.ROOTFAQ,
  async (params, { rejectWithValue }) => {
    try {
      const { companyId } = params
      const { data } = await axios.get(`${api.COMPANY.FAQROOT}/${companyId}`)

      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)

export const getChildFaq = createAsyncThunk(
  APP_TYPES.COMPANY.CHILDFAQ,
  async (params, { rejectWithValue }) => {
    try {
      const { companyId, faqAnswerId, event } = params
      const { data } = await axios.get(api.COMPANY.CHILDFAQ, {
        params: { faqAnswerId: faqAnswerId }
      })
      event()
      await delay(2000)
      if (!data.data) {
        const response = await axios.get(`${api.COMPANY.FAQROOT}/${companyId}`)
        return { data: response.data.data }
      }
      if (data.data.type === 1) {
        const faqRoot = await axios.get(`${api.COMPANY.FAQROOT}/${companyId}`)
        return { data: data.data, faqRoot: faqRoot.data }
      }
      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getInformationCompany = createAsyncThunk(
  APP_TYPES.COMPANY.INFORMATIONCOMPANY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${api.COMPANY.PROFILE_COMPANY}/${params}`
      )
      return response.data.data
    } catch (err) {
      console.log(err.response)
    }
  }
)
export const userConfirmation = createAsyncThunk(
  APP_TYPES.COMPANY.USERCONFIRMATION,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.COMPANY.USER_CONFIRMATION, params)
      return response.data
    } catch (err) {
      console.log(err.response)
    }
  }
)

export const getViewCountCompany = createAsyncThunk(
  APP_TYPES.COMPANY.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const dateLocal = localStorage.getItem('XPD')
      if (dateLocal === null) {
        const response = await axios.post(api.COMPANY.UPDATE_VIEW_COUNT, params)
        localStorage.setItem('XPD', btoa(new Date()))
        return response.data
      } else {
        let dateDecode = null
        try {
          dateDecode = atob(dateLocal)
        } catch (err) {
          throw 401
        }
        if (isNaN(new Date(dateDecode).getTime())) {
          throw 401
        } else {
          const duration =
            (new Date().getTime() - new Date(dateDecode).getTime()) / 1000
          if (duration < 30) {
            const response = await axios.get(api.COMPANY.GET_VIEW_COUNT, {
              params: params
            })
            return response.data
          } else {
            const response = await axios.post(
              api.COMPANY.UPDATE_VIEW_COUNT,
              params
            )
            localStorage.setItem('XPD', btoa(new Date()))
            return response.data
          }
        }
      }
    } catch (err) {
      if (err === 401) {
        window.location.replace('/logout')
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getViewCountCompanyEditmode = createAsyncThunk(
  APP_TYPES.COMPANY.GETVIEWCOUNT,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.COMPANY.GET_VIEW_COUNT, {
        params: params
      })
      return response.data
    } catch (err) {
      return rejectWithValue(err.response)
    }
  }
)

const company = createSlice({
  name: 'company',
  initialState: {
    medias: [],
    profile: {},
    images: [],
    workingDays: [],
    addressBooks: [],
    departments: [],
    recruitmentCampaign: [],
    course: [],
    faqs: [],
    queries: null,
    skillEnumType: '0',
    blocksY: [],
    informationCompany: {},
    chooseId: 0,
    sideMenu: [
      {
        id: 0,
        numberTitle: '01',
        title: 'Tổng quan',
        href: '#block-0',
        isActive: true
      },
      {
        id: 1,
        numberTitle: '02',
        title: 'Văn hóa (doanh nghiệp)',
        href: '#block-1',
        isActive: true
      },
      {
        id: 2,
        numberTitle: '03',
        title: 'Một ngày làm việc',
        href: '#block-2',
        isActive: true
      },
      {
        id: 3,
        numberTitle: '04',
        title: 'Cấu trúc công ty',
        href: '#block-3',
        isActive: true
      },
      {
        id: 4,
        numberTitle: '05',
        title: 'Công việc',
        href: '#block-4',
        isActive: true
      },
      // {
      //   id: 5,
      //   numberTitle: '06',
      //   title: 'Khóa học',
      //   href: '#block-5'
      // },
      {
        id: 5,
        numberTitle: '06',
        title: 'FAQ',
        href: '#block-5',
        isActive: true
      }
    ],
    labels: ['2020', '2021', '2022', '2023', '2024'],
    dataChart: [
      { title: 'Back-end Developer', priceList: [0, 12, 18, 29, 37, 49] },
      { title: 'Front-end Developer', priceList: [0, 11, 15, 30, 40, 70] },
      { title: 'Full-stack Developer', priceList: [0, 17, 19, 25, 37, 39.5] },
      { title: 'Mobile Developer', priceList: [0, 12, 19, 27, 42, 57.5] },
      { title: 'Game Developer', priceList: [0, 19, 22, 28, 31, 51] },
      { title: 'Embedded Engineer', priceList: [0, 15, 37, 37, 41, 41] },
      { title: 'PO / PM / BA', priceList: [0, 12.5, 28, 33, 39, 40] },
      {
        title: 'Project Manager / Leader',
        priceList: [0, 19.5, 35, 44.5, 44.5, 58]
      },
      { title: 'IT Lead / Manager', priceList: [0, 0, 0, 39.5, 42.5, 61] },
      { title: 'IT Consultant', priceList: [0, 0, 0, 27.5, 34, 34] },
      { title: 'Designer', priceList: [0, 0, 25, 27, 27, 50] },
      { title: 'Tester / QA-QC', priceList: [0, 11.5, 15, 20, 30, 46] },
      { title: 'System Engineer ', priceList: [0, 13, 17, 20, 26, 28] },
      { title: 'DevOps Engineer', priceList: [0, 0, 17, 20, 26, 28] },
      {
        title: 'Data, AI, ML Professional',
        priceList: [0, 12, 24, 38, 40, 42.5]
      }
    ],
    dataPersonnal: [
      {
        type: 0,
        priceList: [
          {
            present: 55.5,
            description:
              'Mức lương như mong đợi hoặc ít nhất là ngang bằng với thị trường'
          },
          {
            present: 33.7,
            description: 'Tỷ lệ tăng lương hàng năm chấp nhận được (5-10%)'
          }
        ]
      },
      {
        type: 1,
        priceList: [
          {
            present: 36,
            description: 'Có kế hoạch/lộ trình phát triển rõ ràng'
          },
          {
            present: 32.3,
            description: 'Có cơ hội thăng tiến'
          },
          {
            present: 29.8,
            description: 'Có thể nhìn thấy tiềm năng phát triển của công ty'
          }
        ]
      },
      {
        type: 2,
        priceList: [
          {
            present: 39.8,
            description:
              'Lãnh đạo hoặc người quản lý trực tiếp biết lắng nghe và bảo vệ team'
          },
          {
            present: 33.6,
            description:
              'Lãnh đạo hoặc người quản lý trực tiếp có tầm nhìn và có thể thiết lập các hướng đi rõ ràng.'
          },
          {
            present: 27.1,
            description:
              'Quản lý trực tiếp có kiến thức và chuyên môn kỹ thuật vững chắc'
          }
        ]
      },
      {
        type: 3,
        priceList: [
          {
            present: 38,
            description:
              'Mô hình làm việc linh hoạt, có thể làm việc tại nhà, không cần check-in'
          },
          {
            present: 35.3,
            description: 'Đồng nghiệp thân thiện, hòa đồng'
          },
          {
            present: 25.9,
            description: 'Quản lý được khối lượng công việc: tăng ca hợp lý'
          }
        ]
      },
      {
        type: 4,
        priceList: [
          {
            present: 42,
            description: 'Bảo hiểm 100% lương'
          },
          {
            present: 41.4,
            description: 'Thưởng theo dự án'
          },
          {
            present: 30.7,
            description:
              'Chế độ phúc lợi hấp dẫn cho các thành viên trong gia đình như bảo hiểm trợ cấp giáo dục cho con cái'
          }
        ]
      }
    ],
    location: 'HCM',
    key: 'Embedded Engineer',
    views: 0
  },
  reducers: {
    updateCompanyQueries(state, action) {
      state.queries = action.payload
    },
    updateFaq(state, action) {
      state.faqs = [...state.faqs, action.payload]
    },
    updateBlockPositionsCompany(state, action) {
      state.blocksY = action.payload
    },
    updateChooseId(state, action) {
      state.chooseId = action.payload
    },
    updateSideMenu(state, action) {
      state.sideMenu = action.payload
    },
    updateLocation(state, action) {
      state.location = action.payload
    },
    updateKey(state, action) {
      state.key = action.payload
    }
  },
  extraReducers: {
    [getCompanyProfile.fulfilled]: (state, action) => {
      const [
        medias,
        profile,
        images,
        workingDays,
        departments,
        recruitmentCampaign,
        addressBooks
      ] = action.payload
      return {
        ...state,
        medias: medias.data.data,
        profile: profile.data.data,
        images: images.data,
        workingDays: workingDays.data.data,
        departments: departments.data.data,
        recruitmentCampaign: recruitmentCampaign.data.data,
        addressBooks: addressBooks.data.data
      }
    },
    [getCompanyProfile.rejected]: (state) => {
      return {
        ...state,
        profile: null
      }
    },
    [getCompanyCourse.fulfilled]: (state, action) => {
      return {
        ...state,
        course: action.payload.data
      }
    },
    [getCompanyCourse.rejected]: (state) => {
      return state
    },
    [getFaqRoot.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        return state
      }
      return {
        ...state,
        faqs: [action.payload.data]
      }
    },
    [getFaqRoot.rejected]: (state) => {
      return state
    },
    [getChildFaq.fulfilled]: (state, action) => {
      const { data, faqRoot } = action.payload
      if (faqRoot) {
        return {
          ...state,
          faqs: [...state.faqs, data, faqRoot?.data]
        }
      } else {
        return {
          ...state,
          faqs: [...state.faqs, data]
        }
      }
    },
    [getChildFaq.rejected]: (state) => {
      return state
    },
    [hasEditPermission.fulfilled]: (state, action) => {
      return state
    },
    [getInformationCompany.rejected]: (state) => {
      return state
    },
    [getInformationCompany.fulfilled]: (state, action) => {
      return {
        ...state,
        informationCompany: action.payload
      }
    },
    [userConfirmation.rejected]: (state) => {
      return state
    },
    [userConfirmation.fulfilled]: (state, action) => {
      return state
    },
    [getViewCountCompany.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountCompany.rejected]: (state) => {
      return state
    },
    [getViewCountCompanyEditmode.fulfilled]: (state, action) => {
      state.views = action.payload.data
    },
    [getViewCountCompanyEditmode.rejected]: (state) => {
      return state
    }
  }
})

export const selectProfileCompany = (state) => state.company
export const selectCompanyViews = (state) => state.company.views
export const selectCompanyQueries = (state) => state.company.queries
export const selectCompanyCourse = (state) => state.company.course
export const selectFaq = (state) => state.company.faqs
export const selectSidebar = (state) => {
  return {
    blocksY: state.company.blocksY,
    chooseId: state.company.chooseId,
    sideMenu: state.company.sideMenu
  }
}
export const selectLabels = (state) => state.company.labels
export const selectDataChart = (state) => state.company.dataChart
export const selectDataPersennal = (state) => state.company.dataPersonnal
export const selectLocation = (state) => state.company.location
export const selectKey = (state) => state.company.key
export const selectInformationCompany = (state) =>
  state.company.informationCompany

export const selectDataListChart = createSelector(
  selectDataChart,
  (dataChart) => {
    const result = []

    const persentAverge = (dataArray) => {
      const persentObject = {}
      for (let ind = 0; ind < dataArray.length - 1; ind++) {
        const element = dataArray[ind]
        const element2 = dataArray[ind + 1]
        if (element2 !== undefined && element !== undefined) {
          const value = ((element2 - element) / 90) * 100
          if (value > 0) {
            persentObject[`present${ind}`] = value
          } else {
            persentObject[`present${ind}`] = 0
          }
        }
      }
      return persentObject
    }

    dataChart?.forEach((element) => {
      const item = {
        ...element,
        convertPrice: persentAverge(element?.priceList)
      }
      result.push(item)
    })

    return result
  }
)

export const {
  updateCompanyQueries,
  updateFaq,
  updateBlockPositionsCompany,
  updateChooseId,
  updateSideMenu,
  updateLocation,
  updateKey
} = company.actions

export default company.reducer
