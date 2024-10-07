import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import Table from 'common/presentation/Pages/Demo/Table'
import { useDispatch } from 'react-redux'
import {
  getUserDataTable,
  selectCustomDataTable,
  selectDataTable,
  selectHeadersDataTable,
  selectPropertiesDataTable
} from 'store/app/demoSlice'
import { useSelector } from 'react-redux'
import LoadingRole from 'common/presentation/Loading/LoadingRole'
import { selectLoading } from 'store/ui/loadingSlice'
import { APP_TYPES } from 'store/types'

const BaseTable = (props) => {
  const { headers } = props
  const dispatch = useDispatch()
  const rowsDataTable = useSelector(selectCustomDataTable)
  const headersDataTable = useSelector(selectHeadersDataTable)
  const tableCellsProperties = useSelector(selectPropertiesDataTable)

  const loading = useSelector((state) =>
    selectLoading(state, APP_TYPES.DEMO.GETDATATABLE)
  )
  useEffect(() => {
    dispatch(getUserDataTable())
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {loading && <LoadingRole />}
      <div className="flex flex-col justify-center items-center min-h-screen">
        <h1 className="text-h1">My Table</h1>
        <Table
          tableRows={rowsDataTable}
          tableheaders={headersDataTable}
          tableCellsProperties={tableCellsProperties}
          widthTable={'xl:w-[688px]'}
          classNameHeaders="even:text-center odd:text-center first:!text-left last:!text-right text-p16-bold text-grey-1 text-left py-2 px-4"
        />
      </div>
    </>
  )
}

BaseTable.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired
}
BaseTable.defaultProps = {
  headers: ['Ngày', 'Số điểm', 'Số dư điểm', 'Nội dung']
}

export default BaseTable
