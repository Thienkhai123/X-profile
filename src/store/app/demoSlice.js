import { createAsyncThunk, createSelector, createSlice } from '@reduxjs/toolkit'
import { APP_TYPES } from '../types'
import { api } from 'common/config'
import axios from 'axios'
import { DUMP_DATA } from 'common/presentation/Pages/Demo/Table/dumpData'
import { displayStatusColorPointType } from 'store/helper/functionHelper'
import moment from 'moment'

export const getUserDataTable = createAsyncThunk(
  APP_TYPES.DEMO.GETDATATABLE,
  async (params, { rejectWithValue }) => {
    try {
      // const response = await axios.get(api.DEMO.DATATABLE, params)
      return DUMP_DATA
    } catch (err) {
      console.log('err', err)
    }
  }
)

const demo = createSlice({
  name: 'demo',
  initialState: {
    headersTable: {
      createAt: 'Ngày',
      point: 'Số điểm',
      totalPoint: 'Số dư điểm',
      action: 'Nội dung'
    },
    dataTable: [
      { name: 'John Doe', age: 30, job: 'Developer' },
      { name: 'Jane Smith', age: 25, job: 'Designer' },
      { name: 'Bob Johnson', age: 40, job: 'Manager' }
    ]
  },
  reducers: {},
  extraReducers: {
    [getUserDataTable.fulfilled]: (state, action) => {
      state.dataTable = action.payload
    },
    [getUserDataTable.rejected]: (state) => {
      return state
    }
  }
})

export const selectDataTable = (state) => state.demo.dataTable
export const selectHeadersDataTable = (state) => {
  //Lấy nội dung (value) của headers (TableHeaders) để render
  const headers = state.demo.headersTable
  const response = Object.values(headers)
  return response
}

export const selectPropertiesDataTable = (state) => {
  // Lấy key của header để xác định các field sẽ render dưới rows
  // Trên header (headersTable) có bao nhiêu key thì sẽ hiển thị bấy nhiêu columns
  const properties = state?.demo.headersTable
  const response = Object.keys(properties)
  return response
}
export const selectCustomDataTable = createSelector(
  selectDataTable,
  (dataTable) => {
    const result = []
    dataTable?.forEach((item) => {
      //Custom lại các field hiển thị, các field không giống key của header (TableHeaders) sẽ không được hiển thị
      const tmpDataTable = {
        ...item,
        createAt: moment(item?.createAt).format('DD/MM/YYYY'),
        point: item?.point,
        totalPoint: item?.totalPoint,
        action: item?.content,
        statusColorPoint: displayStatusColorPointType(item?.statusPointDisplay)
      }
      result.push(tmpDataTable)
    })
    return result
  }
)

export default demo.reducer
