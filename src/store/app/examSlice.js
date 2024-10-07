import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

export const getAllExam = createAsyncThunk(
  APP_TYPES.EXAM.GETALLTEST,
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${api.EXAM.GET_ALL_TEST}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getExamDetail = createAsyncThunk(
  APP_TYPES.EXAM.GETEXAMDETAIL,
  async (params, { rejectWithValue }) => {
    try {
      const { quizId } = params
      const response = await axios.get(
        `${api.EXAM.GET_EXAM_DETAIL}?guid=${quizId}`
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

export const startExam = createAsyncThunk(
  APP_TYPES.EXAM.STARTEXAM,
  async (params, { rejectWithValue }) => {
    try {
      const { quizId } = params
      const response = await axios.post(`${api.EXAM.START_EXAM}?guid=${quizId}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const finishExam = createAsyncThunk(
  APP_TYPES.EXAM.FINISHEXAM,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${api.EXAM.FINISH_EXAM}`, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)
export const getResult = createAsyncThunk(
  APP_TYPES.EXAM.GETRESULT,
  async (params, { rejectWithValue }) => {
    try {
      const { quizId } = params
      const response = await axios.get(`${api.EXAM.GET_RESULT}?guid=${quizId}`)
      return response.data
    } catch (err) {
      switch (err.response.status) {
        default:
      }
      return rejectWithValue(err.response)
    }
  }
)

export const getExamBySkill = createAsyncThunk(
  APP_TYPES.EXAM.GETEXAMBYSKILL,
  async (params, { rejectWithValue }) => {
    try {
      const { skillId } = params
      const response = await axios.get(
        `${api.EXAM.GET_EXAM_BY_SKILL}?skillId=${skillId}`
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

const exam = createSlice({
  name: 'exam',
  initialState: {
    listExam: [],
    examDetail: {},
    questions: [],
    answers: {},
    result: {}
  },
  reducers: {
    updateAnswers(state, action) {
      state.answers = action.payload
    }
  },
  extraReducers: {
    [getAllExam.fulfilled]: (state, action) => {
      return {
        ...state,
        listExam: action.payload.data
      }
    },
    [getAllExam.rejected]: (state) => {
      return state
    },
    [getExamDetail.fulfilled]: (state, action) => {
      return {
        ...state,
        examDetail: action.payload.data
      }
    },
    [startExam.fulfilled]: (state, action) => {
      return {
        ...state,
        examDetail: action.payload.data,
        questions: action.payload.data?.exQuestions
      }
    },
    [finishExam.fulfilled]: (state, action) => {
      return state
    },
    [getResult.fulfilled]: (state, action) => {
      return {
        ...state,
        result: action.payload.data
      }
    }
  }
})

export const selectAllExam = (state) => state.exam.listExam
export const selectExamDetail = (state) => state.exam.examDetail
export const selectQuestions = (state) => state.exam.questions
export const selectAnswers = (state) => state.exam.answers
export const selectResult = (state) => state.exam.result

export const { updateAnswers } = exam.actions
export default exam.reducer
