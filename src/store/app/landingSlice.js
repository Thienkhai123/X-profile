import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'

const QUESTION_DATA = [
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 73,
          questionId: 19,
          content: 'Tưởng tượng'
        },
        {
          exAnswerId: 74,
          questionId: 19,
          content: 'Tính toán'
        },
        {
          exAnswerId: 75,
          questionId: 19,
          content: 'Cảm nhận'
        },
        {
          exAnswerId: 76,
          questionId: 19,
          content: 'Quan sát'
        }
      ],
      questionId: 19,
      content: 'Tôi thường dành nhiều thời gian để ...',

      enumQuestionType: 0
    },
    exQuestionId: 21,
    questionId: 19,
    score: 10,
    isRandom: false,
    position: 1,
    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 77,
          questionId: 20,
          content:
            'Mọi thứ được sắp xếp tuần tự trong từng ngăn, khi cần, mở từng ngăn lấy ra nhanh chóng'
        },
        {
          exAnswerId: 78,
          questionId: 20,
          content: 'Bỏ hết tất cả vào tủ, cần tới đâu thì lục tìm tới đó'
        },
        {
          exAnswerId: 79,
          questionId: 20,
          content: 'Không có quá nhiều thứ trong đó, không cần sắp xếp'
        },
        {
          exAnswerId: 80,
          questionId: 20,
          content: 'Não là não chứ sao là tủ được?'
        }
      ],
      questionId: 20,
      content: 'Nếu não của tôi là một chiếc tủ:',

      enumQuestionType: 0
    },
    exQuestionId: 22,
    questionId: 20,
    score: 10,
    isRandom: false,
    position: 2,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 81,
          questionId: 21,
          content: 'Tập trung làm cho đến khi hoàn thành xong'
        },
        {
          exAnswerId: 82,
          questionId: 21,
          content:
            'Chia thành từng việc nhỏ, làm dần dần, có khoảng nghỉ giải lao rồi quay lại làm tiếp'
        },
        {
          exAnswerId: 83,
          questionId: 21,
          content: 'Không làm gì cả, chờ đến sát deadline rồi xử lý'
        },
        {
          exAnswerId: 84,
          questionId: 21,
          content: 'Tìm người phụ giúp một tay'
        }
      ],
      questionId: 21,
      content: 'Khi có quá nhiều việc phải xử lý, tôi thường ...',

      enumQuestionType: 0
    },
    exQuestionId: 23,
    questionId: 21,
    score: 10,
    isRandom: false,
    position: 3,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 85,
          questionId: 22,
          content: 'Phim hành động gay cấn hoặc kinh dị rùng rợn'
        },
        {
          exAnswerId: 86,
          questionId: 22,
          content: 'Phim có nhiều tình tiết "drama" xoay quanh một nhân vật'
        },
        {
          exAnswerId: 87,
          questionId: 22,
          content: 'Phim tài liệu đi sâu khai thác về cách mọi thứ được tạo nên'
        },
        {
          exAnswerId: 88,
          questionId: 22,
          content: 'Phim hoạt hình vui nhộn'
        }
      ],
      questionId: 22,
      content: 'Tôi thích xem ...',

      enumQuestionType: 0
    },
    exQuestionId: 24,
    questionId: 22,
    score: 10,
    isRandom: false,
    position: 4,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 89,
          questionId: 23,
          content: 'Ngắm nhìn vẻ đẹp của nó'
        },
        {
          exAnswerId: 90,
          questionId: 23,
          content:
            'Đặt câu hỏi điều gì làm cho bức tranh này trở nên nổi tiếng như vậy'
        },
        {
          exAnswerId: 91,
          questionId: 23,
          content: 'Tự hỏi cách mà họa sĩ vẽ nó như thế nào'
        },
        {
          exAnswerId: 92,
          questionId: 23,
          content: 'Chụp lại và chia sẻ lên mạng xã hội'
        }
      ],
      questionId: 23,
      content: 'Khi nhìn thấy một bức tranh đẹp, tôi sẽ ...',

      enumQuestionType: 0,
      questionGuid: '2bf5a35a-7ad6-4f0c-8d63-9d827b966f67'
    },
    exQuestionId: 25,
    questionId: 23,
    score: 10,
    isRandom: false,
    position: 5,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 93,
          questionId: 24,
          content: 'Thực hiện đúng theo công thức được hướng dẫn'
        },
        {
          exAnswerId: 94,
          questionId: 24,
          content: 'Nhìn qua hình chụp của món ăn và sáng tạo cách nấu '
        },
        {
          exAnswerId: 95,
          questionId: 24,
          content:
            'Nhớ lại hương vị đã từng ăn và nêm nếm theo vị giác của mình'
        }
      ],
      questionId: 24,
      content: 'Khi nấu ăn, tôi sẽ ...',

      enumQuestionType: 0
    },
    exQuestionId: 26,
    questionId: 24,
    score: 10,
    isRandom: false,
    position: 6,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 97,
          questionId: 25,
          content: 'Chỉ đi tìm câu trả lời khi có người hỏi tôi'
        },
        {
          exAnswerId: 98,
          questionId: 25,
          content: 'Chọn một chủ đề mình yêu thích và tìm hiểu mọi thứ về nó'
        },
        {
          exAnswerId: 99,
          questionId: 25,
          content: 'Viết một bản tóm lược về 10 điều mà tôi yêu thích'
        }
      ],
      questionId: 25,
      content: 'Điều nào sau đây giống như đang miêu tả tôi:',

      enumQuestionType: 0
    },
    exQuestionId: 27,
    questionId: 25,
    score: 10,
    isRandom: false,
    position: 7,

    examId: 11
  },
  {
    question: {
      exAnswers: [
        {
          exAnswerId: 101,
          questionId: 26,
          content: 'Hình ảnh trực quan'
        },
        {
          exAnswerId: 102,
          questionId: 26,
          content: 'Hệ thống bài bản'
        },
        {
          exAnswerId: 103,
          questionId: 26,
          content: 'Những câu chuyện kể'
        }
      ],
      questionId: 26,
      content: 'Tôi có xu hướng nhìn cuộc sống qua lăng kính của ...',

      enumQuestionType: 0
    },
    exQuestionId: 28,
    questionId: 26,
    score: 10,
    isRandom: false,
    position: 8,

    examId: 11
  }
]
const SCORE = [
  {
    exAnswerId: 73,
    uiux: 1,
    productManager: 1
  },
  {
    exAnswerId: 74,
    businessAnalyst: 1,
    developer: 1,
    techLead: 1
  },
  {
    exAnswerId: 75,
    uxWriter: 1
  },
  {
    exAnswerId: 76,
    uiux: 1,
    productOwner: 1,
    tester: 1
  },
  {
    exAnswerId: 77,
    businessAnalyst: 1,
    productOwner: 1,
    techLead: 1,
    uiux: 1
  },
  {
    exAnswerId: 78,
    productManager: 1
  },
  {
    exAnswerId: 79,
    uxWriter: 1
  },
  {
    exAnswerId: 80,
    developer: 1,
    tester: 1
  },
  {
    exAnswerId: 81,
    techLead: 1,
    uiux: 1
  },
  {
    exAnswerId: 82,
    businessAnalyst: 1,
    productOwner: 1
  },
  {
    exAnswerId: 83,
    developer: 1,
    tester: 1
  },
  {
    exAnswerId: 84,
    businessAnalyst: 1,
    productManager: 1
  },
  {
    exAnswerId: 85,

    productManager: 1,
    techLead: 1
  },
  {
    exAnswerId: 86,
    uxWriter: 1,
    uiux: 1
  },
  {
    exAnswerId: 87,
    businessAnalyst: 1,
    productOwner: 1,
    tester: 1
  },
  {
    exAnswerId: 88,
    developer: 1
  },
  {
    exAnswerId: 89,
    tester: 1,
    uiux: 1
  },
  {
    exAnswerId: 90,
    productManager: 1,
    uxWriter: 1
  },
  {
    exAnswerId: 91,
    businessAnalyst: 1,
    productOwner: 1,
    techLead: 1
  },
  {
    exAnswerId: 92,
    developer: 1
  },
  {
    exAnswerId: 93,
    businessAnalyst: 1,
    developer: 1,
    techLead: 1,
    tester: 1
  },
  {
    exAnswerId: 94,
    productManager: 1,
    productOwner: 1,
    uiux: 1
  },
  {
    exAnswerId: 95,
    uxWriter: 1
  },
  {
    exAnswerId: 97,
    developer: 1,
    techLead: 1,
    uiUx: 1
  },
  {
    exAnswerId: 98,
    businessAnalyst: 1,
    productOwner: 1
  },
  {
    exAnswerId: 99,
    productManager: 1,
    uxWriter: 1,
    tester: 1
  },
  {
    exAnswerId: 101,
    productManager: 1,
    techLead: 1,
    uiUx: 1
  },
  {
    exAnswerId: 102,
    businessAnalyst: 1,
    developer: 1,
    tester: 1
  },
  {
    exAnswerId: 103,
    productOwner: 1,
    uxWriter: 1
  }
]

