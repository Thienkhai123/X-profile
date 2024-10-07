import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { delay } from 'store/helper/functionHelper'
import { getAllSkillV2 } from './portfolioSlice'

export const getJobCategories = createAsyncThunk(
  APP_TYPES.JOB.GETJOBCATEGORY,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_JOB_CATEGORY, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobWorkingDay = createAsyncThunk(
  APP_TYPES.JOB.GETJOBWORKINGDAY,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId } = params
      const response = await axios.get(
        `${api.JOB.GET_JOB_WORKING_DAY}/${jobId}`
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
export const getJobWorkingDayByTag = createAsyncThunk(
  APP_TYPES.JOB.GETJOBWORKINGDAYBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params
      const response = await axios.get(
        `${api.JOB.GET_JOB_WORKING_DAY_BY_TAG}/${tag}`
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

export const getAllCities = createAsyncThunk(
  APP_TYPES.JOB.GETALLCITIES,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_ALL_CITIES, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getAllDistricts = createAsyncThunk(
  APP_TYPES.JOB.GETALLDISTRICTS,
  async (params, { rejectWithValue }) => {
    const { cityId } = params
    try {
      const response = await axios.get(
        api.JOB.GET_ALL_DISTRICTS + '?cityId=' + cityId
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getAllWards = createAsyncThunk(
  APP_TYPES.JOB.GETALLWARDS,
  async (params, { rejectWithValue }) => {
    const { districtId } = params
    try {
      const response = await axios.get(
        api.JOB.GET_ALL_WARDS + '?districtId=' + districtId
      )
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllSkill = createAsyncThunk(
  APP_TYPES.JOB.GETALLSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_ALL_SKILL, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllJobs = createAsyncThunk(
  APP_TYPES.JOB.GETALLJOBS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.JOB.GET_ALL_JOB, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobFilter = createAsyncThunk(
  APP_TYPES.JOB.GETJOBFILTER,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_JOB_FILTER, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const loadMoreJobs = createAsyncThunk(
  APP_TYPES.JOB.LOADMOREJOB,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.JOB.GET_ALL_JOB, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobByJobCategory = createAsyncThunk(
  APP_TYPES.JOB.GETJOBBYJOBCATEGORY,
  async (params, { rejectWithValue }) => {
    try {
      const { id } = params || {}
      if (id !== undefined) {
        if (id === 0 || id === null) {
          const response = await axios.get(
            api.JOB.GET_JOB_BY_JOB_CATEGORY + '?jobCategoryId=1'
          )
          return response.data
        } else {
          // const { data } = await axios.get(api.JOB.GET_JOB_BY_JOB_CATEGORY)
          const { data } = await axios.get(
            api.JOB.GET_JOB_BY_JOB_CATEGORY + '?jobCategoryId=1'
          )
          if (data) {
            const findEl = data.data.find((el) => el.jobId === id)
            if (findEl?.jobCategoryId) {
              return {
                data: data.data.filter(
                  (job) => job.jobCategoryId === findEl?.jobCategoryId
                )
              }
            } else {
              return data
            }
          }
        }
      } else {
        const response = await axios.get(
          api.JOB.GET_JOB_BY_JOB_CATEGORY + '?jobCategoryId=1'
        )
        return response.data
      }
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobByJobCategoryByTag = createAsyncThunk(
  APP_TYPES.JOB.GETJOBBYJOBCATEGORYBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params || {}
      if (tag !== undefined) {
        if (tag === null) {
          const response = await axios.get(
            api.JOB.GET_JOB_BY_CATEGORY_TAG + '/' + 'it'
          )
          return response.data
        } else {
          // const { data } = await axios.get(api.JOB.GET_JOB_BY_JOB_CATEGORY)
          const { data } = await axios.get(
            api.JOB.GET_JOB_BY_CATEGORY_TAG + '/' + tag
          )
          if (data) {
            const findEl = data.data.find((el) => el.tag === tag)
            if (findEl?.jobCategoryId) {
              return {
                data: data.data.filter(
                  (job) => job.jobCategoryId === findEl?.jobCategoryId
                )
              }
            } else {
              return data
            }
          }
        }
      } else {
        const response = await axios.get(
          api.JOB.GET_JOB_BY_CATEGORY_TAG + '/' + 'it'
        )
        return response.data
      }
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobByCategoryId = createAsyncThunk(
  APP_TYPES.JOB.GETJOBBYCATEGORYID,
  async (params, { rejectWithValue }) => {
    try {
      const { jobCategoryId } = params || {}
      if (jobCategoryId) {
        const { data } = await axios.get(api.JOB.GET_JOB_CATEGORY)
        const jobCategory = data.data.find(
          (job) => job.jobCategoryId === parseInt(jobCategoryId)
        )

        if (jobCategory) {
          // const jobDetail = await axios.get(
          //   api.JOB.GET_JOB_BY_JOB_CATEGORY + '?jobCategoryId=' + jobCategoryId
          // )
          const jobDetail = await axios.get(
            api.JOB.GET_JOB_BY_JOB_CATEGORY + '?jobCategoryId=1'
          )
          return {
            jobDetail: jobDetail.data.data,
            jobCategory: jobCategory
          }
        } else {
          return rejectWithValue({})
        }
      }
    } catch (err) {
      switch (err.response.status) {
        case 401:
          // window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getJobByCategoryTag = createAsyncThunk(
  APP_TYPES.JOB.GETJOBCATEGORYBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { jobCategoryId } = params || {}
      if (jobCategoryId) {
        const { data } = await axios.get(api.JOB.GET_JOB_CATEGORY)
        const jobCategory = data.data.find((job) => job.tag === jobCategoryId)

        if (jobCategory) {
          const jobDetail = await axios.get(
            api.JOB.GET_JOB_BY_JOB_CATEGORY + '?tag=' + jobCategoryId
          )
          return {
            jobDetail: jobDetail.data.data,
            jobCategory: jobCategory
          }
        } else {
          return rejectWithValue({})
        }
      }
    } catch (err) {
      switch (err.response.status) {
        case 401:
          // window.location.replace('/sign-in')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobCategoryFaqRoot = createAsyncThunk(
  APP_TYPES.JOB.JOBCATEGORYFAQROOT,
  async (params, { rejectWithValue }) => {
    try {
      const { categoryId } = params
      const { data } = await axios.get(
        `${api.JOB.GET_JOB_CATEGORY_FAQ_ROOT}/${categoryId}`
      )

      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)
export const getJobCategoryFaqRootByTag = createAsyncThunk(
  APP_TYPES.JOB.JOBCATEGORYFAQROOTBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params
      const { data } = await axios.get(
        `${api.JOB.GET_JOB_CATEGORY_FAQ_ROOT_BY_TAG}/${tag}`
      )

      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)

export const getJobFaqRoot = createAsyncThunk(
  APP_TYPES.JOB.JOBFAQROOT,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId } = params
      const { data } = await axios.get(`${api.JOB.GET_JOB_FAQ_ROOT}/${jobId}`)

      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)
export const getJobFaqRootByTag = createAsyncThunk(
  APP_TYPES.JOB.JOBFAQROOTBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params
      const { data } = await axios.get(
        `${api.JOB.GET_JOB_BY_FAQ_ROOT_TAG}/${tag}`
      )

      return data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)

export const getJobCategoryChildFaq = createAsyncThunk(
  APP_TYPES.JOB.CHILDFAQCAREERPATH,
  async (params, { rejectWithValue }) => {
    try {
      const { tag, faqAnswerId, event } = params
      const { data } = await axios.get(
        api.JOB.GET_JOB_CATEGORY_CHILD_FAQ + `/${faqAnswerId}`
      )
      event()
      await delay(2000)
      if (!data.data) {
        const response = await axios.get(
          `${api.JOB.GET_JOB_CATEGORY_FAQ_ROOT_BY_TAG}/${tag}`
        )
        return { data: response.data.data }
      }
      if (data.data.type === 1) {
        const faqRoot = await axios.get(
          `${api.JOB.GET_JOB_CATEGORY_FAQ_ROOT_BY_TAG}/${tag}`
        )
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

export const getJobChildFaq = createAsyncThunk(
  APP_TYPES.JOB.CHILDFAQ,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId, faqAnswerId, event } = params
      const { data } = await axios.get(
        api.JOB.GET_JOB_CATEGORY_CHILD_FAQ + `/${faqAnswerId}`
      )
      event()
      await delay(2000)
      if (!data.data) {
        const response = await axios.get(`${api.JOB.GET_JOB_FAQ_ROOT}/${jobId}`)
        return { data: response.data.data }
      }
      if (data.data.type === 1) {
        const faqRoot = await axios.get(`${api.JOB.GET_JOB_FAQ_ROOT}/${jobId}`)
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
export const getJobChildFaqByTag = createAsyncThunk(
  APP_TYPES.JOB.CHILDFAQBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId, faqAnswerId, event } = params
      const { data } = await axios.get(
        api.JOB.GET_JOB_CATEGORY_CHILD_FAQ + `/${faqAnswerId}`
      )
      event()
      await delay(2000)
      if (!data.data) {
        const response = await axios.get(
          `${api.JOB.GET_JOB_BY_FAQ_ROOT_TAG}/${jobId}`
        )
        return { data: response.data.data }
      }
      if (data.data.type === 1) {
        const faqRoot = await axios.get(
          `${api.JOB.GET_JOB_BY_FAQ_ROOT_TAG}/${jobId}`
        )
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

export const getJobByTag = createAsyncThunk(
  APP_TYPES.JOB.GETJOBBYTAG,
  async (params, { rejectWithValue }) => {
    try {
      const { tag } = params
      const response = await axios.get(`${api.JOB.GET_JOB_BY_TAG}/${tag}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getJobDetail = createAsyncThunk(
  APP_TYPES.JOB.GETJOBDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const { jobId } = params
      const response = await axios.get(`${api.JOB.GET_JOB_DETAIL}/${jobId}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getAllJobLevels = createAsyncThunk(
  APP_TYPES.JOB.GETALLJOBLEVELS,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(api.JOB.GET_ALL_JOB_LEVELS, params)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        case 401:
          window.location.replace('/logout')
          break
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

const job = createSlice({
  name: 'job',
  initialState: {
    jobs: null,
    categories: [],
    jobDetail: [],
    cities: [],
    districts: [],
    wards: [],
    isMaxPage: false,
    totalData: null,
    filterModel: { page: 1 },
    skills: [],
    jobFilter: [],
    selectedSkill: [],
    selectedField: [],
    selectedFormal: {},
    selectedSalary: {},
    jobCategory: null,
    faqs: [],
    faqsByTag: [],
    workingDay: [],
    jobFaqs: [],
    jobDetailById: {},
    jobLevels: []
  },
  reducers: {
    updateFilter: (state, action) => {
      return {
        ...state,
        filterModel: { ...state.filterModel, ...action.payload }
      }
    },
    updateAddressBook: (state, action) => {
      return {
        ...state,
        addressBook: action.payload
      }
    },
    updateSelectedSkill: (state, action) => {
      return {
        ...state,
        selectedSkill: action.payload
      }
    },
    updateSelectedField: (state, action) => {
      return {
        ...state,
        selectedField: action.payload
      }
    },
    updateSelectedFormal: (state, action) => {
      return {
        ...state,
        selectedFormal: action.payload
      }
    },
    updateSelectedSalary: (state, action) => {
      return {
        ...state,
        selectedSalary: action.payload
      }
    },
    updateFaq(state, action) {
      state.faqs = [...state.faqs, action.payload]
    },
    updateFaqByTag(state, action) {
      state.faqsByTag = [...state.faqsByTag, action.payload]
    },
    updateJobFaq(state, action) {
      state.jobFaqs = [...state.jobFaqs, action.payload]
    },
    updateJobFaqByTag(state, action) {
      state.jobFaqsByTag = [...state.jobFaqsByTag, action.payload]
    }
  },
  extraReducers: {
    [getJobByJobCategory.fulfilled]: (state, action) => {
      return {
        ...state,
        jobDetail: action.payload.data
      }
    },
    [getJobByJobCategory.rejected]: (state) => {
      return state
    },
    [getJobByJobCategoryByTag.fulfilled]: (state, action) => {
      return {
        ...state,
        jobDetail: action.payload.data
      }
    },
    [getJobByJobCategoryByTag.rejected]: (state) => {
      return state
    },
    [getJobDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        jobDetailById: action.payload.data
      }
    },
    [getJobDetail.rejected]: (state) => {
      return state
    },
    [getJobCategories.fulfilled]: (state, action) => {
      return {
        ...state,
        categories: action.payload.data
      }
    },
    [getJobCategories.rejected]: (state) => {
      return state
    },
    [getAllJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        isMaxPage: action.payload.data.length < 12,
        jobs: action.payload.data,
        totalData: action.payload.totalData || 0
      }
    },
    [getAllJobs.rejected]: (state) => {
      return state
    },
    [loadMoreJobs.fulfilled]: (state, action) => {
      return {
        ...state,
        isMaxPage: action.payload.data.length < 12,
        jobs: [...state.jobs, ...action.payload.data]
      }
    },
    [loadMoreJobs.rejected]: (state) => {
      return state
    },
    [getAllCities.fulfilled]: (state, action) => {
      return {
        ...state,
        cities: action.payload.data
      }
    },
    [getAllCities.rejected]: (state) => {
      return state
    },
    [getAllDistricts.fulfilled]: (state, action) => {
      return {
        ...state,
        districts: action.payload.data
      }
    },
    [getAllDistricts.rejected]: (state) => {
      return state
    },
    [getAllWards.fulfilled]: (state, action) => {
      return {
        ...state,
        wards: action.payload.data
      }
    },
    [getAllWards.rejected]: (state) => {
      return state
    },
    [getAllSkillV2.fulfilled]: (state, action) => {
      return {
        ...state,
        skills: action.payload.data.data
      }
    },
    [getAllSkillV2.rejected]: (state) => {
      return state
    },
    [getJobFilter.fulfilled]: (state, action) => {
      return {
        ...state,
        jobFilter: action.payload.data
      }
    },
    [getJobFilter.rejected]: (state) => {
      return state
    },
    [getJobByCategoryId.fulfilled]: (state, action) => {
      const { jobDetail, jobCategory } = action.payload
      return {
        ...state,
        jobDetail: jobDetail,
        jobCategory: jobCategory
      }
    },
    [getJobByCategoryId.rejected]: (state) => {
      return {
        ...state,
        jobDetail: null
      }
    },
    [getJobByCategoryTag.fulfilled]: (state, action) => {
      const { jobDetail, jobCategory } = action.payload
      return {
        ...state,
        jobDetail: jobDetail,
        jobCategory: jobCategory
      }
    },
    [getJobByCategoryTag.rejected]: (state) => {
      return {
        ...state,
        jobDetail: null
      }
    },
    [getJobCategoryFaqRoot.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        return state
      }
      return {
        ...state,
        faqs: [action.payload.data]
      }
    },
    [getJobCategoryFaqRoot.rejected]: (state) => {
      return state
    },
    [getJobCategoryFaqRootByTag.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        return state
      }
      return {
        ...state,
        faqsByTag: [action.payload.data]
      }
    },
    [getJobCategoryFaqRootByTag.rejected]: (state) => {
      return state
    },
    [getJobCategoryChildFaq.fulfilled]: (state, action) => {
      const { data, faqRoot } = action.payload
      if (faqRoot) {
        return {
          ...state,
          // faqs: [...state.faqs, data, faqRoot?.data],
          faqsByTag: [...state.faqsByTag, data, faqRoot?.data]
        }
      } else {
        return {
          ...state,
          // faqs: [...state.faqs, data],
          faqsByTag: [...state.faqsByTag, data]
        }
      }
    },

    [getJobCategoryChildFaq.rejected]: (state) => {
      return state
    },
    [getJobChildFaq.fulfilled]: (state, action) => {
      const { data, faqRoot } = action.payload
      if (faqRoot) {
        return {
          ...state,
          jobFaqs: [...state.jobFaqs, data, faqRoot?.data]
        }
      } else {
        return {
          ...state,
          jobFaqs: [...state.jobFaqs, data]
        }
      }
    },

    [getJobChildFaq.rejected]: (state) => {
      return state
    },
    [getJobChildFaqByTag.fulfilled]: (state, action) => {
      const { data, faqRoot } = action.payload
      if (faqRoot) {
        return {
          ...state,
          jobFaqsByTag: [...state.jobFaqsByTag, data, faqRoot?.data]
        }
      } else {
        return {
          ...state,
          jobFaqsByTag: [...state.jobFaqsByTag, data]
        }
      }
    },

    [getJobChildFaqByTag.rejected]: (state) => {
      return state
    },

    [getJobWorkingDay.fulfilled]: (state, action) => {
      return {
        ...state,
        workingDay: action.payload.data
      }
    },
    [getJobWorkingDay.rejected]: (state) => {
      return state
    },
    [getJobWorkingDayByTag.fulfilled]: (state, action) => {
      return {
        ...state,
        workingDayByTag: action.payload.data
      }
    },
    [getJobWorkingDayByTag.rejected]: (state) => {
      return state
    },
    [getJobFaqRoot.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        return state
      }
      return {
        ...state,
        jobFaqs: [action.payload.data]
      }
    },
    [getJobFaqRoot.rejected]: (state) => {
      return state
    },
    [getJobFaqRootByTag.fulfilled]: (state, action) => {
      if (!action.payload.data) {
        return state
      }
      return {
        ...state,
        jobFaqsByTag: [action.payload.data]
      }
    },
    [getJobFaqRootByTag.rejected]: (state) => {
      return state
    },
    [getAllJobLevels.fulfilled]: (state, action) => {
      return {
        ...state,
        jobLevels: action.payload.data
      }
    },
    [getAllJobLevels.rejected]: (state) => {
      return state
    }
  }
})

export const selectJobDetail = (state) => {
  return {
    jobDetail: state.job.jobDetail,
    jobCategory: state.job.jobCategory
  }
}

export const selectJobDetailById = (state) => state.job.jobDetailById
export const selectJobCities = (state) => state.job.cities
export const selectAllDistricts = (state) => state.job.districts
export const selectAllWards = (state) => state.job.wards
export const selectAddressBook = (state) => state.job.addressBook
export const selectIsMaxPage = (state) => state.job.isMaxPage
export const selectFilterModel = (state) => state.job.filterModel
export const selectSelectedSkill = (state) => state.job.selectedSkill
export const selectSelectedField = (state) => state.job.selectedField
export const selectSelectedSalary = (state) => state.job.selectedSalary
export const selectSelectedFormal = (state) => state.job.selectedFormal
export const selectJobCategoryFaq = (state) => state.job.faqs
export const selectJobCategoryFaqByTag = (state) => state.job.faqsByTag
export const selectJobFaq = (state) => state.job.jobFaqs
export const selectJobFaqByTag = (state) => state.job.jobFaqsByTag
export const selectAllJobLevels = (state) => state?.job?.jobLevels

export const selectAllSkill = (state) => {
  const temp = state.job.skills.map((skill) => ({
    id: skill.skillId,
    name: skill.name
  }))
  return temp
}

export const selectAllJobFilter = (state) => {
  const temp = state.job.jobFilter.map((job) => ({
    id: job.jobId,
    name: job.name
  }))
  return temp
}
export const selectCitySort = createSelector([selectJobCities], (cities) => {
  let sortedCities = [...cities]
  sortedCities.sort((a, b) => a?.name?.localeCompare(b?.name))
  return [...sortedCities]
})
export const selectDistrictsSort = createSelector(
  [selectAllDistricts],
  (districts) => {
    let sortedDistricts = [...districts]
    sortedDistricts.sort((a, b) => a?.name?.localeCompare(b?.name))
    return [...sortedDistricts]
  }
)
export const selectWardsSort = createSelector([selectAllWards], (wards) => {
  let sortedWards = [...wards]
  sortedWards.sort((a, b) => a?.name?.localeCompare(b?.name))
  return [...sortedWards]
})
export const selectJobCategories = (state) => {
  const tempJobs = []
  const positionsFake = {
    0: {
      top: 50,
      right: 300,
      topMobile: 30,
      rightMobile: 250
    },
    1: {
      top: 80,
      right: 600,
      topMobile: 60,
      rightMobile: 10
    },
    2: {
      top: 50,
      right: 750,
      topMobile: 40,
      rightMobile: 150
    },
    3: {
      top: 240,
      right: 630,
      topMobile: 140,
      rightMobile: 200
    }
  }

  state.job.categories.map((category, ind) => {
    tempJobs.push({
      ...category,
      ...positionsFake[ind]
    })
  })
  return tempJobs
}
export const selectAllJobs = (state) => state.job.jobs
export const selectTotalAllJobs = (state) => state.job.totalData
export const selectJobWorkingDay = (state) => state.job.workingDay
export const selectJobWorkingDayByTag = (state) => state.job.workingDayByTag
export const selectJobs = (state) => {
  const response = []
  const jobs = state.job.jobDetail
  jobs?.map((job) => {
    const {
      jobId,
      name,
      avatarUrl,
      description,
      backgroundColor,
      backgroundUrl,
      meta
    } = job
    response.push({
      id: jobId,
      title: name,
      icon: avatarUrl,
      description: description,
      backgroundColor: backgroundColor,
      backgroundUrl: backgroundUrl,
      meta: meta
    })
  })
  return response
}
export const {
  updateFilter,
  updateSelectedSkill,
  updateSelectedField,
  updateSelectedFormal,
  updateSelectedSalary,
  updateFaq,
  updateJobFaq,
  updateJobFaqByTag,
  updateFaqByTag,
  updateAddressBook
} = job.actions

export default job.reducer
