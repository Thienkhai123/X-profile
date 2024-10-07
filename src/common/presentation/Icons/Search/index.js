import React from 'react'
import PropTypes from 'prop-types'

const Search = (props) => {
  const { viewBox, style, width, height } = props

  return (
    <svg
      aria-hidden="true"
      className="w-5 h-5  "
      fill="none"
      stroke="currentColor"
      viewBox={viewBox}
      style={style}
      width={width}
      height={height}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      ></path>
    </svg>
  )
}
Search.propTypes = {
  viewBox: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object
}

Search.defaultProps = {
  viewBox: '0 0 24 24',
  width: '24',
  height: '24',
  style: {}
}

Search.propTypes = {}

export default Search
