import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from 'store/types'
import { api } from 'common/config'
import axios from 'axios'
import cloneDeep from 'lodash/cloneDeep'
import { delay } from 'store/helper/functionHelper'

export const getAllFaqs = createAsyncThunk(
  APP_TYPES.EDIT.GETALLFAQS,
  async (params, { rejectWithValue }) => {
    const { id } = params
    try {
      const response = await axios.get(`${api.EDIT.GET_ALL_FAQS}/${id}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return err.response.data
    }
  }
)
export const getFaqRoot = createAsyncThunk(
  APP_TYPES.EDIT.ROOTFAQ,
  async (params, { rejectWithValue }) => {
    try {
      const { companyId } = params
      const { data } = await axios.get(
        `${api.COMPANY.FAQROOTBYID}/${companyId}`
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

export const getChildFaqEdit = createAsyncThunk(
  APP_TYPES.EDIT.CHILDFAQ,
  async (params, { rejectWithValue }) => {
    try {
      const { companyId, faqAnswerId, event } = params
      const { data } = await axios.get(api.COMPANY.CHILDFAQBYID, {
        params: { faqAnswerId: faqAnswerId }
      })
      event()
      await delay(2000)
      if (!data.data) {
        const response = await axios.get(
          `${api.COMPANY.FAQROOTBYID}/${companyId}`
        )
        return { data: response.data.data }
      }
      if (data.data.type === 1) {
        const faqRoot = await axios.get(
          `${api.COMPANY.FAQROOTBYID}/${companyId}`
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

const questions = createSlice({
  name: 'questions',
  initialState: {
    faqs: [],
    faqsEdit: [],
    allFaq: [],
    content: '',
    childFaq: []
  },
  reducers: {
    addQuestion(state, action) {
      return {
        ...state,
        faqsEdit: [...state.faqsEdit, { ...action.payload }]
      }
    },
    addChildQuestion(state, action) {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.faqsEdit)
      cloneArr[id] = {
        ...cloneArr[id],
        faqAnswers: [...cloneArr[id]?.faqAnswers, { ...action.payload }]
      }

      if (id > -1) {
        return {
          ...state,
          faqsEdit: cloneArr
        }
      }
    },
    updateQuestion(state, action) {
      const { id } = action.payload
      const cloneArr = cloneDeep(state.faqsEdit)
      cloneArr[id] = {
        ...cloneArr[id],
        ...action.payload
      }

      if (id > -1) {
        return {
          ...state,
          faqsEdit: cloneArr
        }
      }
    },
    saveTempAllFaq(state, action) {
      const cloneArr = cloneDeep(state.allFaq)
      cloneArr[0] = {
        ...cloneArr[0],
        content: 'Câu hỏi thường gặp',
        type: 0,
        faqAnswers: state.faqsEdit
      }
      return {
        ...state,
        allFaq: cloneArr
      }
    },
    updateEditFaq(state, action) {
      state.faqs = [...state.faqs, action.payload]
    },
    updateChildFaq(state, action) {
      state.childFaq = action.payload
    },
    updateTempFaq(state, action) {
      const { event } = action.payload
      event && event()
      state.allFaq = [...state.allFaq, action.payload]
    },
    removeQuestion: (state, action) => {
      const { id } = action.payload
      const cloneArr = [...state.faqsEdit]

      if (id > -1) {
        cloneArr.splice(id, 1)
        return {
          ...state,
          faqsEdit: cloneArr
        }
      }
    }
  },
  extraReducers: {
    [getAllFaqs.fulfilled]: (state, action) => {
      return {
        ...state,
        faqsEdit: action?.payload?.data?.faqAnswers || [],
        content: action?.payload?.data?.content || '',
        allFaq: action.payload.data ? [action.payload.data] : []
      }
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
    [getChildFaqEdit.fulfilled]: (state, action) => {
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
    [getChildFaqEdit.rejected]: (state) => {
      return state
    }
  }
})

export const selectInitFaqs = (state) =>
  state?.editModeCompany?.company?.questions

export const {
  addQuestion,
  updateQuestion,
  removeQuestion,
  updateEditFaq,
  addChildQuestion,
  saveTempAllFaq,
  updateTempFaq,
  updateChildFaq
} = questions.actions

export default questions.reducer
