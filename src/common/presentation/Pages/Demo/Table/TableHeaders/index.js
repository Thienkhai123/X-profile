import React from 'react'
import PropTypes from 'prop-types'

const TableHeaders = (props) => {
  const { header, className } = props
  return <th className={` ${className}`}>{header}</th>
}

TableHeaders.propTypes = {
  header: PropTypes.string,
  className: PropTypes.string
}
TableHeaders.defaultProps = {
  className: 'text-p16-bold text-grey-1 text-left py-2 px-4'
}

export default TableHeaders
