import React from 'react'
import PropTypes from 'prop-types'

const TableRows = (props) => {
  const { content, className } = props
  return (
    <>
      <td className={`text-p16 text-neutral px-4 py-3 ${className}`}>
        {content}
      </td>
    </>
  )
}

TableRows.propTypes = {
  content: PropTypes.string
}
TableRows.defaultProps = {}

export default TableRows