export const createUserSurvey = createAsyncThunk(
  APP_TYPES.SURVEY.CREATEUSERSURVEY,
  async (payload, { rejectWithValue }) => {
    try {
      const response = await axios.post(api.SURVEY.CREATE_USER_SURVEY, payload)
      return response.data
    } catch (err) {
      switch (err.response.status) {
      }
      return rejectWithValue(err.response.data)
    }
  }
)
const landing = createSlice({
  name: 'landing',
  initialState: {
    listExam: [],
    examDetail: {},
    questions: QUESTION_DATA,
    scoreList: SCORE,
    answers: {},
    result: {}
  },
  reducers: {
    updateAnswersLanding(state, action) {
      return {
        ...state,
        answers: action.payload
      }
    }
  },
  extraReducers: {
    [createUserSurvey.fulfilled]: (state, action) => {
      return state
    }
  }
})

export const selectAllExam = (state) => state.landing.listExam
export const selectExamDetail = (state) => state.landing.examDetail
export const selectQuestionsLanding = (state) => state.landing.questions
export const selectAnswersLanding = (state) => state.landing.answers
export const selectResultLanding = (state) => state.landing.result
export const selectScoreListLanding = (state) => state.landing.scoreList

export const { updateAnswersLanding } = landing.actions
export default landing.reducer
