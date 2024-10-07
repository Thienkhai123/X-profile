import React from 'react'
import PropTypes from 'prop-types'
import TableHeaders from './TableHeaders'
import TableRows from './TableRows'

const Table = (props) => {
  const {
    tableheaders = [],
    tableRows = [],
    tableCellsProperties,
    classNameHeaders,
    widthTable
  } = props
  return (
    <div className="overflow-x-auto">
      <table className={`table-auto ${widthTable}`}>
        <thead className="bg-grey-4 ">
          <tr>
            {tableheaders?.map((header, index) => {
              return (
                <TableHeaders
                  header={header}
                  key={index}
                  className={classNameHeaders}
                />
              )
            })}
          </tr>
        </thead>
        <tbody>
          {tableRows?.map((row, index) => {
            return (
              <tr key={index} className="border-b-[1px] border-stoke">
                {tableCellsProperties?.map((cell, ind) => {
                  return (
                    <TableRows
                      content={row[cell]}
                      key={ind}
                      className={`even:text-center odd:text-center first:!text-left last:!text-right ${
                        cell === 'point' ? row?.statusColorPoint : ''
                      }`}
                    />
                  )
                })}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

Table.propTypes = {}
Table.defauleProps
export default Table
